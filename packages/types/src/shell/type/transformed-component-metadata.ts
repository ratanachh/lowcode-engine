import { IPublicTypeComponentMetadata, IPublicTypeFieldConfig, IPublicTypeConfigure } from './';

/**
 * @todo documentation pending
 */
export interface IPublicTypeTransformedComponentMetadata extends IPublicTypeComponentMetadata {
  configure: IPublicTypeConfigure & { combined?: IPublicTypeFieldConfig[] };
}
