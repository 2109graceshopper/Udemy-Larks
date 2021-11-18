import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchVideos } from "../../store/videos";
// import { fetchUserInfo } from "../../store/user";

export class AllProducts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videoCategoryFilter: "all",
      userOwnedVideos: this.props.HeaderState.userOwnedVideos || [],
    };
    this.handleAddToCart = this.handleAddToLocalCart.bind(this);
  }

  componentDidMount() {
    this.props.getVideos();
    this.setState({ userOwnedVideos: [] });
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.HeaderState.videoCategoryFilter !==
      prevProps.HeaderState.videoCategoryFilter
    ) {
      this.setState({
        videoCategoryFilter: this.props.HeaderState.videoCategoryFilter,
      });
    }

    if (
      this.props.HeaderState.userOwnedVideos !==
      prevProps.HeaderState.userOwnedVideos
    ) {
      this.setState({
        userOwnedVideos: this.props.HeaderState.userOwnedVideos,
      });
    }
  }

  // console.log(this.state.userOwnedVideos);
  // console.log(this.props.HeaderState.userOwnedVideos);

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

    console.log(this.props);
    console.log(this.state);

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
          <div className="allVideos__card" key={video.id}>
            <Link to={`/videos/${video.id}`}>
              <img className="allVideos__img" src={video.imageURL} />
            </Link>
            <div className="video-details">
              <h1>{video.title}</h1>
              <p>{video.description}</p>
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
        <section className="allVideos">
          {videos.length > 0 ? (
            videosToShow.length > 0 ? (
              videosToShow
            ) : (
              <h2>
                There are no videos in the database matching the search
                parameters
              </h2>
            )
          ) : (
            <h2>There are no videos in the database</h2>
          )}
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
    // getUser: (userId, header) => dispatch(fetchUserInfo(userId, header)),
    getVideos: () => dispatch(fetchVideos()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
