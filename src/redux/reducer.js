import { combineReducers } from 'redux';
import counterReducer, { moduleName as counterModule } from '../ducks/counter';

export default combineReducers({
  [counterModule]: counterReducer,
});
