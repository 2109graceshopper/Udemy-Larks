import axios from "axios";

const initialState = [];

//ACTION TYPES
const GET_CART_BY_USER = "GET_CART_BY_USER";
const UPDATE_USER_CART = "UPDATE_USER_CART";
const DELETE_VIDEO_FROM_CART = "DELETE_VIDEO_FROM_CART";
const CHECKOUT_USER_CART = "CHECKOUT_USER_CART";

//ACTION CREATORS
export const getCartByUser = (cart) => {
  return {
    type: GET_CART_BY_USER,
    cart,
  };
};

export const updateCartByUser = (cart) => {
  return {
    type: UPDATE_USER_CART,
    cart,
  };
};

export const deleteVideoFromCart = (cart) => {
  return {
    type: DELETE_VIDEO_FROM_CART,
    cart,
  };
};

export const checkoutCartByUser = (cart) => {
  return {
    type: CHECKOUT_USER_CART,
    cart,
  };
};

//THUNK CREATORS
export const fetchCartByUser = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/orders/${userId}`);
      dispatch(getCartByUser(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const editCartByUser = (userId, userCart) => {
  return async (dispatch) => {
    try {
      const data = await axios.put(`/api/orders/${userId}`, userCart);
      dispatch(updateCartByUser(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const removeVideoFromUserCart = (userId, videoId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`api/orders/${userId}/${videoId}`);
      dispatch(deleteVideoFromCart(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const checkoutUserCart = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`api/orders/${userId}/checkout`);
      dispatch(checkoutCartByUser(data));
    } catch (error) {
      console.error(error);
    }
  };
};

//REDUCER FUNCTION
export default function ordersReducter(state = initialState, action) {
  switch (action.type) {
    case GET_CART_BY_USER:
      return action.cart;
    case UPDATE_USER_CART:
      return action.cart;
    case DELETE_VIDEO_FROM_CART:
      return action.cart;
    case CHECKOUT_USER_CART:
      return action.cart;
    default:
      return state;
  }
}
