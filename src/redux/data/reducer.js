import R from 'ramda';
import { DATA_ACTIONS } from './constants';
import { AUTH_ACTIONS } from '../auth/constants';
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

const dataHomeHandler = ({ featured = [], contentFeed = [] }) => R.pipe(
  R.assocPath(['home', 'featured'], featured),
  R.assocPath(['home', 'contentFeed'], contentFeed),
);

const logoutHandler = () => R.pipe(R.always(INITIAL_STATE));

const HANDLERS = {
  [DATA_ACTIONS.GET_DATA_HOME_SUCCESS]: dataHomeHandler,
  [AUTH_ACTIONS.LOGOUT]: logoutHandler,
};

export default createReducer(INITIAL_STATE, HANDLERS);
