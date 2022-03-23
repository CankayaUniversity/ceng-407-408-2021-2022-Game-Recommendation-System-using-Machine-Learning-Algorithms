import logging
import os

from flask import Flask, jsonify, request
import firebase
import pyrebase
from config import config

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
db = firebase.database()

app = Flask(__name__)


def register_user(email, password):
    email = email
    password = password
    user = auth.create_user_with_email_and_password(email=email, password=password)
    return user


def login_user(email, password):
    email = email
    password = password
    user = auth.sign_in_with_email_and_password(email=email, password=password)
    return user


@app.route('/register', methods=['POST'])
def register():
    email = request.form["email"]
    password = request.form["password"]
    liked_games = request.form["liked-games"]
    try:
        user = register_user(email, password)
        # TODO evaluate recommendations and send it to db
    except:
        logging.warning("E-Mail Exists")
    pass


@app.route('/login', methods=['POST'])
def login():
    email = request.form["email"]
    password = request.form["password"]
    try:
        user = login_user(email, password)
    #     TODO get recommended games and send it to db
    #     get_liked_games(user_id)
    # get_recommendation()
    except:
        logging.error("E-Mail Or Password is Wrong")
    pass


@app.route('/get_list', methods=['GET'])
def get_recommendation():
    pass


port = int(os.environ.get('PORT', 3000))
if __name__ == '__main__':
    app.run(threaded=True, host='0.0.0.0', port=port)
