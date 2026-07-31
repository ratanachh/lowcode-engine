import {
  BuiltinSimulatorHost,
  IProject as InnerProject,
} from '@rchh/lowcode-designer';
import { globalContext } from '@rchh/lowcode-editor-core';
import {
  IPublicTypeRootSchema,
  IPublicTypeProjectSchema,
  IPublicModelEditor,
  IPublicApiProject,
  IPublicApiSimulatorHost,
  IPublicModelDocumentModel,
  IPublicTypePropsTransducer,
  IPublicEnumTransformStage,
  IPublicTypeDisposable,
  IPublicTypeAppConfig,
} from '@rchh/lowcode-types';
import { DocumentModel as ShellDocumentModel } from '../model';
import { SimulatorHost } from './simulator-host';
import { editorSymbol, projectSymbol, simulatorHostSymbol, documentSymbol } from '../symbols';
import { getLogger } from '@rchh/lowcode-utils';

const logger = getLogger({ level: 'warn', bizName: 'shell-project' });

const innerProjectSymbol = Symbol('innerProject');
export class Project implements IPublicApiProject {
  private readonly [innerProjectSymbol]: InnerProject;
  private [simulatorHostSymbol]: BuiltinSimulatorHost;
  get [projectSymbol](): InnerProject {
    if (this.workspaceMode) {
      return this[innerProjectSymbol];
    }
    const workspace = globalContext.get('workspace');
    if (workspace.isActive) {
      if (!workspace.window?.innerProject) {
        logger.error('project api called at the wrong time, please check');
        return this[innerProjectSymbol];
      }
      return workspace.window.innerProject;
    }

    return this[innerProjectSymbol];
  }

  get [editorSymbol](): IPublicModelEditor {
    return this[projectSymbol]?.designer.editor;
  }

  constructor(project: InnerProject, public workspaceMode: boolean = false) {
    this[innerProjectSymbol] = project;
  }

  static create(project: InnerProject, workspaceMode: boolean = false) {
    return new Project(project, workspaceMode);
  }

  /**
   * Get the current document
   * @returns
   */
  get currentDocument(): IPublicModelDocumentModel | null {
    return this.getCurrentDocument();
  }

  /**
   * Get all documents under the current project
   * @returns
   */
  get documents(): IPublicModelDocumentModel[] {
    return this[projectSymbol].documents.map((doc) => ShellDocumentModel.create(doc)!);
  }

  /**
   * Get the simulator host
   */
  get simulatorHost(): IPublicApiSimulatorHost | null {
    return SimulatorHost.create(this[projectSymbol].simulator as any || this[simulatorHostSymbol]);
  }

  /**
   * @deprecated use .simulatorHost instead.
   */
  get simulator() {
    return this.simulatorHost;
  }

  /**
   * Open a document
   * @param doc
   * @returns
   */
  openDocument(doc?: string | IPublicTypeRootSchema | undefined) {
    const documentModel = this[projectSymbol].open(doc);
    if (!documentModel) {
      return null;
    }
    return ShellDocumentModel.create(documentModel);
  }

  /**
   * Create a document
   * @param data
   * @returns
   */
  createDocument(data?: IPublicTypeRootSchema): IPublicModelDocumentModel | null {
    const doc = this[projectSymbol].createDocument(data);
    return ShellDocumentModel.create(doc);
  }

  /**
   * Remove a document
   * @param doc
   */
  removeDocument(doc: IPublicModelDocumentModel) {
    this[projectSymbol].removeDocument((doc as any)[documentSymbol]);
  }

  /**
   * Get a document by fileName
   * @param fileName
   * @returns
   */
  getDocumentByFileName(fileName: string): IPublicModelDocumentModel | null {
    const innerDocumentModel = this[projectSymbol].getDocumentByFileName(fileName);
    return ShellDocumentModel.create(innerDocumentModel);
  }

  /**
   * Get a document by id
   * @param id
   * @returns
   */
  getDocumentById(id: string): IPublicModelDocumentModel | null {
    return ShellDocumentModel.create(this[projectSymbol].getDocument(id));
  }

  /**
   * Export the project
   * @returns
   */
  exportSchema(stage: IPublicEnumTransformStage = IPublicEnumTransformStage.Render) {
    return this[projectSymbol].getSchema(stage);
  }

  /**
   * Import a project
   * @param schema Project data to import
   */
  importSchema(schema?: IPublicTypeProjectSchema): void {
    this[projectSymbol].load(schema, true);
  }

  /**
   * Get the current document
   * @returns
   */
  getCurrentDocument(): IPublicModelDocumentModel | null {
    return ShellDocumentModel.create(this[projectSymbol].currentDocument);
  }

  /**
   * Add a props pipeline handler
   * @param transducer
   * @param stage
   */
  addPropsTransducer(
      transducer: IPublicTypePropsTransducer,
      stage: IPublicEnumTransformStage,
    ): void {
    this[projectSymbol].designer.addPropsReducer(transducer, stage);
  }

  /**
   * Bind document remove event
   * @param fn
   * @returns
   */
  onRemoveDocument(fn: (data: { id: string}) => void): IPublicTypeDisposable {
    return this[editorSymbol].eventBus.on(
        'designer.document.remove',
        (data: { id: string }) => fn(data),
      );
  }

  /**
   * Document change event within the current project
   */
  onChangeDocument(fn: (doc: IPublicModelDocumentModel) => void): IPublicTypeDisposable {
    const offFn = this[projectSymbol].onCurrentDocumentChange((originalDoc) => {
      fn(ShellDocumentModel.create(originalDoc)!);
    });
    if (this[projectSymbol].currentDocument) {
      fn(ShellDocumentModel.create(this[projectSymbol].currentDocument)!);
    }
    return offFn;
  }

  /**
   * Simulator ready event for the current project
   */
  onSimulatorHostReady(fn: (host: IPublicApiSimulatorHost) => void): IPublicTypeDisposable {
    const offFn = this[projectSymbol].onSimulatorReady((simulator: BuiltinSimulatorHost) => {
      fn(SimulatorHost.create(simulator)!);
    });
    return offFn;
  }

  /**
   * Renderer ready event for the current project
   */
  onSimulatorRendererReady(fn: () => void): IPublicTypeDisposable {
    const offFn = this[projectSymbol].onRendererReady(() => {
      fn();
    });
    return offFn;
  }

  /**
   * Set i18n locale messages
   * Data format: see https://github.com/alibaba/lowcode-engine/blob/main/specs/lowcode-spec.md#2434%E5%9B%BD%E9%99%85%E5%8C%96%E5%A4%9A%E8%AF%AD%E8%A8%80%E7%B1%BB%E5%9E%8Baa
   * @param value object
   * @returns
   */
  setI18n(value: object): void {
    this[projectSymbol].set('i18n', value);
  }

  /**
   * Set project config
   * @param value object
   * @returns
   */
  setConfig<T extends keyof IPublicTypeAppConfig>(key: T, value: IPublicTypeAppConfig[T]): void;
  setConfig(value: IPublicTypeAppConfig): void;
  setConfig(...params: any[]): void {
    if (params.length === 2) {
      const oldConfig = this[projectSymbol].get('config');
      this[projectSymbol].set('config', {
        ...oldConfig,
        [params[0]]: params[1],
      });
    } else {
      this[projectSymbol].set('config', params[0]);
    }
  }
}
