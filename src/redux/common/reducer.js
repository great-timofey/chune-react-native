import R from 'ramda';
import { COMMON_ACTIONS } from './constants';
import { createReducer } from '../../global/reducerHelper';

const INITIAL_STATE = {
  activeTabIndex: 0,
  isSearchOpen: false,
};

const tabHandler = ({ index }) => R.pipe(R.assoc('activeTabIndex', index));

const searchHandler = () => state => R.pipe(R.assoc('isSearchOpen', !state.isSearchOpen))(state);

const HANDLERS = {
  [COMMON_ACTIONS.TAB_NAVIGATE]: tabHandler,
  [COMMON_ACTIONS.TOGGLE_SEARCH]: searchHandler,
};

export default createReducer(INITIAL_STATE, HANDLERS);
