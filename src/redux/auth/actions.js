import { AUTH_ACTIONS } from './constants';

export const setUser = user => ({
  type: AUTH_ACTIONS.SET_USER,
  payload: { user },
});

export const requestSignInUser = user => ({
  type: AUTH_ACTIONS.SIGN_IN_REQUEST,
  payload: { user },
});

export const requestSignUpUser = user => ({
  type: AUTH_ACTIONS.SIGN_UP_REQUEST,
  payload: { user },
});

export const successSignInUser = () => ({
  type: AUTH_ACTIONS.SIGN_IN_SUCCESS,
});

export const successSignUpUser = () => ({
  type: AUTH_ACTIONS.SIGN_UP_SUCCESS,
});

export const setChuneToken = chuneToken => ({
  type: AUTH_ACTIONS.SET_CHUNE_TOKEN,
  payload: { chuneToken },
});

export const setSpotifyToken = spotifyToken => ({
  type: AUTH_ACTIONS.SET_SPOTIFY_TOKEN,
  payload: { spotifyToken },
});

export const userLogout = () => ({ type: AUTH_ACTIONS.LOGOUT });
