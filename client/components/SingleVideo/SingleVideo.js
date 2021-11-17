import React from "react";
import { connect } from "react-redux";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import { fetchSingleVideo } from "../../store/singleVideo";

class SingleVideo extends React.Component {
  constructor() {
    super();
    this.handleAddToLocalCart = this.handleAddToLocalCart.bind(this);
  }

  componentDidMount() {
    console.log("hello");
    try {
      this.props.getVideo(this.props.match.params.videoId);
    } catch (error) {
      console.log(error);
    }
  }

  handleAddToLocalCart(videoId) {
    if (!localStorage.getItem("graceShopperCart")) {
      let cartItems = JSON.stringify([videoId]);
      localStorage.setItem("graceShopperCart", cartItems);
    } else {
      let cartItems = JSON.parse(localStorage.getItem("graceShopperCart"));
      cartItems.push(videoId);
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
          </div>
          <div>
            <img className="video-picture" src={video.imageURL} />
            {/* <h4>Spots Remaining: {video.unitsInStock}</h4> */}
            <h4>Enrollment Price: {video.price}</h4>
          </div>
          <button
            onClick={() => {
              console.log("Add To Cart Button Clicked!");
              this.handleAddToLocalCart(video.id);
            }}
          >
            Add To Cart
          </button>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  video: state.singleVideo,
});

const mapDispatchToProps = (dispatch) => ({
  getVideo: (id) => dispatch(fetchSingleVideo(id)),
  // addToCart: (videoId, userId, quantity) =>
  //   dispatch(addToCart(videoId, userId, quantity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleVideo);
