import { IPublicModelNode, IPublicModelSettingField } from './shell';

export interface IShellModelFactory {
  // TODO: provide an interface for innerNode and use it here
  createNode(node: any | null | undefined): IPublicModelNode | null;
  // TODO: provide an interface for InnerSettingField and use it here

  createSettingField(prop: any): IPublicModelSettingField;
}
