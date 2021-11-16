import axios from "axios";

const initialState = [];

//ACTION TYPES
const GET_CART_BY_USER = "GET_CART_BY_USER";

//ACTION CREATORS
export const getCartByUser = (cart) => {
  return {
    type: GET_CART_BY_USER,
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

//REDUCER FUNCTION
export default function ordersReducter(state = initialState, action) {
  switch (action.type) {
    case GET_CART_BY_USER:
      return action.cart;
    default:
      return state;
  }
}
