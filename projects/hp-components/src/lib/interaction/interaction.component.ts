import {
  Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy,
  Input, Renderer2, ViewChild, ElementRef, Output, EventEmitter, OnDestroy
} from '@angular/core';
import { debounceTime, distinctUntilKeyChanged, map } from 'rxjs/operators';
import { DragService } from '../services/drag.service';
import { SizeService } from '../services/size.service';
import { SelectorService, SelectionState, NudgeType } from '../selector/selector.service';
import * as dom from '../scripts/dom';
import { Point } from '../scripts/math';
import { InteractionService } from './interaction.service';
import { Subject, Observable, Subscription } from 'rxjs';


export type ICancellable = ( value: any )  => boolean;

/**
 * Handles selection, sizing, deletions, and dragging interactions with any child Element.
 */

@Component({
  selector: 'hpc-interaction',
  templateUrl: './interaction.component.html',
  styleUrls: ['./interaction.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InteractionComponent implements OnInit, OnDestroy {
  private _isMouseDown = false;
  private _mouseDownPos = new Point();
  private _lastMousePos: Point;
  private _cursor: string;
  private _lastDropZone: HTMLElement;
  private _deleteSelectedElementsSubscription: Subscription;
  private _addElementSubscription: Subscription;

  @ViewChild('interactionContainer')
  private _el: ElementRef;
  private _keyDownSubject = new Subject<KeyboardEvent>();

  /**
   * Scale value to apply to the Interaction host element.  The value is applied
   * to both scaleX and scaleY of the host element.
   */
  @Input()
  scale = 1;

  /**
   * Determins if elements span when sized or dragged
   */
  @Input()
  snap = 0;

  /**
   * Gets or sets the minimum width of the element when drag-sized.
   */
  @Input()
  minSizingWidth = 30;

  /**
   * Gets or sets the minimum height of the element when drag-sized.
   */
  @Input()
  minSizingHeight = 30;

  /**
   * Determines if elements can be selected by dragging around (lasso) them and releasing the pointer.
   */
  @Input()
  isLassoSelectable = true;

  /**
   * Optionally set "checkers" background for the interaction host.  Useful when building IDE-like interactive UI.
   */
  @Input()
  isCheckersBackground = false;

  @Output()
  resizedElement = new EventEmitter<HTMLElement>();
  @Output()
  resizedElements = new EventEmitter<HTMLElement[]>();
  @Output()
  movedElement = new EventEmitter<HTMLElement>();
  @Output()
  movedElements = new EventEmitter<HTMLElement[]>();
  @Output()
  selectElement = new EventEmitter<HTMLElement>();

  @Input()
  canDelete: ICancellable = () => true

  @Input()
  canDrop: ICancellable = () => true

  constructor(
    private _renderer: Renderer2,
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
          this._el.nativeElement,
          [this._selectionService.activeSelector.clientEl]
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
    this._isMouseDown = true;
    this._mouseDownPos = this.getRelativePointerPos(e);
    this._lastMousePos = this._mouseDownPos;
    if (e.target === this._el.nativeElement) {
      this._selectionService.createlassoSelector(
        this._mouseDownPos.x,
        this._mouseDownPos.y
      );
    } else {
      const element = e.target as HTMLElement;
      this._selectionService.selectElement(element, !e.shiftKey);
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
      this._dragService.clearDropZones(this._el.nativeElement);
    }
    this._renderer.setStyle(this._el.nativeElement, 'cursor', this._cursor);
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
          this._el.nativeElement
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
    const mousePos = new Point(e.pageX, e.pageY);
    const selector = this._selectionService.selectorAtPoint(mousePos);
    if (selector && dom.elementDraggable(selector.clientEl)) {
      this._renderer.setStyle(this._el.nativeElement, 'cursor', 'move');
    } else {
      this._renderer.setStyle(this._el.nativeElement, 'cursor', 'default');
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
        this._interactionService.deleteElement(el);
        deletedElements.push(el);
      }
    }
    this._interactionService.deleteElements(deletedElements);
    this._interactionService.selectedElements = this._selectionService.clients;
  }

  /**
   * Add a new child element to the host element.
   */
  addElement(element: Element) {
    const selector = this._selectionService.activeSelector;
    const parent = selector && dom.isContainer(selector.clientEl) ? selector.clientEl : this._el.nativeElement;
    this._renderer.appendChild(parent, element);
  }

  /**
   * Gets the mouse position relative to the offset and scale of the host element.
   * @param e PointerEvent
   */
  getRelativePointerPos(e: PointerEvent) {
    return dom.getRelativePointerPos(e, this._el.nativeElement, this.scale);
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
    if (this._el.nativeElement && this._renderer) {
      this._interactionService.interactionHost = this._el.nativeElement;
      this._selectionService.interactionHost = this._el.nativeElement;
      this._selectionService.isLassoSelectable = this.isLassoSelectable;
      this._cursor = getComputedStyle(this._el.nativeElement).cursor;
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
    }
  }

  ngOnDestroy(): void {
    this._lastDropZone = null;
    this._deleteSelectedElementsSubscription.unsubscribe();
    this._addElementSubscription.unsubscribe();
  }
}
