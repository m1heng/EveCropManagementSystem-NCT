from flask import request
from flask_restplus import Resource

from app.main.util.decorator import dicrector_required, login_required
from ..util.dto import CharDto
from ..service.char_service import *

api = CharDto.api
_char = CharDto.character

@api.route('/')
class AllChar(Resource):
    @dicrector_required
    @api.marshal_list_with(_char)
    def get(current_user,self):
        return get_all_characters()


@api.route('/<user_pid>')
class Char(Resource):
    @login_required
    @api.marshal_list_with(_char)
    def get(current_user,self, user_pid):
        return get_characters_of_user(current_user, user_pid)

    @login_required
    def post(current_user, self, user_pid):
        return add_character(current_user, user_pid, request.json)

    @login_required
    def delete(current_user, self, user_pid):
        return delet_character(current_user, user_pid, request.json['char_esi_id'])




