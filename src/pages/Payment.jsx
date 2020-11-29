import React from "react";
import "./styles/Payment.css";
import { useStateValue } from "../utils/StateProvider";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";

function Payment() {
  const [{ Cart, user }, dispatch] = useStateValue();
  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          Checkout (<Link to="/checkout">{Cart?.length} items</Link>)
        </h1>
        {/* div address */}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className="address">
            <p>{user?.email}</p>
            <p>Address Line 1</p>
            <p>Address Line 2</p>
          </div>
        </div>
        <hr />
        {/* div review items */}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment_items">
            {Cart.map((item) => (
              <CartItem
                id={item.id}
                title={item.title}
                price={item.price}
                rating={item.rating}
                image={item.image}
              />
            ))}
          </div>
        </div>
        <hr />
        {/* div payment method */}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment details</h3>
          </div>
          <div className="payment_details"></div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
