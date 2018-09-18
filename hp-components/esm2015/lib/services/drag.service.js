/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as dom from '../scripts/dom';
export class DragService {
    constructor() {
        this.dragCursor = 'move';
    }
    /**
     * @param {?} element
     * @return {?}
     */
    createDragOverlay(element) {
        /** @type {?} */
        const result = /** @type {?} */ (element.cloneNode(true));
        this.renderer.addClass(result, 'hpc-drag-overlay');
        this.renderer.setStyle(result, 'cursor', this.dragCursor);
        this.renderer.setStyle(result, 'zIndex', 10000);
        return result;
    }
    /**
     * @param {?} delta
     * @param {?} elements
     * @return {?}
     */
    dragElementsBy(delta, elements) {
        elements.forEach(element => {
            if (element) {
                dom.moveElementBy(this.renderer, element, delta);
            }
        });
    }
    /**
     * @param {?} element
     * @return {?}
     */
    canDrag(element) {
        return dom.elementDraggable(element);
    }
    /**
     * Returns a child HTMLElement located at the top-left coordinates of the
     * draggedElement with an attribute of is-dropzone set to true.
     *
     * @param {?} draggedElement
     * @param {?} parent
     * @param {?=} exclude
     * @return {?} HTMLElement
     */
    findDropZone(draggedElement, parent, exclude = []) {
        if (!draggedElement) {
            return null;
        }
        exclude.push(draggedElement);
        /** @type {?} */
        const pos = dom.offset(draggedElement);
        /** @type {?} */
        const el = dom.elementAtPoint(pos, parent, exclude);
        if (el !== parent && el.classList.contains('hpc-dropzone')) {
            return el;
        }
        return null;
    }
    /**
     * @param {?} draggedElement
     * @param {?} parent
     * @param {?=} exclude
     * @return {?}
     */
    updateDropZone(draggedElement, parent, exclude = []) {
        this.clearDropZones(parent);
        /** @type {?} */
        const dropZone = this.findDropZone(draggedElement, parent, exclude);
        if (dropZone) {
            this.renderer.addClass(dropZone, 'active');
        }
        return dropZone;
    }
    /**
     * @param {?} parent
     * @return {?}
     */
    clearDropZones(parent) {
        /** @type {?} */
        const children = dom.childrenOf(parent, true);
        children.forEach(child => {
            this.renderer.removeClass(child, 'active');
        });
    }
    /**
     * @param {?} dropZone
     * @param {?} draggedElement
     * @param {?} parent
     * @return {?}
     */
    dropElement(dropZone, draggedElement, parent) {
        try {
            dom.changeParent(draggedElement, dropZone, this.renderer);
        }
        catch (error) {
            console.log(error);
            // -- todo log error;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.renderer = null;
    }
}
DragService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DragService.ctorParameters = () => [];
if (false) {
    /** @type {?} */
    DragService.prototype.dragCursor;
    /** @type {?} */
    DragService.prototype.renderer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaHAtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9kcmFnLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQXdCLE1BQU0sZUFBZSxDQUFDO0FBRWpFLE9BQU8sS0FBSyxHQUFHLE1BQU0sZ0JBQWdCLENBQUM7QUFHdEMsTUFBTTtJQUlKOzBCQUhhLE1BQU07S0FHSDs7Ozs7SUFFaEIsaUJBQWlCLENBQUMsT0FBb0I7O1FBQ3BDLE1BQU0sTUFBTSxxQkFBRyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBZ0IsRUFBQztRQUN0RCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2hELE9BQU8sTUFBTSxDQUFDO0tBQ2Y7Ozs7OztJQUVELGNBQWMsQ0FBQyxLQUFZLEVBQUUsUUFBdUI7UUFDbEQsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN6QixJQUFJLE9BQU8sRUFBRTtnQkFDWCxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ2xEO1NBQ0YsQ0FBQyxDQUFDO0tBQ0o7Ozs7O0lBRUQsT0FBTyxDQUFDLE9BQWdCO1FBQ3RCLE9BQU8sR0FBRyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3RDOzs7Ozs7Ozs7O0lBVUQsWUFBWSxDQUFDLGNBQTJCLEVBQUUsTUFBbUIsRUFBRSxPQUFPLEdBQUcsRUFBRTtRQUN6RSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ25CLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDOztRQUM3QixNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDOztRQUN2QyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEQsSUFBSSxFQUFFLEtBQUssTUFBTSxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQzFELE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFDRCxPQUFPLElBQUksQ0FBQztLQUNiOzs7Ozs7O0lBRUQsY0FBYyxDQUFDLGNBQTJCLEVBQUUsTUFBbUIsRUFBRSxPQUFPLEdBQUcsRUFBRTtRQUMzRSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztRQUM1QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEUsSUFBSSxRQUFRLEVBQUU7WUFDWixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDNUM7UUFDRCxPQUFPLFFBQVEsQ0FBQztLQUNqQjs7Ozs7SUFFRCxjQUFjLENBQUMsTUFBbUI7O1FBQ2hDLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQzVDLENBQUMsQ0FBQztLQUNKOzs7Ozs7O0lBRUQsV0FBVyxDQUFDLFFBQXFCLEVBQUUsY0FBMkIsRUFBRyxNQUFtQjtRQUNoRixJQUFJO1lBQ0YsR0FBRyxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMzRDtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7U0FFcEI7S0FDSjs7OztJQUdELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztLQUN0Qjs7O1lBNUVGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBSZW5kZXJlcjIsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICcuLi9zY3JpcHRzL21hdGgnO1xuaW1wb3J0ICogYXMgZG9tIGZyb20gJy4uL3NjcmlwdHMvZG9tJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERyYWdTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95ICB7XG4gIGRyYWdDdXJzb3IgPSAnbW92ZSc7XG4gIHJlbmRlcmVyOiBSZW5kZXJlcjI7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIGNyZWF0ZURyYWdPdmVybGF5KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnQge1xuICAgIGNvbnN0IHJlc3VsdCA9IGVsZW1lbnQuY2xvbmVOb2RlKHRydWUpIGFzIEhUTUxFbGVtZW50O1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MocmVzdWx0LCAnaHBjLWRyYWctb3ZlcmxheScpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUocmVzdWx0LCAnY3Vyc29yJywgdGhpcy5kcmFnQ3Vyc29yKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHJlc3VsdCwgJ3pJbmRleCcsIDEwMDAwKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZHJhZ0VsZW1lbnRzQnkoZGVsdGE6IFBvaW50LCBlbGVtZW50czogSFRNTEVsZW1lbnRbXSkge1xuICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICBkb20ubW92ZUVsZW1lbnRCeSh0aGlzLnJlbmRlcmVyLCBlbGVtZW50LCBkZWx0YSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjYW5EcmFnKGVsZW1lbnQ6IEVsZW1lbnQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZG9tLmVsZW1lbnREcmFnZ2FibGUoZWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGNoaWxkIEhUTUxFbGVtZW50IGxvY2F0ZWQgYXQgdGhlIHRvcC1sZWZ0IGNvb3JkaW5hdGVzIG9mIHRoZVxuICAgKiBkcmFnZ2VkRWxlbWVudCB3aXRoIGFuIGF0dHJpYnV0ZSBvZiBpcy1kcm9wem9uZSBzZXQgdG8gdHJ1ZS5cbiAgICpcbiAgICogQHBhcmFtIEhUTUxFbGVtZW50IGRyYWdnZWRFbGVtZW50XG4gICAqIEBwYXJhbSBIVE1MRWxlbWVudCBwYXJlbnRcbiAgICogQHJldHVybnMgSFRNTEVsZW1lbnRcbiAgICovXG4gIGZpbmREcm9wWm9uZShkcmFnZ2VkRWxlbWVudDogSFRNTEVsZW1lbnQsIHBhcmVudDogSFRNTEVsZW1lbnQsIGV4Y2x1ZGUgPSBbXSk6IEhUTUxFbGVtZW50IHtcbiAgICBpZiAoIWRyYWdnZWRFbGVtZW50KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZXhjbHVkZS5wdXNoKGRyYWdnZWRFbGVtZW50KTtcbiAgICBjb25zdCBwb3MgPSBkb20ub2Zmc2V0KGRyYWdnZWRFbGVtZW50KTtcbiAgICBjb25zdCBlbCA9IGRvbS5lbGVtZW50QXRQb2ludChwb3MsIHBhcmVudCwgZXhjbHVkZSk7XG4gICAgaWYgKGVsICE9PSBwYXJlbnQgJiYgZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdocGMtZHJvcHpvbmUnKSkge1xuICAgICAgcmV0dXJuIGVsO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHVwZGF0ZURyb3Bab25lKGRyYWdnZWRFbGVtZW50OiBIVE1MRWxlbWVudCwgcGFyZW50OiBIVE1MRWxlbWVudCwgZXhjbHVkZSA9IFtdKTogSFRNTEVsZW1lbnQge1xuICAgIHRoaXMuY2xlYXJEcm9wWm9uZXMocGFyZW50KTtcbiAgICBjb25zdCBkcm9wWm9uZSA9IHRoaXMuZmluZERyb3Bab25lKGRyYWdnZWRFbGVtZW50LCBwYXJlbnQsIGV4Y2x1ZGUpO1xuICAgIGlmIChkcm9wWm9uZSkge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhkcm9wWm9uZSwgJ2FjdGl2ZScpO1xuICAgIH1cbiAgICByZXR1cm4gZHJvcFpvbmU7XG4gIH1cblxuICBjbGVhckRyb3Bab25lcyhwYXJlbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBkb20uY2hpbGRyZW5PZihwYXJlbnQsIHRydWUpO1xuICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhjaGlsZCwgJ2FjdGl2ZScpO1xuICAgIH0pO1xuICB9XG5cbiAgZHJvcEVsZW1lbnQoZHJvcFpvbmU6IEhUTUxFbGVtZW50LCBkcmFnZ2VkRWxlbWVudDogSFRNTEVsZW1lbnQsICBwYXJlbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICBkb20uY2hhbmdlUGFyZW50KGRyYWdnZWRFbGVtZW50LCBkcm9wWm9uZSwgdGhpcy5yZW5kZXJlcik7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgIC8vIC0tIHRvZG8gbG9nIGVycm9yO1xuICAgICAgfVxuICB9XG5cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlcmVyID0gbnVsbDtcbiAgfVxufVxuIl19