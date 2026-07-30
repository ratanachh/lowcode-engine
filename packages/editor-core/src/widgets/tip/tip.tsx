import { Component } from 'react';
import { IPublicTypeTipConfig } from '@rchh/lowcode-types';
import { uniqueId } from '@rchh/lowcode-utils';
import { postTip } from './tip-handler';

export class Tip extends Component<IPublicTypeTipConfig> {
  private id = uniqueId('tips$');

  componentWillUnmount() {
    postTip(this.id, null);
  }

  render() {
    postTip(this.id, this.props);
    return <meta data-role="tip" data-tip-id={this.id} />;
  }
}
