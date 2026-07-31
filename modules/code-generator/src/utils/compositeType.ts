import {
  IPublicTypeCompositeArray,
  IPublicTypeCompositeValue,
  IPublicTypeCompositeObject,
  IPublicTypeJSFunction,
  IPublicTypeJSExpression,
  isJSExpression,
  isJSFunction,
  isJSSlot,
  IPublicTypeJSSlot,
} from '@rchh/lowcode-types';
import _ from 'lodash';

import { IScope, CompositeValueGeneratorOptions, CodeGeneratorError } from '../types';
import { generateExpression, generateFunction } from './jsExpression';
import { generateJsSlot } from './jsSlot';
import { executeFunctionStack } from './aopHelper';
import { parseExpressionGetKeywords } from './expressionParser';
import { isJSExpressionFn } from './common';

interface ILegaoVariable {
  type: 'variable';
  value: string;
  variable: string;
}

function isVariable(v: any): v is ILegaoVariable {
  if (_.isObject(v) && (v as ILegaoVariable).type === 'variable') {
    return true;
  }
  return false;
}

interface DataSource {
  type: 'DataSource';
  id: string;
}

/**
 * Whether it is a data source type
 */
function isDataSource(v: unknown): v is DataSource {
  return typeof v === 'object' && v != null && (v as Partial<DataSource>).type === 'DataSource';
}

function generateArray(
  value: IPublicTypeCompositeArray,
  scope: IScope,
  options: CompositeValueGeneratorOptions = {},
): string {
  const body = value.map((v) => generateUnknownType(v, scope, options)).join(',');
  return `[${body}]`;
}

function generateObject(
  value: IPublicTypeCompositeObject,
  scope: IScope,
  options: CompositeValueGeneratorOptions = {},
): string {
  if (value.type === 'i18n') {
    // params may bind variables; handle that here
    if (value.params && typeof value.params === 'object') {
      return `this._i18nText(${generateUnknownType(_.omit(value, 'type'), scope, options)})`;
    }
    return `this._i18nText(${JSON.stringify(_.omit(value, 'type'))})`; // TODO: Optimization: consider extracting this as a constant...
  }

  const body = Object.keys(value)
    .map((key) => {
      const propName = JSON.stringify(key);
      const v = generateUnknownType(value[key], scope, options);
      return `${propName}: ${v}`;
    })
    .join(',\n');

  return `{${body}}`;
}

function generateString(value: string): string {
  // Some strings contain special characters (newlines, quotes, etc.); use JSON string escaping and wrap with double quotes
  return JSON.stringify(value);
}

function generateNumber(value: number): string {
  return String(value);
}

function generateBool(value: boolean): string {
  return value ? 'true' : 'false';
}

function genFunction(value: IPublicTypeJSFunction): string {
  const globalVars = parseExpressionGetKeywords(value.value);

  if (globalVars.includes('arguments')) {
    return generateFunction(value, { isBindExpr: true });
  }

  return generateFunction(value, { isArrow: true });
}

function genJsSlot(value: IPublicTypeJSSlot, scope: IScope, options: CompositeValueGeneratorOptions = {}) {
  if (options.nodeGenerator) {
    return generateJsSlot(value, scope, options.nodeGenerator);
  }
  return '';
}

function generateUnknownType(
  value: IPublicTypeCompositeValue,
  scope: IScope,
  options: CompositeValueGeneratorOptions = {},
): string {
  if (_.isUndefined(value)) {
    return 'undefined';
  }

  if (_.isNull(value)) {
    return 'null';
  }

  if (_.isArray(value)) {
    if (options.handlers?.array) {
      return executeFunctionStack(value, scope, options.handlers.array, generateArray, options);
    }
    return generateArray(value, scope, options);
  }

  // FIXME: This is a temporary solution
  // When encountering the private type "variable", convert to JSExpression
  if (isVariable(value)) {
    const transValue: IPublicTypeJSExpression = {
      type: 'JSExpression',
      value: value.variable,
    };

    if (options.handlers?.expression) {
      const expression = executeFunctionStack(
        transValue,
        scope,
        options.handlers.expression,
        generateExpression,
        options,
      );
      return expression || 'undefined';
    }
    return generateExpression(transValue, scope);
  }

  if (isJSExpression(value)) {
    if (options.handlers?.expression) {
      return executeFunctionStack(
        value,
        scope,
        options.handlers.expression,
        generateExpression,
        options,
      );
    }
    return generateExpression(value, scope);
  }

  if (isJSFunction(value) || isJSExpressionFn(value)) {
    if (options.handlers?.function) {
      return executeFunctionStack(value, scope, options.handlers.function, genFunction, options);
    }
    return genFunction(value);
  }

  if (isJSSlot(value)) {
    if (options.handlers?.slot) {
      return executeFunctionStack(value, scope, options.handlers.slot, genJsSlot, options);
    }
    return genJsSlot(value, scope, options);
  }

  if (isDataSource(value)) {
    return generateUnknownType(
      {
        type: 'JSExpression',
        value: `this.dataSourceMap[${JSON.stringify(value.id)}]`,
      },
      scope,
      options,
    );
  }

  if (_.isObject(value)) {
    if (options.handlers?.object) {
      return executeFunctionStack(value, scope, options.handlers.object, generateObject, options);
    }
    return generateObject(value as IPublicTypeCompositeObject, scope, options);
  }

  if (_.isString(value)) {
    if (options.handlers?.string) {
      return executeFunctionStack(value, scope, options.handlers.string, generateString, options);
    }
    return generateString(value);
  }

  if (_.isNumber(value)) {
    if (options.handlers?.number) {
      return executeFunctionStack(value, scope, options.handlers.number, generateNumber, options);
    }
    return generateNumber(value);
  }

  if (_.isBoolean(value)) {
    if (options.handlers?.boolean) {
      return executeFunctionStack(value, scope, options.handlers.boolean, generateBool, options);
    }
    return generateBool(value);
  }

  throw new CodeGeneratorError('Meet unknown composite value type');
}

// This layer once wrapped the outermost output, but wrapping should not belong here
// Keep this layer for now as redundancy for later refactor
export function generateCompositeType(
  value: IPublicTypeCompositeValue,
  scope: IScope,
  options: CompositeValueGeneratorOptions = {},
): string {
  const result = generateUnknownType(value, scope, options);
  return result;
}
