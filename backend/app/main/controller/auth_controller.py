from flask import request, make_response
from flask_restplus import Resource

from app.main.service.auth_service import login_user, register_user, reset_pass, role_operation
from app.main.util.decorator import login_required, director_required
from ..util.dto import AuthDto

api = AuthDto.api
user_auth = AuthDto.user_auth


@api.route('/login')
class Login(Resource):
    def post(self):
        # get the post data
        post_data = request.json
        return login_user(post_data)


@api.route('/register')
class Register(Resource):
    def post(self):
        post_data = request.json
        return register_user(post_data)

@api.route('/resetpassword')
class Resetpassword(Resource):
    @login_required
    def put(current_user, self):
        data =request.json
        return reset_pass(data, current_user)

@api.route('/roleoperation/<pid>')
class RoleOp(Resource):
    @director_required
    def put(current_user, self, pid):
        data = request.json
        return role_operation(data, pid)

    
