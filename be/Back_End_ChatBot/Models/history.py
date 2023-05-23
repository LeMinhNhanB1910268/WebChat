from config import db
from bson.objectid import ObjectId
from datetime import datetime
class History:
    def __init__(self, user_id , title , ):
        self.user_id = user_id
        self.title = title
        self.created_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()
    def save(self):
        return db.history.insert_one({
            'title': self.title,
            'user_id': ObjectId(self.user_id),
            'created_at': self.created_at,
            'updated_at':  self.updated_at
        })
    def update(id, title):
        filter_query = {"_id": id}
        update_query = {"$set": {"title": title,'updated_at': datetime.utcnow()}}  
        return db.history.find_one_and_update(filter_query, update_query)
    @staticmethod
    def find_by_id(id):
        return db.history.find_one({'_id': id})
    @staticmethod
    def find_by_id_user(id):
        return db.history.find({'user_id': id})
    @staticmethod
    def find_by_title(title):
        return db.history.find_one({'title': title})
        