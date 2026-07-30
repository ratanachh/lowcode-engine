import { isFormEvent, compatibleLegaoSchema, getNodeSchemaById, isNodeSchema } from '@rchh/lowcode-utils';

export type NodeRemoveOptions = {
  suppressRemoveEvent?: boolean;
};

export const utils = {
  isNodeSchema,
  isFormEvent,
  compatibleLegaoSchema,
  getNodeSchemaById,
};

export enum EDITOR_EVENT {
  NODE_CHILDREN_CHANGE = 'node.children.change',

  NODE_VISIBLE_CHANGE = 'node.visible.change',
}

export type Utils = typeof utils;