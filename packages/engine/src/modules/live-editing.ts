import { EditingTarget, Node as DocNode, SaveHandler, LiveEditing } from '@rchh/lowcode-designer';
import { isJSExpression } from '@rchh/lowcode-utils';

function getText(node: DocNode, prop: string) {
  const p = node.getProp(prop, false);
  if (!p || p.isUnset()) {
    return null;
  }
  let v = p.getValue();
  if (isJSExpression(v)) {
    v = v.mock;
  }
  if (v == null) {
    return null;
  }
  if (p.type === 'literal') {
    return v;
  }
  return Symbol.for('not-literal');
}

export function liveEditingRule(target: EditingTarget) {
  // for vision components specific
  const { node, event } = target;

  const targetElement = event.target as HTMLElement;

  if (!Array.from(targetElement.childNodes).every((item) => item.nodeType === Node.TEXT_NODE)) {
    return null;
  }

  const { innerText } = targetElement;
  const propTarget = ['title', 'label', 'text', 'content', 'children'].find((prop) => {
    return equalText(getText(node, prop), innerText);
  });

  if (propTarget) {
    return {
      propElement: targetElement,
      propTarget,
    };
  }
  return null;
}

function equalText(v: any, innerText: string) {
  // TODO: enhance compare text logic
  if (typeof v !== 'string') {
    return false;
  }
  return v.trim() === innerText;
}

export const liveEditingSaveHander: SaveHandler = {
  condition: (prop) => {
    return prop.type === 'expression';
  },
  onSaveContent: (content, prop) => {
    const v = prop.getValue();
    let data = v;
    if (isJSExpression(v)) {
      data = v.mock;
    }
    data = content;
    if (isJSExpression(v)) {
      prop.setValue({
        type: 'JSExpression',
        value: v.value,
        mock: data,
      });
    } else {
      prop.setValue(data);
    }
  },
};
// TODO:
// Non-text editing
//  i18n data: change the current locale value
//  JSExpression: change mock or open variable binding

LiveEditing.addLiveEditingSpecificRule(liveEditingRule);
LiveEditing.addLiveEditingSaveHandler(liveEditingSaveHander);
