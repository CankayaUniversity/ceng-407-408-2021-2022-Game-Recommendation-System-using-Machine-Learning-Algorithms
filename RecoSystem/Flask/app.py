import json
import os

from flask import Flask, jsonify, request, session
from flask_session import Session
# import firebase
import pyrebase

from Flask.csvtosjson import csv_to_json
from config import config

from src.Main import *

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
db = firebase.database()

app = Flask(__name__)

global user, recommended_games

app.config['SESSION_TYPE'] = 'memcached'
app.config['SECRET_KEY'] = 'super secret key'
sess = Session()


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
        email = request.json['email']
        password = request.json['password']
        print("email = ", email, '\n', "password =", password)
        try:
            session["user"] = register_user(email, password)
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
        # TODO
        # databesden final dataseti güncelle
        session["recommended_games"] = get_rec(session["user"]["localId"], session["liked_games_list"])
        # değişiklileri dbye yaz
        # return jsonify(results=get_rec(user_id=1533333, item_count={"warhammer 40000 dawn of war  soulstorm": 3}))
        return jsonify(session["recommended_games"])


@app.route('/games', methods=['GET', 'POST'])
def games():
    if request.method == "GET":
        games = csv_to_json("games_dataset.csv")
        return games
    elif request.method == "POST":
        session["liked_games_list"] = request.json["likedGamesList"]

        if not session["liked_games_list"]:
            return "Empty", 400

        return "Succes", 200
    pass

@app.route('/gettop10', methods=['GET'])
def gettopN():
    top10 = get_topN(10)
    return top10

port = int(os.environ.get('PORT', 3000))
if __name__ == '__main__':
    app.run(threaded=True, host='0.0.0.0', port=port)
