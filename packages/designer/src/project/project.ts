import { obx, computed, makeObservable, action, IEventBus, createModuleEventBus } from '@rchh/lowcode-editor-core';
import { IDesigner } from '../designer';
import { DocumentModel, isDocumentModel } from '../document';
import type { IDocumentModel } from '../document';
import { IPublicEnumTransformStage } from '@rchh/lowcode-types';
import type {
  IBaseApiProject,
  IPublicTypeProjectSchema,
  IPublicTypeRootSchema,
  IPublicTypeComponentsMap,
  IPublicTypeSimulatorRenderer,
} from '@rchh/lowcode-types';
import { isLowCodeComponentType, isProCodeComponentType } from '@rchh/lowcode-utils';
import { ISimulatorHost } from '../simulator';

export interface IProject extends Omit<IBaseApiProject<
  IDocumentModel
>,
  'simulatorHost' |
  'importSchema' |
  'exportSchema' |
  'openDocument' |
  'getDocumentById' |
  'getCurrentDocument' |
  'addPropsTransducer' |
  'onRemoveDocument' |
  'onChangeDocument' |
  'onSimulatorHostReady' |
  'onSimulatorRendererReady' |
  'setI18n' |
  'setConfig' |
  'currentDocument' |
  'selection' |
  'documents' |
  'createDocument' |
  'getDocumentByFileName'
> {

  get designer(): IDesigner;

  get simulator(): ISimulatorHost | null;

  get currentDocument(): IDocumentModel | null | undefined;

  get documents(): IDocumentModel[];

  get i18n(): {
    [local: string]: {
      [key: string]: any;
    };
  };

  mountSimulator(simulator: ISimulatorHost): void;

  open(doc?: string | IDocumentModel | IPublicTypeRootSchema): IDocumentModel | null;

  getDocumentByFileName(fileName: string): IDocumentModel | null;

  createDocument(data?: IPublicTypeRootSchema): IDocumentModel;

  load(schema?: IPublicTypeProjectSchema, autoOpen?: boolean | string): void;

  getSchema(
    stage?: IPublicEnumTransformStage,
  ): IPublicTypeProjectSchema;

  getDocument(id: string): IDocumentModel | null;

  onCurrentDocumentChange(fn: (doc: IDocumentModel) => void): () => void;

  onSimulatorReady(fn: (args: any) => void): () => void;

  onRendererReady(fn: () => void): () => void;

  /**
   * Set stored data by field without recording history
   */
  set<T extends keyof IPublicTypeProjectSchema>(key: T, value: IPublicTypeProjectSchema[T]): void;
  set(key: string, value: unknown): void;

  /**
   * Get stored data by field
   */
  get<T extends keyof IPublicTypeProjectSchema>(key: T): IPublicTypeProjectSchema[T];
  get<T>(key: string): T;
  get(key: string): unknown;

  checkExclusive(activeDoc: DocumentModel): void;

  setRendererReady(renderer: IPublicTypeSimulatorRenderer<any, any>): void;
}

export class Project implements IProject {
  private emitter: IEventBus = createModuleEventBus('Project');

  @obx.shallow readonly documents: IDocumentModel[] = [];

  private data: IPublicTypeProjectSchema = {
    version: '1.0.0',
    componentsMap: [],
    componentsTree: [],
    i18n: {},
  };

  private _simulator?: ISimulatorHost;

  private isRendererReady: boolean = false;

  /**
   * Simulator
   */
  get simulator(): ISimulatorHost | null {
    return this._simulator || null;
  }

  @computed get currentDocument(): IDocumentModel | null | undefined {
    return this.documents.find((doc) => doc.active);
  }

  @obx private _config: any = {};
  @computed get config(): any {
    // TODO: parse layout Component
    return this._config;
  }
  set config(value: any) {
    this._config = value;
  }

  @obx.ref private _i18n: any = {};
  @computed get i18n(): any {
    return this._i18n;
  }
  set i18n(value: any) {
    this._i18n = value || {};
  }

  private documentsMap = new Map<string, DocumentModel>();

  constructor(readonly designer: IDesigner, schema?: IPublicTypeProjectSchema, readonly viewName = 'global') {
    makeObservable(this);
    this.load(schema);
  }

  private getComponentsMap(): IPublicTypeComponentsMap {
    return this.documents.reduce<IPublicTypeComponentsMap>((
      componentsMap: IPublicTypeComponentsMap,
      curDoc: IDocumentModel,
    ): IPublicTypeComponentsMap => {
      const curComponentsMap = curDoc.getComponentsMap();
      if (Array.isArray(curComponentsMap)) {
        curComponentsMap.forEach((item) => {
          const found = componentsMap.find((eItem) => {
            if (
              isProCodeComponentType(eItem) &&
              isProCodeComponentType(item) &&
              eItem.package === item.package &&
              eItem.componentName === item.componentName
            ) {
              return true;
            } else if (
              isLowCodeComponentType(eItem) &&
              eItem.componentName === item.componentName
            ) {
              return true;
            }
            return false;
          });
          if (found) return;
          componentsMap.push(item);
        });
      }
      return componentsMap;
    }, [] as IPublicTypeComponentsMap);
  }

  /**
   * Get overall project schema
   */
  getSchema(
    stage: IPublicEnumTransformStage = IPublicEnumTransformStage.Save,
  ): IPublicTypeProjectSchema {
    return {
      ...this.data,
      componentsMap: this.getComponentsMap(),
      componentsTree: this.documents
        .filter((doc) => !doc.isBlank())
        .map((doc) => doc.export(stage) || {} as IPublicTypeRootSchema),
      i18n: this.i18n,
    };
  }

  /**
   * Replace current document schema and trigger renderer render
   * @param schema
   */
  setSchema(schema?: IPublicTypeProjectSchema) {
    // FIXME: behavior here is not equivalent to getSchema; feels wrong
    const doc = this.documents.find((doc) => doc.active);
    doc && schema?.componentsTree[0] && doc.import(schema?.componentsTree[0]);
    this.simulator?.rerender();
  }

  /**
   * Set overall project schema
   *
   * @param autoOpen true to auto-open documents; string to open a specific file
   */
  @action
  load(schema?: IPublicTypeProjectSchema, autoOpen?: boolean | string) {
    this.unload();
    // load new document
    this.data = {
      version: '1.0.0',
      componentsMap: [],
      componentsTree: [],
      i18n: {},
      ...schema,
    };
    this.config = schema?.config || this.config;
    this.i18n = schema?.i18n || this.i18n;

    if (autoOpen) {
      if (autoOpen === true) {
        // auto open first document or open a blank page
        // this.open(this.data.componentsTree[0]);
        const documentInstances = this.data.componentsTree.map((data) => this.createDocument(data));
        // TODO: temporarily read config tabBar; later see if full layout can be an engine standard
        if (this.config?.layout?.props?.tabBar?.items?.length > 0) {
          // slice(1) is ugly; assumes fileName looks like '/fileName'
          documentInstances
            .find((i) => i.fileName === this.config.layout.props.tabBar.items[0].path?.slice(1))
            ?.open();
        } else {
          documentInstances[0].open();
        }
      } else {
        // auto open should be string of fileName
        this.open(autoOpen);
      }
    }
  }

  /**
   * Unload current project data
   */
  unload() {
    if (this.documents.length < 1) {
      return;
    }
    for (let i = this.documents.length - 1; i >= 0; i--) {
      this.documents[i].remove();
    }
  }

  removeDocument(doc: IDocumentModel) {
    const index = this.documents.indexOf(doc);
    if (index < 0) {
      return;
    }
    this.documents.splice(index, 1);
    this.documentsMap.delete(doc.id);
  }

  /**
   * Set stored data by field without recording history
   */
  set<T extends keyof IPublicTypeProjectSchema>(key: T, value: IPublicTypeProjectSchema[T]): void;
  set(key: string, value: unknown): void;
  set(key: string, value: unknown): void {
    if (key === 'config') {
      this.config = value;
    }
    if (key === 'i18n') {
      this.i18n = value;
    }
    Object.assign(this.data, { [key]: value });
  }

  /**
   * Set stored data by field
   */
  get<T extends keyof IPublicTypeRootSchema>(key: T): IPublicTypeRootSchema[T];
  get<T>(key: string): T;
  get(key: string): unknown;
  get(key: string): any {
    if (key === 'config') {
      return this.config;
    }
    if (key === 'i18n') {
      return this.i18n;
    }
    return Reflect.get(this.data, key);
  }

  getDocument(id: string): IDocumentModel | null {
    // Cannot use this.documentsMap.get(id); in Legao rollback, document.id may change
    return this.documents.find((doc) => doc.id === id) || null;
  }

  getDocumentByFileName(fileName: string): IDocumentModel | null {
    return this.documents.find((doc) => doc.fileName === fileName) || null;
  }

  @action
  createDocument(data?: IPublicTypeRootSchema): IDocumentModel {
    const doc = new DocumentModel(this, data || this?.data?.componentsTree?.[0]);
    this.documents.push(doc);
    this.documentsMap.set(doc.id, doc);
    return doc;
  }

  open(doc?: string | IDocumentModel | IPublicTypeRootSchema): IDocumentModel | null {
    if (!doc) {
      const got = this.documents.find((item) => item.isBlank());
      if (got) {
        return got.open();
      }
      doc = this.createDocument();
      return doc.open();
    }
    if (typeof doc === 'string' || typeof doc === 'number') {
      const got = this.documents.find((item) => item.fileName === String(doc) || String(item.id) === String(doc));
      if (got) {
        return got.open();
      }

      const data = this.data.componentsTree.find((data) => data.fileName === String(doc));
      if (data) {
        doc = this.createDocument(data);
        return doc.open();
      }

      return null;
    } else if (isDocumentModel(doc)) {
      return doc.open();
    }
    //  else if (isPageSchema(doc)) {
    // Temporarily commented out; it broke diff
    // const foundDoc = this.documents.find(curDoc => curDoc?.rootNode?.id && curDoc?.rootNode?.id === doc?.id);
    // if (foundDoc) {
    //   foundDoc.remove();
    // }
    // }

    doc = this.createDocument(doc);
    return doc.open();
  }

  checkExclusive(activeDoc: DocumentModel) {
    this.documents.forEach((doc) => {
      if (doc !== activeDoc) {
        doc.suspense();
      }
    });
    this.emitter.emit('current-document.change', activeDoc);
  }

  closeOthers(opened: DocumentModel) {
    this.documents.forEach((doc) => {
      if (doc !== opened) {
        doc.close();
      }
    });
  }

  mountSimulator(simulator: ISimulatorHost) {
    // TODO: multi-device simulator support
    this._simulator = simulator;
    this.emitter.emit('lowcode_engine_simulator_ready', simulator);
  }

  setRendererReady(renderer: any) {
    this.isRendererReady = true;
    this.emitter.emit('lowcode_engine_renderer_ready', renderer);
  }

  onSimulatorReady(fn: (args: any) => void): () => void {
    if (this._simulator) {
      fn(this._simulator);
      return () => {};
    }
    this.emitter.on('lowcode_engine_simulator_ready', fn);
    return () => {
      this.emitter.removeListener('lowcode_engine_simulator_ready', fn);
    };
  }

  onRendererReady(fn: () => void): () => void {
    if (this.isRendererReady) {
      fn();
    }
    this.emitter.on('lowcode_engine_renderer_ready', fn);
    return () => {
      this.emitter.removeListener('lowcode_engine_renderer_ready', fn);
    };
  }

  onCurrentDocumentChange(fn: (doc: IDocumentModel) => void): () => void {
    this.emitter.on('current-document.change', fn);
    return () => {
      this.emitter.removeListener('current-document.change', fn);
    };
  }
}
