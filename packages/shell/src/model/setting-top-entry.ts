import { ISettingTopEntry } from '@rchh/lowcode-designer';
import { settingTopEntrySymbol } from '../symbols';
import { Node as ShellNode } from './node';
import { IPublicModelSettingTopEntry, IPublicModelNode, IPublicModelSettingField } from '@rchh/lowcode-types';
import { SettingField } from './setting-field';

export class SettingTopEntry implements IPublicModelSettingTopEntry {
  private readonly [settingTopEntrySymbol]: ISettingTopEntry;

  constructor(prop: ISettingTopEntry) {
    this[settingTopEntrySymbol] = prop;
  }

  static create(prop: ISettingTopEntry): IPublicModelSettingTopEntry {
    return new SettingTopEntry(prop);
  }

  /**
   * Return the owning node instance
   */
  get node(): IPublicModelNode | null {
    return ShellNode.create(this[settingTopEntrySymbol].getNode());
  }

  /**
   * Get child setting props
   * @param propName
   * @returns
   */
  get(propName: string | number): IPublicModelSettingField {
    return SettingField.create(this[settingTopEntrySymbol].get(propName)!);
  }

  /**
   * @deprecated use .node instead
   */
  getNode() {
    return this.node;
  }

  /**
   * Get value by propName
   * @param propName
   * @returns
   */
  getPropValue(propName: string | number): any {
    return this[settingTopEntrySymbol].getPropValue(propName);
  }

  /**
   * Set value by propName
   * @param propName
   * @param value
   */
  setPropValue(propName: string | number, value: any): void {
    this[settingTopEntrySymbol].setPropValue(propName, value);
  }

  clearPropValue(propName: string | number) {
    this[settingTopEntrySymbol].clearPropValue(propName);
  }
}