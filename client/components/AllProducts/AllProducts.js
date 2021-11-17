import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchVideos } from "../../store/videos";
import { fetchUserInfo } from "../../store/user";

export class AllProducts extends React.Component {
  constructor(props) {
    super(props);

    const videoFilter = localStorage.getItem("videoCategoryFilter");

    this.state = {
      videoCategoryFilter: videoFilter || "all", //this.state dependent on state from header selector
      userOwnedVideos: [],
    };
    this.handleAddToCart = this.handleAddToLocalCart.bind(this);
  }

  componentDidMount() {
    this.props.getVideos();
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

  //This checks for a "graceShopperCart" in local storage. If it doesn't exist, it makes one with a value of [videoId].
  //If it already exists, it retrieves the cart, adds a new videoId to the value, and re-stores locally.
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
    const { handleAddToLocalCart } = this;
    const videos = this.props.videos || [];

    let filteredVideos =
      this.state.videoCategoryFilter !== "all"
        ? videos.filter(
            (video) => video.category === this.state.videoCategoryFilter
          )
        : videos;

    const videosToShow =
      filteredVideos &&
      filteredVideos.map((video) => {
        return (
          <div className="single-video-card" key={video.id}>
            <Link to={`/videos/${video.id}`}>
              <img className="video-preview" src={video.imageURL} />
            </Link>
            <div className="video-details">
              {video.title}
              {video.description}
              {this.state.userOwnedVideos.includes(video.id) ? (
                <h3>Course Owned!</h3>
              ) : (
                <div>
                  <button
                    className="add-to-cart-button"
                    type="button"
                    onClick={() => handleAddToLocalCart(video.id)}
                  >
                    Add to cart
                  </button>
                  <div className="video-price">{video.price} KREM</div>
                </div>
              )}
            </div>
          </div>
        );
      });

    return (
      <div>
        <h1>All Videos:</h1>
        <section className="all-video-cards">
          {
            videos.length > 0 ? (
              videosToShow.length > 0 ? (
                videosToShow
              ) : (
                <h2>
                  There are no videos in the database matching the search
                  parameters
                </h2>
              )
            ) : null
            // <h2>There are no videos in the database</h2>
          }
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    videos: state.videos,
    id: state.auth.id,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (userId, header) => dispatch(fetchUserInfo(userId, header)),
    getVideos: () => dispatch(fetchVideos()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
