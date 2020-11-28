import React from "react";
import "./Product.css";
import StarIcon from "@material-ui/icons/Star";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

function Product({ id, title, price, image, rating }) {
  return (
    <div className="product">
      <div className="productInfo">
        <p className="productTitle">{title}</p>
        <p className="productPrice">
          <small>₹</small>
          <strong>{price}</strong>
        </p>
        <div className="productRating">
          {Array(rating)
            .fill()
            .map((_, i) => {
              <p>
                <StarIcon className="productRatingStar" />
              </p>;
            })}
        </div>
      </div>
      <img src={image} alt="..." />
      <button>
        Add to Basket <ShoppingCartIcon style={{ marginLeft: "5px" }} />
      </button>
    </div>
  );
}

export default Product;
