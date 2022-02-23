/* eslint-disable linebreak-style */
/* eslint-disable import/named */
/* eslint-disable linebreak-style */
import {
  GET_PAGE_SPECIFIC_POSTS,
  GET_COMMENTS,
  GET_LIKES,
  META_POST_DETAILS,
  SET_COMMENTLIST_VISIBLE,
} from '../actions/postAction';
import { GET_FOLLOWERS_LIST, GET_FOLLOWING_LIST } from '../actions/userAction';
import { GET_CONTRIBUTOR_LIST } from '../actions/pageAction';

const initialState = {
  publishedPosts: [],
  savedPosts: [],
  commentList: [],
  likesList: [],
  followerList: [],
  followingList: [],
  contributorList: [],
  currentPage: '1',
  nextPage: '',
  totalResults: '',
  metaPostDetails: {},
  commentVisibleId: null,
};

const PagePostReducer = (state = initialState, action) => {
  switch (action.type) {
    case META_POST_DETAILS: {
      return {
        ...state,
        metaPostDetails: action?.payload,
      };
    }
    case SET_COMMENTLIST_VISIBLE: {
      return {
        ...state,
        commentVisibleId: action?.payload,
      };
    }
    case GET_PAGE_SPECIFIC_POSTS: {
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
    case GET_COMMENTS: {
      if (action.payload.currentPage > 1) {
        return {
          ...state,
          commentList: [...state.commentList, ...action.payload.results],
          nextPage: action.payload.nextPage,
          hasNextPage: action.payload.hasNextPage,
          currentPage: action.payload.currentPage,
          totalResults: action.payload.totalResults,
        };
      }
      return {
        ...state,
        commentList: action.payload.results,
        nextPage: action.payload.nextPage,
        hasNextPage: action.payload.hasNextPage,
        currentPage: action.payload.currentPage,
        totalResults: action.payload.totalResults,
      };
    }
    case GET_LIKES: {
      if (action.payload.currentPage > 1) {
        return {
          ...state,
          likesList: [...state.likesList, ...action.payload.results],
          nextPage: action.payload.nextPage,
          hasNextPage: action.payload.hasNextPage,
          currentPage: action.payload.currentPage,
          totalResults: action.payload.totalResults,
        };
      }
      return {
        ...state,
        likesList: action.payload.results,
        nextPage: action.payload.nextPage,
        hasNextPage: action.payload.hasNextPage,
        currentPage: action.payload.currentPage,
        totalResults: action.payload.totalResults,
      };
    }
    case GET_FOLLOWERS_LIST: {
      if (action.payload.currentPage > 1) {
        return {
          ...state,
          followerList: [...state.followerList, ...action.payload.results],
          nextPage: action.payload.nextPage,
          hasNextPage: action.payload.hasNextPage,
          currentPage: action.payload.currentPage,
          totalResults: action.payload.totalResults,
        };
      }
      return {
        ...state,
        followerList: action.payload.results,
        nextPage: action.payload.nextPage,
        hasNextPage: action.payload.hasNextPage,
        currentPage: action.payload.currentPage,
        totalResults: action.payload.totalResults,
      };
    }
    case GET_FOLLOWING_LIST: {
      if (action.payload.currentPage > 1) {
        return {
          ...state,
          followingList: [...state.followingList, ...action.payload.results],
          nextPage: action.payload.nextPage,
          hasNextPage: action.payload.hasNextPage,
          currentPage: action.payload.currentPage,
          totalResults: action.payload.totalResults,
        };
      }
      return {
        ...state,
        followingList: action.payload.results,
        nextPage: action.payload.nextPage,
        hasNextPage: action.payload.hasNextPage,
        currentPage: action.payload.currentPage,
        totalResults: action.payload.totalResults,
      };
    }
    case GET_CONTRIBUTOR_LIST: {
      if (action.payload.currentPage > 1) {
        return {
          ...state,
          contributorList: [...state.contributorList, ...action.payload.results],
          nextPage: action.payload.nextPage,
          hasNextPage: action.payload.hasNextPage,
          currentPage: action.payload.currentPage,
          totalResults: action.payload.totalResults,
        };
      }
      return {
        ...state,
        contributorList: action.payload.results,
        nextPage: action.payload.nextPage,
        hasNextPage: action.payload.hasNextPage,
        currentPage: action.payload.currentPage,
        totalResults: action.payload.totalResults,
      };
    }
    default:
      return state;
  }
};

export default PagePostReducer;
