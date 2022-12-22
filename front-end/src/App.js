import Header from "./components/Layout/Header";
import React, { useState } from "react";
import "./App.css";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

const App = () => {
  const [displayCart, setDisplayCart] = useState(false);

  const showCartItems = (value) => {
    setDisplayCart(value);
  };

  return (
    <CartProvider>
      {displayCart && <Cart showCartItems={showCartItems} />}
      <Header showCartItems={showCartItems} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
};

export default App;
