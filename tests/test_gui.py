import unittest
import os
from selenium.webdriver import Firefox, Chrome
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.wait import WebDriverWait
from selenium.common.exceptions import NoSuchElementException


class ChromeTestCase(unittest.TestCase):
    """Test cases for all Chrome based GUI interaction"""

    def setUp(self):
        self.driver = Chrome(os.environ['CHROME_DRIVER'])
        self.addCleanup(self.driver.quit)


class FirefoxTestCase(unittest.TestCase):
    """Test cases for all Firefox based GUI interaction"""

    def setUp(self):
        self.driver = Firefox(os.environ['GECKO_DRIVER'])
        self.addCleanup(self.driver.quit)

