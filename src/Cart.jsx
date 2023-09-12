import React from "react";
import { useParams, useLocation } from "react-router-dom";

const Cart = ({ cart, removeFromCart }) => {
  const location = useLocation();

  // Access the custom data from the state
  const { carts } = location.state;
  cart = carts;
  console.log(cart);
  return (
    <div className="bg-gray-100 p-4">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      {carts.map((movie, index) => (
        <div
          key={index}
          className="border rounded p-4 mb-4 flex items-center justify-between"
        >
          <div className="flex items-center">
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-24 h-auto mr-4"
            />
            <div>
              <h3 className="text-lg font-semibold">{movie.Title}</h3>
              <p>Type: {movie.Type}</p>
              <p>Year: {movie.Year}</p>
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold">
              Rp {movie.price.toLocaleString()}
            </p>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              onClick={() => removeFromCart(movie)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
