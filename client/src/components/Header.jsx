import React, { useState, useEffect } from "react";
import "./styles/Header.css";

import axios from "axios";

import { useStateValue } from "../utils/StateProvider.js";
import { Link, useHistory } from "react-router-dom";

import SearchIcon from "@material-ui/icons/Search";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
// import MenuIcon from "@material-ui/icons/Menu";

function Header() {
  const [{ Cart, user }, dispatch] = useStateValue();

  const [searchResults, setSearchResults] = useState([]);
  const [input, setInput] = useState(null);

  const History = useHistory();

  const handleAuth = () => {
    if (user) {
      dispatch({ type: "SET_USER", user: null });
      axios.post("http://localhost:8888/auth/logout");
    }
  };

  useEffect(() => {
    async function getData() {
      if (input !== null) {
        await axios
          .post("http://localhost:8888/products/search", { query: input })
          .then((res) => {
            if (res.data.results.length >= 1) {
              setSearchResults(res.data.results);
            } else {
              setSearchResults([{ name: "No Results found." }]);
            }
          });
      }
    }

    if (input?.length === 0) {
      setSearchResults([]);
    }

    getData();
  }, [input]);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const openSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="header" id="top">
      <div className="left_side">
        <Link to="/">
          <img
            className="headerLogo"
            src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt="..."
          />
        </Link>
      </div>
      <div className="right_side">
        <div className="headerOption deliver_to">
          <span className="headerOption_Line1">Deliver to</span>
          <span className="headerOption_DeliverTo_SecondLine">
            <LocationOnIcon />
            India
          </span>
        </div>

        <div className="headerSearch">
          <input
            onChange={handleInput}
            // onBlur={() => {
            //   setSearchResults([]);
            // }}
            className="headerSearchInput"
            type="text"
            name="search"
            value={input}
            autoComplete="off"
            onSubmit={openSearch}
          />
          <SearchIcon className="headerSearchIcon" />
          {searchResults.length ? (
            <div className="results">
              {searchResults.map((term) => (
                <div className="result__option">
                  <Link to={`/products/${term._id}`}>
                    <p>{term.name}</p>
                  </Link>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        {/* </form> */}

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

          {user ? (
            <Link to="/profile">
              <div className="headerOption">
                <span className="headerOption_Line1">Your</span>Profile
              </div>
            </Link>
          ) : null}
          <Link to="/checkout">
            <div className="headerOption headerOptionCart">
              <ShoppingCartIcon />
              <span className="header_CartCount">{Cart?.length}</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
