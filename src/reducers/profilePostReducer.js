/* eslint-disable linebreak-style */
import {
  POST_TYPE,
  GET_PENDING_POSTS,
  GET_PUBLISHED_POSTS,
  GET_SAVED_POSTS,
} from '../actions/postAction';

const initialState = {
  postType: 'Feeds',
  pendingPosts: [],
  publishedPosts: [],
  savedPosts: [],
  currentPage: '1',
  nextPage: '',
  totalResults: '',
};

const profilePostReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_TYPE: {
      return {
        ...state,
        postType: action.payload,
      };
    }
    case GET_PENDING_POSTS: {
      if (action.payload.currentPage > 1) {
        return {
          ...state,
          pendingPosts: [...state.pendingPosts, ...action.payload.results],
          nextPage: action.payload.nextPage,
          hasNextPage: action.payload.hasNextPage,
          currentPage: action.payload.currentPage,
          totalResults: action.payload.totalResults,
          publishedPosts: [],
          savedPosts: [],
        };
      }
      return {
        ...state,
        pendingPosts: action.payload.results,
        nextPage: action.payload.nextPage,
        hasNextPage: action.payload.hasNextPage,
        currentPage: action.payload.currentPage,
        totalResults: action.payload.totalResults,
        publishedPosts: [],
        savedPosts: [],
      };
    }
    case GET_PUBLISHED_POSTS: {
      if (action.payload.currentPage > 1) {
        return {
          ...state,
          publishedPosts: [...state.publishedPosts, ...action.payload.results],
          nextPage: action.payload.nextPage,
          hasNextPage: action.payload.hasNextPage,
          currentPage: action.payload.currentPage,
          totalResults: action.payload.totalResults,
          pendingPosts: [],
          savedPosts: [],
        };
      }
      return {
        ...state,
        publishedPosts: action.payload.results,
        nextPage: action.payload.nextPage,
        hasNextPage: action.payload.hasNextPage,
        currentPage: action.payload.currentPage,
        totalResults: action.payload.totalResults,
        pendingPosts: [],
        savedPosts: [],
      };
    }
    case GET_SAVED_POSTS: {
      if (action.payload.currentPage > 1) {
        return {
          ...state,
          savedPosts: [...state.savedPosts, ...action.payload.results],
          nextPage: action.payload.nextPage,
          hasNextPage: action.payload.hasNextPage,
          currentPage: action.payload.currentPage,
          totalResults: action.payload.totalResults,
          pendingPosts: [],
          publishedPosts: [],
        };
      }
      return {
        ...state,
        savedPosts: action.payload.results,
        nextPage: action.payload.nextPage,
        hasNextPage: action.payload.hasNextPage,
        currentPage: action.payload.currentPage,
        totalResults: action.payload.totalResults,
        pendingPosts: [],
        publishedPosts: [],
      };
    }
    default:
      return state;
  }
};

export default profilePostReducer;
