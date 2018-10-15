import axios from 'axios';
import CONFIG from '~global/config';

export const API = axios.create({
  baseURL: CONFIG.API_URL,
  headers: CONFIG.HEADERS,
});

export const setAuthToken = (token) => {
  API.defaults.headers.common.Authorization = `JWT ${token}`;
};

export const clearAuthToken = () => {
  API.defaults.headers.common.Authorization = null;
};

export const homeImagesPrefix = `${CONFIG.API_URL}${CONFIG.API.IMAGES.MEDIUM}`;
export const featuredArticleImageUrl = `${CONFIG.API_URL}${CONFIG.API.IMAGES.FULL}`;

export const getTopTracks = (): Promise => API
  .get(CONFIG.API.TRACKS.GET_TOP)
  .then(response => response && response.data);

export const getChuneSupplyTracks = (): Promise => API
  .get(CONFIG.API.TRACKS.GET_SUPPLY)
  .then(response => response && response.data);

// API.get('tracks/sources/1/')
//   .then(res => this.setState({ topTracks: res.data }))
//   .then(_ => API.get('tracks/sources/2/'))
//   .then(res => this.setState({ chuneSupply: res.data }))
//   .then(res => this.setState({ loading: false }))
//   .catch(err => console.log(err.response));
