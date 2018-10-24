const IP = 'api-stage.chunesupply.com';
const API_VERSION = '/api/v1/';

export default {
  TITLE: 'Chune',

  IP,
  API_URL: `https://${IP}${API_VERSION}`,
  HEADERS: {
    'content-type': 'application/json',
  },
  API: {
    AUTH: {
      // SIGNIN: `${API_VERSION}/auth/signin`,
    },
    TRACKS: {
      GET_TOP: 'tracks/sources/1/',
      GET_SUPPLY: 'tracks/sources/2/',
    },
    IMAGES: {
      FULL: `https://${IP}/static/imgs/full/`,
      MEDIUM: `https://${IP}/static/imgs/thumbs/medium/`,
    },
  },
};
