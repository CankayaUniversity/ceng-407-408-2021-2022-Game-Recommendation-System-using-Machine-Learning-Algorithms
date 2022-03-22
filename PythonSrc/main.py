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


ratings = pd.read_csv('./final_dataset1.csv')
print(ratings.head())
interactions = create_interaction_matrix(df = ratings,
                                         user_col = 'user_id',
                                         item_col = 'appid',
                                         rating_col = 'rating')
print(interactions.head())

# Create User Dict
user_dict = create_user_dict(interactions=interactions)
# Create Item dict
movies_dict = create_item_dict(df = ratings,
                               id_col = 'appid',
                               name_col = 'name')
X = ratings.iloc[:, :-1]
y = ratings.iloc[:, -1]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)
print(X_train)
print(y_train)

mf_model = runMF(interactions = interactions,
                 n_components = 30,
                 loss = 'warp',
                 epoch = 30,
                 n_jobs = 4)
print(mf_model)
rec_list = sample_recommendation_user(model = mf_model,
                                      interactions = interactions,
                                      user_id = 14153959,
                                      user_dict = user_dict,
                                      item_dict = movies_dict,
                                      threshold = 0,
                                      nrec_items = 10,
                                      show = True)
print(rec_list)

# games = pd.read_csv('H:\PycharmProjects\pythonProject\steam-200k.csv')
# games.head()

# data = fetch_movielens()
#
# train = data['train']
# test = data['test']
# model = LightFM(learning_rate=0.05, loss='bpr')
# model.fit(train, epochs=10)
#
# train_precision = precision_at_k(model, train, k=10).mean()
# test_precision = precision_at_k(model, test, k=10, train_interactions=train).mean()
# train_auc = auc_score(model, train).mean()
# test_auc = auc_score(model, test, train_interactions=train).mean()
# print('Precision: train %.2f, test %.2f.' % (train_precision, test_precision))
# print('AUC: train %.2f, test %.2f.' % (train_auc, test_auc))