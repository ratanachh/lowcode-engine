export interface ChangeOptions {
  key?: string | number;
  prop?: any;
  node: Node;
  newValue: any;
  oldValue: any;
}

/**
 * Node Prop change event
 * @Deprecated Please Replace With InnerPropChange
 */
export const Change = 'node.prop.change';

/** Node Prop change event */
export const InnerChange = 'node.innerProp.change';