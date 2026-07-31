import _ from 'lodash';
import { pipe } from 'fp-ts/function';
import { IPublicTypeNodeSchema, isNodeSchema, IPublicTypeNodeDataType, IPublicTypeCompositeValue } from '@rchh/lowcode-types';

import {
  IScope,
  CodeGeneratorError,
  PIECE_TYPE,
  CodePiece,
  NodeGenerator,
  NodeGeneratorConfig,
  NodePlugin,
  AttrData,
} from '../types';

import { generateCompositeType } from './compositeType';
import { getStaticExprValue } from './common';
import { executeFunctionStack } from './aopHelper';
import { encodeJsxStringNode } from './encodeJsxAttrString';
import { unwrapJsExprQuoteInJsx } from './jsxHelpers';
import { transformThis2Context } from '../core/jsx/handlers/transformThis2Context';
import { isValidIdentifier } from './validate';

function mergeNodeGeneratorConfig(
  cfg1: NodeGeneratorConfig,
  cfg2: NodeGeneratorConfig = {},
): NodeGeneratorConfig {
  const resCfg: NodeGeneratorConfig = {};
  if (cfg1.handlers || cfg2.handlers) {
    resCfg.handlers = {
      ...(cfg1.handlers || {}),
      ...(cfg2.handlers || {}),
    };
  }

  if (cfg1.tagMapping || cfg2.tagMapping) {
    resCfg.tagMapping = cfg2.tagMapping || cfg1.tagMapping;
  }

  if (cfg1.attrPlugins || cfg2.attrPlugins) {
    resCfg.attrPlugins = [];
    resCfg.attrPlugins.push(...(cfg2.attrPlugins || []));
    resCfg.attrPlugins.push(...(cfg1.attrPlugins || []));
  }

  if (cfg1.nodePlugins || cfg2.nodePlugins) {
    resCfg.nodePlugins = [];
    resCfg.nodePlugins.push(...(cfg2.nodePlugins || []));
    resCfg.nodePlugins.push(...(cfg1.nodePlugins || []));
  }

  return resCfg;
}

export function isPureString(v: string) {
  // FIXME: Current approach is not rigorous enough
  return (v[0] === "'" && v[v.length - 1] === "'") || (v[0] === '"' && v[v.length - 1] === '"');
}

function generateAttrValue(
  attrData: { attrName: string; attrValue: IPublicTypeCompositeValue },
  scope: IScope,
  config?: NodeGeneratorConfig,
): CodePiece[] {
  const valueStr = generateCompositeType(attrData.attrValue, scope, {
    handlers: config?.handlers,
    nodeGenerator: config?.self,
  });
  return [
    {
      type: PIECE_TYPE.ATTR,
      name: attrData.attrName,
      value: valueStr,
    },
  ];
}

function generateAttr(
  attrName: string,
  attrValue: IPublicTypeCompositeValue,
  scope: IScope,
  config?: NodeGeneratorConfig,
): CodePiece[] {
  let pieces: CodePiece[];
  if (config?.attrPlugins) {
    pieces = executeFunctionStack<AttrData, CodePiece[], NodeGeneratorConfig>(
      { attrName, attrValue },
      scope,
      config.attrPlugins,
      generateAttrValue,
      config,
    );
  } else {
    pieces = generateAttrValue({ attrName, attrValue }, scope, config);
  }

  pieces = pieces.map((p) => {
    // FIXME: After generateCompositeType, you can no longer tell from the input type whether the output is a pure literal string (it may be wrapped)
    //        Best approach is to parse the output and choose the Attr value template accordingly
    let newValue: string;
    if (p.value && isPureString(p.value)) {
      // May look redundant; the goal is handling strings with different quote types and correct escaping
      const content = getStaticExprValue<string>(p.value);
      newValue = JSON.stringify(encodeJsxStringNode(content));
    } else {
      newValue = `{${p.value}}`;
    }

    return {
      value: `${p.name}=${newValue}`,
      type: PIECE_TYPE.ATTR,
    };
  });

  return pieces;
}

function generateAttrs(
  nodeItem: IPublicTypeNodeSchema,
  scope: IScope,
  config?: NodeGeneratorConfig,
): CodePiece[] {
  const { props } = nodeItem;

  let pieces: CodePiece[] = [];

  if (props) {
    if (!Array.isArray(props)) {
      Object.keys(props).forEach((propName: string) => {
        if (isValidIdentifier(propName)) {
          pieces = pieces.concat(generateAttr(propName, props[propName] as IPublicTypeCompositeValue, scope, config));
        }
      });
    } else {
      props.forEach((prop) => {
        if (prop.name && isValidIdentifier(prop.name) && !prop.spread) {
          pieces = pieces.concat(generateAttr(prop.name, prop.value, scope, config));
        }

        // TODO: Handle spread case (<Xxx {...(something)}/>)
        // How is this described in the schema?
      });
    }
  }

  return pieces;
}

function generateBasicNode(
  nodeItem: IPublicTypeNodeSchema,
  scope: IScope,
  config?: NodeGeneratorConfig,
): CodePiece[] {
  const pieces: CodePiece[] = [];
  const tagName = (config?.tagMapping || _.identity)(nodeItem.componentName);

  pieces.push({
    value: tagName || '', // FIXME: type detection error
    type: PIECE_TYPE.TAG,
  });

  return pieces;
}

function generateSimpleNode(
  nodeItem: IPublicTypeNodeSchema,
  scope: IScope,
  config?: NodeGeneratorConfig,
): CodePiece[] {
  const basicParts = generateBasicNode(nodeItem, scope, config) || [];
  const attrParts = generateAttrs(nodeItem, scope, config) || [];
  const childrenParts: CodePiece[] = [];
  if (nodeItem.children && config?.self) {
    const childrenStr = config.self(nodeItem.children, scope);

    childrenParts.push({
      type: PIECE_TYPE.CHILDREN,
      value: childrenStr,
    });
  }

  return [...basicParts, ...attrParts, ...childrenParts];
}

function linkPieces(pieces: CodePiece[]): string {
  const tagsPieces = pieces.filter((p) => p.type === PIECE_TYPE.TAG);
  if (tagsPieces.length !== 1) {
    throw new CodeGeneratorError('Only one tag definition required', tagsPieces);
  }
  const tagName = tagsPieces[0].value;

  const beforeParts = pieces
    .filter((p) => p.type === PIECE_TYPE.BEFORE)
    .map((p) => p.value)
    .join('');

  const afterParts = pieces
    .filter((p) => p.type === PIECE_TYPE.AFTER)
    .map((p) => p.value)
    .join('');

  const childrenParts = pieces
    .filter((p) => p.type === PIECE_TYPE.CHILDREN)
    .map((p) => p.value)
    .join('');

  let attrsParts = pieces
    .filter((p) => p.type === PIECE_TYPE.ATTR)
    .map((p) => p.value)
    .join(' ');

  attrsParts = attrsParts ? ` ${attrsParts}` : '';

  if (childrenParts) {
    return `${beforeParts}<${tagName}${attrsParts}>${childrenParts}</${tagName}>${afterParts}`;
  }

  return `${beforeParts}<${tagName}${attrsParts} />${afterParts}`;
}

function generateNodeSchema(
  nodeItem: IPublicTypeNodeSchema,
  scope: IScope,
  config?: NodeGeneratorConfig,
): string {
  const pieces: CodePiece[] = [];
  if (config?.nodePlugins) {
    const res = executeFunctionStack<IPublicTypeNodeSchema, CodePiece[], NodeGeneratorConfig>(
      nodeItem,
      scope,
      config.nodePlugins,
      generateSimpleNode,
      config,
    );
    pieces.push(...res);
  } else {
    pieces.push(...generateSimpleNode(nodeItem, scope, config));
  }

  return linkPieces(pieces);
}

// TODO: Generate docs
// Build a child context for wrapped snippets, merging parent context and child additions. (How to handle multi-level context?)
// Create a new context and push same-named variables from the scope into it?
// export function createSubContext() {}

/**
 * JSX generation plugin: emit loop-related logic in React code mode
 * @type NodePlugin Extended
 *
 * @export
 * @param {IPublicTypeNodeSchema} nodeItem Current UI node
 * @returns {CodePiece[]} Related code pieces that implement the feature
 */
export function generateReactLoopCtrl(
  nodeItem: IPublicTypeNodeSchema,
  scope: IScope,
  config?: NodeGeneratorConfig,
  next?: NodePlugin,
): CodePiece[] {
  if (nodeItem.loop) {
    const tolerateEvalErrors = config?.tolerateEvalErrors ?? true;

    const loopItemName = nodeItem.loopArgs?.[0] || 'item';
    const loopIndexName = nodeItem.loopArgs?.[1] || 'index';

    // Create a new scope
    const subScope = scope.createSubScope([loopItemName, loopIndexName]);
    const pieces: CodePiece[] = next ? next(nodeItem, subScope, config) : [];

    // Generate loop variable expression
    const loopDataExpr = pipe(
      nodeItem.loop,
      // Convert JSExpression to JS expression code:
      (expr) => generateCompositeType(expr, scope, {
          handlers: config?.handlers,
          tolerateEvalErrors: false, // No try/catch needed inside; wrapping is added below
        }),
      // Convert this.xxx to __$$context.xxx:
      (expr) => transformThis2Context(expr, scope, { ignoreRootScope: true }),
      // If errors should be tolerated, wrap with try/catch (via helper __$$evalArray)
      (expr) => (tolerateEvalErrors ? `__$$evalArray(() => (${expr}))` : expr),
    );

    pieces.unshift({
      value: `(${loopDataExpr}).map((${loopItemName}, ${loopIndexName}) => ((__$$context) => (`,
      type: PIECE_TYPE.BEFORE,
    });

    pieces.push({
      value: `))(__$$createChildContext(__$$context, { ${loopItemName}, ${loopIndexName} })))`,
      type: PIECE_TYPE.AFTER,
    });

    return pieces;
  }

  return next ? next(nodeItem, scope, config) : [];
}

/**
 * JSX generation plugin: emit condition-related logic in React code mode
 * @type NodePlugin
 *
 * @export
 * @param {IPublicTypeNodeSchema} nodeItem Current UI node
 * @returns {CodePiece[]} Related code pieces that implement the feature
 */
export function generateConditionReactCtrl(
  nodeItem: IPublicTypeNodeSchema,
  scope: IScope,
  config?: NodeGeneratorConfig,
  next?: NodePlugin,
): CodePiece[] {
  const pieces: CodePiece[] = next ? next(nodeItem, scope, config) : [];

  if (nodeItem.condition != null && nodeItem.condition !== true) {
    const value = generateCompositeType(nodeItem.condition, scope, {
      handlers: config?.handlers,
    });

    pieces.unshift({
      value: `!!(${value}) && (`,
      type: PIECE_TYPE.BEFORE,
    });

    pieces.push({
      value: ')',
      type: PIECE_TYPE.AFTER,
    });
  }

  return pieces;
}

/**
 * JSX generation plugin: in React mode, wrap expression node output with { Expression }
 * @type NodePlugin
 *
 * @export
 * @param {IPublicTypeNodeSchema} nodeItem Current UI node
 * @returns {CodePiece[]} Related code pieces that implement the feature
 */
export function generateReactExprInJS(
  nodeItem: IPublicTypeNodeSchema,
  scope: IScope,
  config?: NodeGeneratorConfig,
  next?: NodePlugin,
): CodePiece[] {
  const pieces: CodePiece[] = next ? next(nodeItem, scope, config) : [];

  if ((nodeItem.condition != null && nodeItem.condition !== true) || nodeItem.loop != null) {
    pieces.unshift({
      value: '{',
      type: PIECE_TYPE.BEFORE,
    });

    pieces.push({
      value: '}',
      type: PIECE_TYPE.AFTER,
    });
  }

  return pieces;
}

const handleChildren = (v: string[]) => v.join('');

export function createNodeGenerator(cfg: NodeGeneratorConfig = {}): NodeGenerator<string> {
  const generateNode = (nodeItem: IPublicTypeNodeDataType, scope: IScope): string => {
    if (_.isArray(nodeItem)) {
      const resList = nodeItem.map((n) => generateNode(n, scope));
      return handleChildren(resList);
    }

    if (isNodeSchema(nodeItem)) {
      return generateNodeSchema(nodeItem, scope, {
        ...cfg,
        self: generateNode,
      });
    }

    const valueStr = generateCompositeType(nodeItem, scope, {
      handlers: cfg.handlers,
      nodeGenerator: generateNode,
    });

    if (isPureString(valueStr)) {
      return encodeJsxStringNode(getStaticExprValue<string>(valueStr));
    }

    return `{${valueStr}}`;
  };

  return (nodeItem: IPublicTypeNodeDataType, scope: IScope) => unwrapJsExprQuoteInJsx(generateNode(nodeItem, scope));
}

const defaultReactGeneratorConfig: NodeGeneratorConfig = {
  nodePlugins: [generateReactExprInJS, generateReactLoopCtrl, generateConditionReactCtrl],
};

export function createReactNodeGenerator(cfg?: NodeGeneratorConfig): NodeGenerator<string> {
  const newCfg = mergeNodeGeneratorConfig(defaultReactGeneratorConfig, cfg);

  return createNodeGenerator(newCfg);
}
