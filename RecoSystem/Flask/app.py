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
    print("Logined user id: ", user["localId"])
    return user


@app.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        email = request.json['email']
        password = request.json['password']
        session["age"] = request.json['age']
        session["gender"] = request.json['gender']
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
        session["liked_games_list"] = {}
        try:
            session["user"] = login_user(email, password)
            return "Succes", 200
        except:
            return "Bad request", 400
    elif request.method == "GET":
        session["recommended_games"] = get_rec(user_id=str(session["user"]["localId"]),
                                               user_liked_games=session["liked_games_list"],
                                               age=session["age"], gender=session["gender"])
        return jsonify(session["recommended_games"])


@app.route('/games', methods=['GET', 'POST'])
def games():
    if request.method == "GET":
        games = csv_to_json("games_dataset.csv")
        return jsonify(games)
    elif request.method == "POST":
        session["liked_games_list"] = request.json["likedGamesList"]
        new_dict = {}
        name = []
        rating = []
        for key, value in session["liked_games_list"].items():
            name.append(key)
            rating.append(value)

        new_dict["name"] = name
        new_dict["rating"] = rating

        session["liked_games_list"] = new_dict

        if not session["liked_games_list"]:
            return "Empty", 400

        return "Succes", 200
    pass


@app.route('/gettopn', methods=['GET'])
def gettopN():
    top10 = get_topN(10)

    return jsonify(top10)


port = int(os.environ.get('PORT', 3000))
if __name__ == '__main__':
    app.run(threaded=True, host='0.0.0.0', port=port)
