import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchVideoById } from "../../store/videos";

export class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);

    const localCart = JSON.parse(localStorage.getItem("graceShopperCart"));

    this.state = {
      cartContents: localCart || [],
      cartContentsInfo: [],
      cartTotalCost: 0,
    };

    this.handleCartCheckout = this.handleCartCheckout.bind(this);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
    this.handleVideoInfo = this.handleVideoInfo.bind(this);
  }

  async componentDidMount() {
    console.log("cart contents:", this.state.cartContents);
    let info = await this.props.getVideoInfo(1);

    console.log("info:", info);
    // const getData = async () => {
    //   return Promise.all(
    //     this.state.cartContents.map((item) => this.props.getVideoInfo(item))
    //   );
    // };
    // let cartInfo = await getData();
    // console.log(cartInfo);
    // Promise.all(
    //   this.state.cartContents.map((item) => this.props.getVideoInfo(item))
    // ).then((values) => {
    //   console.log(values);
    // });
    // this.setState({ cartContentsInfo: cartInfo });

    // this.state.cartContents.forEach((videoId) =>
    //   this.state.cartContentsInfo.push(this.props.getVideoInfo(1))
    // );
    // console.log(this.state.cartContents);
  }

  async handleVideoInfo(videoId) {
    const videoInfo = await this.props.getVideoInfo(videoId);
    return videoInfo;
  }

  async handleRemoveFromCart(productId) {
    // await this.props.removeFromCart(productId);
    // this.props.getUserCart();
    console.log("Remove from cart!");
  }

  async handleCartCheckout() {
    // await this.props.checkout();
    console.log("Checkout!");
  }

  render() {
    const { handleVideoInfo, handleRemoveFromCart, handleCartCheckout } = this;

    let cart = [this.props.videos];

    const cartContentsView = cart.map((video) => {
      return (
        <div className="single-cart-item" key={video.id}>
          <Link to={`/videos/${video.id}`}>
            <img className="video-preview" src={video.imageURL} />
            <div className="video-details">
              {video.title}
              {/* {video.description} */}
            </div>
          </Link>
          <div>
            {" "}
            <button
              className="remove-from-cart-button"
              type="button"
              onClick={() => handleRemoveFromCart(video.id)}
            >
              Remove from cart
            </button>
          </div>
          <div className="video-price">{video.price}</div>
        </div>
      );
    });

    const checkoutView = (
      <div className="checkout-card">
        <section className="checkout-top-half"></section>
        <section className="checkout-bottom-half">
          Subtotal: {`$${this.cartTotalCost}`}
          <button
            className="checkout-button"
            type="button"
            onClick={() => handleCartCheckout()}
          >
            Checkout
          </button>
        </section>
      </div>
    );

    return (
      <div>
        <h1>Your Cart:</h1>
        <section className="all-cart-products">{cartContentsView}</section>
        <section className="checkout-box">{checkoutView}</section>
        {/* <section className="recommendations">(optional)</section> */}
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
    getVideoInfo: (videoId) => dispatch(fetchVideoById(videoId)),
    // getUserCart: (userId) =>
    // removeFromCart: (productId) =>
    // checkOut: () =>
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
