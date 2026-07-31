import { observer } from 'mobx-react';
import { configure } from 'mobx';

configure({ enforceActions: 'never' });

// Export common APIs directly; export the rest under the mobx namespace
export {
  observable as obx,
  observable,
  observe,
  autorun,
  makeObservable,
  makeAutoObservable,
  reaction,
  computed,
  action,
  runInAction,
  untracked,
} from 'mobx';
export type { IReactionDisposer, IReactionPublic, IReactionOptions } from 'mobx';

export * as mobx from 'mobx';
export { observer };
