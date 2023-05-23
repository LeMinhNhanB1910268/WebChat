from config import db
from bson.objectid import ObjectId
from datetime import datetime
class Question:
    def __init__(self, history_id , content, answer, url_audio_content , url_audio_answer ):
        self.history_id = history_id
        self.content = content
        self.url_audio_content = url_audio_content
        self.answer = answer
        self.url_audio_answer = url_audio_answer
        self.favorite = None
        self.created_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()
    def save(self):
        return db.question.insert_one({
            'history_id': ObjectId(self.history_id),
            'content': self.content,
            'url_audio_content': self.url_audio_content,
            'answer': self.answer,
            'url_audio_answer':self.url_audio_answer,
            'favorite': self.favorite,
            'created_at': self.created_at,
            'updated_at':  self.updated_at
        })
    def setFavorite(id, favorite):
        filter_query = {"_id": id}
        update_query = {"$set": {"favorite": favorite, 'updated_at': datetime.utcnow()}}
        return db.question.find_one_and_update(filter_query, update_query)

    @staticmethod
    def find_by_id(id):
        return db.question.find_one({'_id': id})
    @staticmethod
    def find_by_history(id):
        return db.question.find({'history_id': id})
    @staticmethod
    def find_by_title(title):
        return db.question.find_one({'title': title})
        