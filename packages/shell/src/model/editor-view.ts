import { editorViewSymbol, pluginContextSymbol } from '../symbols';
import { IPublicModelPluginContext } from '@rchh/lowcode-types';
import { IViewContext } from '@rchh/lowcode-workspace';

export class EditorView {
  [editorViewSymbol]: IViewContext;

  [pluginContextSymbol]: IPublicModelPluginContext;

  constructor(editorView: IViewContext) {
    this[editorViewSymbol] = editorView;
    this[pluginContextSymbol] = this[editorViewSymbol].innerPlugins._getLowCodePluginContext({
      pluginName: editorView.editorWindow + editorView.viewName,
    });
  }

  toProxy() {
    return new Proxy(this, {
      get(target, prop, receiver) {
        if ((target[pluginContextSymbol] as any)[prop as string]) {
          return Reflect.get(target[pluginContextSymbol], prop, receiver);
        }
        return Reflect.get(target, prop, receiver);
      },
    });
  }

  get viewName() {
    return this[editorViewSymbol].viewName;
  }

  get viewType() {
    return this[editorViewSymbol].viewType;
  }
}
