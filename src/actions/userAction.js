/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
import { API } from '../config/api';
import {
  axiosGetWithToken,
} from '../services/apiServices';
import { retrieveLocalStorage } from '../services/storageServices';

export const GET_USER_DETAILS = 'GET_USER_DETAILS';
export const GET_FOLLOWERS_LIST = 'GET_FOLLOWERS_LIST';
export const GET_FOLLOWING_LIST = 'GET_FOLLOWING_LIST';

export const getUserDetails = (url, loader) => async (dispatch) => {
  const token = await retrieveLocalStorage('token');
  try {
    axiosGetWithToken(`${API.USER_PUBLIC_VIEW}/${url}`, token)
      .then((res) => {
        dispatch({
          type: GET_USER_DETAILS,
          payload: res.data.data,
        });
        if (loader) {
          loader();
        }
      });
  } catch (err) {
    console.log(err);
    if (loader) {
      loader();
    }
  }
};

export const followUser = (userId, getResponse) => async () => {
  const token = await retrieveLocalStorage('token');
  try {
    axiosGetWithToken(`${API.USER_PUBLIC_VIEW}/user/${userId}/follow`, token)
      .then((res) => {
        getResponse(res.data.status);
      });
  } catch (err) {
    console.log(err);
  }
};

export const unFollowUser = (userId, getResponse) => async () => {
  const token = await retrieveLocalStorage('token');
  try {
    axiosGetWithToken(`${API.USER_PUBLIC_VIEW}/user/${userId}/unFollow`, token)
      .then((res) => {
        getResponse(res.data.status);
      });
  } catch (err) {
    console.log(err);
  }
};

export const getFollowers = (id, pageNo, loader) => async (dispatch) => {
  const token = await retrieveLocalStorage('token');
  try {
    axiosGetWithToken(`${API.USER_PUBLIC_VIEW}/${id}/followers?page=${pageNo}`, token)
      .then((res) => {
        if (
          res?.data?.status === 'Success'
          || res?.data?.status === 'success'
        ) {
          dispatch({
            type: GET_FOLLOWERS_LIST,
            payload: res.data.data,
          });
        } else {
          dispatch({
            type: GET_FOLLOWERS_LIST,
            payload: [],
          });
        }
        if (loader) {
          loader();
        }
      });
  } catch (err) {
    console.log(err);
  }
};

export const getFollowing = (id, pageNo, loader) => async (dispatch) => {
  const token = await retrieveLocalStorage('token');
  try {
    axiosGetWithToken(`${API.USER_PUBLIC_VIEW}/${id}/following?page=${pageNo}`, token)
      .then((res) => {
        if (
          res?.data?.status === 'Success'
          || res?.data?.status === 'success'
        ) {
          dispatch({
            type: GET_FOLLOWING_LIST,
            payload: res.data.data,
          });
        } else {
          dispatch({
            type: GET_FOLLOWING_LIST,
            payload: [],
          });
        }
        if (loader) {
          loader();
        }
      });
  } catch (err) {
    console.log(err);
  }
};
