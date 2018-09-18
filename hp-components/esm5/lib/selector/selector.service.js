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
var SelectionState = {
    Draggable: 0,
    Sizable: 1,
    Idle: 2,
};
export { SelectionState };
SelectionState[SelectionState.Draggable] = 'Draggable';
SelectionState[SelectionState.Sizable] = 'Sizable';
SelectionState[SelectionState.Idle] = 'Idle';
/** @enum {number} */
var NudgeType = {
    Overlay: 0,
    Selector: 1,
};
export { NudgeType };
NudgeType[NudgeType.Overlay] = 'Overlay';
NudgeType[NudgeType.Selector] = 'Selector';
var SelectorService = /** @class */ (function () {
    function SelectorService(_sizeService, _dragService, _componentFactoryResolver, _injector) {
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
    Object.defineProperty(SelectorService.prototype, "activeSelector", {
        get: /**
         * @return {?}
         */
        function () {
            return this._activeSelector;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectorService.prototype, "state", {
        get: /**
         * @return {?}
         */
        function () {
            return this._state;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this._state) {
                this._state = value;
                if (this.state !== SelectionState.Idle) {
                    this.createSelectionOverlays();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectorService.prototype, "hasLasso", {
        get: /**
         * @return {?}
         */
        function () {
            return this._lassoSelector !== null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectorService.prototype, "hasElementSelectors", {
        get: /**
         * @return {?}
         */
        function () {
            return Array.from(this._selectors.entries()).length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectorService.prototype, "selectors", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selectors;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectorService.prototype, "selectorElements", {
        /**
         * Represents all selector elements hovering above the captured elements
         */
        get: /**
         * Represents all selector elements hovering above the captured elements
         * @return {?}
         */
        function () {
            return this.selectors.map(function (x) { return x.selectorEl; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectorService.prototype, "clients", {
        /**
         * Represents all the captured elements
         *
         */
        get: /**
         * Represents all the captured elements
         *
         * @return {?}
         */
        function () {
            return this.selectors.map(function (x) { return x.clientEl; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectorService.prototype, "selectableElements", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var children = dom.childrenOf(this.interactionHost).filter(function (x) { return dom.isSelectable(x); });
            return children;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} left
     * @param {?} top
     * @return {?}
     */
    SelectorService.prototype.createlassoSelector = /**
     * @param {?} left
     * @param {?} top
     * @return {?}
     */
    function (left, top) {
        this.clearSelectors();
        if (this.isLassoSelectable) {
            /** @type {?} */
            var selector = this.createSelector(left, top, this.interactionHost);
            this.renderer.setStyle(this.interactionHost, 'cursor', this.lassoCursor);
            this.renderer.addClass(selector, 'hpc-lasso-selector');
            this._lassoSelector = selector;
        }
    };
    /**
     * @return {?}
     */
    SelectorService.prototype.removelassoSelector = /**
     * @return {?}
     */
    function () {
        if (this._lassoSelector) {
            this.renderer.removeChild(this.interactionHost, this._lassoSelector);
            this._lassoSelector = null;
        }
    };
    /**
     * @param {?} point
     * @return {?}
     */
    SelectorService.prototype.selectorAtPoint = /**
     * @param {?} point
     * @return {?}
     */
    function (point) {
        for (var index = 0; index < this.selectors.length; index++) {
            /** @type {?} */
            var selector = this.selectors[index];
            /** @type {?} */
            var element = selector.selectorEl;
            /** @type {?} */
            var elRect = element.getBoundingClientRect();
            /** @type {?} */
            var rect = new Rect(elRect.left, elRect.top, elRect.width, elRect.height);
            if (dom.pointInRect(point, rect)) {
                return selector;
            }
        }
    };
    /**
     * @return {?}
     */
    SelectorService.prototype.selectCapturedElements = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var rect = dom.elementBounds(this._lassoSelector);
        /** @type {?} */
        var capturedElements = dom.elementsAtRect(this.interactionHost, rect, [
            this._lassoSelector
        ]);
        capturedElements.forEach(function (el) {
            _this.selectElement(el, false, _this.shouldAllowSizing);
        });
        this.removelassoSelector();
    };
    /**
     * @return {?}
     */
    SelectorService.prototype.unSelectAll = /**
     * @return {?}
     */
    function () {
        this.clearSelectors();
    };
    /**
     * @param {?} element
     * @return {?}
     */
    SelectorService.prototype.unSelectElement = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        /** @type {?} */
        var selector = this.selectors.find(function (x) { return x.clientEl === element; });
        if (selector) {
            this.clearSelector(selector);
        }
    };
    /**
     * @return {?}
     */
    SelectorService.prototype.selectAll = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.clearSelectors();
        /** @type {?} */
        var children = this.selectableElements;
        children.forEach(function (child) {
            _this.selectElement(child, false);
        });
    };
    /**
     * @param {?} element
     * @param {?=} clearFirst
     * @param {?=} isSizable
     * @return {?}
     */
    SelectorService.prototype.selectElement = /**
     * @param {?} element
     * @param {?=} clearFirst
     * @param {?=} isSizable
     * @return {?}
     */
    function (element, clearFirst, isSizable) {
        if (clearFirst === void 0) { clearFirst = true; }
        if (isSizable === void 0) { isSizable = true; }
        /** @type {?} */
        var selector = this.selectors.find(function (x) {
            return x.selectorEl === element ||
                x.clientEl === element ||
                x.overlay === element;
        });
        if (element.hasAttribute('gripKey')) {
            selector = this.selectors.find(function (x) { return x.selectorEl === element.parentElement.parentElement.parentElement; });
            /** @type {?} */
            var cursor = getComputedStyle(element).cursor;
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
        var rect = dom.elementBounds(element);
        /** @type {?} */
        var selectorEl = this.createSelector(rect.left, rect.top, element.parentElement);
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
    };
    /**
     * @return {?}
     */
    SelectorService.prototype.createSelectionOverlays = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.selectors.forEach(function (selector) {
            _this._sizeService.removeSizingGrips(selector.selectorEl, _this.renderer);
            if (selector.overlay) {
                _this.renderer.removeChild(selector.selectorEl.parentElement, selector.overlay);
            }
            if (_this.state === SelectionState.Sizable &&
                _this._sizeService.canSize(selector.clientEl)) {
                selector.overlay = _this._sizeService.createSizingOverlay(selector.selectorEl);
            }
            else if (_this.state === SelectionState.Draggable &&
                _this._dragService.canDrag(selector.clientEl)) {
                selector.overlay = _this._dragService.createDragOverlay(selector.clientEl);
            }
            if (selector.overlay) {
                _this.renderer.appendChild(selector.selectorEl.parentElement, selector.overlay);
            }
        });
    };
    /**
     * @param {?} left
     * @param {?} top
     * @param {?} parent
     * @return {?}
     */
    SelectorService.prototype.createSelector = /**
     * @param {?} left
     * @param {?} top
     * @param {?} parent
     * @return {?}
     */
    function (left, top, parent) {
        /** @type {?} */
        var selector = this.renderer.createElement('div');
        this.renderer.appendChild(parent, selector);
        this.renderer.setStyle(selector, 'position', 'absolute');
        this.renderer.setStyle(selector, 'left', left + 'px');
        this.renderer.setStyle(selector, 'top', top + 'px');
        this.renderer.setStyle(selector, 'boxSizing', 'border-box');
        this.renderer.setStyle(selector, 'zIndex', '10000');
        return selector;
    };
    /**
     * @return {?}
     */
    SelectorService.prototype.clearSelectors = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.removelassoSelector();
        /** @type {?} */
        var selectors = Array.from(this._selectors.values());
        selectors.forEach(function (selector) {
            _this.clearSelector(selector);
        });
        this._selectors = [];
    };
    /**
     * @param {?} selector
     * @return {?}
     */
    SelectorService.prototype.clearSelector = /**
     * @param {?} selector
     * @return {?}
     */
    function (selector) {
        if (selector === this._activeSelector) {
            this._activeSelector = null;
        }
        this.renderer.removeChild(selector.selectorEl.parentElement, selector.selectorEl);
        if (selector.overlay) {
            this.renderer.removeChild(selector.overlay.parentElement, selector.overlay);
        }
        this.selectors.splice(this.selectors.indexOf(selector), 1);
    };
    /**
     * @param {?} width
     * @param {?} height
     * @param {?} initialPos
     * @return {?}
     */
    SelectorService.prototype.resizeLasso = /**
     * @param {?} width
     * @param {?} height
     * @param {?} initialPos
     * @return {?}
     */
    function (width, height, initialPos) {
        if (height < 0) {
            height = Math.abs(height);
            /** @type {?} */
            var top_1 = initialPos.y - height;
            this.renderer.setStyle(this._lassoSelector, 'top', top_1 + 'px');
        }
        if (width < 0) {
            width = Math.abs(width);
            /** @type {?} */
            var left = initialPos.x - width;
            this.renderer.setStyle(this._lassoSelector, 'left', left + 'px');
        }
        this.renderer.setStyle(this._lassoSelector, 'height', height + 'px');
        this.renderer.setStyle(this._lassoSelector, 'width', width + 'px');
    };
    /**
     * @param {?} delta
     * @return {?}
     */
    SelectorService.prototype.resizeSelectorsBy = /**
     * @param {?} delta
     * @return {?}
     */
    function (delta) {
        /** @type {?} */
        var selectors = this.selectors.map(function (x) { return x.selectorEl; });
        this._sizeService.sizeElementsBy(delta, selectors);
    };
    /**
     * @param {?} delta
     * @return {?}
     */
    SelectorService.prototype.resizeOverlaysBy = /**
     * @param {?} delta
     * @return {?}
     */
    function (delta) {
        /** @type {?} */
        var overlays = this.selectors.map(function (x) { return x.overlay; });
        this._sizeService.sizeElementsBy(delta, overlays);
    };
    /**
     * @param {?} delta
     * @return {?}
     */
    SelectorService.prototype.moveSelectorsBy = /**
     * @param {?} delta
     * @return {?}
     */
    function (delta) {
        /** @type {?} */
        var selectors = this.selectors.map(function (x) { return x.overlay; });
        this._dragService.dragElementsBy(delta, selectors);
    };
    /**
     * @param {?} delta
     * @return {?}
     */
    SelectorService.prototype.moveOverlaysBy = /**
     * @param {?} delta
     * @return {?}
     */
    function (delta) {
        /** @type {?} */
        var overlays = this.selectors.map(function (x) { return x.overlay; });
        this._dragService.dragElementsBy(delta, overlays);
    };
    /**
     * @return {?}
     */
    SelectorService.prototype.reselect = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var clients = this.clients;
        this.clearSelectors();
        clients.forEach(function (client) {
            _this.selectElement(client, false, _this.shouldAllowSizing);
        });
    };
    /**
     * @param {?} delta
     * @param {?} nodgeType
     * @return {?}
     */
    SelectorService.prototype.nudgeBy = /**
     * @param {?} delta
     * @param {?} nodgeType
     * @return {?}
     */
    function (delta, nodgeType) {
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
    };
    /**
     * @return {?}
     */
    SelectorService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.clearSelectors();
        this.renderer = null;
        this.interactionHost = null;
    };
    SelectorService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    SelectorService.ctorParameters = function () { return [
        { type: SizeService },
        { type: DragService },
        { type: ComponentFactoryResolver },
        { type: Injector }
    ]; };
    return SelectorService;
}());
export { SelectorService };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2hwLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJsaWIvc2VsZWN0b3Ivc2VsZWN0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBd0Isd0JBQXdCLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BHLE9BQU8sRUFBRSxJQUFJLEVBQVMsTUFBTSxpQkFBaUIsQ0FBQztBQUM5QyxPQUFPLEtBQUssR0FBRyxNQUFNLGdCQUFnQixDQUFDO0FBQ3RDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7Ozs7Ozs7Ozs7SUFTckQsWUFBUztJQUNULFVBQU87SUFDUCxPQUFJOzs7OEJBRkosU0FBUzs4QkFDVCxPQUFPOzhCQUNQLElBQUk7OztJQUlKLFVBQU87SUFDUCxXQUFROzs7b0JBRFIsT0FBTztvQkFDUCxRQUFROztJQWlFUix5QkFDVSxjQUNBLGNBQ0EsMkJBQ0E7UUFIQSxpQkFBWSxHQUFaLFlBQVk7UUFDWixpQkFBWSxHQUFaLFlBQVk7UUFDWiw4QkFBeUIsR0FBekIseUJBQXlCO1FBQ3pCLGNBQVMsR0FBVCxTQUFTOzhCQWhFbUIsSUFBSTswQkFDckIsSUFBSSxLQUFLLEVBQWE7MkJBRzdCLFdBQVc7aUNBR0wsSUFBSTtpQ0FDSixJQUFJO0tBeURwQjtJQXRESixzQkFBSSwyQ0FBYzs7OztRQUFsQjtZQUNFLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztTQUM3Qjs7O09BQUE7MEJBR1Usa0NBQUs7Ozs7O1lBQ2QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDOzs7Ozs7a0JBRUosS0FBcUI7WUFDcEMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxL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ZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzdCO1lBQ0QsSUFBSSxTQUFTLEtBQUssU0FBUyxDQUFDLE9BQU8sRUFBRTtnQkFDbkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM1QjtTQUNGO2FBQU07WUFDTCxJQUFJLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQyxTQUFTLENBQUM7U0FDdkM7S0FDRjs7OztJQUVELHFDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztLQUM3Qjs7Z0JBaFVGLFVBQVU7Ozs7Z0JBcEJGLFdBQVc7Z0JBQ1gsV0FBVztnQkFKdUIsd0JBQXdCO2dCQUFFLFFBQVE7OzBCQUE3RTs7U0F3QmEsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIFJlbmRlcmVyMiwgT25EZXN0cm95LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIEluamVjdG9yfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlY3QsIFBvaW50IH0gZnJvbSAnLi4vc2NyaXB0cy9tYXRoJztcbmltcG9ydCAqIGFzIGRvbSBmcm9tICcuLi9zY3JpcHRzL2RvbSc7XG5pbXBvcnQgeyBTaXplU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3NpemUuc2VydmljZSc7XG5pbXBvcnQgeyBEcmFnU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2RyYWcuc2VydmljZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNlbGVjdG9yIHtcbiAgc2VsZWN0b3JFbDogSFRNTEVsZW1lbnQ7XG4gIG92ZXJsYXk6IEhUTUxFbGVtZW50O1xuICBjbGllbnRFbDogSFRNTEVsZW1lbnQ7XG59XG5cbmV4cG9ydCBlbnVtIFNlbGVjdGlvblN0YXRlIHtcbiAgRHJhZ2dhYmxlLFxuICBTaXphYmxlLFxuICBJZGxlXG59XG5cbmV4cG9ydCBlbnVtIE51ZGdlVHlwZSB7XG4gIE92ZXJsYXksXG4gIFNlbGVjdG9yXG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZWxlY3RvclNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9sYXNzb1NlbGVjdG9yOiBIVE1MRWxlbWVudCA9IG51bGw7XG4gIHByaXZhdGUgX3NlbGVjdG9ycyA9IG5ldyBBcnJheTxJU2VsZWN0b3I+KCk7XG5cbiAgc2NhbGU6IG51bWJlcjtcbiAgbGFzc29DdXJzb3IgPSAnY3Jvc3NoYWlyJztcbiAgcmVuZGVyZXI6IFJlbmRlcmVyMjtcbiAgaW50ZXJhY3Rpb25Ib3N0OiBIVE1MRWxlbWVudDtcbiAgc2hvdWxkQWxsb3dTaXppbmcgPSB0cnVlO1xuICBpc0xhc3NvU2VsZWN0YWJsZSA9IHRydWU7XG5cbiAgcHJpdmF0ZSBfYWN0aXZlU2VsZWN0b3I6IElTZWxlY3RvcjtcbiAgZ2V0IGFjdGl2ZVNlbGVjdG9yKCk6IElTZWxlY3RvciB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZVNlbGVjdG9yO1xuICB9XG5cbiAgcHJpdmF0ZSBfc3RhdGU6IFNlbGVjdGlvblN0YXRlO1xuICBwdWJsaWMgZ2V0IHN0YXRlKCk6IFNlbGVjdGlvblN0YXRlIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhdGU7XG4gIH1cbiAgcHVibGljIHNldCBzdGF0ZSh2YWx1ZTogU2VsZWN0aW9uU3RhdGUpIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX3N0YXRlKSB7XG4gICAgICB0aGlzLl9zdGF0ZSA9IHZhbHVlO1xuICAgICAgaWYgKHRoaXMuc3RhdGUgIT09IFNlbGVjdGlvblN0YXRlLklkbGUpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVTZWxlY3Rpb25PdmVybGF5cygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldCBoYXNMYXNzbygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbGFzc29TZWxlY3RvciAhPT0gbnVsbDtcbiAgfVxuXG4gIGdldCBoYXNFbGVtZW50U2VsZWN0b3JzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuX3NlbGVjdG9ycy5lbnRyaWVzKCkpLmxlbmd0aCA+IDA7XG4gIH1cblxuICBnZXQgc2VsZWN0b3JzKCk6IElTZWxlY3RvcltdIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0b3JzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudHMgYWxsIHNlbGVjdG9yIGVsZW1lbnRzIGhvdmVyaW5nIGFib3ZlIHRoZSBjYXB0dXJlZCBlbGVtZW50c1xuICAgKi9cbiAgZ2V0IHNlbGVjdG9yRWxlbWVudHMoKTogSFRNTEVsZW1lbnRbXSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0b3JzLm1hcCh4ID0+IHguc2VsZWN0b3JFbCk7XG4gIH1cblxuICAvKipcbiAgICogUmVwcmVzZW50cyBhbGwgdGhlIGNhcHR1cmVkIGVsZW1lbnRzXG4gICAqXG4gICAqL1xuICBnZXQgY2xpZW50cygpOiBIVE1MRWxlbWVudFtdIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RvcnMubWFwKHggPT4geC5jbGllbnRFbCk7XG4gIH1cblxuICAgIGdldCBzZWxlY3RhYmxlRWxlbWVudHMoKTogSFRNTEVsZW1lbnRbXSB7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBkb20uY2hpbGRyZW5PZih0aGlzLmludGVyYWN0aW9uSG9zdCkuZmlsdGVyKHggPT4gZG9tLmlzU2VsZWN0YWJsZSh4KSk7XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfc2l6ZVNlcnZpY2U6IFNpemVTZXJ2aWNlLFxuICAgIHByaXZhdGUgX2RyYWdTZXJ2aWNlOiBEcmFnU2VydmljZSxcbiAgICBwcml2YXRlIF9jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIF9pbmplY3RvcjogSW5qZWN0b3JcbiAgKSB7fVxuXG4gIGNyZWF0ZWxhc3NvU2VsZWN0b3IobGVmdDogbnVtYmVyLCB0b3A6IG51bWJlcikge1xuICAgIHRoaXMuY2xlYXJTZWxlY3RvcnMoKTtcbiAgICBpZiAodGhpcy5pc0xhc3NvU2VsZWN0YWJsZSkge1xuICAgICAgY29uc3Qgc2VsZWN0b3IgPSB0aGlzLmNyZWF0ZVNlbGVjdG9yKGxlZnQsIHRvcCwgdGhpcy5pbnRlcmFjdGlvbkhvc3QpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmludGVyYWN0aW9uSG9zdCwgJ2N1cnNvcicsIHRoaXMubGFzc29DdXJzb3IpO1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhzZWxlY3RvciwgJ2hwYy1sYXNzby1zZWxlY3RvcicpO1xuICAgICAgdGhpcy5fbGFzc29TZWxlY3RvciA9IHNlbGVjdG9yO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZWxhc3NvU2VsZWN0b3IoKSB7XG4gICAgaWYgKHRoaXMuX2xhc3NvU2VsZWN0b3IpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy5pbnRlcmFjdGlvbkhvc3QsIHRoaXMuX2xhc3NvU2VsZWN0b3IpO1xuICAgICAgdGhpcy5fbGFzc29TZWxlY3RvciA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0b3JBdFBvaW50KHBvaW50OiBQb2ludCk6IElTZWxlY3RvciB7XG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuc2VsZWN0b3JzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY29uc3Qgc2VsZWN0b3IgPSB0aGlzLnNlbGVjdG9yc1tpbmRleF07XG4gICAgICBjb25zdCBlbGVtZW50ID0gc2VsZWN0b3Iuc2VsZWN0b3JFbDtcbiAgICAgIGNvbnN0IGVsUmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBjb25zdCByZWN0ID0gbmV3IFJlY3QoXG4gICAgICAgIGVsUmVjdC5sZWZ0LFxuICAgICAgICBlbFJlY3QudG9wLFxuICAgICAgICBlbFJlY3Qud2lkdGgsXG4gICAgICAgIGVsUmVjdC5oZWlnaHRcbiAgICAgICk7XG4gICAgICBpZiAoZG9tLnBvaW50SW5SZWN0KHBvaW50LCByZWN0KSkge1xuICAgICAgICByZXR1cm4gc2VsZWN0b3I7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0Q2FwdHVyZWRFbGVtZW50cygpIHtcbiAgICBjb25zdCByZWN0ID0gZG9tLmVsZW1lbnRCb3VuZHModGhpcy5fbGFzc29TZWxlY3Rvcik7XG4gICAgY29uc3QgY2FwdHVyZWRFbGVtZW50cyA9IGRvbS5lbGVtZW50c0F0UmVjdCh0aGlzLmludGVyYWN0aW9uSG9zdCwgcmVjdCwgW1xuICAgICAgdGhpcy5fbGFzc29TZWxlY3RvclxuICAgIF0pO1xuICAgIGNhcHR1cmVkRWxlbWVudHMuZm9yRWFjaChlbCA9PiB7XG4gICAgICB0aGlzLnNlbGVjdEVsZW1lbnQoZWwsIGZhbHNlLCB0aGlzLnNob3VsZEFsbG93U2l6aW5nKTtcbiAgICB9KTtcbiAgICB0aGlzLnJlbW92ZWxhc3NvU2VsZWN0b3IoKTtcbiAgfVxuXG4gIHVuU2VsZWN0QWxsKCkge1xuICAgIHRoaXMuY2xlYXJTZWxlY3RvcnMoKTtcbiAgfVxuXG4gIHVuU2VsZWN0RWxlbWVudChlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIGNvbnN0IHNlbGVjdG9yID0gdGhpcy5zZWxlY3RvcnMuZmluZCh4ID0+IHguY2xpZW50RWwgPT09IGVsZW1lbnQpO1xuICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgdGhpcy5jbGVhclNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICB9XG4gIH1cblxuICBzZWxlY3RBbGwoKSB7XG4gICAgdGhpcy5jbGVhclNlbGVjdG9ycygpO1xuICAgIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5zZWxlY3RhYmxlRWxlbWVudHM7XG4gICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgIHRoaXMuc2VsZWN0RWxlbWVudChjaGlsZCwgZmFsc2UpO1xuICAgIH0pO1xuICB9XG5cbiAgc2VsZWN0RWxlbWVudChlbGVtZW50OiBIVE1MRWxlbWVudCwgY2xlYXJGaXJzdCA9IHRydWUsIGlzU2l6YWJsZSA9IHRydWUpIHtcbiAgICBsZXQgc2VsZWN0b3IgPSB0aGlzLnNlbGVjdG9ycy5maW5kKFxuICAgICAgeCA9PlxuICAgICAgICB4LnNlbGVjdG9yRWwgPT09IGVsZW1lbnQgfHxcbiAgICAgICAgeC5jbGllbnRFbCA9PT0gZWxlbWVudCB8fFxuICAgICAgICB4Lm92ZXJsYXkgPT09IGVsZW1lbnRcbiAgICApO1xuICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZ3JpcEtleScpKSB7XG4gICAgICBzZWxlY3RvciA9IHRoaXMuc2VsZWN0b3JzLmZpbmQoXG4gICAgICAgIHggPT4geC5zZWxlY3RvckVsID09PSBlbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50XG4gICAgICApO1xuICAgICAgY29uc3QgY3Vyc29yID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5jdXJzb3I7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuaW50ZXJhY3Rpb25Ib3N0LCAnY3Vyc29yJywgY3Vyc29yKTtcbiAgICAgIHRoaXMuX3NpemVTZXJ2aWNlLmdyaXBLZXkgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZ3JpcEtleScpO1xuICAgICAgdGhpcy5zdGF0ZSA9IFNlbGVjdGlvblN0YXRlLlNpemFibGU7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICB0aGlzLnN0YXRlID0gU2VsZWN0aW9uU3RhdGUuSWRsZTtcbiAgICAgIHRoaXMuX2FjdGl2ZVNlbGVjdG9yID0gc2VsZWN0b3I7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChjbGVhckZpcnN0KSB7XG4gICAgICB0aGlzLmNsZWFyU2VsZWN0b3JzKCk7XG4gICAgfVxuICAgIGNvbnN0IHJlY3QgPSBkb20uZWxlbWVudEJvdW5kcyhlbGVtZW50KTtcbiAgICBjb25zdCBzZWxlY3RvckVsID0gdGhpcy5jcmVhdGVTZWxlY3RvcihcbiAgICAgIHJlY3QubGVmdCxcbiAgICAgIHJlY3QudG9wLFxuICAgICAgZWxlbWVudC5wYXJlbnRFbGVtZW50XG4gICAgKTtcbiAgICBzZWxlY3RvckVsWydpc1NlbGVjdG9yJ10gPSB0cnVlO1xuICAgIGRvbS5hc3NpZ25Cb3VuZGluZ1JlY3QodGhpcy5yZW5kZXJlciwgZWxlbWVudCwgc2VsZWN0b3JFbCk7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhzZWxlY3RvckVsLCAnaHBjLWVsZW1lbnQtc2VsZWN0b3InKTtcbiAgICBzZWxlY3RvciA9IHsgY2xpZW50RWw6IGVsZW1lbnQsIHNlbGVjdG9yRWw6IHNlbGVjdG9yRWwsIG92ZXJsYXk6IG51bGwgfTtcbiAgICB0aGlzLl9zZWxlY3RvcnMucHVzaChzZWxlY3Rvcik7XG4gICAgdGhpcy5fYWN0aXZlU2VsZWN0b3IgPSBzZWxlY3RvcjtcbiAgICBpZiAoaXNTaXphYmxlICYmIHRoaXMuX3NpemVTZXJ2aWNlLmNhblNpemUoZWxlbWVudCkpIHtcbiAgICAgIHRoaXMuX3NpemVTZXJ2aWNlLmFkZFNpemluZ0dyaXBzKHNlbGVjdG9yRWwsIHRoaXMucmVuZGVyZXIpO1xuICAgIH1cbiAgICBpZiAoZG9tLmVsZW1lbnREcmFnZ2FibGUoZWxlbWVudCkpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5pbnRlcmFjdGlvbkhvc3QsICdjdXJzb3InLCAnbW92ZScpO1xuICAgIH1cbiAgICB0aGlzLnN0YXRlID0gU2VsZWN0aW9uU3RhdGUuSWRsZTtcbiAgfVxuXG4gIGNyZWF0ZVNlbGVjdGlvbk92ZXJsYXlzKCkge1xuICAgIHRoaXMuc2VsZWN0b3JzLmZvckVhY2goc2VsZWN0b3IgPT4ge1xuICAgICAgdGhpcy5fc2l6ZVNlcnZpY2UucmVtb3ZlU2l6aW5nR3JpcHMoc2VsZWN0b3Iuc2VsZWN0b3JFbCwgdGhpcy5yZW5kZXJlcik7XG4gICAgICBpZiAoc2VsZWN0b3Iub3ZlcmxheSkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKFxuICAgICAgICAgIHNlbGVjdG9yLnNlbGVjdG9yRWwucGFyZW50RWxlbWVudCxcbiAgICAgICAgICBzZWxlY3Rvci5vdmVybGF5XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuc3RhdGUgPT09IFNlbGVjdGlvblN0YXRlLlNpemFibGUgJiZcbiAgICAgICAgdGhpcy5fc2l6ZVNlcnZpY2UuY2FuU2l6ZShzZWxlY3Rvci5jbGllbnRFbClcbiAgICAgICkge1xuICAgICAgICBzZWxlY3Rvci5vdmVybGF5ID0gdGhpcy5fc2l6ZVNlcnZpY2UuY3JlYXRlU2l6aW5nT3ZlcmxheShcbiAgICAgICAgICBzZWxlY3Rvci5zZWxlY3RvckVsXG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICB0aGlzLnN0YXRlID09PSBTZWxlY3Rpb25TdGF0ZS5EcmFnZ2FibGUgJiZcbiAgICAgICAgdGhpcy5fZHJhZ1NlcnZpY2UuY2FuRHJhZyhzZWxlY3Rvci5jbGllbnRFbClcbiAgICAgICkge1xuICAgICAgICBzZWxlY3Rvci5vdmVybGF5ID0gdGhpcy5fZHJhZ1NlcnZpY2UuY3JlYXRlRHJhZ092ZXJsYXkoXG4gICAgICAgICAgc2VsZWN0b3IuY2xpZW50RWxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmIChzZWxlY3Rvci5vdmVybGF5KSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgc2VsZWN0b3Iuc2VsZWN0b3JFbC5wYXJlbnRFbGVtZW50LFxuICAgICAgICAgIHNlbGVjdG9yLm92ZXJsYXlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZVNlbGVjdG9yKGxlZnQ6IG51bWJlciwgdG9wOiBudW1iZXIsIHBhcmVudDogRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcbiAgICBjb25zdCBzZWxlY3RvciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChwYXJlbnQsIHNlbGVjdG9yKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHNlbGVjdG9yLCAncG9zaXRpb24nLCAnYWJzb2x1dGUnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHNlbGVjdG9yLCAnbGVmdCcsIGxlZnQgKyAncHgnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHNlbGVjdG9yLCAndG9wJywgdG9wICsgJ3B4Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShzZWxlY3RvciwgJ2JveFNpemluZycsICdib3JkZXItYm94Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShzZWxlY3RvciwgJ3pJbmRleCcsICcxMDAwMCcpO1xuICAgIHJldHVybiBzZWxlY3RvcjtcbiAgfVxuXG4gIGNsZWFyU2VsZWN0b3JzKCkge1xuICAgIHRoaXMucmVtb3ZlbGFzc29TZWxlY3RvcigpO1xuICAgIGNvbnN0IHNlbGVjdG9ycyA9IEFycmF5LmZyb20odGhpcy5fc2VsZWN0b3JzLnZhbHVlcygpKTtcbiAgICBzZWxlY3RvcnMuZm9yRWFjaChzZWxlY3RvciA9PiB7XG4gICAgICB0aGlzLmNsZWFyU2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgIH0pO1xuICAgIHRoaXMuX3NlbGVjdG9ycyA9IFtdO1xuICB9XG5cbiAgY2xlYXJTZWxlY3RvcihzZWxlY3RvcjogSVNlbGVjdG9yKSB7XG4gICAgaWYgKHNlbGVjdG9yID09PSB0aGlzLl9hY3RpdmVTZWxlY3Rvcikge1xuICAgICAgdGhpcy5fYWN0aXZlU2VsZWN0b3IgPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKFxuICAgICAgc2VsZWN0b3Iuc2VsZWN0b3JFbC5wYXJlbnRFbGVtZW50LFxuICAgICAgc2VsZWN0b3Iuc2VsZWN0b3JFbFxuICAgICk7XG4gICAgaWYgKHNlbGVjdG9yLm92ZXJsYXkpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQoXG4gICAgICAgIHNlbGVjdG9yLm92ZXJsYXkucGFyZW50RWxlbWVudCxcbiAgICAgICAgc2VsZWN0b3Iub3ZlcmxheVxuICAgICAgKTtcbiAgICB9XG4gICAgdGhpcy5zZWxlY3RvcnMuc3BsaWNlKHRoaXMuc2VsZWN0b3JzLmluZGV4T2Yoc2VsZWN0b3IpLCAxKTtcbiAgfVxuXG4gIHJlc2l6ZUxhc3NvKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBpbml0aWFsUG9zOiBQb2ludCkge1xuICAgIGlmIChoZWlnaHQgPCAwKSB7XG4gICAgICBoZWlnaHQgPSBNYXRoLmFicyhoZWlnaHQpO1xuICAgICAgY29uc3QgdG9wID0gaW5pdGlhbFBvcy55IC0gaGVpZ2h0O1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9sYXNzb1NlbGVjdG9yLCAndG9wJywgdG9wICsgJ3B4Jyk7XG4gICAgfVxuICAgIGlmICh3aWR0aCA8IDApIHtcbiAgICAgIHdpZHRoID0gTWF0aC5hYnMod2lkdGgpO1xuICAgICAgY29uc3QgbGVmdCA9IGluaXRpYWxQb3MueCAtIHdpZHRoO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9sYXNzb1NlbGVjdG9yLCAnbGVmdCcsIGxlZnQgKyAncHgnKTtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9sYXNzb1NlbGVjdG9yLCAnaGVpZ2h0JywgaGVpZ2h0ICsgJ3B4Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9sYXNzb1NlbGVjdG9yLCAnd2lkdGgnLCB3aWR0aCArICdweCcpO1xuICB9XG5cbiAgcmVzaXplU2VsZWN0b3JzQnkoZGVsdGE6IFBvaW50KSB7XG4gICAgY29uc3Qgc2VsZWN0b3JzID0gdGhpcy5zZWxlY3RvcnMubWFwKHggPT4geC5zZWxlY3RvckVsKTtcbiAgICB0aGlzLl9zaXplU2VydmljZS5zaXplRWxlbWVudHNCeShkZWx0YSwgc2VsZWN0b3JzKTtcbiAgfVxuXG4gIHJlc2l6ZU92ZXJsYXlzQnkoZGVsdGE6IFBvaW50KSB7XG4gICAgY29uc3Qgb3ZlcmxheXMgPSB0aGlzLnNlbGVjdG9ycy5tYXAoeCA9PiB4Lm92ZXJsYXkpO1xuICAgIHRoaXMuX3NpemVTZXJ2aWNlLnNpemVFbGVtZW50c0J5KGRlbHRhLCBvdmVybGF5cyk7XG4gIH1cblxuICBtb3ZlU2VsZWN0b3JzQnkoZGVsdGE6IFBvaW50KSB7XG4gICAgY29uc3Qgc2VsZWN0b3JzID0gdGhpcy5zZWxlY3RvcnMubWFwKHggPT4geC5vdmVybGF5KTtcbiAgICB0aGlzLl9kcmFnU2VydmljZS5kcmFnRWxlbWVudHNCeShkZWx0YSwgc2VsZWN0b3JzKTtcbiAgfVxuXG4gIG1vdmVPdmVybGF5c0J5KGRlbHRhOiBQb2ludCkge1xuICAgIGNvbnN0IG92ZXJsYXlzID0gdGhpcy5zZWxlY3RvcnMubWFwKHggPT4geC5vdmVybGF5KTtcbiAgICB0aGlzLl9kcmFnU2VydmljZS5kcmFnRWxlbWVudHNCeShkZWx0YSwgb3ZlcmxheXMpO1xuICB9XG5cbiAgcmVzZWxlY3QoKSB7XG4gICAgY29uc3QgY2xpZW50cyA9IHRoaXMuY2xpZW50cztcbiAgICB0aGlzLmNsZWFyU2VsZWN0b3JzKCk7XG4gICAgY2xpZW50cy5mb3JFYWNoKGNsaWVudCA9PiB7XG4gICAgICB0aGlzLnNlbGVjdEVsZW1lbnQoY2xpZW50LCBmYWxzZSwgdGhpcy5zaG91bGRBbGxvd1NpemluZyk7XG4gICAgfSk7XG4gIH1cblxuICBudWRnZUJ5KGRlbHRhOiBQb2ludCwgbm9kZ2VUeXBlOiBOdWRnZVR5cGUpIHtcbiAgICBpZiAoZGVsdGEueCA9PT0gMCAmJiBkZWx0YS55ID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLnN0YXRlID09PSBTZWxlY3Rpb25TdGF0ZS5TaXphYmxlKSB7XG4gICAgICBpZiAobm9kZ2VUeXBlID09PSBOdWRnZVR5cGUuU2VsZWN0b3IpIHtcbiAgICAgICAgdGhpcy5yZXNpemVTZWxlY3RvcnNCeShkZWx0YSk7XG4gICAgICB9XG4gICAgICBpZiAobm9kZ2VUeXBlID09PSBOdWRnZVR5cGUuT3ZlcmxheSkge1xuICAgICAgICB0aGlzLnJlc2l6ZU92ZXJsYXlzQnkoZGVsdGEpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZSA9PT0gU2VsZWN0aW9uU3RhdGUuRHJhZ2dhYmxlKSB7XG4gICAgICBpZiAobm9kZ2VUeXBlID09PSBOdWRnZVR5cGUuU2VsZWN0b3IpIHtcbiAgICAgICAgdGhpcy5tb3ZlU2VsZWN0b3JzQnkoZGVsdGEpO1xuICAgICAgfVxuICAgICAgaWYgKG5vZGdlVHlwZSA9PT0gTnVkZ2VUeXBlLk92ZXJsYXkpIHtcbiAgICAgICAgdGhpcy5tb3ZlT3ZlcmxheXNCeShkZWx0YSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhdGUgPSBTZWxlY3Rpb25TdGF0ZS5EcmFnZ2FibGU7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5jbGVhclNlbGVjdG9ycygpO1xuICAgIHRoaXMucmVuZGVyZXIgPSBudWxsO1xuICAgIHRoaXMuaW50ZXJhY3Rpb25Ib3N0ID0gbnVsbDtcbiAgfVxufVxuIl19