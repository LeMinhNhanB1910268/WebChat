from flask import request
from marshmallow import Schema, fields, validate,ValidationError, validates_schema
from validate_email import validate_email
from Models.user import User

class SchemaValidateFavorite(Schema):
    favorite = fields.Boolean(
        validate = validate.OneOf([True,False]),
        allow_none=True
    )