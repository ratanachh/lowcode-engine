/**
 * Describe tabs and categories in the component panel
 */

export interface IPublicTypeComponentSort {

  /**
   * Describe component panel tab items and their order, e.g. ["Featured", "Atomic"]
   */
  groupList?: string[];

  /**
   * Within the same tab, sections are distinguished by category; category order follows categoryList;
   */
  categoryList?: string[];
}
