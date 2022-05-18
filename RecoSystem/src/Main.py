from src.New_User import *

thisdict = {
  "name": ["star wars republic commando","the escapists","the ship","stranded deep"],
  "rating": ["5","3","2","1"]
}
new_user = check_if_new_user(user_id=111)
if new_user == 1:
    write_to_csv(user_id=111,liked_games=thisdict)

from src.Recommendation import get_recommendations

def get_rec(user_id, user_liked_games):
    return get_recommendations(user_id=user_id, liked_games=user_liked_games)
get_rec(111, thisdict)

def get_top_n(n):
    pass