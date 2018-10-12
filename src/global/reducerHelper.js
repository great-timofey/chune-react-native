export const createReducer = (initialState, handlers: Array) => (
  state = initialState, action,
) => {
  if (!action || !action.type) {
    return state;
  }

  const handler = handlers[action.type];
  if (typeof handler === 'function') {
    return handler(action.payload)(state);
  }

  return state;
};
