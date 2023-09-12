import React from 'react';

const Checkout = ({ cart, checkout }) => {
  // Hitung total harga dari film-film di keranjang
  const total = cart.reduce((acc, movie) => acc + movie.price, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
      <ul>
        {cart.map((movie) => (
          <li key={movie.imdbID}>
            {movie.Title} - {movie.price}
            <button onClick={() => removeFromCart(movie)}>Hapus dari Keranjang</button>
          </li>
        ))}
      </ul>
      <p>Total: {total}</p>
      <button onClick={checkout}>Checkout</button>
    </div>
  );
};

export default Checkout;
