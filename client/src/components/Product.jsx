import React from "react";
import "./styles/Product.css";
import StarIcon from "@material-ui/icons/Star";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { useStateValue } from "../utils/StateProvider";
import { Link } from "react-router-dom";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import { useHistory } from "react-router-dom";

function Product({ id, title, price, image, rating }) {
  const [{ user }, dispatch] = useStateValue();

  const History = useHistory();

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

  const buyNow = () => {
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

    History.push("/checkout");
  };

  const addToWishlist = () => {
    if (!user) {
      History.push("/login");
    } else {
      console.log("Added.");
    }
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

      <Link to={`/products/${id}`}>
        <img src={image} alt="..." />
      </Link>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <button className="amazon_button" onClick={addToCart}>
          <ShoppingCartIcon style={{ marginRight: "5px" }} />
          Add to Cart
        </button>
        <button className="amazon_button_3" onClick={buyNow}>
          <PlayArrowIcon style={{ marginRight: "5px" }} />
          Buy Now
        </button>
        <span className="add_to_wishlist" onClick={addToWishlist}>
          Add to Wishlist
        </span>
      </div>
    </div>
  );
}

export default Product;
