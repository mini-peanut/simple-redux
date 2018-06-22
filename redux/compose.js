export function compose(...funcs) {
  return arg => funcs.reduceRight((composed, f) => f(composed), arg);
}