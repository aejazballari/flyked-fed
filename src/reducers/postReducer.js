/* eslint-disable linebreak-style */
/* eslint-disable import/named */
import {
  POST_IMAGE,
  POST_TEXT,
  POST_PAGE_SELECTED,
  POST_PAGE_LIST,
  POST_PAGE_TYPE_SELECTED,
  CURRENT_STEP,
  PROGRESS_UPLOAD,
  PAGE_MODEL,
  SEARCH_TEXT,
  LOADING,
  POST_CROPER_MODEL,
  DATE_OF_BIRTH,
  POST_ROUTE_FROM,
  PALLET_COLOR,
  SCROLL_VIEW,
  FEED_TYPE_SELECTED,
  SCROLL_REF,
  GET_POST_DETAILS,
  SET_LOADER,
  SET_HORIZONTAL_POST_PREVIEW,
} from '../actions/postAction';

const initialState = {
  loading: false,
  currentStep: 1,
  searchText: '',
  openModel: false,
  postCropModel: false,
  postImage: '',
  postText: '',
  postPage: '',
  postPageList: {},
  // postPage: '',
  postTypeSelected: '',
  progressUpload: 0,
  postType: '',
  dateOfBirth: null,
  postRouteForm: '',
  palletColor: '',
  feedTypeSelected: 'feed',
  feedLoader: false,
  element: 'feed',
  scroll: {
    feed: 'feed',
    birthday: 'birthday',
    thisDay: 'thisDay',
    news: 'news',
  },
  postDetails: null,
  horizontalFeed: {
    type: null,
    id: null,
  },
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_IMAGE: {
      return {
        ...state,
        postImage: action?.payload,
      };
    }
    case POST_CROPER_MODEL: {
      return {
        ...state,
        postCropModel: action?.payload,
      };
    }
    case POST_TEXT: {
      return {
        ...state,
        postText: action?.payload,
      };
    }
    case POST_PAGE_LIST: {
      return {
        ...state,
        postPageList: action?.payload,
      };
    }
    case POST_PAGE_SELECTED: {
      return {
        ...state,
        postPage: action?.payload,
      };
    }
    case POST_PAGE_TYPE_SELECTED: {
      return {
        ...state,
        postTypeSelected: action?.payload,
      };
    }
    case FEED_TYPE_SELECTED: {
      return {
        ...state,
        feedTypeSelected: action?.payload,
      };
    }
    case CURRENT_STEP: {
      return {
        ...state,
        currentStep: action?.payload,
      };
    }
    case PROGRESS_UPLOAD: {
      return {
        ...state,
        progressUpload: action?.payload,
      };
    }
    case PAGE_MODEL: {
      return {
        ...state,
        openModel: action?.payload,
      };
    }
    case SEARCH_TEXT: {
      return {
        ...state,
        searchText: action?.payload,
      };
    }
    case LOADING: {
      return {
        ...state,
        loading: action?.payload,
      };
    }
    case DATE_OF_BIRTH: {
      return {
        ...state,
        dateOfBirth: action?.payload,
      };
    }
    case POST_ROUTE_FROM: {
      return {
        ...state,
        postRouteForm: action?.payload,
      };
    }
    case PALLET_COLOR: {
      return {
        ...state,
        palletColor: action?.payload,
      };
    }
    case SCROLL_VIEW: {
      return {
        ...state, element: action?.payload,
      };
    }
    case SCROLL_REF: {
      return {
        ...state, scroll: { ...state.scroll, feed: action?.payload },
      };
    }
    case GET_POST_DETAILS: {
      return {
        ...state, postDetails: action?.payload,
      };
    }

    case SET_LOADER: {
      return {
        ...state, feedLoader: action.payload,
      };
    }
    case SET_HORIZONTAL_POST_PREVIEW: {
      return {
        ...state,
        horizontalFeed: {
          id: action.id,
          type: action.payload,
        },
      };
    }

    default:
      return state;
  }
};

export default postReducer;
