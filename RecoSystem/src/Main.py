from src.Recommendation import get_recommendations


def get_rec(user_id, item_count):
    return get_recommendations(user_id=user_id, liked_games=item_count)


def get_top_n(n):
    pass
