import { IPublicTypeI18nData } from '..';
import { ReactNode } from 'react';

export interface IPublicTypeTipConfig {

  /**
   * className
   */
  className?: string;

  /**
   * Tip content
   */
  children?: IPublicTypeI18nData | ReactNode;
  theme?: string;

  /**
   * Tip direction
   */
  direction?: 'top' | 'bottom' | 'left' | 'right';
}
