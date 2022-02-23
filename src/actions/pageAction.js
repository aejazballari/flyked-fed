/* eslint-disable no-console */
/* eslint-disable linebreak-style */
// /* eslint-disable no-console */
/* eslint-disable linebreak-style */
import { API } from '../config/api';
import {
  axiosPostWithToken, axiosGetWithToken,
} from '../services/apiServices';
import { retrieveLocalStorage } from '../services/storageServices';
import * as authAction from './authAction';

export const CREATE_PAGE = 'CREATE_PAGE';
export const SEARCH_PAGE = 'SEARCH_PAGE';
export const GET_SEARCH_PAGE_RESULTS = 'GET_SEARCH_PAGE_RESULTS';
export const GET_PAGE_DETAILS = 'GET_PAGE_DETAILS';
export const PAGR_ROUTE_FROM = 'PAGR_ROUTE_FROM';
export const GET_CONTRIBUTOR_LIST = 'GET_CONTRIBUTOR_LIST';

export const createPage = (formValues, getResponse) => async () => {
  const token = await retrieveLocalStorage('token');
  axiosPostWithToken(
    API.CREATE_PAGE_API,
    formValues,
    token,
  )
    .then((res) => {
      // if (res.data.status === 'success') {
      getResponse(res.data.status);
      // }
    });
};

export const getSearchPageResults = (term, page, loader) => async (dispatch) => {
  // const token = await retrieveLocalStorage('token');
  axiosGetWithToken(`${API.SEARCH}?page=${page}&title=${term}`)
    .then((res) => {
      if (res.data.status === 'Success' || res.data.status === 'success') {
        dispatch({
          type: GET_SEARCH_PAGE_RESULTS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: GET_SEARCH_PAGE_RESULTS,
          payload: [],
        });
      }
      if (loader) {
        loader();
      }
    });
};

export const searchPage = (term) => async (dispatch) => {
  dispatch({
    type: SEARCH_PAGE,
    payload: term,
  });
};

export const getPageDetails = (url, loader) => async (dispatch) => {
  const token = await retrieveLocalStorage('token');
  try {
    axiosGetWithToken(`${API.PAGE_DETAILS}/${url}`, token)
      .then((res) => {
        dispatch({
          type: GET_PAGE_DETAILS,
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

export const followPage = (pageId, getResponse) => async (dispatch) => {
  const token = await retrieveLocalStorage('token');
  if (token) {
    try {
      axiosGetWithToken(`${API.PAGE_DETAILS}/${pageId}/follow`, token)
        .then((res) => {
          getResponse(res.data.status);
        });
    } catch (err) {
      console.log(err);
    }
  } else {
    dispatch(authAction?.OpenLoginModel());
  }
};

export const unFollowPage = (pageId, getResponse) => async () => {
  const token = await retrieveLocalStorage('token');
  try {
    axiosGetWithToken(`${API.PAGE_DETAILS}/${pageId}/unFollow`, token)
      .then((res) => {
        getResponse(res.data.status);
      });
  } catch (err) {
    console.log(err);
  }
};

export const getContributors = (id, pageNo, loader) => async (dispatch) => {
  const token = await retrieveLocalStorage('token');
  try {
    axiosGetWithToken(`${API.PAGE_DETAILS}/${id}/contributor?page=${pageNo}`, token)
      .then((res) => {
        if (
          res?.data?.status === 'Success'
          || res?.data?.status === 'success'
        ) {
          dispatch({
            type: GET_CONTRIBUTOR_LIST,
            payload: res.data.data,
          });
        } else {
          dispatch({
            type: GET_CONTRIBUTOR_LIST,
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
