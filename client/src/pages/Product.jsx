import React, { useEffect, useState } from "react";
import "./styles/Product.css";

import axios from "axios";
import StarIcon from "@material-ui/icons/Star";

import Header from "../components/Header";
import Footer from "../components/Footer";

function Product({ match }) {
  const [product, setProduct] = useState({});

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `http://localhost:8888/products/${match.params.id}`
      );
      if (response.data.error) {
        alert("There was an error.");
      } else {
        if (response.data.message === "Successful") {
          setProduct({ ...response.data.results });
        } else {
          alert("No Product Found.");
        }
      }
    };

    getData();
  }, [match.params.id]);

  return (
    <div>
      <Header />
      <div className="product-page-container">
        <div className="product-page-img">
          <img
            src={
              product.img
                ? product.img
                : "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
            }
            alt=""
          />
        </div>
        <div className="product_page_content">
          <h2>{product.name}</h2>
          <div className="productRating">
            {Array(product.rating)
              .fill()
              .map((_, i) => (
                <StarIcon className="productRatingStar" />
              ))}
          </div>
          <hr />
          <p className="product-price">${product.price}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Product;
