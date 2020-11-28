import React from "react";
import "./Product.css";
import StarIcon from "@material-ui/icons/Star";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useStateValue } from "./StateProvider";

function Product({ id, title, price, image, rating }) {
  const [{ Cart }, dispatch] = useStateValue();

  console.log(Cart);

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_Cart",
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
          <small>₹</small>
          <strong>{price.toFixed(2)}</strong>
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
      <button onClick={addToCart}>
        Add to Cart <ShoppingCartIcon style={{ marginLeft: "5px" }} />
      </button>
    </div>
  );
}

export default Product;
