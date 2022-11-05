/**
 * Contextual switch that checks if a value is matched against a predicate
 * using currying and returns a desired action
 *
 * @param {any} x The value to match
 * @returns {any} The desired operation to execute
 */
export const match = (x: any): any => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  on: (pred: any, fn: Function) => (pred(x) ? matched(fn(x)) : match(x)),
  otherwise: (fn: Function) => fn(x),
});

const matched = (fn: Function) => ({
  on: () => matched(fn),
  otherwise: () => fn,
});
