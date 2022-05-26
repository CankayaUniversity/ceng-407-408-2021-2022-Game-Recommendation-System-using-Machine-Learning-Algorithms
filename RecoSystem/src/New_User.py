import pandas as pd

ratings = pd.read_csv('..\\src\\final_dataset1.csv')  # reading dataset

def check_if_new_user(user_id):
    new_user_flag = False
    user_df = ratings.loc[ratings['user_id'] == user_id]
    if user_df.empty:
        new_user_flag=True
    return new_user_flag

def write_to_csv(user_id, liked_games,age,gender):
    name_set = []
    rating_set = []
    user_set= []
    app_set = []
    age_set = []
    gender_set = []
    if not liked_games:
        return

    counter = 0         # counter for rating index
    for x in liked_games.get('name'):  # making separate sets of dictionary
        rating_to_write = liked_games['rating']

        name_set.append(x)
        rating_set.append(rating_to_write[counter])
        appid_of_GivenGameName = ratings.loc[ratings['name'] == x]['appid'].values[0]  # app id of game
        user_set.append(user_id)
        app_set.append(appid_of_GivenGameName)
        age_set.append(age)
        gender_set.append(gender)
        counter +=1

    userToLikedGames = {  # making dict to dataframe to write it on csv
        'user_id': user_set,
        'name': name_set,
        'rating': rating_set,
        'appid': app_set,
        'age': age_set,
        'gender': gender_set
    }
    userToLikedGames = pd.DataFrame.from_dict(userToLikedGames)

    userToLikedGames.to_csv('..\\src\\final_dataset1.csv', mode='a', index=False, header=False, sep=',', quoting=False)