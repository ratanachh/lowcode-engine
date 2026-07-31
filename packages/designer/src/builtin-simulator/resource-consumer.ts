import { autorun, makeObservable, obx, createModuleEventBus, IEventBus } from '@rchh/lowcode-editor-core';
import { BuiltinSimulatorHost } from './host';
import { BuiltinSimulatorRenderer, isSimulatorRenderer } from './renderer';

const UNSET = Symbol('unset');
export type MasterProvider = (master: BuiltinSimulatorHost) => any;
export type RendererConsumer<T> = (renderer: BuiltinSimulatorRenderer, data: T) => Promise<any>;

// master process
//  0. init this object; change responses happen in the master process
//  1. provide consumable data or a data provider (e.g. Asset); non-providers keep providing
//  2. receive success notification
// renderer process
//  1. continuously consume and watch data
//  2. consume

// Two customization points here
//  1. consumed data protocol
//  2. consumption mechanism (renderer-defined + passed in)

export default class ResourceConsumer<T = any> {
  private emitter: IEventBus = createModuleEventBus('ResourceConsumer');

  @obx.ref private _data: T | typeof UNSET = UNSET;

  private _providing?: () => void;

  private _consuming?: () => void;

  private _firstConsumed = false;

  private resolveFirst?: (resolve?: any) => void;

  constructor(provider: () => T, private consumer?: RendererConsumer<T>) {
    makeObservable(this);
    this._providing = autorun(() => {
      this._data = provider();
    });
  }

  consume(consumerOrRenderer: BuiltinSimulatorRenderer | ((data: T) => any)) {
    if (this._consuming) {
      return;
    }
    let consumer: (data: T) => any;
    if (isSimulatorRenderer(consumerOrRenderer)) {
      if (!this.consumer) {
        // TODO: throw error
        return;
      }
      const rendererConsumer = this.consumer!;

      consumer = (data) => rendererConsumer(consumerOrRenderer, data);
    } else {
      consumer = consumerOrRenderer;
    }
    this._consuming = autorun(async () => {
      if (this._data === UNSET) {
        return;
      }
      await consumer(this._data);
      // TODO: catch error and report
      if (this.resolveFirst) {
        this.resolveFirst();
      } else {
        this._firstConsumed = true;
      }
    });
  }

  dispose() {
    if (this._providing) {
      this._providing();
    }
    if (this._consuming) {
      this._consuming();
    }
    this.emitter.removeAllListeners();
  }

  waitFirstConsume(): Promise<any> {
    if (this._firstConsumed) {
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      this.resolveFirst = resolve;
    });
  }
}
