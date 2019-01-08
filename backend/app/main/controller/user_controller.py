from flask import request
from flask_restplus import Resource

from app.main.util.decorator import admin_required, dicrector_required, login_required
from ..util.dto import UserDto
from ..service.user_service import get_all_users, get_a_user

api = UserDto.api
_user = UserDto.user


@api.route('/')
class UserList(Resource):
    @api.doc('list_of_registered_users')
    @dicrector_required
    @api.marshal_list_with(_user)
    def get(self):
        """List all registered users"""
        return get_all_users()

    # @api.expect(_user, validate=True)
    # @api.response(201, 'User successfully created.')
    # @api.doc('create a new user')
    # def post(self):
    #     """Creates a new User """
    #     data = request.json
    #     return save_new_user(data=data)


@api.route('/<public_id>')
@api.param('public_id', 'The User identifier')
@api.response(404, 'User not found.')
class User(Resource):
    @api.doc('get a user')
    @login_required
    @api.marshal_with(_user)
    def get(current_user, self, public_id):
        """get a user given its identifier"""
        user = get_a_user(current_user, public_id)
        if not user:
            api.abort(404)
        else:
            return user

    @login_required
    def put(current_user,self, public_id):
        """
            update user info
        """
        data = request.json
        return update_user_info(data, current_user, public_id)

    def delete(self):
        return "" 
        
