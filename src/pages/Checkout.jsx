import React from "react";
import "./styles/Checkout.css";

import Subtotal from "../components/Subtotal";
import CartItem from "../components/CartItem";

import { useStateValue } from "../utils/StateProvider";
import { Link, useHistory } from "react-router-dom";

function Checkout() {
  const [{ Cart, user }, dispatch] = useStateValue();
  return (
    <div className="checkout">
      <div className="checkout_left">
        <img
          className="checkout_ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt="..."
        />
        <div>
          {user ? (
            <h3
              style={{
                margin: "auto 15px",
              }}
            >
              {"Hello, " + user.email}
            </h3>
          ) : (
            ""
          )}

          <h2 className="checkout_title">Your Shopping Cart</h2>

          {Cart.length > 0 ? (
            Cart.map((item) => (
              <CartItem
                id={item.id}
                title={item.title}
                price={item.price}
                image={item.image}
                rating={item.rating}
              />
            ))
          ) : (
            <p
              style={{
                fontSize: "1.1rem",
                margin: "15px",
              }}
            >
              Cart is empty. <Link to="/">Continue shopping.</Link>
            </p>
          )}
        </div>
      </div>

      <div className="checkout_right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
