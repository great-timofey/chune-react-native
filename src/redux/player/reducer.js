import R from 'ramda';
import { TRACKS_ACTIONS } from './constants';
import { createReducer } from '~global/reducerHelper';

const INITIAL_STATE = {
  tracks: [],
};

const setTracksHandler = (_, { tracks }) => R.pipe(R.assoc('tracks', tracks));

const HANDLERS = {
  [TRACKS_ACTIONS.SET_TRACKS]: setTracksHandler,
};

export default createReducer(INITIAL_STATE, HANDLERS);
