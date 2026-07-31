import { isLocationChildrenDetail } from '../../../src/check-types/is-location-children-detail';
import { IPublicTypeLocationChildrenDetail, IPublicTypeLocationDetailType } from '@rchh/lowcode-types';

describe('isLocationChildrenDetail', () => {
  it('should return true when obj is IPublicTypeLocationChildrenDetail', () => {
    const obj: IPublicTypeLocationChildrenDetail = {
      type: IPublicTypeLocationDetailType.Children,
      // add other required props
    };

    expect(isLocationChildrenDetail(obj)).toBe(true);
  });

  it('should return false when obj is not IPublicTypeLocationChildrenDetail', () => {
    const obj = {
      type: 'other',
      // add other required props
    };

    expect(isLocationChildrenDetail(obj)).toBe(false);
    expect(isLocationChildrenDetail(null)).toBe(false);
    expect(isLocationChildrenDetail(undefined)).toBe(false);
    expect(isLocationChildrenDetail('string')).toBe(false);
    expect(isLocationChildrenDetail(0)).toBe(false);
    expect(isLocationChildrenDetail(2)).toBe(false);
  });
});
