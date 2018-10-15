import CONFIG from '~global/config';
import { API } from '~services/chuneAPI';

export const getTopTracks = () => API.get(`${CONFIG.API_URL}${CONFIG.API.TRACKS.GET_TOP}`);

export const getChuneSupplyTracks = () => API.get(`${CONFIG.API_URL}${CONFIG.API.TRACKS.GET_SUPPLY}`);
