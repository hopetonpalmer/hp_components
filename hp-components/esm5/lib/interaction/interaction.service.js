/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { SelectorService } from '../selector/selector.service';
import * as dom from '../scripts/dom';
var InteractionService = /** @class */ (function () {
    function InteractionService(_selectionService) {
        this._selectionService = _selectionService;
        this._deleteElementSubject = new Subject();
        this.deleteElement$ = this._deleteElementSubject.asObservable();
        this._deleteElementsSubject = new Subject();
        this.deleteElements$ = this._deleteElementSubject.asObservable();
        this._deleteSelectedElementsSubject = new Subject();
        this.deleteSelectedElements$ = this._deleteSelectedElementsSubject.asObservable();
        this._addElementSubject = new Subject();
        this.addElement$ = this._addElementSubject.asObservable();
        this._selectedElementsSubject = new BehaviorSubject(null);
        this.selectedElements$ = this._selectedElementsSubject.asObservable();
        this._selectedElements = [];
    }
    Object.defineProperty(InteractionService.prototype, "selectedElements", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selectedElements;
        },
        set: /**
         * @param {?} elements
         * @return {?}
         */
        function (elements) {
            this._selectedElements = elements;
            this._selectedElementsSubject.next(elements);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractionService.prototype, "hasSelectedElements", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selectedElements && this._selectedElements.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractionService.prototype, "canSelectElements", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selectionService.selectableElements.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * remove an element from the interaction host
     * @param element - the element to remove
     * @param renderer - the renderer used to remove the element
     */
    /**
     * remove an element from the interaction host
     * @param {?} element - the element to remove
     * @return {?}
     */
    InteractionService.prototype.deleteElement = /**
     * remove an element from the interaction host
     * @param {?} element - the element to remove
     * @return {?}
     */
    function (element) {
        this.renderer.removeChild(element.parentElement, element);
        this._deleteElementSubject.next(element);
    };
    /**
     * remove a list of elements from the interaction host
     * @param element - the elements to remove
     * @param renderer - the renderer used to remove the elements
     */
    /**
     * remove a list of elements from the interaction host
     * @param {?} elements
     * @return {?}
     */
    InteractionService.prototype.deleteElements = /**
     * remove a list of elements from the interaction host
     * @param {?} elements
     * @return {?}
     */
    function (elements) {
        var _this = this;
        elements.forEach(function (element) {
            _this.renderer.removeChild(element.parentElement, element);
        });
        this._deleteElementsSubject.next(elements);
    };
    /**
     * @return {?}
     */
    InteractionService.prototype.deleteSelectedElements = /**
     * @return {?}
     */
    function () {
        this._deleteSelectedElementsSubject.next();
    };
    /**
     * @return {?}
     */
    InteractionService.prototype.deleteAll = /**
     * @return {?}
     */
    function () {
        this._selectionService.unSelectAll();
        /** @type {?} */
        var children = dom.childrenOf(this.interactionHost);
        for (var index = children.length - 1; index >= 0; index--) {
            /** @type {?} */
            var element = children[index];
            this.renderer.removeChild(this.interactionHost, element);
        }
    };
    /**
     * @param {?=} element
     * @return {?}
     */
    InteractionService.prototype.addElement = /**
     * @param {?=} element
     * @return {?}
     */
    function (element) {
        if (element === void 0) { element = null; }
        if (!element) {
            element = this.renderer.createElement('div');
            this.renderer.addClass(element, 'hpc-new-element');
        }
        this.renderer.setStyle(element, 'box-sizing', 'border-box');
        this.renderer.setStyle(element, 'position', 'absolute');
        this.renderer.appendChild(this.interactionHost, element);
        this._selectionService.selectElement(/** @type {?} */ (element));
        this.interactionHost.focus();
        this._addElementSubject.next(element);
    };
    /**
     * @param {?=} element
     * @return {?}
     */
    InteractionService.prototype.addContainer = /**
     * @param {?=} element
     * @return {?}
     */
    function (element) {
        if (element === void 0) { element = null; }
        if (!element) {
            element = this.renderer.createElement('div');
            this.renderer.addClass(element, 'hpc-new-element');
        }
        this.renderer.addClass(element, 'hpc-dropzone');
        this.renderer.addClass(element, 'hpc-container');
        this.addElement(element);
    };
    /**
     * @return {?}
     */
    InteractionService.prototype.selectAll = /**
     * @return {?}
     */
    function () {
        this._selectionService.selectAll();
        this.selectedElements = this._selectionService.clients;
    };
    /**
     * @return {?}
     */
    InteractionService.prototype.unSelectAll = /**
     * @return {?}
     */
    function () {
        this._selectionService.unSelectAll();
        this.selectedElements = this._selectionService.clients;
    };
    /**
     * @return {?}
     */
    InteractionService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.renderer = null;
    };
    InteractionService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    InteractionService.ctorParameters = function () { return [
        { type: SelectorService }
    ]; };
    return InteractionService;
}());
export { InteractionService };
if (false) {
    /** @type {?} */
    InteractionService.prototype._deleteElementSubject;
    /** @type {?} */
    InteractionService.prototype.deleteElement$;
    /** @type {?} */
    InteractionService.prototype._deleteElementsSubject;
    /** @type {?} */
    InteractionService.prototype.deleteElements$;
    /** @type {?} */
    InteractionService.prototype._deleteSelectedElementsSubject;
    /** @type {?} */
    InteractionService.prototype.deleteSelectedElements$;
    /** @type {?} */
    InteractionService.prototype._addElementSubject;
    /** @type {?} */
    InteractionService.prototype.addElement$;
    /** @type {?} */
    InteractionService.prototype._selectedElementsSubject;
    /** @type {?} */
    InteractionService.prototype.selectedElements$;
    /** @type {?} */
    InteractionService.prototype._selectedElements;
    /** @type {?} */
    InteractionService.prototype.renderer;
    /** @type {?} */
    InteractionService.prototype.interactionHost;
    /** @type {?} */
    InteractionService.prototype._selectionService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJhY3Rpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2hwLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJsaWIvaW50ZXJhY3Rpb24vaW50ZXJhY3Rpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDL0QsT0FBTyxFQUFFLE9BQU8sRUFBYyxlQUFlLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDM0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sS0FBSyxHQUFHLE1BQU0sZ0JBQWdCLENBQUM7O0lBc0NwQyw0QkFBb0IsaUJBQWtDO1FBQWxDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBaUI7cUNBbEN0QixJQUFJLE9BQU8sRUFBVzs4QkFDckMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFlBQVksRUFBRTtzQ0FFekIsSUFBSSxPQUFPLEVBQWE7K0JBQ3ZDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLEVBQUU7OENBRWxCLElBQUksT0FBTyxFQUFFO3VDQUM1QixJQUFJLENBQUMsOEJBQThCLENBQUMsWUFBWSxFQUFFO2tDQUUvQyxJQUFJLE9BQU8sRUFBVzsyQkFDckMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRTt3Q0FFakIsSUFBSSxlQUFlLENBQVksSUFBSSxDQUFDO2lDQUNuRCxJQUFJLENBQUMsd0JBQXdCLENBQUMsWUFBWSxFQUFFO2lDQUV6QixFQUFFO0tBbUJrQjtJQWxCM0Qsc0JBQUksZ0RBQWdCOzs7O1FBQXBCO1lBQ0UsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7U0FDL0I7Ozs7O1FBQ0QsVUFBcUIsUUFBbUI7WUFDdEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQztZQUNsQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFD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LElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1NBQ3BEO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQzFCOzs7O0lBRUQsc0NBQVM7OztJQUFUO1FBQ0UsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDO0tBQ3hEOzs7O0lBRUQsd0NBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDO0tBQ3hEOzs7O0lBRUQsd0NBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7S0FDdEI7O2dCQTVHRixVQUFVOzs7O2dCQUhGLGVBQWU7OzZCQUZ4Qjs7U0FNYSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGUsIFJlbmRlcmVyMiwgT25EZXN0cm95fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTZWxlY3RvclNlcnZpY2UgfSBmcm9tICcuLi9zZWxlY3Rvci9zZWxlY3Rvci5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIGRvbSBmcm9tICcuLi9zY3JpcHRzL2RvbSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJbnRlcmFjdGlvblNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9kZWxldGVFbGVtZW50U3ViamVjdCA9IG5ldyBTdWJqZWN0PEVsZW1lbnQ+KCk7XG4gIGRlbGV0ZUVsZW1lbnQkID0gdGhpcy5fZGVsZXRlRWxlbWVudFN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG5cbiAgcHJpdmF0ZSBfZGVsZXRlRWxlbWVudHNTdWJqZWN0ID0gbmV3IFN1YmplY3Q8RWxlbWVudFtdPigpO1xuICBkZWxldGVFbGVtZW50cyQgPSB0aGlzLl9kZWxldGVFbGVtZW50U3ViamVjdC5hc09ic2VydmFibGUoKTtcblxuICBwcml2YXRlIF9kZWxldGVTZWxlY3RlZEVsZW1lbnRzU3ViamVjdCA9IG5ldyBTdWJqZWN0KCk7XG4gIGRlbGV0ZVNlbGVjdGVkRWxlbWVudHMkID0gdGhpcy5fZGVsZXRlU2VsZWN0ZWRFbGVtZW50c1N1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG5cbiAgcHJpdmF0ZSBfYWRkRWxlbWVudFN1YmplY3QgPSBuZXcgU3ViamVjdDxFbGVtZW50PigpO1xuICBhZGRFbGVtZW50JCA9IHRoaXMuX2FkZEVsZW1lbnRTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuXG4gIHByaXZhdGUgX3NlbGVjdGVkRWxlbWVudHNTdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxFbGVtZW50W10+KG51bGwpO1xuICBzZWxlY3RlZEVsZW1lbnRzJCA9IHRoaXMuX3NlbGVjdGVkRWxlbWVudHNTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuXG4gIHByaXZhdGUgX3NlbGVjdGVkRWxlbWVudHM6IEVsZW1lbnRbXSA9IFtdO1xuICBnZXQgc2VsZWN0ZWRFbGVtZW50cygpOiBFbGVtZW50W10ge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZEVsZW1lbnRzO1xuICB9XG4gIHNldCBzZWxlY3RlZEVsZW1lbnRzKGVsZW1lbnRzOiBFbGVtZW50W10pIHtcbiAgICB0aGlzLl9zZWxlY3RlZEVsZW1lbnRzID0gZWxlbWVudHM7XG4gICAgdGhpcy5fc2VsZWN0ZWRFbGVtZW50c1N1YmplY3QubmV4dChlbGVtZW50cyk7XG4gIH1cbiAgZ2V0IGhhc1NlbGVjdGVkRWxlbWVudHMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkRWxlbWVudHMgJiYgdGhpcy5fc2VsZWN0ZWRFbGVtZW50cy5sZW5ndGggPiAwO1xuICB9XG5cbiAgZ2V0IGNhblNlbGVjdEVsZW1lbnRzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnNlbGVjdGFibGVFbGVtZW50cy5sZW5ndGggPiAwO1xuICB9XG5cbiAgcmVuZGVyZXI6IFJlbmRlcmVyMjtcbiAgaW50ZXJhY3Rpb25Ib3N0OiBIVE1MRWxlbWVudDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZWxlY3Rpb25TZXJ2aWNlOiBTZWxlY3RvclNlcnZpY2UpIHsgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgYW4gZWxlbWVudCBmcm9tIHRoZSBpbnRlcmFjdGlvbiBob3N0XG4gICAqIEBwYXJhbSBlbGVtZW50IC0gdGhlIGVsZW1lbnQgdG8gcmVtb3ZlXG4gICAqIEBwYXJhbSByZW5kZXJlciAtIHRoZSByZW5kZXJlciB1c2VkIHRvIHJlbW92ZSB0aGUgZWxlbWVudFxuICAgKi9cbiAgZGVsZXRlRWxlbWVudChlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQoZWxlbWVudC5wYXJlbnRFbGVtZW50LCBlbGVtZW50KTtcbiAgICAgdGhpcy5fZGVsZXRlRWxlbWVudFN1YmplY3QubmV4dChlbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgYSBsaXN0IG9mIGVsZW1lbnRzIGZyb20gdGhlIGludGVyYWN0aW9uIGhvc3RcbiAgICogQHBhcmFtIGVsZW1lbnQgLSB0aGUgZWxlbWVudHMgdG8gcmVtb3ZlXG4gICAqIEBwYXJhbSByZW5kZXJlciAtIHRoZSByZW5kZXJlciB1c2VkIHRvIHJlbW92ZSB0aGUgZWxlbWVudHNcbiAgICovXG4gIGRlbGV0ZUVsZW1lbnRzKGVsZW1lbnRzOiBFbGVtZW50W10pIHtcbiAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZChlbGVtZW50LnBhcmVudEVsZW1lbnQsIGVsZW1lbnQpO1xuICAgIH0pO1xuICAgIHRoaXMuX2RlbGV0ZUVsZW1lbnRzU3ViamVjdC5uZXh0KGVsZW1lbnRzKTtcbiAgfVxuXG4gIGRlbGV0ZVNlbGVjdGVkRWxlbWVudHMoKSB7XG4gICAgdGhpcy5fZGVsZXRlU2VsZWN0ZWRFbGVtZW50c1N1YmplY3QubmV4dCgpO1xuICB9XG5cbiAgZGVsZXRlQWxsKCkge1xuICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UudW5TZWxlY3RBbGwoKTtcbiAgICBjb25zdCBjaGlsZHJlbiA9IGRvbS5jaGlsZHJlbk9mKHRoaXMuaW50ZXJhY3Rpb25Ib3N0KTtcbiAgICBmb3IgKGxldCBpbmRleCA9IGNoaWxkcmVuLmxlbmd0aCAtIDE7IGluZGV4ID49IDA7IGluZGV4LS0pIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBjaGlsZHJlbltpbmRleF07XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMuaW50ZXJhY3Rpb25Ib3N0LCBlbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBhZGRFbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnQgPSBudWxsKSB7XG4gICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgZWxlbWVudCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhlbGVtZW50LCAnaHBjLW5ldy1lbGVtZW50Jyk7XG4gICAgfVxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZWxlbWVudCwgJ2JveC1zaXppbmcnLCAnYm9yZGVyLWJveCcpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZWxlbWVudCwgJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJyk7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmludGVyYWN0aW9uSG9zdCwgZWxlbWVudCk7XG4gICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5zZWxlY3RFbGVtZW50KGVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpO1xuICAgIHRoaXMuaW50ZXJhY3Rpb25Ib3N0LmZvY3VzKCk7XG4gICAgdGhpcy5fYWRkRWxlbWVudFN1YmplY3QubmV4dChlbGVtZW50KTtcbiAgfVxuXG4gIGFkZENvbnRhaW5lcihlbGVtZW50OiBFbGVtZW50ID0gbnVsbCkge1xuICAgIGlmICghZWxlbWVudCkge1xuICAgICAgZWxlbWVudCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnQsICdocGMtbmV3LWVsZW1lbnQnKTtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhlbGVtZW50LCAnaHBjLWRyb3B6b25lJyk7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhlbGVtZW50LCAnaHBjLWNvbnRhaW5lcicpO1xuICAgIHRoaXMuYWRkRWxlbWVudChlbGVtZW50KTtcbiAgfVxuXG4gIHNlbGVjdEFsbCgpIHtcbiAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnNlbGVjdEFsbCgpO1xuICAgIHRoaXMuc2VsZWN0ZWRFbGVtZW50cyA9IHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuY2xpZW50cztcbiAgfVxuXG4gIHVuU2VsZWN0QWxsKCkge1xuICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UudW5TZWxlY3RBbGwoKTtcbiAgICB0aGlzLnNlbGVjdGVkRWxlbWVudHMgPSB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmNsaWVudHM7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlcmVyID0gbnVsbDtcbiAgfVxufVxuIl19