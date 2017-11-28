from datetime import datetime
import pymongo
from bson.objectid import ObjectId
from bson.errors import InvalidId


class MockDataGeneratorDB:

    MONGO_URI = 'mongodb://{0}:{1}'
    ID = '_id'
    INC = '$inc'
    SET = '$set'
    EMAIL = 'email'
    LAST_USED = 'last_used'
    GENERATED_COUNT = 'generated_count'
    VERIFIED = 'verified'

    def __init__(self, host, port, database, collection):
        self.conn = pymongo.MongoClient(self.MONGO_URI.format(host, port))
        self.collection = self.conn[database][collection]

    def add_user_to_collection(self, email):
        """
        Check if @param email in collection.
        If true, return its document's _id, else inserts it to collection and returns its document's _id
        :param email: Email address to look for in collection.
        """
        uid = self.find_by_email(email)
        if uid:  # Validation that uid is not None
            return uid.get(self.ID)  # Return _id
        user = self.collection.insert_one({
            self.EMAIL: email,
            self.GENERATED_COUNT: 1,
            self.VERIFIED: False,
            self.LAST_USED: datetime.now(),
        })
        return str(user.inserted_id)

    def find_by_email(self, email):
        """Returns document if email in collection else None"""
        return self.collection.find_one({self.EMAIL: email})

    def find_by_id(self, uid):
        """Returns document if _id in collection else None"""
        try:
            return self.collection.find_one({self.ID: ObjectId(uid)})
        except InvalidId:
            return

    def is_verified(self, uid):
        """Check if user's verified status in set to True"""
        try:
            verified = self.find_by_id(uid).get(self.VERIFIED)
            return verified
        except AttributeError:
            return False

    def update_user(self, uid, verification=False):
        """
        Changes user verification status to `True` if verification boolean is set.
        Otherwise, increments generated_count and updates last_use to datetime.now().
        """
        if verification:
            self.collection.find_one_and_update(
                {self.ID: ObjectId(uid)}, {self.SET: {self.VERIFIED: True}}
            )
        else:
            self.collection.find_one_and_update(
                {self.ID: ObjectId(uid)}, {self.SET: {self.LAST_USED: datetime.now()},
                                           self.INC: {self.GENERATED_COUNT: 1}}
            )
        return
