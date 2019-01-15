from .. import db
import datetime
from ..config import key
import jwt
from werkzeug.security import generate_password_hash, check_password_hash


class User(db.Model):
    """ User Model for storing user related details """
    __tablename__ = "user"

    #must be initialize at the moment of creating new user(register)
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    public_id = db.Column(db.String(100), unique=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    registered_on = db.Column(db.DateTime, nullable=False)
    '''
    role: 
        possible values: 
            guest   : user without member role are considered as guest 
            member  : normal member have no access to manage panel
            fc      : have access to add fleet 
            hr      : have access to hiring and pre-esi-check
            director: have access to all
            admin   : add and delete all role of all user
    '''
    member = db.Column(db.Boolean, default=False)
    fc = db.Column(db.Boolean, default=False)
    hr = db.Column(db.Boolean, default=False)
    director = db.Column(db.Boolean, default=False)
    admin = db.Column(db.Boolean, default=False)

    password_hash = db.Column(db.String(128), nullable=False)

    chinese_alias = db.Column(db.String(50), unique = True)
    english_alias = db.Column(db.String(50), unique = True)
    qq = db.Column(db.String(20), unique = True)


    @property
    def password(self):
        raise AttributeError('password: write-only')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password, method='sha256')

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_token(self):
        role = ""
        if self.member:
            role += 'member,'
        if self.fc:
            role += 'fc,'
        if self.hr:
            role += 'hr,'
        if self.director:
            role += 'director,'
        if self.admin:
            role += 'admin'

        payload  = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=45),
            'iat': datetime.datetime.utcnow(),
            'pid': self.public_id,
            'role': role            
        }
        return jwt.encode(payload, key, algorithm='HS256')

    def __repr__(self):
        return "<User '{}'>".format(self.email)