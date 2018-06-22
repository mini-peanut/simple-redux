export function applyMiddleware(...middlewares) {
  return (next) => (reducer, initialState) => {
    const store = next(reducer, initialState);
    const dispatch = store.dispatch;
    const chain = [];

    chain = middlewares.map(middleware => middleware({
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    }));
    dispatch = compose(...chain)(store.dispatch);

    return { ...store, dispatch };
  };
}