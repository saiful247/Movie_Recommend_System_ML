from flask import Flask, request, jsonify
from flask_cors import CORS
import util

app = Flask(__name__)
CORS(app)


@app.route('/get_recommendations', methods=['POST'])
def get_recommendation():
    try:
        data = request.get_json()
        movie_title = data.get('movie_title', '')
        recomList = util.recommend_movies(movie_title)

        response = jsonify({'recomList': recomList})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    except Exception as e:
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    print('Starting Python Flask Server for Movie Recommendation')
    util.load_saved_artifacts()
    app.run()
