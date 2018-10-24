import R from 'ramda';
import { COMMON_ACTIONS } from './constants';
import { AUTH_ACTIONS } from '../auth/constants';
import { createReducer } from '../../global/reducerHelper';

const INITIAL_STATE = {
  loading: false,
  activeTabIndex: 0,
  isSearchOpen: false,
};

const loadingHandler = () => state => R.pipe(R.assoc('loading', !state.loading))(state);

const tabHandler = ({ index }) => R.pipe(R.assoc('activeTabIndex', index));

const searchHandler = () => state => R.pipe(R.assoc('isSearchOpen', !state.isSearchOpen))(state);

const logoutHandler = () => R.always(INITIAL_STATE);

const HANDLERS = {
  [COMMON_ACTIONS.TAB_NAVIGATE]: tabHandler,
  [COMMON_ACTIONS.TOGGLE_SEARCH]: searchHandler,
  [COMMON_ACTIONS.TOGGLE_LOADING]: loadingHandler,
  [AUTH_ACTIONS.LOGOUT]: logoutHandler,
};

export default createReducer(INITIAL_STATE, HANDLERS);
