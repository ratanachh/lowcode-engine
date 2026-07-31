import { Component, Fragment } from 'react';
import classNames from 'classnames';
import { observer, Focusable } from '@rchh/lowcode-editor-core';
import { Area } from '../area';
import { Panel } from '../widget/panel';
import { IPublicApiProject, IPublicTypePanelConfig } from '@rchh/lowcode-types';

@observer
export default class LeftFloatPane extends Component<{ area: Area<IPublicTypePanelConfig, Panel> }> {
  private dispose?: () => void;

  private focusing?: Focusable;

  private shell: HTMLElement | null = null;

  componentDidMount() {
    const { area } = this.props;
    const triggerClose = (e: any) => {
      if (!area.visible) return;
      // Do not close the panel when the MouseEvent target is the insert placeholder
      if (e.originalEvent?.target?.classList.contains('insertion')) return;
      // If an ancestor of the target has data-keep-visible-while-dragging="true", it belongs to that panel
      // Do not close the panel while dragging within the panel
      const panelElem = e.originalEvent?.target.closest('div[data-keep-visible-while-dragging="true"]');
      if (panelElem) return;
      area.setVisible(false);
    };
    area.skeleton.editor.eventBus.on('designer.drag', triggerClose);

    this.dispose = () => {
      area.skeleton.editor.removeListener('designer.drag', triggerClose);
    };

    const project: IPublicApiProject | undefined = area.skeleton.editor.get('project');

    this.focusing = area.skeleton.focusTracker.create({
      range: (e) => {
        const target = e.target as HTMLElement;
        if (!target) {
          return false;
        }
        if (this.shell?.contains(target)) {
          return true;
        }
        // Clicking iframe content counts as blur
        if ((document.querySelector('.lc-simulator-content-frame') as HTMLIFrameElement)?.contentWindow?.document.documentElement.contains(target)) {
          return false;
        }
        if (project?.simulatorHost?.contentWindow?.document.documentElement.contains(target)) {
          return false;
        }
        // Click on the settings area
        if (document.querySelector('.lc-right-area')?.contains(target)) {
          return false;
        }
        // Clicks on non-editor popup/dialog, left plugin bar, etc. do not trigger blur
        if (!document.querySelector('.lc-workbench')?.contains(target)) {
          return true;
        }
        // Excluding settings and iframe, other areas do not count as blur
        if (document.querySelector('.lc-workbench-body')?.contains(target)) {
          return true;
        }
        const docks = area.current?.getAssocDocks();
        if (docks && docks?.length) {
          return docks.some(dock => dock.getDOMNode()?.contains(target));
        }
        return false;
      },
      onEsc: () => {
        this.props.area.setVisible(false);
      },
      onBlur: () => {
        this.props.area.setVisible(false);
      },
    });

    this.onEffect();
  }

  onEffect() {
    const { area } = this.props;
    if (area.visible) {
      this.focusing?.active();
      // Close the current fixed-area panel
      // TODO: look for a more suitable place
      const fixedContainer = area?.skeleton?.leftFixedArea?.container;
      const currentFixed = fixedContainer?.current;
      if (currentFixed) {
        fixedContainer.unactive(currentFixed);
      }
    } else {
      this.focusing?.suspense();
    }
  }

  componentDidUpdate() {
    this.onEffect();
  }

  componentWillUnmount() {
    this.focusing?.purge();
    this.dispose?.();
  }

  render() {
    const { area } = this.props;
    const width = area.current?.config.props?.width;

    const style = width ? {
      width,
    } : undefined;
    return (
      <div
        ref={(ref) => { this.shell = ref; }}
        className={classNames('lc-left-float-pane', {
          'lc-area-visible': area.visible,
        })}
        style={style}
      >
        <Contents area={area} />
      </div>
    );
  }
}

@observer
class Contents extends Component<{ area: Area<any, Panel> }> {
  render() {
    const { area } = this.props;
    return (
      <Fragment>
        {area.container.items.map((panel) => panel.content)}
      </Fragment>
    );
  }
}
