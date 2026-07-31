import {
  IPublicApiCanvas,
  IPublicModelDropLocation,
  IPublicModelScrollTarget,
  IPublicTypeScrollable,
  IPublicModelScroller,
  IPublicTypeLocationData,
  IPublicModelEditor,
  IPublicModelDragon,
  IPublicModelActiveTracker,
  IPublicModelClipboard,
} from '@rchh/lowcode-types';
import {
  ScrollTarget as InnerScrollTarget,
  IDesigner,
} from '@rchh/lowcode-designer';
import { editorSymbol, designerSymbol, nodeSymbol } from '../symbols';
import {
  Dragon as ShellDragon,
  DropLocation as ShellDropLocation,
  ActiveTracker as ShellActiveTracker,
  Clipboard as ShellClipboard,
  DropLocation,
} from '../model';

const clipboardInstanceSymbol = Symbol('clipboardInstace');

export class Canvas implements IPublicApiCanvas {
  private readonly [editorSymbol]: IPublicModelEditor;
  private readonly [clipboardInstanceSymbol]: IPublicModelClipboard;

  private get [designerSymbol](): IDesigner {
    return this[editorSymbol].get('designer') as IDesigner;
  }

  get dragon(): IPublicModelDragon | null {
    return ShellDragon.create(this[designerSymbol].dragon, this.workspaceMode);
  }

  get activeTracker(): IPublicModelActiveTracker | null {
    const activeTracker = new ShellActiveTracker(this[designerSymbol].activeTracker);
    return activeTracker;
  }

  get isInLiveEditing(): boolean {
    return Boolean(this[editorSymbol].get('designer')?.project?.simulator?.liveEditing?.editing);
  }

  get clipboard(): IPublicModelClipboard {
    return this[clipboardInstanceSymbol];
  }

  constructor(editor: IPublicModelEditor, readonly workspaceMode: boolean = false) {
    this[editorSymbol] = editor;
    this[clipboardInstanceSymbol] = new ShellClipboard();
  }

  createScrollTarget(shell: HTMLDivElement): IPublicModelScrollTarget {
    return new InnerScrollTarget(shell);
  }

  createScroller(scrollable: IPublicTypeScrollable): IPublicModelScroller {
    return this[designerSymbol].createScroller(scrollable);
  }

  /**
   * Create insertion location; consider moving into dragon
   */
  createLocation(locationData: IPublicTypeLocationData): IPublicModelDropLocation {
    return new DropLocation(this[designerSymbol].createLocation({
      ...locationData,
      target: (locationData.target as any)[nodeSymbol],
    }));
  }

  /**
   * @deprecated
   */
  get dropLocation() {
    return ShellDropLocation.create((this[designerSymbol] as any).dropLocation || null);
  }
}
