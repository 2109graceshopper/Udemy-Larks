import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartTotalCost: 0,
    };

    this.handleCartCheckout = this.handleCartCheckout.bind(this);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
  }

  //Uncomment when redux is set up
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

  render() {
    const { handleRemoveFromCart, handleCartCheckout } = this;
    const cartContents = this.props.cartContents || [];
    const cartContentsView = cartContents.map((product) => {
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
//     products: state.userid.products
// (will likely be something different)
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getUserCart: (userId) =>
//     removeFromCart: (productId) =>
//     checkOut: () =>
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
