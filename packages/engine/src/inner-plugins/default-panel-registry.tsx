import { IPublicModelPluginContext } from '@rchh/lowcode-types';
import { SettingsPrimaryPane } from '@rchh/lowcode-editor-skeleton';
import DesignerPlugin from '@rchh/lowcode-plugin-designer';

// 注册默认的面板
export const defaultPanelRegistry = (editor: any) => {
  const fun = (ctx: IPublicModelPluginContext) => {
    return {
      init() {
        const { skeleton, config } = ctx;
        skeleton.add({
          area: 'mainArea',
          name: 'designer',
          type: 'Widget',
          content: <DesignerPlugin
            engineConfig={config}
            engineEditor={editor}
          />,
        });
        if (!config.get('disableDefaultSettingPanel')) {
          skeleton.add({
            area: 'rightArea',
            name: 'settingsPane',
            type: 'Panel',
            content: <SettingsPrimaryPane
              engineEditor={editor}
            />,
            props: {
              ignoreRoot: true,
            },
            panelProps: {
              ...(config.get('defaultSettingPanelProps') || {}),
            },
          });
        }
      },
    };
  };

  fun.pluginName = '___default_panel___';

  return fun;
};

export default defaultPanelRegistry;
