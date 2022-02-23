/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import {
  get, mediaUpload,
  patch, plainDelete, post, postFormData, put,
} from './coreApiServices';

export const axiosGet = (api) => get(api);

export const axiosGetWithToken = async (api, token) => {
  const headers = token ? {
    Authorization: `${token}`,
  } : {};

  const result = await get(api, headers);
  return result;
};

export const axiosPost = (api, body) => post(api, body);

export const axiosPostWithHeader = (api, body, token) => {
  const headers = {
    Authorization: `${token}`,
  };
  return post(api, body, headers);
};

export const axiosPostWithToken = (api, body, token) => {
  const headers = {
    Authorization: `${token}`,
  };
  return post(api, body, headers);
};

export const axiosPostFormData = async (api, body) => postFormData(api, body);

export const axiosPut = (api, body, token = null) => {
  const headers = token === null ? {} : { Authorization: `${token}` };
  return put(api, body, headers);
};

export const axiosPatchWithToken = (api, body, token = null) => {
  const headers = token === null ? {} : { Authorization: `${token}` };
  return patch(api, body, headers);
};

export const axiosDelete = (api, token = null) => {
  const headers = token === null ? {} : { Authorization: `${token}` };
  return plainDelete(api, headers);
};

export const axiosMediaUpload = async (url, mediaType, media, token) => mediaUpload(url, mediaType, media, token);

export const axiosPostFormWithToken = (api, body, token) => {
  const headers = {
    Authorization: `${token}`,
    'Content-Type': 'multipart/form-data',
  };
  return post(api, body, headers);
};
