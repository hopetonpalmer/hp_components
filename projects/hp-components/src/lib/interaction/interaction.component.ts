import {
  Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy,
  Input, Renderer2, ViewChild, ElementRef, Output, EventEmitter, OnDestroy,
   ViewContainerRef, ComponentFactoryResolver, AfterViewInit, AfterViewChecked, HostBinding, HostListener, ChangeDetectorRef
} from '@angular/core';
import { DragService } from '../services/drag.service';
import { SizeService } from '../services/size.service';
import { SelectorService, SelectionState, NudgeType } from '../selector/selector.service';
import * as dom from '../scripts/dom';
import { Point } from '../scripts/math';
import { InteractionService } from './interaction.service';
import { Subject, Observable, Subscription, BehaviorSubject } from 'rxjs';
import { ComposerService } from '../composer/composer.service';
import { Inspectable, Inspect } from '../decorator';
import * as shortid from 'shortid';
import { ResizeObserver } from 'resize-observer';
import { FlexibleConnectedPositionStrategy } from '@angular/cdk/overlay';


export type ICancellable = ( value: any )  => boolean;

/**
 * Handles selection, sizing, deletions, and dragging interactions with any child Element.
 */
@Inspectable({ displayName: 'Screen' })
@Component({
  selector: 'hpc-interaction',
  templateUrl: './interaction.component.html',
  styleUrls: ['./interaction.component.css', '../hp-components.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class InteractionComponent
  implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {
  private _isMouseDown = false;
  private _mouseDownPos = new Point();
  private _lastMousePos: Point;
  private _cursor: string;
  private _lastDropZone: Element;
  private _deleteSelectedElementsSubscription: Subscription;
  private _addElementSubscription: Subscription;
  private _addComponentSubscription: Subscription;

  @ViewChild('zoomContainer')
  private _zoomContainer: ElementRef;
  @ViewChild('viewContainer', { read: ViewContainerRef })
  viewContainer;
  @ViewChild('interactionHost')
  private _interactionElement: ElementRef;
  private _keyDownSubject = new Subject<KeyboardEvent>();

  get interactionElement(): HTMLElement {
    return this._interactionElement.nativeElement;
  }

  private _scale = 1;
  /**
   * Scale value to apply to the Interaction host element.  The value is applied
   * to both scaleX and scaleY of the host element.
   */
  @Input()
  set scale(value: number) {
    if (value !== this._scale) {
      let scale = parseFloat(value.toString());
      if (scale < this.scaleMin) {
        scale = this.scaleMin;
        value = scale;
      } else if (scale > this.scaleMax) {
        scale = this.scaleMax;
        value = scale;
      }
      this._scale = scale;
      this.sizeToScale();
      this.scaleChange.emit(value);
    }
  }

  get scale(): number {
    return this._scale;
  }

  @Input()
  scaleMin = 0.25;

  @Input()
  scaleMax = 2;

  /**
   * Determins if elements span when sized or dragged
   */
  @Input()
  snap = 0;

  /**
   * Gets or sets the minimum width of the element when drag-sized.
   */
  @Input()
  minSizingWidth = 1;

  /**
   * Gets or sets the minimum height of the element when drag-sized.
   */
  @Input()
  minSizingHeight = 1;

  /**
   * Determines if selectable elements can be selected by dragging around (lasso) them and releasing the pointer.
   */
  @Input()
  isLassoSelectable = true;

  /**
   * Determines if elements can be selected.
   */
  @Input()
  isSelectable = true;

  /**
   * Optionally set "checkers" background for the interaction host.  Useful when building IDE-like interactive UI.
   */
  @Input()
  isCheckersBackground = false;

  @Input()
  animateZoom = true;

  @Output()
  resizedElement = new EventEmitter<Element>();
  @Output()
  resizedElements = new EventEmitter<Element[]>();
  @Output()
  movedElement = new EventEmitter<Element>();
  @Output()
  movedElements = new EventEmitter<Element[]>();
  @Output()
  selectElement = new EventEmitter<Element>();
  @Output()
  scaleChange = new EventEmitter<number>();

  @Input()
  canDelete: ICancellable = () => true

  @Input()
  canDrop: ICancellable = () => true

  @Inspect({ propType: 'number' })
  set height(value: number) {
    this._renderer.setStyle(this.interactionElement, 'height', value + 'px');
  }
  get height(): number {
    const bounds = dom.elementBounds(this.interactionElement as Element);
    return bounds.height;
  }

  @Inspect({ propType: 'number' })
  set width(value: number) {
    this._renderer.setStyle(this.interactionElement, 'width', value + 'px');
  }
  get width(): number {
    const bounds = dom.elementBounds(this.interactionElement as Element);
    return bounds.width;
  }

  constructor(
    private _root: ElementRef,
    private _cdRef: ChangeDetectorRef,
    private _renderer: Renderer2,
    private _componentFactoryResolver: ComponentFactoryResolver,
    protected _composerService: ComposerService,
    private _dragService: DragService,
    private _sizeService: SizeService,
    private _interactionService: InteractionService,
    private _selectionService: SelectorService
  ) {
    this._selectionService.renderer = this._renderer;
    this._sizeService.renderer = this._renderer;
    this._dragService.renderer = this._renderer;
    this._interactionService.renderer = this._renderer;
    this._keyDownSubject.subscribe(e => this.keyDownHandler(e));
  }

  /**
   * Called when the keyboard key is released.
   * @param e KeyboardEvent
   */
  keyUp(e: KeyboardEvent) {
    if (e.code === 'Delete' && this._selectionService.selectors.length > 0) {
      this.deleteSelectedElements();
    }
  }

  /**
   * Called when the keyboard key is pressed.
   * @param e KeyboardEvent
   */
  keyPress(e) {
    if (this._selectionService.selectors.length > 0) {
      e.stopPropagation();
    }
  }

  /**
   * Called when the keyboard key is pressed.
   * @param e KeyboardEvent
   */
  keyDown(e: KeyboardEvent) {
    this._keyDownSubject.next(e);
  }

  keyDownHandler(e: KeyboardEvent) {
    // debounceTime(5000);
    /*    if (
      e.code !== 'Delete' &&
      e.code !== 'Escape' &&
      e.code !== 'ArrowLeft' &&
      e.code !== 'ArrowUp' &&
      e.code !== 'ArrowRight' &&
      e.code !== 'ArrowDown'
    ) {
      return;
    }*/
    if (this._selectionService.selectors.length > 0) {
      let delta: Point;
      const snap = this.snap ? this.snap : 1;
      if (e.code === 'Escape') {
        this.cancelSelection();
      }
      if (e.shiftKey) {
        if (e.ctrlKey) {
          switch (
            e.code
            /*         case 37:
              self.alignSelectedElements(AlignPosition.Left);
              break;
            case 38:
              self.alignSelectedElements(AlignPosition.Top);
              break;
            case 39:
              self.alignSelectedElements(AlignPosition.Right);
              break;
            case 40:
              self.alignSelectedElements(AlignPosition.Bottom);
              break; */
          ) {
          }
        } else {
          delta = new Point();
          switch (e.code) {
            case 'ArrowLeft':
              delta = new Point(-snap, 0);
              break;
            case 'ArrowUp':
              delta = new Point(0, -snap);
              break;
            case 'ArrowRight':
              delta = new Point(snap, 0);
              break;
            case 'ArrowDown':
              delta = new Point(0, snap);
              break;
          }
          this._sizeService.gripKey = 'keyboard';
          this._sizeService.sizeElementsBy(
            delta,
            this._selectionService.selectorElements
          );
          this._sizeService.sizeElementsBy(
            delta,
            this._selectionService.clients
          );
        }
      } else {
        delta = new Point();
        switch (e.code) {
          case 'ArrowLeft':
            delta = new Point(-snap, 0);
            break;
          case 'ArrowUp':
            delta = new Point(0, -snap);
            break;
          case 'ArrowRight':
            delta = new Point(snap, 0);
            break;
          case 'ArrowDown':
            delta = new Point(0, snap);
            break;
        }

        this._dragService.dragElementsBy(
          delta,
          this._selectionService.selectorElements
        );
        this._dragService.dragElementsBy(delta, this._selectionService.clients);
      }
    }
  }

  /**
   * Ensures that the default HTML5 dragging operations do not execute.
   */
  dragStart() {
    // -- prevent default drag
    return false;
  }

  mouseWheel(e: MouseWheelEvent) {
    this.scale = this.scale + e.deltaY / 1000;
  }

  @HostListener('click', ['$event'])
  hostClicked(event: Event) {
    if (event.target === this._root.nativeElement) {
      this._interactionService.unSelectAll();
    }
  }

  @HostListener('pointerup', ['$event'])
  hostPointerUp(event: PointerEvent) {
     this.pointerUp(event);
  }

  @HostListener('pointermove', ['$event'])
  hostPointerMove(event: PointerEvent) {
     this.pointerMove(event);
  }

  /**
   * Called when the pointer is moved.
   * @param e PointerEvent
   */
  pointerMove(e: PointerEvent) {
    e.preventDefault();
    if (this._isMouseDown) {
      let mousePos = this.getRelativePointerPos(e);
      if (this._selectionService.hasLasso) {
        const mouseDownPos = this._mouseDownPos;
        this._selectionService.resizeLasso(
          mousePos.x - mouseDownPos.x,
          mousePos.y - mouseDownPos.y,
          mouseDownPos
        );
      } else if (this._selectionService.selectors.length > 0) {
        const mouseChange = this.getPointerChange(e);
        this._selectionService.nudgeBy(mouseChange[0], NudgeType.Overlay);
        mousePos = mouseChange[1];
        this._lastDropZone = this._dragService.updateDropZone(
          this._selectionService.activeSelector.overlay,
          this.interactionElement,
          [this._selectionService.activeSelector.clientEl],
          this._lastDropZone
        );
      }
      this._lastMousePos = mousePos;
    } else {
      this.ensureCursor(e);
    }
  }

  /**
   * Called when the pointer is pressed.
   * @param e PointerEvent
   */
  pointerDown(e: PointerEvent) {
    if (!this.isCheckersBackground) {
      return;
    }
    this._isMouseDown = true;
    this._mouseDownPos = this.getRelativePointerPos(e);
    this._lastMousePos = this._mouseDownPos;
    if (e.target === this.interactionElement) {
      this._selectionService.createlassoSelector(
        this._mouseDownPos.x,
        this._mouseDownPos.y
      );
    } else {
      const element = e.target as HTMLElement;

      // -- ignore elements with native dragging turned on
      if (!element.hasAttribute('draggable')) {
        this._selectionService.selectElement(element, !e.shiftKey);
      }
    }
  }

  /**
   * Called when the pointer is released.
   * @param e PointerEvent
   */
  pointerUp(e: PointerEvent) {
    this._isMouseDown = false;
    if (this._selectionService.hasLasso) {
      this._selectionService.selectCapturedElements();
    } else {
      if (this._selectionService.state === SelectionState.Draggable) {
        this.moveSelectedElements(NudgeType.Overlay, false);
        this.tryDropSelectedElements();
      } else if (this._selectionService.state === SelectionState.Sizable) {
        this.resizeSelectedElements();
      }
      this._dragService.clearDropZones(this.interactionElement);
    }
    this._renderer.setStyle(this.interactionElement, 'cursor', this._cursor);
    this._lastDropZone = null;
    this._interactionService.selectedElements = this._selectionService.clients;
  }

  /**
   * Attemps to drop the currently selected elements into a drop zone
   * @param e PointerEvent
   */
  tryDropSelectedElements() {
    const selectors = this._selectionService.selectors;
    selectors.forEach(selector => {
      if (this.canDrop(selector.clientEl)) {
        this._dragService.dropElement(
          this._lastDropZone,
          selector.clientEl,
          this.interactionElement
        );
      }
    });
    this._selectionService.reselect();
  }

  /**
   * Ensures that the appropriate cursor is set when element is draggable.
   * @param e PointerEvent
   */
  ensureCursor(e: PointerEvent) {
    const pointerPos = new Point(e.pageX, e.pageY);
    const selector = this._selectionService.selectorAtPoint(pointerPos);
    if (selector && dom.elementDraggable(selector.clientEl)) {
      this._renderer.setStyle(this.interactionElement, 'cursor', 'move');
    } else {
      this._renderer.setStyle(this.interactionElement, 'cursor', 'default');
    }
  }

  /**
   * Resizes the selected elements to match the Selector overlay
   */
  resizeSelectedElements() {
    const selectors = this._selectionService.selectors;
    const sizedElements = [];
    selectors.forEach(selector => {
      if (dom.elementSizable(selector.clientEl)) {
        sizedElements.push(selector.clientEl);
        dom.assignBoundingRect(
          this._renderer,
          selector.overlay,
          selector.clientEl
        );
        this.resizedElement.emit(selector.clientEl);
      }
    });
    this.resetSelection();
    if (sizedElements.length > 0) {
      this.resizedElements.emit(sizedElements);
    }
  }

  /**
   * Moves selected elements to the current location of the selector or selector overlay.
   * @param nudgeType determines where the selected elements should be moved.  Options are
   * to move to the actual selector (NudgeType.Selector) or the selector overlay (NodgeType.Overlay).
   * Usually only the overlay is dragged/moved, hence the default of NudgeType.Overlay.
   * @param resetAfterMove determines if the selector should reset itself after every move.
   */
  moveSelectedElements(
    nudgeType: NudgeType = NudgeType.Overlay,
    resetAfterMove = true
  ) {
    const selectors = this._selectionService.selectors;
    const movedElements = [];
    selectors.forEach(selector => {
      if (dom.elementDraggable(selector.clientEl)) {
        movedElements.push(selector.clientEl);
        dom.assignPosition(
          this._renderer,
          nudgeType === NudgeType.Overlay
            ? selector.overlay
            : selector.selectorEl,
          selector.clientEl
        );
        this.movedElement.emit(selector.clientEl);
      }
    });
    if (resetAfterMove) {
      this.resetSelection();
    }
    if (movedElements.length > 0) {
      this.movedElements.emit(movedElements);
    }
  }

  /**
   * Deletes selected elements.
   */
  deleteSelectedElements() {
    const selectors = this._selectionService.selectors;
    const deletedElements = [];
    for (let index = selectors.length - 1; index >= 0; index--) {
      const selector = selectors[index];
      if (this.canDelete(selector.clientEl)) {
        const el = selector.clientEl;
        this._selectionService.clearSelector(selector);
        const compRef = this._interactionService.findComponentRef(el);
        if (compRef) {
          this.viewContainer.remove(this.viewContainer.indexOf(compRef));
          this._interactionService.removeComponentByRef(compRef);
        } else {
          this._interactionService.deleteElement(el);
        }
        deletedElements.push(el);
      }
    }
    this._interactionService.deleteElements(deletedElements);
    this._interactionService.selectedElements = this._selectionService.clients;
  }

  loadComponent(
    component: any,
    data: any,
    select = true
  ): { component: any; element: HTMLElement } {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
      component
    );
    const componentRef = this.viewContainer.createComponent(
      componentFactory
    ) as any;
    const el = componentRef.location.nativeElement;
    el.id = shortid.generate();
    el['componentType'] = component.name;
    el.className = 'hpc-widget hpc-composite ' + el.className;
    this._renderer.setStyle(el, 'box-sizing', 'border-box');
    this._renderer.setStyle(el, 'position', 'absolute');
    if (el.children.length > 0) {
      const root = el.children[0];
      this._renderer.addClass(root, 'hcp-root');
      this._renderer.setStyle(root, 'height', '100%');
      this._renderer.setStyle(root, 'width', '100%');
    }
    this._interactionService.components.push({ el: el, ref: componentRef });
    if (select) {
      this._selectionService.selectElement(el);
      this._interactionService.selectedElements = this._selectionService.clients;
    }
    this._cdRef.detectChanges();
    return { component: componentRef, element: el };
  }

  /**
   * Add a new child element to the host element.
   */
  addElement(element: Element) {
    const selector = this._selectionService.activeSelector;
    const parent =
      selector && dom.isContainer(selector.clientEl)
        ? selector.clientEl
        : this.interactionElement;
    this._renderer.appendChild(parent, element);
  }

  /**
   * Gets the mouse position relative to the offset and scale of the host element.
   * @param e PointerEvent
   */
  getRelativePointerPos(e: PointerEvent) {
    return dom.getRelativePointerPos(e, this.interactionElement, this.scale);
  }

  /**
   * Gets pointer coordinates changes relative to the selected element.
   * @param e PointerEvent
   */
  getPointerChange(e: PointerEvent): any[] {
    const pointerPos = this.getRelativePointerPos(e);
    let left = pointerPos.x - this._lastMousePos.x;
    let top = pointerPos.y - this._lastMousePos.y;
    if (this.snap) {
      if (left % this.snap !== 0) {
        left = 0;
        pointerPos.x = this._lastMousePos.x;
      }
      if (top % this.snap !== 0) {
        top = 0;
        pointerPos.y = this._lastMousePos.y;
      }
    }
    return [new Point(left, top), pointerPos];
  }

  /**
   * Re-selects the currently selected elements.  Usually happens after
   * an element is moved or resized.
   */
  resetSelection() {
    this._selectionService.reselect();
  }

  /**
   * Cancels the current selections or drag operation.  If the elements are being dragged,
   * the drag operation is cancelled and the elements reselected.  Otherwise, the elements
   * are unselected.
   */
  cancelSelection() {
    if (this._isMouseDown) {
      this._selectionService.reselect();
    } else {
      this._selectionService.clearSelectors();
    }
  }

  ngOnInit() {
    if (this.interactionElement && this._renderer) {
      this._interactionService.hostComponent = this;
      this._interactionService.interactionHost = this.interactionElement;
      this._selectionService.interactionHost = this.interactionElement;
      this._selectionService.isLassoSelectable = this.isLassoSelectable;
      this._selectionService.isSelectable = this.isSelectable;
      this._cursor = getComputedStyle(this.interactionElement).cursor;
      this._deleteSelectedElementsSubscription = this._interactionService.deleteSelectedElements$.subscribe(
        () => {
          this.deleteSelectedElements();
        }
      );
      this._addElementSubscription = this._interactionService.addElement$.subscribe(
        element => {
          // this.addElement(element);
        }
      );

      this._addComponentSubscription = this._interactionService.addComponent$.subscribe(
        component => {
          // this.loadComponent(component, null);
        }
      );
    }
  }

  ngAfterViewChecked(): void {
    // this.sizeToScale();
  }

  ngAfterViewInit(): void {
    this.sizeToScale();
    const ro = new ResizeObserver(() => {
      this.sizeToScale();
    });
    ro.observe(this._root.nativeElement.parentElement);
  }

  private sizeToScale() {
    if (this._root) {
      const root = this._root.nativeElement;
      const height = root.parentElement.clientHeight;
      const width = root.parentElement.clientWidth;
      const zoomMargin = 40;
      const zoomHeight =
        this.interactionElement.clientHeight * this.scale + zoomMargin;
      const zoomWidth =
        this.interactionElement.clientWidth * this.scale + zoomMargin;

      // -- Set the root element to the actual size of its parent;
      root.style.width = width + 'px';
      root.style.height = height + 'px';
      root.style.position = 'absolute';
      root.style.display = zoomHeight > height && zoomWidth > width ? 'block' : 'flex';

      if (zoomWidth < width && zoomHeight < height) {
        root.style.justifyContent = 'center' ;
        root.style.alignItems = 'center';
      } else if (zoomWidth > zoomHeight) {
        root.style.justifyContent = height > zoomHeight ? 'center' : '';
        root.style.alignItems = width > zoomWidth ? 'center' : '';
        root.style.flexDirection = zoomWidth > width ? 'column' : 'row';
      } else {
        root.style.alignItems = width < zoomWidth ? 'center' : '';
        root.style.justifyContent = height < zoomHeight ? 'center' : '';
        root.style.flexDirection = zoomHeight > height ? 'row' : 'column';
      }

      root.style.overflow = 'auto';
      root.style.minWidth = width + 'px';


      // -- Make the zoom container the actual scaled size plus zoomMargin;
      const zoomEl = this._zoomContainer.nativeElement;
      zoomEl.style.height = zoomHeight + 'px';
      zoomEl.style.width = zoomWidth + 'px';

      // -- Give the interaction element margins of half the zoomMargin
      this.interactionElement.style.marginTop = zoomMargin / 2 + 'px';
      this.interactionElement.style.marginLeft = zoomMargin / 2 + 'px';
    }
  }


  ngOnDestroy(): void {
    this.viewContainer.clear();
    this._lastDropZone = null;
    this._deleteSelectedElementsSubscription.unsubscribe();
    this._addElementSubscription.unsubscribe();
  }
}
