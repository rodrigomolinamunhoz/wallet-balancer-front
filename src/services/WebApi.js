import axios from 'axios';
import qs from 'qs';
//import { CacheService } from '../services/CacheService';
//import { StorageKeys } from '../constants/StorageKeys';

const WebApiTotem = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 120000,
  paramsSerializer: params => {
    return qs.stringify(params, { arrayFormat: 'repeat' });
  },
});

const requestHandler = request => {
  //const token = CacheService.get(StorageKeys.AuthToken);
  //if (token) request.headers.Authorization = `Bearer ${token}`;

  return request;
};

const responseSuccessHandler = response => {
  return response;
};

const responseErrorHandler = error => {
  // if (error.response.status === 401) {
  //   CacheService.removeAll();
  //   window.location = '/';
  // }
  // return Promise.reject(error);
};

WebApiTotem.interceptors.request.use(requestHandler);

WebApiTotem.interceptors.response.use(
  response => responseSuccessHandler(response),
  error => responseErrorHandler(error)
);

export default WebApiTotem;
