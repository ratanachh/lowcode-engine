import { IPublicTypeCustomView, IPublicApiSetters, IPublicTypeRegisteredSetter } from '@rchh/lowcode-types';
import { ISetters, globalContext, untracked } from '@rchh/lowcode-editor-core';
import { ReactNode } from 'react';
import { getLogger } from '@rchh/lowcode-utils';

const innerSettersSymbol = Symbol('setters');
const settersSymbol = Symbol('setters');

const logger = getLogger({ level: 'warn', bizName: 'shell-setters' });

export class Setters implements IPublicApiSetters {
  readonly [innerSettersSymbol]: ISetters;

  get [settersSymbol](): ISetters {
    if (this.workspaceMode) {
      return this[innerSettersSymbol];
    }

    const workspace = globalContext.get('workspace');
    if (workspace.isActive) {
      return untracked(() => {
        if (!workspace.window?.innerSetters) {
          logger.error('setter api called at the wrong time, please check');
          return this[innerSettersSymbol];
        }
        return workspace.window.innerSetters;
      });
    }

    return this[innerSettersSymbol];
  }

  constructor(innerSetters: ISetters, readonly workspaceMode = false) {
    this[innerSettersSymbol] = innerSetters;
  }

  /**
   * Get a setter by name
   * @param type
   * @returns
   */
  getSetter = (type: string) => {
    return this[settersSymbol].getSetter(type);
  };

  /**
   * Get all registered settersMap
   * @returns
   */
  getSettersMap = (): Map<string, IPublicTypeRegisteredSetter & {
    type: string;
  }> => {
    return this[settersSymbol].getSettersMap();
  };

  /**
   * Register a setter
   * @param typeOrMaps
   * @param setter
   * @returns
   */
  registerSetter = (
    typeOrMaps: string | { [key: string]: IPublicTypeCustomView | IPublicTypeRegisteredSetter },
    setter?: IPublicTypeCustomView | IPublicTypeRegisteredSetter | undefined,
  ) => {
    return this[settersSymbol].registerSetter(typeOrMaps, setter);
  };

  /**
   * @deprecated
   */
  createSetterContent = (setter: any, props: Record<string, any>): ReactNode => {
    return this[settersSymbol].createSetterContent(setter, props);
  };
}
