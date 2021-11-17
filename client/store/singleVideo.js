import axios from 'axios';

// ACTION TYPES
const GET_SINGLE_VIDEO = 'GET_SINGLE_VIDEO';

// ACTION CREATORS
const setSingleVideo = (video) => {
  return {
    type: GET_SINGLE_VIDEO,
    video,
  };
};

// THUNK CREATORS
export const fetchSingleVideo = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/videos/${id}`);
      dispatch(setSingleVideo(data));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = [];

// REDUCER FUNCTION
export default function singleVideoReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_VIDEO:
      return action.video;
    default:
      return state;
  }
}
