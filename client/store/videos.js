import axios from "axios";

const initialState = [];

//ACTION TYPES
const GET_VIDEOS = "GET_VIDEOS";
const GET_VIDEOS_BY_IDS = "GET_VIDEOS_BY_IDS";

//ACTION CREATORS
export const getVideos = (videos) => {
  return {
    type: GET_VIDEOS,
    videos,
  };
};

export const getVideosByIds = (videos) => {
  return {
    type: GET_VIDEOS_BY_IDS,
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

export const fetchVideosByIds = (videosArray) => {
  return async (dispatch) => {
    try {
      const [...data] = await Promise.all(
        videosArray.map((videoId) => axios.get(`/api/videos/${videoId}`))
      );
      let videoDataArray = data.map((thunkResponse) => thunkResponse.data);
      dispatch(getVideosByIds(videoDataArray));
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
    case GET_VIDEOS_BY_IDS:
      return action.videos;
    default:
      return state;
  }
}
