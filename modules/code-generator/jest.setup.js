// Polyfills specific to standalone mode
if (process.env.TEST_TARGET === 'standalone') {
  // Simulate the browser environment
  global.window = global;
  global.self = global;

  // Replace all './src' references in test cases with './dist/standalone'
  jest.mock('./src', () => require('./dist/standalone'));
}

// Don't limit the timeout when running in debug mode
jest.setTimeout(typeof v8debug === 'object' ? Infinity : 30 * 1000);
