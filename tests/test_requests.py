import unittest
import uuid
from random import choice
from collections import OrderedDict
from app import app
from string import punctuation, digits
from bs4 import BeautifulSoup


"""
Set up a mock Flask app and run all request related tests against it
"""


class GETRequestTestCase(unittest.TestCase):
    """Test cases for GET requests"""

    def setUp(self):
        self.app = app
        self.app.testing = True
        self.mock_app = self.app.test_client()
        self.github_url = 'https://github.com/evyatarmeged/mdg'
        self.response = self.mock_app.get('/')
        self.page = BeautifulSoup(self.response.data, 'lxml')

    def test_index_page(self):
        self.assertEqual(self.response.status_code, 200)

    def test_donate_btn_in_page(self):
        paypal_btn = self.page.find('input', {'name': 'submit'})
        self.assertIn('PayPal', paypal_btn.get('alt'))

    def test_github_url_in_page(self):
        github_url = self.page.select('p > a')
        self.assertEqual(self.github_url, github_url[0].get('href'))

    def test_bad_verify_uid(self):
        page = self.mock_app.get('/verify?token={}'.format(uuid.uuid4().hex))
        soup = BeautifulSoup(page.data, 'lxml')
        error_msg = soup.select('.alert.alert-danger')
        self.assertIsNotNone(error_msg)

    def test_donate_page(self):
        self.assertEqual(self.mock_app.get('/donate').status_code, 200)

    def test_error_page(self):
        self.assertEqual(self.mock_app.get('/' + uuid.uuid4().hex).status_code, 404)

    def test_robots_txt(self):
        self.assertEqual(self.mock_app.get('/robots.txt').status_code, 200)


class POSTRequestTestCase(unittest.TestCase):
    """Test cases for POST requests"""

    @staticmethod
    def mock_post_data(num_headers=2, num_rows=50):
        test_data = OrderedDict()
        for i in range(num_headers):
            test_data['header' + str(i)] = 'mock_data'
        test_data['dataType'] = '.csv'
        test_data['numRows'] = num_rows
        return test_data

    def setUp(self):
        self.app = app
        self.app.testing = True
        self.mock_app = self.app.test_client()
        self.mock_app.set_cookie(
            key='mdg', value='0123456789', server_name='mock_server')
        self.generate = '/generate'

    def test_no_cookie(self):
        self.mock_app.delete_cookie(key='mdg', server_name='mock_server')
        response = self.mock_app.post(self.generate)
        self.assertEqual(401, response.status_code)

    def test_bad_cookie(self):
        self.mock_app.set_cookie(key='mdg', value=uuid.uuid4().hex, server_name='mock_server')
        response = self.mock_app.post(self.generate, data=self.mock_post_data())
        self.assertEqual(403, response.status_code)

    def test_num_rows_limit(self):
        test_data = self.mock_post_data(num_rows=250001)  # Exceeds row limit
        response = self.mock_app.post(self.generate, data=test_data)
        self.assertEqual(400, response.status_code)

    def test_header_limit_max(self):
        test_data = self.mock_post_data(11)  # Exceeds header limit
        response = self.mock_app.post(self.generate, data=test_data)
        self.assertEqual(400, response.status_code)

    def test_header_limit_min(self):
        test_data = self.mock_post_data(1)  # Beneath the limit
        response = self.mock_app.post(self.generate, data=test_data)
        self.assertEqual(400, response.status_code)

    def test_header_with_digit_invalid(self):
        for i in range(len(digits)):
            test_data = self.mock_post_data()
            test_data['{}header'.format(digits[i])] = 'mock_data_type'
            response = self.mock_app.post(self.generate, data=test_data)
            self.assertEqual(400, response.status_code)

    def test_header_with_digit_valid(self):
        test_data = self.mock_post_data(1)
        test_data['header{}'.format(choice(digits))] = 'mock_data_type'
        response = self.mock_app.post(self.generate, data=test_data)
        self.assertEqual(200, response.status_code)

    def test_bad_header_char(self):
        charset = punctuation.replace('_', '')
        test_data = self.mock_post_data(1)
        test_data['header{}' + choice(charset)] = 'mock_data_type'
        response = self.mock_app.post(self.generate, data=test_data)
        self.assertEqual(400, response.status_code)

