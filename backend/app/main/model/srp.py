import datetime

from .. import db


class Reimbursement(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    km_id = db.Column(db.String(50), unique=True, nullable=False)
    requested_on = db.Column(db.DateTime, nullable=False)
    request_reason = db.Column(db.String(255))

    reimbursed_amount = db.Column(db.Integer, default=0)

    # 0: submitted, 1: approved, 2: declined
    decision = db.Column(db.SmallInteger, default=0)
    decided_on = db.Column(db.DateTime)
    decision_reason = db.Column(db.String(255))
