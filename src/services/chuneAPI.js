import axios from 'axios';
import CONFIG from '../global/config';

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

export const homeImagesPrefix = `${CONFIG.API_URL_IMAGES}${
  CONFIG.API.IMAGES.MEDIUM
}`;
export const featuredArticleImageUrl = `${CONFIG.API_URL_IMAGES}${
  CONFIG.API.IMAGES.FULL
}`;

export const getTopTracks = (): Promise => API.get(CONFIG.API.TRACKS.GET_TOP).then(
  response => response && response.data,
);

export const getChuneSupplyTracks = (): Promise => API.get(CONFIG.API.TRACKS.GET_SUPPLY).then(
  response => response && response.data,
);

export const getContentForYouFirst = (start, end) => API.get(`recs/you/?filter=followed&start=${start}&max_results=${end}`).then(
  response => response && response.data,
);
export const getContentForYouSecond = (start, end) => API.get(`content/?filter=followed&start=${start}&max_results=${end}`).then(
  response => response && response.data,
);

export const getTracksOfChosenType = (type) => {
  switch (type) {
    case 'topTracks':
      return getTopTracks();
    case 'chuneSupply':
      return getChuneSupplyTracks();
  }
};

// API.get('tracks/sources/1/')
//   .then(res => this.setState({ topTracks: res.data }))
//   .then(_ => API.get('tracks/sources/2/'))
//   .then(res => this.setState({ chuneSupply: res.data }))
//   .then(res => this.setState({ loading: false }))
//   .catch(err => console.log(err.response));
