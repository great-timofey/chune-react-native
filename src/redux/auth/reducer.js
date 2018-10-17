import R from 'ramda';
import { AUTH_ACTIONS } from './constants';
import { createReducer } from '../../global/reducerHelper';

const INITIAL_STATE = {
  token: '',
  isLoggedIn: false,
};

const setTokenHandler = ({ token }) => R.pipe(
  R.assoc('token', token),
  R.assoc('isLoggedIn', true),
);

const logoutHandler = () => R.pipe(R.always(INITIAL_STATE));

const HANDLERS = {
  [AUTH_ACTIONS.LOGOUT]: logoutHandler,
  [AUTH_ACTIONS.SET_TOKEN]: setTokenHandler,
};

export default createReducer(INITIAL_STATE, HANDLERS);
