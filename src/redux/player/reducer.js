import R from 'ramda';
import { TRACKS_ACTIONS } from './constants';
import { createReducer } from '~global/reducerHelper';

const INITIAL_STATE = {
  currentTrack: null,
  playbackData: null,
  topTracks: [],
  chuneSupply: [],
};

const setTracksHandler = ({ topTracks, chuneSupply }) => R.pipe(
  R.assoc('topTracks', topTracks),
  R.assoc('chuneSupply', chuneSupply),
);

const setTrackHandler = ({ currentTrack }) => R.assoc('currentTrack', currentTrack);

const setPlaybackDataHandler = ({ playbackData }) => R.assoc('playbackData', playbackData);

const HANDLERS = {
  [TRACKS_ACTIONS.SET_TRACKS]: setTracksHandler,
  [TRACKS_ACTIONS.SET_CURRENT_TRACK]: setTrackHandler,
  [TRACKS_ACTIONS.SET_PLAYBACK_DATA]: setPlaybackDataHandler,
};

export default createReducer(INITIAL_STATE, HANDLERS);
