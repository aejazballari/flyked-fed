/* eslint-disable linebreak-style */
import { UPDATE_PROFILE, VIEW_PROFILE, PROFILE_ROUTE_FROM } from '../actions/profileAction';
import { GET_USER_DETAILS } from '../actions/userAction';
import { GET_USER_SPECIFIC_POSTS } from '../actions/postAction';

const initialState = {
  userDetails: {},
  userPublicDetails: null,
  publishedPosts: [],
  currentPage: '1',
  nextPage: '',
  totalResults: '',
  profileRouteFrom: '',
};

const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE: {
      return {
        ...state,
        userDetails: { ...state.userDetails, ...action?.payload },
      };
    }
    case VIEW_PROFILE: {
      return {
        ...state,
        userDetails: action.payload,
      };
    }
    case GET_USER_DETAILS: {
      return {
        ...state, userPublicDetails: action.payload,
      };
    }
    case GET_USER_SPECIFIC_POSTS: {
      if (action.payload.currentPage > 1) {
        return {
          ...state,
          publishedPosts: [...state.publishedPosts, ...action.payload.results],
          nextPage: action.payload.nextPage,
          hasNextPage: action.payload.hasNextPage,
          currentPage: action.payload.currentPage,
          totalResults: action.payload.totalResults,
        };
      }
      return {
        ...state,
        publishedPosts: action.payload.results,
        nextPage: action.payload.nextPage,
        hasNextPage: action.payload.hasNextPage,
        currentPage: action.payload.currentPage,
        totalResults: action.payload.totalResults,
      };
    }
    case PROFILE_ROUTE_FROM: {
      return {
        ...state, profileRouteFrom: action.payload,
      };
    }
    default:
      return state;
  }
};

export default ProfileReducer;
