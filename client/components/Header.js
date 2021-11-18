/* eslint-disable no-unused-vars */
import React from "react";
import { connect } from "react-redux";
import { withRouter, Route, Link, Switch, Redirect } from "react-router-dom";
import { logout } from "../store";
import AllProducts from "../components/AllProducts/AllProducts";
import Login from "../components/Login/Login";
import Registration from "../components/Registration/Registration";
import Home from "../components/Home";
import ShoppingCart from "../components/ShoppingCart/ShoppingCart";
import SingleVideo from "../components/SingleVideo/SingleVideo";
import UserProfile from "../components/UserProfile/UserProfile";
import { fetchUserInfo } from "../store/user";
import { fetchCartByUser } from "../store/orders";

export class Header extends React.Component {
  constructor(props) {
    super(props);

    const localCart = JSON.parse(localStorage.getItem("graceShopperCart"));

    this.state = {
      videoCategoryFilter: "all",
      userOwnedVideos: [],
      videoPage: false,
      cartContents: localCart || [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleVideoPage = this.handleVideoPage.bind(this);
    // this.handleCart = this.handleCart.bind(this);
  }

  handleChange(evt) {
    this.setState({ videoCategoryFilter: evt.target.value });
  }

  handleVideoPage() {
    this.setState({ videoPage: !this.state.videoPage });
  }

  // handleCart(cartLength) {
  //   this.setState({ cartContents: cartLength});
  // }

  async componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      try {
        const token = window.localStorage.getItem("token");
        this.props.getUser(this.props.id, {
          headers: { authorization: token },
        });
      } catch (error) {
        console.log(error);
      }
    }
    if (this.props.user.userUniqueVideos !== prevProps.user.userUniqueVideos) {
      let userOwnedVideoIds = this.props.user.userUniqueVideos.map(
        (video) => video.id
      );
      this.setState({ userOwnedVideos: userOwnedVideoIds });
    }
    if (this.props.id !== prevProps.id) {
      await this.props.getUserCart(this.props.id);
      let userDbCart = this.props.orders.map((item) => item.videoId);
      let userLocalCart = this.state.cartContents;
      let combinedCart = userDbCart.concat(userLocalCart);
      combinedCart = [...new Set([...userDbCart, ...userLocalCart])];
      localStorage.setItem("graceShopperCart", JSON.stringify(combinedCart));
    }
  }

  render() {
    const { handleChange } = this;
    const { handleClick, isLoggedIn, id, userimageURL } = this.props;
    return (
      <div className="center">
        <nav className="nav">
          <Link to="/">
            <img
              className="graceShopperLogo"
              src="/icons/grace-shopper-icon.png"
            />
          </Link>
          <Link to="/videos">
            <h3 className="videosNav">Videos</h3>
          </Link>
          {/* Categories Drop Down */}
          {this.state.videoPage ? (
            <div className="categories-dropdown">
              <select onChange={handleChange}>
                <option value="all">All Videos</option>
                <option value="1">Fullstack Bootcamp</option>
                <option value="2">Applying to Google</option>
                <option value="3">???</option>
                <option value="4">FrontEnd Guru</option>
                <option value="5">Money Laundering</option>
              </select>
            </div>
          ) : null}

          {/* Search Bar */}
          <input
            className="searchBar"
            type="text"
            defaultValue="Search for Videos"
          />
          {/* Favorites? */}
          <Link to="/cart">
            <img className="cart-icon" src="/icons/shopping-cart-icon.png" />
            {/* <p>{this.state.cartContents.length}</p> */}
          </Link>

          {isLoggedIn ? (
            <div className="signVertical">
              {/* The navbar will show these links after you log in */}
              <Link to={`/users/${id}`}>
                <img className="nav__img" src={userimageURL} />
              </Link>
              <button className="logInOut" type="button" onClick={handleClick}>
                Sign Out
              </button>
            </div>
          ) : (
            <div className="signVertical">
              <Link to="/login" className="logInOut">
                Sign In
              </Link>
              <Link to="/signup" className="signUp">
                Sign Up
              </Link>
            </div>
          )}
        </nav>

        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route exact path="/videos">
              <AllProducts
                HeaderState={this.state}
                videoHandler={this.handleVideoPage}
              />
            </Route>
            <Route exact path="/videos/:videoId" component={SingleVideo} />
            <Route exact path="/users/:id">
              <UserProfile HeaderState={this.state} />
            </Route>
            <Route path="/cart" component={ShoppingCart} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Registration} />
            <Route exact path="/videos">
              <AllProducts
                HeaderState={this.state}
                videoHandler={this.handleVideoPage}
              />
            </Route>
            <Route exact path="/videos/:videoId" component={SingleVideo} />
            <Route path="/cart" component={ShoppingCart} />
          </Switch>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    id: state.auth.id,
    user: state.user,
    userimageURL: state.auth.userimageURL,
    orders: state.orders,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
    getUser: (userId, header) => dispatch(fetchUserInfo(userId, header)),
    getUserCart: (userId) => dispatch(fetchCartByUser(userId)),
  };
};

export default withRouter(connect(mapState, mapDispatch)(Header));
