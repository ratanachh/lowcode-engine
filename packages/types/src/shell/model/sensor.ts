import { IPublicTypeNodeInstance } from '../type/node-instance';
import {
  IPublicModelLocateEvent,
  IPublicModelDropLocation,
  IPublicTypeComponentInstance,
  IPublicModelNode,
} from '..';

/**
 * Drag sensitive board
 */
export interface IPublicModelSensor<
  Node = IPublicModelNode
> {

  /**
   * Whether responsive; e.g. set false when a panel is hidden
   */
  readonly sensorAvailable: boolean;

  /**
   * Get the node instance
   */
  getNodeInstanceFromElement?: (e: Element | null) => IPublicTypeNodeInstance<IPublicTypeComponentInstance, Node> | null;

  /**
   * Patch an event
   */
  fixEvent(e: IPublicModelLocateEvent): IPublicModelLocateEvent;

  /**
   * Locate and activate
   */
  locate(e: IPublicModelLocateEvent): IPublicModelDropLocation | undefined | null;

  /**
   * Whether entered the sensor region
   */
  isEnter(e: IPublicModelLocateEvent): boolean;

  /**
   * Deactivate
   */
  deactiveSensor(): void;
}
