import { ReactNode } from 'react';
import { IPublicTypeI18nData, IPublicTypeIconType, IPublicTypeTitleContent, TipContent } from './';

export interface IPublicTypeTitleProps {

  /**
   * Title content
   */
  title: IPublicTypeTitleContent;

  /**
   * className
   */
  className?: string;

  /**
   * Click event
   */
  onClick?: () => void;
  match?: boolean;
  keywords?: string;
}

/**
 * Describe the setter title for props
 */
export interface IPublicTypeTitleConfig {

  /**
   * Text description
   */
  label?: IPublicTypeI18nData | ReactNode;

  /**
   * Content shown on hover
   */
  tip?: TipContent;

  /**
   * Documentation link; not implemented yet
   */
  docUrl?: string;

  /**
   * Icon
   */
  icon?: IPublicTypeIconType;

  /**
   * CSS class
   */
  className?: string;
}
