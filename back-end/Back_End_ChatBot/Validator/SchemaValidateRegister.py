from flask import request
from marshmallow import Schema, fields, validate,ValidationError, validates_schema
from validate_email import validate_email
from Models.user import User
class SchemaValidateRegister(Schema):
    # username = fields.Str(
    #     required=True,
    #     validate = validate.Length(min=3, max=255)
    # )
    email = fields.Email(
       required=True,
        validate=[
            validate.Length(min=5, max=255),
            # validate.Unique(User, 'email', 'Email already exists')
        ],
        # error_messages={
        #     'email': {
        #         'unique': 'Email already exists',
        #         'length': 'Chiều dài phải từ 5 đến 255.'
        #     }
        # }
    )
    password = fields.Str(
        required=True,
        validate=[
            validate.Length(min=8, max=20),
            validate.Regexp(
                r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$',
                error='Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character'
            )
        ]
    )
    password_confirmation = fields.Str(
        required=True,
        validate=[
            validate.Length(min=8, max=20),
            validate.Regexp(
                r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$',
                error='Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character'
            )
        ]
    )