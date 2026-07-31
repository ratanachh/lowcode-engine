import {
  IDragon,
  ILocateEvent as InnerLocateEvent,
  INode,
} from '@rchh/lowcode-designer';
import { dragonSymbol, nodeSymbol } from '../symbols';
import LocateEvent from './locate-event';
import { DragObject } from './drag-object';
import { globalContext } from '@rchh/lowcode-editor-core';
import {
  IPublicModelDragon,
  IPublicModelLocateEvent,
  IPublicModelDragObject,
  IPublicTypeDragNodeDataObject,
  IPublicModelNode,
  IPublicTypeDragObject,
} from '@rchh/lowcode-types';

export const innerDragonSymbol = Symbol('innerDragonSymbol');

export class Dragon implements IPublicModelDragon {
  private readonly [innerDragonSymbol]: IDragon;

  constructor(innerDragon: IDragon, readonly workspaceMode: boolean) {
    this[innerDragonSymbol] = innerDragon;
  }

  get [dragonSymbol](): IDragon {
    if (this.workspaceMode) {
      return this[innerDragonSymbol];
    }
    const workspace = globalContext.get('workspace');
    let editor = globalContext.get('editor');

    if (workspace.isActive) {
      editor = workspace.window.editor;
    }

    const designer = editor.get('designer');
    return designer.dragon;
  }

  static create(
      dragon: IDragon | null,
      workspaceMode: boolean,
    ): IPublicModelDragon | null {
    if (!dragon) {
      return null;
    }
    return new Dragon(dragon, workspaceMode);
  }

  /**
   * is dragging or not
   */
  get dragging(): boolean {
    return this[dragonSymbol].dragging;
  }

  /**
   * Bind dragstart event
   * @param func
   * @returns
   */
  onDragstart(func: (e: IPublicModelLocateEvent) => any): () => void {
    return this[dragonSymbol].onDragstart((e: InnerLocateEvent) => func(LocateEvent.create(e)!));
  }

  /**
   * Bind drag event
   * @param func
   * @returns
   */
  onDrag(func: (e: IPublicModelLocateEvent) => any): () => void {
    return this[dragonSymbol].onDrag((e: InnerLocateEvent) => func(LocateEvent.create(e)!));
  }

  /**
   * Bind dragend event
   * @param func
   * @returns
   */
  onDragend(func: (o: { dragObject: IPublicModelDragObject; copy?: boolean }) => any): () => void {
    return this[dragonSymbol].onDragend(
      (o: { dragObject: IPublicModelDragObject; copy?: boolean }) => {
        const dragObject = DragObject.create(o.dragObject);
        const { copy } = o;
        return func({ dragObject: dragObject!, copy });
      },
    );
  }

  /**
   * Set drag listen region (shell) and custom boost transform
   * @param shell Drag listen region
   * @param boost Drag transform function
   */
  from(shell: Element, boost: (e: MouseEvent) => IPublicTypeDragNodeDataObject | null): any {
    return this[dragonSymbol].from(shell, boost);
  }

  /**
   * boost your dragObject for dragging(flying)
   *
   * @param dragObject Drag object
   * @param boostEvent Initial drag event
   */
  boost(dragObject: IPublicTypeDragObject, boostEvent: MouseEvent | DragEvent, fromRglNode?: IPublicModelNode & {
    [nodeSymbol]: INode;
  }): void {
    return this[dragonSymbol].boost({
      ...dragObject,
      nodes: dragObject.nodes.map((node: any) => node[nodeSymbol]),
    }, boostEvent, fromRglNode?.[nodeSymbol]);
  }

  /**
   * Add a drop sensor
   */
  addSensor(sensor: any): void {
    return this[dragonSymbol].addSensor(sensor);
  }

  /**
   * Remove a drop sensor
   */
  removeSensor(sensor: any): void {
    return this[dragonSymbol].removeSensor(sensor);
  }
}
