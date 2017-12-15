import json
import os
from datetime import timedelta, datetime
from string import punctuation, digits
from collections import OrderedDict
from flask import Flask, request, render_template, make_response
from dotenv import load_dotenv, find_dotenv
from db.mdg_database import MockDataGeneratorDB


# Module level constants
EOL = '\n'
AMP = '&'
SEMI_COLON = ';'
EQ = '='
QUOTES = '"'
COMMA = ','
UTF = 'utf-8'
CSV = 'csv'
MDG = 'mdg'
DELIMITER = 'delimiter'
INDEX = 'index.html'
MAX_ROWS = 250000
ENV = os.environ
SPECIAL_CHARS = punctuation.replace('_', '')

dotenv_file = find_dotenv(raise_error_if_not_found=True)
load_dotenv(dotenv_file)

with open('../cfg/config.json', 'r') as config_file:
    CONFIG = json.loads(config_file.read())

app = Flask(__name__, static_url_path='', template_folder='static')
db = MockDataGeneratorDB(ENV.get('DB_HOST'), ENV.get('DB_PORT'), ENV.get('DB_NAME'), ENV.get('DB_COL'))


@app.route('/')
# Index
def index():
    return render_template(INDEX)


# Verification email sending
@app.route('/sendverification')
def send_verification():
    return "Verification sent to {}".format(request.args.get('email'))


# Validating verification URL &
@app.route('/verify')
def verify():
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
    return app.send_static_file('donate.html')


# Generate POST handler
@app.route('/generate', methods=['POST'])
def generate():
    uid = request.cookies.get('mdg')
    if not uid:
        return CONFIG['not_verified'], 401
    if not db.find_by_id(uid):
        return CONFIG['bad_cookie_value'], 403
    request_literal = request.get_data().decode(UTF)
    post_data = parse_post_data(request_literal)
    headers = list(post_data.keys())
    awk_generated = list(
        header for header in headers if post_data.get(header) in CONFIG['options']['awk_generated'])
    options_dict = {
        key: post_data.get(key) for key in headers for option in CONFIG['options']['data_type_options'] if option in key}
    for option in CONFIG['options']['file_type_options']:
        if option in headers:
            options_dict[option] = post_data.get(option)
    headers = [header for header in headers if header not in options_dict.keys()]
    num_rows = post_data.get('numRows')
    file_type = post_data.get('fileType')
    test_headers = [h for h in headers if h not in ('numRows', 'fileType', 'dataType')]
    if not check_request_validity(num_rows, test_headers):
        return "Illegel request", 400
    return 'test passed', 200


def parse_post_data(request_data):
    # Split literal request data
    split_data = [element.split(EQ) for element in request_data.split(AMP)]
    post_data = OrderedDict()
    for group in split_data:
        post_data[group[0]] = group[1]
    return post_data


def check_request_validity(num_rows, headers):
    return all((max_num_rows(num_rows), max_min_headers(headers), bad_header_names(headers)))


def max_num_rows(num_rows):
    return int(num_rows) <= MAX_ROWS


def max_min_headers(headers):
    return 10 >= len(headers) > 1


def bad_header_names(headers):
    for header in headers:
        if header in CONFIG['bad_col_names'] or any(c in SPECIAL_CHARS for c in header) or header[0].isdigit():
            return False
    return True


# 404 #
@app.errorhandler(404)
def not_found(err):
    return app.send_static_file('404.html'), 404


@app.route('/robots.txt')
def robots():
    return app.send_static_file('robots.txt')
