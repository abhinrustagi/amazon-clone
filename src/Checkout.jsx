import React from "react";
import "./Checkout.css";

import Subtotal from "./Subtotal";

import CartItem from "./CartItem";
import { useStateValue } from "./StateProvider";

import { Link } from "react-router-dom";

function Checkout() {
  const [{ Cart }, dispatch] = useStateValue();
  return (
    <div className="checkout">
      <div className="checkout_left">
        <img
          className="checkout_ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt="..."
        />
        <div>
          <h2 className="checkout_title">Your Shopping Cart</h2>
          {Cart ? (
            <p
              style={{
                fontSize: "1.1rem",
                margin: "15px",
              }}
            >
              Cart is empty. <Link to="/">Continue shopping.</Link>
            </p>
          ) : (
            Cart.map((item) => (
              <CartItem
                id={item.id}
                title={item.title}
                price={item.price}
                image={item.image}
                rating={item.rating}
              />
            ))
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
