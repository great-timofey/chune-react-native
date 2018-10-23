import axios from 'axios';
import CONFIG from '../global/config';

export const API = axios.create({
  baseURL: CONFIG.API_URL,
  headers: CONFIG.HEADERS,
});

export const verifyAuthToken = (token) => {
  API.post('token/verify', token).then(response => response && response.data);
};

export const setAuthToken = (token) => {
  API.defaults.headers.common.Authorization = `JWT ${token}`;
};

export const clearAuthToken = () => {
  API.defaults.headers.common.Authorization = null;
};

export const getTopTracks = (): Promise => API.get(CONFIG.API.TRACKS.GET_TOP).then(
  response => response && response.data,
);

export const getChuneSupplyTracks = (): Promise => API.get(CONFIG.API.TRACKS.GET_SUPPLY).then(
  response => response && response.data,
);

export const getHomeContent = (start = 0, end = 20) => API.get(`content/?filter=recent&start=${start}&max_results=${end}`).then(
  response => response && response.data,
);

export const getContentForYouFirst = (start = 0, end = 10) => API.get(`recs/you/?filter=followed&start=${start}&max_results=${end}`).then(
  response => response && response.data,
);

export const getArtistData = artist => API.get(`artists/${artist}/`).then(response => response && response.data);

export const followArtist = artist => API.post(`artists/${artist}/`).then(response => response && response.data);

export const unfollowArtist = artist => API.delete(`artists/${artist}/`).then(response => response && response.data);

export const getArtistEvents = (
  artistId,
  startDate = '2018-11-01',
  finishDate = '2019-05-01',
) => API.get(`/artists/${artistId}/events/${startDate}/${finishDate}/`).then(
  response => response && response.data,
);

export const getContentForYouSecond = (start = 0, end = 10) => API.get(`content/?filter=followed&start=${start}&max_results=${end}`).then(
  response => response && response.data,
);

export const getContentFollowedRecommended = () => API.get('artists/').then(response => response && response.data);

export const searchArtist = request => API.get(`artists/search/${request}/`).then(
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
