import { Component } from 'react';
import classNames from 'classnames';
import { observer } from '@rchh/lowcode-editor-core';
import { IDocumentModel } from './document-model';
import { BuiltinSimulatorHostView } from '../builtin-simulator';

@observer
export class DocumentView extends Component<{ document: IDocumentModel }> {
  render() {
    const { document } = this.props;
    const { simulatorProps } = document;
    const Simulator = document.designer.simulatorComponent || BuiltinSimulatorHostView;
    return (
      <div
        className={classNames('lc-document', {
          'lc-document-hidden': document.suspensed,
        })}
      >
        {/* This layer is reserved for future scaling */}
        <div className="lc-simulator-shell">
          <Simulator {...simulatorProps} />
        </div>
        <DocumentInfoView document={document} />
      </div>
    );
  }
}

class DocumentInfoView extends Component<{ document: IDocumentModel }> {
  render() {
    return null;
  }
}
