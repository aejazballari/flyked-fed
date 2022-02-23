/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import {
  GET_BIRTHDAY, GET_ON_THIS_DAY, GET_IN_NEWS, GET_FEEDS, GET_SUGGESTED_PAGES, CATEGORY_FILTER, CLEAR_FILTER, UPDATE_FEEDS_LIST,
} from '../actions/feedAction';

const initialState = {
  birthdayList: [],
  inNews: {},
  thisDayList: [],
  // feedsList: [],
  suggestedPages: [],
  currentPage: '1',
  nextPage: '',
  totalResults: '',
  categoryIds: [],
  feedList: {
    list: [],
    currentPage: '1',
    nextPage: '',
    totalResults: '',
  },
};

const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BIRTHDAY: {
      return {
        ...state, birthdayList: action.payload,
      };
    }

    case GET_ON_THIS_DAY: {
      return {
        ...state, thisDayList: action.payload,
      };
    }

    case GET_IN_NEWS: {
      return {
        ...state, inNews: action.payload,
      };
    }

    case GET_SUGGESTED_PAGES: {
      return {
        ...state, suggestedPages: action.payload,
      };
    }

    case UPDATE_FEEDS_LIST: {
      const updatedData = state?.feedsList;
      updatedData.list = action.payload;
      return {
        ...state,
        feedsList: updatedData,
      };
    }

    case GET_FEEDS: {
      if (action.payload.currentPage > 1) {
        return {
          ...state,
          feedsList: {
            list: [...state.feedsList.list, ...action.payload.results],
            nextPage: action.payload.nextPage,
            hasNextPage: action.payload.hasNextPage,
            currentPage: action.payload.currentPage,
            totalResults: action.payload.totalResults,
          },
        };
      }
      return {
        ...state,
        feedsList: {
          list: action.payload.results,
          nextPage: action.payload.nextPage,
          hasNextPage: action.payload.hasNextPage,
          currentPage: action.payload.currentPage,
          totalResults: action.payload.totalResults,
        },
      };
    }

    // case GET_FEEDS: {
    //   if (action.payload.currentPage > 1) {
    //     return {
    //       ...state,
    //       feedsList: [...state.feedsList, ...action.payload.results],
    //       nextPage: action.payload.nextPage,
    //       hasNextPage: action.payload.hasNextPage,
    //       currentPage: action.payload.currentPage,
    //       totalResults: action.payload.totalResults,
    //     };
    //   }

    //   return {
    //     ...state,
    //     feedsList: action.payload.results,
    //     nextPage: action.payload.nextPage,
    //     hasNextPage: action.payload.hasNextPage,
    //     currentPage: action.payload.currentPage,
    //     totalResults: action.payload.totalResults,
    //   };
    // }

    case CATEGORY_FILTER: {
      if (state.categoryIds.includes(action.payload)) {
        return { ...state, categoryIds: state.categoryIds.filter((element) => element !== action.payload) };
      }
      return { ...state, categoryIds: [action.payload] };
    }

    case CLEAR_FILTER: {
      return { ...state, categoryIds: action.payload };
    }
    default:
      return state;
  }
};

export default feedReducer;
