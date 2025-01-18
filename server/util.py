import pickle

__tdidf = None
__cosin_sim = None
__movies_df = None


def load_saved_artifacts():
    global __tdidf
    global __cosin_sim
    global __movies_df

    with open("./artifacts/tfidf_vectorizer.pkl", "rb") as f:
        __tdidf = pickle.load(f)

    with open("./artifacts/cosine_similarity_tfidf.pkl", "rb") as f:
        __cosin_sim = pickle.load(f)

    with open("./artifacts/movie_data_tfidf.pkl", "rb") as f:
        __movies_df = pickle.load(f)


def recommend_movies(title):
    try:
        idx = __movies_df[__movies_df['title'] == title].index[0]

        sim_scores = list(enumerate(__cosin_sim[idx]))

        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

        sim_scores = sim_scores[1:11]  # Exclude the first one (itself)

        movie_indices = [i[0] for i in sim_scores]

        # Return the titles of the top 10 most similar movies
        return __movies_df['title'].iloc[movie_indices].tolist()
    except IndexError:
        return ["Movie not found in the database."]
