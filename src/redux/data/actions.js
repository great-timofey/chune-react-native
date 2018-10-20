import { DATA_ACTIONS } from './constants';

export const getDataHome = () => ({
  type: DATA_ACTIONS.GET_DATA_HOME_REQUEST,
});

export const setDataHome = (featured, contentFeed) => ({
  type: DATA_ACTIONS.GET_DATA_HOME_SUCCESS,
  payload: { featured, contentFeed },
});
