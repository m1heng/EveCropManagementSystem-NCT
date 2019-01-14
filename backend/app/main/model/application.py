import datetime

from .. import db


class Application(db.Model):

    id = db.Column(db.Interger, primary_key=True)
    applied_by = db.Column(
        db.Interger, db.ForeignKey('user.id'), nullable=False)
    applied_on = db.Column(db.DateTime, nullable=False)
    apply_reason = db.Column(db.String(255))
    reviewed_on = db.Column(db.DateTime)
    reviewed_by = db.Column(
        db.Interger, db.ForeignKey('user.id'), nullable=False)
