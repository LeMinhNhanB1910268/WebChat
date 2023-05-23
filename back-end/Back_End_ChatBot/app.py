from flask import Flask, request, jsonify
from Controller.UserController import UserController
from Controller.AuthController import AuthController
from Controller.HistoryController import HistoryController
from Controller.QuestionController import QuestionController

from Models.user import User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import jwt_required, JWTManager, create_access_token
# from Middleware.auth_middleware
from flask_marshmallow import Marshmallow
from flask_cors import CORS
import os
import jwt
app = Flask(__name__)
ma = Marshmallow(app)
CORS(app)
# define the JWT_TOKEN_LOCATION
app.config["SECRET_KEY"] = 'my-secret-key'

# create a JWT instance with the app
jwt = JWTManager(app)

# 
@app.route('/api/register', methods=['POST'])
def register():
    return AuthController.register()

@app.route('/api/login', methods=['POST'])
def login():
    return AuthController.login()
# user route 
@app.route("/api/user/<string:user_id>", methods=["GET","PUT","DELETE"])
# @jwt_required()
def user(user_id):
    if request.method == "GET":
        return UserController.getUserById(user_id)

    
    if request.method == "PUT":
        return UserController.updateUserById(user_id)
    # Xử lý các phương thức DELETE ở đây
#history route
@app.route("/api/history",methods=["GET","POST"])
@jwt_required()
def history(): 
    if request.method == "GET":
        return HistoryController.getAllHistory()

    if request.method == "POST":
        return HistoryController.CreateHistory()
@app.route("/api/history/user_id=<string:user_id>")
@jwt_required()
def historyOfUser(user_id):
    return HistoryController.getHistoryOfUser(user_id)
@app.route("/api/history/<string:history_id>",methods=["PUT","DELETE"])
@jwt_required()
def historyById(history_id):
    if request.method == "PUT":
        return HistoryController.UpdateHistoryById(history_id)

    if request.method == "DELETE":
        return HistoryController.DeleteHistoryById(history_id)

#question route
@app.route("/api/question", methods=["GET","POST"])
@jwt_required()
def question():
    if request.method == "GET":
        return QuestionController.getAllQuestion()
    if request.method == "POST":
        return QuestionController.createQuestion()
@app.route("/api/question/history_id=<string:history_id>")
@jwt_required()
def questionOfHistory(history_id):
    return QuestionController.getQuestionOfHistory(history_id)
@app.route("/api/question/<string:question_id>", methods=["PUT"])
@jwt_required()
def questionById(question_id):
    if request.method == "PUT":
        return QuestionController.updateFavorite(question_id)
if __name__ == '__main__':
    app.run(debug=True)
    # app.run(debug=True, host = '192.168.110.161')
