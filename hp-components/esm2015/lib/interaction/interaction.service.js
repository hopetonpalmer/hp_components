/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { SelectorService } from '../selector/selector.service';
import * as dom from '../scripts/dom';
export class InteractionService {
    /**
     * @param {?} _selectionService
     */
    constructor(_selectionService) {
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
    /**
     * @return {?}
     */
    get selectedElements() {
        return this._selectedElements;
    }
    /**
     * @param {?} elements
     * @return {?}
     */
    set selectedElements(elements) {
        this._selectedElements = elements;
        this._selectedElementsSubject.next(elements);
    }
    /**
     * @return {?}
     */
    get hasSelectedElements() {
        return this._selectedElements && this._selectedElements.length > 0;
    }
    /**
     * @return {?}
     */
    get canSelectElements() {
        return this._selectionService.selectableElements.length > 0;
    }
    /**
     * remove an element from the interaction host
     * @param {?} element - the element to remove
     * @return {?}
     */
    deleteElement(element) {
        this.renderer.removeChild(element.parentElement, element);
        this._deleteElementSubject.next(element);
    }
    /**
     * remove a list of elements from the interaction host
     * @param {?} elements
     * @return {?}
     */
    deleteElements(elements) {
        elements.forEach(element => {
            this.renderer.removeChild(element.parentElement, element);
        });
        this._deleteElementsSubject.next(elements);
    }
    /**
     * @return {?}
     */
    deleteSelectedElements() {
        this._deleteSelectedElementsSubject.next();
    }
    /**
     * @return {?}
     */
    deleteAll() {
        this._selectionService.unSelectAll();
        /** @type {?} */
        const children = dom.childrenOf(this.interactionHost);
        for (let index = children.length - 1; index >= 0; index--) {
            /** @type {?} */
            const element = children[index];
            this.renderer.removeChild(this.interactionHost, element);
        }
    }
    /**
     * @param {?=} element
     * @return {?}
     */
    addElement(element = null) {
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
    }
    /**
     * @param {?=} element
     * @return {?}
     */
    addContainer(element = null) {
        if (!element) {
            element = this.renderer.createElement('div');
            this.renderer.addClass(element, 'hpc-new-element');
        }
        this.renderer.addClass(element, 'hpc-dropzone');
        this.renderer.addClass(element, 'hpc-container');
        this.addElement(element);
    }
    /**
     * @return {?}
     */
    selectAll() {
        this._selectionService.selectAll();
        this.selectedElements = this._selectionService.clients;
    }
    /**
     * @return {?}
     */
    unSelectAll() {
        this._selectionService.unSelectAll();
        this.selectedElements = this._selectionService.clients;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.renderer = null;
    }
}
InteractionService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
InteractionService.ctorParameters = () => [
    { type: SelectorService }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJhY3Rpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2hwLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJsaWIvaW50ZXJhY3Rpb24vaW50ZXJhY3Rpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDL0QsT0FBTyxFQUFFLE9BQU8sRUFBYyxlQUFlLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDM0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sS0FBSyxHQUFHLE1BQU0sZ0JBQWdCLENBQUM7QUFHdEMsTUFBTTs7OztJQW1DSixZQUFvQixpQkFBa0M7UUFBbEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFpQjtxQ0FsQ3RCLElBQUksT0FBTyxFQUFXOzhCQUNyQyxJQUFJLENBQUMscUJBQXFCLENBQUMsWUFBWSxFQUFFO3NDQUV6QixJQUFJLE9BQU8sRUFBYTsrQkFDdkMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFlBQVksRUFBRTs4Q0FFbEIsSUFBSSxPQUFPLEVBQUU7dUNBQzVCLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxZQUFZLEVBQUU7a0NBRS9DLElBQUksT0FBTyxFQUFXOzJCQUNyQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFO3dDQUVqQixJQUFJLGVBQWUsQ0FBWSxJQUFJLENBQUM7aUNBQ25ELElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxZQUFZLEVBQUU7aUNBRXpCLEVBQUU7S0FtQmtCOzs7O0lBbEIzRCxJQUFJLGdCQUFnQjtRQUNsQixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztLQUMvQjs7Ozs7SUFDRCxJQUFJLGdCQUFnQixDQUFDLFFBQW1CO1FBQ3RDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUM7UUFDbEMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FB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QyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQzFCOzs7O0lBRUQsU0FBUztRQUNQLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztLQUN4RDs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7S0FDeEQ7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7S0FDdEI7OztZQTVHRixVQUFVOzs7O1lBSEYsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgUmVuZGVyZXIyLCBPbkRlc3Ryb3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCwgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0fSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFNlbGVjdG9yU2VydmljZSB9IGZyb20gJy4uL3NlbGVjdG9yL3NlbGVjdG9yLnNlcnZpY2UnO1xuaW1wb3J0ICogYXMgZG9tIGZyb20gJy4uL3NjcmlwdHMvZG9tJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEludGVyYWN0aW9uU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgX2RlbGV0ZUVsZW1lbnRTdWJqZWN0ID0gbmV3IFN1YmplY3Q8RWxlbWVudD4oKTtcbiAgZGVsZXRlRWxlbWVudCQgPSB0aGlzLl9kZWxldGVFbGVtZW50U3ViamVjdC5hc09ic2VydmFibGUoKTtcblxuICBwcml2YXRlIF9kZWxldGVFbGVtZW50c1N1YmplY3QgPSBuZXcgU3ViamVjdDxFbGVtZW50W10+KCk7XG4gIGRlbGV0ZUVsZW1lbnRzJCA9IHRoaXMuX2RlbGV0ZUVsZW1lbnRTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuXG4gIHByaXZhdGUgX2RlbGV0ZVNlbGVjdGVkRWxlbWVudHNTdWJqZWN0ID0gbmV3IFN1YmplY3QoKTtcbiAgZGVsZXRlU2VsZWN0ZWRFbGVtZW50cyQgPSB0aGlzLl9kZWxldGVTZWxlY3RlZEVsZW1lbnRzU3ViamVjdC5hc09ic2VydmFibGUoKTtcblxuICBwcml2YXRlIF9hZGRFbGVtZW50U3ViamVjdCA9IG5ldyBTdWJqZWN0PEVsZW1lbnQ+KCk7XG4gIGFkZEVsZW1lbnQkID0gdGhpcy5fYWRkRWxlbWVudFN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG5cbiAgcHJpdmF0ZSBfc2VsZWN0ZWRFbGVtZW50c1N1YmplY3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEVsZW1lbnRbXT4obnVsbCk7XG4gIHNlbGVjdGVkRWxlbWVudHMkID0gdGhpcy5fc2VsZWN0ZWRFbGVtZW50c1N1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG5cbiAgcHJpdmF0ZSBfc2VsZWN0ZWRFbGVtZW50czogRWxlbWVudFtdID0gW107XG4gIGdldCBzZWxlY3RlZEVsZW1lbnRzKCk6IEVsZW1lbnRbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkRWxlbWVudHM7XG4gIH1cbiAgc2V0IHNlbGVjdGVkRWxlbWVudHMoZWxlbWVudHM6IEVsZW1lbnRbXSkge1xuICAgIHRoaXMuX3NlbGVjdGVkRWxlbWVudHMgPSBlbGVtZW50cztcbiAgICB0aGlzLl9zZWxlY3RlZEVsZW1lbnRzU3ViamVjdC5uZXh0KGVsZW1lbnRzKTtcbiAgfVxuICBnZXQgaGFzU2VsZWN0ZWRFbGVtZW50cygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRFbGVtZW50cyAmJiB0aGlzLl9zZWxlY3RlZEVsZW1lbnRzLmxlbmd0aCA+IDA7XG4gIH1cblxuICBnZXQgY2FuU2VsZWN0RWxlbWVudHMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc2VsZWN0YWJsZUVsZW1lbnRzLmxlbmd0aCA+IDA7XG4gIH1cblxuICByZW5kZXJlcjogUmVuZGVyZXIyO1xuICBpbnRlcmFjdGlvbkhvc3Q6IEhUTUxFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlbGVjdGlvblNlcnZpY2U6IFNlbGVjdG9yU2VydmljZSkgeyB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSBhbiBlbGVtZW50IGZyb20gdGhlIGludGVyYWN0aW9uIGhvc3RcbiAgICogQHBhcmFtIGVsZW1lbnQgLSB0aGUgZWxlbWVudCB0byByZW1vdmVcbiAgICogQHBhcmFtIHJlbmRlcmVyIC0gdGhlIHJlbmRlcmVyIHVzZWQgdG8gcmVtb3ZlIHRoZSBlbGVtZW50XG4gICAqL1xuICBkZWxldGVFbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZChlbGVtZW50LnBhcmVudEVsZW1lbnQsIGVsZW1lbnQpO1xuICAgICB0aGlzLl9kZWxldGVFbGVtZW50U3ViamVjdC5uZXh0KGVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSBhIGxpc3Qgb2YgZWxlbWVudHMgZnJvbSB0aGUgaW50ZXJhY3Rpb24gaG9zdFxuICAgKiBAcGFyYW0gZWxlbWVudCAtIHRoZSBlbGVtZW50cyB0byByZW1vdmVcbiAgICogQHBhcmFtIHJlbmRlcmVyIC0gdGhlIHJlbmRlcmVyIHVzZWQgdG8gcmVtb3ZlIHRoZSBlbGVtZW50c1xuICAgKi9cbiAgZGVsZXRlRWxlbWVudHMoZWxlbWVudHM6IEVsZW1lbnRbXSkge1xuICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKGVsZW1lbnQucGFyZW50RWxlbWVudCwgZWxlbWVudCk7XG4gICAgfSk7XG4gICAgdGhpcy5fZGVsZXRlRWxlbWVudHNTdWJqZWN0Lm5leHQoZWxlbWVudHMpO1xuICB9XG5cbiAgZGVsZXRlU2VsZWN0ZWRFbGVtZW50cygpIHtcbiAgICB0aGlzLl9kZWxldGVTZWxlY3RlZEVsZW1lbnRzU3ViamVjdC5uZXh0KCk7XG4gIH1cblxuICBkZWxldGVBbGwoKSB7XG4gICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS51blNlbGVjdEFsbCgpO1xuICAgIGNvbnN0IGNoaWxkcmVuID0gZG9tLmNoaWxkcmVuT2YodGhpcy5pbnRlcmFjdGlvbkhvc3QpO1xuICAgIGZvciAobGV0IGluZGV4ID0gY2hpbGRyZW4ubGVuZ3RoIC0gMTsgaW5kZXggPj0gMDsgaW5kZXgtLSkge1xuICAgICAgY29uc3QgZWxlbWVudCA9IGNoaWxkcmVuW2luZGV4XTtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy5pbnRlcmFjdGlvbkhvc3QsIGVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIGFkZEVsZW1lbnQoZWxlbWVudDogRWxlbWVudCA9IG51bGwpIHtcbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICBlbGVtZW50ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnQsICdocGMtbmV3LWVsZW1lbnQnKTtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShlbGVtZW50LCAnYm94LXNpemluZycsICdib3JkZXItYm94Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShlbGVtZW50LCAncG9zaXRpb24nLCAnYWJzb2x1dGUnKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuaW50ZXJhY3Rpb25Ib3N0LCBlbGVtZW50KTtcbiAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnNlbGVjdEVsZW1lbnQoZWxlbWVudCBhcyBIVE1MRWxlbWVudCk7XG4gICAgdGhpcy5pbnRlcmFjdGlvbkhvc3QuZm9jdXMoKTtcbiAgICB0aGlzLl9hZGRFbGVtZW50U3ViamVjdC5uZXh0KGVsZW1lbnQpO1xuICB9XG5cbiAgYWRkQ29udGFpbmVyKGVsZW1lbnQ6IEVsZW1lbnQgPSBudWxsKSB7XG4gICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICBlbGVtZW50ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZWxlbWVudCwgJ2hwYy1uZXctZWxlbWVudCcpO1xuICAgIH1cbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnQsICdocGMtZHJvcHpvbmUnKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnQsICdocGMtY29udGFpbmVyJyk7XG4gICAgdGhpcy5hZGRFbGVtZW50KGVsZW1lbnQpO1xuICB9XG5cbiAgc2VsZWN0QWxsKCkge1xuICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc2VsZWN0QWxsKCk7XG4gICAgdGhpcy5zZWxlY3RlZEVsZW1lbnRzID0gdGhpcy5fc2VsZWN0aW9uU2VydmljZS5jbGllbnRzO1xuICB9XG5cbiAgdW5TZWxlY3RBbGwoKSB7XG4gICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS51blNlbGVjdEFsbCgpO1xuICAgIHRoaXMuc2VsZWN0ZWRFbGVtZW50cyA9IHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuY2xpZW50cztcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIgPSBudWxsO1xuICB9XG59XG4iXX0=