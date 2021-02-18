import React from "react";
import "./styles/Product.css";
import StarIcon from "@material-ui/icons/Star";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { useStateValue } from "../utils/StateProvider";

function Product({ id, title, price, image, rating }) {
  const [{ Cart }, dispatch] = useStateValue();

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      item: {
        id: id,
        title: title,
        price: price,
        image: image,
        rating: rating,
      },
    });
  };

  return (
    <div className="product">
      <div className="productInfo">
        <p className="productTitle">{title}</p>
        <p className="productPrice">
          {/* <small>$</small> */}
          <strong>${price.toFixed(2)}</strong>
        </p>

        <div className="productRating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon className="productRatingStar" />
            ))}
        </div>
      </div>

      <img src={image} alt="..." />

      <button className="amazon_button" onClick={addToCart}>
        <ShoppingCartIcon style={{ marginRight: "5px" }} />
        Add to Cart
      </button>
      <button className="buy_now_button">
        <PlayArrowIcon style={{ marginRight: "5px" }} />
        Buy Now
      </button>
      <span className="add_to_wishlist">Add to Wishlist</span>
    </div>
  );
}

export default Product;
