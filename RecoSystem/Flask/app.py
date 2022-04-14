import json
import os

from flask import Flask, jsonify, request, session
import firebase
import pyrebase

from Flask.csvtosjson import csv_to_json
from config import config

# from src.Main import *
from src.Main import get_rec

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
db = firebase.database()

app = Flask(__name__)

games = {}
global user, recommended_games

recommended_games = get_rec(user_id=14153959, item_count=10)


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
    if request.method == 'POST':
        print("asd")
        email = request.json['email']
        password = request.json['password']
        print("email = ", email, '\n', "password =", password)
        # liked_games = request.form["liked-games"]
        try:
            user = register_user(email, password)
            return 'succes', 200
        except:
            return 'bad request', 400
    pass


@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == "POST":
        email = request.json["email"]
        password = request.json["password"]
        try:
            session["user"] = login_user(email, password)
            return "Succes", 200
        except:
            return "Bad request", 400
    elif request.method == "GET":
        session["recommended_games"] = get_rec(user["localId"], games)
        return jsonify(session["recommended_games"])


@app.route('/games', methods=['GET', 'POST'])
def games():
    if request.method == "GET":
        games = csv_to_json("games_dataset.csv")
        return games
    elif request.method == "POST":
        liked_games_list = request.json["likedGamesList"]

        if not liked_games_list:
            return "Empty", 400

        return "Succes", 200
    pass


port = int(os.environ.get('PORT', 3000))
if __name__ == '__main__':
    app.run(threaded=True, host='0.0.0.0', port=port)
