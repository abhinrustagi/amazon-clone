import React from "react";
import "./styles/CartItem.css";
import { useStateValue } from "../utils/StateProvider";
import StarIcon from "@material-ui/icons/Star";

const CartItem = ({ title, image, price, rating, id }) => {
  const [{ Cart }, dispatch] = useStateValue();

  const removeFromCart = () => {
    dispatch({
      type: "REMOVE_FROM_CART",
      id: id,
    });
    console.log("Removed");
  };

  return (
    <div className="Cart_item">
      <img src={image} alt="..." className="Cart_item_image" />
      <div className="CartItem_info">
        <h3>{title}</h3>
        <p className="productPrice">
          <small>₹</small>
          <strong>{price.toFixed(2)}</strong>
        </p>
        <div className="productRating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon className="productRatingStar" />
            ))}
        </div>
        <button class="removeButton" onClick={removeFromCart}>
          Remove Item from Cart
        </button>
      </div>
    </div>
  );
};

export default CartItem;
