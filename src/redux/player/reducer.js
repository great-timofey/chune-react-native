import R from 'ramda';
import { TRACKS_ACTIONS } from './constants';
import { createReducer } from '~global/reducerHelper';

const INITIAL_STATE = {
  currentTrack: {},
  playbackData: {},
  currentTracksType: 0,
  tracksTypes: ['topTracks', 'chuneSupply'],
  first: [],
  second: [],
  // topTracks: [],
  // chuneSupply: [],
};

const setTracksHandler = ({ firstSectionTracks, secondSectionTracks }) => R.pipe(
  R.assoc('first', firstSectionTracks),
  R.assoc('second', secondSectionTracks),
);

const setTrackHandler = ({ currentTrack }) => R.assoc('currentTrack', currentTrack);

const setPlaybackDataHandler = ({ playbackData }) => R.assoc('playbackData', playbackData);

const setCurrentTracksTypeHandler = ({ index }) => R.assoc('currentTracksType', index);

const setTracksTypesHandler = ({ types }) => R.assoc('tracksTypes', types);

const HANDLERS = {
  [TRACKS_ACTIONS.SET_TRACKS]: setTracksHandler,
  [TRACKS_ACTIONS.SET_CURRENT_TRACK]: setTrackHandler,
  [TRACKS_ACTIONS.SET_PLAYBACK_DATA]: setPlaybackDataHandler,
  [TRACKS_ACTIONS.SET_CURRENT_TRACKS_TYPE]: setCurrentTracksTypeHandler,
  [TRACKS_ACTIONS.SET_TRACKS_TYPES]: setTracksTypesHandler,
};

export default createReducer(INITIAL_STATE, HANDLERS);
