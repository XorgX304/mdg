import gzip
import json
import os
import shutil
from collections import OrderedDict
from datetime import timedelta, datetime
import pandas as pd
from google.cloud import storage
from flask import Flask, request, render_template, make_response
from flask_mail import Mail
from db.mdg_database import MockDataGeneratorDB
from data_generation.data_generator import DataGenerator
from data_generation.awk_data_generator import AWKDataGenerator


# Module level constants
CSV = 'csv'
MDG = 'mdg'
AMP = '&'
EQ = '='
QUOTES = '"'
SEMI_COLON = ';'
EOL = '\n'
COMMA = ','
DELIMITER = 'delimiter'
UTF = 'utf-8'
MAX_ROWS = 250000
ENV = os.environ
INDEX = 'index.html'

with open('config.json', 'r') as config_file:
    CONFIG = json.loads(config_file.read())


# Instances
app = Flask(__name__, static_url_path='', template_folder='static')  # static/template folder path
app.config.update(
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=465,
    MAIL_USE_SSL=True,
    MAIL_USERNAME=ENV.get('MAIL_USERNAME'),
    MAIL_PASSWORD=ENV.get('MAIL_PASSWORD')
)
mail = Mail(app)
db = MockDataGeneratorDB(ENV.get('DB_HOST'), 27017, ENV.get('DB_NAME'), ENV.get('DB_COL'))
awk = AWKDataGenerator()
data_generator = DataGenerator()
client = storage.Client()
bucket = client.get_bucket(CONFIG['bucket'])


@app.route('/')
# Index
def index():
    return render_template(INDEX)


# Verification email sending
@app.route('/sendverification')
def send_verification():
    send_email(request.args.get('email'))
    return "Verification sent."


# Validating verification URL &
@app.route('/verify')
def verify():
    """
    Check if uid from URL equals document _id in Mongo collection.
    If true, set cookie and render index.html with success message.
    Else render index.html with error message.
    """
    uid = request.args.get('uid')
    if not db.find_by_id(uid):
        return render_template(INDEX, err=CONFIG['bad_uid'])
    if db.is_verified(uid):
        response = make_response(render_template(INDEX, err=CONFIG['email_verified']))
    else:
        response = make_response(render_template(INDEX, success=CONFIG['success']))
    db.update_user(uid, verification=True)
    response.set_cookie(MDG, uid, expires=datetime.now() + timedelta(days=365), httponly=True)
    return response


# Donation
@app.route('/donate')
def donate():
    return render_template('donate.html')


# Generate POST handler
@app.route('/generate', methods=['POST'])
def generate():
    """
    Checks if request has cookie, if cookie matches _id in MongoDB users collection,
    Updates users last_used time & increments generated count by 1.
    Finally, Executes data generation:
    Parses request parameters, generates, compresses &  uploads file. Returns download link.
    """
    # Check if user was verified
    uid = request.cookies.get('mdg')
    if not uid:
        return CONFIG['not_verified'], 401
    # Check for cookie authenticity
    if not db.find_by_id(uid):
        return CONFIG['bad_cookie_value'], 403
    # Updates user's generated_count and last_used:
    db.update_user(uid)

    """Data generation logic"""
    # Decode request literal to utf8
    request_literal = request.get_data().decode(UTF)
    # Create on OrderedDict from the request literal
    post_data = parse_post_data(request_literal)
    # Create headers list, awk generated list & and special options dictionary
    headers = list(post_data.keys())
    awk_generated = list(
        header for header in headers if post_data.get(header) in CONFIG['options']['awk_generated'])
    # Extract specific data types options
    options_dict = {
        key: post_data.get(key) for key in headers for option in CONFIG['options']['data_type_options'] if option in key}
    # Extract options regarding file type
    for option in CONFIG['options']['file_type_options']:
        if option in headers:
            options_dict[option] = post_data.get(option)
    headers = [header for header in headers if header not in options_dict.keys()]
    # Now headers contain all column names and options_dict contains all special file/data key:value pairs

    # Extract file name, type and number of rows
    filename = post_data.get(headers.pop()) + CSV
    num_rows = post_data.get(headers.pop())
    file_type = post_data.get(headers.pop())
    if int(num_rows) > MAX_ROWS or len(headers) > 10:
        return "Illegel request", 400
    # Create an empty file with headers
    with open(filename, 'w') as file:
        file.write(COMMA.join(headers) + EOL)
    # Write file
    write_awk_generated(headers, awk_generated, post_data, num_rows, filename, options_dict)
    # Check if file needs to be converted to another format
    if not is_csv(file_type):
        filename = file_conversion(file_type, filename, options_dict, headers, post_data)
    # Compress, upload, delete locally & return download link
    filename = compress_file(filename)
    download_url = upload_to_storage(filename)
    return download_url


def parse_post_data(request_data):
    """
    Creates an ordered dict containing the POST request files.
    Uses literal request files (not parsed) due to parsed files's order being mixed which affects
    the user's wanted order
    """
    # Split literal request files
    split_data = [element.split(EQ) for element in request_data.split(AMP)]
    post_data = OrderedDict()
    for group in split_data:
        post_data[group[0]] = group[1]
    return post_data


def write_awk_generated(headers, awk_generated, post_data, num_rows, filename, options):
    """
    Write all AWK related columns. If all columns are generated by AWK, return, else
    create a set of Python generated headers and call write_python_generated function.
    """
    os.system(awk.create_awk_statement(post_data, headers, num_rows, filename, options))
    # If all columns are generated by AWK, writing to file is done
    if all([column in awk_generated for column in headers]):
        pass
    # Else call write_python_generated func with python_generated column set
    else:
        python_generated = set(headers) - set(awk_generated)
        # Get delimiter from options or set default one
        delimiter = CONFIG['delimiter_chars'].get(options.get(DELIMITER), COMMA)
        write_python_generated(filename, post_data, python_generated, delimiter, options)
    return


def write_python_generated(filename, post_data, python_generated, delimiter, options):
    """Write non-AWK column files using Pandas"""
    df = pd.read_csv(filename, sep=COMMA)
    for header in python_generated:
        try:
            callback = data_generator.commands.get(post_data.get(header))
            # If callback data type is generated from a list, return a random element
            # Else call it's corresponding function
            df[header] = df[header].apply(
                    lambda x: data_generator.rand_element(callback) if isinstance(callback, list)
                    else callback(header, options))
        except TypeError as err:
            print(err)
    # Write the csv with new values and delimiter
    df.to_csv(filename, sep=delimiter, index=False)
    return


def is_csv(file_type):
    """Check if file type is CSV"""
    return file_type == CSV


def file_conversion(file_type, filename, options, headers, post_data):
    """Check file type and call appropriate conversion function"""
    if file_type == CONFIG['extensions']['json']:
        filename = convert_to_json(filename)
    elif file_type == CONFIG['extensions']['xlsx']:
        filename = convert_to_xlsx(filename)
    elif file_type == CONFIG['extensions']['xml']:
        filename = convert_to_xml(filename, options)
    elif file_type == CONFIG['extensions']['sql']:
        filename = convert_to_sql(filename, options, headers, post_data)
    return filename


def convert_to_xml(filename, options):
    """Call csv2xml library to convert CSV to XML"""
    root_node = options.get(CONFIG['options']["file_type_options"][4])
    record_node = options.get(CONFIG['options']["file_type_options"][5])
    xml_file = filename.split('.')[0] + CONFIG['extensions']['xml']
    os.system(CONFIG['conversion']['xml'].format(filename, root_node, record_node))
    return xml_file


def convert_to_xlsx(filename):
    """Call csv2xlsx library to convert CSV to XLSX"""
    xlsx_file = filename.split('.')[0] + CONFIG['extensions']['xlsx']
    os.system(CONFIG['conversion']['xlsx'].format(filename, xlsx_file))
    return xlsx_file


def convert_to_json(filename):
    """Call csv2json library to convert CSV to JSON"""
    json_file = filename.split('.')[0] + CONFIG['extensions']['json']
    os.system(CONFIG['conversion']['json'].format(filename, json_file))
    return json_file


def convert_to_sql(filename, options, headers, post_data):
    """
    Convert CSV file to SQL.
    Extract table name and create table arguments from options, write SQL insert statements formatted with values
    from each file's row using pandas itertuples function.
    """
    # Set wanted sql file extension
    sql_file = filename.split('.')[0] + options.get(CONFIG['options']['file_type_options'][3])
    # Set wanted table name and format SQL insert string with table name
    table_name = options.get(CONFIG['options']['file_type_options'][0])  # Get table name from options
    sql_insert = CONFIG['sql']['insert'].format(table_name)
    # Load previously created CSV with pandas
    df = pd.read_csv(filename, sep=COMMA, index_col=0)
    with open(sql_file, 'w') as file:
        # Test if create table was checked by user
        # Parameter comes as string representation from request hence the `== true` check
        if options.get(CONFIG['options']['file_type_options'][1]) == 'true':
            # Write create table statement
            sql_table_creation_string = sql_create_table(headers, post_data)
            file.write(CONFIG['sql']['create'].format(table_name, sql_table_creation_string))
        for row in df.itertuples():
            file.write(
                # Wrap value with double quotes if its VARCHAR or DATE
                sql_insert % (COMMA.join([QUOTES + x + QUOTES if isinstance(x, str) else str(x) for x in list(row)])))
    return sql_file


def sql_create_table(headers, post_data):
    """Return create table statement with SQL data types"""
    table_creation = []
    for header in headers:
        if post_data.get(header) in CONFIG['sql']['decimal_types']:
            table_creation.append(header + CONFIG['sql']['decimal'])
        elif post_data.get(header) in CONFIG['sql']['int_types']:
            table_creation.append(header + CONFIG['sql']['int'])
        elif post_data.get(header) in CONFIG['sql']['date_types']:
            table_creation.append(header + CONFIG['sql']['date'])
        else:
            table_creation.append(header + CONFIG['sql']['varchar'])
    return (COMMA + EOL).join(table_creation)


def compress_file(filename):
    """Compress file function. Returns GZIP of file argument"""
    compressed_file = filename + CONFIG['extensions']['gzip']
    with open(filename, 'rb') as in_file:
        with gzip.open(filename + CONFIG['extensions']['gzip'], 'wb') as out_file:
            shutil.copyfileobj(in_file, out_file)
    return compressed_file


def send_email(recipient):
    """Send recipient a verification email """
    uid = db.add_user_to_collection(recipient)
    mail.send_message(
        'Verify your email address',
        sender='Mock data generator',
        recipients=[recipient],
        html=CONFIG['verify_html'].format(uid))
    return


def upload_to_storage(file):
    """
    Uploads file to Google Cloud Storage, makes it publicly available and calls
    delete_from_disk function. Returns public URL of file.
    """
    bucket.blob(file).upload_from_filename(file)
    bucket.blob(file).make_public()
    delete_from_disk(file)
    return bucket.blob(file).public_url


def delete_from_disk(file):
    """
    Deletes both compressed & uncompressed versions of the file from disk.
    Also checks for a CSV version of the same file (as all files are first created in
    CSV and then converted.)
    """
    os.remove(file)  # Remove compressed
    file = file.split('.')
    os.remove('.'.join([file[0], file[1]]))  # Remove uncompressed
    if file[1] != CSV:
        os.remove(file[0] + CONFIG['extensions']['csv'])  # Remove CSV version if file is not in CSV format
    return


# 404 #
@app.errorhandler(404)
def not_found(err):
    return app.send_static_file('404.html'), 404


if __name__ == '__main__':
    app.run(host='0.0.0.0')
