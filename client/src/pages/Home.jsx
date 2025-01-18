import React from "react";

const Home = () => {
  const onClickRecommend = async () => {
    const url = "http://127.0.0.1:5000/get_recommendations";
    const movie_title = document.getElementById("movie_title").value;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movie_title }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }

      const data = await response.json();
      document.getElementById(
        "uiRecommendedMovies"
      ).innerHTML = `<h2>Recommended Movies: ${data.recomList}</h2>`;
    } catch (error) {
      document.getElementById(
        "uiRecommendedMovies"
      ).innerHTML = `<h2>Error predicting Recommendation</h2>`;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white font-mono">
      <div
        className="bg-gray-800 p-8 rounded-lg shadow-lg transform transition-transform hover:scale-105"
        style={{ width: "400px" }}
      >
        <h1 className="text-xl font-bold mb-4">Movie Recommendation System</h1>
        <input
          id="movie_title"
          name="movie_title"
          type="text"
          placeholder="Type A Movie"
          className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all"
          onFocus={(e) => (e.target.placeholder = "")}
          onBlur={(e) => (e.target.placeholder = "Type A Movie")}
        />
        <button
          onClick={onClickRecommend}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-all"
        >
          Recommend Movies
        </button>
        <div
          id="uiRecommendedMovies"
          className="mt-4 p-4 bg-gray-700 rounded-lg text-sm text-gray-300"
        ></div>
      </div>
    </div>
  );
};

export default Home;
