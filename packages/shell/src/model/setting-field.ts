import { ISettingField, isSettingField } from '@rchh/lowcode-designer';
import {
  IPublicTypeCompositeValue,
  IPublicTypeFieldConfig,
  IPublicTypeCustomView,
  IPublicTypeSetterType,
  IPublicTypeFieldExtraProps,
  IPublicModelSettingTopEntry,
  IPublicModelNode,
  IPublicModelComponentMeta,
  IPublicTypeSetValueOptions,
  IPublicModelSettingField,
  IPublicTypeDisposable,
} from '@rchh/lowcode-types';
import { settingFieldSymbol } from '../symbols';
import { Node as ShellNode } from './node';
import { SettingTopEntry, SettingTopEntry as ShellSettingTopEntry } from './setting-top-entry';
import { ComponentMeta as ShellComponentMeta } from './component-meta';
import { isCustomView } from '@rchh/lowcode-utils';

export class SettingField implements IPublicModelSettingField {
  private readonly [settingFieldSymbol]: ISettingField;

  constructor(prop: ISettingField) {
    this[settingFieldSymbol] = prop;
  }

  static create(prop: ISettingField): IPublicModelSettingField {
    return new SettingField(prop);
  }

  /**
   * Get setting field isGroup
   */
  get isGroup(): boolean {
    return this[settingFieldSymbol].isGroup;
  }

  /**
   * Get setting field id
   */
  get id(): string {
    return this[settingFieldSymbol].id;
  }

  /**
   * Get setting field name
   */
  get name(): string | number | undefined {
    return this[settingFieldSymbol].name;
  }

  /**
   * Get setting field key
   */
  get key(): string | number | undefined {
    return this[settingFieldSymbol].getKey();
  }

  /**
   * Get setting field path
   */
  get path(): any[] {
    return this[settingFieldSymbol].path;
  }

  /**
   * Get setting field title
   */
  get title(): any {
    return this[settingFieldSymbol].title;
  }

  /**
   * Get setting field setter
   */
  get setter(): IPublicTypeSetterType | null {
    return this[settingFieldSymbol].setter;
  }

  /**
   * Get setting field expanded
   */
  get expanded(): boolean {
    return this[settingFieldSymbol].expanded;
  }

  /**
   * Get setting field extraProps
   */
  get extraProps(): IPublicTypeFieldExtraProps {
    return this[settingFieldSymbol].extraProps;
  }

  get props(): IPublicModelSettingTopEntry {
    return ShellSettingTopEntry.create(this[settingFieldSymbol].props);
  }

  /**
   * Get the node instance for this setting field
   */
  get node(): IPublicModelNode | null {
    return ShellNode.create(this[settingFieldSymbol].getNode());
  }

  /**
   * Get parent setting field
   */
  get parent(): IPublicModelSettingField | IPublicModelSettingTopEntry {
    if (isSettingField(this[settingFieldSymbol].parent)) {
      return SettingField.create(this[settingFieldSymbol].parent);
    }

    return SettingTopEntry.create(this[settingFieldSymbol].parent);
  }

  /**
   * Get top-level setting entry
   */
  get top(): IPublicModelSettingTopEntry {
    return ShellSettingTopEntry.create(this[settingFieldSymbol].top);
  }

  /**
   * Whether this is a SettingField instance
   */
  get isSettingField(): boolean {
    return this[settingFieldSymbol].isSettingField;
  }

  /**
   * componentMeta
   */
  get componentMeta(): IPublicModelComponentMeta | null {
    return ShellComponentMeta.create(this[settingFieldSymbol].componentMeta);
  }

  /**
   * Get setting field items
   */
  get items(): Array<IPublicModelSettingField | IPublicTypeCustomView> {
    return this[settingFieldSymbol].items?.map((item) => {
      if (isCustomView(item)) {
        return item;
      }
      return item.internalToShellField();
    });
  }

  /**
   * Set key
   * @param key
   */
  setKey(key: string | number): void {
    this[settingFieldSymbol].setKey(key);
  }

  /**
   * @deprecated use .node instead
   */
  getNode() {
    return this.node;
  }

  /**
   * @deprecated use .parent instead
   */
  getParent() {
    return this.parent;
  }

  /**
   * Set value
   * @param val Value
   */
  setValue(val: IPublicTypeCompositeValue, extraOptions?: IPublicTypeSetValueOptions): void {
    this[settingFieldSymbol].setValue(val, false, false, extraOptions);
  }

  /**
   * Set child prop value
   * @param propName Child prop name
   * @param value Value
   */
  setPropValue(propName: string | number, value: any): void {
    this[settingFieldSymbol].setPropValue(propName, value);
  }

  /**
   * Clear the given prop value
   * @param propName
   */
  clearPropValue(propName: string | number): void {
    this[settingFieldSymbol].clearPropValue(propName);
  }

  /**
   * Get configured default value
   * @returns
   */
  getDefaultValue(): any {
    return this[settingFieldSymbol].getDefaultValue();
  }

  /**
   * Get value
   * @returns
   */
  getValue(): any {
    return this[settingFieldSymbol].getValue();
  }

  /**
   * Get child prop value
   * @param propName Child prop name
   * @returns
   */
  getPropValue(propName: string | number): any {
    return this[settingFieldSymbol].getPropValue(propName);
  }

  /**
   * Get top-level extra prop value
   */
  getExtraPropValue(propName: string): any {
    return this[settingFieldSymbol].getExtraPropValue(propName);
  }

  /**
   * Set top-level extra prop value
   */
  setExtraPropValue(propName: string, value: any): void {
    this[settingFieldSymbol].setExtraPropValue(propName, value);
  }

  /**
   * Get setting props
   * @returns
   */
  getProps(): IPublicModelSettingTopEntry {
    return ShellSettingTopEntry.create(this[settingFieldSymbol].getProps());
  }

  /**
   * Whether bound to a variable
   * @returns
   */
  isUseVariable(): boolean {
    return this[settingFieldSymbol].isUseVariable();
  }

  /**
   * Set variable binding
   * @param flag
   */
  setUseVariable(flag: boolean): void {
    this[settingFieldSymbol].setUseVariable(flag);
  }

  /**
   * Create a setting field instance
   * @param config
   * @returns
   */
  createField(config: IPublicTypeFieldConfig): IPublicModelSettingField {
    return SettingField.create(this[settingFieldSymbol].createField(config));
  }

  /**
   * Get value; when it is a variable, return mock
   * @returns
   */
  getMockOrValue(): any {
    return this[settingFieldSymbol].getMockOrValue();
  }

  /**
   * Destroy current field instance
   */
  purge(): void {
    this[settingFieldSymbol].purge();
  }

  /**
   * Remove current field instance
   */
  remove(): void {
    this[settingFieldSymbol].remove();
  }

  /**
   * Set autorun
   * @param action
   * @returns
   */
  onEffect(action: () => void): IPublicTypeDisposable {
    return this[settingFieldSymbol].onEffect(action);
  }

  /**
   * Return shell model; handles cases where field is already a shell field
   * @returns
   */
  internalToShellField() {
    return this;
  }
}
