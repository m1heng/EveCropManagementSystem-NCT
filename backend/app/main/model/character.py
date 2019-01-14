import datetime

from .. import db


class Character(db.Model):

    __tablename__ = "character"

    # esi id,global public id for a char in EVE
    esi_id = db.Column(db.Integer, primary_key=True,
                       unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(50), unique=True, nullable=False)
    add_on = db.Column(db.DateTime, nullable=False)
    esi_refresh_token = db.Column(db.String(255), unique=True, nullable=False)
