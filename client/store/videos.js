import axios from "axios";

const initialState = { videos: [] };

//ACTION TYPES
const GET_VIDEOS = "GET_VIDEOS";

//ACTION CREATORS
const getVideos = (videos) => {
  return {
    type: GET_VIDEOS,
    videos,
  };
};

//THUNK CREATORS
export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const { data: videos } = await axios.get("/api/videos");
      dispatch(getVideos(videos));
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
