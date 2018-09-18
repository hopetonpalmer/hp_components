import { Renderer2, OnDestroy, ComponentFactoryResolver, Injector } from '@angular/core';
import { Point } from '../scripts/math';
import { SizeService } from '../services/size.service';
import { DragService } from '../services/drag.service';
export interface ISelector {
    selectorEl: HTMLElement;
    overlay: HTMLElement;
    clientEl: HTMLElement;
}
export declare enum SelectionState {
    Draggable = 0,
    Sizable = 1,
    Idle = 2
}
export declare enum NudgeType {
    Overlay = 0,
    Selector = 1
}
export declare class SelectorService implements OnDestroy {
    private _sizeService;
    private _dragService;
    private _componentFactoryResolver;
    private _injector;
    private _lassoSelector;
    private _selectors;
    scale: number;
    lassoCursor: string;
    renderer: Renderer2;
    interactionHost: HTMLElement;
    shouldAllowSizing: boolean;
    isLassoSelectable: boolean;
    private _activeSelector;
    readonly activeSelector: ISelector;
    private _state;
    state: SelectionState;
    readonly hasLasso: boolean;
    readonly hasElementSelectors: boolean;
    readonly selectors: ISelector[];
    /**
     * Represents all selector elements hovering above the captured elements
     */
    readonly selectorElements: HTMLElement[];
    /**
     * Represents all the captured elements
     *
     */
    readonly clients: HTMLElement[];
    readonly selectableElements: HTMLElement[];
    constructor(_sizeService: SizeService, _dragService: DragService, _componentFactoryResolver: ComponentFactoryResolver, _injector: Injector);
    createlassoSelector(left: number, top: number): void;
    removelassoSelector(): void;
    selectorAtPoint(point: Point): ISelector;
    selectCapturedElements(): void;
    unSelectAll(): void;
    unSelectElement(element: HTMLElement): void;
    selectAll(): void;
    selectElement(element: HTMLElement, clearFirst?: boolean, isSizable?: boolean): void;
    createSelectionOverlays(): void;
    createSelector(left: number, top: number, parent: Element): HTMLElement;
    clearSelectors(): void;
    clearSelector(selector: ISelector): void;
    resizeLasso(width: number, height: number, initialPos: Point): void;
    resizeSelectorsBy(delta: Point): void;
    resizeOverlaysBy(delta: Point): void;
    moveSelectorsBy(delta: Point): void;
    moveOverlaysBy(delta: Point): void;
    reselect(): void;
    nudgeBy(delta: Point, nodgeType: NudgeType): void;
    ngOnDestroy(): void;
}
