/* eslint-disable linebreak-style */
import {
  GET_FEED_POST_LIST, LOADING, OPEN_PREVIEW_MODEL, SELECTED_POST_ID,
} from '../actions/feedsPostAction';

const initialState = {
  loading: false,
  feedsData: [],
  openPreviewModel: false,
  selectedPostId: '',
};
const FeedPostPreviewReduser = (state = initialState, action) => {
  switch (action.type) {
    case GET_FEED_POST_LIST: {
      return {
        ...state, feedsData: action.payload,
      };
    }
    case LOADING: {
      return {
        ...state, loading: action.payload,
      };
    }
    case OPEN_PREVIEW_MODEL: {
      return {
        ...state, openPreviewModel: action.payload,
      };
    }
    case SELECTED_POST_ID: {
      return {
        ...state, selectedPostId: action.payload,
      };
    }
    default:
      return state;
  }
};

export default FeedPostPreviewReduser;
