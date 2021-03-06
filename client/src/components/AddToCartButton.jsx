import React from "react";
import { useStateValue } from "../utils/StateProvider";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

function AddToCartButton({ id, title, price, image, rating }) {
  const [{}, dispatch] = useStateValue();

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      item: {
        id: id,
        title: title,
        price: price,
        image: image,
        quantity: 1,
        rating: rating,
      },
    });
  };

  return (
    <button className="amazon_button" onClick={addToCart}>
      <ShoppingCartIcon style={{ marginRight: "5px" }} />
      Add to Cart
    </button>
  );
}

export default AddToCartButton;
