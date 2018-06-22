
function mapValues(obj, fn) {

  const nextState = {}

  for (let [key, reducer] of Object.entries(obj)) {
      nextState[key] = fn(reducer, key);
  }

  return nextState;
}


export function combineReducers(reducers) {
  const finalReducers = _.pick(reducers, val => _.isFunction(val))

  return (state = {}, action) => 
  		mapValues(finalReducers, (reducer, key) => reducer(state[key], action));
}
