/* eslint-disable max-len */
import { IPublicTypeDisposable, IPublicTypeDragNodeDataObject, IPublicTypeDragObject } from '../type';
import { IPublicModelDragObject, IPublicModelLocateEvent, IPublicModelNode } from './';

export interface IPublicModelDragon<
  Node = IPublicModelNode,
  LocateEvent = IPublicModelLocateEvent
> {

  /**
   * Whether a drag is in progress
   * is dragging or not
   */
  get dragging(): boolean;

  /**
   * Bind the dragstart event
   * bind a callback function which will be called on dragging start
   * @param func
   * @returns
   */
  onDragstart(func: (e: LocateEvent) => any): IPublicTypeDisposable;

  /**
   * Bind the drag event
   * bind a callback function which will be called on dragging
   * @param func
   * @returns
   */
  onDrag(func: (e: LocateEvent) => any): IPublicTypeDisposable;

  /**
   * Bind the dragend event
   * bind a callback function which will be called on dragging end
   * @param func
   * @returns
   */
  onDragend(func: (o: { dragObject: IPublicModelDragObject; copy?: boolean }) => any): IPublicTypeDisposable;

  /**
   * Set the drag-listen shell region and custom boost transform function
   * set a html element as shell to dragon as monitoring target, and
   * set boost function which is used to transform a MouseEvent to type
   * IPublicTypeDragNodeDataObject.
   * @param shell region to listen for drag
   * @param boost drag transform function
   */
  from(shell: Element, boost: (e: MouseEvent) => IPublicTypeDragNodeDataObject | null): any;

  /**
   * Launch a drag object
   * boost your dragObject for dragging(flying)
   *
   * @param dragObject drag object
   * @param boostEvent initial drag event
   */
  boost(dragObject: IPublicTypeDragObject, boostEvent: MouseEvent | DragEvent, fromRglNode?: Node): void;

  /**
   * Add a drop sensor zone
   * add sensor area
   */
  addSensor(sensor: any): void;

  /**
   * Remove a drop sensor
   * remove sensor area
   */
  removeSensor(sensor: any): void;
}
