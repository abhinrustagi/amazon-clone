import React from "react";
import "./Header.css";

import { Link } from "react-router-dom";

import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useStateValue } from "./StateProvider.js";

function Header() {
  const [{ Cart }, dispatch] = useStateValue();

  return (
    <div className="header">
      <Link to="/">
        <img
          className="headerLogo"
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="..."
        />
      </Link>
      <div className="headerSearch">
        <input className="headerSearchInput" type="text" />
        <SearchIcon className="headerSearchIcon" />
      </div>
      <div className="headerNav">
        <div className="headerOption">
          <span className="headerOption_Line1">Hello, Guest</span>Sign In
        </div>
        <div className="headerOption">
          <span className="headerOption_Line1">Returns</span>& Orders
        </div>
        <div className="headerOption">
          <span className="headerOption_Line1">Your</span>Prime
        </div>
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
