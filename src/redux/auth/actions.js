import { AUTH_ACTIONS } from './constants';

export const setUser = user => ({
  type: AUTH_ACTIONS.SET_USER, payload: { user },
});

export const setToken = token => ({
  type: AUTH_ACTIONS.SET_TOKEN, payload: { token },
});

export const userLogout = () => ({ type: AUTH_ACTIONS.LOGOUT });
