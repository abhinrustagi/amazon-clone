import React, { useEffect } from "react";
import axios from "axios";

function Product({ match }) {
  useEffect(() => {
    axios.get(`http://localhost:8888/products/${match.params.id}`);
  }, []);
  return <div></div>;
}

export default Product;
