import { IPublicModelDragon, IPublicModelDropLocation, IPublicModelScrollTarget, IPublicModelScroller, IPublicModelActiveTracker, IPublicModelClipboard } from '../model';
import { IPublicTypeLocationData, IPublicTypeScrollable } from '../type';

/**
 * canvas - Canvas API
 * @since v1.1.0
 */
export interface IPublicApiCanvas {

  /**
   * Create a scroll controller Scroller and give a view the basic ability to scroll.
   *
   * a Scroller is a controller that gives a view (IPublicTypeScrollable) the ability scrolling
   * to some cordination by api scrollTo.
   *
   * when a scroller is inited, will need to pass is a scrollable, which has a scrollTarget.
   * and when scrollTo(options: { left?: number; top?: number }) is called, scroller will
   * move scrollTarget`s top-left corner to (options.left, options.top) that passed in.
   * @since v1.1.0
   */
  createScroller(scrollable: IPublicTypeScrollable): IPublicModelScroller;

  /**
   * Create a ScrollTarget to work with Scroller, as described in createScroller
   *
   * this works with Scroller, refer to createScroller`s description
   * @since v1.1.0
   */
  createScrollTarget(shell: HTMLDivElement): IPublicModelScrollTarget;

  /**
   * Create a document insertion position object, which is used to describe the position of a node to be inserted in the document.
   *
   * create a drop location for document, drop location describes a location in document
   * @since v1.1.0
   */
  createLocation(locationData: IPublicTypeLocationData): IPublicModelDropLocation;

  /**
   * Get the instance of the drag operation object
   *
   * get dragon instance, you can use this to obtain draging related abilities and lifecycle hooks
   * @since v1.1.0
   */
  get dragon(): IPublicModelDragon | null;

  /**
   * Get activity tracker instance
   *
   * get activeTracker instance, which is a singleton running in engine.
   * it tracks document`s current focusing node/node[], and notify it`s subscribers that when
   * focusing node/node[] changed.
   * @since v1.1.0
   */
  get activeTracker(): IPublicModelActiveTracker | null;

  /**
   * Whether in LiveEditing state
   *
   * check if canvas is in liveEditing state
   * @since v1.1.0
   */
  get isInLiveEditing(): boolean;

  /**
   * Get global clipboard instance
   *
   * get clipboard instance
   *
   * @since v1.1.0
   */
  get clipboard(): IPublicModelClipboard;
}
