import '@testing-library/jest-dom';
import matchMediaPolyfill from 'mq-polyfill';
import { TextDecoder, TextEncoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

jest.mock('next/image', () => ({
  __esModule: true,
  default: () => {
    return 'Next image stub';
  },
}));

// Allow Jest to use Media queries. First polyfill it so it doesn't error, and
// then generate a function that allows us to specify the size of the screen.
matchMediaPolyfill(window);
window.resizeTo = function resizeTo(width, height) {
  Object.assign(this, {
    innerWidth: width,
    innerHeight: height,
    outerWidth: width,
    outerHeight: height,
  }).dispatchEvent(new this.Event('resize'));
};
