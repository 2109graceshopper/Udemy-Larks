import React from "react";
import { connect } from "react-redux";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import { fetchSingleVideo } from "../../store/singleVideo";
import { fetchUserInfo } from "../../store/user";

class SingleVideo extends React.Component {
  constructor() {
    super();
    this.state = {
      userOwnedVideos: [],
    };
    this.handleAddToLocalCart = this.handleAddToLocalCart.bind(this);
  }

  componentDidMount() {
    try {
      this.props.getVideo(this.props.match.params.videoId);
    } catch (error) {
      console.log(error);
    }
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

  handleAddToLocalCart(videoId) {
    if (!localStorage.getItem("graceShopperCart")) {
      let cartItems = JSON.stringify([videoId]);
      localStorage.setItem("graceShopperCart", cartItems);
    } else {
      let cartItems = JSON.parse(localStorage.getItem("graceShopperCart"));
      cartItems.includes(videoId) ? null : cartItems.push(videoId);
      cartItems = JSON.stringify(cartItems);
      localStorage.setItem("graceShopperCart", cartItems);
    }
  }

  render() {
    const video = this.props.video;

    return (
      <div>
        <section>
          <div>
            <h1>{video.title}</h1>
            <h3>Authors: {video.authorName}</h3>
            <h2>Description:</h2>
            <p>{video.description}</p>
            <div className="video-price">{video.price} KREM</div>
          </div>
          <div>
            <img className="video-picture" src={video.imageURL} />
            {/* <h4>Spots Remaining: {video.unitsInStock}</h4> */}
          </div>

          {this.state.userOwnedVideos.includes(video.id) ? (
            <h3>Course Owned!</h3>
          ) : (
            <div>
              <button
                className="add-to-cart-button"
                type="button"
                onClick={() => this.handleAddToLocalCart(video.id)}
              >
                Add to cart
              </button>
            </div>
          )}
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  video: state.singleVideo,
  id: state.auth.id,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  getUser: (userId, header) => dispatch(fetchUserInfo(userId, header)),
  getVideo: (id) => dispatch(fetchSingleVideo(id)),
  // addToCart: (videoId, userId, quantity) =>
  //   dispatch(addToCart(videoId, userId, quantity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleVideo);
