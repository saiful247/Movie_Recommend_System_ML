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
      ).innerHTML = `<h2>Error predicting Recommenstion</h2>`;
    }
  };

  return (
    <div>
      <h1>Movie recommendation System</h1>
      <input
        id="movie_title"
        name="movie_title"
        type="text"
        defaultValue="Avatar"
      />
      <button onClick={onClickRecommend}>Recommend Movies</button>
      <div id="uiRecommendedMovies"></div>
    </div>
  );
};

export default Home;
