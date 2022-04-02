import pandas as pd
csv_path = "games_dataset.csv"


def csv_to_json(csv_path):
    df = pd.read_csv(csv_path)

    col = df.to_json()
    return col
    pass
