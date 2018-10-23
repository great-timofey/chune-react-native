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
    loading: true,
    overallContent: {
      followed: [],
      recommended: [],
    },
    currentArtist: null,
    artistContent: {
      media: [],
      events: [],
    },
  },
  search: {
    loading: false,
    results: [],
  },
};

const dataHomeHandler = ({ featured = [], contentFeed = [] }) => R.pipe(
  R.assocPath(['home', 'featured'], featured),
  R.assocPath(['home', 'contentFeed'], contentFeed),
);

const dataForYouHandler = ({ contentFeed = [] }) => R.pipe(R.assocPath(['forYou', 'contentFeed'], contentFeed));

const dataArtistsEventsSingleHandler = ({ artist, media = [], events = [] }) => R.pipe(
  R.assocPath(['artistsEvents', 'currentArtist'], artist),
  R.assocPath(['artistsEvents', 'artistContent', 'media'], media),
  R.assocPath(['artistsEvents', 'artistContent', 'events'], events),
);

const dataArtistsEventsOverallHandler = ({ followed = [], recommended = [] }) => R.pipe(
  R.assocPath(['artistsEvents', 'overallContent', 'followed'], followed),
  R.assocPath(['artistsEvents', 'overallContent', 'recommended'], recommended),
);

const dataArtistsEventsLoadingHandler = ({ loading }) => R.pipe(R.assocPath(['artistsEvents', 'loading'], loading));

const searchResultsHandler = ({ results = [] }) => R.pipe(R.assocPath(['search', 'results'], results));

const searchLoadingHandler = ({ value }) => R.assocPath(['search', 'loading'], value);

const logoutHandler = () => R.pipe(R.always(INITIAL_STATE));

const HANDLERS = {
  [DATA_ACTIONS.GET_DATA_HOME_SUCCESS]: dataHomeHandler,
  [DATA_ACTIONS.GET_DATA_FOR_YOU_SUCCESS]: dataForYouHandler,
  [DATA_ACTIONS.GET_DATA_ARTISTS_EVENTS_OVERALL_SUCCESS]: dataArtistsEventsOverallHandler,
  [DATA_ACTIONS.GET_DATA_ARTISTS_EVENTS_SINGLE_SUCCESS]: dataArtistsEventsSingleHandler,
  [DATA_ACTIONS.ARTISTS_EVENTS_CONTROL_LOADING]: dataArtistsEventsLoadingHandler,
  [DATA_ACTIONS.SEARCH_ARTIST_SUCCESS]: searchResultsHandler,
  [DATA_ACTIONS.SEARCH_ARTIST_SET_LOADING]: searchLoadingHandler,
  [AUTH_ACTIONS.LOGOUT]: logoutHandler,
};

export default createReducer(INITIAL_STATE, HANDLERS);
