import { IPublicTypeNodeData, IPublicTypeCompositeValue, IPublicTypeNodeSchema } from './';

/**
 * Variable expression
 *
 * Access context via this inside the expression
 */
export interface IPublicTypeJSExpression {
  type: 'JSExpression';

  /**
   * Expression string
   */
  value: string;

  /**
   * Mock value
   *
   * @todo standard description pending
   */
  mock?: any;

  /**
   * Source code
   *
   * @todo standard description pending
   */
  compiled?: string;
}

/**
 * Event function type
 * @see https://lowcode-engine.cn/lowcode
 *
 * Keep input params consistent with original component props/lifecycle (React / mini-program), and bind all event functions to a unified context (this of the container)
 */
export interface IPublicTypeJSFunction {

  /**
   * Extra extension props, e.g. extType, events
   *
   * @todo standard description pending
   */
  [key: string]: any;

  type: 'JSFunction';

  /**
   * Function definition, or a direct function expression
   */
  value: string;

  /**
   * Source code
   *
   * @todo standard description pending
   */
  compiled?: string;

  /**
   * Mock value
   *
   * @todo standard description pending
   */
  mock?: any;
}

/**
 * Slot function type
 *
 * Typically used when a component prop is ReactNode or a Function that returns ReactNode.
 */
export interface IPublicTypeJSSlot {

  /**
   * type
   */
  type: 'JSSlot';

  /**
   * @todo standard description pending
   */
  title?: string;

  /**
   * @todo standard description pending
   */
  id?: string;

  /**
   * Function parameters when a component prop is a Function returning ReactNode
   *
   * Child nodes can access the corresponding params via this[paramName].
   */
  params?: string[];

  /**
   * Concrete value.
   */
  value?: IPublicTypeNodeData[] | IPublicTypeNodeData;

  /**
   * @todo standard description pending
   */
  name?: string;
}

/**
 * @deprecated
 *
 * @todo documentation pending
 */
export interface IPublicTypeJSBlock {
  type: 'JSBlock';
  value: IPublicTypeNodeSchema;
}

/**
 * JSON primitive types
 */
export type IPublicTypeJSONValue =
  | boolean
  | string
  | number
  | null
  | undefined
  | IPublicTypeJSONArray
  | IPublicTypeJSONObject;
export type IPublicTypeJSONArray = IPublicTypeJSONValue[];
export interface IPublicTypeJSONObject {
  [key: string]: IPublicTypeJSONValue;
}

export type IPublicTypeCompositeArray = IPublicTypeCompositeValue[];
export interface IPublicTypeCompositeObject<T = IPublicTypeCompositeValue> {
  [key: string]: IPublicTypeCompositeValue | T;
}