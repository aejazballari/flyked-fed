/* eslint-disable linebreak-style */
/* eslint-disable no-console */
import { API } from '../config/api';
import axiosInstance from '../services/axiosInstance';
import * as postAction from './postAction';
import { signInWithGoogle } from '../config/firebase';
import { GET_SUGGESTED_PAGES } from './feedAction';
import { saveLocalStorage, removeLocalStorage } from '../services/storageServices';

export const LOGIN = 'LOGIN';
export const TOKEN = 'TOKEN';
export const CURRENT_STEP = 'CURRENT_STEP';
export const INTREST_LIST = 'INTREST_LIST';
export const SELECTED_INTREST = 'SELECTED_INTREST';
export const OPEN_LOGIN_MODEL = 'OPEN_LOGIN_MODEL';
export const VIEW_TYPE = 'VIEW_TYPE';
export const LOADING = 'LOADING';
export const USER_DETAILS = 'USER_DETAILS';
export const PROGRESS = 'PROGRESS_BAR';
export const PROFILE_IMAGE = 'PROFILE_IMAGE';

export const OpenLoginModel = (step = 1) => async (dispatch) => {
  console.log(step, 'ddddd');
  dispatch({ type: OPEN_LOGIN_MODEL, payload: true });
  dispatch({ type: VIEW_TYPE, payload: 'model' });
  dispatch({ type: CURRENT_STEP, payload: step });
  saveLocalStorage('OPEN_LOGIN_MODEL', true);
  saveLocalStorage('VIEW_TYPE', 'model');
  saveLocalStorage('CURRENT_STEP', step);
};

export const CloseLoginModel = () => async (dispatch) => {
  dispatch({ type: OPEN_LOGIN_MODEL, payload: false });
  dispatch({ type: VIEW_TYPE, payload: '' });
  dispatch({ type: CURRENT_STEP, payload: 1 });
  removeLocalStorage('OPEN_LOGIN_MODEL');
  removeLocalStorage('VIEW_TYPE');
  removeLocalStorage('CURRENT_STEP');
  removeLocalStorage('TOKEN');
  removeLocalStorage('INTREST_LIST');
  removeLocalStorage('USER_DETAILS');
};

const handleUserLogin = async (userData, dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    const { data } = await axiosInstance
      .post(`${API.USER_SIGNUP}`, { ...userData }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    if (data?.status === 'success') {
      dispatch({ type: GET_SUGGESTED_PAGES, payload: [] });
      dispatch(postAction.scrollToView('feed'));
      return { status: 'success', data };
    }
  } catch (err) {
    return { status: 'error', message: err?.response?.data?.message || 'Something went wrong please try again' };
  } finally {
    dispatch({ type: LOADING, payload: false });
  }
  return { status: 'error', message: 'somthing went wrong' };
};

export const loginWithGoogle = (history, setAlert, setLoading, intrestList) => async (dispatch) => {
  setLoading(true);
  const response = await signInWithGoogle();
  if (response.status === 'success') {
    const userData = {
      name: response?.data?.displayName,
      email: response?.data?.email,
      profileImage: response?.data?.photoURL,
      socialID: response?.data?.uid,
    };
    const userResponse = await handleUserLogin(userData, dispatch);
    if (userResponse.status === 'success') {
      saveLocalStorage('userLogin', true);
      saveLocalStorage('token', userResponse?.data?.token);
      saveLocalStorage('userDetails', userResponse?.data?.data);
      saveLocalStorage('profileDetails', response?.data?.user);
      dispatch({ type: TOKEN, payload: userResponse?.data?.token });
      dispatch({ type: INTREST_LIST, payload: intrestList });
      dispatch({ type: USER_DETAILS, payload: response?.data });
      saveLocalStorage('TOKEN', userResponse?.data?.token);
      saveLocalStorage('INTREST_LIST', intrestList);
      saveLocalStorage('USER_DETAILS', response?.data);
      // dispatch(OpenLoginModel(2));
      // setLoading(false);
      if (userResponse?.data?.data?.newUser === true) {
        dispatch(OpenLoginModel(2));
        setLoading(false);
      } else {
        dispatch(CloseLoginModel());
        history.push('/');
        setLoading(false);
        setAlert('success', 'Successfully logged in');
      }
    } else {
      setLoading(false);
      setAlert('error', userResponse?.message);
    }
  } else {
    setLoading(false);
    setAlert('error', response.message);
  }
};

export const handleProfileUpdate = (userData, setAlert) => async (dispatch) => {
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
      dispatch({ type: CURRENT_STEP, payload: 3 });
      dispatch(OpenLoginModel(3));
    }
  } catch (err) {
    setAlert('error', err?.response?.data?.message || 'Something went wrong please try again');
  } finally {
    dispatch({ type: LOADING, payload: false });
  }
};

export const updateSelectedIntrest = (selectedIntrest, setAlert, history) => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  const formData = {
    category: selectedIntrest,
  };
  try {
    const { data } = await axiosInstance.put(`${API.UPDATE_INTERESTS}`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (data?.status === 'Success') {
      setAlert('success', data?.message);
      history.push('/');
      dispatch(CloseLoginModel());
    }
  } catch (error) {
    setAlert('error', error?.response?.data?.message);
  } finally {
    dispatch({ type: LOADING, payload: false });
  }
};
