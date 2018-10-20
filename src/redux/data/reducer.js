import R from 'ramda';
import { DATA_ACTIONS } from './constants';
import { createReducer } from '../../global/reducerHelper';

const INITIAL_STATE = {
  home: {
    featured: [],
    contentFeed: [],
  },
  forYou: {
    contentFeed: [],
  },
  artistsEvents: {
    content: {
      followed: [],
      recommended: [],
    },
    artistContent: {
      media: [],
      events: [],
    },
  },
};

const handler = () => R.assoc('tracksTypes', []);

const HANDLERS = {
  [DATA_ACTIONS.SET_TRACKS]: handler,
};

export default createReducer(INITIAL_STATE, HANDLERS);
