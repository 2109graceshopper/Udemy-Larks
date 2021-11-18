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
import { fetchVideos } from "../store/videos";
import { fetchUserInfo } from "../store/user";

export class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videoCategoryFilter: "all",
      userOwnedVideos: [],
      videoPage: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleVideoPage = this.handleVideoPage.bind(this);
  }

  handleChange(evt) {
    this.setState({ videoCategoryFilter: evt.target.value });
  }

  handleVideoPage() {
    this.setState({ videoPage: !this.state.videoPage });
  }

  componentDidUpdate(prevProps) {
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
  }

  render() {
    const { handleChange } = this;
    const { handleClick, isLoggedIn, id } = this.props;
    return (
      <div>
        <nav>
          <Link to="/">
            <img
              className="graceShopperLogo"
              src="/icons/grace-shopper-icon.png"
            />
          </Link>
          <Link to="/videos">Videos</Link>
          {/* Categories Drop Down */}
          {this.state.videoPage ? (
            <div className="categories-dropdown">
              <select onChange={handleChange}>
                <option value="all">All Videos</option>
                <option value="1">Category 1</option>
                <option value="2">Category 2</option>
                <option value="3">Category 3</option>
                <option value="4">Category 4</option>
                <option value="5">Category 5</option>
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
          </Link>

          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to={`/users/${id}`}>
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
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
    getUser: (userId, header) => dispatch(fetchUserInfo(userId, header)),
    getVideos: () => dispatch(fetchVideos()),
  };
};

export default withRouter(connect(mapState, mapDispatch)(Header));
