import { setNativeSelection, nativeSelectionEnabled } from '../../src/navtive-selection';

describe('setNativeSelection', () => {
  beforeEach(() => {
    // reset nativeSelectionEnabled before each test
    setNativeSelection(true);
  });

  test('should enable native selection', () => {
    setNativeSelection(true);
    expect(nativeSelectionEnabled).toBe(true);
  });

  test('should disable native selection', () => {
    setNativeSelection(false);
    expect(nativeSelectionEnabled).toBe(false);
  });
});
