import store from 'store';

declare global {
  interface Window {
    __isDebug?: boolean;
    __newFunc?: (funcStr: string) => (...args: any[]) => any;
  }
}

// Set debug options from URL params
const debugRegRes = /_?debug=(.*?)(&|$)/.exec(location.search);
if (debugRegRes && debugRegRes[1]) {
  // eslint-disable-next-line no-underscore-dangle
  window.__isDebug = true;
  // @ts-ignore
  store.storage.write('debug', debugRegRes[1] === 'true' ? '*' : debugRegRes[1]);
} else {
  // eslint-disable-next-line no-underscore-dangle
  window.__isDebug = false;
  store.remove('debug');
}

// Important: corrects the window context used when the canvas runs new Function
// eslint-disable-next-line no-underscore-dangle
window.__newFunc = (funContext: string): ((...args: any[]) => any) => {
  // eslint-disable-next-line no-new-func
  return new Function(funContext) as (...args: any[]) => any;
};

// Warn before leaving the page; only takes effect after user interaction
window.onbeforeunload = function (e: Event): string {
  const ev = e || window.event;
  // Does not take effect in local debug
  if (location.href.indexOf('localhost') > 0) {
    return '';
  }
  const msg = 'Are you sure you want to leave this page?';
  ev.cancelBubble = true;
  ev.returnValue = true;
  if (e.stopPropagation) {
    e.stopPropagation();
    e.preventDefault();
  }
  return msg;
};
