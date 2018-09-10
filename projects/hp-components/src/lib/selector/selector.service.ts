import { Injectable, Renderer2, OnDestroy, ComponentFactoryResolver, Injector} from '@angular/core';
import { Rect, Point } from '../scripts/math';
import * as dom from '../scripts/dom';
import { SizeService } from '../services/size.service';
import { DragService } from '../services/drag.service';
import { SelectorComponent } from './selector.component';

export interface ISelector {
  selectorEl: HTMLElement;
  overlay: HTMLElement;
  clientEl: HTMLElement;
}

export enum SelectionState {
  Draggable,
  Sizable,
  Idle
}

export enum NudgeType {
  Overlay,
  Selector
}

@Injectable()
export class SelectorService implements OnDestroy {
  private _lassoSelector: HTMLElement = null;
  private _selectors = new Array<ISelector>();

  scale: number;
  lassoCursor = 'crosshair';
  renderer: Renderer2;
  parent: HTMLElement;
  shouldAllowSizing = true;
  isLassoSelectable = true;

  private _activeSelector: ISelector;
  get activeSelector(): ISelector {
    return this._activeSelector;
  }

  private _state: SelectionState;
  public get state(): SelectionState {
    return this._state;
  }
  public set state(value: SelectionState) {
    if (value !== this._state) {
      this._state = value;
      if (this.state !== SelectionState.Idle) {
        this.createSelectionOverlays();
      }
    }
  }

  get hasLasso(): boolean {
    return this._lassoSelector !== null;
  }

  get hasElementSelectors(): boolean {
    return Array.from(this._selectors.entries()).length > 0;
  }

  get selectors(): ISelector[] {
    return this._selectors;
  }

  /**
   * Represents all selector elements hovering above the captured elements
   */
  get selectorElements(): HTMLElement[] {
    return this.selectors.map(x => x.selectorEl);
  }

  /**
   * Represents all the captured elements
   *
   */
  get clients(): HTMLElement[] {
    return this.selectors.map(x => x.clientEl);
  }

  constructor(
    private _sizeService: SizeService,
    private _dragService: DragService,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _injector: Injector
  ) {}

  createlassoSelector(left: number, top: number) {
    this.clearSelectors();
    if (this.isLassoSelectable) {
      const selector = this.createSelector(left, top, this.parent);
      this.renderer.setStyle(this.parent, 'cursor', this.lassoCursor);
      this.renderer.addClass(selector, 'lasso-selector');
      this._lassoSelector = selector;
    }
  }

  removelassoSelector() {
    if (this._lassoSelector) {
      this.renderer.removeChild(this.parent, this._lassoSelector);
      this._lassoSelector = null;
    }
  }

  selectorAtPoint(point: Point): ISelector {
    for (let index = 0; index < this.selectors.length; index++) {
      const selector = this.selectors[index];
      const element = selector.selectorEl;
      const elRect = element.getBoundingClientRect();
      const rect = new Rect(
        elRect.left,
        elRect.top,
        elRect.width,
        elRect.height
      );
      if (dom.pointInRect(point, rect)) {
        return selector;
      }
    }
  }

  selectCapturedElements() {
    const rect = dom.elementBounds(this._lassoSelector);
    const capturedElements = dom.elementsAtRect(this.parent, rect, [
      this._lassoSelector
    ]);
    capturedElements.forEach(el => {
      this.selectElement(el, false, this.shouldAllowSizing);
    });
    this.removelassoSelector();
  }

  unSelectElements() {
    this.clearSelectors();
  }

  unSelectElement(element: HTMLElement) {
    const selector = this.selectors.find(x => x.clientEl === element);
    if (selector) {
      this.clearSelector(selector);
    }
  }

  selectElement(element: HTMLElement, clearFirst = true, isSizable = true) {
    let selector = this.selectors.find(
      x =>
        x.selectorEl === element ||
        x.clientEl === element ||
        x.overlay === element
    );
    if (element.hasAttribute('gripKey')) {
      selector = this.selectors.find(
        x => x.selectorEl === element.parentElement.parentElement.parentElement
      );
      const cursor = getComputedStyle(element).cursor;
      this.renderer.setStyle(this.parent, 'cursor', cursor);
      this._sizeService.gripKey = element.getAttribute('gripKey');
      this.state = SelectionState.Sizable;
      return;
    }

    if (selector) {
      this.state = SelectionState.Idle;
      this._activeSelector = selector;
      return;
    }
    if (clearFirst) {
      this.clearSelectors();
    }
    const rect = dom.elementBounds(element);
    const selectorEl = this.createSelector(
      rect.left,
      rect.top,
      element.parentElement
    );
    selectorEl['isSelector'] = true;
    dom.assignBoundingRect(this.renderer, element, selectorEl);
    this.renderer.addClass(selectorEl, 'element-selector');
    selector = { clientEl: element, selectorEl: selectorEl, overlay: null };
    this._selectors.push(selector);
    this._activeSelector = selector;
    if (isSizable && this._sizeService.canSize(element)) {
      this._sizeService.addSizingGrips(selectorEl, this.renderer);
    }
    this.renderer.setStyle(this.parent, 'cursor', 'move');
    this.state = SelectionState.Idle;
  }

  createSelectionOverlays() {
    this.selectors.forEach(selector => {
      this._sizeService.removeSizingGrips(selector.selectorEl, this.renderer);
      if (selector.overlay) {
        this.renderer.removeChild(
          selector.selectorEl.parentElement,
          selector.overlay
        );
      }
      if (
        this.state === SelectionState.Sizable &&
        this._sizeService.canSize(selector.clientEl)
      ) {
        selector.overlay = this._sizeService.createSizingOverlay(
          selector.selectorEl,
          this.renderer
        );
      } else if (
        this.state === SelectionState.Draggable &&
        this._dragService.canDrag(selector.clientEl)
      ) {
        selector.overlay = this._dragService.createDragOverlay(
          selector.clientEl,
          this.renderer
        );
      }
      if (selector.overlay) {
        this.renderer.appendChild(
          selector.selectorEl.parentElement,
          selector.overlay
        );
      }
    });
  }

  createSelector(left: number, top: number, parent: Element): HTMLElement {
    const selector = this.renderer.createElement('div');
    this.renderer.appendChild(parent, selector);
    this.renderer.setStyle(selector, 'position', 'absolute');
    this.renderer.setStyle(selector, 'left', left + 'px');
    this.renderer.setStyle(selector, 'top', top + 'px');
    this.renderer.setStyle(selector, 'boxSizing', 'border-box');
    this.renderer.setStyle(selector, 'zIndex', '10000');
    return selector;
  }

  clearSelectors() {
    this.removelassoSelector();
    const selectors = Array.from(this._selectors.values());
    selectors.forEach(selector => {
      this.clearSelector(selector);
    });
    this._selectors = [];
  }

  clearSelector(selector: ISelector) {
    if (selector === this._activeSelector) {
      this._activeSelector = null;
    }
    this.renderer.removeChild(
      selector.selectorEl.parentElement,
      selector.selectorEl
    );
    if (selector.overlay) {
      this.renderer.removeChild(
        selector.overlay.parentElement,
        selector.overlay
      );
    }
  }

  resizeLasso(width: number, height: number, initialPos: Point) {
    if (height < 0) {
      height = Math.abs(height);
      const top = initialPos.y - height;
      this.renderer.setStyle(this._lassoSelector, 'top', top + 'px');
    }
    if (width < 0) {
      width = Math.abs(width);
      const left = initialPos.x - width;
      this.renderer.setStyle(this._lassoSelector, 'left', left + 'px');
    }
    this.renderer.setStyle(this._lassoSelector, 'height', height + 'px');
    this.renderer.setStyle(this._lassoSelector, 'width', width + 'px');
  }

  resizeSelectorsBy(delta: Point) {
    const selectors = this.selectors.map(x => x.selectorEl);
    this._sizeService.sizeElementsBy(delta, selectors, this.renderer);
  }

  resizeOverlaysBy(delta: Point) {
    const overlays = this.selectors.map(x => x.overlay);
    this._sizeService.sizeElementsBy(delta, overlays, this.renderer);
  }

  moveSelectorsBy(delta: Point) {
    const selectors = this.selectors.map(x => x.overlay);
    this._dragService.dragElementsBy(delta, selectors, this.renderer);
  }

  moveOverlaysBy(delta: Point) {
    const overlays = this.selectors.map(x => x.overlay);
    this._dragService.dragElementsBy(delta, overlays, this.renderer);
  }

  reselect() {
    const clients = this.clients;
    this.clearSelectors();
    clients.forEach(client => {
      this.selectElement(client, false, this.shouldAllowSizing);
    });
  }

  nudgeBy(delta: Point, nodgeType: NudgeType) {
    if (delta.x === 0 && delta.y === 0) {
      return;
    }
    if (this.state === SelectionState.Sizable) {
      if (nodgeType === NudgeType.Selector) {
        this.resizeSelectorsBy(delta);
      }
      if (nodgeType === NudgeType.Overlay) {
        this.resizeOverlaysBy(delta);
      }
    } else if (this.state === SelectionState.Draggable) {
      if (nodgeType === NudgeType.Selector) {
        this.moveSelectorsBy(delta);
      }
      if (nodgeType === NudgeType.Overlay) {
        this.moveOverlaysBy(delta);
      }
    } else {
      this.state = SelectionState.Draggable;
    }
  }

  ngOnDestroy(): void {
    this.clearSelectors();
    this.renderer = null;
    this.parent = null;
  }
}
