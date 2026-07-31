/* eslint-disable max-len */
import { EventEmitter } from 'events';
import StrictEventEmitter from 'strict-event-emitter-types';
import * as GlobalEvent from '../../event';
import { IPublicApiEvent } from '../api';
import { IPublicTypeEditorValueKey, IPublicTypeEditorGetOptions, IPublicTypeEditorGetResult, IPublicTypeEditorRegisterOptions, IPublicTypeAssetsJson } from '../type';

export interface IPublicModelEditor extends StrictEventEmitter<EventEmitter, GlobalEvent.EventConfig> {
  get: <T = undefined, KeyOrType = any>(
    keyOrType: KeyOrType,
    opt?: IPublicTypeEditorGetOptions
  ) => IPublicTypeEditorGetResult<T, KeyOrType> | undefined;

  has: (keyOrType: IPublicTypeEditorValueKey) => boolean;

  set: (key: IPublicTypeEditorValueKey, data: any) => void | Promise<void>;

  /**
   * Get keyOrType once
   */
  onceGot: <T = undefined, KeyOrType extends IPublicTypeEditorValueKey = any>(keyOrType: KeyOrType) => Promise<IPublicTypeEditorGetResult<T, KeyOrType>>;

  /**
   * Get keyOrType multiple times
   */
  onGot: <T = undefined, KeyOrType extends IPublicTypeEditorValueKey = any>(
    keyOrType: KeyOrType,
    fn: (data: IPublicTypeEditorGetResult<T, KeyOrType>) => void
  ) => () => void;

  /**
   * Listen for keyOrType changes
   */
  onChange: <T = undefined, KeyOrType extends IPublicTypeEditorValueKey = any>(
    keyOrType: KeyOrType,
    fn: (data: IPublicTypeEditorGetResult<T, KeyOrType>) => void
  ) => () => void;

  register: (data: any, key?: IPublicTypeEditorValueKey, options?: IPublicTypeEditorRegisterOptions) => void;

  get eventBus(): IPublicApiEvent;

  setAssets(assets: IPublicTypeAssetsJson): void;
}
