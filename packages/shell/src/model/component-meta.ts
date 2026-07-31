import {
  IComponentMeta as InnerComponentMeta,
  INode,
} from '@rchh/lowcode-designer';
import { IPublicTypeNodeData, IPublicTypeNodeSchema, IPublicModelComponentMeta, IPublicTypeI18nData, IPublicTypeIconType, IPublicTypeNpmInfo, IPublicTypeTransformedComponentMetadata, IPublicModelNode, IPublicTypeAdvanced, IPublicTypeFieldConfig } from '@rchh/lowcode-types';
import { componentMetaSymbol, nodeSymbol } from '../symbols';
import { ReactElement } from 'react';

export class ComponentMeta implements IPublicModelComponentMeta {
  private readonly [componentMetaSymbol]: InnerComponentMeta;

  isComponentMeta = true;

  constructor(componentMeta: InnerComponentMeta) {
    this[componentMetaSymbol] = componentMeta;
  }

  static create(componentMeta: InnerComponentMeta | null): IPublicModelComponentMeta | null {
    if (!componentMeta) {
      return null;
    }
    return new ComponentMeta(componentMeta);
  }

  /**
   * Component name
   */
  get componentName(): string {
    return this[componentMetaSymbol].componentName;
  }

  /**
   * Whether this is a container component
   */
  get isContainer(): boolean {
    return this[componentMetaSymbol].isContainer;
  }

  /**
   * Whether this is a minimum render unit.
   * When the component needs re-render:
   *  if it is a minimum render unit, only this component is re-rendered;
   *  otherwise walk up to the nearest minimum render unit (up to root) and re-render that.
   */
  get isMinimalRenderUnit(): boolean {
    return this[componentMetaSymbol].isMinimalRenderUnit;
  }

  /**
   * Whether this is a modal component
   */
  get isModal(): boolean {
    return this[componentMetaSymbol].isModal;
  }

  /**
   * Metadata config
   */
  get configure(): IPublicTypeFieldConfig[] {
    return this[componentMetaSymbol].configure;
  }

  /**
   * Title
   */
  get title(): string | IPublicTypeI18nData | ReactElement {
    return this[componentMetaSymbol].title;
  }

  /**
   * Icon
   */
  get icon(): IPublicTypeIconType {
    return this[componentMetaSymbol].icon;
  }

  /**
   * Component npm info
   */
  get npm(): IPublicTypeNpmInfo {
    return this[componentMetaSymbol].npm;
  }

  /**
   * @deprecated
   */
  get prototype() {
    return (this[componentMetaSymbol] as any).prototype;
  }

  get availableActions(): any {
    return this[componentMetaSymbol].availableActions;
  }

  get advanced(): IPublicTypeAdvanced {
    return this[componentMetaSymbol].advanced;
  }

  /**
   * Set npm info
   * @param npm
   */
  setNpm(npm: IPublicTypeNpmInfo): void {
    this[componentMetaSymbol].setNpm(npm);
  }

  /**
   * Get metadata
   * @returns
   */
  getMetadata(): IPublicTypeTransformedComponentMetadata {
    return this[componentMetaSymbol].getMetadata();
  }

  /**
   * check if the current node could be placed in parent node
   * @param my
   * @param parent
   * @returns
   */
  checkNestingUp(my: IPublicModelNode | IPublicTypeNodeData, parent: INode): boolean {
    const curNode = (my as any).isNode ? (my as any)[nodeSymbol] : my;
    return this[componentMetaSymbol].checkNestingUp(curNode as any, parent);
  }

  /**
   * check if the target node(s) could be placed in current node
   * @param my
   * @param parent
   * @returns
   */
  checkNestingDown(
      my: IPublicModelNode | IPublicTypeNodeData,
      target: IPublicTypeNodeSchema | IPublicModelNode | IPublicTypeNodeSchema[],
    ) {
    const curNode = (my as any)?.isNode ? (my as any)[nodeSymbol] : my;
    return this[componentMetaSymbol].checkNestingDown(
        curNode as any,
        (target as any)[nodeSymbol] || target,
      );
  }

  refreshMetadata(): void {
    this[componentMetaSymbol].refreshMetadata();
  }
}
