import { ReactElement, createElement, ReactType } from 'react';
import classNames from 'classnames';

const supportedEvents = [
  // MouseEvents
  {
    name: 'onClick',
    description: 'On click',
  },
  {
    name: 'onDoubleClick',
    description: 'On double click',
  },
  {
    name: 'onMouseDown',
    description: 'Mouse down',
  },
  {
    name: 'onMouseEnter',
    description: 'Mouse enter',
  },
  {
    name: 'onMouseMove',
    description: 'Mouse move',
  },
  {
    name: 'onMouseOut',
    description: 'Mouse out',
  },
  {
    name: 'onMouseOver',
    description: 'Mouse over',
  },
  {
    name: 'onMouseUp',
    description: 'Mouse up',
  },
  // Focus Events
  {
    name: 'onFocus',
    description: 'On focus',
    snippet: '',
  },
  {
    name: 'onBlur',
    description: 'On blur',
    snippet: '',
  },
  // Form Events
  {
    name: 'onChange',
    description: 'On change',
    snippet: '',
  },
  {
    name: 'onSelect',
    description: 'On select',
  },
  {
    name: 'onInput',
    description: 'On input',
    snippet: '',
  },
  {
    name: 'onReset',
    description: 'On reset',
    snippet: '',
  },
  {
    name: 'onSubmit',
    description: 'On submit',
    snippet: '',
  },
  // Clipboard Events
  {
    name: 'onCopy',
    description: 'On copy',
    snippet: '',
  },
  {
    name: 'onCut',
    description: 'On cut',
    snippet: '',
  },
  {
    name: 'onPaste',
    description: 'On paste',
    snippet: '',
  },

  // Keyboard Events
  {
    name: 'onKeyDown',
    description: 'Key down',
    snippet: '',
  },
  {
    name: 'onKeyPress',
    description: 'Key press',
    snippet: '',
  },
  {
    name: 'onKeyUp',
    description: 'Key up',
    snippet: '',
  },
  // Touch Events
  {
    name: 'onTouchCancel',
    description: 'Touch cancel',
    snippet: '',
  },
  {
    name: 'onTouchEnd',
    description: 'Touch end',
    snippet: '',
  },
  {
    name: 'onTouchMove',
    description: 'Touch move',
    snippet: '',
  },
  {
    name: 'onTouchStart',
    description: 'Touch start',
    snippet: '',
  },
  // UI Events
  {
    name: 'onScroll',
    description: 'On scroll',
    snippet: '',
  },
  {
    name: 'onLoad',
    description: 'On load',
    snippet: '',
  },
  {
    name: 'onWheel',
    description: 'On wheel',
    snippet: '',
  },
  // Animation Events
  {
    name: 'onAnimationStart',
    description: 'Animation start',
  },
  {
    name: 'onAnimationEnd',
    description: 'Animation end',
  },
];

// eslint-disable-next-line func-call-spacing
const builtinComponents = new Map<string, (props: any) => ReactElement>();
function getBlockElement(tag: string): (props: any) => ReactElement {
  if (builtinComponents.has(tag)) {
    return builtinComponents.get(tag)!;
  }
  const mock = ({ className, children, ...rest }: any = {}) => {
    const props = {
      ...rest,
      className: classNames('lc-block-container', className),
    };
    return createElement(tag, props, children);
  };

  mock.metadata = {
    componentName: tag,
    // selfControlled: true,
    configure: {
      props: [],
      events: {
        supportedEvents,
      },
      styles: {
        supportClassName: true,
        supportInlineStyle: true,
      },
      component: {
        ...metasMap[tag],
      },
    },
  };

  builtinComponents.set(tag, mock);
  return mock;
}

const HTMLBlock = [
  'div',
  'p',
  'article',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'aside',
  'blockquote',
  'footer',
  'form',
  'header',
  'table',
  'tbody',
  'section',
  'ul',
  'li',
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HTMLInlineBlock = ['a', 'b', 'span', 'em'];
export function getIntrinsicMock(tag: string): ReactType {
  if (HTMLBlock.indexOf(tag) > -1) {
    return getBlockElement(tag);
  }

  return tag as any;
}

const metasMap: any = {
  div: {
    isContainer: true,
    nesting: {
      ancestorBlacklist: 'p',
    },
  },
  ul: {
    isContainer: true,
    nesting: {
      childWhitelist: 'li',
    },
  },
  p: {
    isContainer: true,
    nesting: {
      ancestorBlacklist: 'button,p',
    },
  },
  li: {
    isContainer: true,
    nesting: {
      parentWhitelist: 'ui,ol',
    },
  },
  span: {
    isContainer: true,
    selfControlled: true,
  },
  a: {
    isContainer: true,
    nesting: {
      ancestorBlacklist: 'a',
    },
  },
  b: {
    isContainer: true,
  },
  strong: {
    isContainer: true,
  },
  em: {
    isContainer: true,
  },
  i: {
    isContainer: true,
  },
  form: {
    isContainer: true,
    nestingRule: {
      ancestorBlacklist: 'form,button',
    },
  },
  table: {
    isContainer: true,
    nestingRule: {
      ancestorBlacklist: 'button',
    },
  },
  caption: {
    isContainer: true,
    selfControlled: true,
    nestingRule: {
      ancestorBlacklist: 'button',
    },
  },
  select: {
    isContainer: true,
    selfControlled: true,
    nestingRule: {
      ancestorBlacklist: 'button',
    },
  },
  button: {
    isContainer: true,
    nestingRule: {
      ancestorBlacklist: 'button',
    },
  },
  input: {
    isContainer: false,
    nestingRule: {
      ancestorBlacklist: 'button,h1,h2,h3,h4,h5,h6',
    },
  },
  textarea: {
    isContainer: false,
    nestingRule: {
      ancestorBlacklist: 'button',
    },
  },
  image: {
    isContainer: false,
  },
  canvas: {
    isContainer: false,
  },
  br: {
    isContainer: false,
  },
  h1: {
    isContainer: true,
    nestingRule: {
      ancestorBlacklist: 'p,h1,h2,h3,h4,h5,h6,button',
    },
  },
  h2: {
    isContainer: true,
    nestingRule: {
      ancestorBlacklist: 'p,h1,h2,h3,h4,h5,h6,button',
    },
  },
  h3: {
    isContainer: true,
    nestingRule: {
      ancestorBlacklist: 'p,h1,h2,h3,h4,h5,h6,button',
    },
  },
  h4: {
    isContainer: true,
    nestingRule: {
      ancestorBlacklist: 'p,h1,h2,h3,h4,h5,h6,button',
    },
  },
  h5: {
    isContainer: true,
    nestingRule: {
      ancestorBlacklist: 'p,h1,h2,h3,h4,h5,h6,button',
    },
  },
  h6: {
    isContainer: true,
    nestingRule: {
      ancestorBlacklist: 'p,h1,h2,h3,h4,h5,h6,button',
    },
  },
  article: {
    isContainer: true,
    nestingRule: {
      ancestorBlacklist: 'button',
    },
  },
  aside: {
    isContainer: true,
    nestingRule: {
      ancestorBlacklist: 'button',
    },
  },
  footer: {
    isContainer: true,
    nestingRule: {
      ancestorBlacklist: 'button',
    },
  },
  header: {
    isContainer: true,
    nestingRule: {
      ancestorBlacklist: 'button',
    },
  },
  blockquote: {
    isContainer: true,
    nestingRule: {
      ancestorBlacklist: 'button',
    },
  },
  address: {
    isContainer: true,
    nestingRule: {
      ancestorBlacklist: 'button',
    },
  },
  section: {
    isContainer: true,
    nestingRule: {
      ancestorBlacklist: 'p,h1,h2,h3,h4,h5,h6,button',
    },
  },
  summary: {
    isContainer: true,
    nestingRule: {
      ancestorBlacklist: 'button',
    },
  },
  nav: {
    isContainer: true,
    nestingRule: {
      ancestorBlacklist: 'button',
    },
  },
};
