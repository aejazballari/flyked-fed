/* eslint-disable linebreak-style */
import { GET_CATEGORIES, GET_SUBCATEGORIES } from '../actions/categoryAction';

const initialState = {
  categories: [],
  subCategories: null,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES: {
      return {
        ...state, categories: action.payload,
      };
    }
    case GET_SUBCATEGORIES: {
      return {
        ...state, subCategories: action.payload,
      };
    }
    default:
      return state;
  }
};

export default categoryReducer;
