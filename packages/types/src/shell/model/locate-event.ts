import { IPublicModelDocumentModel, IPublicModelDragObject } from './';

export interface IPublicModelLocateEvent {

  /**
   * Browser window coordinate system
   */
  readonly globalX: number;
  readonly globalY: number;

  /**
   * Original event
   */
  readonly originalEvent: MouseEvent | DragEvent;

  /**
   * Browser event target
   */
  target?: Element | null;

  canvasX?: number;

  canvasY?: number;

  /**
   * Event correction flag; when first constructed on the initiator side, canvasX/canvasY are missing and need correction
   */
  fixed?: true;

  /**
   * Active or target document
   */
  documentModel?: IPublicModelDocumentModel | null;

  get type(): string;

  get dragObject(): IPublicModelDragObject | null;
}
