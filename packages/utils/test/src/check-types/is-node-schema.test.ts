import { isNodeSchema } from '../../../src/check-types/is-node-schema';

describe('isNodeSchema', () => {
  // normal cases
  it('should return true for valid IPublicTypeNodeSchema', () => {
    const validData = {
      componentName: 'Component',
      isNode: false,
    };
    expect(isNodeSchema(validData)).toBe(true);
  });

  // null or undefined
  it('should return false for null or undefined', () => {
    expect(isNodeSchema(null)).toBe(false);
    expect(isNodeSchema(undefined)).toBe(false);
  });

  // missing componentName
  it('should return false if componentName is missing', () => {
    const invalidData = {
      isNode: false,
    };
    expect(isNodeSchema(invalidData)).toBe(false);
  });

  // isNode is true
  it('should return false if isNode is true', () => {
    const invalidData = {
      componentName: 'Component',
      isNode: true,
    };
    expect(isNodeSchema(invalidData)).toBe(false);
  });

  // other data types
  it('should return false for other data types', () => {
    expect(isNodeSchema('string')).toBe(false);
    expect(isNodeSchema(123)).toBe(false);
    expect(isNodeSchema([])).toBe(false);
    expect(isNodeSchema({})).toBe(false);
  });
});
