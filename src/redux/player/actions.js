import { TRACKS_ACTIONS } from './constants';

export const getTracks = () => ({
  type: TRACKS_ACTIONS.GET_TRACKS,
});

export const getPlaybackData = () => ({
  type: TRACKS_ACTIONS.GET_PLAYBACK_DATA,
});

export const setPlaybackData = playbackData => ({
  type: TRACKS_ACTIONS.SET_PLAYBACK_DATA,
  payload: { playbackData },
});

export const togglePlaying = () => ({
  type: TRACKS_ACTIONS.TOGGLE_PLAYING,
});

export const setCurrentTrack = currentTrack => ({
  type: TRACKS_ACTIONS.SET_CURRENT_TRACK,
  payload: { currentTrack },
});

export const setTracks = ({ topTracks, chuneSupply }) => ({
  type: TRACKS_ACTIONS.SET_TRACKS,
  payload: { topTracks, chuneSupply },
});
