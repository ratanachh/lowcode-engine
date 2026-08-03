const i18nConfig = {};

let locale = typeof navigator === 'object' && typeof navigator.language === 'string' ? navigator.language : 'zh-CN';

const getLocale = () => locale;

const setLocale = (target) => {
  locale = target;
};

const isEmptyVariables = (variables) =>
  (Array.isArray(variables) && variables.length === 0) ||
  (typeof variables === 'object' && (!variables || Object.keys(variables).length === 0));

// Perform variable substitution per the low-code spec
const format = (msg, variables) =>
  typeof msg === 'string' ? msg.replace(/\$?\{(\w+)\}/g, (match, key) => variables?.[key] ?? '') : msg;

const i18nFormat = ({ id, defaultMessage, fallback }, variables) => {
  const msg = i18nConfig[locale]?.[id] ?? i18nConfig[locale.replace('-', '_')]?.[id] ?? defaultMessage;
  if (msg == null) {
    console.warn('[i18n]: unknown message id: %o (locale=%o)', id, locale);
    return fallback === undefined ? `${id}` : fallback;
  }

  return format(msg, variables);
};

const i18n = (id, params) => {
  return i18nFormat({ id }, params);
};

// Inject i18n methods into the target object and context
const _inject2 = (target) => {
  target.i18n = i18n;
  target.getLocale = getLocale;
  target.setLocale = (locale) => {
    setLocale(locale);
    target.forceUpdate();
  };
  target._i18nText = (t) => {
    // Prefer corpus passed in directly
    const localMsg = t[locale] ?? t[String(locale).replace('-', '_')];
    if (localMsg != null) {
      return format(localMsg, t.params);
    }

    // Then fall back to project-level
    const projectMsg = i18nFormat({ id: t.key, fallback: null }, t.params);
    if (projectMsg != null) {
      return projectMsg;
    }

    // Finally fall back to the language from use or the default language
    return format(t[t.use || 'zh-CN'] ?? t.en_US, t.params);
  };

  // Inject into the context
  if (target._context && target._context !== target) {
    Object.assign(target._context, {
      i18n,
      getLocale,
      setLocale: target.setLocale,
    });
  }
};

export { getLocale, setLocale, i18n, i18nFormat, _inject2 };
