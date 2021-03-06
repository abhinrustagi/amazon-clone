import React from "react";
import "./styles/Product.css";
import StarIcon from "@material-ui/icons/Star";
import { useStateValue } from "../utils/StateProvider";
import { Link, useHistory } from "react-router-dom";

import AddToCartButton from "./AddToCartButton";
import BuyNowBtn from "./BuyNowBtn";

function Product({ id, title, price, image, rating }) {
  const [{ user }, dispatch] = useStateValue();

  const History = useHistory();

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
        <Link to={`/products/${id}`}>
          <p className="productTitle">{title}</p>
        </Link>
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
        <AddToCartButton
          id={id}
          title={title}
          price={price}
          image={image}
          rating={rating}
        />
        <BuyNowBtn
          id={id}
          title={title}
          price={price}
          image={image}
          rating={rating}
        />

        <span className="add_to_wishlist" onClick={addToWishlist}>
          Add to Wishlist
        </span>
      </div>
    </div>
  );
}

export default Product;
