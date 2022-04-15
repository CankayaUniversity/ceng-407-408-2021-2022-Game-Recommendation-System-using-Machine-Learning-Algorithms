from sklearn.model_selection import train_test_split

from src.generic_preprocessing import *
# import matplotlib.pyplot as plt
from src.recsys import *

ratings = pd.read_csv('D:\\dev\\PROJECTS\\ceng-407-408-2021-2022-Game-Recommendation-System-using-Machine-Learning-Algorithms\RecoSystem\\src\\final_dataset1.csv')  # reading dataset

X = ratings.iloc[:, :-1]
y = ratings.iloc[:, -1]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)  # dataset %20test %80train

interactions = create_interaction_matrix(df=ratings,
                                         user_col='user_id',
                                         item_col='appid',
                                         rating_col='rating')
interactions1 = create_interaction_matrix(df=X_train,
                                          user_col='user_id',
                                          item_col='name',
                                          rating_col='rating')
interactions2 = create_interaction_matrix(df=X_test,
                                          user_col='user_id',
                                          item_col='name',
                                          rating_col='rating')

user_dict = create_user_dict(interactions=interactions)

game_dict = create_item_dict(df=ratings,
                             id_col='appid',
                             name_col='name')

mf_model = runMF(interactions=interactions1,
                 n_components=30,
                 loss='warp',
                 epoch=30,
                 n_jobs=4)


# rec_list = sample_recommendation_user(model=mf_model,
#                                       interactions=interactions,
#                                       user_id=14153959,
#                                       user_dict=user_dict,
#                                       item_dict=game_dict,
#                                       threshold=0,
#                                       nrec_items=10,
#                                       show=True)

def get_recommendations(user_id, liked_games):
    rec_to_send = sample_recommendation_user(model=mf_model,
                                             interactions=interactions,
                                             user_id=user_id,
                                             user_dict=user_dict,
                                             item_dict=game_dict,
                                             threshold=0,
                                             nrec_items=25,
                                             show=True)

    name_set = []
    rating_set = []
    for x, y in liked_games.items():  # making seperate sets of dictionary
        name_set.append(x)
        rating_set.append(y)
        appid_of_GivenGameName = ratings[ratings['name'] == x]['appid']  # to get appid of the given name
        # liked_games.update({"user_id": user_id})

    userToLikedGames = {  # making dict to dataframe to write it on csv
        'user_id': [user_id],
        'name': [x],
        'rating': [y],
        'appid': [appid_of_GivenGameName]
    }

    userToLikedGames.to_csv('./final_dataset1.csv', mode='a', index=False, header=False)

    return rec_to_send
