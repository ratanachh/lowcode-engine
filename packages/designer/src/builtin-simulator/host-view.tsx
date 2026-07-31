import React, { Component } from 'react';
import { observer } from '@rchh/lowcode-editor-core';
import { BuiltinSimulatorHost, BuiltinSimulatorProps } from './host';
import { BemTools } from './bem-tools';
import { Project } from '../project';
import './host.less';

/*
  Simulator: swappable component with protocol constraints; canvas container.
  Used to center or position the Canvas when its size changes.
  Canvas(DeviceShell): device chrome simulated via background image; preset styles
  change width/height and position CanvasViewport.
  CanvasViewport: in page-editing mode, width/height must not overflow the Canvas area.
  Content(Shell): content outer layer, sized to CanvasViewport; no border, no margin.
  BemTools: overlay helpers; initially at Content (0,0), flush with Canvas; offset
  changes with Content scroll position.
*/

type SimulatorHostProps = BuiltinSimulatorProps & {
  project: Project;
  onMount?: (host: BuiltinSimulatorHost) => void;
};

export class BuiltinSimulatorHostView extends Component<SimulatorHostProps> {
  readonly host: BuiltinSimulatorHost;

  constructor(props: any) {
    super(props);
    const { project, onMount, designer } = this.props;
    this.host = (project.simulator as BuiltinSimulatorHost) || new BuiltinSimulatorHost(project, designer);
    this.host.setProps(this.props);
    onMount?.(this.host);
  }

  shouldComponentUpdate(nextProps: BuiltinSimulatorProps) {
    this.host.setProps(nextProps);
    return false;
  }

  render() {
    return (
      <div className="lc-simulator">
        {/* progressing.visible ? <PreLoaderView /> : null */}
        <Canvas host={this.host} />
      </div>
    );
  }
}

@observer
class Canvas extends Component<{ host: BuiltinSimulatorHost }> {
  render() {
    const sim = this.props.host;
    let className = 'lc-simulator-canvas';
    const { canvas = {}, viewport = {} } = sim.deviceStyle || {};
    if (sim.deviceClassName) {
      className += ` ${sim.deviceClassName}`;
    } else if (sim.device) {
      className += ` lc-simulator-device-${sim.device}`;
    }

    return (
      <div className={className} style={canvas}>
        <div ref={(elmt) => sim.mountViewport(elmt)} className="lc-simulator-canvas-viewport" style={viewport}>
          <BemTools host={sim} />
          <Content host={sim} />
        </div>
      </div>
    );
  }
}

@observer
class Content extends Component<{ host: BuiltinSimulatorHost }> {
  state = {
    disabledEvents: false,
  };

  private dispose?: () => void;

  componentDidMount() {
    const editor = this.props.host.designer.editor;
    const onEnableEvents = (type: boolean) => {
      this.setState({
        disabledEvents: type,
      });
    };

    editor.eventBus.on('designer.builtinSimulator.disabledEvents', onEnableEvents);

    this.dispose = () => {
      editor.removeListener('designer.builtinSimulator.disabledEvents', onEnableEvents);
    };
  }

  componentWillUnmount() {
    this.dispose?.();
  }

  render() {
    const sim = this.props.host;
    const { disabledEvents } = this.state;
    const { viewport, designer } = sim;
    const frameStyle: any = {
      transform: `scale(${viewport.scale})`,
      height: viewport.contentHeight,
      width: viewport.contentWidth,
    };
    if (disabledEvents) {
      frameStyle.pointerEvents = 'none';
    }

    const { viewName } = designer;

    return (
      <div className="lc-simulator-content">
        <iframe
          name={`${viewName}-SimulatorRenderer`}
          className="lc-simulator-content-frame"
          style={frameStyle}
          ref={(frame) => sim.mountContentFrame(frame)}
        />
      </div>
    );
  }
}
