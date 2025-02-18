import { useState } from "react";

import Cart from "components/Cart";
import PageNotFound from "components/pageNotFound";
import { Product } from "components/Product";
import { ProductList } from "components/ProductList";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.css";
import CartContext from "./contexts/cartContext";

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <CartContext.Provider value={[cartItems, setCartItems]}>
      <Switch>
        <Route exact component={ProductList} path="/products" />
        <Route exact component={Product} path="/products/:slug" />
        <Route exact component={Cart} path="/cart" />
        <Route exact path="/checkout" />
        <Redirect exact from="/" to="/products" />
        <Route component={PageNotFound} path="*" />
      </Switch>
    </CartContext.Provider>
  );
};

export default App;
