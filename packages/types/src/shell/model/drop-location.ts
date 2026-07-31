import { IPublicTypeLocationDetail } from '../type';
import { IPublicModelLocateEvent, IPublicModelNode } from './';

export interface IPublicModelDropLocation {

  /**
   * Drag location target
   * get target of dropLocation
   */
  get target(): IPublicModelNode | null;

  /**
   * Drop location details
   * get detail of dropLocation
   */
  get detail(): IPublicTypeLocationDetail;

  /**
   * Event corresponding to the drop location
   * get event of dropLocation
   */
  get event(): IPublicModelLocateEvent;

  /**
   * Get a clone of the current object
   * get a clone object of current dropLocation
   */
  clone(event: IPublicModelLocateEvent): IPublicModelDropLocation;
}
