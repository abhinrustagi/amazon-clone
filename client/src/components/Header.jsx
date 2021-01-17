import React from "react";
import "./styles/Header.css";

import { useStateValue } from "../utils/StateProvider.js";
import { auth } from "../utils/firebase";
import { Link } from "react-router-dom";

import SearchIcon from "@material-ui/icons/Search";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

function Header() {
  const [{ Cart, user }, dispatch] = useStateValue();

  const handleAuth = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className="header" id="top">
      <Link to="/">
        <img
          className="headerLogo"
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="..."
        />
      </Link>

      <div className="headerOption">
        <span className="headerOption_Line1">Deliver to</span>
        <span className="headerOption_DeliverTo_SecondLine">
          <LocationOnIcon />
          India
        </span>
      </div>

      <div className="headerSearch">
        <input className="headerSearchInput" type="text" />
        <SearchIcon className="headerSearchIcon" />
      </div>

      <div className="headerNav">
        <Link to={!user && "/login"}>
          <div onClick={handleAuth} className="headerOption">
            <span className="headerOption_Line1">
              Hello, {user ? user.email : "Guest"}
            </span>
            {user ? "Sign Out" : "Sign In"}
          </div>
        </Link>

        <Link to="/orders">
          <div className="headerOption">
            <span className="headerOption_Line1">Returns</span>& Orders
          </div>
        </Link>

        <Link to="/profile">
          <div className="headerOption">
            <span className="headerOption_Line1">Your</span>Profile
          </div>
        </Link>

        <Link to="/checkout">
          <div className="headerOption headerOptionCart">
            <ShoppingCartIcon />
            <span className="header_CartCount">{Cart?.length}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
