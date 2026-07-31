import { IScope } from '../types/core';
import { IScopeBindings, ScopeBindings } from './ScopeBindings';

export class Scope implements IScope {
  bindings?: IScopeBindings;

  constructor(readonly parent: IScope | null = null) {
    this.bindings = undefined;
  }

  /**
   * Create root Scope; decide whether to open a new one based on the scope chain to walk
   */
  static createRootScope(): IScope {
    return new Scope();
  }

  createSubScope(ownIdentifiers: string[]): IScope {
    const originalScopeBindings = this.bindings;
    const newScopeBindings = new ScopeBindings(originalScopeBindings);
    ownIdentifiers.forEach((identifier) => {
      newScopeBindings.addBinding(identifier);
    });
    const newScope = new Scope(this);
    newScope.bindings = newScopeBindings;
    return newScope;
  }
}
