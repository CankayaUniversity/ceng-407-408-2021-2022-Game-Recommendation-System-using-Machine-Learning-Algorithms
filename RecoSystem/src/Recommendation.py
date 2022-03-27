import pandas as pd
import sklearn as sk
import numpy as np
from sklearn.model_selection import train_test_split
# import matplotlib.pyplot as plt
from lightfm.datasets import fetch_movielens
from lightfm import LightFM
from sklearn.metrics.pairwise import cosine_similarity
from lightfm.evaluation import precision_at_k, auc_score
from recsys import *
from generic_preprocessing import *
from abc import ABC, abstractmethod

class Recommendation(ABC):
    pass
    ratings = pd.read_csv('./final_dataset1.csv')           #reading dataset

    X = ratings.iloc[:, :-1]
    y = ratings.iloc[:, -1]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)    #dataset %20test %80train

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
    @abstractmethod
    def get_recommendations(self, user_id, item_count):
        pass
        rec_to_send = sample_recommendation_user(model=self.mf_model,
                                                 interactions=self.interactions,
                                                 user_id=user_id,
                                                 user_dict=self.user_dict,
                                                 item_dict=self.game_dict,
                                                 threshold=0,
                                                 nrec_items=item_count,
                                                 show=True)
        return rec_to_send
