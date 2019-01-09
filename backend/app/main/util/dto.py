from flask_restplus import Namespace, fields


class UserDto:
    api = Namespace('users', description='user related operations')
    user = api.model('users', {
        'email': fields.String(required=True, description='user email address'),
        'public_id': fields.String(description='user Identifier'),
        'registered_on': fields.DateTime(),
        'admin': fields.Boolean(),
        'fc': fields.Boolean(),
        'member': fields.Boolean(),
        'hr': fields.Boolean(),
        'director': fields.Boolean(),
        'chinese_alias': fields.String(),
        'english_alias': fields.String(),
        'qq': fields.String()
    })


class AuthDto:
    api = Namespace('auth')
    user_auth = api.model('auth_details', {
        'email': fields.String(required=True),
        'password': fields.String(required=True),
    })


class CharDto:
    api = Namespace('characters')
    character = api.model('character', {
        'esi_id': fields.Integer(),
        'name': fields.String(),
        'add_on': fields.DateTime(),
        'esi_refresh_token': fields.String()
        })