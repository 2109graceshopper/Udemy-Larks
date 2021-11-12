import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchVideos, addProductToCart } from "../../store/videos";

export class AllProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoCategoryFilter: "All", //this.state dependent on state from header selector, will
      //connect later if we decide to implement
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  componentDidMount() {
    this.props.getVideos();
  }

  async handleAddToCart(videoId) {
    console.log("add " + videoId + " to cart!");
    // await this.props.addToCart(productId);
  }

  render() {
    const { handleAddToCart } = this;
    const videos = this.props.videos || [];

    //uncomment if video.category is added
    // let filteredVideos =
    //   this.state.videoCategoryFilter !== "All"
    //     ? videos.filter(
    //         (video) => video.category === this.state.videoCategoryFilter
    //       )
    //     : videos;

    const videosToShow =
      videos &&
      videos.map((video) => {
        return (
          <div className="single-video-card" key={video.id}>
            <Link to={`/videos/${video.id}`}>
              <img className="video-preview" src={video.imageURL} />
              <div className="video-details">
                {video.title}
                {video.details}
                <button
                  className="add-to-cart-button"
                  type="button"
                  onClick={() => handleAddToCart(video.id)}
                >
                  Add to cart
                </button>
              </div>
              <div className="video-price">{video.price}</div>
            </Link>
          </div>
        );
      });

    // replace above 'videosToShow' with this if categorization is added
    // const videosToShow =
    //   filteredVideos &&
    //   filteredVideos.map((video) => {
    //     return (
    //       <div className="single-video-card" key={video.id}>
    //         <Link to={`/videos/${video.id}`}>
    //           <img
    //             className="graceShopperLogo"
    //             src="/icons/video-preview-placeholder.png"
    //           />
    //           <div className="video-details">
    //             {video.title}
    //             {video.details}
    //             <button
    //               className="add-to-cart-button"
    //               type="button"
    //               onClick={() => handleAddToCart(video.id)}
    //             >
    //               Add to cart
    //             </button>
    //           </div>
    //           <div className="video-price">{video.price}</div>
    //         </Link>
    //       </div>
    //     );
    //   });

    return (
      <div>
        <h1>All Videos:</h1>
        <section className="all-video-cards">
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getVideos: () => dispatch(fetchVideos()),
    addToCart: (videoId) => dispatch(addProductToCart(videoId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
