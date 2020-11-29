import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./login";
import Footer from "./Footer";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Header />
            <Home />
            <Footer />
          </Route>
          <Route exact path="/checkout">
            <Header />
            <Checkout />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
