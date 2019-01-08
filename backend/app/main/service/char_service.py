import datetime 

from app.main import db
from app.main.model.character import Character 
from app.main.model.user import User
from app.main.util.resp import stdJSONresp

def get_characters_of_user(current_user, user_pid):

    if current_user.public_id != user_pid and not current_user.dicrector:
        return stdJSONresp('fail', 'Unauthrized', 401)

    target_user = User.query.filter_by(public_id = user_pid).first()

    if not target_user:
        return stdJSONresp('fail', 'User not found', 404)

    return Character.query.filter_by(user_id = target_user.id).all()


def get_all_characters():
    
    return Character.query.all()


def add_character(current_user, user_pid, data):
    if current_user.public_id != user_pid and not current_user.dicrector:
        return stdJSONresp('fail', 'Unauthrized', 401)

    if current_user.public_id == user_pid:
        target_user = current_user
    else:
        target_user = User.query.filter_by(public_id = user_pid).first()
        if not target_user:
            return stdJSONresp('fail', 'User not found', 404)

    try:
        new_char = Character(
            esi_id = data['esi_id'],
            user_id = target_user.id,
            name = data['name'],
            add_on = datetime.datetime.utcnow(),
            esi_refresh_token = data['esi_refresh_token'])
        db.session.add(new_char)
        db.session.commit()

        return stdJSONresp('success', 'Successfully added a new character', 200)

    except Exception as e:
        print(e)
        return stdJSONresp('fail', 'try again', 500)

def delet_character(current_user, user_pid, char_esi_id):
    if current_user.public_id != user_pid and not current_user.dicrector:
        return stdJSONresp('fail', 'Unauthrized', 401)

    if current_user.public_id == user_pid:
        target_user = current_user
    else:
        target_user = User.query.filter_by(public_id = user_pid).first()
        if not target_user:
            return stdJSONresp('fail', 'User not found', 404)

    target_char = Character.query.filter_by(esi_id = char_esi_id).first()

    if not target_char:
        return stdJSONresp('fail', 'Character not found', 404)

    try:
        db.session.delete(target_char)
        db.session.commit()
        return stdJSONresp('success', 'Successfully delete a new character', 200)
    except Exception as e:
        print(e)
        return stdJSONresp('fail', 'try again', 500)

