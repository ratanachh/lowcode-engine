import { IPublicEnumTransformStage } from '../enum';
import { IPublicTypeCompositeValue } from '../type';
import { IPublicModelNode } from './';

export interface IPublicModelProp<
  Node = IPublicModelNode
> {

  /**
   * id
   */
  get id(): string;

  /**
   * key value
   * get key of prop
   */
  get key(): string | number | undefined;

  /**
   * Returns the path of the current prop
   * get path of current prop
   */
  get path(): string[];

  /**
   * Returns the node instance it belongs to
   * get node instance, which this prop belongs to
   */
  get node(): Node | null;

  /**
   * When this prop represents a Slot, return the corresponding slotNode
   * return the slot node (only if the current prop represents a slot)
   * @since v1.1.0
   */
  get slotNode(): Node | undefined | null;

  /**
   * Whether it is Prop, always returns true
   * check if it is a prop or not, and of course always return true
   * @experimental
   */
  get isProp(): boolean;

  /**
   * Set value
   * set value for this prop
   * @param val
   */
  setValue(val: IPublicTypeCompositeValue): void;

  /**
   * Get value
   * get value of this prop
   */
  getValue(): any;

  /**
   * Remove value
   * remove value of this prop
   * @since v1.0.16
   */
  remove(): void;

  /**
   * export value
   * export schema
   * @param stage
   */
  exportSchema(stage: IPublicEnumTransformStage): IPublicTypeCompositeValue;
}
