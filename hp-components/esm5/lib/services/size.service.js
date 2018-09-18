/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as dom from '../scripts/dom';
import { Rect } from '../scripts/math';
var SizeService = /** @class */ (function () {
    function SizeService() {
        this.minHeight = 40;
        this.minWidth = 40;
        this.orientations = ['tb', 'rl'];
    }
    Object.defineProperty(SizeService.prototype, "isHorizontalSizing", {
        get: /**
         * @return {?}
         */
        function () {
            return this.gripKey === 'lm' || this.gripKey === 'rm';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SizeService.prototype, "isVerticalSizing", {
        get: /**
         * @return {?}
         */
        function () {
            return this.gripKey === 'tm' || this.gripKey === 'bm';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SizeService.prototype, "isSizingFromTop", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.gripKey === 'tl' || this.gripKey === 'tm' || this.gripKey === 'tr');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SizeService.prototype, "isSizingFromLeft", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.gripKey === 'tl' || this.gripKey === 'lm' || this.gripKey === 'bl');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SizeService.prototype, "isRotating", {
        get: /**
         * @return {?}
         */
        function () {
            return this.gripKey === 'rotate';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SizeService.prototype, "orientation", {
        get: /**
         * @return {?}
         */
        function () {
            return this.gripKey.substr(0, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SizeService.prototype, "reverseOrientation", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var o = this.orientation;
            return this.orientations.find(function (x) { return x.includes(o); }).replace(o, '');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} parent
     * @param {?} renderer
     * @return {?}
     */
    SizeService.prototype.removeSizingGrips = /**
     * @param {?} parent
     * @param {?} renderer
     * @return {?}
     */
    function (parent, renderer) {
        Array.from(parent.children).forEach(function (child) {
            if (child.className.indexOf('grip-container') > -1) {
                renderer.removeChild(parent, child);
            }
        });
    };
    /**
     * @param {?} element
     * @return {?}
     */
    SizeService.prototype.createSizingOverlay = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        /** @type {?} */
        var result = /** @type {?} */ (element.cloneNode(false));
        this.renderer.addClass(result, 'hpc-sizer-overlay');
        this.renderer.setStyle(result, 'border-style', 'solid');
        this.renderer.setStyle(result, 'cursor', 'inherit');
        return result;
    };
    /**
     * @param {?} delta
     * @param {?} elements
     * @return {?}
     */
    SizeService.prototype.sizeElementsBy = /**
     * @param {?} delta
     * @param {?} elements
     * @return {?}
     */
    function (delta, elements) {
        var _this = this;
        elements.forEach(function (element) {
            _this.sizeElementBy(delta, element);
        });
    };
    /**
     * @param {?} delta
     * @param {?} element
     * @return {?}
     */
    SizeService.prototype.sizeElementBy = /**
     * @param {?} delta
     * @param {?} element
     * @return {?}
     */
    function (delta, element) {
        /** @type {?} */
        var currentBounds = dom.elementBounds(element);
        /** @type {?} */
        var height = currentBounds.height + delta.y;
        /** @type {?} */
        var width = currentBounds.width + delta.x;
        /** @type {?} */
        var left = currentBounds.left;
        /** @type {?} */
        var top = currentBounds.top;
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
        var boundsRect = new Rect(left, top, width, height);
        if (width < this.minWidth || height < this.minHeight) {
            boundsRect = currentBounds;
        }
        dom.setElementRect(this.renderer, boundsRect, element);
    };
    /**
     * @return {?}
     */
    SizeService.prototype.prepareToSize = /**
     * @return {?}
     */
    function () { };
    /**
     * @param {?} element
     * @return {?}
     */
    SizeService.prototype.canSize = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        return dom.elementSizable(element);
    };
    /**
     * @param {?} parentEl
     * @param {?} renderer
     * @return {?}
     */
    SizeService.prototype.addSizingGrips = /**
     * @param {?} parentEl
     * @param {?} renderer
     * @return {?}
     */
    function (parentEl, renderer) {
        /** @type {?} */
        var html = "\n      <div class=\"grip-container\">\n        <div class=\"grip-container-l\">\n          <div gripKey=\"tl\" class=\"grip grip-tl\"></div>\n          <div gripKey=\"lm\" class=\"grip grip-lm\"></div>\n          <div gripKey=\"bl\" class=\"grip grip-bl\"></div>\n        </div>\n        <div class=\"grip-container-m\">\n          <div gripKey=\"tm\" class=\"grip grip-tm\"></div>\n          <div gripKey=\"bm\" class=\"grip grip-bm\"></div>\n        </div>\n        <div class=\"grip-container-r\">\n          <div gripKey=\"tr\" class=\"grip grip-tr\"></div>\n          <div gripKey=\"rm\" class=\"grip grip-rm\"></div>\n          <div gripKey=\"br\" class=\"grip grip-br\"></div>\n        </div>\n      </div>\n     ";
        // const selector = renderer.createElement('div');
        renderer.setProperty(parentEl, 'innerHTML', html);
    };
    /**
     * @return {?}
     */
    SizeService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.renderer = null;
    };
    SizeService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    SizeService.ctorParameters = function () { return []; };
    return SizeService;
}());
export { SizeService };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l6ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaHAtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9zaXplLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQXdCLE1BQU0sZUFBZSxDQUFDO0FBQ2pFLE9BQU8sS0FBSyxHQUFHLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEMsT0FBTyxFQUFTLElBQUksRUFBRSxNQUFNLGlCQUFpQixDQUFDOztJQTBDNUM7eUJBTFksRUFBRTt3QkFDSCxFQUFFOzRCQU1FLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztLQUZYO0lBcENoQixzQkFBSSwyQ0FBa0I7Ozs7UUFBdEI7WUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDO1NBQ3ZEOzs7T0FBQTtJQUVELHNCQUFJLHlDQUFnQjs7OztRQUFwQjtZQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUM7U0FDdkQ7OztPQUFBO0lBRUQsc0JBQUksd0NBQWU7Ozs7UUFBbkI7WUFDRSxPQUFPLENBQ0wsSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQ3hFLENBQUM7U0FDSDs7O09BQUE7SUFDRCxzQkFBSSx5Q0FBZ0I7Ozs7UUFBcEI7WUFDRSxPQUFPLENBQ0wsSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQ3hFLENBQUM7U0FDSDs7O09BQUE7SUFDRCxzQkFBSSxtQ0FBVTs7OztRQUFkO1lBQ0UsT0FBTyxJQUFJLENBQUMsT0FB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dGFibGUsIFJlbmRlcmVyMiwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBkb20gZnJvbSAnLi4vc2NyaXB0cy9kb20nO1xuaW1wb3J0IHsgUG9pbnQsIFJlY3QgfSBmcm9tICcuLi9zY3JpcHRzL21hdGgnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2l6ZVNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICByZW5kZXJlcjogUmVuZGVyZXIyO1xuXG4gIGdldCBpc0hvcml6b250YWxTaXppbmcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZ3JpcEtleSA9PT0gJ2xtJyB8fCB0aGlzLmdyaXBLZXkgPT09ICdybSc7XG4gIH1cblxuICBnZXQgaXNWZXJ0aWNhbFNpemluZygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5ncmlwS2V5ID09PSAndG0nIHx8IHRoaXMuZ3JpcEtleSA9PT0gJ2JtJztcbiAgfVxuXG4gIGdldCBpc1NpemluZ0Zyb21Ub3AoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuZ3JpcEtleSA9PT0gJ3RsJyB8fCB0aGlzLmdyaXBLZXkgPT09ICd0bScgfHwgdGhpcy5ncmlwS2V5ID09PSAndHInXG4gICAgKTtcbiAgfVxuICBnZXQgaXNTaXppbmdGcm9tTGVmdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5ncmlwS2V5ID09PSAndGwnIHx8IHRoaXMuZ3JpcEtleSA9PT0gJ2xtJyB8fCB0aGlzLmdyaXBLZXkgPT09ICdibCdcbiAgICApO1xuICB9XG4gIGdldCBpc1JvdGF0aW5nKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmdyaXBLZXkgPT09ICdyb3RhdGUnO1xuICB9XG5cbiAgZ2V0IG9yaWVudGF0aW9uKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZ3JpcEtleS5zdWJzdHIoMCwgMSk7XG4gIH1cblxuICBnZXQgcmV2ZXJzZU9yaWVudGF0aW9uKCk6IHN0cmluZyB7XG4gICAgY29uc3QgbyA9IHRoaXMub3JpZW50YXRpb247XG4gICAgcmV0dXJuIHRoaXMub3JpZW50YXRpb25zLmZpbmQoeCA9PiB4LmluY2x1ZGVzKG8pKS5yZXBsYWNlKG8sICcnKTtcbiAgfVxuXG4gIG1pbkhlaWdodCA9IDQwO1xuICBtaW5XaWR0aCA9IDQwO1xuXG4gIGN1cnNvcjogc3RyaW5nO1xuICBncmlwS2V5OiBzdHJpbmc7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBvcmllbnRhdGlvbnMgPSBbJ3RiJywgJ3JsJ107XG5cbiAgcmVtb3ZlU2l6aW5nR3JpcHMocGFyZW50OiBIVE1MRWxlbWVudCwgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgIEFycmF5LmZyb20ocGFyZW50LmNoaWxkcmVuKS5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgIGlmIChjaGlsZC5jbGFzc05hbWUuaW5kZXhPZignZ3JpcC1jb250YWluZXInKSA+IC0xKSB7XG4gICAgICAgIHJlbmRlcmVyLnJlbW92ZUNoaWxkKHBhcmVudCwgY2hpbGQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgY3JlYXRlU2l6aW5nT3ZlcmxheShlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcbiAgICBjb25zdCByZXN1bHQgPSBlbGVtZW50LmNsb25lTm9kZShmYWxzZSkgYXMgSFRNTEVsZW1lbnQ7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhyZXN1bHQsICdocGMtc2l6ZXItb3ZlcmxheScpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUocmVzdWx0LCAnYm9yZGVyLXN0eWxlJywgJ3NvbGlkJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShyZXN1bHQsICdjdXJzb3InLCAnaW5oZXJpdCcpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBzaXplRWxlbWVudHNCeShkZWx0YTogUG9pbnQsIGVsZW1lbnRzOiBIVE1MRWxlbWVudFtdKSB7XG4gICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgIHRoaXMuc2l6ZUVsZW1lbnRCeShkZWx0YSwgZWxlbWVudCk7XG4gICAgfSk7XG4gIH1cblxuICBzaXplRWxlbWVudEJ5KGRlbHRhOiBQb2ludCwgZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICBjb25zdCBjdXJyZW50Qm91bmRzID0gZG9tLmVsZW1lbnRCb3VuZHMoZWxlbWVudCk7XG4gICAgbGV0IGhlaWdodCA9IGN1cnJlbnRCb3VuZHMuaGVpZ2h0ICsgZGVsdGEueTtcbiAgICBsZXQgd2lkdGggPSBjdXJyZW50Qm91bmRzLndpZHRoICsgZGVsdGEueDtcbiAgICBsZXQgbGVmdCA9IGN1cnJlbnRCb3VuZHMubGVmdDtcbiAgICBsZXQgdG9wID0gY3VycmVudEJvdW5kcy50b3A7XG5cbiAgICBpZiAodGhpcy5pc1NpemluZ0Zyb21Ub3ApIHtcbiAgICAgIHRvcCA9IGN1cnJlbnRCb3VuZHMudG9wICsgZGVsdGEueTtcbiAgICAgIGhlaWdodCA9IGN1cnJlbnRCb3VuZHMuaGVpZ2h0IC0gZGVsdGEueTtcbiAgICAgIGlmICh0aGlzLmdyaXBLZXkgPT09ICd0bScpIHtcbiAgICAgICAgd2lkdGggPSBjdXJyZW50Qm91bmRzLndpZHRoO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5pc1NpemluZ0Zyb21MZWZ0KSB7XG4gICAgICBsZWZ0ID0gY3VycmVudEJvdW5kcy5sZWZ0ICsgZGVsdGEueDtcbiAgICAgIHdpZHRoID0gY3VycmVudEJvdW5kcy53aWR0aCAtIGRlbHRhLng7XG4gICAgICBpZiAodGhpcy5ncmlwS2V5ID09PSAnbG0nKSB7XG4gICAgICAgIGhlaWdodCA9IGN1cnJlbnRCb3VuZHMuaGVpZ2h0O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmlzSG9yaXpvbnRhbFNpemluZykge1xuICAgICAgaGVpZ2h0ID0gY3VycmVudEJvdW5kcy5oZWlnaHQ7XG4gICAgfVxuICAgIGlmICh0aGlzLmlzVmVydGljYWxTaXppbmcpIHtcbiAgICAgIHdpZHRoID0gY3VycmVudEJvdW5kcy53aWR0aDtcbiAgICB9XG5cbiAgICBsZXQgYm91bmRzUmVjdCA9IG5ldyBSZWN0KGxlZnQsIHRvcCwgd2lkdGgsIGhlaWdodCk7XG4gICAgaWYgKHdpZHRoIDwgdGhpcy5taW5XaWR0aCB8fCBoZWlnaHQgPCB0aGlzLm1pbkhlaWdodCkge1xuICAgICAgYm91bmRzUmVjdCA9IGN1cnJlbnRCb3VuZHM7XG4gICAgfVxuICAgIGRvbS5zZXRFbGVtZW50UmVjdCh0aGlzLnJlbmRlcmVyLCBib3VuZHNSZWN0LCBlbGVtZW50KTtcbiAgfVxuXG4gIHByZXBhcmVUb1NpemUoKSB7fVxuXG4gIGNhblNpemUoZWxlbWVudDogRWxlbWVudCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBkb20uZWxlbWVudFNpemFibGUoZWxlbWVudCk7XG4gIH1cblxuICBhZGRTaXppbmdHcmlwcyhwYXJlbnRFbDogSFRNTEVsZW1lbnQsIHJlbmRlcmVyOiBSZW5kZXJlcjIpOiB2b2lkIHtcbiAgICBjb25zdCBodG1sID0gYFxuICAgICAgPGRpdiBjbGFzcz1cImdyaXAtY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJncmlwLWNvbnRhaW5lci1sXCI+XG4gICAgICAgICAgPGRpdiBncmlwS2V5PVwidGxcIiBjbGFzcz1cImdyaXAgZ3JpcC10bFwiPjwvZGl2PlxuICAgICAgICAgIDxkaXYgZ3JpcEtleT1cImxtXCIgY2xhc3M9XCJncmlwIGdyaXAtbG1cIj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGdyaXBLZXk9XCJibFwiIGNsYXNzPVwiZ3JpcCBncmlwLWJsXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JpcC1jb250YWluZXItbVwiPlxuICAgICAgICAgIDxkaXYgZ3JpcEtleT1cInRtXCIgY2xhc3M9XCJncmlwIGdyaXAtdG1cIj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGdyaXBLZXk9XCJibVwiIGNsYXNzPVwiZ3JpcCBncmlwLWJtXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JpcC1jb250YWluZXItclwiPlxuICAgICAgICAgIDxkaXYgZ3JpcEtleT1cInRyXCIgY2xhc3M9XCJncmlwIGdyaXAtdHJcIj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGdyaXBLZXk9XCJybVwiIGNsYXNzPVwiZ3JpcCBncmlwLXJtXCI+PC9kaXY+XG4gICAgICAgICAgPGRpdiBncmlwS2V5PVwiYnJcIiBjbGFzcz1cImdyaXAgZ3JpcC1iclwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICBgO1xuICAgIC8vIGNvbnN0IHNlbGVjdG9yID0gcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcmVuZGVyZXIuc2V0UHJvcGVydHkocGFyZW50RWwsICdpbm5lckhUTUwnLCBodG1sKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIgPSBudWxsO1xuICB9XG59XG4iXX0=