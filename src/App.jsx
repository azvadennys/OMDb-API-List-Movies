import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieList from "./MovieList";
import MovieDetail from "./MovieDetail";
import Cart from "./Cart";
import { Link } from "react-router-dom";
function App() {
  const [cart, setCart] = useState([]);

  // Fungsi untuk menambah film ke keranjang
  const addToCart = (movie) => {
    setCart([...cart, movie]);
    console.log(cart);
  };

  // Fungsi untuk menghapus film dari keranjang
  const removeFromCart = (movie) => {
    const updatedCart = cart.filter((item) => item.imdbID !== movie.imdbID);
    setCart(updatedCart);
  };

  // Fungsi untuk checkout (mengosongkan keranjang)
  const checkout = () => {
    setCart([]);
  };

  return (
    <Router>
      <header class="bg-gray-800 py-4">
        <div class="container mx-auto px-4 flex justify-between items-center">
          <h1 class="text-3xl font-bold mx-auto ">
            <a class="text-white items-center mb-4" href="/">
              OMDb Movies
            </a>
          </h1>
          <Link
              to={`/cart`}
              state={{ carts: cart }}
              className="text-2lg font-bold mx-end lock text-white"
            >
              CART
            </Link>
         
        </div>
      </header>
      <div className="App">
        <Routes>
          <Route exact path="/movie/:id" element={<MovieDetail />}></Route>
          <Route exact path="/" element={<MovieList addToCart={addToCart} />} ></Route>
          <Route exact path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
