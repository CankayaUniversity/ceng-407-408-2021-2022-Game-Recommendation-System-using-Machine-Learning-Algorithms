from sklearn.model_selection import train_test_split
# import matplotlib.pyplot as plt
from src.recsys import *
import pandas as pd

ratings = pd.read_csv('..\\src\\final_dataset1.csv')  # reading dataset

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

    name_set = []
    rating_set = []
    user_set= []
    app_set = []
    games_updated = []

    user_df = ratings.loc[ratings['user_id'] == user_id]
    user_known_games_df = user_df['name']
    user_known_games = user_known_games_df.values   #user's previous rated games name in dataset
    user_known_games_rating_df = user_df['rating']

    game_len = len(user_known_games_df)
    for a in range(0,game_len):         #2 times
        for x in range(0,len(liked_games)):     #4times
            liked_games_name = liked_games.get('name')      #coming names
            liked_games_rating = liked_games.get('rating')  #coming ratings
            if user_known_games_df.values[a] == liked_games_name[x]:    #datasetteki her oyun ismini gelenle karsılastır

                if str(user_known_games_rating_df.values[a])!=liked_games_rating[x]:    #eger isimler eşitse ratingleri karşılastır. ratingler eşit degilse updatele
                    user_known_games_rating_df.values[a]=liked_games_rating[x]

                    row = user_df.index[user_df['name'] == liked_games_name[x]]     #oyunun eşit oldugu rowun sayısı
                    row_in_ratings = ratings.loc[row[0]]                            #that row
                    row_in_ratings['rating']=liked_games_rating[x]                  #ratingi değiştir
                    ratings.loc[row[0]] = row_in_ratings                            #rowa geri yaz
                    games_updated.append(user_known_games_df.values[a])
                    ratings.to_csv('..\\src\\final_dataset1.csv', mode='w', index=False, header=True, sep=',', quoting=False)


    counter = 0 #counter for rating index
    for x in liked_games.get('name'):  # making seperate sets of dictionary
        flag=0
        rating_to_write = liked_games['rating']
        for y in user_known_games:
            if x==y:                # if game names are equal do not write to csv
                flag=1
        if flag==0:
            name_set.append(x)
            rating_set.append(rating_to_write[counter])
            appid_of_GivenGameName = ratings.loc[ratings['name'] == x]['appid'].values[0]  # appid of game
            user_set.append(user_id)
            app_set.append(appid_of_GivenGameName)
        counter +=1

    userToLikedGames = {  # making dict to dataframe to write it on csv
        'user_id': user_set,
        'name': name_set,
        'rating': rating_set,
        'appid': app_set
    }
    userToLikedGames = pd.DataFrame.from_dict(userToLikedGames)

    userToLikedGames.to_csv('..\\src\\final_dataset1.csv', mode='a', index=False, header=False, sep=',', quoting=False)

    rec_to_send = sample_recommendation_user(model=mf_model,
                                             interactions=interactions,
                                             user_id=user_id,
                                             user_dict=user_dict,
                                             item_dict=game_dict,
                                             threshold=0,
                                             # nrec_items=25,
                                             show=True)
    print(rec_to_send)

    return rec_to_send