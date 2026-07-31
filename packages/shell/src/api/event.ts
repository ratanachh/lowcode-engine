import { IEditor, IEventBus } from '@rchh/lowcode-editor-core';
import { getLogger, isPluginEventName } from '@rchh/lowcode-utils';
import { IPublicApiEvent, IPublicTypeDisposable } from '@rchh/lowcode-types';

const logger = getLogger({ level: 'warn', bizName: 'shell-event' });

type EventOptions = {
  prefix: string;
};

const eventBusSymbol = Symbol('eventBus');

export class Event implements IPublicApiEvent {
  private readonly [eventBusSymbol]: IEventBus;
  private readonly options: EventOptions;

  constructor(eventBus: IEventBus, options: EventOptions, public workspaceMode = false) {
    this[eventBusSymbol] = eventBus;
    this.options = options;
    if (!this.options.prefix) {
      logger.warn('prefix is required while initializing Event');
    }
  }

  /**
   * Listen to an event
   * @param event Event name
   * @param listener Event callback
   */
  on(event: string, listener: (...args: any[]) => void): IPublicTypeDisposable {
    if (isPluginEventName(event)) {
      return this[eventBusSymbol].on(event, listener);
    } else {
      logger.warn(`fail to monitor on event ${event}, event should have a prefix like 'somePrefix:eventName'`);
      return () => {};
    }
  }

  /**
   * Listen to an event; runs before other callbacks
   * @param event Event name
   * @param listener Event callback
   */
  prependListener(event: string, listener: (...args: any[]) => void): IPublicTypeDisposable {
    if (isPluginEventName(event)) {
      return this[eventBusSymbol].prependListener(event, listener);
    } else {
      logger.warn(`fail to prependListener event ${event}, event should have a prefix like 'somePrefix:eventName'`);
      return () => {};
    }
  }

  /**
   * Remove an event listener
   * @param event Event name
   * @param listener Event callback
   */
  off(event: string, listener: (...args: any[]) => void) {
    this[eventBusSymbol].off(event, listener);
  }

  /**
   * Emit an event
   * @param event Event name
   * @param args Event arguments
   * @returns
   */
  emit(event: string, ...args: any[]) {
    if (!this.options.prefix) {
      logger.warn('Event#emit has been forbidden while prefix is not specified');
      return;
    }
    this[eventBusSymbol].emit(`${this.options.prefix}:${event}`, ...args);
  }

  /**
   * DO NOT USE if u fully understand what this method does.
   * @param event
   * @param args
   */
  __internalEmit__(event: string, ...args: unknown[]) {
    this[eventBusSymbol].emit(event, ...args);
  }
}

export function getEvent(editor: IEditor, options: any = { prefix: 'common' }) {
  return new Event(editor.eventBus, options);
}
