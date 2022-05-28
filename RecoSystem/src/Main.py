from src.New_User import *
from pandas import read_csv
from collections import Counter
from src.Recommendation import get_recommendations
from pandas import read_csv
from collections import Counter

def check_user(user_id, user_liked_games, age, gender):
    new_user = check_if_new_user(user_id=user_id)
    if new_user:
        if user_liked_games:
            write_to_csv(user_id=user_id, liked_games=user_liked_games, age=age, gender=gender)





def get_rec(user_id, user_liked_games, age, gender):
    return get_recommendations(user_id=user_id, liked_games=user_liked_games, age=age, gender=gender)


def get_topN(n):
    data = read_csv("..\\src\\final_dataset1.csv")
    name = data['name'].tolist()
    c = Counter(name)
    topN_games = []
    for item in c.most_common(n):
        for x in item:
            if type(x) == str:
                topN_games.append(x)
    return topN_games
