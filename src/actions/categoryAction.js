/* eslint-disable linebreak-style */
/* eslint-disable no-console */
import { API } from '../config/api';
import { axiosGetWithToken } from '../services/apiServices';
import { retrieveLocalStorage } from '../services/storageServices';
import { INTREST_LIST } from './authAction';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_SUBCATEGORIES = 'GET_SUBCATEGORIES';

export const getCategories = (loader) => async (dispatch) => {
  const token = await retrieveLocalStorage('token');
  axiosGetWithToken(
    API.GET_CATEGORY,
    token,
  )
    .then((res) => {
      dispatch({
        type: GET_CATEGORIES,
        payload: res.data.data,
      });
      dispatch({ type: INTREST_LIST, payload: res.data.data });
      if (loader) {
        loader();
      }
    })
    .catch((err) => {
      console.log('Error', err);
      if (loader) {
        loader();
      }
    });
};

export const getSubCategories = (id) => async (dispatch) => {
  const token = await retrieveLocalStorage('token');
  axiosGetWithToken(
    `${API.GET_SUBCATEGORY}/${id}`,
    token,
  )
    .then((res) => {
      dispatch({
        type: GET_SUBCATEGORIES,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      console.log('Error', err);
    });
};
