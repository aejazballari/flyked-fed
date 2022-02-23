/* eslint-disable linebreak-style */
// import axios from 'axios';
// import { retrieveLocalStorage } from '../services/storageServices';
import {
  axiosGetWithToken,
} from '../services/apiServices';
import { API } from '../config/api';
import axiosInstance from '../services/axiosInstance';
import { LOADING } from './authAction';
import { retrieveLocalStorage } from '../services/storageServices';

export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const VIEW_PROFILE = 'VIEW_PROFILE';
export const PROFILE_ROUTE_FROM = 'PROFILE_ROUTE_FROM';

export const handleUpdateView = (userData, setAlert, handleRefresh) => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    const { data } = await axiosInstance
      .put(`${API.USER_PROFILE_UPDATE}`, { ...userData }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

    if (data?.status === 'Success') {
      setAlert('success', 'profile updated successfully');
      handleRefresh();
    }
  } catch (err) {
    setAlert('error', err?.response?.data?.message || 'Something went wrong please try again');
  } finally {
    dispatch({ type: LOADING, payload: false });
  }
};

export const viewProfile = (loader) => async (dispatch) => {
  const token = await retrieveLocalStorage('token');
  axiosGetWithToken(API.VIEW_PROFILE, token)
    .then((res) => {
      dispatch({
        type: VIEW_PROFILE,
        payload: res.data.data,
      });
      if (loader) {
        loader();
      }
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log('Error', err);
    });
};
