/* eslint-disable linebreak-style */
import {
  CREATE_PAGE, SEARCH_PAGE, GET_SEARCH_PAGE_RESULTS, PAGR_ROUTE_FROM,
  GET_PAGE_DETAILS,
} from '../actions/pageAction';

const initialState = {
  response: '',
  pageList: [],
  currentPage: '1',
  nextPage: '',
  totalResults: '',
  pageSearchText: '',
  pageRouteFrom: '',
  pageDetails: null,
};
const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PAGE: {
      return state;
    }
    case SEARCH_PAGE: {
      return {
        ...state,
        pageSearchText: action.payload,
        pageList: [],
      };
    }
    case GET_SEARCH_PAGE_RESULTS: {
      if (action.payload.currentPage > 1) {
        return {
          ...state,
          pageList: [...state.pageList, ...action.payload.results],
          nextPage: action.payload.nextPage,
          hasNextPage: action.payload.hasNextPage,
          currentPage: action.payload.currentPage,
          totalResults: action.payload.totalResults,
        };
      }
      return {
        ...state,
        pageList: action.payload.results,
        nextPage: action.payload.nextPage,
        hasNextPage: action.payload.hasNextPage,
        currentPage: action.payload.currentPage,
        totalResults: action.payload.totalResults,
      };
    }
    case GET_PAGE_DETAILS: {
      return {
        ...state, pageDetails: action.payload,
      };
    }
    case PAGR_ROUTE_FROM: {
      return {
        ...state, pageRouteFrom: action.payload,
      };
    }
    default:
      return state;
  }
};

export default pageReducer;
