export enum AssetLevel {
  // Environment dependent libraries such as react, react-dom
  Environment = 1,
  // Basic class libraries, such as lodash deep fusion antd
  Library = 2,
  // theme
  Theme = 3,
  // runtime
  Runtime = 4,
  // business components
  Components = 5,
  // Apps & Pages
  App = 6,
}

export const AssetLevels = [
  AssetLevel.Environment,
  AssetLevel.Library,
  AssetLevel.Theme,
  AssetLevel.Runtime,
  AssetLevel.Components,
  AssetLevel.App,
];

export type URL = string;

export enum AssetType {
  JSUrl = 'jsUrl',
  CSSUrl = 'cssUrl',
  CSSText = 'cssText',
  JSText = 'jsText',
  Bundle = 'bundle',
}

export interface AssetItem {
  type: AssetType;
  content?: string | null;
  device?: string;
  level?: AssetLevel;
  id?: string;
  scriptType?: string;
}

export type AssetList = Array<Asset | undefined | null>;

export type Asset = AssetList | AssetBundle | AssetItem | URL;

export interface AssetBundle {
  type: AssetType.Bundle;
  level?: AssetLevel;
  assets?: Asset | AssetList | null;
}
