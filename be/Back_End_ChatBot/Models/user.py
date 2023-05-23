from config import db
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
class User:
    def __init__(self, password, email):
        # self.username = username
        self.password = password
        self.email = email
        self.created_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()
    def save(self):
        return db.users.insert_one({
            # 'username': self.username,
            'password': self.password,
            'email': self.email,
            'created_at': self.created_at,
            'updated_at':  self.updated_at
        })
    def update(id, password):
        filter_query = {"_id": id}
        update_query = {"$set": {"password": password,'updated_at': datetime.utcnow()}}  
        return db.users.find_one_and_update(filter_query, update_query)
    @staticmethod
    def find_by_id(user_id):
        return db.users.find_one({'_id': user_id})

    # @staticmethod
    # def find_by_username(username):
    #     return db.users.find_one({'username': username})
    @staticmethod
    def find_by_email(email):
        return db.users.find_one({'email': email})
        