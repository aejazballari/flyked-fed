/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
import { API } from '../config/api';
import { axiosGetWithToken } from '../services/apiServices';
import { retrieveLocalStorage } from '../services/storageServices';

export const GET_BIRTHDAY = 'GET_BIRTHDAY';
export const GET_ON_THIS_DAY = 'GET_ON_THIS_DAY';
export const GET_IN_NEWS = 'GET_IN_NEWS';
export const GET_FEEDS = 'GET_FEEDS';
export const GET_SUGGESTED_PAGES = 'GET_SUGGESTED_PAGES';
export const CATEGORY_FILTER = 'CATEGORY_FILTER';
export const CLEAR_FILTER = 'CLEAR_FILTER';
export const UPDATE_FEEDS_LIST = 'UPDATE_FEEDS_LIST';

export const getBirthday = (loader) => async (dispatch) => {
  const token = await retrieveLocalStorage('token');
  axiosGetWithToken(
    API.BIRTHDAY_FEED, token,
  )
    .then((res) => {
      dispatch({
        type: GET_BIRTHDAY,
        payload: res.data.data,
      });
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

export const getOnThisDay = (loader) => async (dispatch) => {
  const token = await retrieveLocalStorage('token');

  axiosGetWithToken(
    API.THIS_DAY_FEED, token,
  )
    .then((res) => {
      dispatch({
        type: GET_ON_THIS_DAY,
        payload: res.data.data,
      });
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

export const getInNews = (page, loader) => async (dispatch) => {
  const token = await retrieveLocalStorage('token');
  try {
    axiosGetWithToken(`${API.IN_NEWS_FEED}?page=${page}&limit=5`, token).then(
      (res) => {
        if (
          res?.data?.status === 'Success'
          || res?.data?.status === 'success'
        ) {
          dispatch({
            type: GET_IN_NEWS,
            payload: res.data.data,
          });
        } else {
          dispatch({
            type: GET_IN_NEWS,
            payload: [],
          });
        }
        if (loader) {
          loader();
        }
      },
    );
  } catch (err) {
    console.log(err);
  }
};

export const getFeeds = (page, loader, quary) => async (dispatch) => {
  const token = await retrieveLocalStorage('token');
  try {
    axiosGetWithToken(`${API.FEEDS}?page=${page}&${quary}`, token).then(
      (res) => {
        if (
          res?.data?.status === 'Success'
            || res?.data?.status === 'success'
        ) {
          dispatch({
            type: GET_FEEDS,
            payload: res.data.data,
          });
        } else {
          dispatch({
            type: GET_FEEDS,
            payload: [],
          });
        }
        if (loader) {
          loader();
        }
      },
    );
  } catch (err) {
    console.log(err);
  }
};

export const getSuggestedPages = (loader) => async (dispatch) => {
  const token = await retrieveLocalStorage('token');
  try {
    axiosGetWithToken(`${API.SUGGESTED_PAGES}`, token).then(
      (res) => {
        if (
          res?.data?.status === 'Success'
            || res?.data?.status === 'success'
        ) {
          dispatch({
            type: GET_SUGGESTED_PAGES,
            payload: res.data,
          });
        } else {
          dispatch({
            type: GET_SUGGESTED_PAGES,
            payload: [],
          });
        }
        if (loader) {
          loader();
        }
      },
    );
  } catch (err) {
    console.log(err);
  }
};

export const categoryFeeds = (id) => async (dispatch) => {
  dispatch({
    type: CATEGORY_FILTER,
    payload: id,
  });
};
