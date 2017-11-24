import redis
import datetime
import uuid
from random import randrange, randint, choice, random, uniform
from ipaddress import IPv4Address, IPv6Address


IPV6_LENGTH = 128
IPV4_LENGTH = 32
HEX_COLOR = '0xFFFFFF',
SHORT_HEX_COLOR = '0xFFF'
HEX_FORMAT = '#%06x'
SHORT_HEX_FORMAT = '#%03x'
RGBA_COLOR_FORMAT = '({}, {}, {}, {})'
FEMALE = 'F'
MALE = 'M'


class DataGenerator:
    """DataGenerator class for generating random files."""

    def __init__(self):
        self.redis = redis.Redis()
        # Load files from redis to cache
        self.countries = open('files/countries.txt')
        self.first_names = open('files/names.txt')
        self.last_names = open('files/last_names.txt')
        # All files types and their corresponding generating commands
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
            "country": self.rand_element,
            "first-names": self.rand_element,
            "last-names": self.rand_element,
            "cc-type": self.rand_element,
            "street-name": self.rand_element,
            "name": self.rand_element,
            "company": self.rand_element,
            "weekday": self.rand_element,
            "email": self.rand_element,
            "month": self.rand_element,
            "username": self.rand_element,
            "url": self.rand_element,
            "street-addr": self.rand_element,
            "domain": self.rand_element,
            "null-val": self.null_val
        }

    def __str__(self):
        return "Data generator"

    # Dates
    def random_date(self):
        """Generate random date ranging 1970-01-01 and 2018-12-31"""
        try:
            year = randint(1970, 2018)
            month = randint(1, 12)
            day = randint(1, 31)
            return datetime.date(year, month, day)
        except ValueError:
            return self.random_date()

    def date_range(self, start, end):
        """Generate date between given range"""
        start = start.split('-')
        end = end.split('-')
        try:
            return datetime.date(randrange(1970, 2017), randrange(1, 12), randrange(1, 31))
        except ValueError:  # Day out of range for month
            return self.date_range('-'.join(start), '-'.join(end))

    # Coordinates
    @staticmethod
    def longitude():
        return uniform(-180, 180)

    @staticmethod
    def latitude():
        return uniform(-90, 90)

    # Misc
    @staticmethod
    def gen_uuid():
        """Generate uuid"""
        return uuid.uuid4()

    @staticmethod
    def boolean(false_percentage):
        """Return True/False based on false percentage param"""
        return random() > false_percentage / 100

    @staticmethod
    def gender(female_percentage):
        """Return variable Female/Male based on female percentage param"""
        if random() < female_percentage / 100:
            return FEMALE
        return MALE

    @staticmethod
    def null_val():
        return

    @staticmethod
    def rand_element(data):
        """Return a random element from list loaded from Redis and decode it"""
        return choice(data).decode()

    # IPs
    @staticmethod
    def ipv6():
        """Generate random IPv6 address"""
        return str(IPv6Address(randint(0, 2 ** IPV6_LENGTH - 1)))

    @staticmethod
    def ipv4():
        """Generate random IPv4 address"""
        return str(IPv4Address(randint(0, (2 ** IPV4_LENGTH - 1))))

    # Colors
    @staticmethod
    def hex_color():
        """Generate random color in hex format"""
        return HEX_COLOR % randint(0, HEX_COLOR)

    @staticmethod
    def short_hex_color():
        """Generate random color in short hex format"""
        return SHORT_HEX_FORMAT % randint(0, SHORT_HEX_COLOR)

    @staticmethod
    def rgba():
        """Generate random color in rgba format"""
        return RGBA_COLOR_FORMAT.format((randint(0, 255)), randint(0, 255), randint(0, 255), round(random(), 1))
