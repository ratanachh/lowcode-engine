import { IPublicTypeCustomView, IPublicTypeCompositeValue, IPublicTypeSetterType, IPublicTypeSetValueOptions, IPublicTypeFieldConfig, IPublicTypeFieldExtraProps, IPublicTypeDisposable } from '../type';
import { IPublicModelNode, IPublicModelComponentMeta, IPublicModelSettingTopEntry } from './';

export interface IBaseModelSettingField<
  SettingTopEntry,
  SettingField,
  ComponentMeta,
  Node
> {

  /**
   * Get the parent setting field
   */
  readonly parent: SettingTopEntry | SettingField;

  /**
   * Get the setting field isGroup
   */
  get isGroup(): boolean;

  /**
   * Get the setting field id
   */
  get id(): string;

  /**
   * Get the setting field name
   */
  get name(): string | number | undefined;

  /**
   * Get the setting field key
   */
  get key(): string | number | undefined;

  /**
   * Get the setting field path
   */
  get path(): (string | number)[];

  /**
   * Get the setting field title
   */
  get title(): string;

  /**
   * Get the setting field setter
   */
  get setter(): IPublicTypeSetterType | null;

  /**
   * Get the setting field expanded
   */
  get expanded(): boolean;

  /**
   * Get the setting field extraProps
   */
  get extraProps(): IPublicTypeFieldExtraProps;

  get props(): SettingTopEntry;

  /**
   * Get the node instance for the setting field
   */
  get node(): Node | null;

  /**
   * Get the top-level setting field
   */
  get top(): SettingTopEntry;

  /**
   * Whether this is a SettingField instance
   */
  get isSettingField(): boolean;

  /**
   * componentMeta
   */
  get componentMeta(): ComponentMeta | null;

  /**
   * Get the setting field items
   */
  get items(): Array<SettingField | IPublicTypeCustomView>;

  /**
   * Set the key value
   * @param key
   */
  setKey(key: string | number): void;

  /**
   * Set value
   * @param val value
   */
  setValue(val: IPublicTypeCompositeValue, extraOptions?: IPublicTypeSetValueOptions): void;

  /**
   * Set a child prop value
   * @param propName child prop name
   * @param value value
   */
  setPropValue(propName: string | number, value: any): void;

  /**
   * Clear a specified prop value
   * @param propName
   */
  clearPropValue(propName: string | number): void;

  /**
   * Get the configured default value
   * @returns
   */
  getDefaultValue(): any;

  /**
   * Get value
   * @returns
   */
  getValue(): any;

  /**
   * Get a child prop value
   * @param propName child prop name
   * @returns
   */
  getPropValue(propName: string | number): any;

  /**
   * Get a top-level extra prop value
   */
  getExtraPropValue(propName: string): any;

  /**
   * Set a top-level extra prop value
   */
  setExtraPropValue(propName: string, value: any): void;

  /**
   * Get the setting props set
   * @returns
   */
  getProps(): SettingTopEntry;

  /**
   * Whether bound to a variable
   * @returns
   */
  isUseVariable(): boolean;

  /**
   * Set bind variables
   * @param flag
   */
  setUseVariable(flag: boolean): void;

  /**
   * Create a settings field instance
   * @param config
   * @returns
   */
  createField(config: IPublicTypeFieldConfig): SettingField;

  /**
   * Get the value, when it is a variable, return mock
   * @returns
   */
  getMockOrValue(): any;

  /**
   * Destroy the current field instance
   */
  purge(): void;

  /**
   * Remove the current field instance
   */
  remove(): void;

  /**
   * Set up autorun
   * @param action
   * @returns
   */
  onEffect(action: () => void): IPublicTypeDisposable;
}

export interface IPublicModelSettingField extends IBaseModelSettingField<
  IPublicModelSettingTopEntry,
  IPublicModelSettingField,
  IPublicModelComponentMeta,
  IPublicModelNode
> {

}