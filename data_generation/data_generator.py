import datetime
import uuid
from random import randrange, randint, choice, random, uniform
from ipaddress import IPv4Address, IPv6Address


class DataGenerator:

    EOL = '\n'
    IPV6_LENGTH = 128
    IPV4_LENGTH = 32
    MIN_YEAR = 1970
    MAX_YEAR = 2018
    HEX_COLOR = 0xFFFFFF
    SHORT_HEX_COLOR = 0xFFF
    HEX_FORMAT = '#%06x'
    SHORT_HEX_FORMAT = '#%03x'
    RGBA_COLOR_FORMAT = '({}, {}, {}, {})'
    RGB_COLOR_FORMAT = '({}, {}, {})'
    FEMALE = 'F'
    MALE = 'M'
    BOOLEAN_PERCENTAGE = 'boolPercentage'
    GENDER_PERCENTAGE = 'genderPercentage'
    DATE_RANGE_START = 'dateRangeStart'
    DATE_RANGE_END = 'dateRangeEnd'

    def __init__(self):
        # Load files to RAM
        self.countries = open('files/countries.txt').read().split(self.EOL)
        self.first_names = open('files/names.txt').read().split(self.EOL)
        self.last_names = open('files/last_names.txt').read().split(self.EOL)
        self.colors = open('files/colors.txt').read().split(self.EOL)
        self.companies = open('files/companies.txt').read().split(self.EOL)
        self.credit_cards = open('files/credit_cards.txt').read().split(self.EOL)
        self.days = open('files/days.txt').read().split(self.EOL)
        self.domains = open('files/domains.txt').read().split(self.EOL)
        self.emails = open('files/emails.txt').read().split(self.EOL)
        self.months = open('files/months.txt').read().split(self.EOL)
        self.streets = open('files/streets.txt').read().split(self.EOL)
        self.addresses = open('files/addresses.txt').read().split(self.EOL)
        self.urls = open('files/urls.txt').read().split(self.EOL)
        self.usernames = open('files/usernames.txt').read().split(self.EOL)
        # Data types and their corresponding commands in the class
        self.commands = {
            "rand-date": self.random_date,
            "date-range": self.date_range,
            "lat": self.latitude,
            "long": self.longitude,
            "uuid": self.gen_uuid,
            "bool": self.boolean,
            "gender": self.gender,
            "ipv6": self.ipv6,
            "ip": self.ipv4,
            "hex": self.hex_color,
            "short-hex": self.short_hex_color,
            "rgb": self.rgb,
            "rgba": self.rgba,
            "country": self.countries,
            "first-names": self.first_names,
            "last-names": self.last_names,
            "cc-type": self.credit_cards,
            "street-name": self.streets,
            "color-name": self.colors,
            "company": self.companies,
            "weekday": self.days,
            "email": self.emails,
            "month": self.months,
            "username": self.usernames,
            "url": self.urls,
            "street-addr": self.addresses,
            "domain": self.domains,
            "null-val": self.null_val
        }

    def __str__(self):
        return "Python generated data generator"

    # Dates
    def random_date(self, *args):
        """Generate random date ranging 1970-01-01 and 2018-12-31"""
        try:
            # Extracted only years to variables because days(1-31) and months(1-12) are Python Singletons
            year = randint(self.MIN_YEAR, self.MAX_YEAR)
            month = randint(1, 12)
            day = randint(1, 31)
            return datetime.date(year, month, day)
        except ValueError:  # Day out of range for month
            return self.random_date()

    def date_range(self, column, options):
        """Generate date between given range arguments"""
        # Extract start & end dates from options and break strings into list of ints (year, month, day)
        start = [int(date_element) for date_element in options.get(column + self.DATE_RANGE_START).split('-')]
        end = [int(date_element) for date_element in options.get(column + self.DATE_RANGE_END).split('-')]
        # Turn into datetime.date objects
        start = datetime.date(start[0], start[1], start[2])
        end = datetime.date(end[0], end[1], end[2])
        # Generate random date
        random_date_in_range = start + (end - start) * random()
        return random_date_in_range

    # Coordinates
    @staticmethod
    def longitude(*args):
        """Random longitude"""
        return uniform(-180, 180)

    @staticmethod
    def latitude(*args):
        """Random latitude"""
        return uniform(-90, 90)

    # Misc
    @staticmethod
    def gen_uuid(*args):
        """Generate uuid"""
        return uuid.uuid4()

    def boolean(self, column, options):
        """Return True/False based on false percentage param"""
        false_percentage = int(options.get(column + self.BOOLEAN_PERCENTAGE))
        return random() > false_percentage / 100

    def gender(self, column, options):
        """Return variable Female/Male based on female percentage param"""
        male_percentage = int(options.get(column + self.GENDER_PERCENTAGE))
        if random() > male_percentage / 100:
            return self.FEMALE
        return self.MALE

    @staticmethod
    def null_val(*args):
        """Null value"""
        return

    @staticmethod
    def rand_element(elements):
        """Return a random element from list"""
        return choice(elements)

    # IPs
    def ipv6(self, *args):
        """Generate random IPv6 address"""
        return str(IPv6Address(randint(0, 2 ** self.IPV6_LENGTH - 1)))

    def ipv4(self, *args):
        """Generate random IPv4 address"""
        return str(IPv4Address(randint(0, (2 ** self.IPV4_LENGTH - 1))))

    # Colors
    def hex_color(self, *args):
        """Generate random color in hex format"""
        return self.HEX_FORMAT % randint(0, self.HEX_COLOR)

    def short_hex_color(self, *args):
        """Generate random color in short hex format"""
        return self.SHORT_HEX_FORMAT % randint(0, self.SHORT_HEX_COLOR)

    def rgb(self, *args):
        """Generate random color in rgb format"""
        return self.RGB_COLOR_FORMAT.format((randint(0, 255)), randint(0, 255), randint(0, 255))

    def rgba(self, *args):
        """Generate random color in rgba format"""
        return self.RGBA_COLOR_FORMAT.format((randint(0, 255)), randint(0, 255), randint(0, 255), round(random(), 1))
