/* eslint-disable linebreak-style */
import axios from 'axios';
import { retrieveLocalStorage } from './storageServices';

const axiosInstance = axios.create({
  // baseURL: 'https://1e00b2olq2.execute-api.ap-south-1.amazonaws.com',
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = await retrieveLocalStorage('token');
  const user = await retrieveLocalStorage('userLogin');
  const requestConfig = config;
  if (user) {
    requestConfig.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await localStorage.removeItem('userDetails');
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
