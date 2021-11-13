import axios from "axios";

const initialState = [];

//ACTION TYPES
const GET_VIDEOS = "GET_VIDEOS";
const GET_VIDEO_BY_ID = "GET_VIDEO_BY_ID";

//ACTION CREATORS
export const getVideos = (videos) => {
  return {
    type: GET_VIDEOS,
    videos,
  };
};

export const getVideoById = (video) => {
  return {
    type: GET_VIDEO_BY_ID,
    video,
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

export const fetchVideoById = (videoId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/videos/${videoId}`);
      dispatch(getVideoById(data));
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
    case GET_VIDEO_BY_ID:
      return action.video;
    default:
      return state;
  }
}
