import axios from 'axios';

export const API = axios.create({
  baseURL: 'https://p5aei2tfmj.execute-api.us-east-2.amazonaws.com/dev/api/v1/',
});
export const setUserToken = (token) => {
  API.defaults.headers.common.Authorization = `JWT ${token}`;
};
export const clearUserToken = () => {
  API.defaults.headers.common.Authorization = null;
};
