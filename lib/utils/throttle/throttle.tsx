/**
 * Throttles a function call so that it only occurs once every n milliseconds
 *
 * @param {any} func The function to throttle
 * @param {number} interval The number of milliseconds to wait before another call
 * @returns The funciton call
 */
export function throttle(func: any, interval: number) {
  let lastCall = 0;

  return function (this: any, ...args: any[]): any {
    const now = Date.now();

    if (lastCall + interval < now) {
      lastCall = now;

      return func.apply(this, args);
    }
  };
}
