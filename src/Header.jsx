import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

function Header() {
  return (
    <div className="header">
      <img
        className="headerLogo"
        src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
        alt="..."
      />
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
        <div className="headerOption headerOptionBasket">
          <ShoppingCartIcon />
          <span className="header_BasketCount">0</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
