import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://api-stage.chunesupply.com/api/v1/',
  headers: {
    'content-type': 'application/json',
  },
});
export const setUserToken = (token) => {
  API.defaults.headers.common.Authorization = `JWT ${token}`;
};
export const clearUserToken = () => {
  API.defaults.headers.common.Authorization = null;
};
