
import pandas as pd
from sklearn.linear_model import LinearRegression
import numpy as np
from sklearn.model_selection import train_test_split
from lightfm import LightFM
from lightfm.evaluation import precision_at_k, auc_score
df = pd.read_csv('final_dataset1.csv')
print(df)
# print(games_metadata)
# C = games_metadata['rating'].mean()
# print(C)
# model = LightFM(learning_rate=0.05)
# print(model)
# model.fit(games_metadata, epochs=10)
games_metadata_selected = df[['user_id', 'name', 'rating', 'appid']]
# print(games_metadata_selected)
games_metadata_selected.replace('', np.nan, inplace=True)
# print(games_metadata_selected)

X = df.iloc[:, :-1]
y = df.iloc[:, -1]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)        #80 train 20 test


