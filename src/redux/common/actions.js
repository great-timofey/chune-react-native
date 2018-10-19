import { COMMON_ACTIONS } from './constants';

export const toggleDrill = () => ({
  type: COMMON_ACTIONS.TOGGLE_DRILL,
});

export const toggleSearch = () => ({
  type: COMMON_ACTIONS.TOGGLE_SEARCH,
});

export const tabNavigate = index => ({
  type: COMMON_ACTIONS.TAB_NAVIGATE,
  payload: { index },
});
