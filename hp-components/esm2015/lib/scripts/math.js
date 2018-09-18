/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
export class Rect {
    /**
     * @param {?=} left
     * @param {?=} top
     * @param {?=} width
     * @param {?=} height
     */
    constructor(left = 0, top = 0, width = 0, height = 0) {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    }
    /**
     * @return {?}
     */
    get right() {
        return this.left + this.width;
    }
    /**
     * @return {?}
     */
    get bottom() {
        return this.top + this.height;
    }
    /**
     * @return {?}
     */
    get isEmpty() {
        return (this.height + this.width) === 0;
    }
    /**
     * @return {?}
     */
    get topLeft() {
        return new Point(this.left, this.top);
    }
    /**
     * @return {?}
     */
    get topRight() {
        return new Point(this.right, this.top);
    }
    /**
     * @return {?}
     */
    get bottomLeft() {
        return new Point(this.left, this.bottom);
    }
    /**
     * @return {?}
     */
    get bottomRight() {
        return new Point(this.right, this.bottom);
    }
}
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
export class Size {
    /**
     * @param {?=} height
     * @param {?=} width
     */
    constructor(height = 0, width = 0) {
        this.height = height;
        this.width = width;
    }
}
if (false) {
    /** @type {?} */
    Size.prototype.height;
    /** @type {?} */
    Size.prototype.width;
}
export class Point {
    /**
     * @param {?=} x
     * @param {?=} y
     */
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    /**
     * @param {?} point
     * @return {?}
     */
    add(point) {
        this.x = this.x + point.x;
        this.y = this.y + point.y;
    }
    /**
     * @param {?} point
     * @return {?}
     */
    subtract(point) {
        this.x = this.x - point.x;
        this.y = this.y - point.y;
    }
}
if (false) {
    /** @type {?} */
    Point.prototype.x;
    /** @type {?} */
    Point.prototype.y;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0aC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2hwLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJsaWIvc2NyaXB0cy9tYXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNOzs7Ozs7O0lBQ0osWUFBbUIsT0FBZSxDQUFDLEVBQVMsTUFBYyxDQUFDLEVBQVMsUUFBZ0IsQ0FBQyxFQUFTLFNBQWlCLENBQUM7UUFBN0YsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUFTLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBWTtLQUFLOzs7O0lBQ3JILElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQy9COzs7O0lBQ0QsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7S0FDL0I7Ozs7SUFDRCxJQUFJLE9BQU87UUFDVCxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3pDOzs7O0lBQ0QsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUN2Qzs7OztJQUNELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDeEM7Ozs7SUFDRCxJQUFJLFVBQVU7UUFDWixPQUFPLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzFDOzs7O0lBQ0QsSUFBSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUMzQztDQUVGOzs7Ozs7Ozs7OztBQUNELE1BQU07Ozs7O0lBQ0osWUFBbUIsU0FBaUIsQ0FBQyxFQUFTLFFBQWdCLENBQUM7UUFBNUMsV0FBTSxHQUFOLE1BQU0sQ0FBWTtRQUFTLFVBQUssR0FBTCxLQUFLLENBQVk7S0FBSztDQUNyRTs7Ozs7OztBQUVELE1BQU07Ozs7O0lBQ0osWUFBbUIsSUFBWSxDQUFDLEVBQVMsSUFBWSxDQUFDO1FBQW5DLE1BQUMsR0FBRCxDQUFDLENBQVk7UUFBUyxNQUFDLEdBQUQsQ0FBQyxDQUFZO0tBQUs7Ozs7O0lBQzNELEdBQUcsQ0FBQyxLQUFZO1FBQ2QsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7S0FDM0I7Ozs7O0lBQ0QsUUFBUSxDQUFDLEtBQVk7UUFDbkIsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7S0FDM0I7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBSZWN0IHtcbiAgY29uc3RydWN0b3IocHVibGljIGxlZnQ6IG51bWJlciA9IDAsIHB1YmxpYyB0b3A6IG51bWJlciA9IDAsIHB1YmxpYyB3aWR0aDogbnVtYmVyID0gMCwgcHVibGljIGhlaWdodDogbnVtYmVyID0gMCkgeyB9XG4gIGdldCByaWdodCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmxlZnQgKyB0aGlzLndpZHRoO1xuICB9XG4gIGdldCBib3R0b20oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy50b3AgKyB0aGlzLmhlaWdodDtcbiAgfVxuICBnZXQgaXNFbXB0eSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKHRoaXMuaGVpZ2h0ICsgdGhpcy53aWR0aCkgPT09IDA7XG4gIH1cbiAgZ2V0IHRvcExlZnQoKTogUG9pbnQge1xuICAgIHJldHVybiBuZXcgUG9pbnQodGhpcy5sZWZ0LCB0aGlzLnRvcCk7XG4gIH1cbiAgZ2V0IHRvcFJpZ2h0KCk6IFBvaW50IHtcbiAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMucmlnaHQsIHRoaXMudG9wKTtcbiAgfVxuICBnZXQgYm90dG9tTGVmdCgpOiBQb2ludCB7XG4gICAgcmV0dXJuIG5ldyBQb2ludCh0aGlzLmxlZnQsIHRoaXMuYm90dG9tKTtcbiAgfVxuICBnZXQgYm90dG9tUmlnaHQoKTogUG9pbnQge1xuICAgIHJldHVybiBuZXcgUG9pbnQodGhpcy5yaWdodCwgdGhpcy5ib3R0b20pO1xuICB9XG5cbn1cbmV4cG9ydCBjbGFzcyBTaXplIHtcbiAgY29uc3RydWN0b3IocHVibGljIGhlaWdodDogbnVtYmVyID0gMCwgcHVibGljIHdpZHRoOiBudW1iZXIgPSAwKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIFBvaW50IHtcbiAgY29uc3RydWN0b3IocHVibGljIHg6IG51bWJlciA9IDAsIHB1YmxpYyB5OiBudW1iZXIgPSAwKSB7IH1cbiAgYWRkKHBvaW50OiBQb2ludCkge1xuICAgIHRoaXMueCA9IHRoaXMueCArIHBvaW50Lng7XG4gICAgdGhpcy55ID0gdGhpcy55ICsgcG9pbnQueTtcbiAgfVxuICBzdWJ0cmFjdChwb2ludDogUG9pbnQpIHtcbiAgICB0aGlzLnggPSB0aGlzLnggLSBwb2ludC54O1xuICAgIHRoaXMueSA9IHRoaXMueSAtIHBvaW50Lnk7XG4gIH1cbn1cbiJdfQ==