import json


class AWKDataGenerator:

    PRINT = 'print '  # Space intentional
    EQ = '='
    SEMI_COLON = ';'
    COMMA = ','
    EOL = '\n'
    # Using camel case strings just to match frontend form data
    INT_MIN = 'intRangeMin'
    INT_MAX = 'intRangeMax'
    FLOAT_MIN = 'floatRangeMin'
    FLOAT_MAX = 'floatRangeMax'

    def __init__(self):
        with open('data_generation/awk.json', 'r') as awk_file:
            self.awk_config = json.loads(awk_file.read())
            # Data types and their corresponding commands in AWK
            self.commands = self.awk_config['commands']
            # AWK related constants
            self.constants = self.awk_config['constants']

    def __str__(self):
        return "Data generator for AWK generated types"

    def _get_awk_cmd(self, data_type, header, options):
        """
        Return AWK command for data type, or header if data type is not in commands.
        :param data_type: Data type to be generated
        :param header: CSV column header
        :param options: Data type options
        """
        # Format random integer/float command with min & max options
        if data_type == 'random-int':
            cmd = self.commands.get(data_type, header).format(options.get(header + self.INT_MIN),
                                                              options.get(header + self.INT_MAX))
        elif data_type == 'random-float':
            cmd = self.commands.get(data_type, header).format(options.get(header + self.FLOAT_MIN),
                                                              options.get(header + self.FLOAT_MAX))
        else:
            cmd = self.commands.get(data_type, header)
        return cmd

    def _python_loop_statement(self, num_rows):
        """Return python loop statement formatted with number of rows"""
        return self.constants['python_loop'].format(num_rows)

    def _awk_command_body(self, post_data, headers, options):
        """
        Creates the awk command body for all awk generated columns(headers).
        :param post_data: POST request data_files
        :param headers: CSV column headers
        :param options: Data type options
        """
        return (self.SEMI_COLON + self.EOL).join(
            header + self.EQ + self._get_awk_cmd(post_data.get(header), header, options) for header in headers) + \
            self.SEMI_COLON

    def _print_statement(self, headers):
        """Return AWK print statement for headers"""
        return self.PRINT + self.COMMA.join(headers)

    def _close_statement(self, filename):
        """Return string of AWK close_statement"""
        close_statement = self.constants['delimiter'].format(self.COMMA) + self.constants['decimal_digits']
        return close_statement + self.constants['append_file'].format(filename)

    def create_awk_statement(self, post_data, headers, num_rows, filename, options):
        """Create full awk command"""
        return self.EOL.join((self._python_loop_statement(num_rows),
                              self.constants['awk_cmd_string'] % (
                                  self._awk_command_body(post_data, headers, options) +
                                  self._print_statement(headers)))) + self._close_statement(filename)
