import { TRACKS_ACTIONS } from './constants';

export const getTracks = () => ({
  type: TRACKS_ACTIONS.GET_TRACKS,
});

export const setTracks = tracks => ({
  type: TRACKS_ACTIONS.SET_TRACKS,
  payload: { tracks },
});
