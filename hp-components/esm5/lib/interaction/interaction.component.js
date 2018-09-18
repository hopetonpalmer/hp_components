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
var InteractionComponent = /** @class */ (function () {
    function InteractionComponent(_renderer, _dragService, _sizeService, _interactionService, _selectionService) {
        var _this = this;
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
        this.canDelete = function () { return true; };
        this.canDrop = function () { return true; };
        this._selectionService.renderer = this._renderer;
        this._sizeService.renderer = this._renderer;
        this._dragService.renderer = this._renderer;
        this._interactionService.renderer = this._renderer;
        this._keyDownSubject.subscribe(function (e) { return _this.keyDownHandler(e); });
    }
    /**
     * Called when the keyboard key is released.
     * @param e KeyboardEvent
     */
    /**
     * Called when the keyboard key is released.
     * @param {?} e KeyboardEvent
     * @return {?}
     */
    InteractionComponent.prototype.keyUp = /**
     * Called when the keyboard key is released.
     * @param {?} e KeyboardEvent
     * @return {?}
     */
    function (e) {
        if (e.code === 'Delete' && this._selectionService.selectors.length > 0) {
            this.deleteSelectedElements();
        }
    };
    /**
     * Called when the keyboard key is pressed.
     * @param e KeyboardEvent
     */
    /**
     * Called when the keyboard key is pressed.
     * @param {?} e KeyboardEvent
     * @return {?}
     */
    InteractionComponent.prototype.keyPress = /**
     * Called when the keyboard key is pressed.
     * @param {?} e KeyboardEvent
     * @return {?}
     */
    function (e) {
        if (this._selectionService.selectors.length > 0) {
            e.stopPropagation();
        }
    };
    /**
     * Called when the keyboard key is pressed.
     * @param e KeyboardEvent
     */
    /**
     * Called when the keyboard key is pressed.
     * @param {?} e KeyboardEvent
     * @return {?}
     */
    InteractionComponent.prototype.keyDown = /**
     * Called when the keyboard key is pressed.
     * @param {?} e KeyboardEvent
     * @return {?}
     */
    function (e) {
        this._keyDownSubject.next(e);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    InteractionComponent.prototype.keyDownHandler = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
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
            var delta = void 0;
            /** @type {?} */
            var snap = this.snap ? this.snap : 1;
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
    };
    /**
     * Ensures that the default HTML5 dragging operations do not execute.
     */
    /**
     * Ensures that the default HTML5 dragging operations do not execute.
     * @return {?}
     */
    InteractionComponent.prototype.dragStart = /**
     * Ensures that the default HTML5 dragging operations do not execute.
     * @return {?}
     */
    function () {
        // -- prevent default drag
        return false;
    };
    /**
     * Called when the pointer is moved.
     * @param e PointerEvent
     */
    /**
     * Called when the pointer is moved.
     * @param {?} e PointerEvent
     * @return {?}
     */
    InteractionComponent.prototype.pointerMove = /**
     * Called when the pointer is moved.
     * @param {?} e PointerEvent
     * @return {?}
     */
    function (e) {
        e.preventDefault();
        if (this._isMouseDown) {
            /** @type {?} */
            var mousePos = this.getRelativePointerPos(e);
            if (this._selectionService.hasLasso) {
                /** @type {?} */
                var mouseDownPos = this._mouseDownPos;
                this._selectionService.resizeLasso(mousePos.x - mouseDownPos.x, mousePos.y - mouseDownPos.y, mouseDownPos);
            }
            else if (this._selectionService.selectors.length > 0) {
                /** @type {?} */
                var mouseChange = this.getPointerChange(e);
                this._selectionService.nudgeBy(mouseChange[0], NudgeType.Overlay);
                mousePos = mouseChange[1];
                this._lastDropZone = this._dragService.updateDropZone(this._selectionService.activeSelector.overlay, this._el.nativeElement, [this._selectionService.activeSelector.clientEl]);
            }
            this._lastMousePos = mousePos;
        }
        else {
            this.ensureCursor(e);
        }
    };
    /**
     * Called when the pointer is pressed.
     * @param e PointerEvent
     */
    /**
     * Called when the pointer is pressed.
     * @param {?} e PointerEvent
     * @return {?}
     */
    InteractionComponent.prototype.pointerDown = /**
     * Called when the pointer is pressed.
     * @param {?} e PointerEvent
     * @return {?}
     */
    function (e) {
        this._isMouseDown = true;
        this._mouseDownPos = this.getRelativePointerPos(e);
        this._lastMousePos = this._mouseDownPos;
        if (e.target === this._el.nativeElement) {
            this._selectionService.createlassoSelector(this._mouseDownPos.x, this._mouseDownPos.y);
        }
        else {
            /** @type {?} */
            var element = /** @type {?} */ (e.target);
            this._selectionService.selectElement(element, !e.shiftKey);
        }
    };
    /**
     * Called when the pointer is released.
     * @param e PointerEvent
     */
    /**
     * Called when the pointer is released.
     * @param {?} e PointerEvent
     * @return {?}
     */
    InteractionComponent.prototype.pointerUp = /**
     * Called when the pointer is released.
     * @param {?} e PointerEvent
     * @return {?}
     */
    function (e) {
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
    };
    /**
     * Attemps to drop the currently selected elements into a drop zone
     * @param e PointerEvent
     */
    /**
     * Attemps to drop the currently selected elements into a drop zone
     * @return {?}
     */
    InteractionComponent.prototype.tryDropSelectedElements = /**
     * Attemps to drop the currently selected elements into a drop zone
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var selectors = this._selectionService.selectors;
        selectors.forEach(function (selector) {
            if (_this.canDrop(selector.clientEl)) {
                _this._dragService.dropElement(_this._lastDropZone, selector.clientEl, _this._el.nativeElement);
            }
        });
        this._selectionService.reselect();
    };
    /**
     * Ensures that the appropriate cursor is set when element is draggable.
     * @param e PointerEvent
     */
    /**
     * Ensures that the appropriate cursor is set when element is draggable.
     * @param {?} e PointerEvent
     * @return {?}
     */
    InteractionComponent.prototype.ensureCursor = /**
     * Ensures that the appropriate cursor is set when element is draggable.
     * @param {?} e PointerEvent
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var mousePos = new Point(e.pageX, e.pageY);
        /** @type {?} */
        var selector = this._selectionService.selectorAtPoint(mousePos);
        if (selector && dom.elementDraggable(selector.clientEl)) {
            this._renderer.setStyle(this._el.nativeElement, 'cursor', 'move');
        }
        else {
            this._renderer.setStyle(this._el.nativeElement, 'cursor', 'default');
        }
    };
    /**
     * Resizes the selected elements to match the Selector overlay
     */
    /**
     * Resizes the selected elements to match the Selector overlay
     * @return {?}
     */
    InteractionComponent.prototype.resizeSelectedElements = /**
     * Resizes the selected elements to match the Selector overlay
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var selectors = this._selectionService.selectors;
        /** @type {?} */
        var sizedElements = [];
        selectors.forEach(function (selector) {
            if (dom.elementSizable(selector.clientEl)) {
                sizedElements.push(selector.clientEl);
                dom.assignBoundingRect(_this._renderer, selector.overlay, selector.clientEl);
                _this.resizedElement.emit(selector.clientEl);
            }
        });
        this.resetSelection();
        if (sizedElements.length > 0) {
            this.resizedElements.emit(sizedElements);
        }
    };
    /**
     * Moves selected elements to the current location of the selector or selector overlay.
     * @param nudgeType determines where the selected elements should be moved.  Options are
     * to move to the actual selector (NudgeType.Selector) or the selector overlay (NodgeType.Overlay).
     * Usually only the overlay is dragged/moved, hence the default of NudgeType.Overlay.
     * @param resetAfterMove determines if the selector should reset itself after every move.
     */
    /**
     * Moves selected elements to the current location of the selector or selector overlay.
     * @param {?=} nudgeType determines where the selected elements should be moved.  Options are
     * to move to the actual selector (NudgeType.Selector) or the selector overlay (NodgeType.Overlay).
     * Usually only the overlay is dragged/moved, hence the default of NudgeType.Overlay.
     * @param {?=} resetAfterMove determines if the selector should reset itself after every move.
     * @return {?}
     */
    InteractionComponent.prototype.moveSelectedElements = /**
     * Moves selected elements to the current location of the selector or selector overlay.
     * @param {?=} nudgeType determines where the selected elements should be moved.  Options are
     * to move to the actual selector (NudgeType.Selector) or the selector overlay (NodgeType.Overlay).
     * Usually only the overlay is dragged/moved, hence the default of NudgeType.Overlay.
     * @param {?=} resetAfterMove determines if the selector should reset itself after every move.
     * @return {?}
     */
    function (nudgeType, resetAfterMove) {
        var _this = this;
        if (nudgeType === void 0) { nudgeType = NudgeType.Overlay; }
        if (resetAfterMove === void 0) { resetAfterMove = true; }
        /** @type {?} */
        var selectors = this._selectionService.selectors;
        /** @type {?} */
        var movedElements = [];
        selectors.forEach(function (selector) {
            if (dom.elementDraggable(selector.clientEl)) {
                movedElements.push(selector.clientEl);
                dom.assignPosition(_this._renderer, nudgeType === NudgeType.Overlay
                    ? selector.overlay
                    : selector.selectorEl, selector.clientEl);
                _this.movedElement.emit(selector.clientEl);
            }
        });
        if (resetAfterMove) {
            this.resetSelection();
        }
        if (movedElements.length > 0) {
            this.movedElements.emit(movedElements);
        }
    };
    /**
     * Deletes selected elements.
     */
    /**
     * Deletes selected elements.
     * @return {?}
     */
    InteractionComponent.prototype.deleteSelectedElements = /**
     * Deletes selected elements.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var selectors = this._selectionService.selectors;
        /** @type {?} */
        var deletedElements = [];
        for (var index = selectors.length - 1; index >= 0; index--) {
            /** @type {?} */
            var selector = selectors[index];
            if (this.canDelete(selector.clientEl)) {
                /** @type {?} */
                var el = selector.clientEl;
                this._selectionService.clearSelector(selector);
                this._interactionService.deleteElement(el);
                deletedElements.push(el);
            }
        }
        this._interactionService.deleteElements(deletedElements);
        this._interactionService.selectedElements = this._selectionService.clients;
    };
    /**
     * Add a new child element to the host element.
     */
    /**
     * Add a new child element to the host element.
     * @param {?} element
     * @return {?}
     */
    InteractionComponent.prototype.addElement = /**
     * Add a new child element to the host element.
     * @param {?} element
     * @return {?}
     */
    function (element) {
        /** @type {?} */
        var selector = this._selectionService.activeSelector;
        /** @type {?} */
        var parent = selector && dom.isContainer(selector.clientEl) ? selector.clientEl : this._el.nativeElement;
        this._renderer.appendChild(parent, element);
    };
    /**
     * Gets the mouse position relative to the offset and scale of the host element.
     * @param e PointerEvent
     */
    /**
     * Gets the mouse position relative to the offset and scale of the host element.
     * @param {?} e PointerEvent
     * @return {?}
     */
    InteractionComponent.prototype.getRelativePointerPos = /**
     * Gets the mouse position relative to the offset and scale of the host element.
     * @param {?} e PointerEvent
     * @return {?}
     */
    function (e) {
        return dom.getRelativePointerPos(e, this._el.nativeElement, this.scale);
    };
    /**
     * Gets pointer coordinates changes relative to the selected element.
     * @param e PointerEvent
     */
    /**
     * Gets pointer coordinates changes relative to the selected element.
     * @param {?} e PointerEvent
     * @return {?}
     */
    InteractionComponent.prototype.getPointerChange = /**
     * Gets pointer coordinates changes relative to the selected element.
     * @param {?} e PointerEvent
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var pointerPos = this.getRelativePointerPos(e);
        /** @type {?} */
        var left = pointerPos.x - this._lastMousePos.x;
        /** @type {?} */
        var top = pointerPos.y - this._lastMousePos.y;
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
    };
    /**
     * Re-selects the currently selected elements.  Usually happens after
     * an element is moved or resized.
     */
    /**
     * Re-selects the currently selected elements.  Usually happens after
     * an element is moved or resized.
     * @return {?}
     */
    InteractionComponent.prototype.resetSelection = /**
     * Re-selects the currently selected elements.  Usually happens after
     * an element is moved or resized.
     * @return {?}
     */
    function () {
        this._selectionService.reselect();
    };
    /**
     * Cancels the current selections or drag operation.  If the elements are being dragged,
     * the drag operation is cancelled and the elements reselected.  Otherwise, the elements
     * are unselected.
     */
    /**
     * Cancels the current selections or drag operation.  If the elements are being dragged,
     * the drag operation is cancelled and the elements reselected.  Otherwise, the elements
     * are unselected.
     * @return {?}
     */
    InteractionComponent.prototype.cancelSelection = /**
     * Cancels the current selections or drag operation.  If the elements are being dragged,
     * the drag operation is cancelled and the elements reselected.  Otherwise, the elements
     * are unselected.
     * @return {?}
     */
    function () {
        if (this._isMouseDown) {
            this._selectionService.reselect();
        }
        else {
            this._selectionService.clearSelectors();
        }
    };
    /**
     * @return {?}
     */
    InteractionComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._el.nativeElement && this._renderer) {
            this._interactionService.interactionHost = this._el.nativeElement;
            this._selectionService.interactionHost = this._el.nativeElement;
            this._selectionService.isLassoSelectable = this.isLassoSelectable;
            this._cursor = getComputedStyle(this._el.nativeElement).cursor;
            this._deleteSelectedElementsSubscription = this._interactionService.deleteSelectedElements$.subscribe(function () {
                _this.deleteSelectedElements();
            });
            this._addElementSubscription = this._interactionService.addElement$.subscribe(function (element) {
                // this.addElement(element);
            });
        }
    };
    /**
     * @return {?}
     */
    InteractionComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._lastDropZone = null;
        this._deleteSelectedElementsSubscription.unsubscribe();
        this._addElementSubscription.unsubscribe();
    };
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
    InteractionComponent.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: DragService },
        { type: SizeService },
        { type: InteractionService },
        { type: SelectorService }
    ]; };
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
    return InteractionComponent;
}());
export { InteractionComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJhY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaHAtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbImxpYi9pbnRlcmFjdGlvbi9pbnRlcmFjdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQVUsaUJBQWlCLEVBQUUsdUJBQXVCLEVBQzdELEtBQUssRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUM5RCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLFNBQVMsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzFGLE9BQU8sS0FBSyxHQUFHLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzNELE9BQU8sRUFBRSxPQUFPLEVBQTRCLE1BQU0sTUFBTSxDQUFDOzs7Ozs7OztJQW1GdkQsOEJBQ1UsV0FDQSxjQUNBLGNBQ0EscUJBQ0E7UUFMVixpQkFZQztRQVhTLGNBQVMsR0FBVCxTQUFTO1FBQ1QsaUJBQVksR0FBWixZQUFZO1FBQ1osaUJBQVksR0FBWixZQUFZO1FBQ1osd0JBQW1CLEdBQW5CLG1CQUFtQjtRQUNuQixzQkFBaUIsR0FBakIsaUJBQWlCOzRCQXZFSixLQUFLOzZCQUNKLElBQUksS0FBSyxFQUFFOytCQVNULElBQUksT0FBTyxFQUFpQjs7Ozs7cUJBTzlDLENBQUM7Ozs7b0JBTUYsQ0FBQzs7Ozs4QkFNUyxFQUFFOzs7OytCQU1ELEVBQUU7Ozs7aUNBTUEsSUFBSTs7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QUFDO0tBQzVDOztnQkEzZEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLHdkQUEyQztvQkFFM0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDaEQ7Ozs7Z0JBeEJRLFNBQVM7Z0JBR1QsV0FBVztnQkFDWCxXQUFXO2dCQUlYLGtCQUFrQjtnQkFIbEIsZUFBZTs7O3NCQTZCckIsU0FBUyxTQUFDLHNCQUFzQjt3QkFRaEMsS0FBSzt1QkFNTCxLQUFLO2lDQU1MLEtBQUs7a0NBTUwsS0FBSztvQ0FNTCxLQUFLO3VDQU1MLEtBQUs7aUNBR0wsTUFBTTtrQ0FFTixNQUFNOytCQUVOLE1BQU07Z0NBRU4sTUFBTTtnQ0FFTixNQUFNOzRCQUdOLEtBQUs7MEJBR0wsS0FBSzs7K0JBM0ZSOztTQTJCYSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsIE9uSW5pdCwgVmlld0VuY2Fwc3VsYXRpb24sIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBJbnB1dCwgUmVuZGVyZXIyLCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkRlc3Ryb3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGRpc3RpbmN0VW50aWxLZXlDaGFuZ2VkLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEcmFnU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2RyYWcuc2VydmljZSc7XG5pbXBvcnQgeyBTaXplU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3NpemUuc2VydmljZSc7XG5pbXBvcnQgeyBTZWxlY3RvclNlcnZpY2UsIFNlbGVjdGlvblN0YXRlLCBOdWRnZVR5cGUgfSBmcm9tICcuLi9zZWxlY3Rvci9zZWxlY3Rvci5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIGRvbSBmcm9tICcuLi9zY3JpcHRzL2RvbSc7XG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJy4uL3NjcmlwdHMvbWF0aCc7XG5pbXBvcnQgeyBJbnRlcmFjdGlvblNlcnZpY2UgfSBmcm9tICcuL2ludGVyYWN0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3ViamVjdCwgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cblxuZXhwb3J0IHR5cGUgSUNhbmNlbGxhYmxlID0gKCB2YWx1ZTogYW55ICkgID0+IGJvb2xlYW47XG5cbi8qKlxuICogSGFuZGxlcyBzZWxlY3Rpb24sIHNpemluZywgZGVsZXRpb25zLCBhbmQgZHJhZ2dpbmcgaW50ZXJhY3Rpb25zIHdpdGggYW55IGNoaWxkIEVsZW1lbnQuXG4gKi9cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaHBjLWludGVyYWN0aW9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ludGVyYWN0aW9uLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vaW50ZXJhY3Rpb24uY29tcG9uZW50LmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBJbnRlcmFjdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfaXNNb3VzZURvd24gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfbW91c2VEb3duUG9zID0gbmV3IFBvaW50KCk7XG4gIHByaXZhdGUgX2xhc3RNb3VzZVBvczogUG9pbnQ7XG4gIHByaXZhdGUgX2N1cnNvcjogc3RyaW5nO1xuICBwcml2YXRlIF9sYXN0RHJvcFpvbmU6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9kZWxldGVTZWxlY3RlZEVsZW1lbnRzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgX2FkZEVsZW1lbnRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBAVmlld0NoaWxkKCdpbnRlcmFjdGlvbkNvbnRhaW5lcicpXG4gIHByaXZhdGUgX2VsOiBFbGVtZW50UmVmO1xuICBwcml2YXRlIF9rZXlEb3duU3ViamVjdCA9IG5ldyBTdWJqZWN0PEtleWJvYXJkRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFNjYWxlIHZhbHVlIHRvIGFwcGx5IHRvIHRoZSBJbnRlcmFjdGlvbiBob3N0IGVsZW1lbnQuICBUaGUgdmFsdWUgaXMgYXBwbGllZFxuICAgKiB0byBib3RoIHNjYWxlWCBhbmQgc2NhbGVZIG9mIHRoZSBob3N0IGVsZW1lbnQuXG4gICAqL1xuICBASW5wdXQoKVxuICBzY2FsZSA9IDE7XG5cbiAgLyoqXG4gICAqIERldGVybWlucyBpZiBlbGVtZW50cyBzcGFuIHdoZW4gc2l6ZWQgb3IgZHJhZ2dlZFxuICAgKi9cbiAgQElucHV0KClcbiAgc25hcCA9IDA7XG5cbiAgLyoqXG4gICAqIEdldHMgb3Igc2V0cyB0aGUgbWluaW11bSB3aWR0aCBvZiB0aGUgZWxlbWVudCB3aGVuIGRyYWctc2l6ZWQuXG4gICAqL1xuICBASW5wdXQoKVxuICBtaW5TaXppbmdXaWR0aCA9IDMwO1xuXG4gIC8qKlxuICAgKiBHZXRzIG9yIHNldHMgdGhlIG1pbmltdW0gaGVpZ2h0IG9mIHRoZSBlbGVtZW50IHdoZW4gZHJhZy1zaXplZC5cbiAgICovXG4gIEBJbnB1dCgpXG4gIG1pblNpemluZ0hlaWdodCA9IDMwO1xuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIGlmIGVsZW1lbnRzIGNhbiBiZSBzZWxlY3RlZCBieSBkcmFnZ2luZyBhcm91bmQgKGxhc3NvKSB0aGVtIGFuZCByZWxlYXNpbmcgdGhlIHBvaW50ZXIuXG4gICAqL1xuICBASW5wdXQoKVxuICBpc0xhc3NvU2VsZWN0YWJsZSA9IHRydWU7XG5cbiAgLyoqXG4gICAqIE9wdGlvbmFsbHkgc2V0IFwiY2hlY2tlcnNcIiBiYWNrZ3JvdW5kIGZvciB0aGUgaW50ZXJhY3Rpb24gaG9zdC4gIFVzZWZ1bCB3aGVuIGJ1aWxkaW5nIElERS1saWtlIGludGVyYWN0aXZlIFVJLlxuICAgKi9cbiAgQElucHV0KClcbiAgaXNDaGVja2Vyc0JhY2tncm91bmQgPSBmYWxzZTtcblxuICBAT3V0cHV0KClcbiAgcmVzaXplZEVsZW1lbnQgPSBuZXcgRXZlbnRFbWl0dGVyPEhUTUxFbGVtZW50PigpO1xuICBAT3V0cHV0KClcbiAgcmVzaXplZEVsZW1lbnRzID0gbmV3IEV2ZW50RW1pdHRlcjxIVE1MRWxlbWVudFtdPigpO1xuICBAT3V0cHV0KClcbiAgbW92ZWRFbGVtZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxIVE1MRWxlbWVudD4oKTtcbiAgQE91dHB1dCgpXG4gIG1vdmVkRWxlbWVudHMgPSBuZXcgRXZlbnRFbWl0dGVyPEhUTUxFbGVtZW50W10+KCk7XG4gIEBPdXRwdXQoKVxuICBzZWxlY3RFbGVtZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxIVE1MRWxlbWVudD4oKTtcblxuICBASW5wdXQoKVxuICBjYW5EZWxldGU6IElDYW5jZWxsYWJsZSA9ICgpID0+IHRydWVcblxuICBASW5wdXQoKVxuICBjYW5Ecm9wOiBJQ2FuY2VsbGFibGUgPSAoKSA9PiB0cnVlXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIF9kcmFnU2VydmljZTogRHJhZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBfc2l6ZVNlcnZpY2U6IFNpemVTZXJ2aWNlLFxuICAgIHByaXZhdGUgX2ludGVyYWN0aW9uU2VydmljZTogSW50ZXJhY3Rpb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgX3NlbGVjdGlvblNlcnZpY2U6IFNlbGVjdG9yU2VydmljZVxuICApIHtcbiAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnJlbmRlcmVyID0gdGhpcy5fcmVuZGVyZXI7XG4gICAgdGhpcy5fc2l6ZVNlcnZpY2UucmVuZGVyZXIgPSB0aGlzLl9yZW5kZXJlcjtcbiAgICB0aGlzLl9kcmFnU2VydmljZS5yZW5kZXJlciA9IHRoaXMuX3JlbmRlcmVyO1xuICAgIHRoaXMuX2ludGVyYWN0aW9uU2VydmljZS5yZW5kZXJlciA9IHRoaXMuX3JlbmRlcmVyO1xuICAgIHRoaXMuX2tleURvd25TdWJqZWN0LnN1YnNjcmliZShlID0+IHRoaXMua2V5RG93bkhhbmRsZXIoZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSBrZXlib2FyZCBrZXkgaXMgcmVsZWFzZWQuXG4gICAqIEBwYXJhbSBlIEtleWJvYXJkRXZlbnRcbiAgICovXG4gIGtleVVwKGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAoZS5jb2RlID09PSAnRGVsZXRlJyAmJiB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnNlbGVjdG9ycy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmRlbGV0ZVNlbGVjdGVkRWxlbWVudHMoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIGtleWJvYXJkIGtleSBpcyBwcmVzc2VkLlxuICAgKiBAcGFyYW0gZSBLZXlib2FyZEV2ZW50XG4gICAqL1xuICBrZXlQcmVzcyhlKSB7XG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc2VsZWN0b3JzLmxlbmd0aCA+IDApIHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSBrZXlib2FyZCBrZXkgaXMgcHJlc3NlZC5cbiAgICogQHBhcmFtIGUgS2V5Ym9hcmRFdmVudFxuICAgKi9cbiAga2V5RG93bihlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgdGhpcy5fa2V5RG93blN1YmplY3QubmV4dChlKTtcbiAgfVxuXG4gIGtleURvd25IYW5kbGVyKGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAvLyBkZWJvdW5jZVRpbWUoNTAwMCk7XG4gICAgLyogICAgaWYgKFxuICAgICAgZS5jb2RlICE9PSAnRGVsZXRlJyAmJlxuICAgICAgZS5jb2RlICE9PSAnRXNjYXBlJyAmJlxuICAgICAgZS5jb2RlICE9PSAnQXJyb3dMZWZ0JyAmJlxuICAgICAgZS5jb2RlICE9PSAnQXJyb3dVcCcgJiZcbiAgICAgIGUuY29kZSAhPT0gJ0Fycm93UmlnaHQnICYmXG4gICAgICBlLmNvZGUgIT09ICdBcnJvd0Rvd24nXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfSovXG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc2VsZWN0b3JzLmxlbmd0aCA+IDApIHtcbiAgICAgIGxldCBkZWx0YTogUG9pbnQ7XG4gICAgICBjb25zdCBzbmFwID0gdGhpcy5zbmFwID8gdGhpcy5zbmFwIDogMTtcbiAgICAgIGlmIChlLmNvZGUgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgIHRoaXMuY2FuY2VsU2VsZWN0aW9uKCk7XG4gICAgICB9XG4gICAgICBpZiAoZS5zaGlmdEtleSkge1xuICAgICAgICBpZiAoZS5jdHJsS2V5KSB7XG4gICAgICAgICAgc3dpdGNoIChcbiAgICAgICAgICAgIGUuY29kZVxuICAgICAgICAgICAgLyogICAgICAgICBjYXNlIDM3OlxuICAgICAgICAgICAgICBzZWxmLmFsaWduU2VsZWN0ZWRFbGVtZW50cyhBbGlnblBvc2l0aW9uLkxlZnQpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgICAgIHNlbGYuYWxpZ25TZWxlY3RlZEVsZW1lbnRzKEFsaWduUG9zaXRpb24uVG9wKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM5OlxuICAgICAgICAgICAgICBzZWxmLmFsaWduU2VsZWN0ZWRFbGVtZW50cyhBbGlnblBvc2l0aW9uLlJpZ2h0KTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQwOlxuICAgICAgICAgICAgICBzZWxmLmFsaWduU2VsZWN0ZWRFbGVtZW50cyhBbGlnblBvc2l0aW9uLkJvdHRvbSk7XG4gICAgICAgICAgICAgIGJyZWFrOyAqL1xuICAgICAgICAgICkge1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWx0YSA9IG5ldyBQb2ludCgpO1xuICAgICAgICAgIHN3aXRjaCAoZS5jb2RlKSB7XG4gICAgICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgICAgICBkZWx0YSA9IG5ldyBQb2ludCgtc25hcCwgMCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICAgIGRlbHRhID0gbmV3IFBvaW50KDAsIC1zbmFwKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICAgICAgZGVsdGEgPSBuZXcgUG9pbnQoc25hcCwgMCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgICAgZGVsdGEgPSBuZXcgUG9pbnQoMCwgc25hcCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9zaXplU2VydmljZS5ncmlwS2V5ID0gJ2tleWJvYXJkJztcbiAgICAgICAgICB0aGlzLl9zaXplU2VydmljZS5zaXplRWxlbWVudHNCeShcbiAgICAgICAgICAgIGRlbHRhLFxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5zZWxlY3RvckVsZW1lbnRzXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLl9zaXplU2VydmljZS5zaXplRWxlbWVudHNCeShcbiAgICAgICAgICAgIGRlbHRhLFxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5jbGllbnRzXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVsdGEgPSBuZXcgUG9pbnQoKTtcbiAgICAgICAgc3dpdGNoIChlLmNvZGUpIHtcbiAgICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgICAgZGVsdGEgPSBuZXcgUG9pbnQoLXNuYXAsIDApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICBkZWx0YSA9IG5ldyBQb2ludCgwLCAtc25hcCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICAgIGRlbHRhID0gbmV3IFBvaW50KHNuYXAsIDApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgIGRlbHRhID0gbmV3IFBvaW50KDAsIHNuYXApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9kcmFnU2VydmljZS5kcmFnRWxlbWVudHNCeShcbiAgICAgICAgICBkZWx0YSxcbiAgICAgICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnNlbGVjdG9yRWxlbWVudHNcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5fZHJhZ1NlcnZpY2UuZHJhZ0VsZW1lbnRzQnkoZGVsdGEsIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuY2xpZW50cyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEVuc3VyZXMgdGhhdCB0aGUgZGVmYXVsdCBIVE1MNSBkcmFnZ2luZyBvcGVyYXRpb25zIGRvIG5vdCBleGVjdXRlLlxuICAgKi9cbiAgZHJhZ1N0YXJ0KCkge1xuICAgIC8vIC0tIHByZXZlbnQgZGVmYXVsdCBkcmFnXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSBwb2ludGVyIGlzIG1vdmVkLlxuICAgKiBAcGFyYW0gZSBQb2ludGVyRXZlbnRcbiAgICovXG4gIHBvaW50ZXJNb3ZlKGU6IFBvaW50ZXJFdmVudCkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAodGhpcy5faXNNb3VzZURvd24pIHtcbiAgICAgIGxldCBtb3VzZVBvcyA9IHRoaXMuZ2V0UmVsYXRpdmVQb2ludGVyUG9zKGUpO1xuICAgICAgaWYgKHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuaGFzTGFzc28pIHtcbiAgICAgICAgY29uc3QgbW91c2VEb3duUG9zID0gdGhpcy5fbW91c2VEb3duUG9zO1xuICAgICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnJlc2l6ZUxhc3NvKFxuICAgICAgICAgIG1vdXNlUG9zLnggLSBtb3VzZURvd25Qb3MueCxcbiAgICAgICAgICBtb3VzZVBvcy55IC0gbW91c2VEb3duUG9zLnksXG4gICAgICAgICAgbW91c2VEb3duUG9zXG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc2VsZWN0b3JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgbW91c2VDaGFuZ2UgPSB0aGlzLmdldFBvaW50ZXJDaGFuZ2UoZSk7XG4gICAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UubnVkZ2VCeShtb3VzZUNoYW5nZVswXSwgTnVkZ2VUeXBlLk92ZXJsYXkpO1xuICAgICAgICBtb3VzZVBvcyA9IG1vdXNlQ2hhbmdlWzFdO1xuICAgICAgICB0aGlzLl9sYXN0RHJvcFpvbmUgPSB0aGlzLl9kcmFnU2VydmljZS51cGRhdGVEcm9wWm9uZShcbiAgICAgICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmFjdGl2ZVNlbGVjdG9yLm92ZXJsYXksXG4gICAgICAgICAgdGhpcy5fZWwubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICBbdGhpcy5fc2VsZWN0aW9uU2VydmljZS5hY3RpdmVTZWxlY3Rvci5jbGllbnRFbF1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2xhc3RNb3VzZVBvcyA9IG1vdXNlUG9zO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVuc3VyZUN1cnNvcihlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIHBvaW50ZXIgaXMgcHJlc3NlZC5cbiAgICogQHBhcmFtIGUgUG9pbnRlckV2ZW50XG4gICAqL1xuICBwb2ludGVyRG93bihlOiBQb2ludGVyRXZlbnQpIHtcbiAgICB0aGlzLl9pc01vdXNlRG93biA9IHRydWU7XG4gICAgdGhpcy5fbW91c2VEb3duUG9zID0gdGhpcy5nZXRSZWxhdGl2ZVBvaW50ZXJQb3MoZSk7XG4gICAgdGhpcy5fbGFzdE1vdXNlUG9zID0gdGhpcy5fbW91c2VEb3duUG9zO1xuICAgIGlmIChlLnRhcmdldCA9PT0gdGhpcy5fZWwubmF0aXZlRWxlbWVudCkge1xuICAgICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5jcmVhdGVsYXNzb1NlbGVjdG9yKFxuICAgICAgICB0aGlzLl9tb3VzZURvd25Qb3MueCxcbiAgICAgICAgdGhpcy5fbW91c2VEb3duUG9zLnlcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBlLnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc2VsZWN0RWxlbWVudChlbGVtZW50LCAhZS5zaGlmdEtleSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSBwb2ludGVyIGlzIHJlbGVhc2VkLlxuICAgKiBAcGFyYW0gZSBQb2ludGVyRXZlbnRcbiAgICovXG4gIHBvaW50ZXJVcChlOiBQb2ludGVyRXZlbnQpIHtcbiAgICB0aGlzLl9pc01vdXNlRG93biA9IGZhbHNlO1xuICAgIGlmICh0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmhhc0xhc3NvKSB7XG4gICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnNlbGVjdENhcHR1cmVkRWxlbWVudHMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc3RhdGUgPT09IFNlbGVjdGlvblN0YXRlLkRyYWdnYWJsZSkge1xuICAgICAgICB0aGlzLm1vdmVTZWxlY3RlZEVsZW1lbnRzKE51ZGdlVHlwZS5PdmVybGF5LCBmYWxzZSk7XG4gICAgICAgIHRoaXMudHJ5RHJvcFNlbGVjdGVkRWxlbWVudHMoKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fc2VsZWN0aW9uU2VydmljZS5zdGF0ZSA9PT0gU2VsZWN0aW9uU3RhdGUuU2l6YWJsZSkge1xuICAgICAgICB0aGlzLnJlc2l6ZVNlbGVjdGVkRWxlbWVudHMoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2RyYWdTZXJ2aWNlLmNsZWFyRHJvcFpvbmVzKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCAnY3Vyc29yJywgdGhpcy5fY3Vyc29yKTtcbiAgICB0aGlzLl9sYXN0RHJvcFpvbmUgPSBudWxsO1xuICAgIHRoaXMuX2ludGVyYWN0aW9uU2VydmljZS5zZWxlY3RlZEVsZW1lbnRzID0gdGhpcy5fc2VsZWN0aW9uU2VydmljZS5jbGllbnRzO1xuICB9XG5cblxuICAvKipcbiAgICogQXR0ZW1wcyB0byBkcm9wIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgZWxlbWVudHMgaW50byBhIGRyb3Agem9uZVxuICAgKiBAcGFyYW0gZSBQb2ludGVyRXZlbnRcbiAgICovXG4gIHRyeURyb3BTZWxlY3RlZEVsZW1lbnRzKCkge1xuICAgIGNvbnN0IHNlbGVjdG9ycyA9IHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc2VsZWN0b3JzO1xuICAgIHNlbGVjdG9ycy5mb3JFYWNoKHNlbGVjdG9yID0+IHtcbiAgICAgIGlmICh0aGlzLmNhbkRyb3Aoc2VsZWN0b3IuY2xpZW50RWwpKSB7XG4gICAgICAgIHRoaXMuX2RyYWdTZXJ2aWNlLmRyb3BFbGVtZW50KFxuICAgICAgICAgIHRoaXMuX2xhc3REcm9wWm9uZSxcbiAgICAgICAgICBzZWxlY3Rvci5jbGllbnRFbCxcbiAgICAgICAgICB0aGlzLl9lbC5uYXRpdmVFbGVtZW50XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5yZXNlbGVjdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEVuc3VyZXMgdGhhdCB0aGUgYXBwcm9wcmlhdGUgY3Vyc29yIGlzIHNldCB3aGVuIGVsZW1lbnQgaXMgZHJhZ2dhYmxlLlxuICAgKiBAcGFyYW0gZSBQb2ludGVyRXZlbnRcbiAgICovXG4gIGVuc3VyZUN1cnNvcihlOiBQb2ludGVyRXZlbnQpIHtcbiAgICBjb25zdCBtb3VzZVBvcyA9IG5ldyBQb2ludChlLnBhZ2VYLCBlLnBhZ2VZKTtcbiAgICBjb25zdCBzZWxlY3RvciA9IHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc2VsZWN0b3JBdFBvaW50KG1vdXNlUG9zKTtcbiAgICBpZiAoc2VsZWN0b3IgJiYgZG9tLmVsZW1lbnREcmFnZ2FibGUoc2VsZWN0b3IuY2xpZW50RWwpKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCAnY3Vyc29yJywgJ21vdmUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ2N1cnNvcicsICdkZWZhdWx0Jyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlc2l6ZXMgdGhlIHNlbGVjdGVkIGVsZW1lbnRzIHRvIG1hdGNoIHRoZSBTZWxlY3RvciBvdmVybGF5XG4gICAqL1xuICByZXNpemVTZWxlY3RlZEVsZW1lbnRzKCkge1xuICAgIGNvbnN0IHNlbGVjdG9ycyA9IHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc2VsZWN0b3JzO1xuICAgIGNvbnN0IHNpemVkRWxlbWVudHMgPSBbXTtcbiAgICBzZWxlY3RvcnMuZm9yRWFjaChzZWxlY3RvciA9PiB7XG4gICAgICBpZiAoZG9tLmVsZW1lbnRTaXphYmxlKHNlbGVjdG9yLmNsaWVudEVsKSkge1xuICAgICAgICBzaXplZEVsZW1lbnRzLnB1c2goc2VsZWN0b3IuY2xpZW50RWwpO1xuICAgICAgICBkb20uYXNzaWduQm91bmRpbmdSZWN0KFxuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLFxuICAgICAgICAgIHNlbGVjdG9yLm92ZXJsYXksXG4gICAgICAgICAgc2VsZWN0b3IuY2xpZW50RWxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5yZXNpemVkRWxlbWVudC5lbWl0KHNlbGVjdG9yLmNsaWVudEVsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLnJlc2V0U2VsZWN0aW9uKCk7XG4gICAgaWYgKHNpemVkRWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5yZXNpemVkRWxlbWVudHMuZW1pdChzaXplZEVsZW1lbnRzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTW92ZXMgc2VsZWN0ZWQgZWxlbWVudHMgdG8gdGhlIGN1cnJlbnQgbG9jYXRpb24gb2YgdGhlIHNlbGVjdG9yIG9yIHNlbGVjdG9yIG92ZXJsYXkuXG4gICAqIEBwYXJhbSBudWRnZVR5cGUgZGV0ZXJtaW5lcyB3aGVyZSB0aGUgc2VsZWN0ZWQgZWxlbWVudHMgc2hvdWxkIGJlIG1vdmVkLiAgT3B0aW9ucyBhcmVcbiAgICogdG8gbW92ZSB0byB0aGUgYWN0dWFsIHNlbGVjdG9yIChOdWRnZVR5cGUuU2VsZWN0b3IpIG9yIHRoZSBzZWxlY3RvciBvdmVybGF5IChOb2RnZVR5cGUuT3ZlcmxheSkuXG4gICAqIFVzdWFsbHkgb25seSB0aGUgb3ZlcmxheSBpcyBkcmFnZ2VkL21vdmVkLCBoZW5jZSB0aGUgZGVmYXVsdCBvZiBOdWRnZVR5cGUuT3ZlcmxheS5cbiAgICogQHBhcmFtIHJlc2V0QWZ0ZXJNb3ZlIGRldGVybWluZXMgaWYgdGhlIHNlbGVjdG9yIHNob3VsZCByZXNldCBpdHNlbGYgYWZ0ZXIgZXZlcnkgbW92ZS5cbiAgICovXG4gIG1vdmVTZWxlY3RlZEVsZW1lbnRzKFxuICAgIG51ZGdlVHlwZTogTnVkZ2VUeXBlID0gTnVkZ2VUeXBlLk92ZXJsYXksXG4gICAgcmVzZXRBZnRlck1vdmUgPSB0cnVlXG4gICkge1xuICAgIGNvbnN0IHNlbGVjdG9ycyA9IHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc2VsZWN0b3JzO1xuICAgIGNvbnN0IG1vdmVkRWxlbWVudHMgPSBbXTtcbiAgICBzZWxlY3RvcnMuZm9yRWFjaChzZWxlY3RvciA9PiB7XG4gICAgICBpZiAoZG9tLmVsZW1lbnREcmFnZ2FibGUoc2VsZWN0b3IuY2xpZW50RWwpKSB7XG4gICAgICAgIG1vdmVkRWxlbWVudHMucHVzaChzZWxlY3Rvci5jbGllbnRFbCk7XG4gICAgICAgIGRvbS5hc3NpZ25Qb3NpdGlvbihcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlcixcbiAgICAgICAgICBudWRnZVR5cGUgPT09IE51ZGdlVHlwZS5PdmVybGF5XG4gICAgICAgICAgICA/IHNlbGVjdG9yLm92ZXJsYXlcbiAgICAgICAgICAgIDogc2VsZWN0b3Iuc2VsZWN0b3JFbCxcbiAgICAgICAgICBzZWxlY3Rvci5jbGllbnRFbFxuICAgICAgICApO1xuICAgICAgICB0aGlzLm1vdmVkRWxlbWVudC5lbWl0KHNlbGVjdG9yLmNsaWVudEVsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAocmVzZXRBZnRlck1vdmUpIHtcbiAgICAgIHRoaXMucmVzZXRTZWxlY3Rpb24oKTtcbiAgICB9XG4gICAgaWYgKG1vdmVkRWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5tb3ZlZEVsZW1lbnRzLmVtaXQobW92ZWRFbGVtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgc2VsZWN0ZWQgZWxlbWVudHMuXG4gICAqL1xuICBkZWxldGVTZWxlY3RlZEVsZW1lbnRzKCkge1xuICAgIGNvbnN0IHNlbGVjdG9ycyA9IHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc2VsZWN0b3JzO1xuICAgIGNvbnN0IGRlbGV0ZWRFbGVtZW50cyA9IFtdO1xuICAgIGZvciAobGV0IGluZGV4ID0gc2VsZWN0b3JzLmxlbmd0aCAtIDE7IGluZGV4ID49IDA7IGluZGV4LS0pIHtcbiAgICAgIGNvbnN0IHNlbGVjdG9yID0gc2VsZWN0b3JzW2luZGV4XTtcbiAgICAgIGlmICh0aGlzLmNhbkRlbGV0ZShzZWxlY3Rvci5jbGllbnRFbCkpIHtcbiAgICAgICAgY29uc3QgZWwgPSBzZWxlY3Rvci5jbGllbnRFbDtcbiAgICAgICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5jbGVhclNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgdGhpcy5faW50ZXJhY3Rpb25TZXJ2aWNlLmRlbGV0ZUVsZW1lbnQoZWwpO1xuICAgICAgICBkZWxldGVkRWxlbWVudHMucHVzaChlbCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2ludGVyYWN0aW9uU2VydmljZS5kZWxldGVFbGVtZW50cyhkZWxldGVkRWxlbWVudHMpO1xuICAgIHRoaXMuX2ludGVyYWN0aW9uU2VydmljZS5zZWxlY3RlZEVsZW1lbnRzID0gdGhpcy5fc2VsZWN0aW9uU2VydmljZS5jbGllbnRzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIG5ldyBjaGlsZCBlbGVtZW50IHRvIHRoZSBob3N0IGVsZW1lbnQuXG4gICAqL1xuICBhZGRFbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBjb25zdCBzZWxlY3RvciA9IHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuYWN0aXZlU2VsZWN0b3I7XG4gICAgY29uc3QgcGFyZW50ID0gc2VsZWN0b3IgJiYgZG9tLmlzQ29udGFpbmVyKHNlbGVjdG9yLmNsaWVudEVsKSA/IHNlbGVjdG9yLmNsaWVudEVsIDogdGhpcy5fZWwubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLl9yZW5kZXJlci5hcHBlbmRDaGlsZChwYXJlbnQsIGVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIG1vdXNlIHBvc2l0aW9uIHJlbGF0aXZlIHRvIHRoZSBvZmZzZXQgYW5kIHNjYWxlIG9mIHRoZSBob3N0IGVsZW1lbnQuXG4gICAqIEBwYXJhbSBlIFBvaW50ZXJFdmVudFxuICAgKi9cbiAgZ2V0UmVsYXRpdmVQb2ludGVyUG9zKGU6IFBvaW50ZXJFdmVudCkge1xuICAgIHJldHVybiBkb20uZ2V0UmVsYXRpdmVQb2ludGVyUG9zKGUsIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsIHRoaXMuc2NhbGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgcG9pbnRlciBjb29yZGluYXRlcyBjaGFuZ2VzIHJlbGF0aXZlIHRvIHRoZSBzZWxlY3RlZCBlbGVtZW50LlxuICAgKiBAcGFyYW0gZSBQb2ludGVyRXZlbnRcbiAgICovXG4gIGdldFBvaW50ZXJDaGFuZ2UoZTogUG9pbnRlckV2ZW50KTogYW55W10ge1xuICAgIGNvbnN0IHBvaW50ZXJQb3MgPSB0aGlzLmdldFJlbGF0aXZlUG9pbnRlclBvcyhlKTtcbiAgICBsZXQgbGVmdCA9IHBvaW50ZXJQb3MueCAtIHRoaXMuX2xhc3RNb3VzZVBvcy54O1xuICAgIGxldCB0b3AgPSBwb2ludGVyUG9zLnkgLSB0aGlzLl9sYXN0TW91c2VQb3MueTtcbiAgICBpZiAodGhpcy5zbmFwKSB7XG4gICAgICBpZiAobGVmdCAlIHRoaXMuc25hcCAhPT0gMCkge1xuICAgICAgICBsZWZ0ID0gMDtcbiAgICAgICAgcG9pbnRlclBvcy54ID0gdGhpcy5fbGFzdE1vdXNlUG9zLng7XG4gICAgICB9XG4gICAgICBpZiAodG9wICUgdGhpcy5zbmFwICE9PSAwKSB7XG4gICAgICAgIHRvcCA9IDA7XG4gICAgICAgIHBvaW50ZXJQb3MueSA9IHRoaXMuX2xhc3RNb3VzZVBvcy55O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW25ldyBQb2ludChsZWZ0LCB0b3ApLCBwb2ludGVyUG9zXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZS1zZWxlY3RzIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgZWxlbWVudHMuICBVc3VhbGx5IGhhcHBlbnMgYWZ0ZXJcbiAgICogYW4gZWxlbWVudCBpcyBtb3ZlZCBvciByZXNpemVkLlxuICAgKi9cbiAgcmVzZXRTZWxlY3Rpb24oKSB7XG4gICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5yZXNlbGVjdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbmNlbHMgdGhlIGN1cnJlbnQgc2VsZWN0aW9ucyBvciBkcmFnIG9wZXJhdGlvbi4gIElmIHRoZSBlbGVtZW50cyBhcmUgYmVpbmcgZHJhZ2dlZCxcbiAgICogdGhlIGRyYWcgb3BlcmF0aW9uIGlzIGNhbmNlbGxlZCBhbmQgdGhlIGVsZW1lbnRzIHJlc2VsZWN0ZWQuICBPdGhlcndpc2UsIHRoZSBlbGVtZW50c1xuICAgKiBhcmUgdW5zZWxlY3RlZC5cbiAgICovXG4gIGNhbmNlbFNlbGVjdGlvbigpIHtcbiAgICBpZiAodGhpcy5faXNNb3VzZURvd24pIHtcbiAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UucmVzZWxlY3QoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5jbGVhclNlbGVjdG9ycygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLl9lbC5uYXRpdmVFbGVtZW50ICYmIHRoaXMuX3JlbmRlcmVyKSB7XG4gICAgICB0aGlzLl9pbnRlcmFjdGlvblNlcnZpY2UuaW50ZXJhY3Rpb25Ib3N0ID0gdGhpcy5fZWwubmF0aXZlRWxlbWVudDtcbiAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuaW50ZXJhY3Rpb25Ib3N0ID0gdGhpcy5fZWwubmF0aXZlRWxlbWVudDtcbiAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuaXNMYXNzb1NlbGVjdGFibGUgPSB0aGlzLmlzTGFzc29TZWxlY3RhYmxlO1xuICAgICAgdGhpcy5fY3Vyc29yID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLl9lbC5uYXRpdmVFbGVtZW50KS5jdXJzb3I7XG4gICAgICB0aGlzLl9kZWxldGVTZWxlY3RlZEVsZW1lbnRzU3Vic2NyaXB0aW9uID0gdGhpcy5faW50ZXJhY3Rpb25TZXJ2aWNlLmRlbGV0ZVNlbGVjdGVkRWxlbWVudHMkLnN1YnNjcmliZShcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICB0aGlzLmRlbGV0ZVNlbGVjdGVkRWxlbWVudHMoKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICAgIHRoaXMuX2FkZEVsZW1lbnRTdWJzY3JpcHRpb24gPSB0aGlzLl9pbnRlcmFjdGlvblNlcnZpY2UuYWRkRWxlbWVudCQuc3Vic2NyaWJlKFxuICAgICAgICBlbGVtZW50ID0+IHtcbiAgICAgICAgICAvLyB0aGlzLmFkZEVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fbGFzdERyb3Bab25lID0gbnVsbDtcbiAgICB0aGlzLl9kZWxldGVTZWxlY3RlZEVsZW1lbnRzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fYWRkRWxlbWVudFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=