from Models.user import User
from config import db
from bson.objectid import ObjectId
from flask import jsonify,request
from werkzeug.security import generate_password_hash
import jwt
class UserController:
    def getUserById(id):
        user = User.find_by_id(ObjectId(id))
        if not user:
            return jsonify({"message": "User not found"}), 404
        return jsonify({
            "id": str(user["_id"]),
            "username": user["username"],
            "email": user["email"],
            "created_at": user['created_at'],
            "updated_at": user['updated_at']
        }), 200
    def updateUserById(id):
        data = request.json
        password = data['password']
        hashed_password = generate_password_hash(password, method='sha256')
        user = User.update(ObjectId(id),hashed_password)
        # print(user)
        return jsonify({
            "id": str(user["_id"]),
            "username": user["username"],
            "email": user["email"],
            "created_at": user['created_at'],
            "updated_at": user['updated_at']
        }), 200