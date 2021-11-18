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
    await this.props.getVideosInfo(this.state.cartContents);

    this.priceUpdater();

    let user = this.props.user;
    this.setState({
      userId: user.id,
    });

    setTimeout(async () => {
      if (user.id > 0) {
        await this.props.getUserCart(this.state.userId);
        let userDbCart = this.props.orders.map((item) => item.videoId);
        let userLocalCart = this.state.cartContents;
        let combinedCart = userDbCart.concat(userLocalCart);
        combinedCart = [...new Set([...userDbCart, ...userLocalCart])];
        this.setState({ cartContents: [...combinedCart] });
        await this.props.updateCart(this.state.userId, this.state.cartContents);
        localStorage.setItem("graceShopperCart", JSON.stringify(combinedCart));
      }
    }, 1000);
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.videos !== this.props.videos && this.state.userId > 0) {
      await this.props.updateCart(this.state.userId, this.state.cartContents);
    }

    // const ordervideos = prevProps.orders.map((ordervideo) => {
    //   return ordervideo.videoId;
    // });
    // console.log(prevState);

    // if (JSON.stringify(ordervideos) !== JSON.stringify(this.props.orders.data)) {
    //   await this.props.getUserCart(this.state.userId);
    //   let userDbCart = this.props.orders.map((item) => item.videoId);
    //   let userLocalCart = this.state.cartContents;
    //   let combinedCart = userDbCart.concat(userLocalCart);
    //   combinedCart = [...new Set([...userDbCart, ...userLocalCart])];
    //   this.setState({ cartContents: [...combinedCart] });
    //   await this.props.updateCart(this.state.userId, this.state.cartContents);
    //   localStorage.setItem("graceShopperCart", JSON.stringify(combinedCart));
    // }
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
          <div className="video-price">{video.price} KREM</div>
        </div>
      );
    });

    const checkoutView = (
      <div className="checkout-card">
        <section className="checkout-top-half"></section>
        <section className="checkout-bottom-half">
          Subtotal: {subtotal ? `${subtotal} KREM` : "------"}
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
        <section className="all-cart-products">
          {" "}
          {cart.length > 0 ? cartContentsView : <h2>Your cart is empty!</h2>}
        </section>

        <section className="checkout-box">{checkoutView}</section>
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
