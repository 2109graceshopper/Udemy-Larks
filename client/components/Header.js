import React from "react";
import { Router, Route, Link, Switch } from "react-router-dom";
// import { cartIcon, graceShopperLogo } from "../../public/icons"; //path to wherever we save shared icons/art/logos/etc
// import { profilePicture } from "../../server/"; //path to wherever we save user photo id

const Header = ({ handleClick, handleChange, isLoggedIn }) => {
  return (
    <div>
      <nav>
        <Link to="/">
          <img
            className="graceShopperLogo"
            src="/icons/grace-shopper-icon.png"
          />
        </Link>
        {/* Categories Drop Down */}
        <div className="categories-dropdown">
          <select onChange={handleChange}>
            <option value="all">All Videos</option>
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
            <option value="category3">Category 3</option>
            <option value="category4">Category 4</option>
            <option value="category5">Category 5</option>
          </select>
        </div>
        <Link to="/products">Videos</Link>
        {/* Search Bar */}
        <input className="searchBar" type="text" />
        {/* Favorites? */}
        <Link to="/cart">
          <img className="cart-icon" src="/icons/shopping-cart-icon.png" />
        </Link>

        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/profile">
              <img
                className="profile-picture"
                src="/icons/profile-picture-placeholder.png"
              />
            </Link>
            <button className="logInOut" type="button" onClick={handleClick}>
              Sign Out
            </button>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login" className="logInOut">
              Sign In
            </Link>
            <Link to="/signup" className="signUp">
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
