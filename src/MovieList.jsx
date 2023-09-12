import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MovieList = ({ addToCart }) => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = "66a6bd80"; // Replace with your OMDb API key
        const response = await axios.get(
          `http://www.omdbapi.com/?apikey=${apiKey}&s=avengers&page=${currentPage}`
        );
        const fixedPrices = [500000, 600000, 700000, 800000, 900000]; // Example prices

        // Assign fixed prices to each movie based on their order
        const moviesWithFixedPrices = response.data.Search.map(
          (movie, index) => ({
            ...movie,
            price: fixedPrices[index] || 1000000, // Use a default price if needed
          })
        );
        setMovies(moviesWithFixedPrices);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [currentPage]);

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
    const formattedPrice = priceString
      .replace(/\s?IDR\s?/, "")
      .replace(/,0+$/, "");

    // Return the formatted price
    return formattedPrice;
  }
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <Link
              to={`/movie/${movie.imdbID}`}
              state={{ price: movie.price }}
              className="block"
            >
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{movie.Title}</h2>
                <p className="text-gray-700">Year: {movie.Year}</p>
                <p className="text-gray-700">Genre: Action, Adventure</p>{" "}
                {/* Replace with actual genre data */}
                {/* <p className="text-gray-700">Price: ${Math.floor(Math.random() * 900000) + 100000}</p> Random price */}
                <p className="text-gray-700">
                  Price: {formatRupiah(movie.price)}
                </p>{" "}
              </div>
            </Link>
            <div className="p-4 border-t border-gray-200">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md w-full"
                onClick={() => addToCart(movie)} >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button
          onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded-md mr-2"
        >
          Previous Page
        </button>
        <button
          onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default MovieList;
