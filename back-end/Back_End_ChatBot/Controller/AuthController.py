import jwt
from Models.user import User
from config import db
from flask import jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from Validator.SchemaValidateRegister import SchemaValidateRegister
from Validator.SchemaValidateLogin import SchemaValidateLogin
from datetime import datetime, timedelta
class AuthController :
    def register():
        data = request.json
        # username = data['username']
        password = data['password']
        email = data['email']
        errors = SchemaValidateRegister().validate(data)
        if errors:
            return errors, 422
        hashed_password = generate_password_hash(password, method='sha256')
        
        user = User(hashed_password, email)
        # user.find_by_username(username)
        # if user.find_by_username(username):
        #     return jsonify({"username": "Username already exists"}),422
        if user.find_by_email(email):
            return jsonify({"email": "Email already exists"}),422
        insert_result  = user.save()
        user_id = str(insert_result.inserted_id)
        access_token = create_access_token(identity=email,expires_delta=timedelta(days=1))
        return jsonify({'id':user_id, 'email': user.email, 'token': access_token, "created_at": user.created_at, "update_at": user.created_at }), 201
    
    def login():
        # Lấy thông tin người dùng từ request
        data = request.json
        email = data['email']
        password = data['password']
        # Tìm người dùng trong cơ sở dữ liệu
        errors = SchemaValidateLogin().validate(data)
        if errors:
            return errors, 422
        user = db.users.find_one({'email': email})
        # Kiểm tra mật khẩu
        if user and check_password_hash(user['password'] ,password):
        # Generate a JWT token and return it to the client
            access_token = create_access_token(identity=email, expires_delta=timedelta(days=1))
            return jsonify({'id':str(user['_id']), 'email': user['email'], 'token': access_token, "created_at": user['created_at'], "update_at": user['created_at']})
        else:
            return jsonify({'message': 'Invalid email or password'}), 401
    