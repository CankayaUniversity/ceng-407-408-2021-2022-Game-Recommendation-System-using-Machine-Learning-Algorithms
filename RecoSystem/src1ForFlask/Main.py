from Recommendation import *

def get_rec(user_id, liked_games):
    return Recommendation.get_recommendations(user_id, liked_games)
