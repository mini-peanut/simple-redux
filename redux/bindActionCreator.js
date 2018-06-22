function bindActionCreator(actionCreator, dispatch) {
  return (...args) => dispatch(actionCreator(...args));
}

function mapValues(obj, fn) {
  return Object.keys(obj).reduce((result, key) => {
    result[key] = fn(obj[key], key);
    return result;
  }, {});
}


export function bindActionCreators(actionCreators, dispatch) {
  return _.isFunction(actionCreators) 
    ? bindActionCreator(actionCreators, dispatch) 
    : mapValues(actionCreators, actionCreator => bindActionCreator(actionCreator, dispatch));
}

