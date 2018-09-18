/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Rect = /** @class */ (function () {
    function Rect(left, top, width, height) {
        if (left === void 0) { left = 0; }
        if (top === void 0) { top = 0; }
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    }
    Object.defineProperty(Rect.prototype, "right", {
        get: /**
         * @return {?}
         */
        function () {
            return this.left + this.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "bottom", {
        get: /**
         * @return {?}
         */
        function () {
            return this.top + this.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "isEmpty", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.height + this.width) === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "topLeft", {
        get: /**
         * @return {?}
         */
        function () {
            return new Point(this.left, this.top);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "topRight", {
        get: /**
         * @return {?}
         */
        function () {
            return new Point(this.right, this.top);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "bottomLeft", {
        get: /**
         * @return {?}
         */
        function () {
            return new Point(this.left, this.bottom);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "bottomRight", {
        get: /**
         * @return {?}
         */
        function () {
            return new Point(this.right, this.bottom);
        },
        enumerable: true,
        configurable: true
    });
    return Rect;
}());
export { Rect };
if (false) {
    /** @type {?} */
    Rect.prototype.left;
    /** @type {?} */
    Rect.prototype.top;
    /** @type {?} */
    Rect.prototype.width;
    /** @type {?} */
    Rect.prototype.height;
}
var Size = /** @class */ (function () {
    function Size(height, width) {
        if (height === void 0) { height = 0; }
        if (width === void 0) { width = 0; }
        this.height = height;
        this.width = width;
    }
    return Size;
}());
export { Size };
if (false) {
    /** @type {?} */
    Size.prototype.height;
    /** @type {?} */
    Size.prototype.width;
}
var Point = /** @class */ (function () {
    function Point(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    /**
     * @param {?} point
     * @return {?}
     */
    Point.prototype.add = /**
     * @param {?} point
     * @return {?}
     */
    function (point) {
        this.x = this.x + point.x;
        this.y = this.y + point.y;
    };
    /**
     * @param {?} point
     * @return {?}
     */
    Point.prototype.subtract = /**
     * @param {?} point
     * @return {?}
     */
    function (point) {
        this.x = this.x - point.x;
        this.y = this.y - point.y;
    };
    return Point;
}());
export { Point };
if (false) {
    /** @type {?} */
    Point.prototype.x;
    /** @type {?} */
    Point.prototype.y;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0aC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2hwLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJsaWIvc2NyaXB0cy9tYXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxJQUFBO0lBQ0UsY0FBbUIsSUFBZ0IsRUFBUyxHQUFlLEVBQVMsS0FBaUIsRUFBUyxNQUFrQjt1Q0FBN0U7cUNBQXdCO3lDQUEwQjsyQ0FBMkI7UUFBN0YsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUFTLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBWTtLQUFLO0lBQ3JILHNCQUFJLHVCQUFLOzs7O1FBQVQ7WUFDRSxPQUFPLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUMvQjs7O09BQUE7SUFDRCxzQkFBSSx3QkFBTTs7OztRQUFWO1lBQ0UsT0FBTyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDL0I7OztPQUFBO0lBQ0Qsc0JBQUkseUJBQU87Ozs7UUFBWDtZQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDekM7OztPQUFBO0lBQ0Qsc0JBQUkseUJBQU87Ozs7UUFBWDtZQUNFLE9BQU8sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdkM7OztPQUFBO0lBQ0Qsc0JBQUksMEJBQVE7Ozs7UUFBWjtZQUNFLE9BQU8sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDeEM7OztPQUFBO0lBQ0Qsc0JBQUksNEJBQVU7Ozs7UUFBZDtZQUNFLE9BQU8sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDMUM7OztPQUFBO0lBQ0Qsc0JBQUksNkJBQVc7Ozs7UUFBZjtZQUNFLE9BQU8sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDM0M7OztPQUFBO2VBdEJIO0lBd0JDLENBQUE7QUF4QkQsZ0JBd0JDOzs7Ozs7Ozs7OztBQUNELElBQUE7SUFDRSxjQUFtQixNQUFrQixFQUFTLEtBQWlCOzJDQUExQjt5Q0FBMEI7UUFBNUMsV0FBTSxHQUFOLE1BQU0sQ0FBWTtRQUFTLFVBQUssR0FBTCxLQUFLLENBQVk7S0FBSztlQTFCdEU7SUEyQkMsQ0FBQTtBQUZELGdCQUVDOzs7Ozs7O0FBRUQsSUFBQTtJQUNFLGVBQW1CLENBQWEsRUFBUyxDQUFhO2lDQUF0QjtpQ0FBc0I7UUFBbkMsTUFBQyxHQUFELENBQUMsQ0FBWTtRQUFTLE1BQUMsR0FBRCxDQUFDLENBQVk7S0FBSzs7Ozs7SUFDM0QsbUJBQUc7Ozs7SUFBSCxVQUFJLEtBQVk7UUFDZCxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUMzQjs7Ozs7SUFDRCx3QkFBUTs7OztJQUFSLFVBQVMsS0FBWTtRQUNuQixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUMzQjtnQkF0Q0g7SUF1Q0MsQ0FBQTtBQVZELGlCQVVDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFJlY3Qge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbGVmdDogbnVtYmVyID0gMCwgcHVibGljIHRvcDogbnVtYmVyID0gMCwgcHVibGljIHdpZHRoOiBudW1iZXIgPSAwLCBwdWJsaWMgaGVpZ2h0OiBudW1iZXIgPSAwKSB7IH1cbiAgZ2V0IHJpZ2h0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMubGVmdCArIHRoaXMud2lkdGg7XG4gIH1cbiAgZ2V0IGJvdHRvbSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnRvcCArIHRoaXMuaGVpZ2h0O1xuICB9XG4gIGdldCBpc0VtcHR5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAodGhpcy5oZWlnaHQgKyB0aGlzLndpZHRoKSA9PT0gMDtcbiAgfVxuICBnZXQgdG9wTGVmdCgpOiBQb2ludCB7XG4gICAgcmV0dXJuIG5ldyBQb2ludCh0aGlzLmxlZnQsIHRoaXMudG9wKTtcbiAgfVxuICBnZXQgdG9wUmlnaHQoKTogUG9pbnQge1xuICAgIHJldHVybiBuZXcgUG9pbnQodGhpcy5yaWdodCwgdGhpcy50b3ApO1xuICB9XG4gIGdldCBib3R0b21MZWZ0KCk6IFBvaW50IHtcbiAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMubGVmdCwgdGhpcy5ib3R0b20pO1xuICB9XG4gIGdldCBib3R0b21SaWdodCgpOiBQb2ludCB7XG4gICAgcmV0dXJuIG5ldyBQb2ludCh0aGlzLnJpZ2h0LCB0aGlzLmJvdHRvbSk7XG4gIH1cblxufVxuZXhwb3J0IGNsYXNzIFNpemUge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgaGVpZ2h0OiBudW1iZXIgPSAwLCBwdWJsaWMgd2lkdGg6IG51bWJlciA9IDApIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgUG9pbnQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgeDogbnVtYmVyID0gMCwgcHVibGljIHk6IG51bWJlciA9IDApIHsgfVxuICBhZGQocG9pbnQ6IFBvaW50KSB7XG4gICAgdGhpcy54ID0gdGhpcy54ICsgcG9pbnQueDtcbiAgICB0aGlzLnkgPSB0aGlzLnkgKyBwb2ludC55O1xuICB9XG4gIHN1YnRyYWN0KHBvaW50OiBQb2ludCkge1xuICAgIHRoaXMueCA9IHRoaXMueCAtIHBvaW50Lng7XG4gICAgdGhpcy55ID0gdGhpcy55IC0gcG9pbnQueTtcbiAgfVxufVxuIl19