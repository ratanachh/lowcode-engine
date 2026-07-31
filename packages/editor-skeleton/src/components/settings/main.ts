import { Node, Designer, Selection, SettingTopEntry } from '@rchh/lowcode-designer';
import { Editor, obx, computed, makeObservable, action, IEventBus, createModuleEventBus } from '@rchh/lowcode-editor-core';

function generateSessionId(nodes: Node[]) {
  return nodes
    .map((node) => node.id)
    .sort()
    .join(',');
}

export class SettingsMain {
  private emitter: IEventBus = createModuleEventBus('SettingsMain');

  private _sessionId = '';

  @obx.ref private _settings?: SettingTopEntry;

  @computed get length(): number | undefined {
    return this._settings?.nodes.length;
  }

  @computed get componentMeta() {
    return this._settings?.componentMeta;
  }

  @computed get settings() {
    return this._settings;
  }

  private disposeListener: () => void;

  private designer?: Designer;

  constructor(readonly editor: Editor) {
    makeObservable(this);
    this.init();
  }

  private async init() {
    const setupSelection = (selection?: Selection) => {
      if (selection) {
        this.setup(selection.getNodes());
      } else {
        this.setup([]);
      }
    };
    this.editor.eventBus.on('designer.selection.change', setupSelection);
    this.disposeListener = () => {
      this.editor.removeListener('designer.selection.change', setupSelection);
    };
    const designer = await this.editor.onceGot('designer');
    this.designer = designer;
    setupSelection(designer.currentSelection);
  }

  @action
  private setup(nodes: Node[]) {
    // check nodes change
    const sessionId = generateSessionId(nodes);
    if (sessionId === this._sessionId) {
      return;
    }
    this._sessionId = sessionId;
    if (nodes.length < 1) {
      this._settings = undefined;
      return;
    }

    if (!this.designer) {
      this.designer = nodes[0].document.designer;
    }
    // When only one node is selected, reuse the settingEntry attached to the node so there are not two parallel instances; across the system,
    // there is only one SettingTopEntry instance per node, and later getProp() calls return the same SettingField instance
    if (nodes.length === 1) {
      this._settings = nodes[0].settingEntry;
    } else {
      this._settings = this.designer.createSettingEntry(nodes);
    }
  }

  purge() {
    this.disposeListener();
    this.emitter.removeAllListeners();
  }
}
