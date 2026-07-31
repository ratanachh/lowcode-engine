import { globalContext } from '@rchh/lowcode-editor-core';
import {
  ISkeleton,
  SkeletonEvents,
} from '@rchh/lowcode-editor-skeleton';
import { skeletonSymbol } from '../symbols';
import { IPublicApiSkeleton, IPublicModelSkeletonItem, IPublicTypeConfigTransducer, IPublicTypeDisposable, IPublicTypeSkeletonConfig, IPublicTypeWidgetConfigArea } from '@rchh/lowcode-types';
import { getLogger } from '@rchh/lowcode-utils';
import { SkeletonItem } from '../model/skeleton-item';

const innerSkeletonSymbol = Symbol('skeleton');

const logger = getLogger({ level: 'warn', bizName: 'shell-skeleton' });

export class Skeleton implements IPublicApiSkeleton {
  private readonly [innerSkeletonSymbol]: ISkeleton;
  private readonly pluginName: string;

  get [skeletonSymbol](): ISkeleton {
    if (this.workspaceMode) {
      return this[innerSkeletonSymbol];
    }
    const workspace = globalContext.get('workspace');
    if (workspace.isActive) {
      if (!workspace.window?.innerSkeleton) {
        logger.error('skeleton api called at the wrong time, please check');
        return this[innerSkeletonSymbol];
      }
      return workspace.window.innerSkeleton;
    }

    return this[innerSkeletonSymbol];
  }

  constructor(
      skeleton: ISkeleton,
      pluginName: string,
      readonly workspaceMode: boolean = false,
    ) {
    this[innerSkeletonSymbol] = skeleton;
    this.pluginName = pluginName;
  }

  /**
   * Add a panel instance
   * @param config
   * @param extraConfig
   * @returns
   */
  add(config: IPublicTypeSkeletonConfig, extraConfig?: Record<string, any>): IPublicModelSkeletonItem | undefined {
    const configWithName = {
      ...config,
      pluginName: this.pluginName,
    };
    const item = this[skeletonSymbol].add(configWithName, extraConfig);
    if (item) {
      return new SkeletonItem(item);
    }
  }

  /**
   * Remove a panel instance
   * @param config
   * @returns
   */
  remove(config: IPublicTypeSkeletonConfig): number | undefined {
    const { area, name } = config;
    const skeleton = this[skeletonSymbol];
    if (!normalizeArea(area)) {
      return;
    }
    skeleton[normalizeArea(area)].container?.remove(name);
  }

  getAreaItems(areaName: IPublicTypeWidgetConfigArea): IPublicModelSkeletonItem[] {
    return this[skeletonSymbol][normalizeArea(areaName)].container.items?.map(d => new SkeletonItem(d));
  }

  getPanel(name: string) {
    const item = this[skeletonSymbol].getPanel(name);
    if (!item) {
      return;
    }

    return new SkeletonItem(item);
  }

  /**
   * Show a panel
   * @param name
   */
  showPanel(name: string) {
    this[skeletonSymbol].getPanel(name)?.show();
  }

  /**
   * Hide a panel
   * @param name
   */
  hidePanel(name: string) {
    this[skeletonSymbol].getPanel(name)?.hide();
  }

  /**
   * Show a widget
   * @param name
   */
  showWidget(name: string) {
    this[skeletonSymbol].getWidget(name)?.show();
  }

  /**
   * enable widget
   * @param name
   */
  enableWidget(name: string) {
    this[skeletonSymbol].getWidget(name)?.enable?.();
  }

  /**
   * Hide a widget
   * @param name
   */
  hideWidget(name: string) {
    this[skeletonSymbol].getWidget(name)?.hide();
  }

  /**
   * Disable a widget (not clickable)
   * @param name
   */
  disableWidget(name: string) {
    this[skeletonSymbol].getWidget(name)?.disable?.();
  }

  /**
   * show area
   * @param areaName name of area
   */
  showArea(areaName: string) {
    (this[skeletonSymbol] as any)[areaName]?.show();
  }

  /**
   * hide area
   * @param areaName name of area
   */
  hideArea(areaName: string) {
    (this[skeletonSymbol] as any)[areaName]?.hide();
  }

  /**
   * Listen for panel show events
   * @param listener
   * @returns
   */
  onShowPanel(listener: (paneName: string, panel: IPublicModelSkeletonItem) => void): IPublicTypeDisposable {
    const { editor } = this[skeletonSymbol];
    editor.eventBus.on(SkeletonEvents.PANEL_SHOW, (name: any, panel: any) => {
      listener(name, new SkeletonItem(panel));
    });
    return () => editor.eventBus.off(SkeletonEvents.PANEL_SHOW, listener);
  }

  onDisableWidget(listener: (...args: any[]) => void): IPublicTypeDisposable {
    const { editor } = this[skeletonSymbol];
    editor.eventBus.on(SkeletonEvents.WIDGET_DISABLE, (name: any, panel: any) => {
      listener(name, new SkeletonItem(panel));
    });
    return () => editor.eventBus.off(SkeletonEvents.WIDGET_DISABLE, listener);
  }

  onEnableWidget(listener: (...args: any[]) => void): IPublicTypeDisposable {
    const { editor } = this[skeletonSymbol];
    editor.eventBus.on(SkeletonEvents.WIDGET_ENABLE, (name: any, panel: any) => {
      listener(name, new SkeletonItem(panel));
    });
    return () => editor.eventBus.off(SkeletonEvents.WIDGET_ENABLE, listener);
  }

  /**
   * Listen for panel hide events
   * @param listener
   * @returns
   */
  onHidePanel(listener: (...args: any[]) => void): IPublicTypeDisposable {
    const { editor } = this[skeletonSymbol];
    editor.eventBus.on(SkeletonEvents.PANEL_HIDE, (name: any, panel: any) => {
      listener(name, new SkeletonItem(panel));
    });
    return () => editor.eventBus.off(SkeletonEvents.PANEL_HIDE, listener);
  }

  /**
   * Listen for widget show events
   * @param listener
   * @returns
   */
  onShowWidget(listener: (...args: any[]) => void): IPublicTypeDisposable {
    const { editor } = this[skeletonSymbol];
    editor.eventBus.on(SkeletonEvents.WIDGET_SHOW, (name: any, panel: any) => {
      listener(name, new SkeletonItem(panel));
    });
    return () => editor.eventBus.off(SkeletonEvents.WIDGET_SHOW, listener);
  }

  /**
   * Listen for widget hide events
   * @param listener
   * @returns
   */
  onHideWidget(listener: (...args: any[]) => void): IPublicTypeDisposable {
    const { editor } = this[skeletonSymbol];
    editor.eventBus.on(SkeletonEvents.WIDGET_HIDE, (name: any, panel: any) => {
      listener(name, new SkeletonItem(panel));
    });
    return () => editor.eventBus.off(SkeletonEvents.WIDGET_HIDE, listener);
  }

  registerConfigTransducer(fn: IPublicTypeConfigTransducer, level: number, id?: string) {
    this[skeletonSymbol].registerConfigTransducer(fn, level, id);
  }
}

function normalizeArea(area: IPublicTypeWidgetConfigArea | undefined): 'leftArea' | 'rightArea' | 'topArea' | 'toolbar' | 'mainArea' | 'bottomArea' | 'leftFixedArea' | 'leftFloatArea' | 'stages' | 'subTopArea' {
  switch (area) {
    case 'leftArea':
    case 'left':
      return 'leftArea';
    case 'rightArea':
    case 'right':
      return 'rightArea';
    case 'topArea':
    case 'top':
      return 'topArea';
    case 'toolbar':
      return 'toolbar';
    case 'mainArea':
    case 'main':
    case 'center':
    case 'centerArea':
      return 'mainArea';
    case 'bottomArea':
    case 'bottom':
      return 'bottomArea';
    case 'leftFixedArea':
      return 'leftFixedArea';
    case 'leftFloatArea':
      return 'leftFloatArea';
    case 'stages':
      return 'stages';
    case 'subTopArea':
      return 'subTopArea';
    default:
      throw new Error(`${area} not supported`);
  }
}
