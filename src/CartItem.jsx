import React from "react";
import "./Cartitem.css";
import { useStateValue } from "./StateProvider";

const CartItem = ({ title, image, price, rating, id }) => {
  const [{ Cart }, dispatch] = useStateValue();

  // const removeFromCart = () => {
  //   dispatch({
  //     type: "REMOVE_FROM_Cart",
  //     item: {
  //       id: id,
  //       title: title,
  //       image: image,
  //       price: price,
  //       rating: rating,
  //     },
  //   });
  // };

  return (
    <div className="Cart_item">
      <img src={image} alt="..." className="Cart_item_image" />
      <div className="CartItem_info">
        <h3>{title}</h3>
        <p className="productPrice">
          <small>₹</small>
          <strong>{price.toFixed(2)}</strong>
        </p>

        <button>Remove Item from Cart</button>
      </div>
    </div>
  );
};

export default CartItem;
