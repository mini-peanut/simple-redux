
/**
 * 当然这里面有很多功能没有实现，比如
 * Immutability
 * Pure functions
 * Middleware
 * Normalization
 * Selectors
 * Thunks
 * Sagas
 */
export function createStore(reducer, initialState) {
  const currentReducer = reducer;
  const currentState = initialState;
  const listeners = [];
  const isDispatching = false;

  function getState() {
    return currentState;
  }

  function dispatch(action) {
    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    listeners.slice().forEach(listener => listener());
    return action;
  }

  function subscribe(listener) {
    listeners.push(listener);

    return function unsubscribe() {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  }

  function replaceReducer(nextReducer) {
    currentReducer = nextReducer;
    dispatch({ type: '@@redux/INIT' });
  }

  dispatch({ type: '@@redux/INIT' });

  return { dispatch, subscribe, getState, replaceReducer };
}