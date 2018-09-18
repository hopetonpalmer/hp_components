/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as dom from '../scripts/dom';
var DragService = /** @class */ (function () {
    function DragService() {
        this.dragCursor = 'move';
    }
    /**
     * @param {?} element
     * @return {?}
     */
    DragService.prototype.createDragOverlay = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        /** @type {?} */
        var result = /** @type {?} */ (element.cloneNode(true));
        this.renderer.addClass(result, 'hpc-drag-overlay');
        this.renderer.setStyle(result, 'cursor', this.dragCursor);
        this.renderer.setStyle(result, 'zIndex', 10000);
        return result;
    };
    /**
     * @param {?} delta
     * @param {?} elements
     * @return {?}
     */
    DragService.prototype.dragElementsBy = /**
     * @param {?} delta
     * @param {?} elements
     * @return {?}
     */
    function (delta, elements) {
        var _this = this;
        elements.forEach(function (element) {
            if (element) {
                dom.moveElementBy(_this.renderer, element, delta);
            }
        });
    };
    /**
     * @param {?} element
     * @return {?}
     */
    DragService.prototype.canDrag = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        return dom.elementDraggable(element);
    };
    /**
     * Returns a child HTMLElement located at the top-left coordinates of the
     * draggedElement with an attribute of is-dropzone set to true.
     *
     * @param HTMLElement draggedElement
     * @param HTMLElement parent
     * @returns HTMLElement
     */
    /**
     * Returns a child HTMLElement located at the top-left coordinates of the
     * draggedElement with an attribute of is-dropzone set to true.
     *
     * @param {?} draggedElement
     * @param {?} parent
     * @param {?=} exclude
     * @return {?} HTMLElement
     */
    DragService.prototype.findDropZone = /**
     * Returns a child HTMLElement located at the top-left coordinates of the
     * draggedElement with an attribute of is-dropzone set to true.
     *
     * @param {?} draggedElement
     * @param {?} parent
     * @param {?=} exclude
     * @return {?} HTMLElement
     */
    function (draggedElement, parent, exclude) {
        if (exclude === void 0) { exclude = []; }
        if (!draggedElement) {
            return null;
        }
        exclude.push(draggedElement);
        /** @type {?} */
        var pos = dom.offset(draggedElement);
        /** @type {?} */
        var el = dom.elementAtPoint(pos, parent, exclude);
        if (el !== parent && el.classList.contains('hpc-dropzone')) {
            return el;
        }
        return null;
    };
    /**
     * @param {?} draggedElement
     * @param {?} parent
     * @param {?=} exclude
     * @return {?}
     */
    DragService.prototype.updateDropZone = /**
     * @param {?} draggedElement
     * @param {?} parent
     * @param {?=} exclude
     * @return {?}
     */
    function (draggedElement, parent, exclude) {
        if (exclude === void 0) { exclude = []; }
        this.clearDropZones(parent);
        /** @type {?} */
        var dropZone = this.findDropZone(draggedElement, parent, exclude);
        if (dropZone) {
            this.renderer.addClass(dropZone, 'active');
        }
        return dropZone;
    };
    /**
     * @param {?} parent
     * @return {?}
     */
    DragService.prototype.clearDropZones = /**
     * @param {?} parent
     * @return {?}
     */
    function (parent) {
        var _this = this;
        /** @type {?} */
        var children = dom.childrenOf(parent, true);
        children.forEach(function (child) {
            _this.renderer.removeClass(child, 'active');
        });
    };
    /**
     * @param {?} dropZone
     * @param {?} draggedElement
     * @param {?} parent
     * @return {?}
     */
    DragService.prototype.dropElement = /**
     * @param {?} dropZone
     * @param {?} draggedElement
     * @param {?} parent
     * @return {?}
     */
    function (dropZone, draggedElement, parent) {
        try {
            dom.changeParent(draggedElement, dropZone, this.renderer);
        }
        catch (error) {
            console.log(error);
            // -- todo log error;
        }
    };
    /**
     * @return {?}
     */
    DragService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.renderer = null;
    };
    DragService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DragService.ctorParameters = function () { return []; };
    return DragService;
}());
export { DragService };
if (false) {
    /** @type {?} */
    DragService.prototype.dragCursor;
    /** @type {?} */
    DragService.prototype.renderer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaHAtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9kcmFnLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQXdCLE1BQU0sZUFBZSxDQUFDO0FBRWpFLE9BQU8sS0FBSyxHQUFHLE1BQU0sZ0JBQWdCLENBQUM7O0lBT3BDOzBCQUhhLE1BQU07S0FHSDs7Ozs7SUFFaEIsdUNBQWlCOzs7O0lBQWpCLFVBQWtCLE9BQW9COztRQUNwQyxJQUFNLE1BQU0scUJBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQWdCLEVBQUM7UUFDdEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNoRCxPQUFPLE1BQU0sQ0FBQztLQUNmOzs7Ozs7SUFFRCxvQ0FBYzs7Ozs7SUFBZCxVQUFlLEtBQVksRUFBRSxRQUF1QjtRQUFwRCxpQkFNQztRQUxDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO1lBQ3RCLElBQUksT0FBTyxFQUFFO2dCQUNYLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDbEQ7U0FDRixDQUFDLENBQUM7S0FDSjs7Ozs7SUFFRCw2QkFBTzs7OztJQUFQLFVBQVEsT0FBZ0I7UUFDdEIsT0FBTyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDdEM7SUFFRDs7Ozs7OztPQU9HOzs7Ozs7Ozs7O0lBQ0gsa0NBQVk7Ozs7Ozs7OztJQUFaLFVBQWEsY0FBMkIsRUFBRSxNQUFtQixFQUFFLE9BQVk7UUFBWix3QkFBQSxFQUFBLFlBQVk7UUFDekUsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNuQixPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQzs7UUFDN0IsSUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQzs7UUFDdkMsSUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3BELElBQUksRUFBRSxLQUFLLE1BQU0sSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUMxRCxPQUFPLEVBQUUsQ0FBQztTQUNYO1FBQ0QsT0FBTyxJQUFJLENBQUM7S0FDYjs7Ozs7OztJQUVELG9DQUFjOzs7Ozs7SUFBZCxVQUFlLGNBQTJCLEVBQUUsTUFBbUIsRUFBRSxPQUFZO1FBQVosd0JBQUEsRUFBQSxZQUFZO1FBQzNFLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7O1FBQzVCLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNwRSxJQUFJLFFBQVEsRUFBRTtZQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUM1QztRQUNELE9BQU8sUUFBUSxDQUFDO0tBQ2pCOzs7OztJQUVELG9DQUFjOzs7O0lBQWQsVUFBZSxNQUFtQjtRQUFsQyxpQkFLQzs7UUFKQyxJQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM5QyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSztZQUNwQixLQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDNUMsQ0FBQyxDQUFDO0tBQ0o7Ozs7Ozs7SUFFRCxpQ0FBVzs7Ozs7O0lBQVgsVUFBWSxRQUFxQixFQUFFLGNBQTJCLEVBQUcsTUFBbUI7UUFDaEYsSUFBSTtZQUNGLEdBQUcsQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDM0Q7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7O1NBRXBCO0tBQ0o7Ozs7SUFHRCxpQ0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztLQUN0Qjs7Z0JBNUVGLFVBQVU7Ozs7c0JBSlg7O1NBS2EsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIFJlbmRlcmVyMiwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJy4uL3NjcmlwdHMvbWF0aCc7XG5pbXBvcnQgKiBhcyBkb20gZnJvbSAnLi4vc2NyaXB0cy9kb20nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRHJhZ1NlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kgIHtcbiAgZHJhZ0N1cnNvciA9ICdtb3ZlJztcbiAgcmVuZGVyZXI6IFJlbmRlcmVyMjtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgY3JlYXRlRHJhZ092ZXJsYXkoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudCB7XG4gICAgY29uc3QgcmVzdWx0ID0gZWxlbWVudC5jbG9uZU5vZGUodHJ1ZSkgYXMgSFRNTEVsZW1lbnQ7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhyZXN1bHQsICdocGMtZHJhZy1vdmVybGF5Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShyZXN1bHQsICdjdXJzb3InLCB0aGlzLmRyYWdDdXJzb3IpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUocmVzdWx0LCAnekluZGV4JywgMTAwMDApO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBkcmFnRWxlbWVudHNCeShkZWx0YTogUG9pbnQsIGVsZW1lbnRzOiBIVE1MRWxlbWVudFtdKSB7XG4gICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgIGRvbS5tb3ZlRWxlbWVudEJ5KHRoaXMucmVuZGVyZXIsIGVsZW1lbnQsIGRlbHRhKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNhbkRyYWcoZWxlbWVudDogRWxlbWVudCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBkb20uZWxlbWVudERyYWdnYWJsZShlbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgY2hpbGQgSFRNTEVsZW1lbnQgbG9jYXRlZCBhdCB0aGUgdG9wLWxlZnQgY29vcmRpbmF0ZXMgb2YgdGhlXG4gICAqIGRyYWdnZWRFbGVtZW50IHdpdGggYW4gYXR0cmlidXRlIG9mIGlzLWRyb3B6b25lIHNldCB0byB0cnVlLlxuICAgKlxuICAgKiBAcGFyYW0gSFRNTEVsZW1lbnQgZHJhZ2dlZEVsZW1lbnRcbiAgICogQHBhcmFtIEhUTUxFbGVtZW50IHBhcmVudFxuICAgKiBAcmV0dXJucyBIVE1MRWxlbWVudFxuICAgKi9cbiAgZmluZERyb3Bab25lKGRyYWdnZWRFbGVtZW50OiBIVE1MRWxlbWVudCwgcGFyZW50OiBIVE1MRWxlbWVudCwgZXhjbHVkZSA9IFtdKTogSFRNTEVsZW1lbnQge1xuICAgIGlmICghZHJhZ2dlZEVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBleGNsdWRlLnB1c2goZHJhZ2dlZEVsZW1lbnQpO1xuICAgIGNvbnN0IHBvcyA9IGRvbS5vZmZzZXQoZHJhZ2dlZEVsZW1lbnQpO1xuICAgIGNvbnN0IGVsID0gZG9tLmVsZW1lbnRBdFBvaW50KHBvcywgcGFyZW50LCBleGNsdWRlKTtcbiAgICBpZiAoZWwgIT09IHBhcmVudCAmJiBlbC5jbGFzc0xpc3QuY29udGFpbnMoJ2hwYy1kcm9wem9uZScpKSB7XG4gICAgICByZXR1cm4gZWw7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdXBkYXRlRHJvcFpvbmUoZHJhZ2dlZEVsZW1lbnQ6IEhUTUxFbGVtZW50LCBwYXJlbnQ6IEhUTUxFbGVtZW50LCBleGNsdWRlID0gW10pOiBIVE1MRWxlbWVudCB7XG4gICAgdGhpcy5jbGVhckRyb3Bab25lcyhwYXJlbnQpO1xuICAgIGNvbnN0IGRyb3Bab25lID0gdGhpcy5maW5kRHJvcFpvbmUoZHJhZ2dlZEVsZW1lbnQsIHBhcmVudCwgZXhjbHVkZSk7XG4gICAgaWYgKGRyb3Bab25lKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGRyb3Bab25lLCAnYWN0aXZlJyk7XG4gICAgfVxuICAgIHJldHVybiBkcm9wWm9uZTtcbiAgfVxuXG4gIGNsZWFyRHJvcFpvbmVzKHBhcmVudDogSFRNTEVsZW1lbnQpIHtcbiAgICBjb25zdCBjaGlsZHJlbiA9IGRvbS5jaGlsZHJlbk9mKHBhcmVudCwgdHJ1ZSk7XG4gICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKGNoaWxkLCAnYWN0aXZlJyk7XG4gICAgfSk7XG4gIH1cblxuICBkcm9wRWxlbWVudChkcm9wWm9uZTogSFRNTEVsZW1lbnQsIGRyYWdnZWRFbGVtZW50OiBIVE1MRWxlbWVudCwgIHBhcmVudDogSFRNTEVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRvbS5jaGFuZ2VQYXJlbnQoZHJhZ2dlZEVsZW1lbnQsIGRyb3Bab25lLCB0aGlzLnJlbmRlcmVyKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgLy8gLS0gdG9kbyBsb2cgZXJyb3I7XG4gICAgICB9XG4gIH1cblxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIgPSBudWxsO1xuICB9XG59XG4iXX0=