import { IPublicTypeProjectSchema, IPublicTypeDisposable, IPublicTypeRootSchema, IPublicTypePropsTransducer, IPublicTypeAppConfig } from '../type';
import { IPublicEnumTransformStage } from '../enum';
import { IPublicApiSimulatorHost } from './';
import { IPublicModelDocumentModel } from '../model';

export interface IBaseApiProject<
  DocumentModel
> {

  /**
   * Get the current document
   * get current document
   */
  get currentDocument(): DocumentModel | null;

  /**
   * Get all documents under the current project
   * get all documents of this project
   * @returns
   */
  get documents(): DocumentModel[];

  /**
   * Get the emulator host
   * get simulator host
   */
  get simulatorHost(): IPublicApiSimulatorHost | null;

  /**
   * Open a document
   * open a document
   * @param doc
   * @returns
   */
  openDocument(doc?: string | IPublicTypeRootSchema | undefined): DocumentModel | null;

  /**
   * Create a document
   * create a document
   * @param data
   * @returns
   */
  createDocument(data?: IPublicTypeRootSchema): DocumentModel | null;

  /**
   * Delete a document
   * remove a document
   * @param doc
   */
  removeDocument(doc: DocumentModel): void;

  /**
   * Get document based on fileName
   * get a document by filename
   * @param fileName
   * @returns
   */
  getDocumentByFileName(fileName: string): DocumentModel | null;

  /**
   * Get document based on id
   * get a document by id
   * @param id
   * @returns
   */
  getDocumentById(id: string): DocumentModel | null;

  /**
   * Export project
   * export project to schema
   * @returns
   */
  exportSchema(stage: IPublicEnumTransformStage): IPublicTypeProjectSchema;

  /**
   * Import project schema
   * import schema to project
   * @param schema project data to be imported
   */
  importSchema(schema?: IPublicTypeProjectSchema): void;

  /**
   * Get the current document
   * get current document
   * @returns
   */
  getCurrentDocument(): DocumentModel | null;

  /**
   * Add a property pipeline processing function
   * add a transducer to process prop
   * @param transducer
   * @param stage
   */
  addPropsTransducer(
      transducer: IPublicTypePropsTransducer,
      stage: IPublicEnumTransformStage,
    ): void;

  /**
   * Bind delete document event
   * set callback for event onDocumentRemoved
   * @param fn
   * @since v1.0.16
   */
  onRemoveDocument(fn: (data: { id: string }) => void): IPublicTypeDisposable;

  /**
   * Document change events in the current project
   * set callback for event onDocumentChanged
   */
  onChangeDocument(fn: (doc: DocumentModel) => void): IPublicTypeDisposable;

  /**
   * The simulator ready event of the current project
   * set callback for event onSimulatorHostReady
   */
  onSimulatorHostReady(fn: (host: IPublicApiSimulatorHost) => void): IPublicTypeDisposable;

  /**
   * The renderer ready event of the current project
   * set callback for event onSimulatorRendererReady
   */
  onSimulatorRendererReady(fn: () => void): IPublicTypeDisposable;

  /**
   * Set up multilingual corpus
   * Data format reference https://github.com/alibaba/lowcode-engine/blob/main/specs/lowcode-spec.md#2434%E5%9B%BD%E9%99%85%E5%8C%96%E5%A4%9A%E8%AF%AD%E8%A8%80%E7%B1%BB%E5%9E%8Baa
   *
   * set I18n data for this project
   * @param value object
   * @since v1.0.17
   */
  setI18n(value: object): void;

  /**
   * Set current project configuration
   *
   * set config data for this project
   * @param value object
   * @since v1.1.4
   */
  setConfig<T extends keyof IPublicTypeAppConfig>(key: T, value: IPublicTypeAppConfig[T]): void;
  setConfig(value: IPublicTypeAppConfig): void;
}

export interface IPublicApiProject extends IBaseApiProject<IPublicModelDocumentModel> {}
