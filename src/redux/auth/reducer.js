import R from 'ramda';
import { AUTH_ACTIONS } from './constants';
import { createReducer } from '../../global/reducerHelper';

const INITIAL_STATE = {
  chuneToken: '',
  spotifyToken: '',
  isLoggedIn: false,
};

const chuneHandler = ({ chuneToken }) => R.pipe(R.assoc('chuneToken', chuneToken));

const spotifyHandler = ({ spotifyToken }) => R.pipe(R.assoc('spotifyToken', spotifyToken));

const enterHandler = () => R.pipe(R.assoc('isLoggedIn', true));

const logoutHandler = () => R.pipe(R.always(INITIAL_STATE));

const HANDLERS = {
  [AUTH_ACTIONS.LOGOUT]: logoutHandler,
  [AUTH_ACTIONS.SIGN_IN_SUCCESS]: enterHandler,
  [AUTH_ACTIONS.SIGN_UP_SUCCESS]: enterHandler,
  [AUTH_ACTIONS.SET_CHUNE_TOKEN]: chuneHandler,
  [AUTH_ACTIONS.SET_SPOTIFY_TOKEN]: spotifyHandler,
};

export default createReducer(INITIAL_STATE, HANDLERS);
