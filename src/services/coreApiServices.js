/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
import axios from 'axios';
// import * as authAction from '../actions/authAction';
// import store from '../store';

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

const attachDefaultContentType = (header) => {
  if (header['Content-Type'] === null || header['Content-Type'] === undefined) {
    header['Content-Type'] = 'application/json';
  }
  return header;
};

// get method
export const get = async (api, headers = {}) => {
  headers = attachDefaultContentType(headers);
  const response = await axios
    .get(api, { headers })
    .then((res) => ({
      data: res.data,
      status: res.status,
    }))
    .catch((err) => err.response);

  return response;
};

// Post method
export const post = async (api, body, headers = {}) => {
  headers = attachDefaultContentType(headers);
  const response = await axios
    .post(api, body, {
      headers,
    })
    .then((res) => ({ data: res.data, status: res.status }))
    .catch((err) => err.response);

  return response;
};

// Put method
export const put = async (api, body, headers = {}) => {
  headers = attachDefaultContentType(headers);
  let args = [api, body];

  if (headers) {
    args = [
      api,
      body,
      {
        headers,
      },
    ];
  }
  const response = await axios
    .put(...args)
    .then((res) => ({ data: res.data, status: res.status }))
    .catch((err) => err.response);

  return response;
};
// Patch method
export const patch = async (api, body, headers = {}) => {
  headers = attachDefaultContentType(headers);
  let args = [api, body];

  if (headers) {
    args = [
      api,
      body,
      {
        headers,
      },
    ];
  }
  const response = await axios
    .patch(...args)
    .then((res) => ({ data: res.data, status: res.status }))
    .catch((err) => err.response);

  return response;
};

// delete
export const plainDelete = async (api, headers) => {
  headers = attachDefaultContentType(headers);
  let args = [api];
  if (headers) {
    args = [
      api,
      {
        headers,
      },
    ];
  }
  const response = await axios
    .delete(...args)
    .then((res) => ({ data: res.data, status: res.status }))
    .catch((err) => err.response);

  return response;
};

// post form data
export const postFormData = async (api, body) => {
  const result = await axios.post(api, JSON.stringify(body), config);
  const response = {
    status: result.status,
    data: result.data,
  };

  return response;
};

export const mediaUpload = async (url, mediaType, media, token) => {
  const headers = {
    Authorization: token,
    accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  };
  const formData = new FormData();
  formData.append('media_type', mediaType);
  formData.append('media', media);

  const result = await axios.post(url, formData, { headers });

  return {
    status: result.status_code,
    data: result.data,
  };
};
