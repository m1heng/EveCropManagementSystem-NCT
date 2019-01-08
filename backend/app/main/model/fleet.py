
import Datetime

from .. import db


class Fleet(db.Model):

    __tablename__ = 'fleet'

    id = db.Column(db.Integer, primary_key = True)
    fc_char_esi_id = db.Column(db.Integer, db.ForeignKey('character.esi_id'), nullable=False)
    fc_user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    recorded_on = db.Column(db.DateTime, nullable=False)
    doctrine = db.Column(db.String(50), nullable=False)
     

class FleetMember(db.Model):

    __tablename__ = 'fleetmember'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    fleet_id = db.Column(db.Integer, db.ForeignKey('fleet.id'), nullable=False)
    char_id = db.Column(db.Integer, db.ForeignKey('character.esi_id'), nullable=False)
