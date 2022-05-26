import pandas as pd


def csv_to_json(csv_path="games_dataset.csv"):
    df = pd.read_csv(csv_path,encoding='cp1252')

    col = df.to_json()
    return col
    pass
