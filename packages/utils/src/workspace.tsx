import React, { useEffect, useState, useCallback } from 'react';
import { IPublicModelPluginContext, IPublicEnumPluginRegisterLevel, IPublicModelWindow, IPublicModelEditorView } from '@rchh/lowcode-types';

/**
 * HOC: provide view plugin context to a component.
 *
 * @param {React.ComponentType} Component - Component to wrap.
 * @param {string|string[]} viewName - View name or list of names used to filter view plugin context.
 * @returns {React.ComponentType} Returns the wrapped component.
 *
 * @example
 * // Usage example (function component):
 * const EnhancedComponent = ProvideViewPluginContext(MyComponent, "viewName");
 */
export const ProvideViewPluginContext = (Component: any, viewName?: string | string[]) => {
  // Create a function component so Hooks can be used inside
  return function WithPluginContext(props: {
    [key: string]: any;

    pluginContext?: IPublicModelPluginContext;
  }) {
    const getPluginContextFun = useCallback((editorWindow?: IPublicModelWindow | null) => {
      if (!editorWindow?.currentEditorView) {
        return null;
      }
      if (viewName) {
        const items = editorWindow?.editorViews.filter(d => (d as any).viewName === viewName || (Array.isArray(viewName) && viewName.includes((d as any).viewName)));
        return items[0];
      } else {
        return editorWindow.currentEditorView;
      }
    }, []);

    const { workspace } = props.pluginContext || {};
    const [pluginContext, setPluginContext] = useState<IPublicModelEditorView | null>(getPluginContextFun(workspace?.window));

    useEffect(() => {
      if (workspace?.window) {
        const ctx = getPluginContextFun(workspace.window);
        ctx && setPluginContext(ctx);
      }
      return workspace?.onChangeActiveEditorView(() => {
        const ctx = getPluginContextFun(workspace.window);
        ctx && setPluginContext(ctx);
      });
    }, [workspace, getPluginContextFun]);

    if (props.pluginContext?.registerLevel !== IPublicEnumPluginRegisterLevel.Workspace || !props.pluginContext) {
      return <Component {...props} />;
    }

    return <Component {...props} pluginContext={pluginContext} />;
  };
};
