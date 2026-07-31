export interface INpmPackage {
  package: string; // Component package name
  version: string; // Component package version
}

/**
 * External dependency description
 *
 * @export
 * @interface IExternalDependency
 */
export interface IExternalDependency extends INpmPackage, IDependency {}

export enum InternalDependencyType {
  PAGE = 'pages',
  BLOCK = 'components',
  COMPONENT = 'components',
  UTILS = 'utils',
}

export enum DependencyType {
  External = 'External',
  Internal = 'Internal',
}

export interface IInternalDependency extends IDependency {
  type: InternalDependencyType;
  moduleName: string;
}

export interface IDependency {
  destructuring: boolean; // Whether the component is exported via destructuring
  exportName: string; // Export name
  subName?: string; // Sub-component name
  main?: string; // Package component entry path, e.g. /lib/input
  dependencyType?: DependencyType; // Dependency type: internal/external
  componentName?: string; // Name after import
}