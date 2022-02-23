/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable operator-linebreak */
import { API } from '../config/api';
import axiosInstance from '../services/axiosInstance';
import {
  axiosGetWithToken, axiosPostWithToken,
  axiosPut, axiosGet,
} from '../services/apiServices';
import { retrieveLocalStorage } from '../services/storageServices';

export const POST_IMAGE = 'POST_IMAGE';
export const POST_TEXT = 'POST_TEXT';
export const POST_PAGE_SELECTED = 'POST_PAGE_SELECTED';
export const POST_PAGE_LIST = 'POST_PAGE_LIST';
export const POST_PAGE_TYPE_SELECTED = 'POST_PAGE_TYPE_SELECTED';
export const CURRENT_STEP = 'CURRENT_STEP';
export const PROGRESS_UPLOAD = 'PROGRESS_UPLOAD';
export const PAGE_MODEL = 'PAGEMODEL';
export const SEARCH_TEXT = 'SEARCH_TEXT';
export const LOADING = 'LOADING';
export const GET_PENDING_POSTS = 'GET_PENDING_POSTS';
export const POST_CROPER_MODEL = 'POST_CROPER_MODEL';
export const GET_PUBLISHED_POSTS = 'GET_PUBLISHED_POSTS';
export const POST_TYPE_MODEL = 'POST_TYPE_MODEL';
export const DATE_OF_BIRTH = 'DATE_OF_BIRTH';
export const POST_ROUTE_FROM = 'POST_ROUTE_FROM';
export const PALLET_COLOR = 'PALLET_COLOR';
export const FEED_TYPE_SELECTED = 'FEED_TYPE_SELECTED';
export const SCROLL_VIEW = 'SCROLL_VIEW';
export const SCROLL_REF = 'SCROLL_REF';
export const SET_LOADER = 'SET_LOADER';

export const POST_TYPE = 'POST_TYPE';
export const GET_PAGE_SPECIFIC_POSTS = 'GET_PAGE_SPECIFIC_POSTS';
export const GET_SAVED_POSTS = 'GET_SAVED_POSTS';
export const SAVE_POST = 'SAVE_POST';
export const GET_COMMENTS = 'GET_COMMENTS';
export const GET_LIKES = 'GET_LIKES';
export const META_POST_DETAILS = 'META_POST_DETAILS';

export const GET_USER_SPECIFIC_POSTS = 'GET_USER_SPECIFIC_POSTS';

export const GET_POST_DETAILS = 'GET_POST_DETAILS';

export const SET_HORIZONTAL_POST_PREVIEW = 'SET_HORIZONTAL_POST_PREVIEW';

export const SET_COMMENTLIST_VISIBLE = 'SET_COMMENTLIST_VISIBLE';

export const handleSubmitPost = (body, setAlert) => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    const { data } = await axiosInstance.post(
      `${API.CREATE_POST_API}`,
      { ...body },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (data?.status === 'success') {
      setAlert('success', data?.message);
      dispatch({ type: CURRENT_STEP, payload: 3 });
    }
  } catch (err) {
    setAlert('error', err?.response?.data?.message);
  } finally {
    dispatch({ type: LOADING, payload: false });
  }
};

export const handleLoading = () => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
};

export const handleSearchPage = (searchVal, pageNo, setAlert, results) => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    const { data } = await axiosInstance.get(
      `${API.GET_PAGES_ON_SEARCH}?title=${searchVal}&page=${pageNo || 1}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (data?.status === 'success') {
      if (pageNo !== 1) {
        const fullResult = [...results, ...data?.data?.results];
        const pageResult = data?.data;
        pageResult.results = fullResult;
        dispatch({ type: POST_PAGE_LIST, payload: pageResult });
      } else {
        dispatch({ type: POST_PAGE_LIST, payload: data?.data });
        dispatch({ type: PAGE_MODEL, payload: true });
      }
    }
  } catch (err) {
    if (err?.response?.data?.message === 'Page Does Not Exist!') {
      dispatch({ type: POST_PAGE_LIST, payload: { results: [] } });
    } else {
      setAlert(
        'error',
        err?.response?.data?.message ||
            'Something went wrong please try again',
      );
    }
  } finally {
    dispatch({ type: LOADING, payload: false });
  }
};

export const postType = (type) => async (dispatch) => {
  dispatch({
    type: POST_TYPE,
    payload: type,
  });
};

export const getPendingPosts = (page, loader) => async (dispatch) => {
  const token = await retrieveLocalStorage('token');
  try {
    axiosGetWithToken(`${API.PENDING_POSTS}?page=${page}`, token).then(
      (res) => {
        if (
          res?.data?.status === 'Success' ||
          res?.data?.status === 'success'
        ) {
          dispatch({
            type: GET_PENDING_POSTS,
            payload: res.data.data,
          });
        } else {
          dispatch({
            type: GET_PENDING_POSTS,
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

export const getPublishedPosts = (page, loader) => async (dispatch) => {
  const token = await retrieveLocalStorage('token');
  try {
    axiosGetWithToken(`${API.PUBLISHED_POSTS}?page=${page}`, token).then(
      (res) => {
        if (
          res?.data?.status === 'Success' ||
          res?.data?.status === 'success'
        ) {
          dispatch({
            type: GET_PUBLISHED_POSTS,
            payload: res.data.data,
          });
        } else {
          dispatch({
            type: GET_PUBLISHED_POSTS,
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

export const getSavedPosts = (page, loader) => async (dispatch) => {
  const token = await retrieveLocalStorage('token');
  try {
    axiosGetWithToken(`${API.SAVED_POSTS}?page=${page}`, token).then((res) => {
      if (res?.data?.status === 'Success' || res?.data?.status === 'success') {
        dispatch({
          type: GET_SAVED_POSTS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: GET_SAVED_POSTS,
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

export const savepost = (id, getResponse) => async () => {
  const token = await retrieveLocalStorage('token');
  try {
    axiosPut(`${API.SAVE_POST_API}/${id}/save`, { id }, token).then((res) => {
      if (res.status === 200) {
        getResponse('success');
      }
    });
  } catch (err) {
    getResponse('fail');
  }
};

export const unsavepost = (id, getResponse) => async () => {
  const token = await retrieveLocalStorage('token');
  try {
    axiosPut(`${API.SAVE_POST_API}/${id}/unsave`, { id }, token).then((res) => {
      if (res.status === 200) {
        getResponse('success');
      }
    });
  } catch (err) {
    getResponse('fail');
  }
};

export const getPageSpecificPosts =
  (pageId, pageNo, loader) => async (dispatch) => {
    const token = await retrieveLocalStorage('token');
    if (pageId) {
      try {
        axiosGetWithToken(
          `${API.PAGE_DETAILS}/${pageId}/post?page=${pageNo}`,
          token,
        ).then((res) => {
          if (
            res?.data?.status === 'Success' ||
            res?.data?.status === 'success'
          ) {
            dispatch({
              type: GET_PAGE_SPECIFIC_POSTS,
              payload: res.data.data,
            });
          } else {
            dispatch({
              type: GET_PAGE_SPECIFIC_POSTS,
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
    }
  };

export const getCommentList = (id, page, loader) => async (dispatch) => {
  const token = await retrieveLocalStorage('token');
  try {
    axiosGetWithToken(`${API.COMMENT_POST_API}/${id}/comment?page=${page}`, token)
      .then((res) => {
        if (res.data.status === 'Success' || res.data.status === 'success') {
          dispatch({
            type: GET_COMMENTS,
            payload: res.data.data,
          });
        } else {
          dispatch({
            type: GET_COMMENTS,
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

export const saveComments = (formValues, id, getResponse) => async () => {
  const token = await retrieveLocalStorage('token');
  axiosPostWithToken(
    `${API.COMMENT_POST_API}/${id}/comment`,
    formValues,
    token,
  )
    .then((res) => {
      // if (res.data.status === 'success') {
      getResponse(res.data.status);
      // }
    });
};

export const likepost = (id, getResponse) => async () => {
  const token = await retrieveLocalStorage('token');
  try {
    axiosPut(`${API.LIKE_POST_API}/${id}/like`, { id }, token).then((res) => {
      if (res.status === 200) {
        getResponse('success');
      }
    });
  } catch (err) {
    getResponse('fail');
  }
};

export const unlikepost = (id, getResponse) => async () => {
  const token = await retrieveLocalStorage('token');
  try {
    axiosPut(`${API.LIKE_POST_API}/${id}/unlike`, { id }, token).then((res) => {
      if (res.status === 200) {
        getResponse('success');
      }
    });
  } catch (err) {
    getResponse('fail');
  }
};

export const getLikesList = (id, page, loader) => async (dispatch) => {
  const token = await retrieveLocalStorage('token');
  try {
    axiosGetWithToken(`${API.LIKE_POST_API}/${id}/like?page=${page}`, token)
      .then((res) => {
        if (res.data.status === 'Success' || res.data.status === 'success') {
          dispatch({
            type: GET_LIKES,
            payload: res.data.data,
          });
        } else {
          dispatch({
            type: GET_LIKES,
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

export const scrollToView = (ref) => async (dispatch) => {
  dispatch({
    type: SCROLL_VIEW,
    payload: ref,
  });
};

export const getUserSpecificPosts =
  (userId, pageNo, loader) => async (dispatch) => {
    const token = await retrieveLocalStorage('token');
    if (userId) {
      try {
        axiosGetWithToken(
          `${API.USER_PUBLIC_VIEW}${userId}/post?page=${pageNo}`,
          token,
        ).then((res) => {
          if (
            res?.data?.status === 'Success' ||
            res?.data?.status === 'success'
          ) {
            dispatch({
              type: GET_USER_SPECIFIC_POSTS,
              payload: res.data.data,
            });
          } else {
            dispatch({
              type: GET_USER_SPECIFIC_POSTS,
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
    }
  };

export const getPostDetails = (url, loader) => async (dispatch) => {
  const token = await retrieveLocalStorage('token');
  try {
    axiosGetWithToken(`${API.POST_DETAILS}/${url}`, token)
      .then((res) => {
        if (res.data.status === 'success') {
          dispatch({
            type: GET_POST_DETAILS,
            payload: res.data.data,
          });
          if (loader) {
            loader();
          }
        }
      });
  } catch (err) {
    console.log(err);
  }
};

export const handleOpenHorizontalPreview = (type, index) => async (dispatch) => {
  dispatch({
    type: SET_HORIZONTAL_POST_PREVIEW,
    payload: type,
    id: index,
  });
};

export const handleCommentsToggle = (id) => async (dispatch) => {
  dispatch({ type: SET_COMMENTLIST_VISIBLE, payload: id });
};
