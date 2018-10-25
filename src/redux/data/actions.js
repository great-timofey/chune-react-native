import { DATA_ACTIONS } from './constants';

export const getDataHome = () => ({
  type: DATA_ACTIONS.GET_DATA_HOME_REQUEST,
});

export const setDataHome = (featured, contentFeed) => ({
  type: DATA_ACTIONS.GET_DATA_HOME_SUCCESS,
  payload: { featured, contentFeed },
});

export const getDataForYou = () => ({
  type: DATA_ACTIONS.GET_DATA_FOR_YOU_REQUEST,
});

export const setDataForYou = contentFeed => ({
  type: DATA_ACTIONS.GET_DATA_FOR_YOU_SUCCESS,
  payload: { contentFeed },
});

export const getDataArtistsEventsSingle = artistName => ({
  type: DATA_ACTIONS.GET_DATA_ARTISTS_EVENTS_SINGLE_REQUEST,
  payload: { artistName },
});

export const setDataArtistsEventsSingle = (artist, media, events) => ({
  type: DATA_ACTIONS.GET_DATA_ARTISTS_EVENTS_SINGLE_SUCCESS,
  payload: { artist, media, events },
});

export const getDataArtistsEventsOverall = () => ({
  type: DATA_ACTIONS.GET_DATA_ARTISTS_EVENTS_OVERALL_REQUEST,
});

export const setDataArtistsEventsOverall = (followed, recommended) => ({
  type: DATA_ACTIONS.GET_DATA_ARTISTS_EVENTS_OVERALL_SUCCESS,
  payload: { followed, recommended },
});

export const artistsEventsControlLoading = loading => ({
  type: DATA_ACTIONS.ARTISTS_EVENTS_CONTROL_LOADING,
  payload: { loading },
});

export const forYouControlLoading = loading => ({
  type: DATA_ACTIONS.FOR_YOU_CONTROL_LOADING,
  payload: { loading },
});

export const requestArtistFollow = artist => ({
  type: DATA_ACTIONS.FOLLOW_ARTIST_REQUEST,
  payload: { artist },
});

export const requestArtistUnfollow = artist => ({
  type: DATA_ACTIONS.UNFOLLOW_ARTIST_REQUEST,
  payload: { artist },
});

export const setSearchArtistLoading = value => ({
  type: DATA_ACTIONS.SEARCH_ARTIST_SET_LOADING,
  payload: { value },
});

export const requestSearchArtist = artistName => ({
  type: DATA_ACTIONS.SEARCH_ARTIST_REQUEST,
  payload: { artistName },
});

export const setSearchArtistResult = results => ({
  type: DATA_ACTIONS.SEARCH_ARTIST_SUCCESS,
  payload: { results },
});
