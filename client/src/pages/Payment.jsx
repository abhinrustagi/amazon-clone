import React, { useState, useEffect } from "react";
import "./styles/Payment.css";
import { useStateValue } from "../utils/StateProvider";
import CartItem from "../components/CartItem";
import { Link, useHistory } from "react-router-dom";
import { getCartTotal } from "../utils/reducer";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import axios from "../utils/axios";
// import { db } from "../utils/firebase";

function Payment() {
  const history = useHistory();
  const [{ Cart, user }, dispatch] = useStateValue();

  const [address, setAddress] = useState(null);

  if (user) {
    // db.collection("users")
    //   .doc(user?.uid)
    //   .collection("userInformation")
    //   .doc("ContactInfo")
    //   .get()
    //   .then((doc) => {
    //     if (doc.exists) {
    //       setAddress(doc.data().address);
    //     } else {
    //       console.log("No data found");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getCartTotal(Cart) * 100}`,
      });

      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [Cart]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then((response) => {
        var paymentIntent;
        console.log(response);

        if (response.error) {
          paymentIntent = response.error.payment_intent;
        } else {
          paymentIntent = response.paymentIntent;
        }

        console.log(Cart, user, paymentIntent);
        // db.collection("users")
        //   .doc(user?.uid)
        //   .collection("orders")
        //   .doc(paymentIntent.id)
        //   .set({
        //     cart: Cart,
        //     amount: paymentIntent.amount,
        //     created: paymentIntent.created,
        //   });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_CART",
        });

        history.replace("/orders");
      })
      .catch((response) => {
        console.log(response);
      });
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          Checkout (<Link to="/checkout">{Cart?.length} items</Link>)
        </h1>

        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className="address">
            <p>{user?.email}</p>
            {address ? (
              address.map((line) => <p>{line}</p>)
            ) : (
              <p>Please add an address</p>
            )}
          </div>
        </div>

        <hr />

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

        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment details</h3>
          </div>
          <div className="payment_details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment_price">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3>Order Total: {value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getCartTotal(Cart)}
                  displayType={"text"}
                  thousandSeparator={true}
                  // prefix={"₹"}
                  prefix={"$"}
                />
                <button
                  type="submit"
                  disabled={processing || disabled || succeeded}
                >
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
