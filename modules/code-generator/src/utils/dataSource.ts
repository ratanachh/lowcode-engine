import changeCase from 'change-case';
import type { IProjectInfo } from '../types/intermediate';

export interface DataSourceDependenciesConfig {

  /** Data source engine version */
  engineVersion?: string;

  /** Data source engine package name */
  enginePackage?: string;

  /** Data source handlers version */
  handlersVersion?: {
    [key: string]: string;
  };

  /** Data source handlers package name */
  handlersPackages?: {
    [key: string]: string;
  };
}

export function buildDataSourceDependencies(
  ir: IProjectInfo,
  cfg: DataSourceDependenciesConfig = {},
): Record<string, string> {
  return {
    // Data source engine dependency packages
    [cfg.enginePackage || '@rchh/lowcode-datasource-engine']: cfg.engineVersion || '^1.0.0',

    // Dependency packages for various data source handlers
    ...(ir.dataSourcesTypes || []).reduce(
      (acc, dsType) => ({
        ...acc,
        [getDataSourceHandlerPackageName(dsType)]: cfg.handlersVersion?.[dsType] || '^1.0.0',
      }),
      {},
    ),
  };

  function getDataSourceHandlerPackageName(dsType: string) {
    return (
      cfg.handlersPackages?.[dsType] ||
      `@rchh/lowcode-datasource-${changeCase.kebab(dsType)}-handler`
    );
  }
}
