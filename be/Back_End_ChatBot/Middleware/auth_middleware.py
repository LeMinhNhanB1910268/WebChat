from flask import request, jsonify
import jwt

def token_required(func):
    def wrapper(*args, **kwargs):
        token = None

        # Kiểm tra xem request có chứa Authorization header không
        if 'Authorization' in request.headers:
            token = request.headers['Authorization']

        # Nếu không có token thì trả về lỗi 401 Unauthorized
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        # Nếu có token thì tiếp tục xác thực
        try:
            # Giải mã token để lấy thông tin người dùng
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = User.query.filter_by(username=data['username']).first()
        except:
            # Nếu xác thực thất bại thì trả về lỗi 401 Unauthorized
            return jsonify({'message': 'Token is invalid!'}), 401

        # Truyền thông tin người dùng vào các request tiếp theo
        return func(current_user, *args, **kwargs)

    return wrapper
