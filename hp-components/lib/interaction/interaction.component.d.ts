import { OnInit, Renderer2, EventEmitter, OnDestroy } from '@angular/core';
import { DragService } from '../services/drag.service';
import { SizeService } from '../services/size.service';
import { SelectorService, NudgeType } from '../selector/selector.service';
import { Point } from '../scripts/math';
import { InteractionService } from './interaction.service';
export declare type ICancellable = (value: any) => boolean;
/**
 * Handles selection, sizing, deletions, and dragging interactions with any child Element.
 */
export declare class InteractionComponent implements OnInit, OnDestroy {
    private _renderer;
    private _dragService;
    private _sizeService;
    private _interactionService;
    private _selectionService;
    private _isMouseDown;
    private _mouseDownPos;
    private _lastMousePos;
    private _cursor;
    private _lastDropZone;
    private _deleteSelectedElementsSubscription;
    private _addElementSubscription;
    private _el;
    private _keyDownSubject;
    /**
     * Scale value to apply to the Interaction host element.  The value is applied
     * to both scaleX and scaleY of the host element.
     */
    scale: number;
    /**
     * Determins if elements span when sized or dragged
     */
    snap: number;
    /**
     * Gets or sets the minimum width of the element when drag-sized.
     */
    minSizingWidth: number;
    /**
     * Gets or sets the minimum height of the element when drag-sized.
     */
    minSizingHeight: number;
    /**
     * Determines if elements can be selected by dragging around (lasso) them and releasing the pointer.
     */
    isLassoSelectable: boolean;
    /**
     * Optionally set "checkers" background for the interaction host.  Useful when building IDE-like interactive UI.
     */
    isCheckersBackground: boolean;
    resizedElement: EventEmitter<HTMLElement>;
    resizedElements: EventEmitter<HTMLElement[]>;
    movedElement: EventEmitter<HTMLElement>;
    movedElements: EventEmitter<HTMLElement[]>;
    selectElement: EventEmitter<HTMLElement>;
    canDelete: ICancellable;
    canDrop: ICancellable;
    constructor(_renderer: Renderer2, _dragService: DragService, _sizeService: SizeService, _interactionService: InteractionService, _selectionService: SelectorService);
    /**
     * Called when the keyboard key is released.
     * @param e KeyboardEvent
     */
    keyUp(e: KeyboardEvent): void;
    /**
     * Called when the keyboard key is pressed.
     * @param e KeyboardEvent
     */
    keyPress(e: any): void;
    /**
     * Called when the keyboard key is pressed.
     * @param e KeyboardEvent
     */
    keyDown(e: KeyboardEvent): void;
    keyDownHandler(e: KeyboardEvent): void;
    /**
     * Ensures that the default HTML5 dragging operations do not execute.
     */
    dragStart(): boolean;
    /**
     * Called when the pointer is moved.
     * @param e PointerEvent
     */
    pointerMove(e: PointerEvent): void;
    /**
     * Called when the pointer is pressed.
     * @param e PointerEvent
     */
    pointerDown(e: PointerEvent): void;
    /**
     * Called when the pointer is released.
     * @param e PointerEvent
     */
    pointerUp(e: PointerEvent): void;
    /**
     * Attemps to drop the currently selected elements into a drop zone
     * @param e PointerEvent
     */
    tryDropSelectedElements(): void;
    /**
     * Ensures that the appropriate cursor is set when element is draggable.
     * @param e PointerEvent
     */
    ensureCursor(e: PointerEvent): void;
    /**
     * Resizes the selected elements to match the Selector overlay
     */
    resizeSelectedElements(): void;
    /**
     * Moves selected elements to the current location of the selector or selector overlay.
     * @param nudgeType determines where the selected elements should be moved.  Options are
     * to move to the actual selector (NudgeType.Selector) or the selector overlay (NodgeType.Overlay).
     * Usually only the overlay is dragged/moved, hence the default of NudgeType.Overlay.
     * @param resetAfterMove determines if the selector should reset itself after every move.
     */
    moveSelectedElements(nudgeType?: NudgeType, resetAfterMove?: boolean): void;
    /**
     * Deletes selected elements.
     */
    deleteSelectedElements(): void;
    /**
     * Add a new child element to the host element.
     */
    addElement(element: Element): void;
    /**
     * Gets the mouse position relative to the offset and scale of the host element.
     * @param e PointerEvent
     */
    getRelativePointerPos(e: PointerEvent): Point;
    /**
     * Gets pointer coordinates changes relative to the selected element.
     * @param e PointerEvent
     */
    getPointerChange(e: PointerEvent): any[];
    /**
     * Re-selects the currently selected elements.  Usually happens after
     * an element is moved or resized.
     */
    resetSelection(): void;
    /**
     * Cancels the current selections or drag operation.  If the elements are being dragged,
     * the drag operation is cancelled and the elements reselected.  Otherwise, the elements
     * are unselected.
     */
    cancelSelection(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
}
