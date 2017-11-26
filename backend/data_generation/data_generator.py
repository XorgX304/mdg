import datetime
import uuid
from random import randrange, randint, choice, random, uniform
from ipaddress import IPv4Address, IPv6Address


IPV6_LENGTH = 128
IPV4_LENGTH = 32
MIN_YEAR = 1970
MAX_YEAR = 2018
HEX_COLOR = 0xFFFFFF
SHORT_HEX_COLOR = 0xFFF
HEX_FORMAT = '#%06x'
SHORT_HEX_FORMAT = '#%03x'
RGBA_COLOR_FORMAT = '({}, {}, {}, {})'
FEMALE = 'F'
MALE = 'M'
EOL = '\n'


class DataGenerator:
    def __init__(self):
        # Load files to RAM
        self.countries = open('backend/files/countries.txt').read().split(EOL)
        self.first_names = open('backend/files/names.txt').read().split(EOL)
        self.last_names = open('backend/files/last_names.txt').read().split(EOL)
        self.colors = open('backend/files/colors.txt').read().split(EOL)
        self.companies = open('backend/files/companies.txt').read().split(EOL)
        self.credit_cards = open('backend/files/credit_cards.txt').read().split(EOL)
        self.days = open('backend/files/days.txt').read().split(EOL)
        self.domains = open('backend/files/domains.txt').read().split(EOL)
        self.emails = open('backend/files/emails.txt').read().split(EOL)
        self.months = open('backend/files/months.txt').read().split(EOL)
        self.streets = open('backend/files/streets.txt').read().split(EOL)
        self.addresses = open('backend/files/addresses.txt').read().split(EOL)
        self.urls = open('backend/files/urls.txt').read().split(EOL)
        self.usernames = open('backend/files/usernames.txt').read().split(EOL)
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
            year = randint(MIN_YEAR, MAX_YEAR)
            month = randint(1, 12)
            day = randint(1, 31)
            return datetime.date(year, month, day)
        except ValueError:  # Day out of range for month
            return self.random_date()

    def date_range(self, column, options):
        """Generate date between given range arguments"""
        start = options.get(column + 'dateRangeStart').split('-')
        end = options.get(column + 'dateRangeEnd').split('-')
        try:
            return datetime.date(randrange(int(start[0]), int(end[0])),
                                 randrange(int(start[1]), int(end[1])), randrange(int(start[2]), int(end[2])))
        except ValueError:  # Day out of range for month
            return self.date_range(column, options)

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

    @staticmethod
    def boolean(column, options):
        """Return True/False based on false percentage param"""
        false_percentage = options.get(column + 'boolPercentage')
        return random() > false_percentage / 100

    @staticmethod
    def gender(column, options):
        """Return variable Female/Male based on female percentage param"""
        female_percentage = options.get(column + 'genderPercentage')
        if random() < female_percentage / 100:
            return FEMALE
        return MALE

    @staticmethod
    def null_val(*args):
        """Null value"""
        return

    @staticmethod
    def rand_element(elements):
        """Return a random element from list"""
        return choice(elements)

    # IPs
    @staticmethod
    def ipv6(*args):
        """Generate random IPv6 address"""
        return str(IPv6Address(randint(0, 2 ** IPV6_LENGTH - 1)))

    @staticmethod
    def ipv4(*args):
        """Generate random IPv4 address"""
        return str(IPv4Address(randint(0, (2 ** IPV4_LENGTH - 1))))

    # Colors
    @staticmethod
    def hex_color(*args):
        """Generate random color in hex format"""
        return HEX_FORMAT % randint(0, HEX_COLOR)

    @staticmethod
    def short_hex_color(*args):
        """Generate random color in short hex format"""
        return SHORT_HEX_FORMAT % randint(0, SHORT_HEX_COLOR)

    @staticmethod
    def rgba(*args):
        """Generate random color in rgba format"""
        return RGBA_COLOR_FORMAT.format((randint(0, 255)), randint(0, 255), randint(0, 255), round(random(), 1))
