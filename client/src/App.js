import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Payment from "./pages/Payment";
import Orders from "./pages/Orders";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import ProductPage from "./pages/Product";

// import { auth } from "./utils/firebase";
import { useStateValue } from "./utils/StateProvider.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Cookies from "js-cookie";
import Decode from "jwt-decode";

const promise = loadStripe(
  "pk_test_51Ht8elBxnpb4clRfmRI1KWdjrE0z5IZgDeOOhC8e0WWFeKP7B18rnFVFf2CbUl21uYIwwuBXvWxLxiayVXhdvKsB00q7EcH5g6"
);

function App() {
  // const [{}, dispatch] = useStateValue();
  // useEffect(() => {
  //   auth.onAuthStateChanged((authUser) => {
  //     if (authUser) {
  //       dispatch({ type: "SET_USER", user: authUser });
  //     } else {
  //       dispatch({ type: "SET_USER", user: null });
  //     }
  //   });
  // }, []);

  useEffect(() => {
    const localUser = Cookies.get("thisUser");
    if (localUser) {
      const decoded = Decode(localUser);
      dispatchEvent({ type: "SET_USER", user: decoded });
    } else {
      console.log("Not found.");
    }
  }, []);

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

          <Route exact path="/register">
            <Register />
          </Route>

          <Route exact path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
            <Footer />
          </Route>

          <Route exact path="/profile">
            <Header />
            <Profile />
            <Footer />
          </Route>

          <Route exact path="/orders">
            <Header />
            <Orders />
            <Footer />
          </Route>

          <Route exact path="/products/id" component={ProductPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
