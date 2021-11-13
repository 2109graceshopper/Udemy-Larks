import axios from 'axios';

// ACTION TYPES
const GET_SINGLE_USER = 'GET_SINGLE_USER';

// ACTION CREATORS
const setSingleUser = (user) => {
  return {
    type: GET_SINGLE_USER,
    user,
  };
};

// THUNK CREATORS
export const fetchSingleUser = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${id}`);
      dispatch(setSingleUser(data));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = [];

// REDUCER FUNCTION
export default function singleUserReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_USER:
      return action.user;
    default:
      return state;
  }
}
