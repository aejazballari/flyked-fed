/* eslint-disable linebreak-style */
import { retrieveLocalStorage } from '../services/storageServices';
import {
  TOKEN,
  CURRENT_STEP,
  INTREST_LIST,
  SELECTED_INTREST,
  OPEN_LOGIN_MODEL,
  VIEW_TYPE,
  LOADING,
  USER_DETAILS,
  PROGRESS,
  PROFILE_IMAGE,
} from '../actions/authAction';

const initialState = {
  token: retrieveLocalStorage('TOKEN') || '',
  userDetails: {
    about: '',
    ...retrieveLocalStorage('USER_DETAILS'),
  },
  currentStep: retrieveLocalStorage('CURRENT_STEP') || 1,
  intrestList: retrieveLocalStorage('INTREST_LIST') || [],
  selectedIntrest: [],
  openModel: retrieveLocalStorage('OPEN_LOGIN_MODEL') || false,
  viewType: retrieveLocalStorage('VIEW_TYPE') || '',
  loading: false,
  progressBar: 0,
  profileImage: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOKEN: {
      return {
        ...state,
        token: action?.payload,
      };
    }
    case USER_DETAILS: {
      return {
        ...state,
        userDetails: { ...state.userDetails, ...action?.payload },
      };
    }
    case CURRENT_STEP: {
      return {
        ...state,
        currentStep: action?.payload,
      };
    }
    case INTREST_LIST: {
      return {
        ...state,
        intrestList: action?.payload,
      };
    }
    case SELECTED_INTREST: {
      return {
        ...state,
        selectedIntrest: action?.payload,
      };
    }
    case OPEN_LOGIN_MODEL: {
      return {
        ...state,
        openModel: action?.payload,
      };
    }
    case VIEW_TYPE: {
      return {
        ...state,
        viewType: action?.payload,
      };
    }
    case LOADING: {
      return {
        ...state,
        loading: action?.payload,
      };
    }
    case PROGRESS: {
      return {
        ...state,
        progressBar: action?.payload,
      };
    }
    case PROFILE_IMAGE: {
      return {
        ...state,
        profileImage: action?.payload,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
