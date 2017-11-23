# df = pd.read_csv('file.csv', delimiter=',')
# df['country'] = df['country'].apply(lambda x: choice(countries))
# df.to_csv('file.csv', index=False)
# last_names = [x for x in last_names]
# r.rpush('last_names', *last_names)
import subprocess
import os
from collections import OrderedDict
import json

WHITELIST = ['dateRangeStart', 'dateRangeEnd', 'boolPercentage', 'idRangeMin', 'idRangeMax', 'floatRangeMin',
             'floatRangeMax', 'decimalLimit', 'genderPercentage', 'colorFormat']
DATA_OPTION_LIST = ['tableName', 'createTable', 'xmlNode','delimiter', 'sqlExtension']
AWK_TYPES = ["random-float", "random-int", "timestamp", "zipcode", "phone", "cc-number",
             "cvv", "balance", "cc-exp", "rgb"]


post_data = {
    'myfloat': 'random-float',
    'myrgb': 'rgb',
    'mytimestamp': 'timestamp',
    'COUNTRY': 'country',
    'first_name': 'first-names'
}


python_string = "python -c 'for i in range({0}): print' |"
# print(';'.join(x + '=' + post_data.get('x') for x in ))
awk_string = "awk '{%s}'"
with open('awk.json', 'r') as awk_cmds:
    CONFIG = json.loads(awk_cmds.read())


def awk_close(filename='file.csv', ofs=',', ofmt=None):
    """Return string of AWK delimiter, decimal digit amount, and append to file"""
    close_args = ' OFS={0} '.format(ofs)  # AWK delimiter
    if ofmt:
        close_args += 'OFMT={0}'.format(ofmt)  # AWK number of decimal digits
    return close_args + '>> {0}'.format(filename)


def post_request(post_data):
    # Maybe use ordered dict
    # ordered_post_data = OrderedDict({k: v for k, v in post_data.items()})
    csv_headers = [x for x in post_data.keys()]
    # filename = csv_headers.pop()
    # num_rows = csv_headers.pop()
    # data_type = csv_headers.pop()
    awk_generated = [post_data.get(key) in AWK_TYPES for key in post_data.keys()]
    if any(awk_generated):
        awk_data = ';\n'.join(key + '=' + CONFIG.get(post_data.get(key), key) for key in csv_headers) + ';'
        awk_print_statement = 'print ' + ','.join(csv_headers)
        return awk_data + awk_print_statement


cfile = "\n".join([python_string.format(100), awk_string % post_request(post_data).format(100, 200)]) + awk_close()
print(cfile)
os.system(cfile)