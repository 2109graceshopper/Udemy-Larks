import axios from "axios";

const initialState = [];

//ACTION TYPES
const GET_VIDEOS = "GET_VIDEOS";

//ACTION CREATORS
export const getVideos = (videos) => {
  return {
    type: GET_VIDEOS,
    videos,
  };
};

//THUNK CREATORS
export const fetchVideos = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/videos");
      dispatch(getVideos(data));
    } catch (error) {
      console.error(error);
    }
  };
};

//REDUCER FUNCTION
export default function videosReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOS:
      return action.videos;
    default:
      return state;
  }
}
