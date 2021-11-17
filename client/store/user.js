import axios from "axios";

const GET_USER_INFO = "GET_USER_INFO";

const setUserInfo = (user) => {
  return {
    type: GET_USER_INFO,
    user,
  };
};

export const fetchUserInfo = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${id}`);
      dispatch(setUserInfo(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export default function userReducer(state = [], action) {
  switch (action.type) {
    case GET_USER_INFO:
      return action.user;
    default:
      return state;
  }
}
