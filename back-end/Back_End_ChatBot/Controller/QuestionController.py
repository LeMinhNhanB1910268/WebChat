from Models.question import Question
from config import db
from Validator.SchemaValidateFavorite import SchemaValidateFavorite
from bson.objectid import ObjectId
from flask import jsonify,request
import jwt
class QuestionController:
    def getAllQuestion():
        question_collection = db.question
        all_question = list(question_collection.find())
        # Convert ObjectId to string
        for item in all_question:
            item['_id'] = str(item['_id'])
            item['history_id'] = str(item['history_id'])
        return jsonify(all_question)
    def getQuestionOfHistory(history_id):
        question_collection = Question.find_by_history(ObjectId(history_id))
        all_question = list(question_collection)
        for item in all_question:
            item['_id'] = str(item['_id'])
            item['history_id'] = str(item['history_id'])
        return jsonify(all_question)
    def createQuestion():
        data = request.json
        question = Question(data["history_id"], data['content'],data['answer'],data['url_audio_content'],data['url_audio_answer'])
        insert_result = question.save()
        question_id = str(insert_result.inserted_id)
        return jsonify({'id':question_id,'history_id': question.history_id, 'answer': question.answer,'url_audio_content':question.url_audio_content,'url_audio_answer': question.url_audio_answer, "created_at": question.created_at, "update_at": question.created_at,"favorite": question.favorite }), 201
    def updateFavorite(id):
        data = request.json
        errors = SchemaValidateFavorite().validate(data)
        if errors:
            return errors, 422
        question = Question.setFavorite(ObjectId(id), data['favorite'])
        question['_id'] = str(question['_id'])
        question['history_id'] = str(question['history_id'])
        question['favorite'] = data['favorite']
        return jsonify(question)