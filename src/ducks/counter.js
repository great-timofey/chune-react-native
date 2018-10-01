/**
 * Constants
 * */

export const moduleName = 'counter';

export const INCREMENT = `${moduleName}/INCREMENT`;
export const DECREMENT = `${moduleName}/DECREMENT`;

/**
 * Reducer
 * */

const initialState = {
  count: 0,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return { ...state };
  }
}

/**
 * Action Creators
 * */

export const increment = () => ({
  type: INCREMENT,
});
export const decrement = () => ({
  type: DECREMENT,
});
