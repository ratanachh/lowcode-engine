import { obx, computed, makeObservable } from '@rchh/lowcode-editor-core';
import { Point, ScrollTarget } from '../designer';
import { AutoFit, IViewport } from '../simulator';

export default class Viewport implements IViewport {
  @obx.ref private rect?: DOMRect;

  private _bounds?: DOMRect;
  private viewportElement?: HTMLElement;
  @obx.ref private _scale = 1;
  @obx.ref private _contentWidth: number | AutoFit = AutoFit;
  @obx.ref private _contentHeight: number | AutoFit = AutoFit;
  @obx.ref private _scrollX = 0;
  @obx.ref private _scrollY = 0;
  private _scrollTarget?: ScrollTarget;
  @obx private _scrolling = false;

  get bounds(): DOMRect {
    if (this._bounds) {
      return this._bounds;
    }
    this._bounds = this.viewportElement!.getBoundingClientRect();
    requestAnimationFrame(() => {
      this._bounds = undefined;
    });
    return this._bounds;
  }

  get contentBounds(): DOMRect {
    const { bounds, scale } = this;
    return new DOMRect(0, 0, bounds.width / scale, bounds.height / scale);
  }

  constructor() {
    makeObservable(this);
  }

  mount(viewportElement: HTMLElement | null) {
    if (!viewportElement || this.viewportElement === viewportElement) {
      return;
    }
    this.viewportElement = viewportElement;
    this.touch();
  }

  touch() {
    if (this.viewportElement) {
      this.rect = this.bounds;
    }
  }

  @computed get height(): number {
    if (!this.rect) {
      return 600;
    }
    return this.rect.height;
  }

  set height(newHeight: number) {
    this._contentHeight = newHeight / this.scale;
    if (this.viewportElement) {
      this.viewportElement.style.height = `${newHeight}px`;
      this.touch();
    }
  }

  @computed get width(): number {
    if (!this.rect) {
      return 1000;
    }
    return this.rect.width;
  }

  set width(newWidth: number) {
    this._contentWidth = newWidth / this.scale;
    if (this.viewportElement) {
      this.viewportElement.style.width = `${newWidth}px`;
      this.touch();
    }
  }

  /**
   * Scale ratio
   */
  @computed get scale(): number {
    return this._scale;
  }

  set scale(newScale: number) {
    if (isNaN(newScale) || newScale <= 0) {
      throw new Error(`invalid new scale "${newScale}"`);
    }

    this._scale = newScale;
    this._contentWidth = this.width / this.scale;
    this._contentHeight = this.height / this.scale;
  }

  @computed get contentHeight(): number | AutoFit {
    return this._contentHeight;
  }

  set contentHeight(newContentHeight: number | AutoFit) {
    this._contentHeight = newContentHeight;
  }

  @computed get contentWidth(): number | AutoFit {
    return this._contentWidth;
  }

  set contentWidth(val: number | AutoFit) {
    this._contentWidth = val;
  }

  get scrollX() {
    return this._scrollX;
  }

  get scrollY() {
    return this._scrollY;
  }

  /**
   * Scroll object
   */
  get scrollTarget(): ScrollTarget | undefined {
    return this._scrollTarget;
  }

  get scrolling(): boolean {
    return this._scrolling;
  }

  setScrollTarget(target: Window) {
    const scrollTarget = new ScrollTarget(target);
    this._scrollX = scrollTarget.left;
    this._scrollY = scrollTarget.top;

    let scrollTimer: any;
    target.addEventListener('scroll', () => {
      this._scrollX = scrollTarget.left;
      this._scrollY = scrollTarget.top;
      this._scrolling = true;
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }
      scrollTimer = setTimeout(() => {
        this._scrolling = false;
      }, 80);
    });
    target.addEventListener('resize', () => this.touch());
    this._scrollTarget = scrollTarget;
  }

  toGlobalPoint(point: Point): Point {
    if (!this.viewportElement) {
      return point;
    }

    const rect = this.bounds;
    return {
      clientX: point.clientX * this.scale + rect.left,
      clientY: point.clientY * this.scale + rect.top,
    };
  }

  toLocalPoint(point: Point): Point {
    if (!this.viewportElement) {
      return point;
    }

    const rect = this.bounds;
    return {
      clientX: (point.clientX - rect.left) / this.scale,
      clientY: (point.clientY - rect.top) / this.scale,
    };
  }
}
