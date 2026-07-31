import { Component } from 'react';
import { observer } from '@rchh/lowcode-editor-core';
import { BuiltinSimulatorHost } from '../host';
import {
  DropLocation,
  isVertical,
} from '../../designer';
import { ISimulatorHost } from '../../simulator';
import { INode } from '../../document';
import './insertion.less';
import { IPublicTypeNodeData, IPublicTypeNodeSchema, IPublicTypeLocationChildrenDetail, IPublicTypeRect } from '@rchh/lowcode-types';
import { isLocationChildrenDetail } from '@rchh/lowcode-utils';

interface InsertionData {
  edge?: DOMRect;
  insertType?: string;
  vertical?: boolean;
  nearRect?: IPublicTypeRect;
  coverRect?: DOMRect;
  nearNode?: IPublicTypeNodeData;
}

/**
 * Handle dragging child nodes (INode)
 */
function processChildrenDetail(sim: ISimulatorHost, container: INode, detail: IPublicTypeLocationChildrenDetail): InsertionData {
  let edge = detail.edge || null;

  if (!edge) {
    edge = sim.computeRect(container);
    if (!edge) {
      return {};
    }
  }

  const ret: any = {
    edge,
    insertType: 'before',
  };

  if (detail.near) {
    const { node, pos, rect, align } = detail.near;
    ret.nearRect = rect || sim.computeRect(node);
    ret.nearNode = node;
    if (pos === 'replace') {
      // FIXME: ret.nearRect mybe null
      ret.coverRect = ret.nearRect;
      ret.insertType = 'cover';
    } else if (!ret.nearRect || (ret.nearRect.width === 0 && ret.nearRect.height === 0)) {
      ret.nearRect = ret.edge;
      ret.insertType = 'after';
      ret.vertical = isVertical(ret.nearRect);
    } else {
      ret.insertType = pos;
      ret.vertical = align ? align === 'V' : isVertical(ret.nearRect);
    }
    return ret;
  }

  // from outline-tree: has index, but no near
  // TODO: think of shadowNode & ConditionFlow
  const { index } = detail;
  if (index == null) {
    ret.coverRect = ret.edge;
    ret.insertType = 'cover';
    return ret;
  }
  let nearNode = container.children.get(index);
  if (!nearNode) {
    // index = 0, eg. nochild,
    nearNode = container.children.get(index > 0 ? index - 1 : 0);
    if (!nearNode) {
      ret.insertType = 'cover';
      ret.coverRect = edge;
      return ret;
    }
    ret.insertType = 'after';
  }
  if (nearNode) {
    ret.nearRect = sim.computeRect(nearNode);
    if (!ret.nearRect || (ret.nearRect.width === 0 && ret.nearRect.height === 0)) {
      ret.nearRect = ret.edge;
      ret.insertType = 'after';
    }
    ret.vertical = isVertical(ret.nearRect);
    ret.nearNode = nearNode;
  } else {
    ret.insertType = 'cover';
    ret.coverRect = edge;
  }
  return ret;
}

/**
 * Convert detail info into page "coordinate" info
 */
function processDetail({ target, detail, document }: DropLocation): InsertionData {
  const sim = document.simulator;
  if (!sim) {
    return {};
  }
  if (isLocationChildrenDetail(detail)) {
    return processChildrenDetail(sim, target, detail);
  } else {
    // TODO: others...
    const instances = sim.getComponentInstances(target);
    if (!instances) {
      return {};
    }
    const edge = sim.computeComponentInstanceRect(instances[0], target.componentMeta.rootSelector);
    return edge ? { edge, insertType: 'cover', coverRect: edge } : {};
  }
}

@observer
export class InsertionView extends Component<{ host: BuiltinSimulatorHost }> {
  render() {
    const { host } = this.props;
    const loc = host.currentDocument?.dropLocation;
    if (!loc) {
      return null;
    }
    // Absolute-positioned containers do not need an insertion marker
    if (loc.target?.componentMeta?.advanced.isAbsoluteLayoutContainer) {
      return null;
    }

    const { scale, scrollX, scrollY } = host.viewport;
    const { edge, insertType, coverRect, nearRect, vertical, nearNode } = processDetail(loc);

    if (!edge) {
      return null;
    }

    let className = 'lc-insertion';
    if ((loc.detail as any)?.valid === false) {
      className += ' invalid';
    }
    const style: any = {};
    let x: number;
    let y: number;
    if (insertType === 'cover') {
      className += ' cover';
      x = (coverRect!.left + scrollX) * scale;
      y = (coverRect!.top + scrollY) * scale;
      style.width = coverRect!.width * scale;
      style.height = coverRect!.height * scale;
    } else {
      if (!nearRect) {
        return null;
      }
      if (vertical) {
        className += ' vertical';
        x = ((insertType === 'before' ? nearRect.left : nearRect.right) + scrollX) * scale;
        y = (nearRect.top + scrollY) * scale;
        style.height = nearRect!.height * scale;
      } else {
        x = (nearRect.left + scrollX) * scale;
        y = ((insertType === 'before' ? nearRect.top : nearRect.bottom) + scrollY) * scale;
        style.width = nearRect.width * scale;
      }
      if (y === 0 && (nearNode as IPublicTypeNodeSchema)?.componentMeta?.isTopFixed) {
        return null;
      }
    }
    style.transform = `translate3d(${x}px, ${y}px, 0)`;
    // style.transition = 'all 0.2s ease-in-out';

    return <div className={className} style={style} />;
  }
}
