import {
  BuiltinSimulatorHost,
} from '@rchh/lowcode-designer';
import { simulatorHostSymbol, nodeSymbol } from '../symbols';
import { IPublicApiSimulatorHost, IPublicModelNode, IPublicModelSimulatorRender } from '@rchh/lowcode-types';
import { SimulatorRender } from '../model/simulator-render';

export class SimulatorHost implements IPublicApiSimulatorHost {
  private readonly [simulatorHostSymbol]: BuiltinSimulatorHost;

  constructor(simulator: BuiltinSimulatorHost) {
    this[simulatorHostSymbol] = simulator;
  }

  static create(host: BuiltinSimulatorHost): IPublicApiSimulatorHost | null {
    if (!host) return null;
    return new SimulatorHost(host);
  }

  /**
   * Get contentWindow
   */
  get contentWindow(): Window | undefined {
    return this[simulatorHostSymbol].contentWindow;
  }

  /**
   * Get contentDocument
   */
  get contentDocument(): Document | undefined {
    return this[simulatorHostSymbol].contentDocument;
  }

  get renderer(): IPublicModelSimulatorRender | undefined {
    if (this[simulatorHostSymbol].renderer) {
      return SimulatorRender.create(this[simulatorHostSymbol].renderer);
    }

    return undefined;
  }

  /**
   * Set a host config value
   * @param key
   * @param value
   */
  set(key: string, value: any): void {
    this[simulatorHostSymbol].set(key, value);
  }

  /**
   * Get a host config value
   * @param key
   * @returns
   */
  get(key: string): any {
    return this[simulatorHostSymbol].get(key);
  }

  /**
   * scroll to specific node
   * @param node
   */
  scrollToNode(node: IPublicModelNode): void {
    this[simulatorHostSymbol].scrollToNode((node as any)[nodeSymbol]);
  }

  /**
   * Trigger component build and refresh the render canvas
   */
  rerender(): void {
    this[simulatorHostSymbol].rerender();
  }
}
