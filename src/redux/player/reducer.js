import R from 'ramda';
import { TRACKS_ACTIONS } from './constants';
import { createReducer } from '~global/reducerHelper';

const INITIAL_STATE = {
  topTracks: [],
  chuneSupply: [],
};

// const setTracksHandler = (state, action) => INITIAL_STATE;

const setTracksHandler = ({ topTracks, chuneSupply }) => R.pipe(
  R.assoc('topTracks', topTracks),
  R.assoc('chuneSupply', chuneSupply),
);

const HANDLERS = {
  [TRACKS_ACTIONS.SET_TRACKS]: setTracksHandler,
};

export default createReducer(INITIAL_STATE, HANDLERS);
