import React from "react";
import { connect } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";
import { fetchVideosByIds } from "../../store/videos";
import {
  fetchCartByUser,
  editCartByUser,
  removeVideoFromUserCart,
  checkoutUserCart,
} from "../../store/orders";

export class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);

    const localCart = JSON.parse(localStorage.getItem("graceShopperCart"));

    this.state = {
      cartContents: localCart || [],
      cartTotalCost: 0,
      userId: 0,
    };

    this.handleCartCheckout = this.handleCartCheckout.bind(this);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
  }

  priceUpdater() {
    let total =
      this.props.videos.length > 0
        ? this.props.videos.reduce((a, b) => ({
            price: a.price + b.price,
          }))
        : { price: 0 };
    this.setState({ cartTotalCost: total.price });
  }

  async componentDidMount() {
    setTimeout(async () => {
      let user = this.props.user;
      this.setState({
        userId: user.id,
      });

      if (user.id > 0) {
        await this.props.getUserCart(this.state.userId);
        let userDbCart = this.props.orders.map((item) => item.videoId);
        let userLocalCart = this.state.cartContents;
        let combinedCart = userDbCart.concat(userLocalCart);
        combinedCart = [...new Set([...userDbCart, ...userLocalCart])];
        this.setState({ cartContents: combinedCart });
        localStorage.setItem("graceShopperCart", JSON.stringify(combinedCart));

        setTimeout(async () => {
          this.props.updateCart(this.state.userId, this.state.cartContents);
        }, 1000);
      }
    }, 1000);

    await this.props.getVideosInfo(this.state.cartContents);

    this.priceUpdater();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.videos !== this.props.videos && this.state.userId > 0) {
      await this.props.updateCart(this.state.userId, this.state.cartContents);
    }
  }

  async handleRemoveFromCart(videoId) {
    //remove video from local cart
    const cart = this.state.cartContents;
    let cartItem = cart.findIndex((video) => video === videoId);
    cart.splice(cartItem, 1);
    this.setState({ cartContents: cart });
    let cartItems = JSON.stringify(this.state.cartContents);
    localStorage.setItem("graceShopperCart", cartItems);
    await this.props.getVideosInfo(this.state.cartContents);

    //Routing to remove from user db as well, if user is logged in
    this.state.userId > 0
      ? await this.props.removeFromCart(this.state.userId, videoId)
      : null;

    //Update displayed subtotal when items are removed
    this.priceUpdater();
  }

  async handleCartCheckout() {
    if (this.state.cartContents.length > 0) {
      await this.props.checkOut(this.state.userId);

      //clear cart from localStorage and set state cart to []
      window.localStorage.removeItem("graceShopperCart");
      this.setState({ cartContents: [] });
      await this.props.getVideosInfo(this.state.cartContents);
      this.priceUpdater();
    } else {
      console.log("Cart is empty, nothing to checkout!");
    }
  }

  render() {
    const { handleRemoveFromCart, handleCartCheckout } = this;

    let cart = this.props.videos;
    let subtotal = this.state.cartTotalCost;

    const cartContentsView = cart.map((video) => {
      return (
        <div className="shoppingCart" key={video.id}>
          <div className="shoppingCart__card">
            <Link to={`/videos/${video.id}`}>
              <h1>{video.title}</h1>
              <img className="video-preview" src={video.imageURL} />
              <div className="video-details">{/* {video.description} */}</div>
            </Link>
            <div>
              <button
                className="remove-from-cart-button"
                type="button"
                onClick={() => handleRemoveFromCart(video.id)}
              >
                Remove from cart
              </button>
              <p>{video.price} KREM</p>
            </div>
          </div>
        </div>
      );
    });

    const checkoutView = (
      <div className="checkout-card">
        <section className="checkout-top-half"></section>
        <section className="checkout-bottom-half">
          <div>
            {cartContentsView}
            <p>Subtotal: {`${subtotal}`} KREM </p>
            <button
              className="checkout-button"
              type="button"
              onClick={() => handleCartCheckout()}
            >
              Checkout
            </button>
          </div>
        </section>
      </div>
    );

    return (
      <div>
        <h1>Your Cart:</h1>
        <section className="all-cart-products">
          {cart.length > 0 ? (
            checkoutView
          ) : (
            <h2>Your cart is empty. Add some videos to get learning!</h2>
          )}
        </section>

        {/* <section className="checkout-box">{checkoutView}</section> */}
        {/* <section className="recommendations">(optional)</section> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth,
    videos: state.videos,
    orders: state.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getVideosInfo: (videoArray) => dispatch(fetchVideosByIds(videoArray)),
    getUserCart: (userId) => dispatch(fetchCartByUser(userId)),
    updateCart: (userId, localUserCart) =>
      dispatch(editCartByUser(userId, localUserCart)),
    removeFromCart: (userId, videoId) =>
      dispatch(removeVideoFromUserCart(userId, videoId)),
    checkOut: (userId) => dispatch(checkoutUserCart(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
