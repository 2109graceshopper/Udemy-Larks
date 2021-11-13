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
      cartTotalCost: 0,
    };

    this.handleCartCheckout = this.handleCartCheckout.bind(this);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
    this.handleVideoInfo = this.handleVideoInfo.bind(this);

    console.log(this.state);
  }

  // //Uncomment when redux is set up
  // componentDidMount(userId) {
  //   this.props.getUserCart(userId);
  // }

  async handleRemoveFromCart(productId) {
    await this.props.removeFromCart(productId);
    this.props.getUserCart();
  }

  async handleCartCheckout() {
    await this.props.checkout();
  }

  async handleVideoInfo(videoId) {
    await this.props.getVideoInfo(videoId);
  }

  render() {
    const { handleVideoInfo, handleRemoveFromCart, handleCartCheckout } = this;
    const cartContents = this.state.cartContents || [];
    const cartContentsInfo =
      cartContents.map(async (videoId) => {
        await handleVideoInfo(videoId);
      }) || [];
    const cartContentsView = cartContentsInfo.map((product) => {
      return (
        <div className="single-cart-item" key={product.id}>
          <Link to={`/videos/${product.id}`}>
            <div className="video-preview">
              Video Preview Goes Here (embedded product.image)
            </div>
            <div className="video-details">
              {product.title}
              {product.details}
              <button
                className="remove-from-cart-button"
                type="button"
                onClick={() => handleRemoveFromCart(product.id)}
              >
                Remove from cart
              </button>
            </div>
            <div className="video-price">{product.price}</div>
          </Link>
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

// const mapStateToProps = (state) => {
//   return {
//     videos: state.videos,
//   };
// };

const mapDispatchToProps = (dispatch) => {
  return {
    getVideoInfo: (videoId) => dispatch(fetchVideoById(videoId)),
    // getUserCart: (userId) =>
    // removeFromCart: (productId) =>
    // checkOut: () =>
  };
};

export default connect(null, mapDispatchToProps)(ShoppingCart);
