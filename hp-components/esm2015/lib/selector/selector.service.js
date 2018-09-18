/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, ComponentFactoryResolver, Injector } from '@angular/core';
import { Rect } from '../scripts/math';
import * as dom from '../scripts/dom';
import { SizeService } from '../services/size.service';
import { DragService } from '../services/drag.service';
/**
 * @record
 */
export function ISelector() { }
/** @type {?} */
ISelector.prototype.selectorEl;
/** @type {?} */
ISelector.prototype.overlay;
/** @type {?} */
ISelector.prototype.clientEl;
/** @enum {number} */
const SelectionState = {
    Draggable: 0,
    Sizable: 1,
    Idle: 2,
};
export { SelectionState };
SelectionState[SelectionState.Draggable] = 'Draggable';
SelectionState[SelectionState.Sizable] = 'Sizable';
SelectionState[SelectionState.Idle] = 'Idle';
/** @enum {number} */
const NudgeType = {
    Overlay: 0,
    Selector: 1,
};
export { NudgeType };
NudgeType[NudgeType.Overlay] = 'Overlay';
NudgeType[NudgeType.Selector] = 'Selector';
export class SelectorService {
    /**
     * @param {?} _sizeService
     * @param {?} _dragService
     * @param {?} _componentFactoryResolver
     * @param {?} _injector
     */
    constructor(_sizeService, _dragService, _componentFactoryResolver, _injector) {
        this._sizeService = _sizeService;
        this._dragService = _dragService;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._injector = _injector;
        this._lassoSelector = null;
        this._selectors = new Array();
        this.lassoCursor = 'crosshair';
        this.shouldAllowSizing = true;
        this.isLassoSelectable = true;
    }
    /**
     * @return {?}
     */
    get activeSelector() {
        return this._activeSelector;
    }
    /**
     * @return {?}
     */
    get state() {
        return this._state;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set state(value) {
        if (value !== this._state) {
            this._state = value;
            if (this.state !== SelectionState.Idle) {
                this.createSelectionOverlays();
            }
        }
    }
    /**
     * @return {?}
     */
    get hasLasso() {
        return this._lassoSelector !== null;
    }
    /**
     * @return {?}
     */
    get hasElementSelectors() {
        return Array.from(this._selectors.entries()).length > 0;
    }
    /**
     * @return {?}
     */
    get selectors() {
        return this._selectors;
    }
    /**
     * Represents all selector elements hovering above the captured elements
     * @return {?}
     */
    get selectorElements() {
        return this.selectors.map(x => x.selectorEl);
    }
    /**
     * Represents all the captured elements
     *
     * @return {?}
     */
    get clients() {
        return this.selectors.map(x => x.clientEl);
    }
    /**
     * @return {?}
     */
    get selectableElements() {
        /** @type {?} */
        const children = dom.childrenOf(this.interactionHost).filter(x => dom.isSelectable(x));
        return children;
    }
    /**
     * @param {?} left
     * @param {?} top
     * @return {?}
     */
    createlassoSelector(left, top) {
        this.clearSelectors();
        if (this.isLassoSelectable) {
            /** @type {?} */
            const selector = this.createSelector(left, top, this.interactionHost);
            this.renderer.setStyle(this.interactionHost, 'cursor', this.lassoCursor);
            this.renderer.addClass(selector, 'hpc-lasso-selector');
            this._lassoSelector = selector;
        }
    }
    /**
     * @return {?}
     */
    removelassoSelector() {
        if (this._lassoSelector) {
            this.renderer.removeChild(this.interactionHost, this._lassoSelector);
            this._lassoSelector = null;
        }
    }
    /**
     * @param {?} point
     * @return {?}
     */
    selectorAtPoint(point) {
        for (let index = 0; index < this.selectors.length; index++) {
            /** @type {?} */
            const selector = this.selectors[index];
            /** @type {?} */
            const element = selector.selectorEl;
            /** @type {?} */
            const elRect = element.getBoundingClientRect();
            /** @type {?} */
            const rect = new Rect(elRect.left, elRect.top, elRect.width, elRect.height);
            if (dom.pointInRect(point, rect)) {
                return selector;
            }
        }
    }
    /**
     * @return {?}
     */
    selectCapturedElements() {
        /** @type {?} */
        const rect = dom.elementBounds(this._lassoSelector);
        /** @type {?} */
        const capturedElements = dom.elementsAtRect(this.interactionHost, rect, [
            this._lassoSelector
        ]);
        capturedElements.forEach(el => {
            this.selectElement(el, false, this.shouldAllowSizing);
        });
        this.removelassoSelector();
    }
    /**
     * @return {?}
     */
    unSelectAll() {
        this.clearSelectors();
    }
    /**
     * @param {?} element
     * @return {?}
     */
    unSelectElement(element) {
        /** @type {?} */
        const selector = this.selectors.find(x => x.clientEl === element);
        if (selector) {
            this.clearSelector(selector);
        }
    }
    /**
     * @return {?}
     */
    selectAll() {
        this.clearSelectors();
        /** @type {?} */
        const children = this.selectableElements;
        children.forEach(child => {
            this.selectElement(child, false);
        });
    }
    /**
     * @param {?} element
     * @param {?=} clearFirst
     * @param {?=} isSizable
     * @return {?}
     */
    selectElement(element, clearFirst = true, isSizable = true) {
        /** @type {?} */
        let selector = this.selectors.find(x => x.selectorEl === element ||
            x.clientEl === element ||
            x.overlay === element);
        if (element.hasAttribute('gripKey')) {
            selector = this.selectors.find(x => x.selectorEl === element.parentElement.parentElement.parentElement);
            /** @type {?} */
            const cursor = getComputedStyle(element).cursor;
            this.renderer.setStyle(this.interactionHost, 'cursor', cursor);
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
        /** @type {?} */
        const rect = dom.elementBounds(element);
        /** @type {?} */
        const selectorEl = this.createSelector(rect.left, rect.top, element.parentElement);
        selectorEl['isSelector'] = true;
        dom.assignBoundingRect(this.renderer, element, selectorEl);
        this.renderer.addClass(selectorEl, 'hpc-element-selector');
        selector = { clientEl: element, selectorEl: selectorEl, overlay: null };
        this._selectors.push(selector);
        this._activeSelector = selector;
        if (isSizable && this._sizeService.canSize(element)) {
            this._sizeService.addSizingGrips(selectorEl, this.renderer);
        }
        if (dom.elementDraggable(element)) {
            this.renderer.setStyle(this.interactionHost, 'cursor', 'move');
        }
        this.state = SelectionState.Idle;
    }
    /**
     * @return {?}
     */
    createSelectionOverlays() {
        this.selectors.forEach(selector => {
            this._sizeService.removeSizingGrips(selector.selectorEl, this.renderer);
            if (selector.overlay) {
                this.renderer.removeChild(selector.selectorEl.parentElement, selector.overlay);
            }
            if (this.state === SelectionState.Sizable &&
                this._sizeService.canSize(selector.clientEl)) {
                selector.overlay = this._sizeService.createSizingOverlay(selector.selectorEl);
            }
            else if (this.state === SelectionState.Draggable &&
                this._dragService.canDrag(selector.clientEl)) {
                selector.overlay = this._dragService.createDragOverlay(selector.clientEl);
            }
            if (selector.overlay) {
                this.renderer.appendChild(selector.selectorEl.parentElement, selector.overlay);
            }
        });
    }
    /**
     * @param {?} left
     * @param {?} top
     * @param {?} parent
     * @return {?}
     */
    createSelector(left, top, parent) {
        /** @type {?} */
        const selector = this.renderer.createElement('div');
        this.renderer.appendChild(parent, selector);
        this.renderer.setStyle(selector, 'position', 'absolute');
        this.renderer.setStyle(selector, 'left', left + 'px');
        this.renderer.setStyle(selector, 'top', top + 'px');
        this.renderer.setStyle(selector, 'boxSizing', 'border-box');
        this.renderer.setStyle(selector, 'zIndex', '10000');
        return selector;
    }
    /**
     * @return {?}
     */
    clearSelectors() {
        this.removelassoSelector();
        /** @type {?} */
        const selectors = Array.from(this._selectors.values());
        selectors.forEach(selector => {
            this.clearSelector(selector);
        });
        this._selectors = [];
    }
    /**
     * @param {?} selector
     * @return {?}
     */
    clearSelector(selector) {
        if (selector === this._activeSelector) {
            this._activeSelector = null;
        }
        this.renderer.removeChild(selector.selectorEl.parentElement, selector.selectorEl);
        if (selector.overlay) {
            this.renderer.removeChild(selector.overlay.parentElement, selector.overlay);
        }
        this.selectors.splice(this.selectors.indexOf(selector), 1);
    }
    /**
     * @param {?} width
     * @param {?} height
     * @param {?} initialPos
     * @return {?}
     */
    resizeLasso(width, height, initialPos) {
        if (height < 0) {
            height = Math.abs(height);
            /** @type {?} */
            const top = initialPos.y - height;
            this.renderer.setStyle(this._lassoSelector, 'top', top + 'px');
        }
        if (width < 0) {
            width = Math.abs(width);
            /** @type {?} */
            const left = initialPos.x - width;
            this.renderer.setStyle(this._lassoSelector, 'left', left + 'px');
        }
        this.renderer.setStyle(this._lassoSelector, 'height', height + 'px');
        this.renderer.setStyle(this._lassoSelector, 'width', width + 'px');
    }
    /**
     * @param {?} delta
     * @return {?}
     */
    resizeSelectorsBy(delta) {
        /** @type {?} */
        const selectors = this.selectors.map(x => x.selectorEl);
        this._sizeService.sizeElementsBy(delta, selectors);
    }
    /**
     * @param {?} delta
     * @return {?}
     */
    resizeOverlaysBy(delta) {
        /** @type {?} */
        const overlays = this.selectors.map(x => x.overlay);
        this._sizeService.sizeElementsBy(delta, overlays);
    }
    /**
     * @param {?} delta
     * @return {?}
     */
    moveSelectorsBy(delta) {
        /** @type {?} */
        const selectors = this.selectors.map(x => x.overlay);
        this._dragService.dragElementsBy(delta, selectors);
    }
    /**
     * @param {?} delta
     * @return {?}
     */
    moveOverlaysBy(delta) {
        /** @type {?} */
        const overlays = this.selectors.map(x => x.overlay);
        this._dragService.dragElementsBy(delta, overlays);
    }
    /**
     * @return {?}
     */
    reselect() {
        /** @type {?} */
        const clients = this.clients;
        this.clearSelectors();
        clients.forEach(client => {
            this.selectElement(client, false, this.shouldAllowSizing);
        });
    }
    /**
     * @param {?} delta
     * @param {?} nodgeType
     * @return {?}
     */
    nudgeBy(delta, nodgeType) {
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
        }
        else if (this.state === SelectionState.Draggable) {
            if (nodgeType === NudgeType.Selector) {
                this.moveSelectorsBy(delta);
            }
            if (nodgeType === NudgeType.Overlay) {
                this.moveOverlaysBy(delta);
            }
        }
        else {
            this.state = SelectionState.Draggable;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.clearSelectors();
        this.renderer = null;
        this.interactionHost = null;
    }
}
SelectorService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
SelectorService.ctorParameters = () => [
    { type: SizeService },
    { type: DragService },
    { type: ComponentFactoryResolver },
    { type: Injector }
];
if (false) {
    /** @type {?} */
    SelectorService.prototype._lassoSelector;
    /** @type {?} */
    SelectorService.prototype._selectors;
    /** @type {?} */
    SelectorService.prototype.scale;
    /** @type {?} */
    SelectorService.prototype.lassoCursor;
    /** @type {?} */
    SelectorService.prototype.renderer;
    /** @type {?} */
    SelectorService.prototype.interactionHost;
    /** @type {?} */
    SelectorService.prototype.shouldAllowSizing;
    /** @type {?} */
    SelectorService.prototype.isLassoSelectable;
    /** @type {?} */
    SelectorService.prototype._activeSelector;
    /** @type {?} */
    SelectorService.prototype._state;
    /** @type {?} */
    SelectorService.prototype._sizeService;
    /** @type {?} */
    SelectorService.prototype._dragService;
    /** @type {?} */
    SelectorService.prototype._componentFactoryResolver;
    /** @type {?} */
    SelectorService.prototype._injector;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2hwLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJsaWIvc2VsZWN0b3Ivc2VsZWN0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBd0Isd0JBQXdCLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BHLE9BQU8sRUFBRSxJQUFJLEVBQVMsTUFBTSxpQkFBaUIsQ0FBQztBQUM5QyxPQUFPLEtBQUssR0FBRyxNQUFNLGdCQUFnQixDQUFDO0FBQ3RDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7Ozs7Ozs7Ozs7SUFTckQsWUFBUztJQUNULFVBQU87SUFDUCxPQUFJOzs7OEJBRkosU0FBUzs4QkFDVCxPQUFPOzhCQUNQLElBQUk7OztJQUlKLFVBQU87SUFDUCxXQUFROzs7b0JBRFIsT0FBTztvQkFDUCxRQUFRO0FBSVYsTUFBTTs7Ozs7OztJQTZESixZQUNVLGNBQ0EsY0FDQSwyQkFDQTtRQUhBLGlCQUFZLEdBQVosWUFBWTtRQUNaLGlCQUFZLEdBQVosWUFBWTtRQUNaLDhCQUF5QixHQUF6Qix5QkFBeUI7UUFDekIsY0FBUyxHQUFULFNBQVM7OEJBaEVtQixJQUFJOzBCQUNyQixJQUFJLEtBQUssRUFBYTsyQkFHN0IsV0FBVztpQ0FHTCxJQUFJO2lDQUNKLElBQUk7S0F5RHBCOzs7O0lBdERKLElBQUksY0FBYztRQUNoQixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7S0FDN0I7Ozs7UUFHVSxLQUFLO1FBQ2QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDOzs7Ozs7UUFFVixLQUFLLENBQUMsS0FBcUI7UUFDcEMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUN6QixJQUFJLENBQUMsTUFBTSxH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QUMsS0FBWSxFQUFFLFNBQW9CO1FBQ3hDLElBQUksS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbEMsT0FBTztTQUNSO1FBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLGNBQWMsQ0FBQyxPQUFPLEVBQUU7WUFDekMsSUFBSSxTQUFTLEtBQUssU0FBUyxDQUFDLFFBQVEsRUFBRTtnQkFDcEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQy9CO1lBQ0QsSUFBSSxTQUFTLEtBQUssU0FBUyxDQUFDLE9BQU8sRUFBRTtnQkFDbkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzlCO1NBQ0Y7YUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssY0FBYyxDQUFDLFNBQVMsRUFBRTtZQUNsRCxJQUFJLFNBQVMsS0FBSyxTQUFTLENBQUMsUUFBUSxFQUFFO2dCQUNwQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzdCO1lBQ0QsSUFBSSxTQUFTLEtBQUssU0FBUyxDQUFDLE9BQU8sRUFBRTtnQkFDbkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM1QjtTQUNGO2FBQU07WUFDTCxJQUFJLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQyxTQUFTLENBQUM7U0FDdkM7S0FDRjs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7S0FDN0I7OztZQWhVRixVQUFVOzs7O1lBcEJGLFdBQVc7WUFDWCxXQUFXO1lBSnVCLHdCQUF3QjtZQUFFLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBSZW5kZXJlcjIsIE9uRGVzdHJveSwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBJbmplY3Rvcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWN0LCBQb2ludCB9IGZyb20gJy4uL3NjcmlwdHMvbWF0aCc7XG5pbXBvcnQgKiBhcyBkb20gZnJvbSAnLi4vc2NyaXB0cy9kb20nO1xuaW1wb3J0IHsgU2l6ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9zaXplLnNlcnZpY2UnO1xuaW1wb3J0IHsgRHJhZ1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9kcmFnLnNlcnZpY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTZWxlY3RvciB7XG4gIHNlbGVjdG9yRWw6IEhUTUxFbGVtZW50O1xuICBvdmVybGF5OiBIVE1MRWxlbWVudDtcbiAgY2xpZW50RWw6IEhUTUxFbGVtZW50O1xufVxuXG5leHBvcnQgZW51bSBTZWxlY3Rpb25TdGF0ZSB7XG4gIERyYWdnYWJsZSxcbiAgU2l6YWJsZSxcbiAgSWRsZVxufVxuXG5leHBvcnQgZW51bSBOdWRnZVR5cGUge1xuICBPdmVybGF5LFxuICBTZWxlY3RvclxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VsZWN0b3JTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfbGFzc29TZWxlY3RvcjogSFRNTEVsZW1lbnQgPSBudWxsO1xuICBwcml2YXRlIF9zZWxlY3RvcnMgPSBuZXcgQXJyYXk8SVNlbGVjdG9yPigpO1xuXG4gIHNjYWxlOiBudW1iZXI7XG4gIGxhc3NvQ3Vyc29yID0gJ2Nyb3NzaGFpcic7XG4gIHJlbmRlcmVyOiBSZW5kZXJlcjI7XG4gIGludGVyYWN0aW9uSG9zdDogSFRNTEVsZW1lbnQ7XG4gIHNob3VsZEFsbG93U2l6aW5nID0gdHJ1ZTtcbiAgaXNMYXNzb1NlbGVjdGFibGUgPSB0cnVlO1xuXG4gIHByaXZhdGUgX2FjdGl2ZVNlbGVjdG9yOiBJU2VsZWN0b3I7XG4gIGdldCBhY3RpdmVTZWxlY3RvcigpOiBJU2VsZWN0b3Ige1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmVTZWxlY3RvcjtcbiAgfVxuXG4gIHByaXZhdGUgX3N0YXRlOiBTZWxlY3Rpb25TdGF0ZTtcbiAgcHVibGljIGdldCBzdGF0ZSgpOiBTZWxlY3Rpb25TdGF0ZSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YXRlO1xuICB9XG4gIHB1YmxpYyBzZXQgc3RhdGUodmFsdWU6IFNlbGVjdGlvblN0YXRlKSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl9zdGF0ZSkge1xuICAgICAgdGhpcy5fc3RhdGUgPSB2YWx1ZTtcbiAgICAgIGlmICh0aGlzLnN0YXRlICE9PSBTZWxlY3Rpb25TdGF0ZS5JZGxlKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlU2VsZWN0aW9uT3ZlcmxheXMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXQgaGFzTGFzc28oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2xhc3NvU2VsZWN0b3IgIT09IG51bGw7XG4gIH1cblxuICBnZXQgaGFzRWxlbWVudFNlbGVjdG9ycygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLl9zZWxlY3RvcnMuZW50cmllcygpKS5sZW5ndGggPiAwO1xuICB9XG5cbiAgZ2V0IHNlbGVjdG9ycygpOiBJU2VsZWN0b3JbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdG9ycztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXByZXNlbnRzIGFsbCBzZWxlY3RvciBlbGVtZW50cyBob3ZlcmluZyBhYm92ZSB0aGUgY2FwdHVyZWQgZWxlbWVudHNcbiAgICovXG4gIGdldCBzZWxlY3RvckVsZW1lbnRzKCk6IEhUTUxFbGVtZW50W10ge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdG9ycy5tYXAoeCA9PiB4LnNlbGVjdG9yRWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudHMgYWxsIHRoZSBjYXB0dXJlZCBlbGVtZW50c1xuICAgKlxuICAgKi9cbiAgZ2V0IGNsaWVudHMoKTogSFRNTEVsZW1lbnRbXSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0b3JzLm1hcCh4ID0+IHguY2xpZW50RWwpO1xuICB9XG5cbiAgICBnZXQgc2VsZWN0YWJsZUVsZW1lbnRzKCk6IEhUTUxFbGVtZW50W10ge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gZG9tLmNoaWxkcmVuT2YodGhpcy5pbnRlcmFjdGlvbkhvc3QpLmZpbHRlcih4ID0+IGRvbS5pc1NlbGVjdGFibGUoeCkpO1xuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX3NpemVTZXJ2aWNlOiBTaXplU2VydmljZSxcbiAgICBwcml2YXRlIF9kcmFnU2VydmljZTogRHJhZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBfY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSBfaW5qZWN0b3I6IEluamVjdG9yXG4gICkge31cblxuICBjcmVhdGVsYXNzb1NlbGVjdG9yKGxlZnQ6IG51bWJlciwgdG9wOiBudW1iZXIpIHtcbiAgICB0aGlzLmNsZWFyU2VsZWN0b3JzKCk7XG4gICAgaWYgKHRoaXMuaXNMYXNzb1NlbGVjdGFibGUpIHtcbiAgICAgIGNvbnN0IHNlbGVjdG9yID0gdGhpcy5jcmVhdGVTZWxlY3RvcihsZWZ0LCB0b3AsIHRoaXMuaW50ZXJhY3Rpb25Ib3N0KTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5pbnRlcmFjdGlvbkhvc3QsICdjdXJzb3InLCB0aGlzLmxhc3NvQ3Vyc29yKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Moc2VsZWN0b3IsICdocGMtbGFzc28tc2VsZWN0b3InKTtcbiAgICAgIHRoaXMuX2xhc3NvU2VsZWN0b3IgPSBzZWxlY3RvcjtcbiAgICB9XG4gIH1cblxuICByZW1vdmVsYXNzb1NlbGVjdG9yKCkge1xuICAgIGlmICh0aGlzLl9sYXNzb1NlbGVjdG9yKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMuaW50ZXJhY3Rpb25Ib3N0LCB0aGlzLl9sYXNzb1NlbGVjdG9yKTtcbiAgICAgIHRoaXMuX2xhc3NvU2VsZWN0b3IgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHNlbGVjdG9yQXRQb2ludChwb2ludDogUG9pbnQpOiBJU2VsZWN0b3Ige1xuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLnNlbGVjdG9ycy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGNvbnN0IHNlbGVjdG9yID0gdGhpcy5zZWxlY3RvcnNbaW5kZXhdO1xuICAgICAgY29uc3QgZWxlbWVudCA9IHNlbGVjdG9yLnNlbGVjdG9yRWw7XG4gICAgICBjb25zdCBlbFJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgY29uc3QgcmVjdCA9IG5ldyBSZWN0KFxuICAgICAgICBlbFJlY3QubGVmdCxcbiAgICAgICAgZWxSZWN0LnRvcCxcbiAgICAgICAgZWxSZWN0LndpZHRoLFxuICAgICAgICBlbFJlY3QuaGVpZ2h0XG4gICAgICApO1xuICAgICAgaWYgKGRvbS5wb2ludEluUmVjdChwb2ludCwgcmVjdCkpIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdG9yO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNlbGVjdENhcHR1cmVkRWxlbWVudHMoKSB7XG4gICAgY29uc3QgcmVjdCA9IGRvbS5lbGVtZW50Qm91bmRzKHRoaXMuX2xhc3NvU2VsZWN0b3IpO1xuICAgIGNvbnN0IGNhcHR1cmVkRWxlbWVudHMgPSBkb20uZWxlbWVudHNBdFJlY3QodGhpcy5pbnRlcmFjdGlvbkhvc3QsIHJlY3QsIFtcbiAgICAgIHRoaXMuX2xhc3NvU2VsZWN0b3JcbiAgICBdKTtcbiAgICBjYXB0dXJlZEVsZW1lbnRzLmZvckVhY2goZWwgPT4ge1xuICAgICAgdGhpcy5zZWxlY3RFbGVtZW50KGVsLCBmYWxzZSwgdGhpcy5zaG91bGRBbGxvd1NpemluZyk7XG4gICAgfSk7XG4gICAgdGhpcy5yZW1vdmVsYXNzb1NlbGVjdG9yKCk7XG4gIH1cblxuICB1blNlbGVjdEFsbCgpIHtcbiAgICB0aGlzLmNsZWFyU2VsZWN0b3JzKCk7XG4gIH1cblxuICB1blNlbGVjdEVsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICBjb25zdCBzZWxlY3RvciA9IHRoaXMuc2VsZWN0b3JzLmZpbmQoeCA9PiB4LmNsaWVudEVsID09PSBlbGVtZW50KTtcbiAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgIHRoaXMuY2xlYXJTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0QWxsKCkge1xuICAgIHRoaXMuY2xlYXJTZWxlY3RvcnMoKTtcbiAgICBjb25zdCBjaGlsZHJlbiA9IHRoaXMuc2VsZWN0YWJsZUVsZW1lbnRzO1xuICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICB0aGlzLnNlbGVjdEVsZW1lbnQoY2hpbGQsIGZhbHNlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNlbGVjdEVsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQsIGNsZWFyRmlyc3QgPSB0cnVlLCBpc1NpemFibGUgPSB0cnVlKSB7XG4gICAgbGV0IHNlbGVjdG9yID0gdGhpcy5zZWxlY3RvcnMuZmluZChcbiAgICAgIHggPT5cbiAgICAgICAgeC5zZWxlY3RvckVsID09PSBlbGVtZW50IHx8XG4gICAgICAgIHguY2xpZW50RWwgPT09IGVsZW1lbnQgfHxcbiAgICAgICAgeC5vdmVybGF5ID09PSBlbGVtZW50XG4gICAgKTtcbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2dyaXBLZXknKSkge1xuICAgICAgc2VsZWN0b3IgPSB0aGlzLnNlbGVjdG9ycy5maW5kKFxuICAgICAgICB4ID0+IHguc2VsZWN0b3JFbCA9PT0gZWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudFxuICAgICAgKTtcbiAgICAgIGNvbnN0IGN1cnNvciA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkuY3Vyc29yO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmludGVyYWN0aW9uSG9zdCwgJ2N1cnNvcicsIGN1cnNvcik7XG4gICAgICB0aGlzLl9zaXplU2VydmljZS5ncmlwS2V5ID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2dyaXBLZXknKTtcbiAgICAgIHRoaXMuc3RhdGUgPSBTZWxlY3Rpb25TdGF0ZS5TaXphYmxlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgdGhpcy5zdGF0ZSA9IFNlbGVjdGlvblN0YXRlLklkbGU7XG4gICAgICB0aGlzLl9hY3RpdmVTZWxlY3RvciA9IHNlbGVjdG9yO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY2xlYXJGaXJzdCkge1xuICAgICAgdGhpcy5jbGVhclNlbGVjdG9ycygpO1xuICAgIH1cbiAgICBjb25zdCByZWN0ID0gZG9tLmVsZW1lbnRCb3VuZHMoZWxlbWVudCk7XG4gICAgY29uc3Qgc2VsZWN0b3JFbCA9IHRoaXMuY3JlYXRlU2VsZWN0b3IoXG4gICAgICByZWN0LmxlZnQsXG4gICAgICByZWN0LnRvcCxcbiAgICAgIGVsZW1lbnQucGFyZW50RWxlbWVudFxuICAgICk7XG4gICAgc2VsZWN0b3JFbFsnaXNTZWxlY3RvciddID0gdHJ1ZTtcbiAgICBkb20uYXNzaWduQm91bmRpbmdSZWN0KHRoaXMucmVuZGVyZXIsIGVsZW1lbnQsIHNlbGVjdG9yRWwpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Moc2VsZWN0b3JFbCwgJ2hwYy1lbGVtZW50LXNlbGVjdG9yJyk7XG4gICAgc2VsZWN0b3IgPSB7IGNsaWVudEVsOiBlbGVtZW50LCBzZWxlY3RvckVsOiBzZWxlY3RvckVsLCBvdmVybGF5OiBudWxsIH07XG4gICAgdGhpcy5fc2VsZWN0b3JzLnB1c2goc2VsZWN0b3IpO1xuICAgIHRoaXMuX2FjdGl2ZVNlbGVjdG9yID0gc2VsZWN0b3I7XG4gICAgaWYgKGlzU2l6YWJsZSAmJiB0aGlzLl9zaXplU2VydmljZS5jYW5TaXplKGVsZW1lbnQpKSB7XG4gICAgICB0aGlzLl9zaXplU2VydmljZS5hZGRTaXppbmdHcmlwcyhzZWxlY3RvckVsLCB0aGlzLnJlbmRlcmVyKTtcbiAgICB9XG4gICAgaWYgKGRvbS5lbGVtZW50RHJhZ2dhYmxlKGVsZW1lbnQpKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuaW50ZXJhY3Rpb25Ib3N0LCAnY3Vyc29yJywgJ21vdmUnKTtcbiAgICB9XG4gICAgdGhpcy5zdGF0ZSA9IFNlbGVjdGlvblN0YXRlLklkbGU7XG4gIH1cblxuICBjcmVhdGVTZWxlY3Rpb25PdmVybGF5cygpIHtcbiAgICB0aGlzLnNlbGVjdG9ycy5mb3JFYWNoKHNlbGVjdG9yID0+IHtcbiAgICAgIHRoaXMuX3NpemVTZXJ2aWNlLnJlbW92ZVNpemluZ0dyaXBzKHNlbGVjdG9yLnNlbGVjdG9yRWwsIHRoaXMucmVuZGVyZXIpO1xuICAgICAgaWYgKHNlbGVjdG9yLm92ZXJsYXkpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZChcbiAgICAgICAgICBzZWxlY3Rvci5zZWxlY3RvckVsLnBhcmVudEVsZW1lbnQsXG4gICAgICAgICAgc2VsZWN0b3Iub3ZlcmxheVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICB0aGlzLnN0YXRlID09PSBTZWxlY3Rpb25TdGF0ZS5TaXphYmxlICYmXG4gICAgICAgIHRoaXMuX3NpemVTZXJ2aWNlLmNhblNpemUoc2VsZWN0b3IuY2xpZW50RWwpXG4gICAgICApIHtcbiAgICAgICAgc2VsZWN0b3Iub3ZlcmxheSA9IHRoaXMuX3NpemVTZXJ2aWNlLmNyZWF0ZVNpemluZ092ZXJsYXkoXG4gICAgICAgICAgc2VsZWN0b3Iuc2VsZWN0b3JFbFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgdGhpcy5zdGF0ZSA9PT0gU2VsZWN0aW9uU3RhdGUuRHJhZ2dhYmxlICYmXG4gICAgICAgIHRoaXMuX2RyYWdTZXJ2aWNlLmNhbkRyYWcoc2VsZWN0b3IuY2xpZW50RWwpXG4gICAgICApIHtcbiAgICAgICAgc2VsZWN0b3Iub3ZlcmxheSA9IHRoaXMuX2RyYWdTZXJ2aWNlLmNyZWF0ZURyYWdPdmVybGF5KFxuICAgICAgICAgIHNlbGVjdG9yLmNsaWVudEVsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAoc2VsZWN0b3Iub3ZlcmxheSkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKFxuICAgICAgICAgIHNlbGVjdG9yLnNlbGVjdG9yRWwucGFyZW50RWxlbWVudCxcbiAgICAgICAgICBzZWxlY3Rvci5vdmVybGF5XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjcmVhdGVTZWxlY3RvcihsZWZ0OiBudW1iZXIsIHRvcDogbnVtYmVyLCBwYXJlbnQ6IEVsZW1lbnQpOiBIVE1MRWxlbWVudCB7XG4gICAgY29uc3Qgc2VsZWN0b3IgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQocGFyZW50LCBzZWxlY3Rvcik7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShzZWxlY3RvciwgJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShzZWxlY3RvciwgJ2xlZnQnLCBsZWZ0ICsgJ3B4Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShzZWxlY3RvciwgJ3RvcCcsIHRvcCArICdweCcpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoc2VsZWN0b3IsICdib3hTaXppbmcnLCAnYm9yZGVyLWJveCcpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoc2VsZWN0b3IsICd6SW5kZXgnLCAnMTAwMDAnKTtcbiAgICByZXR1cm4gc2VsZWN0b3I7XG4gIH1cblxuICBjbGVhclNlbGVjdG9ycygpIHtcbiAgICB0aGlzLnJlbW92ZWxhc3NvU2VsZWN0b3IoKTtcbiAgICBjb25zdCBzZWxlY3RvcnMgPSBBcnJheS5mcm9tKHRoaXMuX3NlbGVjdG9ycy52YWx1ZXMoKSk7XG4gICAgc2VsZWN0b3JzLmZvckVhY2goc2VsZWN0b3IgPT4ge1xuICAgICAgdGhpcy5jbGVhclNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICB9KTtcbiAgICB0aGlzLl9zZWxlY3RvcnMgPSBbXTtcbiAgfVxuXG4gIGNsZWFyU2VsZWN0b3Ioc2VsZWN0b3I6IElTZWxlY3Rvcikge1xuICAgIGlmIChzZWxlY3RvciA9PT0gdGhpcy5fYWN0aXZlU2VsZWN0b3IpIHtcbiAgICAgIHRoaXMuX2FjdGl2ZVNlbGVjdG9yID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZChcbiAgICAgIHNlbGVjdG9yLnNlbGVjdG9yRWwucGFyZW50RWxlbWVudCxcbiAgICAgIHNlbGVjdG9yLnNlbGVjdG9yRWxcbiAgICApO1xuICAgIGlmIChzZWxlY3Rvci5vdmVybGF5KSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKFxuICAgICAgICBzZWxlY3Rvci5vdmVybGF5LnBhcmVudEVsZW1lbnQsXG4gICAgICAgIHNlbGVjdG9yLm92ZXJsYXlcbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMuc2VsZWN0b3JzLnNwbGljZSh0aGlzLnNlbGVjdG9ycy5pbmRleE9mKHNlbGVjdG9yKSwgMSk7XG4gIH1cblxuICByZXNpemVMYXNzbyh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgaW5pdGlhbFBvczogUG9pbnQpIHtcbiAgICBpZiAoaGVpZ2h0IDwgMCkge1xuICAgICAgaGVpZ2h0ID0gTWF0aC5hYnMoaGVpZ2h0KTtcbiAgICAgIGNvbnN0IHRvcCA9IGluaXRpYWxQb3MueSAtIGhlaWdodDtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbGFzc29TZWxlY3RvciwgJ3RvcCcsIHRvcCArICdweCcpO1xuICAgIH1cbiAgICBpZiAod2lkdGggPCAwKSB7XG4gICAgICB3aWR0aCA9IE1hdGguYWJzKHdpZHRoKTtcbiAgICAgIGNvbnN0IGxlZnQgPSBpbml0aWFsUG9zLnggLSB3aWR0aDtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbGFzc29TZWxlY3RvciwgJ2xlZnQnLCBsZWZ0ICsgJ3B4Jyk7XG4gICAgfVxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbGFzc29TZWxlY3RvciwgJ2hlaWdodCcsIGhlaWdodCArICdweCcpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbGFzc29TZWxlY3RvciwgJ3dpZHRoJywgd2lkdGggKyAncHgnKTtcbiAgfVxuXG4gIHJlc2l6ZVNlbGVjdG9yc0J5KGRlbHRhOiBQb2ludCkge1xuICAgIGNvbnN0IHNlbGVjdG9ycyA9IHRoaXMuc2VsZWN0b3JzLm1hcCh4ID0+IHguc2VsZWN0b3JFbCk7XG4gICAgdGhpcy5fc2l6ZVNlcnZpY2Uuc2l6ZUVsZW1lbnRzQnkoZGVsdGEsIHNlbGVjdG9ycyk7XG4gIH1cblxuICByZXNpemVPdmVybGF5c0J5KGRlbHRhOiBQb2ludCkge1xuICAgIGNvbnN0IG92ZXJsYXlzID0gdGhpcy5zZWxlY3RvcnMubWFwKHggPT4geC5vdmVybGF5KTtcbiAgICB0aGlzLl9zaXplU2VydmljZS5zaXplRWxlbWVudHNCeShkZWx0YSwgb3ZlcmxheXMpO1xuICB9XG5cbiAgbW92ZVNlbGVjdG9yc0J5KGRlbHRhOiBQb2ludCkge1xuICAgIGNvbnN0IHNlbGVjdG9ycyA9IHRoaXMuc2VsZWN0b3JzLm1hcCh4ID0+IHgub3ZlcmxheSk7XG4gICAgdGhpcy5fZHJhZ1NlcnZpY2UuZHJhZ0VsZW1lbnRzQnkoZGVsdGEsIHNlbGVjdG9ycyk7XG4gIH1cblxuICBtb3ZlT3ZlcmxheXNCeShkZWx0YTogUG9pbnQpIHtcbiAgICBjb25zdCBvdmVybGF5cyA9IHRoaXMuc2VsZWN0b3JzLm1hcCh4ID0+IHgub3ZlcmxheSk7XG4gICAgdGhpcy5fZHJhZ1NlcnZpY2UuZHJhZ0VsZW1lbnRzQnkoZGVsdGEsIG92ZXJsYXlzKTtcbiAgfVxuXG4gIHJlc2VsZWN0KCkge1xuICAgIGNvbnN0IGNsaWVudHMgPSB0aGlzLmNsaWVudHM7XG4gICAgdGhpcy5jbGVhclNlbGVjdG9ycygpO1xuICAgIGNsaWVudHMuZm9yRWFjaChjbGllbnQgPT4ge1xuICAgICAgdGhpcy5zZWxlY3RFbGVtZW50KGNsaWVudCwgZmFsc2UsIHRoaXMuc2hvdWxkQWxsb3dTaXppbmcpO1xuICAgIH0pO1xuICB9XG5cbiAgbnVkZ2VCeShkZWx0YTogUG9pbnQsIG5vZGdlVHlwZTogTnVkZ2VUeXBlKSB7XG4gICAgaWYgKGRlbHRhLnggPT09IDAgJiYgZGVsdGEueSA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5zdGF0ZSA9PT0gU2VsZWN0aW9uU3RhdGUuU2l6YWJsZSkge1xuICAgICAgaWYgKG5vZGdlVHlwZSA9PT0gTnVkZ2VUeXBlLlNlbGVjdG9yKSB7XG4gICAgICAgIHRoaXMucmVzaXplU2VsZWN0b3JzQnkoZGVsdGEpO1xuICAgICAgfVxuICAgICAgaWYgKG5vZGdlVHlwZSA9PT0gTnVkZ2VUeXBlLk92ZXJsYXkpIHtcbiAgICAgICAgdGhpcy5yZXNpemVPdmVybGF5c0J5KGRlbHRhKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUgPT09IFNlbGVjdGlvblN0YXRlLkRyYWdnYWJsZSkge1xuICAgICAgaWYgKG5vZGdlVHlwZSA9PT0gTnVkZ2VUeXBlLlNlbGVjdG9yKSB7XG4gICAgICAgIHRoaXMubW92ZVNlbGVjdG9yc0J5KGRlbHRhKTtcbiAgICAgIH1cbiAgICAgIGlmIChub2RnZVR5cGUgPT09IE51ZGdlVHlwZS5PdmVybGF5KSB7XG4gICAgICAgIHRoaXMubW92ZU92ZXJsYXlzQnkoZGVsdGEpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXRlID0gU2VsZWN0aW9uU3RhdGUuRHJhZ2dhYmxlO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuY2xlYXJTZWxlY3RvcnMoKTtcbiAgICB0aGlzLnJlbmRlcmVyID0gbnVsbDtcbiAgICB0aGlzLmludGVyYWN0aW9uSG9zdCA9IG51bGw7XG4gIH1cbn1cbiJdfQ==