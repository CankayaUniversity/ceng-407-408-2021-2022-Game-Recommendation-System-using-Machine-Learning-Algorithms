import pandas as pd
import numpy as np
from scipy import sparse
from lightfm import LightFM


def create_interaction_matrix(df, user_col, item_col, rating_col, norm=False, threshold=None):
    interactions = df.groupby([user_col, item_col])[rating_col] \
        .sum().unstack().reset_index(). \
        fillna(0).set_index(user_col)
    if norm:
        interactions = interactions.applymap(lambda x: 1 if x > threshold else 0)
    return interactions


def create_user_dict(interactions):
    user_id = list(interactions.index)
    user_dict = {}
    counter = 0
    for i in user_id:
        user_dict[i] = counter
        counter += 1
    return user_dict


def create_item_dict(df, id_col, name_col):
    item_dict = {}
    for i in range(df.shape[0]):
        item_dict[(df.loc[i, id_col])] = df.loc[i, name_col]
    return item_dict


def runMF(interactions, n_components=30, loss='warp', k=15, epoch=30, n_jobs=4,item_features=None,user_features=None):
    x = sparse.csr_matrix(interactions.values)
    model = LightFM(no_components=n_components, loss=loss, k=k)
    model.fit(x, epochs=epoch, num_threads=n_jobs,item_features=item_features,user_features=user_features)

    return model

def runMF_for_evaluate(interactions, n_components=30, loss='warp', k=15, epoch=30, n_jobs=4,item_features=None,user_features=None):
    #x = sparse.csr_matrix(interactions.values)
    model = LightFM(no_components=n_components, loss=loss, k=k)
    model.fit(interactions, epochs=epoch, num_threads=n_jobs,item_features=item_features,user_features=user_features)
    return model


def sample_recommendation_user(model, interactions, user_id, user_dict,
                               item_dict, threshold=0, nrec_items=10, show=True):
    n_users, n_items = interactions.shape
    user_x = user_dict[user_id]
    scores = pd.Series(model.predict(user_x, np.arange(n_items)))
    scores.index = interactions.columns
    scores = list(pd.Series(scores.sort_values(ascending=False).index))

    known_items = list(pd.Series(interactions.loc[user_id, :] \
                                     [interactions.loc[user_id, :] > threshold].index) \
                       .sort_values(ascending=False))

    scores = [x for x in scores if x not in known_items]
    return_score_list = scores[0:nrec_items]
    known_items = list(pd.Series(known_items).apply(lambda x: item_dict[x]))
    scores = list(pd.Series(return_score_list).apply(lambda x: item_dict[x]))
    if show == True:
        print("Known Likes:")
        counter = 1
        for i in known_items:
            print(str(counter) + '- ' + i)
            counter += 1

        print("\n Recommended Items:")
        counter = 1
        for i in scores:
            print(str(counter) + '- ' + i)
            counter += 1
    return scores
