import React from "react";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { useStateValue } from "../utils/StateProvider";
import { useHistory } from "react-router-dom";

function BuyNowBtn({ id, title, price, image, rating }) {
  const [{}, dispatch] = useStateValue();

  const History = useHistory();

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

  return (
    <button className="amazon_button_3" onClick={buyNow}>
      <PlayArrowIcon style={{ marginRight: "5px" }} />
      Buy Now
    </button>
  );
}

export default BuyNowBtn;
