/* eslint-disable linebreak-style */
import {
  NAV_SELECTED,
} from '../actions/navBarAction';

const initialState = {
  navSelected: 'home',
};

const navReduser = (state = initialState, action) => {
  switch (action.type) {
    case NAV_SELECTED: {
      return {
        ...state,
        navSelected: action?.payload,
      };
    }
    default:
      return state;
  }
};

export default navReduser;
