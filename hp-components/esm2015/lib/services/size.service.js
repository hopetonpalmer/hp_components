/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as dom from '../scripts/dom';
import { Rect } from '../scripts/math';
export class SizeService {
    constructor() {
        this.minHeight = 40;
        this.minWidth = 40;
        this.orientations = ['tb', 'rl'];
    }
    /**
     * @return {?}
     */
    get isHorizontalSizing() {
        return this.gripKey === 'lm' || this.gripKey === 'rm';
    }
    /**
     * @return {?}
     */
    get isVerticalSizing() {
        return this.gripKey === 'tm' || this.gripKey === 'bm';
    }
    /**
     * @return {?}
     */
    get isSizingFromTop() {
        return (this.gripKey === 'tl' || this.gripKey === 'tm' || this.gripKey === 'tr');
    }
    /**
     * @return {?}
     */
    get isSizingFromLeft() {
        return (this.gripKey === 'tl' || this.gripKey === 'lm' || this.gripKey === 'bl');
    }
    /**
     * @return {?}
     */
    get isRotating() {
        return this.gripKey === 'rotate';
    }
    /**
     * @return {?}
     */
    get orientation() {
        return this.gripKey.substr(0, 1);
    }
    /**
     * @return {?}
     */
    get reverseOrientation() {
        /** @type {?} */
        const o = this.orientation;
        return this.orientations.find(x => x.includes(o)).replace(o, '');
    }
    /**
     * @param {?} parent
     * @param {?} renderer
     * @return {?}
     */
    removeSizingGrips(parent, renderer) {
        Array.from(parent.children).forEach(child => {
            if (child.className.indexOf('grip-container') > -1) {
                renderer.removeChild(parent, child);
            }
        });
    }
    /**
     * @param {?} element
     * @return {?}
     */
    createSizingOverlay(element) {
        /** @type {?} */
        const result = /** @type {?} */ (element.cloneNode(false));
        this.renderer.addClass(result, 'hpc-sizer-overlay');
        this.renderer.setStyle(result, 'border-style', 'solid');
        this.renderer.setStyle(result, 'cursor', 'inherit');
        return result;
    }
    /**
     * @param {?} delta
     * @param {?} elements
     * @return {?}
     */
    sizeElementsBy(delta, elements) {
        elements.forEach(element => {
            this.sizeElementBy(delta, element);
        });
    }
    /**
     * @param {?} delta
     * @param {?} element
     * @return {?}
     */
    sizeElementBy(delta, element) {
        /** @type {?} */
        const currentBounds = dom.elementBounds(element);
        /** @type {?} */
        let height = currentBounds.height + delta.y;
        /** @type {?} */
        let width = currentBounds.width + delta.x;
        /** @type {?} */
        let left = currentBounds.left;
        /** @type {?} */
        let top = currentBounds.top;
        if (this.isSizingFromTop) {
            top = currentBounds.top + delta.y;
            height = currentBounds.height - delta.y;
            if (this.gripKey === 'tm') {
                width = currentBounds.width;
            }
        }
        if (this.isSizingFromLeft) {
            left = currentBounds.left + delta.x;
            width = currentBounds.width - delta.x;
            if (this.gripKey === 'lm') {
                height = currentBounds.height;
            }
        }
        if (this.isHorizontalSizing) {
            height = currentBounds.height;
        }
        if (this.isVerticalSizing) {
            width = currentBounds.width;
        }
        /** @type {?} */
        let boundsRect = new Rect(left, top, width, height);
        if (width < this.minWidth || height < this.minHeight) {
            boundsRect = currentBounds;
        }
        dom.setElementRect(this.renderer, boundsRect, element);
    }
    /**
     * @return {?}
     */
    prepareToSize() { }
    /**
     * @param {?} element
     * @return {?}
     */
    canSize(element) {
        return dom.elementSizable(element);
    }
    /**
     * @param {?} parentEl
     * @param {?} renderer
     * @return {?}
     */
    addSizingGrips(parentEl, renderer) {
        /** @type {?} */
        const html = `
      <div class="grip-container">
        <div class="grip-container-l">
          <div gripKey="tl" class="grip grip-tl"></div>
          <div gripKey="lm" class="grip grip-lm"></div>
          <div gripKey="bl" class="grip grip-bl"></div>
        </div>
        <div class="grip-container-m">
          <div gripKey="tm" class="grip grip-tm"></div>
          <div gripKey="bm" class="grip grip-bm"></div>
        </div>
        <div class="grip-container-r">
          <div gripKey="tr" class="grip grip-tr"></div>
          <div gripKey="rm" class="grip grip-rm"></div>
          <div gripKey="br" class="grip grip-br"></div>
        </div>
      </div>
     `;
        // const selector = renderer.createElement('div');
        renderer.setProperty(parentEl, 'innerHTML', html);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.renderer = null;
    }
}
SizeService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
SizeService.ctorParameters = () => [];
if (false) {
    /** @type {?} */
    SizeService.prototype.renderer;
    /** @type {?} */
    SizeService.prototype.minHeight;
    /** @type {?} */
    SizeService.prototype.minWidth;
    /** @type {?} */
    SizeService.prototype.cursor;
    /** @type {?} */
    SizeService.prototype.gripKey;
    /** @type {?} */
    SizeService.prototype.orientations;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l6ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaHAtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9zaXplLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQXdCLE1BQU0sZUFBZSxDQUFDO0FBQ2pFLE9BQU8sS0FBSyxHQUFHLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEMsT0FBTyxFQUFTLElBQUksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRzlDLE1BQU07SUF1Q0o7eUJBTFksRUFBRTt3QkFDSCxFQUFFOzRCQU1FLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztLQUZYOzs7O0lBcENoQixJQUFJLGtCQUFrQjtRQUNwQixPQUFPLElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDO0tBQ3ZEOzs7O0lBRUQsSUFBSSxnQkFBZ0I7UUFDbEIsT0FBTyxJQUFJLENBQUMsT0FBTyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQztLQUN2RDs7OztJQUVELElBQUksZUFBZTtRQUNqQixPQUFPLENBQ0wsSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQ3hFLENBQUM7S0FDSDs7OztJQUNELElBQUksZ0JBQWdCO1FBQ2xCLE9BQU8sQ0FDTCxJQUFJLENBQUMsT0FBTyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLElBQUksQ0FDeEUsQ0FBQztLQUNIOzs7O0lBQ0QsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsT0FBTyxLQUFLLFFBQVEsQ0FBQztLQUNsQzs7OztJQUVELElBQUksV0FBVztRQUNiLE9BQU8s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LE1BQU0sR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDO1NBQy9CO1FBQ0QsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDekIsS0FBSyxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUM7U0FDN0I7O1FBRUQsSUFBSSxVQUFVLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDcEQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNwRCxVQUFVLEdBQUcsYUFBYSxDQUFDO1NBQzVCO1FBQ0QsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztLQUN4RDs7OztJQUVELGFBQWEsTUFBSzs7Ozs7SUFFbEIsT0FBTyxDQUFDLE9BQWdCO1FBQ3RCLE9BQU8sR0FBRyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNwQzs7Ozs7O0lBRUQsY0FBYyxDQUFDLFFBQXFCLEVBQUUsUUFBbUI7O1FBQ3ZELE1BQU0sSUFBSSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7OztNQWlCWCxDQUFDOztRQUVILFFBQVEsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNuRDs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztLQUN0Qjs7O1lBcklGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBSZW5kZXJlcjIsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgZG9tIGZyb20gJy4uL3NjcmlwdHMvZG9tJztcbmltcG9ydCB7IFBvaW50LCBSZWN0IH0gZnJvbSAnLi4vc2NyaXB0cy9tYXRoJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNpemVTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcmVuZGVyZXI6IFJlbmRlcmVyMjtcblxuICBnZXQgaXNIb3Jpem9udGFsU2l6aW5nKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmdyaXBLZXkgPT09ICdsbScgfHwgdGhpcy5ncmlwS2V5ID09PSAncm0nO1xuICB9XG5cbiAgZ2V0IGlzVmVydGljYWxTaXppbmcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZ3JpcEtleSA9PT0gJ3RtJyB8fCB0aGlzLmdyaXBLZXkgPT09ICdibSc7XG4gIH1cblxuICBnZXQgaXNTaXppbmdGcm9tVG9wKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmdyaXBLZXkgPT09ICd0bCcgfHwgdGhpcy5ncmlwS2V5ID09PSAndG0nIHx8IHRoaXMuZ3JpcEtleSA9PT0gJ3RyJ1xuICAgICk7XG4gIH1cbiAgZ2V0IGlzU2l6aW5nRnJvbUxlZnQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuZ3JpcEtleSA9PT0gJ3RsJyB8fCB0aGlzLmdyaXBLZXkgPT09ICdsbScgfHwgdGhpcy5ncmlwS2V5ID09PSAnYmwnXG4gICAgKTtcbiAgfVxuICBnZXQgaXNSb3RhdGluZygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5ncmlwS2V5ID09PSAncm90YXRlJztcbiAgfVxuXG4gIGdldCBvcmllbnRhdGlvbigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmdyaXBLZXkuc3Vic3RyKDAsIDEpO1xuICB9XG5cbiAgZ2V0IHJldmVyc2VPcmllbnRhdGlvbigpOiBzdHJpbmcge1xuICAgIGNvbnN0IG8gPSB0aGlzLm9yaWVudGF0aW9uO1xuICAgIHJldHVybiB0aGlzLm9yaWVudGF0aW9ucy5maW5kKHggPT4geC5pbmNsdWRlcyhvKSkucmVwbGFjZShvLCAnJyk7XG4gIH1cblxuICBtaW5IZWlnaHQgPSA0MDtcbiAgbWluV2lkdGggPSA0MDtcblxuICBjdXJzb3I6IHN0cmluZztcbiAgZ3JpcEtleTogc3RyaW5nO1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgb3JpZW50YXRpb25zID0gWyd0YicsICdybCddO1xuXG4gIHJlbW92ZVNpemluZ0dyaXBzKHBhcmVudDogSFRNTEVsZW1lbnQsIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICBBcnJheS5mcm9tKHBhcmVudC5jaGlsZHJlbikuZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICBpZiAoY2hpbGQuY2xhc3NOYW1lLmluZGV4T2YoJ2dyaXAtY29udGFpbmVyJykgPiAtMSkge1xuICAgICAgICByZW5kZXJlci5yZW1vdmVDaGlsZChwYXJlbnQsIGNoaWxkKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZVNpemluZ092ZXJsYXkoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudCB7XG4gICAgY29uc3QgcmVzdWx0ID0gZWxlbWVudC5jbG9uZU5vZGUoZmFsc2UpIGFzIEhUTUxFbGVtZW50O1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MocmVzdWx0LCAnaHBjLXNpemVyLW92ZXJsYXknKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHJlc3VsdCwgJ2JvcmRlci1zdHlsZScsICdzb2xpZCcpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUocmVzdWx0LCAnY3Vyc29yJywgJ2luaGVyaXQnKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgc2l6ZUVsZW1lbnRzQnkoZGVsdGE6IFBvaW50LCBlbGVtZW50czogSFRNTEVsZW1lbnRbXSkge1xuICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICB0aGlzLnNpemVFbGVtZW50QnkoZGVsdGEsIGVsZW1lbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgc2l6ZUVsZW1lbnRCeShkZWx0YTogUG9pbnQsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgY29uc3QgY3VycmVudEJvdW5kcyA9IGRvbS5lbGVtZW50Qm91bmRzKGVsZW1lbnQpO1xuICAgIGxldCBoZWlnaHQgPSBjdXJyZW50Qm91bmRzLmhlaWdodCArIGRlbHRhLnk7XG4gICAgbGV0IHdpZHRoID0gY3VycmVudEJvdW5kcy53aWR0aCArIGRlbHRhLng7XG4gICAgbGV0IGxlZnQgPSBjdXJyZW50Qm91bmRzLmxlZnQ7XG4gICAgbGV0IHRvcCA9IGN1cnJlbnRCb3VuZHMudG9wO1xuXG4gICAgaWYgKHRoaXMuaXNTaXppbmdGcm9tVG9wKSB7XG4gICAgICB0b3AgPSBjdXJyZW50Qm91bmRzLnRvcCArIGRlbHRhLnk7XG4gICAgICBoZWlnaHQgPSBjdXJyZW50Qm91bmRzLmhlaWdodCAtIGRlbHRhLnk7XG4gICAgICBpZiAodGhpcy5ncmlwS2V5ID09PSAndG0nKSB7XG4gICAgICAgIHdpZHRoID0gY3VycmVudEJvdW5kcy53aWR0aDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuaXNTaXppbmdGcm9tTGVmdCkge1xuICAgICAgbGVmdCA9IGN1cnJlbnRCb3VuZHMubGVmdCArIGRlbHRhLng7XG4gICAgICB3aWR0aCA9IGN1cnJlbnRCb3VuZHMud2lkdGggLSBkZWx0YS54O1xuICAgICAgaWYgKHRoaXMuZ3JpcEtleSA9PT0gJ2xtJykge1xuICAgICAgICBoZWlnaHQgPSBjdXJyZW50Qm91bmRzLmhlaWdodDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0hvcml6b250YWxTaXppbmcpIHtcbiAgICAgIGhlaWdodCA9IGN1cnJlbnRCb3VuZHMuaGVpZ2h0O1xuICAgIH1cbiAgICBpZiAodGhpcy5pc1ZlcnRpY2FsU2l6aW5nKSB7XG4gICAgICB3aWR0aCA9IGN1cnJlbnRCb3VuZHMud2lkdGg7XG4gICAgfVxuXG4gICAgbGV0IGJvdW5kc1JlY3QgPSBuZXcgUmVjdChsZWZ0LCB0b3AsIHdpZHRoLCBoZWlnaHQpO1xuICAgIGlmICh3aWR0aCA8IHRoaXMubWluV2lkdGggfHwgaGVpZ2h0IDwgdGhpcy5taW5IZWlnaHQpIHtcbiAgICAgIGJvdW5kc1JlY3QgPSBjdXJyZW50Qm91bmRzO1xuICAgIH1cbiAgICBkb20uc2V0RWxlbWVudFJlY3QodGhpcy5yZW5kZXJlciwgYm91bmRzUmVjdCwgZWxlbWVudCk7XG4gIH1cblxuICBwcmVwYXJlVG9TaXplKCkge31cblxuICBjYW5TaXplKGVsZW1lbnQ6IEVsZW1lbnQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZG9tLmVsZW1lbnRTaXphYmxlKGVsZW1lbnQpO1xuICB9XG5cbiAgYWRkU2l6aW5nR3JpcHMocGFyZW50RWw6IEhUTUxFbGVtZW50LCByZW5kZXJlcjogUmVuZGVyZXIyKTogdm9pZCB7XG4gICAgY29uc3QgaHRtbCA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJncmlwLWNvbnRhaW5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JpcC1jb250YWluZXItbFwiPlxuICAgICAgICAgIDxkaXYgZ3JpcEtleT1cInRsXCIgY2xhc3M9XCJncmlwIGdyaXAtdGxcIj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGdyaXBLZXk9XCJsbVwiIGNsYXNzPVwiZ3JpcCBncmlwLWxtXCI+PC9kaXY+XG4gICAgICAgICAgPGRpdiBncmlwS2V5PVwiYmxcIiBjbGFzcz1cImdyaXAgZ3JpcC1ibFwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImdyaXAtY29udGFpbmVyLW1cIj5cbiAgICAgICAgICA8ZGl2IGdyaXBLZXk9XCJ0bVwiIGNsYXNzPVwiZ3JpcCBncmlwLXRtXCI+PC9kaXY+XG4gICAgICAgICAgPGRpdiBncmlwS2V5PVwiYm1cIiBjbGFzcz1cImdyaXAgZ3JpcC1ibVwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImdyaXAtY29udGFpbmVyLXJcIj5cbiAgICAgICAgICA8ZGl2IGdyaXBLZXk9XCJ0clwiIGNsYXNzPVwiZ3JpcCBncmlwLXRyXCI+PC9kaXY+XG4gICAgICAgICAgPGRpdiBncmlwS2V5PVwicm1cIiBjbGFzcz1cImdyaXAgZ3JpcC1ybVwiPjwvZGl2PlxuICAgICAgICAgIDxkaXYgZ3JpcEtleT1cImJyXCIgY2xhc3M9XCJncmlwIGdyaXAtYnJcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgYDtcbiAgICAvLyBjb25zdCBzZWxlY3RvciA9IHJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHJlbmRlcmVyLnNldFByb3BlcnR5KHBhcmVudEVsLCAnaW5uZXJIVE1MJywgaHRtbCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlcmVyID0gbnVsbDtcbiAgfVxufVxuIl19