import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams(); // Get IMDb ID from URL parameter

  const [movie, setMovie] = useState(null);
  const location = useLocation();

  // Access the custom data from the state
  const { price } = location.state;
  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const apiKey = "66a6bd80"; // Replace with your OMDb API key
        const response = await axios.get(
          `http://www.omdbapi.com/?apikey=${apiKey}&i=${id}`
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie detail:", error);
      }
    };

    fetchMovieDetail();
  }, [id]);

  // Render movie details
  if (!movie) {
    return <div>Loading...</div>;
  }

  function formatRupiah(price) {
    // Check if the price is a valid number
    if (isNaN(price)) {
      return "Invalid Price";
    }

    // Convert the price to a string and add commas as thousands separators
    const priceString = price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });

    // Remove trailing zeros after the comma (if any)
    const formattedPrice = priceString.replace(/\s?IDR\s?/, '').replace(/,0+$/, '');

    // Return the formatted price
    return formattedPrice;
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">{movie.Title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img src={movie.Poster} alt={movie.Title} className="w-full h-auto" />
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
          <div className="mb-4">
            <p className="text-gray-600">Price: {formatRupiah(price)}</p>
            <p className="text-gray-600">Year: {movie.Year}</p>
            <p className="text-gray-600">Rated: {movie.Rated}</p>
            <p className="text-gray-600">Released: {movie.Released}</p>
            <p className="text-gray-600">Runtime: {movie.Runtime}</p>
            <p className="text-gray-600">Genre: {movie.Genre}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-600">Director: {movie.Director}</p>
            <p className="text-gray-600">Writer: {movie.Writer}</p>
            <p className="text-gray-600">Actors: {movie.Actors}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-600">Plot: {movie.Plot}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-600">Language: {movie.Language}</p>
            <p className="text-gray-600">Country: {movie.Country}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-600">Awards: {movie.Awards}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-600">IMDb Rating: {movie.imdbRating}</p>
            <p className="text-gray-600">IMDb Votes: {movie.imdbVotes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
