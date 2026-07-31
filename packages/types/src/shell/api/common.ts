
import { Component, ReactNode } from 'react';
import { IPublicTypeI18nData, IPublicTypeNodeSchema, IPublicTypeTitleContent } from '../type';
import { IPublicEnumTransitionType } from '../enum';

export interface IPublicApiCommonUtils {

  /**
   * Whether it is a legal schema structure
   * check if data is valid NodeSchema
   *
   * @param {*} data
   * @returns {boolean}
   */
  isNodeSchema(data: any): boolean;

  /**
   * Whether it is a form event type
   * check if e is a form event
   * @param {(KeyboardEvent | MouseEvent)} e
   * @returns {boolean}
   */
  isFormEvent(e: KeyboardEvent | MouseEvent): boolean;

  /**
   * Find the specified id node from the schema structure
   * get node schema from a larger schema with node id
   * @param {IPublicTypeNodeSchema} schema
   * @param {string} nodeId
   * @returns {(IPublicTypeNodeSchema | undefined)}
   */
  getNodeSchemaById(
      schema: IPublicTypeNodeSchema,
      nodeId: string,
    ): IPublicTypeNodeSchema | undefined;

  // TODO: add comments
  getConvertedExtraKey(key: string): string;

  // TODO: add comments
  getOriginalExtraKey(key: string): string;

  /**
   * Batch transactions to optimize performance for specific scenarios
   * excute something in a transaction for performence
   *
   * @param {() => void} fn
   * @param {IPublicEnumTransitionType} type
   * @since v1.0.16
   */
  executeTransaction(fn: () => void, type: IPublicEnumTransitionType): void;

  /**
   * i18n related tools
   * i18n tools
   *
   * @param {(string | object)} instance
   * @returns {{
   *     intlNode(id: string, params?: object): ReactNode;
   *     intl(id: string, params?: object): string;
   *     getLocale(): string;
   *     setLocale(locale: string): void;
   *   }}
   * @since v1.0.17
   */
  createIntl(instance: string | object): {
    intlNode(id: string, params?: object): ReactNode;
    intl(id: string, params?: object): string;
    getLocale(): string;
    setLocale(locale: string): void;
  };

  /**
   * i18n conversion method
   */
  intl(data: IPublicTypeI18nData | string, params?: object): string;
}
export interface IPublicApiCommonSkeletonCabin {

  /**
   * Editor frame view
   * get Workbench Component
   */
  get Workbench(): Component;
}

export interface IPublicApiCommonEditorCabin {

  /**
   * Title component
   * @experimental unstable API, pay extra caution when trying to use this
   */
  get Tip(): React.ComponentClass<{}>;

  /**
   * Tip component
   * @experimental unstable API, pay extra caution when trying to use this
   */
  get Title(): React.ComponentClass<{
    title: IPublicTypeTitleContent | undefined;
    match?: boolean;
    keywords?: string | null;
  }>;
}

export interface IPublicApiCommonDesignerCabin {
}

export interface IPublicApiCommon {

  get utils(): IPublicApiCommonUtils;

  /**
   * @deprecated
   */
  get designerCabin(): IPublicApiCommonDesignerCabin;

  /**
   * @experimental unstable API, pay extra caution when trying to use this
   */
  get editorCabin(): IPublicApiCommonEditorCabin;

  get skeletonCabin(): IPublicApiCommonSkeletonCabin;
}
