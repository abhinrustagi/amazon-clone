import React from "react";
import "./styles/Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../utils/StateProvider";
import { getCartTotal } from "../utils/reducer";
import { useHistory } from "react-router-dom";

function Subtotal() {
  const history = useHistory();
  const [{ Cart }, dispatch] = useStateValue();
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({Cart.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal_gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getCartTotal(Cart)}
        displayType={"text"}
        thousandSeparator={true}
        // prefix={"₹"}
        prefix={"$"}
      />
      {Cart.length > 0 ? (
        <button onClick={(e) => history.push("/payment")}>
          Proceed to Checkout
        </button>
      ) : null}
    </div>
  );
}

export default Subtotal;
