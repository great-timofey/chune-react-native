import R from 'ramda';
import { TRACKS_ACTIONS } from './constants';
import { createReducer } from '~global/reducerHelper';

const INITIAL_STATE = {
  currentTrack: null,
  topTracks: [],
  chuneSupply: [],
};

// const setTracksHandler = (state, action) => INITIAL_STATE;

const setTracksHandler = ({ topTracks, chuneSupply }) => R.pipe(
  R.assoc('topTracks', topTracks),
  R.assoc('chuneSupply', chuneSupply),
);

const setTrackHandler = ({ currentTrack }) => R.assoc('currentTrack', currentTrack);

const HANDLERS = {
  [TRACKS_ACTIONS.SET_TRACKS]: setTracksHandler,
  [TRACKS_ACTIONS.SET_CURRENT_TRACK]: setTrackHandler,
};

export default createReducer(INITIAL_STATE, HANDLERS);
