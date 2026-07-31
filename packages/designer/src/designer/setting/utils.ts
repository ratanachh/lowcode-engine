// all this file for polyfill vision logic
import { isValidElement } from 'react';
import { IPublicTypeFieldConfig, IPublicTypeSetterConfig } from '@rchh/lowcode-types';
import { isSetterConfig, isDynamicSetter } from '@rchh/lowcode-utils';
import { ISettingField } from './setting-field';

function getHotterFromSetter(setter) {
  return setter && (setter.Hotter || (setter.type && setter.type.Hotter)) || []; // eslint-disable-line
}

function getTransducerFromSetter(setter) {
  return (
    (setter &&
      (setter.transducer ||
        setter.Transducer ||
        (setter.type && (setter.type.transducer || setter.type.Transducer)))) ||
    null
  ); // eslint-disable-line
}

function combineTransducer(transducer, arr, context) {
  if (!transducer && Array.isArray(arr)) {
    const [toHot, toNative] = arr;
    transducer = { toHot, toNative };
  }

  return {
    toHot: (transducer && transducer.toHot || (x => x)).bind(context), // eslint-disable-line
    toNative: (transducer && transducer.toNative || (x => x)).bind(context), // eslint-disable-line
  };
}

export class Transducer {
  setterTransducer: any;

  context: any;

  constructor(context: ISettingField, config: { setter: IPublicTypeFieldConfig['setter'] }) {
    let { setter } = config;

    // 1. validElement
    // 2. IPublicTypeSetterConfig
    // 3. IPublicTypeSetterConfig[]
    if (Array.isArray(setter)) {
      setter = setter[0];
    } else if (isValidElement(setter) && setter.type.displayName === 'MixedSetter') {
      setter = setter.props?.setters?.[0];
    } else if (typeof setter === 'object' && setter.componentName === 'MixedSetter') {
      setter = Array.isArray(setter?.props?.setters) && setter.props.setters[0];
    }

    /**
     * Two ways to mark as FC rather than dynamic setter
     * 1. Explicitly set false in material setter config
     * 2. Explicitly set false when registering via registerSetter
     */

    let isDynamic = true;

    if (isSetterConfig(setter)) {
      const { componentName, isDynamic: dynamicFlag } = setter as IPublicTypeSetterConfig;
      setter = componentName;
      isDynamic = dynamicFlag !== false;
    }
    if (typeof setter === 'string') {
      const { component, isDynamic: dynamicFlag } = context.setters.getSetter(setter) || {};
      setter = component;
      // If declared in material config but not in registerSetter, use material config
      isDynamic = dynamicFlag === undefined ? isDynamic : dynamicFlag !== false;
    }
    if (isDynamicSetter(setter) && isDynamic) {
      try {
        setter = setter.call(context.internalToShellField(), context.internalToShellField());
      } catch (e) { console.error(e); }
    }

    this.setterTransducer = combineTransducer(getTransducerFromSetter(setter), getHotterFromSetter(setter), context);
    this.context = context;
  }

  toHot(data) {
    return this.setterTransducer.toHot(data);
  }

  toNative(data) {
    return this.setterTransducer.toNative(data);
  }
}
