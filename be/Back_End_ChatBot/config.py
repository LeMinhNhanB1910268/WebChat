from pymongo import MongoClient

MONGO_URI = 'mongodb+srv://vanmjnh2001:e9pQtI6R8hEM8OjK@chatbot.yxmdjid.mongodb.net/'

client = MongoClient(MONGO_URI)

# Tạo biến db để sử dụng trong các model và controller
db = client.get_database('mydatabase')
