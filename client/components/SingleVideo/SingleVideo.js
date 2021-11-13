import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import { connect } from 'react-redux';

import { fetchSingleVideo } from '../../store/singleVideo';

class SingleVideo extends React.Component {
  constructor() {
    super();
    // this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  componentDidMount() {
    try {
      this.props.getVideo(this.props.match.params.videoId);
    } catch (error) {
      console.log(error);
    }
  }

  // handleAddToCart() {
  //   const userId = this.props.user.id;
  //   const videoId = this.props.video.id;
  //   const quantity = 1;
  //   this.props.addToCart(videoId, userId, quantity);
  // }

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
            <img className='video-picture' src={video.imageUrl} />
            {/* <h4>Spots Remaining: {video.unitsInStock}</h4> */}
            <h4>Enrollment Price: {video.price}</h4>
          </div>
          <button
            onClick={() => {
              console.log('Add To Cart Button Clicked!');
              // handleAddToCart;
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
