/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, Renderer2, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { DragService } from '../services/drag.service';
import { SizeService } from '../services/size.service';
import { SelectorService, SelectionState, NudgeType } from '../selector/selector.service';
import * as dom from '../scripts/dom';
import { Point } from '../scripts/math';
import { InteractionService } from './interaction.service';
import { Subject } from 'rxjs';
/** @typedef {?} */
var ICancellable;
export { ICancellable };
/**
 * Handles selection, sizing, deletions, and dragging interactions with any child Element.
 */
export class InteractionComponent {
    /**
     * @param {?} _renderer
     * @param {?} _dragService
     * @param {?} _sizeService
     * @param {?} _interactionService
     * @param {?} _selectionService
     */
    constructor(_renderer, _dragService, _sizeService, _interactionService, _selectionService) {
        this._renderer = _renderer;
        this._dragService = _dragService;
        this._sizeService = _sizeService;
        this._interactionService = _interactionService;
        this._selectionService = _selectionService;
        this._isMouseDown = false;
        this._mouseDownPos = new Point();
        this._keyDownSubject = new Subject();
        /**
         * Scale value to apply to the Interaction host element.  The value is applied
         * to both scaleX and scaleY of the host element.
         */
        this.scale = 1;
        /**
         * Determins if elements span when sized or dragged
         */
        this.snap = 0;
        /**
         * Gets or sets the minimum width of the element when drag-sized.
         */
        this.minSizingWidth = 30;
        /**
         * Gets or sets the minimum height of the element when drag-sized.
         */
        this.minSizingHeight = 30;
        /**
         * Determines if elements can be selected by dragging around (lasso) them and releasing the pointer.
         */
        this.isLassoSelectable = true;
        /**
         * Optionally set "checkers" background for the interaction host.  Useful when building IDE-like interactive UI.
         */
        this.isCheckersBackground = false;
        this.resizedElement = new EventEmitter();
        this.resizedElements = new EventEmitter();
        this.movedElement = new EventEmitter();
        this.movedElements = new EventEmitter();
        this.selectElement = new EventEmitter();
        this.canDelete = () => true;
        this.canDrop = () => true;
        this._selectionService.renderer = this._renderer;
        this._sizeService.renderer = this._renderer;
        this._dragService.renderer = this._renderer;
        this._interactionService.renderer = this._renderer;
        this._keyDownSubject.subscribe(e => this.keyDownHandler(e));
    }
    /**
     * Called when the keyboard key is released.
     * @param {?} e KeyboardEvent
     * @return {?}
     */
    keyUp(e) {
        if (e.code === 'Delete' && this._selectionService.selectors.length > 0) {
            this.deleteSelectedElements();
        }
    }
    /**
     * Called when the keyboard key is pressed.
     * @param {?} e KeyboardEvent
     * @return {?}
     */
    keyPress(e) {
        if (this._selectionService.selectors.length > 0) {
            e.stopPropagation();
        }
    }
    /**
     * Called when the keyboard key is pressed.
     * @param {?} e KeyboardEvent
     * @return {?}
     */
    keyDown(e) {
        this._keyDownSubject.next(e);
    }
    /**
     * @param {?} e
     * @return {?}
     */
    keyDownHandler(e) {
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
            /** @type {?} */
            let delta;
            /** @type {?} */
            const snap = this.snap ? this.snap : 1;
            if (e.code === 'Escape') {
                this.cancelSelection();
            }
            if (e.shiftKey) {
                if (e.ctrlKey) {
                    switch (e.code
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
                }
                else {
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
                    this._sizeService.sizeElementsBy(delta, this._selectionService.selectorElements);
                    this._sizeService.sizeElementsBy(delta, this._selectionService.clients);
                }
            }
            else {
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
                this._dragService.dragElementsBy(delta, this._selectionService.selectorElements);
                this._dragService.dragElementsBy(delta, this._selectionService.clients);
            }
        }
    }
    /**
     * Ensures that the default HTML5 dragging operations do not execute.
     * @return {?}
     */
    dragStart() {
        // -- prevent default drag
        return false;
    }
    /**
     * Called when the pointer is moved.
     * @param {?} e PointerEvent
     * @return {?}
     */
    pointerMove(e) {
        e.preventDefault();
        if (this._isMouseDown) {
            /** @type {?} */
            let mousePos = this.getRelativePointerPos(e);
            if (this._selectionService.hasLasso) {
                /** @type {?} */
                const mouseDownPos = this._mouseDownPos;
                this._selectionService.resizeLasso(mousePos.x - mouseDownPos.x, mousePos.y - mouseDownPos.y, mouseDownPos);
            }
            else if (this._selectionService.selectors.length > 0) {
                /** @type {?} */
                const mouseChange = this.getPointerChange(e);
                this._selectionService.nudgeBy(mouseChange[0], NudgeType.Overlay);
                mousePos = mouseChange[1];
                this._lastDropZone = this._dragService.updateDropZone(this._selectionService.activeSelector.overlay, this._el.nativeElement, [this._selectionService.activeSelector.clientEl]);
            }
            this._lastMousePos = mousePos;
        }
        else {
            this.ensureCursor(e);
        }
    }
    /**
     * Called when the pointer is pressed.
     * @param {?} e PointerEvent
     * @return {?}
     */
    pointerDown(e) {
        this._isMouseDown = true;
        this._mouseDownPos = this.getRelativePointerPos(e);
        this._lastMousePos = this._mouseDownPos;
        if (e.target === this._el.nativeElement) {
            this._selectionService.createlassoSelector(this._mouseDownPos.x, this._mouseDownPos.y);
        }
        else {
            /** @type {?} */
            const element = /** @type {?} */ (e.target);
            this._selectionService.selectElement(element, !e.shiftKey);
        }
    }
    /**
     * Called when the pointer is released.
     * @param {?} e PointerEvent
     * @return {?}
     */
    pointerUp(e) {
        this._isMouseDown = false;
        if (this._selectionService.hasLasso) {
            this._selectionService.selectCapturedElements();
        }
        else {
            if (this._selectionService.state === SelectionState.Draggable) {
                this.moveSelectedElements(NudgeType.Overlay, false);
                this.tryDropSelectedElements();
            }
            else if (this._selectionService.state === SelectionState.Sizable) {
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
     * @return {?}
     */
    tryDropSelectedElements() {
        /** @type {?} */
        const selectors = this._selectionService.selectors;
        selectors.forEach(selector => {
            if (this.canDrop(selector.clientEl)) {
                this._dragService.dropElement(this._lastDropZone, selector.clientEl, this._el.nativeElement);
            }
        });
        this._selectionService.reselect();
    }
    /**
     * Ensures that the appropriate cursor is set when element is draggable.
     * @param {?} e PointerEvent
     * @return {?}
     */
    ensureCursor(e) {
        /** @type {?} */
        const mousePos = new Point(e.pageX, e.pageY);
        /** @type {?} */
        const selector = this._selectionService.selectorAtPoint(mousePos);
        if (selector && dom.elementDraggable(selector.clientEl)) {
            this._renderer.setStyle(this._el.nativeElement, 'cursor', 'move');
        }
        else {
            this._renderer.setStyle(this._el.nativeElement, 'cursor', 'default');
        }
    }
    /**
     * Resizes the selected elements to match the Selector overlay
     * @return {?}
     */
    resizeSelectedElements() {
        /** @type {?} */
        const selectors = this._selectionService.selectors;
        /** @type {?} */
        const sizedElements = [];
        selectors.forEach(selector => {
            if (dom.elementSizable(selector.clientEl)) {
                sizedElements.push(selector.clientEl);
                dom.assignBoundingRect(this._renderer, selector.overlay, selector.clientEl);
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
     * @param {?=} nudgeType determines where the selected elements should be moved.  Options are
     * to move to the actual selector (NudgeType.Selector) or the selector overlay (NodgeType.Overlay).
     * Usually only the overlay is dragged/moved, hence the default of NudgeType.Overlay.
     * @param {?=} resetAfterMove determines if the selector should reset itself after every move.
     * @return {?}
     */
    moveSelectedElements(nudgeType = NudgeType.Overlay, resetAfterMove = true) {
        /** @type {?} */
        const selectors = this._selectionService.selectors;
        /** @type {?} */
        const movedElements = [];
        selectors.forEach(selector => {
            if (dom.elementDraggable(selector.clientEl)) {
                movedElements.push(selector.clientEl);
                dom.assignPosition(this._renderer, nudgeType === NudgeType.Overlay
                    ? selector.overlay
                    : selector.selectorEl, selector.clientEl);
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
     * @return {?}
     */
    deleteSelectedElements() {
        /** @type {?} */
        const selectors = this._selectionService.selectors;
        /** @type {?} */
        const deletedElements = [];
        for (let index = selectors.length - 1; index >= 0; index--) {
            /** @type {?} */
            const selector = selectors[index];
            if (this.canDelete(selector.clientEl)) {
                /** @type {?} */
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
     * @param {?} element
     * @return {?}
     */
    addElement(element) {
        /** @type {?} */
        const selector = this._selectionService.activeSelector;
        /** @type {?} */
        const parent = selector && dom.isContainer(selector.clientEl) ? selector.clientEl : this._el.nativeElement;
        this._renderer.appendChild(parent, element);
    }
    /**
     * Gets the mouse position relative to the offset and scale of the host element.
     * @param {?} e PointerEvent
     * @return {?}
     */
    getRelativePointerPos(e) {
        return dom.getRelativePointerPos(e, this._el.nativeElement, this.scale);
    }
    /**
     * Gets pointer coordinates changes relative to the selected element.
     * @param {?} e PointerEvent
     * @return {?}
     */
    getPointerChange(e) {
        /** @type {?} */
        const pointerPos = this.getRelativePointerPos(e);
        /** @type {?} */
        let left = pointerPos.x - this._lastMousePos.x;
        /** @type {?} */
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
     * @return {?}
     */
    resetSelection() {
        this._selectionService.reselect();
    }
    /**
     * Cancels the current selections or drag operation.  If the elements are being dragged,
     * the drag operation is cancelled and the elements reselected.  Otherwise, the elements
     * are unselected.
     * @return {?}
     */
    cancelSelection() {
        if (this._isMouseDown) {
            this._selectionService.reselect();
        }
        else {
            this._selectionService.clearSelectors();
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this._el.nativeElement && this._renderer) {
            this._interactionService.interactionHost = this._el.nativeElement;
            this._selectionService.interactionHost = this._el.nativeElement;
            this._selectionService.isLassoSelectable = this.isLassoSelectable;
            this._cursor = getComputedStyle(this._el.nativeElement).cursor;
            this._deleteSelectedElementsSubscription = this._interactionService.deleteSelectedElements$.subscribe(() => {
                this.deleteSelectedElements();
            });
            this._addElementSubscription = this._interactionService.addElement$.subscribe(element => {
                // this.addElement(element);
            });
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._lastDropZone = null;
        this._deleteSelectedElementsSubscription.unsubscribe();
        this._addElementSubscription.unsubscribe();
    }
}
InteractionComponent.decorators = [
    { type: Component, args: [{
                selector: 'hpc-interaction',
                template: "<div #interactionContainer tabindex=\"0\" (dragstart)=\"dragStart()\" (pointerdown)=\"pointerDown($event)\" (pointerup)=\"pointerUp($event)\"\r\n  (pointermove)=\"pointerMove($event)\" (keydown)=\"keyDown($event)\" (keyup)=\"keyUp($event)\" (keypress)=\"keyPress($event)\"\r\n  [style.transform]=\"'scale('+scale+')'\" [ngClass]=\"{'hpc-checkers-background': isCheckersBackground}\" class=\"interaction-container\">\r\n  <ng-content></ng-content>\r\n</div>\r\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{box-sizing:border-box;position:absolute;height:100%;width:100%}.hpc-new-element{background-color:gray;top:10px;left:10px;height:200px;width:400px;border:1px solid #000}.interaction-container{height:100%;box-sizing:border-box;background:0 0}.hpc-checkers-background{background:url('data:image/svg+xml,\\<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"400\" height=\"400\" fill-opacity=\".25\" >            <rect x=\"200\" width=\"200\" height=\"200\" />            <rect y=\"200\" width=\"200\" height=\"200\" />            </svg>') 0 0/20px 20px gray}.hpc-element-selector,.hpc-lasso-selector{border:2px dashed #000;pointer-events:None}.grip-container{pointer-events:None;height:100%;width:100%;display:flex}.grip-container-l,.grip-container-m,.grip-container-r{display:flex;flex-direction:column;justify-content:space-between;flex:1}.grip-container-l{align-items:flex-start}.grip-container-m{align-items:center}.grip-container-r{align-items:flex-end}.grip{--grip-offset:-9px;background-color:#f2f2f2;border:2px solid #000;height:13px;width:13px;opacity:.85}.grip-bl,.grip-bm,.grip-br,.grip-lm,.grip-rm,.grip-tl,.grip-tm,.grip-tr{pointer-events:auto}.grip-tl{margin-left:var(--grip-offset);margin-top:var(--grip-offset);cursor:nw-resize}.grip-tm{margin-top:var(--grip-offset);cursor:n-resize}.grip-bm{margin-bottom:var(--grip-offset);cursor:n-resize}.grip-tr{margin-top:var(--grip-offset);margin-right:var(--grip-offset);cursor:ne-resize}.grip-br{cursor:nw-resize;margin-right:var(--grip-offset);margin-bottom:var(--grip-offset)}.grip-rm{cursor:e-resize;margin-right:var(--grip-offset)}.grip-bl{cursor:ne-resize;margin-left:var(--grip-offset);margin-bottom:var(--grip-offset)}.grip-lm{cursor:e-resize;margin-left:var(--grip-offset)}.grip-bl,.grip-br,.grip-tl,.grip-tr{border-radius:50%}.hpc-sizer-overlay{z-index:10000}.hpc-drag-overlay{opacity:.5;z-index:10000}.hpc-dropzone.active{border:2px dashed #fff}"]
            }] }
];
/** @nocollapse */
InteractionComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: DragService },
    { type: SizeService },
    { type: InteractionService },
    { type: SelectorService }
];
InteractionComponent.propDecorators = {
    _el: [{ type: ViewChild, args: ['interactionContainer',] }],
    scale: [{ type: Input }],
    snap: [{ type: Input }],
    minSizingWidth: [{ type: Input }],
    minSizingHeight: [{ type: Input }],
    isLassoSelectable: [{ type: Input }],
    isCheckersBackground: [{ type: Input }],
    resizedElement: [{ type: Output }],
    resizedElements: [{ type: Output }],
    movedElement: [{ type: Output }],
    movedElements: [{ type: Output }],
    selectElement: [{ type: Output }],
    canDelete: [{ type: Input }],
    canDrop: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    InteractionComponent.prototype._isMouseDown;
    /** @type {?} */
    InteractionComponent.prototype._mouseDownPos;
    /** @type {?} */
    InteractionComponent.prototype._lastMousePos;
    /** @type {?} */
    InteractionComponent.prototype._cursor;
    /** @type {?} */
    InteractionComponent.prototype._lastDropZone;
    /** @type {?} */
    InteractionComponent.prototype._deleteSelectedElementsSubscription;
    /** @type {?} */
    InteractionComponent.prototype._addElementSubscription;
    /** @type {?} */
    InteractionComponent.prototype._el;
    /** @type {?} */
    InteractionComponent.prototype._keyDownSubject;
    /**
     * Scale value to apply to the Interaction host element.  The value is applied
     * to both scaleX and scaleY of the host element.
     * @type {?}
     */
    InteractionComponent.prototype.scale;
    /**
     * Determins if elements span when sized or dragged
     * @type {?}
     */
    InteractionComponent.prototype.snap;
    /**
     * Gets or sets the minimum width of the element when drag-sized.
     * @type {?}
     */
    InteractionComponent.prototype.minSizingWidth;
    /**
     * Gets or sets the minimum height of the element when drag-sized.
     * @type {?}
     */
    InteractionComponent.prototype.minSizingHeight;
    /**
     * Determines if elements can be selected by dragging around (lasso) them and releasing the pointer.
     * @type {?}
     */
    InteractionComponent.prototype.isLassoSelectable;
    /**
     * Optionally set "checkers" background for the interaction host.  Useful when building IDE-like interactive UI.
     * @type {?}
     */
    InteractionComponent.prototype.isCheckersBackground;
    /** @type {?} */
    InteractionComponent.prototype.resizedElement;
    /** @type {?} */
    InteractionComponent.prototype.resizedElements;
    /** @type {?} */
    InteractionComponent.prototype.movedElement;
    /** @type {?} */
    InteractionComponent.prototype.movedElements;
    /** @type {?} */
    InteractionComponent.prototype.selectElement;
    /** @type {?} */
    InteractionComponent.prototype.canDelete;
    /** @type {?} */
    InteractionComponent.prototype.canDrop;
    /** @type {?} */
    InteractionComponent.prototype._renderer;
    /** @type {?} */
    InteractionComponent.prototype._dragService;
    /** @type {?} */
    InteractionComponent.prototype._sizeService;
    /** @type {?} */
    InteractionComponent.prototype._interactionService;
    /** @type {?} */
    InteractionComponent.prototype._selectionService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJhY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaHAtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbImxpYi9pbnRlcmFjdGlvbi9pbnRlcmFjdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQVUsaUJBQWlCLEVBQUUsdUJBQXVCLEVBQzdELEtBQUssRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUM5RCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLFNBQVMsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzFGLE9BQU8sS0FBSyxHQUFHLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzNELE9BQU8sRUFBRSxPQUFPLEVBQTRCLE1BQU0sTUFBTSxDQUFDOzs7Ozs7O0FBZ0J6RCxNQUFNOzs7Ozs7OztJQW1FSixZQUNVLFdBQ0EsY0FDQSxjQUNBLHFCQUNBO1FBSkEsY0FBUyxHQUFULFNBQVM7UUFDVCxpQkFBWSxHQUFaLFlBQVk7UUFDWixpQkFBWSxHQUFaLFlBQVk7UUFDWix3QkFBbUIsR0FBbkIsbUJBQW1CO1FBQ25CLHNCQUFpQixHQUFqQixpQkFBaUI7NEJBdkVKLEtBQUs7NkJBQ0osSUFBSSxLQUFLLEVBQUU7K0JBU1QsSUFBSSxPQUFPLEVBQWlCOzs7OztxQkFPOUMsQ0FBQzs7OztvQkFNRixDQUFDOzs7OzhCQU1TLEVBQUU7Ozs7K0JBTUQsRUFBRTs7OztpQ0FNQSxJ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QUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQy9ELElBQUksQ0FBQyxtQ0FBbUMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsdUJBQXVCLENBQUMsU0FBUyxDQUNuRyxHQUFHLEVBQUU7Z0JBQ0YsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7YUFDaEMsQ0FDRixDQUFDO1lBQ0YsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUMzRSxPQUFPLENBQUMsRUFBRTs7YUFFVCxDQUNGLENBQUM7U0FDSDtLQUNGOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2RCxJQUFJLENBQUMsdUJBQXVCLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDNUM7OztZQTNkRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0Isd2RBQTJDO2dCQUUzQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7O1lBeEJRLFNBQVM7WUFHVCxXQUFXO1lBQ1gsV0FBVztZQUlYLGtCQUFrQjtZQUhsQixlQUFlOzs7a0JBNkJyQixTQUFTLFNBQUMsc0JBQXNCO29CQVFoQyxLQUFLO21CQU1MLEtBQUs7NkJBTUwsS0FBSzs4QkFNTCxLQUFLO2dDQU1MLEtBQUs7bUNBTUwsS0FBSzs2QkFHTCxNQUFNOzhCQUVOLE1BQU07MkJBRU4sTUFBTTs0QkFFTixNQUFNOzRCQUVOLE1BQU07d0JBR04sS0FBSztzQkFHTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgSW5wdXQsIFJlbmRlcmVyMiwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsS2V5Q2hhbmdlZCwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRHJhZ1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9kcmFnLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2l6ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9zaXplLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2VsZWN0b3JTZXJ2aWNlLCBTZWxlY3Rpb25TdGF0ZSwgTnVkZ2VUeXBlIH0gZnJvbSAnLi4vc2VsZWN0b3Ivc2VsZWN0b3Iuc2VydmljZSc7XG5pbXBvcnQgKiBhcyBkb20gZnJvbSAnLi4vc2NyaXB0cy9kb20nO1xuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICcuLi9zY3JpcHRzL21hdGgnO1xuaW1wb3J0IHsgSW50ZXJhY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi9pbnRlcmFjdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5cbmV4cG9ydCB0eXBlIElDYW5jZWxsYWJsZSA9ICggdmFsdWU6IGFueSApICA9PiBib29sZWFuO1xuXG4vKipcbiAqIEhhbmRsZXMgc2VsZWN0aW9uLCBzaXppbmcsIGRlbGV0aW9ucywgYW5kIGRyYWdnaW5nIGludGVyYWN0aW9ucyB3aXRoIGFueSBjaGlsZCBFbGVtZW50LlxuICovXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2hwYy1pbnRlcmFjdGlvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9pbnRlcmFjdGlvbi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2ludGVyYWN0aW9uLmNvbXBvbmVudC5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgSW50ZXJhY3Rpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgX2lzTW91c2VEb3duID0gZmFsc2U7XG4gIHByaXZhdGUgX21vdXNlRG93blBvcyA9IG5ldyBQb2ludCgpO1xuICBwcml2YXRlIF9sYXN0TW91c2VQb3M6IFBvaW50O1xuICBwcml2YXRlIF9jdXJzb3I6IHN0cmluZztcbiAgcHJpdmF0ZSBfbGFzdERyb3Bab25lOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfZGVsZXRlU2VsZWN0ZWRFbGVtZW50c1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIF9hZGRFbGVtZW50U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgQFZpZXdDaGlsZCgnaW50ZXJhY3Rpb25Db250YWluZXInKVxuICBwcml2YXRlIF9lbDogRWxlbWVudFJlZjtcbiAgcHJpdmF0ZSBfa2V5RG93blN1YmplY3QgPSBuZXcgU3ViamVjdDxLZXlib2FyZEV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBTY2FsZSB2YWx1ZSB0byBhcHBseSB0byB0aGUgSW50ZXJhY3Rpb24gaG9zdCBlbGVtZW50LiAgVGhlIHZhbHVlIGlzIGFwcGxpZWRcbiAgICogdG8gYm90aCBzY2FsZVggYW5kIHNjYWxlWSBvZiB0aGUgaG9zdCBlbGVtZW50LlxuICAgKi9cbiAgQElucHV0KClcbiAgc2NhbGUgPSAxO1xuXG4gIC8qKlxuICAgKiBEZXRlcm1pbnMgaWYgZWxlbWVudHMgc3BhbiB3aGVuIHNpemVkIG9yIGRyYWdnZWRcbiAgICovXG4gIEBJbnB1dCgpXG4gIHNuYXAgPSAwO1xuXG4gIC8qKlxuICAgKiBHZXRzIG9yIHNldHMgdGhlIG1pbmltdW0gd2lkdGggb2YgdGhlIGVsZW1lbnQgd2hlbiBkcmFnLXNpemVkLlxuICAgKi9cbiAgQElucHV0KClcbiAgbWluU2l6aW5nV2lkdGggPSAzMDtcblxuICAvKipcbiAgICogR2V0cyBvciBzZXRzIHRoZSBtaW5pbXVtIGhlaWdodCBvZiB0aGUgZWxlbWVudCB3aGVuIGRyYWctc2l6ZWQuXG4gICAqL1xuICBASW5wdXQoKVxuICBtaW5TaXppbmdIZWlnaHQgPSAzMDtcblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyBpZiBlbGVtZW50cyBjYW4gYmUgc2VsZWN0ZWQgYnkgZHJhZ2dpbmcgYXJvdW5kIChsYXNzbykgdGhlbSBhbmQgcmVsZWFzaW5nIHRoZSBwb2ludGVyLlxuICAgKi9cbiAgQElucHV0KClcbiAgaXNMYXNzb1NlbGVjdGFibGUgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBPcHRpb25hbGx5IHNldCBcImNoZWNrZXJzXCIgYmFja2dyb3VuZCBmb3IgdGhlIGludGVyYWN0aW9uIGhvc3QuICBVc2VmdWwgd2hlbiBidWlsZGluZyBJREUtbGlrZSBpbnRlcmFjdGl2ZSBVSS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGlzQ2hlY2tlcnNCYWNrZ3JvdW5kID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpXG4gIHJlc2l6ZWRFbGVtZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxIVE1MRWxlbWVudD4oKTtcbiAgQE91dHB1dCgpXG4gIHJlc2l6ZWRFbGVtZW50cyA9IG5ldyBFdmVudEVtaXR0ZXI8SFRNTEVsZW1lbnRbXT4oKTtcbiAgQE91dHB1dCgpXG4gIG1vdmVkRWxlbWVudCA9IG5ldyBFdmVudEVtaXR0ZXI8SFRNTEVsZW1lbnQ+KCk7XG4gIEBPdXRwdXQoKVxuICBtb3ZlZEVsZW1lbnRzID0gbmV3IEV2ZW50RW1pdHRlcjxIVE1MRWxlbWVudFtdPigpO1xuICBAT3V0cHV0KClcbiAgc2VsZWN0RWxlbWVudCA9IG5ldyBFdmVudEVtaXR0ZXI8SFRNTEVsZW1lbnQ+KCk7XG5cbiAgQElucHV0KClcbiAgY2FuRGVsZXRlOiBJQ2FuY2VsbGFibGUgPSAoKSA9PiB0cnVlXG5cbiAgQElucHV0KClcbiAgY2FuRHJvcDogSUNhbmNlbGxhYmxlID0gKCkgPT4gdHJ1ZVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBfZHJhZ1NlcnZpY2U6IERyYWdTZXJ2aWNlLFxuICAgIHByaXZhdGUgX3NpemVTZXJ2aWNlOiBTaXplU2VydmljZSxcbiAgICBwcml2YXRlIF9pbnRlcmFjdGlvblNlcnZpY2U6IEludGVyYWN0aW9uU2VydmljZSxcbiAgICBwcml2YXRlIF9zZWxlY3Rpb25TZXJ2aWNlOiBTZWxlY3RvclNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5yZW5kZXJlciA9IHRoaXMuX3JlbmRlcmVyO1xuICAgIHRoaXMuX3NpemVTZXJ2aWNlLnJlbmRlcmVyID0gdGhpcy5fcmVuZGVyZXI7XG4gICAgdGhpcy5fZHJhZ1NlcnZpY2UucmVuZGVyZXIgPSB0aGlzLl9yZW5kZXJlcjtcbiAgICB0aGlzLl9pbnRlcmFjdGlvblNlcnZpY2UucmVuZGVyZXIgPSB0aGlzLl9yZW5kZXJlcjtcbiAgICB0aGlzLl9rZXlEb3duU3ViamVjdC5zdWJzY3JpYmUoZSA9PiB0aGlzLmtleURvd25IYW5kbGVyKGUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUga2V5Ym9hcmQga2V5IGlzIHJlbGVhc2VkLlxuICAgKiBAcGFyYW0gZSBLZXlib2FyZEV2ZW50XG4gICAqL1xuICBrZXlVcChlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKGUuY29kZSA9PT0gJ0RlbGV0ZScgJiYgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5zZWxlY3RvcnMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5kZWxldGVTZWxlY3RlZEVsZW1lbnRzKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSBrZXlib2FyZCBrZXkgaXMgcHJlc3NlZC5cbiAgICogQHBhcmFtIGUgS2V5Ym9hcmRFdmVudFxuICAgKi9cbiAga2V5UHJlc3MoZSkge1xuICAgIGlmICh0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnNlbGVjdG9ycy5sZW5ndGggPiAwKSB7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUga2V5Ym9hcmQga2V5IGlzIHByZXNzZWQuXG4gICAqIEBwYXJhbSBlIEtleWJvYXJkRXZlbnRcbiAgICovXG4gIGtleURvd24oZTogS2V5Ym9hcmRFdmVudCkge1xuICAgIHRoaXMuX2tleURvd25TdWJqZWN0Lm5leHQoZSk7XG4gIH1cblxuICBrZXlEb3duSGFuZGxlcihlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgLy8gZGVib3VuY2VUaW1lKDUwMDApO1xuICAgIC8qICAgIGlmIChcbiAgICAgIGUuY29kZSAhPT0gJ0RlbGV0ZScgJiZcbiAgICAgIGUuY29kZSAhPT0gJ0VzY2FwZScgJiZcbiAgICAgIGUuY29kZSAhPT0gJ0Fycm93TGVmdCcgJiZcbiAgICAgIGUuY29kZSAhPT0gJ0Fycm93VXAnICYmXG4gICAgICBlLmNvZGUgIT09ICdBcnJvd1JpZ2h0JyAmJlxuICAgICAgZS5jb2RlICE9PSAnQXJyb3dEb3duJ1xuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH0qL1xuICAgIGlmICh0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnNlbGVjdG9ycy5sZW5ndGggPiAwKSB7XG4gICAgICBsZXQgZGVsdGE6IFBvaW50O1xuICAgICAgY29uc3Qgc25hcCA9IHRoaXMuc25hcCA/IHRoaXMuc25hcCA6IDE7XG4gICAgICBpZiAoZS5jb2RlID09PSAnRXNjYXBlJykge1xuICAgICAgICB0aGlzLmNhbmNlbFNlbGVjdGlvbigpO1xuICAgICAgfVxuICAgICAgaWYgKGUuc2hpZnRLZXkpIHtcbiAgICAgICAgaWYgKGUuY3RybEtleSkge1xuICAgICAgICAgIHN3aXRjaCAoXG4gICAgICAgICAgICBlLmNvZGVcbiAgICAgICAgICAgIC8qICAgICAgICAgY2FzZSAzNzpcbiAgICAgICAgICAgICAgc2VsZi5hbGlnblNlbGVjdGVkRWxlbWVudHMoQWxpZ25Qb3NpdGlvbi5MZWZ0KTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgICAgICBzZWxmLmFsaWduU2VsZWN0ZWRFbGVtZW50cyhBbGlnblBvc2l0aW9uLlRvcCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOTpcbiAgICAgICAgICAgICAgc2VsZi5hbGlnblNlbGVjdGVkRWxlbWVudHMoQWxpZ25Qb3NpdGlvbi5SaWdodCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICAgICAgc2VsZi5hbGlnblNlbGVjdGVkRWxlbWVudHMoQWxpZ25Qb3NpdGlvbi5Cb3R0b20pO1xuICAgICAgICAgICAgICBicmVhazsgKi9cbiAgICAgICAgICApIHtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGVsdGEgPSBuZXcgUG9pbnQoKTtcbiAgICAgICAgICBzd2l0Y2ggKGUuY29kZSkge1xuICAgICAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgICAgZGVsdGEgPSBuZXcgUG9pbnQoLXNuYXAsIDApO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgICBkZWx0YSA9IG5ldyBQb2ludCgwLCAtc25hcCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgICAgICAgIGRlbHRhID0gbmV3IFBvaW50KHNuYXAsIDApO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICAgIGRlbHRhID0gbmV3IFBvaW50KDAsIHNuYXApO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5fc2l6ZVNlcnZpY2UuZ3JpcEtleSA9ICdrZXlib2FyZCc7XG4gICAgICAgICAgdGhpcy5fc2l6ZVNlcnZpY2Uuc2l6ZUVsZW1lbnRzQnkoXG4gICAgICAgICAgICBkZWx0YSxcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc2VsZWN0b3JFbGVtZW50c1xuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5fc2l6ZVNlcnZpY2Uuc2l6ZUVsZW1lbnRzQnkoXG4gICAgICAgICAgICBkZWx0YSxcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuY2xpZW50c1xuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlbHRhID0gbmV3IFBvaW50KCk7XG4gICAgICAgIHN3aXRjaCAoZS5jb2RlKSB7XG4gICAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgIGRlbHRhID0gbmV3IFBvaW50KC1zbmFwLCAwKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgZGVsdGEgPSBuZXcgUG9pbnQoMCwgLXNuYXApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgICAgICBkZWx0YSA9IG5ldyBQb2ludChzbmFwLCAwKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICBkZWx0YSA9IG5ldyBQb2ludCgwLCBzbmFwKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZHJhZ1NlcnZpY2UuZHJhZ0VsZW1lbnRzQnkoXG4gICAgICAgICAgZGVsdGEsXG4gICAgICAgICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5zZWxlY3RvckVsZW1lbnRzXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuX2RyYWdTZXJ2aWNlLmRyYWdFbGVtZW50c0J5KGRlbHRhLCB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmNsaWVudHMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFbnN1cmVzIHRoYXQgdGhlIGRlZmF1bHQgSFRNTDUgZHJhZ2dpbmcgb3BlcmF0aW9ucyBkbyBub3QgZXhlY3V0ZS5cbiAgICovXG4gIGRyYWdTdGFydCgpIHtcbiAgICAvLyAtLSBwcmV2ZW50IGRlZmF1bHQgZHJhZ1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgcG9pbnRlciBpcyBtb3ZlZC5cbiAgICogQHBhcmFtIGUgUG9pbnRlckV2ZW50XG4gICAqL1xuICBwb2ludGVyTW92ZShlOiBQb2ludGVyRXZlbnQpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKHRoaXMuX2lzTW91c2VEb3duKSB7XG4gICAgICBsZXQgbW91c2VQb3MgPSB0aGlzLmdldFJlbGF0aXZlUG9pbnRlclBvcyhlKTtcbiAgICAgIGlmICh0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmhhc0xhc3NvKSB7XG4gICAgICAgIGNvbnN0IG1vdXNlRG93blBvcyA9IHRoaXMuX21vdXNlRG93blBvcztcbiAgICAgICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5yZXNpemVMYXNzbyhcbiAgICAgICAgICBtb3VzZVBvcy54IC0gbW91c2VEb3duUG9zLngsXG4gICAgICAgICAgbW91c2VQb3MueSAtIG1vdXNlRG93blBvcy55LFxuICAgICAgICAgIG1vdXNlRG93blBvc1xuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnNlbGVjdG9ycy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IG1vdXNlQ2hhbmdlID0gdGhpcy5nZXRQb2ludGVyQ2hhbmdlKGUpO1xuICAgICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLm51ZGdlQnkobW91c2VDaGFuZ2VbMF0sIE51ZGdlVHlwZS5PdmVybGF5KTtcbiAgICAgICAgbW91c2VQb3MgPSBtb3VzZUNoYW5nZVsxXTtcbiAgICAgICAgdGhpcy5fbGFzdERyb3Bab25lID0gdGhpcy5fZHJhZ1NlcnZpY2UudXBkYXRlRHJvcFpvbmUoXG4gICAgICAgICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5hY3RpdmVTZWxlY3Rvci5vdmVybGF5LFxuICAgICAgICAgIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgW3RoaXMuX3NlbGVjdGlvblNlcnZpY2UuYWN0aXZlU2VsZWN0b3IuY2xpZW50RWxdXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICB0aGlzLl9sYXN0TW91c2VQb3MgPSBtb3VzZVBvcztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbnN1cmVDdXJzb3IoZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSBwb2ludGVyIGlzIHByZXNzZWQuXG4gICAqIEBwYXJhbSBlIFBvaW50ZXJFdmVudFxuICAgKi9cbiAgcG9pbnRlckRvd24oZTogUG9pbnRlckV2ZW50KSB7XG4gICAgdGhpcy5faXNNb3VzZURvd24gPSB0cnVlO1xuICAgIHRoaXMuX21vdXNlRG93blBvcyA9IHRoaXMuZ2V0UmVsYXRpdmVQb2ludGVyUG9zKGUpO1xuICAgIHRoaXMuX2xhc3RNb3VzZVBvcyA9IHRoaXMuX21vdXNlRG93blBvcztcbiAgICBpZiAoZS50YXJnZXQgPT09IHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuY3JlYXRlbGFzc29TZWxlY3RvcihcbiAgICAgICAgdGhpcy5fbW91c2VEb3duUG9zLngsXG4gICAgICAgIHRoaXMuX21vdXNlRG93blBvcy55XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gZS50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnNlbGVjdEVsZW1lbnQoZWxlbWVudCwgIWUuc2hpZnRLZXkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgcG9pbnRlciBpcyByZWxlYXNlZC5cbiAgICogQHBhcmFtIGUgUG9pbnRlckV2ZW50XG4gICAqL1xuICBwb2ludGVyVXAoZTogUG9pbnRlckV2ZW50KSB7XG4gICAgdGhpcy5faXNNb3VzZURvd24gPSBmYWxzZTtcbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uU2VydmljZS5oYXNMYXNzbykge1xuICAgICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5zZWxlY3RDYXB0dXJlZEVsZW1lbnRzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnN0YXRlID09PSBTZWxlY3Rpb25TdGF0ZS5EcmFnZ2FibGUpIHtcbiAgICAgICAgdGhpcy5tb3ZlU2VsZWN0ZWRFbGVtZW50cyhOdWRnZVR5cGUuT3ZlcmxheSwgZmFsc2UpO1xuICAgICAgICB0aGlzLnRyeURyb3BTZWxlY3RlZEVsZW1lbnRzKCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc3RhdGUgPT09IFNlbGVjdGlvblN0YXRlLlNpemFibGUpIHtcbiAgICAgICAgdGhpcy5yZXNpemVTZWxlY3RlZEVsZW1lbnRzKCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9kcmFnU2VydmljZS5jbGVhckRyb3Bab25lcyh0aGlzLl9lbC5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ2N1cnNvcicsIHRoaXMuX2N1cnNvcik7XG4gICAgdGhpcy5fbGFzdERyb3Bab25lID0gbnVsbDtcbiAgICB0aGlzLl9pbnRlcmFjdGlvblNlcnZpY2Uuc2VsZWN0ZWRFbGVtZW50cyA9IHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuY2xpZW50cztcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEF0dGVtcHMgdG8gZHJvcCB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGVsZW1lbnRzIGludG8gYSBkcm9wIHpvbmVcbiAgICogQHBhcmFtIGUgUG9pbnRlckV2ZW50XG4gICAqL1xuICB0cnlEcm9wU2VsZWN0ZWRFbGVtZW50cygpIHtcbiAgICBjb25zdCBzZWxlY3RvcnMgPSB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnNlbGVjdG9ycztcbiAgICBzZWxlY3RvcnMuZm9yRWFjaChzZWxlY3RvciA9PiB7XG4gICAgICBpZiAodGhpcy5jYW5Ecm9wKHNlbGVjdG9yLmNsaWVudEVsKSkge1xuICAgICAgICB0aGlzLl9kcmFnU2VydmljZS5kcm9wRWxlbWVudChcbiAgICAgICAgICB0aGlzLl9sYXN0RHJvcFpvbmUsXG4gICAgICAgICAgc2VsZWN0b3IuY2xpZW50RWwsXG4gICAgICAgICAgdGhpcy5fZWwubmF0aXZlRWxlbWVudFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UucmVzZWxlY3QoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbnN1cmVzIHRoYXQgdGhlIGFwcHJvcHJpYXRlIGN1cnNvciBpcyBzZXQgd2hlbiBlbGVtZW50IGlzIGRyYWdnYWJsZS5cbiAgICogQHBhcmFtIGUgUG9pbnRlckV2ZW50XG4gICAqL1xuICBlbnN1cmVDdXJzb3IoZTogUG9pbnRlckV2ZW50KSB7XG4gICAgY29uc3QgbW91c2VQb3MgPSBuZXcgUG9pbnQoZS5wYWdlWCwgZS5wYWdlWSk7XG4gICAgY29uc3Qgc2VsZWN0b3IgPSB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnNlbGVjdG9yQXRQb2ludChtb3VzZVBvcyk7XG4gICAgaWYgKHNlbGVjdG9yICYmIGRvbS5lbGVtZW50RHJhZ2dhYmxlKHNlbGVjdG9yLmNsaWVudEVsKSkge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ2N1cnNvcicsICdtb3ZlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsICdjdXJzb3InLCAnZGVmYXVsdCcpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNpemVzIHRoZSBzZWxlY3RlZCBlbGVtZW50cyB0byBtYXRjaCB0aGUgU2VsZWN0b3Igb3ZlcmxheVxuICAgKi9cbiAgcmVzaXplU2VsZWN0ZWRFbGVtZW50cygpIHtcbiAgICBjb25zdCBzZWxlY3RvcnMgPSB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnNlbGVjdG9ycztcbiAgICBjb25zdCBzaXplZEVsZW1lbnRzID0gW107XG4gICAgc2VsZWN0b3JzLmZvckVhY2goc2VsZWN0b3IgPT4ge1xuICAgICAgaWYgKGRvbS5lbGVtZW50U2l6YWJsZShzZWxlY3Rvci5jbGllbnRFbCkpIHtcbiAgICAgICAgc2l6ZWRFbGVtZW50cy5wdXNoKHNlbGVjdG9yLmNsaWVudEVsKTtcbiAgICAgICAgZG9tLmFzc2lnbkJvdW5kaW5nUmVjdChcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlcixcbiAgICAgICAgICBzZWxlY3Rvci5vdmVybGF5LFxuICAgICAgICAgIHNlbGVjdG9yLmNsaWVudEVsXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMucmVzaXplZEVsZW1lbnQuZW1pdChzZWxlY3Rvci5jbGllbnRFbCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5yZXNldFNlbGVjdGlvbigpO1xuICAgIGlmIChzaXplZEVsZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMucmVzaXplZEVsZW1lbnRzLmVtaXQoc2l6ZWRFbGVtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1vdmVzIHNlbGVjdGVkIGVsZW1lbnRzIHRvIHRoZSBjdXJyZW50IGxvY2F0aW9uIG9mIHRoZSBzZWxlY3RvciBvciBzZWxlY3RvciBvdmVybGF5LlxuICAgKiBAcGFyYW0gbnVkZ2VUeXBlIGRldGVybWluZXMgd2hlcmUgdGhlIHNlbGVjdGVkIGVsZW1lbnRzIHNob3VsZCBiZSBtb3ZlZC4gIE9wdGlvbnMgYXJlXG4gICAqIHRvIG1vdmUgdG8gdGhlIGFjdHVhbCBzZWxlY3RvciAoTnVkZ2VUeXBlLlNlbGVjdG9yKSBvciB0aGUgc2VsZWN0b3Igb3ZlcmxheSAoTm9kZ2VUeXBlLk92ZXJsYXkpLlxuICAgKiBVc3VhbGx5IG9ubHkgdGhlIG92ZXJsYXkgaXMgZHJhZ2dlZC9tb3ZlZCwgaGVuY2UgdGhlIGRlZmF1bHQgb2YgTnVkZ2VUeXBlLk92ZXJsYXkuXG4gICAqIEBwYXJhbSByZXNldEFmdGVyTW92ZSBkZXRlcm1pbmVzIGlmIHRoZSBzZWxlY3RvciBzaG91bGQgcmVzZXQgaXRzZWxmIGFmdGVyIGV2ZXJ5IG1vdmUuXG4gICAqL1xuICBtb3ZlU2VsZWN0ZWRFbGVtZW50cyhcbiAgICBudWRnZVR5cGU6IE51ZGdlVHlwZSA9IE51ZGdlVHlwZS5PdmVybGF5LFxuICAgIHJlc2V0QWZ0ZXJNb3ZlID0gdHJ1ZVxuICApIHtcbiAgICBjb25zdCBzZWxlY3RvcnMgPSB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnNlbGVjdG9ycztcbiAgICBjb25zdCBtb3ZlZEVsZW1lbnRzID0gW107XG4gICAgc2VsZWN0b3JzLmZvckVhY2goc2VsZWN0b3IgPT4ge1xuICAgICAgaWYgKGRvbS5lbGVtZW50RHJhZ2dhYmxlKHNlbGVjdG9yLmNsaWVudEVsKSkge1xuICAgICAgICBtb3ZlZEVsZW1lbnRzLnB1c2goc2VsZWN0b3IuY2xpZW50RWwpO1xuICAgICAgICBkb20uYXNzaWduUG9zaXRpb24oXG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIsXG4gICAgICAgICAgbnVkZ2VUeXBlID09PSBOdWRnZVR5cGUuT3ZlcmxheVxuICAgICAgICAgICAgPyBzZWxlY3Rvci5vdmVybGF5XG4gICAgICAgICAgICA6IHNlbGVjdG9yLnNlbGVjdG9yRWwsXG4gICAgICAgICAgc2VsZWN0b3IuY2xpZW50RWxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5tb3ZlZEVsZW1lbnQuZW1pdChzZWxlY3Rvci5jbGllbnRFbCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKHJlc2V0QWZ0ZXJNb3ZlKSB7XG4gICAgICB0aGlzLnJlc2V0U2VsZWN0aW9uKCk7XG4gICAgfVxuICAgIGlmIChtb3ZlZEVsZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMubW92ZWRFbGVtZW50cy5lbWl0KG1vdmVkRWxlbWVudHMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGVzIHNlbGVjdGVkIGVsZW1lbnRzLlxuICAgKi9cbiAgZGVsZXRlU2VsZWN0ZWRFbGVtZW50cygpIHtcbiAgICBjb25zdCBzZWxlY3RvcnMgPSB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnNlbGVjdG9ycztcbiAgICBjb25zdCBkZWxldGVkRWxlbWVudHMgPSBbXTtcbiAgICBmb3IgKGxldCBpbmRleCA9IHNlbGVjdG9ycy5sZW5ndGggLSAxOyBpbmRleCA+PSAwOyBpbmRleC0tKSB7XG4gICAgICBjb25zdCBzZWxlY3RvciA9IHNlbGVjdG9yc1tpbmRleF07XG4gICAgICBpZiAodGhpcy5jYW5EZWxldGUoc2VsZWN0b3IuY2xpZW50RWwpKSB7XG4gICAgICAgIGNvbnN0IGVsID0gc2VsZWN0b3IuY2xpZW50RWw7XG4gICAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuY2xlYXJTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgIHRoaXMuX2ludGVyYWN0aW9uU2VydmljZS5kZWxldGVFbGVtZW50KGVsKTtcbiAgICAgICAgZGVsZXRlZEVsZW1lbnRzLnB1c2goZWwpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9pbnRlcmFjdGlvblNlcnZpY2UuZGVsZXRlRWxlbWVudHMoZGVsZXRlZEVsZW1lbnRzKTtcbiAgICB0aGlzLl9pbnRlcmFjdGlvblNlcnZpY2Uuc2VsZWN0ZWRFbGVtZW50cyA9IHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuY2xpZW50cztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSBuZXcgY2hpbGQgZWxlbWVudCB0byB0aGUgaG9zdCBlbGVtZW50LlxuICAgKi9cbiAgYWRkRWxlbWVudChlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgY29uc3Qgc2VsZWN0b3IgPSB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmFjdGl2ZVNlbGVjdG9yO1xuICAgIGNvbnN0IHBhcmVudCA9IHNlbGVjdG9yICYmIGRvbS5pc0NvbnRhaW5lcihzZWxlY3Rvci5jbGllbnRFbCkgPyBzZWxlY3Rvci5jbGllbnRFbCA6IHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5fcmVuZGVyZXIuYXBwZW5kQ2hpbGQocGFyZW50LCBlbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBtb3VzZSBwb3NpdGlvbiByZWxhdGl2ZSB0byB0aGUgb2Zmc2V0IGFuZCBzY2FsZSBvZiB0aGUgaG9zdCBlbGVtZW50LlxuICAgKiBAcGFyYW0gZSBQb2ludGVyRXZlbnRcbiAgICovXG4gIGdldFJlbGF0aXZlUG9pbnRlclBvcyhlOiBQb2ludGVyRXZlbnQpIHtcbiAgICByZXR1cm4gZG9tLmdldFJlbGF0aXZlUG9pbnRlclBvcyhlLCB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCB0aGlzLnNjYWxlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHBvaW50ZXIgY29vcmRpbmF0ZXMgY2hhbmdlcyByZWxhdGl2ZSB0byB0aGUgc2VsZWN0ZWQgZWxlbWVudC5cbiAgICogQHBhcmFtIGUgUG9pbnRlckV2ZW50XG4gICAqL1xuICBnZXRQb2ludGVyQ2hhbmdlKGU6IFBvaW50ZXJFdmVudCk6IGFueVtdIHtcbiAgICBjb25zdCBwb2ludGVyUG9zID0gdGhpcy5nZXRSZWxhdGl2ZVBvaW50ZXJQb3MoZSk7XG4gICAgbGV0IGxlZnQgPSBwb2ludGVyUG9zLnggLSB0aGlzLl9sYXN0TW91c2VQb3MueDtcbiAgICBsZXQgdG9wID0gcG9pbnRlclBvcy55IC0gdGhpcy5fbGFzdE1vdXNlUG9zLnk7XG4gICAgaWYgKHRoaXMuc25hcCkge1xuICAgICAgaWYgKGxlZnQgJSB0aGlzLnNuYXAgIT09IDApIHtcbiAgICAgICAgbGVmdCA9IDA7XG4gICAgICAgIHBvaW50ZXJQb3MueCA9IHRoaXMuX2xhc3RNb3VzZVBvcy54O1xuICAgICAgfVxuICAgICAgaWYgKHRvcCAlIHRoaXMuc25hcCAhPT0gMCkge1xuICAgICAgICB0b3AgPSAwO1xuICAgICAgICBwb2ludGVyUG9zLnkgPSB0aGlzLl9sYXN0TW91c2VQb3MueTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFtuZXcgUG9pbnQobGVmdCwgdG9wKSwgcG9pbnRlclBvc107XG4gIH1cblxuICAvKipcbiAgICogUmUtc2VsZWN0cyB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGVsZW1lbnRzLiAgVXN1YWxseSBoYXBwZW5zIGFmdGVyXG4gICAqIGFuIGVsZW1lbnQgaXMgbW92ZWQgb3IgcmVzaXplZC5cbiAgICovXG4gIHJlc2V0U2VsZWN0aW9uKCkge1xuICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UucmVzZWxlY3QoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYW5jZWxzIHRoZSBjdXJyZW50IHNlbGVjdGlvbnMgb3IgZHJhZyBvcGVyYXRpb24uICBJZiB0aGUgZWxlbWVudHMgYXJlIGJlaW5nIGRyYWdnZWQsXG4gICAqIHRoZSBkcmFnIG9wZXJhdGlvbiBpcyBjYW5jZWxsZWQgYW5kIHRoZSBlbGVtZW50cyByZXNlbGVjdGVkLiAgT3RoZXJ3aXNlLCB0aGUgZWxlbWVudHNcbiAgICogYXJlIHVuc2VsZWN0ZWQuXG4gICAqL1xuICBjYW5jZWxTZWxlY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuX2lzTW91c2VEb3duKSB7XG4gICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnJlc2VsZWN0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuY2xlYXJTZWxlY3RvcnMoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5fZWwubmF0aXZlRWxlbWVudCAmJiB0aGlzLl9yZW5kZXJlcikge1xuICAgICAgdGhpcy5faW50ZXJhY3Rpb25TZXJ2aWNlLmludGVyYWN0aW9uSG9zdCA9IHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmludGVyYWN0aW9uSG9zdCA9IHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmlzTGFzc29TZWxlY3RhYmxlID0gdGhpcy5pc0xhc3NvU2VsZWN0YWJsZTtcbiAgICAgIHRoaXMuX2N1cnNvciA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5fZWwubmF0aXZlRWxlbWVudCkuY3Vyc29yO1xuICAgICAgdGhpcy5fZGVsZXRlU2VsZWN0ZWRFbGVtZW50c1N1YnNjcmlwdGlvbiA9IHRoaXMuX2ludGVyYWN0aW9uU2VydmljZS5kZWxldGVTZWxlY3RlZEVsZW1lbnRzJC5zdWJzY3JpYmUoXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICAgdGhpcy5kZWxldGVTZWxlY3RlZEVsZW1lbnRzKCk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgICB0aGlzLl9hZGRFbGVtZW50U3Vic2NyaXB0aW9uID0gdGhpcy5faW50ZXJhY3Rpb25TZXJ2aWNlLmFkZEVsZW1lbnQkLnN1YnNjcmliZShcbiAgICAgICAgZWxlbWVudCA9PiB7XG4gICAgICAgICAgLy8gdGhpcy5hZGRFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX2xhc3REcm9wWm9uZSA9IG51bGw7XG4gICAgdGhpcy5fZGVsZXRlU2VsZWN0ZWRFbGVtZW50c1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2FkZEVsZW1lbnRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19