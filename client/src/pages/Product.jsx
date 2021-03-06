import React, { useEffect, useState } from "react";
import "./styles/Product.css";

import axios from "axios";
import StarIcon from "@material-ui/icons/Star";

import Header from "../components/Header";
import Footer from "../components/Footer";

import AddToCartButton from "../components/AddToCartButton";
import BuyNowBtn from "../components/BuyNowBtn";

import {
  AiFillFacebook,
  AiOutlineMail,
  AiOutlineTwitter,
} from "react-icons/ai";

import { FaPinterest } from "react-icons/fa";

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
          <p>
            Price: <span className="product-price">${product.price}</span>
          </p>
          <p>Inclusive of all taxes.</p>
          <p>
            FREE delivery: <strong>Friday</strong>
          </p>
          <p style={{ color: "#438a5e" }}>In stock.</p>
          <div className="button-box">
            <AddToCartButton
              id={product?.id}
              title={product?.title}
              price={product?.price}
              image={product?.img}
              rating={product?.rating}
            />
            <BuyNowBtn
              id={product?.id}
              title={product?.title}
              price={product?.price}
              image={product?.img}
              rating={product?.rating}
            />
            <button className="amazon_button_2">Add to Wishlist</button>
            <p className="share_product">
              Share <AiFillFacebook />
              <AiOutlineMail />
              <AiOutlineTwitter />
              <FaPinterest />
            </p>
          </div>
          <p>
            <strong>About the product</strong>
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
            cum nam hic magnam. Numquam recusandae quibusdam sit dolores quis
            voluptate esse, nostrum repellendus. Aliquam amet beatae,
            necessitatibus temporibus perspiciatis at! Perspiciatis voluptatibus
            laudantium quasi dolorem, ab nesciunt debitis ad. Explicabo magnam
            earum, laboriosam voluptatibus, nulla, placeat delectus cupiditate
            est deleniti facere quam saepe ducimus animi commodi inventore.
            Numquam, dolor placeat. Ratione quibusdam ullam, quam iusto eaque
            sunt quae quis, rerum reprehenderit nostrum voluptate cumque atque,
            doloremque ipsum aperiam! Nemo, eaque.
          </p>
          <p>
            Similique in suscipit pariatur deserunt quisquam rerum aspernatur
            repellat non! Deserunt officia dolores omnis repudiandae aperiam
            voluptatum dicta accusantium quas soluta ab, vero earum ipsam
            cupiditate quibusdam, sit nesciunt? Nam a eligendi optio? Nostrum
            eaque nihil, doloribus id quidem eligendi? Obcaecati asperiores a
            incidunt illum quas modi at minus similique repellendus dicta fuga,
            accusantium aliquid officiis et delectus adipisci soluta voluptatem
            debitis nostrum magni ea quibusdam quis sunt alias? Similique. Nisi
            quos et porro laudantium exercitationem vero amet soluta cupiditate
            vel dignissimos autem impedit nobis omnis atque est vitae corrupti
            dolor unde, facere ex hic consectetur dolores iure. Dolore,
            nesciunt?
          </p>
          <p>
            Hic officiis corporis inventore iste impedit. Natus, ratione facilis
            possimus alias aspernatur tempora debitis quisquam tempore rerum.
            Cupiditate maxime temporibus incidunt dicta mollitia aperiam ex
            itaque, laudantium a officia eveniet.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Product;
