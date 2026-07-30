import { isValidElement } from 'react';
import { isReactComponent } from '../is-react';
import { IPublicTypeCustomView } from '@rchh/lowcode-types';

export function isCustomView(obj: any): obj is IPublicTypeCustomView {
  if (!obj) {
    return false;
  }
  return isValidElement(obj) || isReactComponent(obj);
}
