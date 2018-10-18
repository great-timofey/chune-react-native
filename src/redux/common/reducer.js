import R from 'ramda';
import { COMMON_ACTIONS } from './constants';
import { createReducer } from '../../global/reducerHelper';

const INITIAL_STATE = {
  isDrilled: false,
};

const drillHandler = () => state => R.pipe(R.assoc('isDrilled', !state.isDrilled))(state);

const HANDLERS = {
  [COMMON_ACTIONS.TOGGLE_DRILL]: drillHandler,
};

export default createReducer(INITIAL_STATE, HANDLERS);
