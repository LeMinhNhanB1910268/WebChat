from Models.history import History
from config import db
from bson.objectid import ObjectId
from flask import jsonify,request
from werkzeug.security import generate_password_hash
import jwt
class HistoryController:
    def getAllHistory():
        history_collection = db.history
        all_history = list(history_collection.find())
        # Convert ObjectId to string
        for item in all_history:
            item['_id'] = str(item['_id'])
            item['user_id'] = str(item['user_id'])
        return jsonify(all_history)
        # return 
    def getHistoryOfUser(user_id):
        history_user = History.find_by_id_user(ObjectId(user_id))
        all_history = list(history_user)
        print(all_history)
        for item in all_history:
            item['_id'] = str(item['_id'])
            item['user_id'] = str(item['user_id'])
        return jsonify(all_history)
    def CreateHistory():
        data = request.json
        title = data['title']
        user_id = data['user_id'] 
        history = History(user_id,title)
        insert_result = history.save()  # Thực hiện chèn bản ghi vào cơ sở dữ liệu
        history_id = str(insert_result.inserted_id)
        return jsonify({'id':history_id,'title': history.title, 'user_id': history.user_id, "created_at": history.created_at, "update_at": history.created_at }), 201
    def UpdateHistoryById(id):
        data = request.json
        title = data['title']
        history = History.update(ObjectId(id),title)
        history['_id'] = str(history['_id'])
        history['user_id'] = str(history['user_id'])
        return jsonify(history)
    def DeleteHistoryById(id):
        history_collection = db.history.delete_one({"_id": ObjectId(id)})
        return jsonify({'message': "History has been removed"})
