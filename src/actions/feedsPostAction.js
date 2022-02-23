/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
import { API } from '../config/api';
import axiosInstance from '../services/axiosInstance';
import { UPDATE_FEEDS_LIST } from './feedAction';

export const GET_FEED_POST_LIST = 'GET_FEED_POST_LIST';
export const LOADING = 'LOADING';
export const OPEN_PREVIEW_MODEL = 'OPEN_PREVIEW_MODEL';
export const SELECTED_POST_ID = 'SELECTED_POST_ID';

export const getFeedPostPreviewList = (postId, setAlert,
  loaderStatus, homePageFeedsList) => async (dispatch) => {
  dispatch({ type: OPEN_PREVIEW_MODEL, payload: true });
  if (!loaderStatus) {
    dispatch({ type: LOADING, payload: true });
  }
  try {
    const { data } = await axiosInstance.get(
      `${API.FEED_POST_PREVIEW}/${postId}/preview`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (data?.status === 'success') {
      const SuggestedPages = data?.data?.suggestedPages;
      for (let i = 0; i < SuggestedPages?.length; i += 1) {
        const newObj = SuggestedPages[i];
        newObj.isFollowing = false;
      }
      const newResponse = data?.data;
      newResponse.suggestedPages = SuggestedPages;
      if (loaderStatus) {
        const newData = homePageFeedsList
          .map((obj) => newResponse?.posts?.find((o) => o._id === obj._id) || obj);
        // console.log(newResponse, newData, 'ddd');
        dispatch({ type: UPDATE_FEEDS_LIST, payload: newData });
      }
      dispatch({ type: GET_FEED_POST_LIST, payload: newResponse });
      dispatch({ type: SELECTED_POST_ID, payload: postId });
    }
  } catch (err) {
    setAlert('error', err?.response?.data?.message);
  } finally {
    dispatch({ type: LOADING, payload: false });
  }
};

export const handleFollowUnFollow = (pageId,
  setAlert, handleCallback, setLoading, type) => async (dispatch) => {
  dispatch({ type: OPEN_PREVIEW_MODEL, payload: true });
  const Api = type === 'follow' ? `${API.PAGE_FOLLOW_UNFOLLOW}/${pageId}/follow` : `${API.PAGE_FOLLOW_UNFOLLOW}/${pageId}/unFollow`;
  try {
    const { data } = await axiosInstance.get(Api,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    if (data?.status === 'success') {
      setAlert('success', data?.message);
      handleCallback(pageId);
    }
  } catch (err) {
    setAlert('error', err?.response?.data?.message);
  } finally {
    setLoading(false);
  }
};
