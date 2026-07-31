import { globalContext } from '@rchh/lowcode-editor-core';
import {
  IDesigner,
  isComponentMeta,
} from '@rchh/lowcode-designer';
import { IPublicTypeAssetsJson, getLogger } from '@rchh/lowcode-utils';
import {
  IPublicTypeComponentAction,
  IPublicTypeComponentMetadata,
  IPublicApiMaterial,
  IPublicTypeMetadataTransducer,
  IPublicModelComponentMeta,
  IPublicTypeNpmInfo,
  IPublicModelEditor,
  IPublicTypeDisposable,
  IPublicTypeContextMenuAction,
  IPublicTypeContextMenuItem,
} from '@rchh/lowcode-types';
import { Workspace as InnerWorkspace } from '@rchh/lowcode-workspace';
import { editorSymbol, designerSymbol } from '../symbols';
import { ComponentMeta as ShellComponentMeta } from '../model';
import { ComponentType } from 'react';

const logger = getLogger({ level: 'warn', bizName: 'shell-material' });

const innerEditorSymbol = Symbol('editor');
export class Material implements IPublicApiMaterial {
  private readonly [innerEditorSymbol]: IPublicModelEditor;

  get [editorSymbol](): IPublicModelEditor {
    if (this.workspaceMode) {
      return this[innerEditorSymbol];
    }
    const workspace: InnerWorkspace = globalContext.get('workspace');
    if (workspace.isActive) {
      if (!workspace.window.editor) {
        logger.error('Material api called at the wrong time, please check');
        return this[innerEditorSymbol];
      }
      return workspace.window.editor;
    }

    return this[innerEditorSymbol];
  }

  get [designerSymbol](): IDesigner {
    return this[editorSymbol].get('designer')!;
  }

  constructor(editor: IPublicModelEditor, readonly workspaceMode: boolean = false) {
    this[innerEditorSymbol] = editor;
  }

  /**
   * Get the components map
   */
  get componentsMap(): { [key: string]: IPublicTypeNpmInfo | ComponentType<any> | object } {
    return this[designerSymbol].componentsMap;
  }

  /**
   * Set the assets package structure
   * @param assets
   * @returns
   */
  async setAssets(assets: IPublicTypeAssetsJson) {
    return await this[editorSymbol].setAssets(assets);
  }

  /**
   * Get the assets package structure
   * @returns
   */
  getAssets(): IPublicTypeAssetsJson | undefined {
    return this[editorSymbol].get('assets');
  }

  /**
   * Load an incremental assets package; it will be merged with the existing one
   * @param incrementalAssets
   * @returns
   */
  loadIncrementalAssets(incrementalAssets: IPublicTypeAssetsJson) {
    return this[designerSymbol].loadIncrementalAssets(incrementalAssets);
  }

  /**
   * Register a material metadata pipeline function
   * @param transducer
   * @param level
   * @param id
   */
  registerMetadataTransducer = (
    transducer: IPublicTypeMetadataTransducer,
    level?: number,
    id?: string | undefined,
  ) => {
    this[designerSymbol].componentActions.registerMetadataTransducer(transducer, level, id);
  };

  /**
   * Get all material metadata pipeline functions
   * @returns
   */
  getRegisteredMetadataTransducers() {
    return this[designerSymbol].componentActions.getRegisteredMetadataTransducers();
  }

  /**
   * Get material metadata by name
   * @param componentName
   * @returns
   */
  getComponentMeta(componentName: string): IPublicModelComponentMeta | null {
    const innerMeta = this[designerSymbol].getComponentMeta(componentName);
    return ShellComponentMeta.create(innerMeta);
  }

  /**
   * create an instance of ComponentMeta by given metadata
   * @param metadata
   * @returns
   */
  createComponentMeta(metadata: IPublicTypeComponentMetadata) {
    return ShellComponentMeta.create(this[designerSymbol].createComponentMeta(metadata));
  }

  /**
   * test if the given object is a ComponentMeta instance or not
   * @param obj
   * @returns
   */
  isComponentMeta(obj: any) {
    return isComponentMeta(obj);
  }

  /**
   * Get all registered material metadata
   * @returns
   */
  getComponentMetasMap(): Map<string, IPublicModelComponentMeta> {
    const map = new Map<string, IPublicModelComponentMeta>();
    const originalMap = this[designerSymbol].getComponentMetasMap();
    for (let componentName of originalMap.keys()) {
      map.set(componentName, this.getComponentMeta(componentName)!);
    }
    return map;
  }

  /**
   * Add an extension action to the designer assist layer
   * @param action
   */
  addBuiltinComponentAction = (action: IPublicTypeComponentAction) => {
    this[designerSymbol].componentActions.addBuiltinComponentAction(action);
  };

  /**
   * Refresh componentMetasMap; may trigger simulator components rebuild
   */
  refreshComponentMetasMap = () => {
    this[designerSymbol].refreshComponentMetasMap();
  };

  /**
   * Remove a specified action from the designer assist layer
   * @param name
   */
  removeBuiltinComponentAction(name: string) {
    this[designerSymbol].componentActions.removeBuiltinComponentAction(name);
  }

  /**
   * Modify an existing action on the designer assist layer
   * @param actionName
   * @param handle
   */
  modifyBuiltinComponentAction(
      actionName: string,
      handle: (action: IPublicTypeComponentAction) => void,
    ) {
    this[designerSymbol].componentActions.modifyBuiltinComponentAction(actionName, handle);
  }

  /**
   * Listen for assets change events
   * @param fn
   */
  onChangeAssets(fn: () => void): IPublicTypeDisposable {
    const dispose = [
      // Set assets via setAssets
      this[editorSymbol].onChange('assets', fn),
      // Incrementally set assets via loadIncrementalAssets
      this[editorSymbol].eventBus.on('designer.incrementalAssetsReady', fn),
    ];

    return () => {
      dispose.forEach(d => d && d());
    };
  }

  addContextMenuOption(option: IPublicTypeContextMenuAction) {
    this[designerSymbol].contextMenuActions.addMenuAction(option);
  }

  removeContextMenuOption(name: string) {
    this[designerSymbol].contextMenuActions.removeMenuAction(name);
  }

  adjustContextMenuLayout(fn: (actions: IPublicTypeContextMenuItem[]) => IPublicTypeContextMenuItem[]) {
    this[designerSymbol].contextMenuActions.adjustMenuLayout(fn);
  }
}
