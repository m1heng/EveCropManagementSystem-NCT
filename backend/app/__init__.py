from flask_restplus import Api
from flask import Blueprint

from .main.controller.user_controller import api as user_ns
from .main.controller.auth_controller import api as auth_ns
from .main.controller.char_controller import api as char_ns

blueprint = Blueprint('api', __name__)

api = Api(blueprint,
          title='EveCropMangement',
          version='1.0',
          description='Something here'
          )

api.add_namespace(user_ns, path='/users')
api.add_namespace(auth_ns, path='/auth')
api.add_namespace(char_ns, path='/characters')