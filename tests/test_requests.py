import os
import unittest
import uuid
from collections import OrderedDict
from bs4 import BeautifulSoup
from tests import mock_app

"""
Set up a mock Flask app and run all request related tests against it
"""


class GETRequestTestCase(unittest.TestCase):
    """Test cases for GET requests"""

    def setUp(self):
        self.app = mock_app.app
        self.app.testing = True
        self.mock_app = self.app.test_client()
        self.github_url = 'https://github.com/evyatarmeged/mdg'
        self.response = self.mock_app.get('/')
        self.page = BeautifulSoup(self.response.data, 'lxml')

    def test_index_page(self):
        self.assertEqual(self.mock_app.get('/').status_code, 200)

    def test_donate_btn_in_page(self):
        paypal_btn = self.page.find('input', {'name': 'submit'})
        self.assertIn('PayPal', paypal_btn.get('alt'))

    def test_github_url_in_page(self):
        github_url = self.page.select('p > a')
        self.assertEqual(self.github_url, github_url[0].get('href'))

    def test_bad_verify_uid(self):
        page = self.mock_app.get('/verify?uid={}'.format(uuid.uuid4().hex))
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

    def mock_post_data(self):
        self.test_data = OrderedDict()
        self.test_data['test_header1'] = 'country'
        self.test_data['dataType'] = '.csv'
        self.test_data['numRows'] = 50
        return self.test_data

    def setUp(self):
        self.app = mock_app.app
        self.app.testing = True
        self.mock_app = self.app.test_client()
        self.mock_app.set_cookie(
            key='mdg', value=os.environ.get('TEST_COOKIE'), server_name='mock_server')
        self.generate = '/generate'
        self.test_data = self.mock_post_data()

    def test_no_cookie(self):
        self.mock_app.delete_cookie(key='mdg', server_name='mock_server')
        response = self.mock_app.post(self.generate)
        self.assertEqual(401, response.status_code)

    def test_bad_cookie(self):
        self.mock_app.set_cookie(key='mdg', value=uuid.uuid4().hex, server_name='mock_server')
        response = self.mock_app.post(self.generate, data=self.test_data)
        self.assertEqual(403, response.status_code)

    def test_num_rows_limit(self):
        test_data = self.test_data
        test_data['numRows'] = 250001  # Exceeds row limit
        response = self.mock_app.post(self.generate, data=test_data)
        self.assertEqual(400, response.status_code)

    def test_header_limit_max(self):
        # Using OrderedDict to not mess up request params order
        test_data = OrderedDict()
        for i in range(11):  # Exceeds header limit
            test_data['header' + str(i)] = 'uuid'
        test_data['dataType'] = '.csv'
        test_data['numRows'] = 50
        response = self.mock_app.post(self.generate, data=test_data)
        self.assertEqual(400, response.status_code)

    def test_header_limit_min(self):
        test_data = self.test_data
        del test_data['test_header1']
        response = self.mock_app.post(self.generate, data=test_data)
        self.assertEqual(400, response.status_code)


if __name__ == '__main__':
    unittest.main()
