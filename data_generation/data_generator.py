import redis
import datetime
import uuid
from random import randrange, randint, choice, random, uniform
from ipaddress import IPv4Address, IPv6Address


IPV6_LENGTH = 128
IPV4_LENGTH = 32
HEX_COLOR = 0xFFFFFF
SHORT_HEX_COLOR = 0xFFF
HEX_FORMAT = '#%06x'
SHORT_HEX_FORMAT = '#%03x'
RGBA_COLOR_FORMAT = "({}, {}, {}, {})"
FEMALE = 'F'
MALE = 'M'


class DataGenerator:
    """DataGenerator class for generating random data."""

    def __init__(self):
        self.redis = redis.Redis()
        # Load data from redis to cache
        self.countries = open('data/countries.txt')
        self.first_names = open('data/names.txt')
        self.last_names = open('data/last_names.txt')
        self.commands = {
            'lat': self.latitude,
            'long': self.longitude
        }

    def __str__(self):
        return "Data generator class"

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
        return HEX_FORMAT % randint(0, HEX_COLOR)

    @staticmethod
    def short_hex_color():
        """Generate random color in short hex format"""
        return SHORT_HEX_FORMAT % randint(0, SHORT_HEX_COLOR)

    @staticmethod
    def rgba():
        """Generate random color in rgba format"""
        return RGBA_COLOR_FORMAT.format((randint(0, 255)), randint(0, 255), randint(0, 255), round(random(), 1))
