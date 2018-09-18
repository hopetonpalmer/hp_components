(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('hp-components', ['exports', '@angular/core', 'rxjs', '@angular/common'], factory) :
    (factory((global['hp-components'] = {}),global.ng.core,global.rxjs,global.ng.common));
}(this, (function (exports,i0,rxjs,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var HpComponentsService = /** @class */ (function () {
        function HpComponentsService() {
        }
        HpComponentsService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        HpComponentsService.ctorParameters = function () { return []; };
        /** @nocollapse */ HpComponentsService.ngInjectableDef = i0.defineInjectable({ factory: function HpComponentsService_Factory() { return new HpComponentsService(); }, token: HpComponentsService, providedIn: "root" });
        return HpComponentsService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var Rect = /** @class */ (function () {
        function Rect(left, top, width, height) {
            if (left === void 0) {
                left = 0;
            }
            if (top === void 0) {
                top = 0;
            }
            if (width === void 0) {
                width = 0;
            }
            if (height === void 0) {
                height = 0;
            }
            this.left = left;
            this.top = top;
            this.width = width;
            this.height = height;
        }
        Object.defineProperty(Rect.prototype, "right", {
            get: /**
             * @return {?}
             */ function () {
                return this.left + this.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rect.prototype, "bottom", {
            get: /**
             * @return {?}
             */ function () {
                return this.top + this.height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rect.prototype, "isEmpty", {
            get: /**
             * @return {?}
             */ function () {
                return (this.height + this.width) === 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rect.prototype, "topLeft", {
            get: /**
             * @return {?}
             */ function () {
                return new Point(this.left, this.top);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rect.prototype, "topRight", {
            get: /**
             * @return {?}
             */ function () {
                return new Point(this.right, this.top);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rect.prototype, "bottomLeft", {
            get: /**
             * @return {?}
             */ function () {
                return new Point(this.left, this.bottom);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rect.prototype, "bottomRight", {
            get: /**
             * @return {?}
             */ function () {
                return new Point(this.right, this.bottom);
            },
            enumerable: true,
            configurable: true
        });
        return Rect;
    }());
    var Size = /** @class */ (function () {
        function Size(height, width) {
            if (height === void 0) {
                height = 0;
            }
            if (width === void 0) {
                width = 0;
            }
            this.height = height;
            this.width = width;
        }
        return Size;
    }());
    var Point = /** @class */ (function () {
        function Point(x, y) {
            if (x === void 0) {
                x = 0;
            }
            if (y === void 0) {
                y = 0;
            }
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * @param {?} el
     * @return {?}
     */
    function offset(el) {
        /** @type {?} */
        var box = el.getBoundingClientRect();
        /** @type {?} */
        var top = box.top;
        /** @type {?} */
        var left = box.left;
        return new Point(left, top);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    function pixToNum(value) {
        if (!value || value.length === 0) {
            return 0;
        }
        /** @type {?} */
        var newValue = value.replace('px', '').replace('em', '');
        return parseFloat(newValue);
    }
    /**
     * @param {?} element
     * @param {?=} orderByZOrder
     * @return {?}
     */
    function childElements(element, orderByZOrder) {
        if (orderByZOrder === void 0) {
            orderByZOrder = false;
        }
        /** @type {?} */
        var result = new Array();
        if (!element) {
            return result;
        }
        /** @type {?} */
        var children = element.children;
        for (var i = 0; i < children.length; i++) {
            /** @type {?} */
            var child = /** @type {?} */ (children[i]);
            if (child && child.parentElement === element &&
                child.className.indexOf('hpc-lasso-selector') === -1 &&
                child.className.indexOf('hpc-element-selector') === -1 &&
                child.className.indexOf('grip') === -1) {
                result.push(child);
            }
        }
        return result;
    }
    /**
     * @param {?} children
     * @return {?}
     */
    function removeHelperChildren(children) {
        for (var i = children.length - 1; i >= 0; i--) {
            /** @type {?} */
            var child = /** @type {?} */ (children[i]);
            if (child.className.indexOf('hpc-lasso-selector') > -1 ||
                child.className.indexOf('hpc-element-selector') > -1 ||
                child.className.indexOf('hpc-drag-overlay') > -1 ||
                child.className.indexOf('grip-container') > -1 ||
                child.className.indexOf('grip') > -1) {
                removeArrayItem(children, child);
            }
        }
    }
    /**
     * @param {?} array
     * @param {?} item
     * @return {?}
     */
    function removeArrayItem(array, item) {
        /** @type {?} */
        var index = typeof (item) === 'number' ? item : array.indexOf(item);
        if (index > -1) {
            array.splice(index, 1);
        }
    }
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    function intersect(a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    }
    /**
     * @param {?} parent
     * @param {?} rect
     * @param {?=} exclude
     * @return {?}
     */
    function elementsAtRect(parent, rect, exclude) {
        if (exclude === void 0) {
            exclude = [];
        }
        /** @type {?} */
        var result = [];
        childElements(parent).forEach(function (element) {
            if (intersect(elementBounds(element), rect)) {
                if (exclude == null || exclude.indexOf(element) === -1) {
                    result.push(element);
                }
            }
        });
        return result;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    function elementPos(element) {
        /** @type {?} */
        var computedStyles = getComputedStyle(element, null);
        return new Point(pixToNum(computedStyles.left), pixToNum(computedStyles.top));
    }
    /**
     * @param {?} element
     * @return {?}
     */
    function elementSize(element) {
        /** @type {?} */
        var computedStyles = getComputedStyle(element, null);
        return new Size(pixToNum(computedStyles.height), pixToNum(computedStyles.width));
    }
    /**
     * @param {?} element
     * @param {?=} relativeToPage
     * @param {?=} scale
     * @return {?}
     */
    function elementBounds(element, relativeToPage, scale) {
        if (relativeToPage === void 0) {
            relativeToPage = false;
        }
        if (scale === void 0) {
            scale = null;
        }
        /** @type {?} */
        var pos = elementPos(element);
        if (relativeToPage) {
            pos = elementPagePos(element);
        }
        /** @type {?} */
        var size = elementSize(element);
        if (scale) {
            size.width = size.width * scale.x;
            size.height = size.height * scale.y;
        }
        return new Rect(pos.x, pos.y, size.width, size.height);
    }
    /**
     * @param {?} element
     * @return {?}
     */
    function elementPagePos(element) {
        /** @type {?} */
        var result = elementPos(element);
        if (element.parentElement == null) {
            return result;
        }
        /** @type {?} */
        var left = result.x;
        /** @type {?} */
        var top = result.y;
        /** @type {?} */
        var parents = parentTree(element);
        parents.forEach(function (parent) {
            left += pixToNum(parent.style.left) + parent.clientLeft;
            top += pixToNum(parent.style.top) + parent.clientTop;
        });
        return new Point(left, top);
    }
    /**
     * @param {?} element
     * @param {?=} lastClass
     * @param {?=} inclusive
     * @return {?}
     */
    function parentTree(element, lastClass, inclusive) {
        if (lastClass === void 0) {
            lastClass = 'surface';
        }
        if (inclusive === void 0) {
            inclusive = false;
        }
        /** @type {?} */
        var result = new Array();
        if (!element) {
            return result;
        }
        /** @type {?} */
        var parent = element.parentElement;
        while (parent != null) {
            if (!inclusive && parent.classList.contains(lastClass)) {
                break;
            }
            result.push(parent);
            if (parent.classList.contains(lastClass)) {
                break;
            }
            parent = parent.parentElement;
        }
        return result;
    }
    /**
     * @param {?} renderer
     * @param {?} element
     * @param {?} position
     * @return {?}
     */
    function moveElementTo(renderer, element, position) {
        if (!element) {
            return;
        }
        renderer.setStyle(element, 'top', position.y + 'px');
        renderer.setStyle(element, 'left', position.x + 'px');
    }
    /**
     * @param {?} renderer
     * @param {?} element
     * @param {?} delta
     * @return {?}
     */
    function moveElementBy(renderer, element, delta) {
        if (!element) {
            return;
        }
        /** @type {?} */
        var pos = elementPos(element);
        /** @type {?} */
        var top = pos.y + delta.y;
        /** @type {?} */
        var left = pos.x + delta.x;
        renderer.setStyle(element, 'top', top + 'px');
        renderer.setStyle(element, 'left', left + 'px');
    }
    /**
     * @param {?} renderer
     * @param {?} source
     * @param {?} target
     * @return {?}
     */
    function assignBoundingRect(renderer, source, target) {
        /** @type {?} */
        var sourceRect = elementBounds(source);
        /** @type {?} */
        var top = sourceRect.top;
        /** @type {?} */
        var left = sourceRect.left; // + pixToNum(styles.marginLeft);
        renderer.setStyle(target, 'top', top + 'px');
        renderer.setStyle(target, 'left', left + 'px');
        renderer.setStyle(target, 'height', sourceRect.height + 'px');
        renderer.setStyle(target, 'width', sourceRect.width + 'px');
    }
    /**
     * @param {?} renderer
     * @param {?} source
     * @param {?} target
     * @return {?}
     */
    function assignPosition(renderer, source, target) {
        /** @type {?} */
        var sourceRect = elementBounds(source);
        /** @type {?} */
        var pos = elementPos(source);
        renderer.setStyle(target, 'top', pos.y + 'px');
        renderer.setStyle(target, 'left', pos.x + 'px');
    }
    /**
     * @param {?} renderer
     * @param {?} rect
     * @param {?} element
     * @return {?}
     */
    function setElementRect(renderer, rect, element) {
        renderer.setStyle(element, 'top', rect.top + 'px');
        renderer.setStyle(element, 'left', rect.left + 'px');
        renderer.setStyle(element, 'height', rect.height + 'px');
        renderer.setStyle(element, 'width', rect.width + 'px');
    }
    /**
     * @param {?} parent
     * @param {?=} deep
     * @param {?=} exclude
     * @return {?}
     */
    function childrenOf(parent, deep, exclude) {
        if (deep === void 0) {
            deep = false;
        }
        if (exclude === void 0) {
            exclude = [];
        }
        /** @type {?} */
        var result = [];
        if (parent) {
            if (deep) {
                result = Array.from(parent.querySelectorAll('*'));
            }
            else {
                result = Array.from(parent.children);
            }
            removeHelperChildren(result);
            result = result.filter(function (x) { return !(x in exclude); });
        }
        return result;
    }
    /**
     * @param {?} point
     * @param {?} rect
     * @return {?}
     */
    function pointInRect(point, rect) {
        return point.x >= rect.left && point.x <= rect.right && point.y >= rect.top && point.y <= rect.bottom;
    }
    /**
     * Returns the first child element of the parent element at a given point.
     * If there are no child elements at the given point, then the parent element is returned.
     * @param {?} pos
     * @param {?} parent
     * @param {?=} exclude
     * @return {?}
     */
    function elementAtPoint(pos, parent, exclude) {
        if (exclude === void 0) {
            exclude = [];
        }
        /** @type {?} */
        var result = parent;
        /** @type {?} */
        var children = childrenOf(parent, false, exclude);
        for (var index = 0; index < children.length; index++) {
            /** @type {?} */
            var child = children[index];
            /** @type {?} */
            var elRect = child.getBoundingClientRect();
            /** @type {?} */
            var rect = new Rect(elRect.left, elRect.top, elRect.width, elRect.height);
            if (exclude.indexOf(child) === -1 && pointInRect(pos, rect)) {
                result = elementAtPoint(pos, child, exclude);
                break;
            }
        }
        return result;
    }
    /**
     * @param {?} element
     * @param {?} newParent
     * @param {?} renderer
     * @return {?}
     */
    function changeParent(element, newParent, renderer) {
        if (!newParent || element.parentElement === newParent) {
            return;
        }
        /** @type {?} */
        var parentPos = elementPagePos(newParent);
        /** @type {?} */
        var elPos = elementPagePos(element);
        /** @type {?} */
        var newPos = new Point(elPos.x - parentPos.x, elPos.y - parentPos.y);
        renderer.appendChild(newParent, element);
        moveElementTo(renderer, element, newPos);
    }
    /**
     * @param {?} e
     * @param {?} element
     * @param {?=} scale
     * @return {?}
     */
    function getRelativePointerPos(e, element, scale) {
        if (scale === void 0) {
            scale = 1;
        }
        /** @type {?} */
        var relativePos = offset(element);
        return new Point((e.pageX - relativePos.x) / scale, (e.pageY - relativePos.y) / scale);
    }
    /**
     * @param {?} element
     * @return {?}
     */
    function elementDraggable(element) {
        return !elementLocked(element) && element.className.indexOf('hpc-no-drag') === -1;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    function elementSizable(element) {
        return !elementLocked(element) && element.className.indexOf('hpc-no-size') === -1;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    function elementLocked(element) {
        return element.className.indexOf('hpc-locked') > -1;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    function isContainer(element) {
        return element.classList.contains('hpc-container');
    }
    /**
     * @param {?} element
     * @return {?}
     */
    function isSelectable(element) {
        return !element.classList.contains('hpc-no-select');
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
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
                        moveElementBy(_this.renderer, element, delta);
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
                return elementDraggable(element);
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
                if (exclude === void 0) {
                    exclude = [];
                }
                if (!draggedElement) {
                    return null;
                }
                exclude.push(draggedElement);
                /** @type {?} */
                var pos = offset(draggedElement);
                /** @type {?} */
                var el = elementAtPoint(pos, parent, exclude);
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
                if (exclude === void 0) {
                    exclude = [];
                }
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
                var children = childrenOf(parent, true);
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
                    changeParent(draggedElement, dropZone, this.renderer);
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
            { type: i0.Injectable }
        ];
        /** @nocollapse */
        DragService.ctorParameters = function () { return []; };
        return DragService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var SizeService = /** @class */ (function () {
        function SizeService() {
            this.minHeight = 40;
            this.minWidth = 40;
            this.orientations = ['tb', 'rl'];
        }
        Object.defineProperty(SizeService.prototype, "isHorizontalSizing", {
            get: /**
             * @return {?}
             */ function () {
                return this.gripKey === 'lm' || this.gripKey === 'rm';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SizeService.prototype, "isVerticalSizing", {
            get: /**
             * @return {?}
             */ function () {
                return this.gripKey === 'tm' || this.gripKey === 'bm';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SizeService.prototype, "isSizingFromTop", {
            get: /**
             * @return {?}
             */ function () {
                return (this.gripKey === 'tl' || this.gripKey === 'tm' || this.gripKey === 'tr');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SizeService.prototype, "isSizingFromLeft", {
            get: /**
             * @return {?}
             */ function () {
                return (this.gripKey === 'tl' || this.gripKey === 'lm' || this.gripKey === 'bl');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SizeService.prototype, "isRotating", {
            get: /**
             * @return {?}
             */ function () {
                return this.gripKey === 'rotate';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SizeService.prototype, "orientation", {
            get: /**
             * @return {?}
             */ function () {
                return this.gripKey.substr(0, 1);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SizeService.prototype, "reverseOrientation", {
            get: /**
             * @return {?}
             */ function () {
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
                var currentBounds = elementBounds(element);
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
                setElementRect(this.renderer, boundsRect, element);
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
                return elementSizable(element);
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
            { type: i0.Injectable }
        ];
        /** @nocollapse */
        SizeService.ctorParameters = function () { return []; };
        return SizeService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @enum {number} */
    var SelectionState = {
        Draggable: 0,
        Sizable: 1,
        Idle: 2,
    };
    SelectionState[SelectionState.Draggable] = 'Draggable';
    SelectionState[SelectionState.Sizable] = 'Sizable';
    SelectionState[SelectionState.Idle] = 'Idle';
    /** @enum {number} */
    var NudgeType = {
        Overlay: 0,
        Selector: 1,
    };
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
             */ function () {
                return this._activeSelector;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectorService.prototype, "state", {
            get: /**
             * @return {?}
             */ function () {
                return this._state;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
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
             */ function () {
                return this._lassoSelector !== null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectorService.prototype, "hasElementSelectors", {
            get: /**
             * @return {?}
             */ function () {
                return Array.from(this._selectors.entries()).length > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectorService.prototype, "selectors", {
            get: /**
             * @return {?}
             */ function () {
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
             */ function () {
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
             */ function () {
                return this.selectors.map(function (x) { return x.clientEl; });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectorService.prototype, "selectableElements", {
            get: /**
             * @return {?}
             */ function () {
                /** @type {?} */
                var children = childrenOf(this.interactionHost).filter(function (x) { return isSelectable(x); });
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
                    if (pointInRect(point, rect)) {
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
                var rect = elementBounds(this._lassoSelector);
                /** @type {?} */
                var capturedElements = elementsAtRect(this.interactionHost, rect, [
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
                if (clearFirst === void 0) {
                    clearFirst = true;
                }
                if (isSizable === void 0) {
                    isSizable = true;
                }
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
                var rect = elementBounds(element);
                /** @type {?} */
                var selectorEl = this.createSelector(rect.left, rect.top, element.parentElement);
                selectorEl['isSelector'] = true;
                assignBoundingRect(this.renderer, element, selectorEl);
                this.renderer.addClass(selectorEl, 'hpc-element-selector');
                selector = { clientEl: element, selectorEl: selectorEl, overlay: null };
                this._selectors.push(selector);
                this._activeSelector = selector;
                if (isSizable && this._sizeService.canSize(element)) {
                    this._sizeService.addSizingGrips(selectorEl, this.renderer);
                }
                if (elementDraggable(element)) {
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
            { type: i0.Injectable }
        ];
        /** @nocollapse */
        SelectorService.ctorParameters = function () {
            return [
                { type: SizeService },
                { type: DragService },
                { type: i0.ComponentFactoryResolver },
                { type: i0.Injector }
            ];
        };
        return SelectorService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var InteractionService = /** @class */ (function () {
        function InteractionService(_selectionService) {
            this._selectionService = _selectionService;
            this._deleteElementSubject = new rxjs.Subject();
            this.deleteElement$ = this._deleteElementSubject.asObservable();
            this._deleteElementsSubject = new rxjs.Subject();
            this.deleteElements$ = this._deleteElementSubject.asObservable();
            this._deleteSelectedElementsSubject = new rxjs.Subject();
            this.deleteSelectedElements$ = this._deleteSelectedElementsSubject.asObservable();
            this._addElementSubject = new rxjs.Subject();
            this.addElement$ = this._addElementSubject.asObservable();
            this._selectedElementsSubject = new rxjs.BehaviorSubject(null);
            this.selectedElements$ = this._selectedElementsSubject.asObservable();
            this._selectedElements = [];
        }
        Object.defineProperty(InteractionService.prototype, "selectedElements", {
            get: /**
             * @return {?}
             */ function () {
                return this._selectedElements;
            },
            set: /**
             * @param {?} elements
             * @return {?}
             */ function (elements) {
                this._selectedElements = elements;
                this._selectedElementsSubject.next(elements);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InteractionService.prototype, "hasSelectedElements", {
            get: /**
             * @return {?}
             */ function () {
                return this._selectedElements && this._selectedElements.length > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InteractionService.prototype, "canSelectElements", {
            get: /**
             * @return {?}
             */ function () {
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
                var children = childrenOf(this.interactionHost);
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
                if (element === void 0) {
                    element = null;
                }
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
                if (element === void 0) {
                    element = null;
                }
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
            { type: i0.Injectable }
        ];
        /** @nocollapse */
        InteractionService.ctorParameters = function () {
            return [
                { type: SelectorService }
            ];
        };
        return InteractionService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Handles selection, sizing, deletions, and dragging interactions with any child Element.
     */
    var InteractionComponent = /** @class */ (function () {
        function InteractionComponent(_renderer, _dragService, _sizeService, _interactionService, _selectionService) {
            var _this = this;
            this._renderer = _renderer;
            this._dragService = _dragService;
            this._sizeService = _sizeService;
            this._interactionService = _interactionService;
            this._selectionService = _selectionService;
            this._isMouseDown = false;
            this._mouseDownPos = new Point();
            this._keyDownSubject = new rxjs.Subject();
            /**
             * Scale value to apply to the Interaction host element.  The value is applied
             * to both scaleX and scaleY of the host element.
             */
            this.scale = 1;
            /**
             * Determins if elements span when sized or dragged
             */
            this.snap = 0;
            /**
             * Gets or sets the minimum width of the element when drag-sized.
             */
            this.minSizingWidth = 30;
            /**
             * Gets or sets the minimum height of the element when drag-sized.
             */
            this.minSizingHeight = 30;
            /**
             * Determines if elements can be selected by dragging around (lasso) them and releasing the pointer.
             */
            this.isLassoSelectable = true;
            /**
             * Optionally set "checkers" background for the interaction host.  Useful when building IDE-like interactive UI.
             */
            this.isCheckersBackground = false;
            this.resizedElement = new i0.EventEmitter();
            this.resizedElements = new i0.EventEmitter();
            this.movedElement = new i0.EventEmitter();
            this.movedElements = new i0.EventEmitter();
            this.selectElement = new i0.EventEmitter();
            this.canDelete = function () { return true; };
            this.canDrop = function () { return true; };
            this._selectionService.renderer = this._renderer;
            this._sizeService.renderer = this._renderer;
            this._dragService.renderer = this._renderer;
            this._interactionService.renderer = this._renderer;
            this._keyDownSubject.subscribe(function (e) { return _this.keyDownHandler(e); });
        }
        /**
         * Called when the keyboard key is released.
         * @param e KeyboardEvent
         */
        /**
         * Called when the keyboard key is released.
         * @param {?} e KeyboardEvent
         * @return {?}
         */
        InteractionComponent.prototype.keyUp = /**
         * Called when the keyboard key is released.
         * @param {?} e KeyboardEvent
         * @return {?}
         */
            function (e) {
                if (e.code === 'Delete' && this._selectionService.selectors.length > 0) {
                    this.deleteSelectedElements();
                }
            };
        /**
         * Called when the keyboard key is pressed.
         * @param e KeyboardEvent
         */
        /**
         * Called when the keyboard key is pressed.
         * @param {?} e KeyboardEvent
         * @return {?}
         */
        InteractionComponent.prototype.keyPress = /**
         * Called when the keyboard key is pressed.
         * @param {?} e KeyboardEvent
         * @return {?}
         */
            function (e) {
                if (this._selectionService.selectors.length > 0) {
                    e.stopPropagation();
                }
            };
        /**
         * Called when the keyboard key is pressed.
         * @param e KeyboardEvent
         */
        /**
         * Called when the keyboard key is pressed.
         * @param {?} e KeyboardEvent
         * @return {?}
         */
        InteractionComponent.prototype.keyDown = /**
         * Called when the keyboard key is pressed.
         * @param {?} e KeyboardEvent
         * @return {?}
         */
            function (e) {
                this._keyDownSubject.next(e);
            };
        /**
         * @param {?} e
         * @return {?}
         */
        InteractionComponent.prototype.keyDownHandler = /**
         * @param {?} e
         * @return {?}
         */
            function (e) {
                // debounceTime(5000);
                /*    if (
                      e.code !== 'Delete' &&
                      e.code !== 'Escape' &&
                      e.code !== 'ArrowLeft' &&
                      e.code !== 'ArrowUp' &&
                      e.code !== 'ArrowRight' &&
                      e.code !== 'ArrowDown'
                    ) {
                      return;
                    }*/
                if (this._selectionService.selectors.length > 0) {
                    /** @type {?} */
                    var delta = void 0;
                    /** @type {?} */
                    var snap = this.snap ? this.snap : 1;
                    if (e.code === 'Escape') {
                        this.cancelSelection();
                    }
                    if (e.shiftKey) {
                        if (e.ctrlKey) {
                            switch (e.code
                            /*         case 37:
                              self.alignSelectedElements(AlignPosition.Left);
                              break;
                            case 38:
                              self.alignSelectedElements(AlignPosition.Top);
                              break;
                            case 39:
                              self.alignSelectedElements(AlignPosition.Right);
                              break;
                            case 40:
                              self.alignSelectedElements(AlignPosition.Bottom);
                              break; */
                            ) {
                            }
                        }
                        else {
                            delta = new Point();
                            switch (e.code) {
                                case 'ArrowLeft':
                                    delta = new Point(-snap, 0);
                                    break;
                                case 'ArrowUp':
                                    delta = new Point(0, -snap);
                                    break;
                                case 'ArrowRight':
                                    delta = new Point(snap, 0);
                                    break;
                                case 'ArrowDown':
                                    delta = new Point(0, snap);
                                    break;
                            }
                            this._sizeService.gripKey = 'keyboard';
                            this._sizeService.sizeElementsBy(delta, this._selectionService.selectorElements);
                            this._sizeService.sizeElementsBy(delta, this._selectionService.clients);
                        }
                    }
                    else {
                        delta = new Point();
                        switch (e.code) {
                            case 'ArrowLeft':
                                delta = new Point(-snap, 0);
                                break;
                            case 'ArrowUp':
                                delta = new Point(0, -snap);
                                break;
                            case 'ArrowRight':
                                delta = new Point(snap, 0);
                                break;
                            case 'ArrowDown':
                                delta = new Point(0, snap);
                                break;
                        }
                        this._dragService.dragElementsBy(delta, this._selectionService.selectorElements);
                        this._dragService.dragElementsBy(delta, this._selectionService.clients);
                    }
                }
            };
        /**
         * Ensures that the default HTML5 dragging operations do not execute.
         */
        /**
         * Ensures that the default HTML5 dragging operations do not execute.
         * @return {?}
         */
        InteractionComponent.prototype.dragStart = /**
         * Ensures that the default HTML5 dragging operations do not execute.
         * @return {?}
         */
            function () {
                // -- prevent default drag
                return false;
            };
        /**
         * Called when the pointer is moved.
         * @param e PointerEvent
         */
        /**
         * Called when the pointer is moved.
         * @param {?} e PointerEvent
         * @return {?}
         */
        InteractionComponent.prototype.pointerMove = /**
         * Called when the pointer is moved.
         * @param {?} e PointerEvent
         * @return {?}
         */
            function (e) {
                e.preventDefault();
                if (this._isMouseDown) {
                    /** @type {?} */
                    var mousePos = this.getRelativePointerPos(e);
                    if (this._selectionService.hasLasso) {
                        /** @type {?} */
                        var mouseDownPos = this._mouseDownPos;
                        this._selectionService.resizeLasso(mousePos.x - mouseDownPos.x, mousePos.y - mouseDownPos.y, mouseDownPos);
                    }
                    else if (this._selectionService.selectors.length > 0) {
                        /** @type {?} */
                        var mouseChange = this.getPointerChange(e);
                        this._selectionService.nudgeBy(mouseChange[0], NudgeType.Overlay);
                        mousePos = mouseChange[1];
                        this._lastDropZone = this._dragService.updateDropZone(this._selectionService.activeSelector.overlay, this._el.nativeElement, [this._selectionService.activeSelector.clientEl]);
                    }
                    this._lastMousePos = mousePos;
                }
                else {
                    this.ensureCursor(e);
                }
            };
        /**
         * Called when the pointer is pressed.
         * @param e PointerEvent
         */
        /**
         * Called when the pointer is pressed.
         * @param {?} e PointerEvent
         * @return {?}
         */
        InteractionComponent.prototype.pointerDown = /**
         * Called when the pointer is pressed.
         * @param {?} e PointerEvent
         * @return {?}
         */
            function (e) {
                this._isMouseDown = true;
                this._mouseDownPos = this.getRelativePointerPos(e);
                this._lastMousePos = this._mouseDownPos;
                if (e.target === this._el.nativeElement) {
                    this._selectionService.createlassoSelector(this._mouseDownPos.x, this._mouseDownPos.y);
                }
                else {
                    /** @type {?} */
                    var element = /** @type {?} */ (e.target);
                    this._selectionService.selectElement(element, !e.shiftKey);
                }
            };
        /**
         * Called when the pointer is released.
         * @param e PointerEvent
         */
        /**
         * Called when the pointer is released.
         * @param {?} e PointerEvent
         * @return {?}
         */
        InteractionComponent.prototype.pointerUp = /**
         * Called when the pointer is released.
         * @param {?} e PointerEvent
         * @return {?}
         */
            function (e) {
                this._isMouseDown = false;
                if (this._selectionService.hasLasso) {
                    this._selectionService.selectCapturedElements();
                }
                else {
                    if (this._selectionService.state === SelectionState.Draggable) {
                        this.moveSelectedElements(NudgeType.Overlay, false);
                        this.tryDropSelectedElements();
                    }
                    else if (this._selectionService.state === SelectionState.Sizable) {
                        this.resizeSelectedElements();
                    }
                    this._dragService.clearDropZones(this._el.nativeElement);
                }
                this._renderer.setStyle(this._el.nativeElement, 'cursor', this._cursor);
                this._lastDropZone = null;
                this._interactionService.selectedElements = this._selectionService.clients;
            };
        /**
         * Attemps to drop the currently selected elements into a drop zone
         * @param e PointerEvent
         */
        /**
         * Attemps to drop the currently selected elements into a drop zone
         * @return {?}
         */
        InteractionComponent.prototype.tryDropSelectedElements = /**
         * Attemps to drop the currently selected elements into a drop zone
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var selectors = this._selectionService.selectors;
                selectors.forEach(function (selector) {
                    if (_this.canDrop(selector.clientEl)) {
                        _this._dragService.dropElement(_this._lastDropZone, selector.clientEl, _this._el.nativeElement);
                    }
                });
                this._selectionService.reselect();
            };
        /**
         * Ensures that the appropriate cursor is set when element is draggable.
         * @param e PointerEvent
         */
        /**
         * Ensures that the appropriate cursor is set when element is draggable.
         * @param {?} e PointerEvent
         * @return {?}
         */
        InteractionComponent.prototype.ensureCursor = /**
         * Ensures that the appropriate cursor is set when element is draggable.
         * @param {?} e PointerEvent
         * @return {?}
         */
            function (e) {
                /** @type {?} */
                var mousePos = new Point(e.pageX, e.pageY);
                /** @type {?} */
                var selector = this._selectionService.selectorAtPoint(mousePos);
                if (selector && elementDraggable(selector.clientEl)) {
                    this._renderer.setStyle(this._el.nativeElement, 'cursor', 'move');
                }
                else {
                    this._renderer.setStyle(this._el.nativeElement, 'cursor', 'default');
                }
            };
        /**
         * Resizes the selected elements to match the Selector overlay
         */
        /**
         * Resizes the selected elements to match the Selector overlay
         * @return {?}
         */
        InteractionComponent.prototype.resizeSelectedElements = /**
         * Resizes the selected elements to match the Selector overlay
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var selectors = this._selectionService.selectors;
                /** @type {?} */
                var sizedElements = [];
                selectors.forEach(function (selector) {
                    if (elementSizable(selector.clientEl)) {
                        sizedElements.push(selector.clientEl);
                        assignBoundingRect(_this._renderer, selector.overlay, selector.clientEl);
                        _this.resizedElement.emit(selector.clientEl);
                    }
                });
                this.resetSelection();
                if (sizedElements.length > 0) {
                    this.resizedElements.emit(sizedElements);
                }
            };
        /**
         * Moves selected elements to the current location of the selector or selector overlay.
         * @param nudgeType determines where the selected elements should be moved.  Options are
         * to move to the actual selector (NudgeType.Selector) or the selector overlay (NodgeType.Overlay).
         * Usually only the overlay is dragged/moved, hence the default of NudgeType.Overlay.
         * @param resetAfterMove determines if the selector should reset itself after every move.
         */
        /**
         * Moves selected elements to the current location of the selector or selector overlay.
         * @param {?=} nudgeType determines where the selected elements should be moved.  Options are
         * to move to the actual selector (NudgeType.Selector) or the selector overlay (NodgeType.Overlay).
         * Usually only the overlay is dragged/moved, hence the default of NudgeType.Overlay.
         * @param {?=} resetAfterMove determines if the selector should reset itself after every move.
         * @return {?}
         */
        InteractionComponent.prototype.moveSelectedElements = /**
         * Moves selected elements to the current location of the selector or selector overlay.
         * @param {?=} nudgeType determines where the selected elements should be moved.  Options are
         * to move to the actual selector (NudgeType.Selector) or the selector overlay (NodgeType.Overlay).
         * Usually only the overlay is dragged/moved, hence the default of NudgeType.Overlay.
         * @param {?=} resetAfterMove determines if the selector should reset itself after every move.
         * @return {?}
         */
            function (nudgeType, resetAfterMove) {
                var _this = this;
                if (nudgeType === void 0) {
                    nudgeType = NudgeType.Overlay;
                }
                if (resetAfterMove === void 0) {
                    resetAfterMove = true;
                }
                /** @type {?} */
                var selectors = this._selectionService.selectors;
                /** @type {?} */
                var movedElements = [];
                selectors.forEach(function (selector) {
                    if (elementDraggable(selector.clientEl)) {
                        movedElements.push(selector.clientEl);
                        assignPosition(_this._renderer, nudgeType === NudgeType.Overlay
                            ? selector.overlay
                            : selector.selectorEl, selector.clientEl);
                        _this.movedElement.emit(selector.clientEl);
                    }
                });
                if (resetAfterMove) {
                    this.resetSelection();
                }
                if (movedElements.length > 0) {
                    this.movedElements.emit(movedElements);
                }
            };
        /**
         * Deletes selected elements.
         */
        /**
         * Deletes selected elements.
         * @return {?}
         */
        InteractionComponent.prototype.deleteSelectedElements = /**
         * Deletes selected elements.
         * @return {?}
         */
            function () {
                /** @type {?} */
                var selectors = this._selectionService.selectors;
                /** @type {?} */
                var deletedElements = [];
                for (var index = selectors.length - 1; index >= 0; index--) {
                    /** @type {?} */
                    var selector = selectors[index];
                    if (this.canDelete(selector.clientEl)) {
                        /** @type {?} */
                        var el = selector.clientEl;
                        this._selectionService.clearSelector(selector);
                        this._interactionService.deleteElement(el);
                        deletedElements.push(el);
                    }
                }
                this._interactionService.deleteElements(deletedElements);
                this._interactionService.selectedElements = this._selectionService.clients;
            };
        /**
         * Add a new child element to the host element.
         */
        /**
         * Add a new child element to the host element.
         * @param {?} element
         * @return {?}
         */
        InteractionComponent.prototype.addElement = /**
         * Add a new child element to the host element.
         * @param {?} element
         * @return {?}
         */
            function (element) {
                /** @type {?} */
                var selector = this._selectionService.activeSelector;
                /** @type {?} */
                var parent = selector && isContainer(selector.clientEl) ? selector.clientEl : this._el.nativeElement;
                this._renderer.appendChild(parent, element);
            };
        /**
         * Gets the mouse position relative to the offset and scale of the host element.
         * @param e PointerEvent
         */
        /**
         * Gets the mouse position relative to the offset and scale of the host element.
         * @param {?} e PointerEvent
         * @return {?}
         */
        InteractionComponent.prototype.getRelativePointerPos = /**
         * Gets the mouse position relative to the offset and scale of the host element.
         * @param {?} e PointerEvent
         * @return {?}
         */
            function (e) {
                return getRelativePointerPos(e, this._el.nativeElement, this.scale);
            };
        /**
         * Gets pointer coordinates changes relative to the selected element.
         * @param e PointerEvent
         */
        /**
         * Gets pointer coordinates changes relative to the selected element.
         * @param {?} e PointerEvent
         * @return {?}
         */
        InteractionComponent.prototype.getPointerChange = /**
         * Gets pointer coordinates changes relative to the selected element.
         * @param {?} e PointerEvent
         * @return {?}
         */
            function (e) {
                /** @type {?} */
                var pointerPos = this.getRelativePointerPos(e);
                /** @type {?} */
                var left = pointerPos.x - this._lastMousePos.x;
                /** @type {?} */
                var top = pointerPos.y - this._lastMousePos.y;
                if (this.snap) {
                    if (left % this.snap !== 0) {
                        left = 0;
                        pointerPos.x = this._lastMousePos.x;
                    }
                    if (top % this.snap !== 0) {
                        top = 0;
                        pointerPos.y = this._lastMousePos.y;
                    }
                }
                return [new Point(left, top), pointerPos];
            };
        /**
         * Re-selects the currently selected elements.  Usually happens after
         * an element is moved or resized.
         */
        /**
         * Re-selects the currently selected elements.  Usually happens after
         * an element is moved or resized.
         * @return {?}
         */
        InteractionComponent.prototype.resetSelection = /**
         * Re-selects the currently selected elements.  Usually happens after
         * an element is moved or resized.
         * @return {?}
         */
            function () {
                this._selectionService.reselect();
            };
        /**
         * Cancels the current selections or drag operation.  If the elements are being dragged,
         * the drag operation is cancelled and the elements reselected.  Otherwise, the elements
         * are unselected.
         */
        /**
         * Cancels the current selections or drag operation.  If the elements are being dragged,
         * the drag operation is cancelled and the elements reselected.  Otherwise, the elements
         * are unselected.
         * @return {?}
         */
        InteractionComponent.prototype.cancelSelection = /**
         * Cancels the current selections or drag operation.  If the elements are being dragged,
         * the drag operation is cancelled and the elements reselected.  Otherwise, the elements
         * are unselected.
         * @return {?}
         */
            function () {
                if (this._isMouseDown) {
                    this._selectionService.reselect();
                }
                else {
                    this._selectionService.clearSelectors();
                }
            };
        /**
         * @return {?}
         */
        InteractionComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (this._el.nativeElement && this._renderer) {
                    this._interactionService.interactionHost = this._el.nativeElement;
                    this._selectionService.interactionHost = this._el.nativeElement;
                    this._selectionService.isLassoSelectable = this.isLassoSelectable;
                    this._cursor = getComputedStyle(this._el.nativeElement).cursor;
                    this._deleteSelectedElementsSubscription = this._interactionService.deleteSelectedElements$.subscribe(function () {
                        _this.deleteSelectedElements();
                    });
                    this._addElementSubscription = this._interactionService.addElement$.subscribe(function (element) {
                        // this.addElement(element);
                    });
                }
            };
        /**
         * @return {?}
         */
        InteractionComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this._lastDropZone = null;
                this._deleteSelectedElementsSubscription.unsubscribe();
                this._addElementSubscription.unsubscribe();
            };
        InteractionComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'hpc-interaction',
                        template: "<div #interactionContainer tabindex=\"0\" (dragstart)=\"dragStart()\" (pointerdown)=\"pointerDown($event)\" (pointerup)=\"pointerUp($event)\"\r\n  (pointermove)=\"pointerMove($event)\" (keydown)=\"keyDown($event)\" (keyup)=\"keyUp($event)\" (keypress)=\"keyPress($event)\"\r\n  [style.transform]=\"'scale('+scale+')'\" [ngClass]=\"{'hpc-checkers-background': isCheckersBackground}\" class=\"interaction-container\">\r\n  <ng-content></ng-content>\r\n</div>\r\n",
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        styles: [":host{box-sizing:border-box;position:absolute;height:100%;width:100%}.hpc-new-element{background-color:gray;top:10px;left:10px;height:200px;width:400px;border:1px solid #000}.interaction-container{height:100%;box-sizing:border-box;background:0 0}.hpc-checkers-background{background:url('data:image/svg+xml,\\<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"400\" height=\"400\" fill-opacity=\".25\" >            <rect x=\"200\" width=\"200\" height=\"200\" />            <rect y=\"200\" width=\"200\" height=\"200\" />            </svg>') 0 0/20px 20px gray}.hpc-element-selector,.hpc-lasso-selector{border:2px dashed #000;pointer-events:None}.grip-container{pointer-events:None;height:100%;width:100%;display:flex}.grip-container-l,.grip-container-m,.grip-container-r{display:flex;flex-direction:column;justify-content:space-between;flex:1}.grip-container-l{align-items:flex-start}.grip-container-m{align-items:center}.grip-container-r{align-items:flex-end}.grip{--grip-offset:-9px;background-color:#f2f2f2;border:2px solid #000;height:13px;width:13px;opacity:.85}.grip-bl,.grip-bm,.grip-br,.grip-lm,.grip-rm,.grip-tl,.grip-tm,.grip-tr{pointer-events:auto}.grip-tl{margin-left:var(--grip-offset);margin-top:var(--grip-offset);cursor:nw-resize}.grip-tm{margin-top:var(--grip-offset);cursor:n-resize}.grip-bm{margin-bottom:var(--grip-offset);cursor:n-resize}.grip-tr{margin-top:var(--grip-offset);margin-right:var(--grip-offset);cursor:ne-resize}.grip-br{cursor:nw-resize;margin-right:var(--grip-offset);margin-bottom:var(--grip-offset)}.grip-rm{cursor:e-resize;margin-right:var(--grip-offset)}.grip-bl{cursor:ne-resize;margin-left:var(--grip-offset);margin-bottom:var(--grip-offset)}.grip-lm{cursor:e-resize;margin-left:var(--grip-offset)}.grip-bl,.grip-br,.grip-tl,.grip-tr{border-radius:50%}.hpc-sizer-overlay{z-index:10000}.hpc-drag-overlay{opacity:.5;z-index:10000}.hpc-dropzone.active{border:2px dashed #fff}"]
                    }] }
        ];
        /** @nocollapse */
        InteractionComponent.ctorParameters = function () {
            return [
                { type: i0.Renderer2 },
                { type: DragService },
                { type: SizeService },
                { type: InteractionService },
                { type: SelectorService }
            ];
        };
        InteractionComponent.propDecorators = {
            _el: [{ type: i0.ViewChild, args: ['interactionContainer',] }],
            scale: [{ type: i0.Input }],
            snap: [{ type: i0.Input }],
            minSizingWidth: [{ type: i0.Input }],
            minSizingHeight: [{ type: i0.Input }],
            isLassoSelectable: [{ type: i0.Input }],
            isCheckersBackground: [{ type: i0.Input }],
            resizedElement: [{ type: i0.Output }],
            resizedElements: [{ type: i0.Output }],
            movedElement: [{ type: i0.Output }],
            movedElements: [{ type: i0.Output }],
            selectElement: [{ type: i0.Output }],
            canDelete: [{ type: i0.Input }],
            canDrop: [{ type: i0.Input }]
        };
        return InteractionComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ComposerComponent = /** @class */ (function () {
        function ComposerComponent() {
            this.headerVisible = true;
        }
        /**
         * @return {?}
         */
        ComposerComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        ComposerComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'hpc-composer',
                        template: "<div class=\"composer_container\">\n    <div *ngIf=\"headerVisible\" class=\"header-row\">\n       <ng-content select=\"[header]\"></ng-content>\n    </div>\n    <div class= \"body-row\">\n      <div class=\"composer_container-widgets\">\n          <ng-content select=\"[widgets]\"></ng-content>\n      </div>\n      <div class=\"composer-main-container\">\n        <div class=\"composer-menu-container\">\n           <ng-content select=\"[menu]\"></ng-content>\n        </div>\n        <hpc-interaction [isCheckersBackground]=true [isLassoSelectable]=true [scale]=0.65>\n          <!-- sample elements - will remove in production version  -->\n          <div class=\"hpc-dropzone\" style=\"position: absolute; top: 400px; left: 100px; height: 200px; width:400px; background: orangered\">\n            <div style=\"position: absolute; top: 10px; left: 10px; height: 180px; width:200px; background: yellow\">\n              <div class=\"hpc-dropzone\" style=\"position: absolute; top: 10px; left: 10px; height: 100px; width:100px; background: rgb(0, 255, 0)\"></div>\n            </div>\n          </div>\n          <div class=\"hpc-no-drag hpc-no-size\" style=\"position: absolute; left: 600px; top: 100px; height: 600px; width:500px; background: rgb(15, 94, 88)\"></div>\n          <!-- end sample elements -->\n        </hpc-interaction>\n      </div>\n      <div class=\"composer_container-properties\"></div>\n    </div>\n</div>\n\n",
                        styles: [":host /deep/ .interaction-container{height:1080px;width:1920px;-webkit-transform-origin:left top;transform-origin:left top;margin-left:33px;margin-top:2%}.composer_container{display:flex;flex-direction:column;overflow:hidden}.composer_container>*{--container-background:rgb(35, 36, 35);--container-header:rgb(63, 63, 63);--container-header-color:rgb(29, 202, 38);--container-main:rgb(63, 63, 63)}.composer_container-widgets{display:flex;flex-direction:column;width:300px;background-color:var(--container-background)}.composer_container-properties{width:300px;background-color:var(--container-background)}.composer-main-container{overflow:auto;background-color:var(--container-main);height:100%;display:flex;flex-direction:column;flex:1}.composer-menu-container{color:#fff;padding:10px;min-height:75px;width:100%}.header-row{display:flex;flex-wrap:wrap;height:75px;background:gray}.body-row{display:flex;height:100%;width:100%}"]
                    }] }
        ];
        /** @nocollapse */
        ComposerComponent.ctorParameters = function () { return []; };
        ComposerComponent.propDecorators = {
            headerVisible: [{ type: i0.Input }]
        };
        return ComposerComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var TreeviewComponent = /** @class */ (function () {
        function TreeviewComponent() {
        }
        /**
         * @return {?}
         */
        TreeviewComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        TreeviewComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'hpc-treeview',
                        template: "<p>\n  treeview works!\n</p>\n",
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        TreeviewComponent.ctorParameters = function () { return []; };
        return TreeviewComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var TreeviewItemComponent = /** @class */ (function () {
        function TreeviewItemComponent() {
        }
        /**
         * @return {?}
         */
        TreeviewItemComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        TreeviewItemComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'hpc-treeview-item',
                        template: "<p>\n  treeview-item works!\n</p>\n",
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        TreeviewItemComponent.ctorParameters = function () { return []; };
        return TreeviewItemComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var SelectorComponent = /** @class */ (function () {
        function SelectorComponent() {
        }
        /**
         * @return {?}
         */
        SelectorComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        SelectorComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'hpc-selector',
                        template: "<p>\n  selector works!\n</p>\n",
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        SelectorComponent.ctorParameters = function () { return []; };
        return SelectorComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var FileManagerComponent = /** @class */ (function () {
        function FileManagerComponent() {
        }
        /**
         * @return {?}
         */
        FileManagerComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        FileManagerComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'hpc-file-manager',
                        template: "<p>\n  file-manager works!\n</p>\n",
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        FileManagerComponent.ctorParameters = function () { return []; };
        return FileManagerComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PropertyGridComponent = /** @class */ (function () {
        function PropertyGridComponent() {
        }
        /**
         * @return {?}
         */
        PropertyGridComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        PropertyGridComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'hpc-property-grid',
                        template: "<p>\n  property-grid works!\n</p>\n",
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        PropertyGridComponent.ctorParameters = function () { return []; };
        return PropertyGridComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var HpComponentsModule = /** @class */ (function () {
        function HpComponentsModule() {
        }
        HpComponentsModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule
                        ],
                        declarations: [
                            InteractionComponent,
                            ComposerComponent,
                            TreeviewComponent,
                            TreeviewItemComponent,
                            SelectorComponent,
                            FileManagerComponent,
                            PropertyGridComponent
                        ],
                        exports: [
                            InteractionComponent,
                            ComposerComponent,
                            TreeviewComponent
                        ],
                        providers: [
                            DragService,
                            SizeService,
                            InteractionService,
                            SelectorService
                        ]
                    },] }
        ];
        return HpComponentsModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.HpComponentsService = HpComponentsService;
    exports.HpComponentsModule = HpComponentsModule;
    exports.InteractionService = InteractionService;
    exports.InteractionComponent = InteractionComponent;
    exports.ɵd = ComposerComponent;
    exports.ɵh = FileManagerComponent;
    exports.ɵi = PropertyGridComponent;
    exports.ɵg = SelectorComponent;
    exports.ɵc = SelectorService;
    exports.ɵa = DragService;
    exports.ɵb = SizeService;
    exports.ɵf = TreeviewItemComponent;
    exports.ɵe = TreeviewComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHAtY29tcG9uZW50cy51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL2hwLWNvbXBvbmVudHMvbGliL2hwLWNvbXBvbmVudHMuc2VydmljZS50cyIsIm5nOi8vaHAtY29tcG9uZW50cy9saWIvc2NyaXB0cy9tYXRoLnRzIiwibmc6Ly9ocC1jb21wb25lbnRzL2xpYi9zY3JpcHRzL2RvbS50cyIsIm5nOi8vaHAtY29tcG9uZW50cy9saWIvc2VydmljZXMvZHJhZy5zZXJ2aWNlLnRzIiwibmc6Ly9ocC1jb21wb25lbnRzL2xpYi9zZXJ2aWNlcy9zaXplLnNlcnZpY2UudHMiLCJuZzovL2hwLWNvbXBvbmVudHMvbGliL3NlbGVjdG9yL3NlbGVjdG9yLnNlcnZpY2UudHMiLCJuZzovL2hwLWNvbXBvbmVudHMvbGliL2ludGVyYWN0aW9uL2ludGVyYWN0aW9uLnNlcnZpY2UudHMiLCJuZzovL2hwLWNvbXBvbmVudHMvbGliL2ludGVyYWN0aW9uL2ludGVyYWN0aW9uLmNvbXBvbmVudC50cyIsIm5nOi8vaHAtY29tcG9uZW50cy9saWIvY29tcG9zZXIvY29tcG9zZXIuY29tcG9uZW50LnRzIiwibmc6Ly9ocC1jb21wb25lbnRzL2xpYi90cmVldmlldy90cmVldmlldy5jb21wb25lbnQudHMiLCJuZzovL2hwLWNvbXBvbmVudHMvbGliL3RyZWV2aWV3L3RyZWV2aWV3LWl0ZW0vdHJlZXZpZXctaXRlbS5jb21wb25lbnQudHMiLCJuZzovL2hwLWNvbXBvbmVudHMvbGliL3NlbGVjdG9yL3NlbGVjdG9yLmNvbXBvbmVudC50cyIsIm5nOi8vaHAtY29tcG9uZW50cy9saWIvZmlsZS1tYW5hZ2VyL2ZpbGUtbWFuYWdlci5jb21wb25lbnQudHMiLCJuZzovL2hwLWNvbXBvbmVudHMvbGliL3Byb3BlcnR5LWdyaWQvcHJvcGVydHktZ3JpZC5jb21wb25lbnQudHMiLCJuZzovL2hwLWNvbXBvbmVudHMvbGliL2hwLWNvbXBvbmVudHMubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgSHBDb21wb25lbnRzU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsImV4cG9ydCBjbGFzcyBSZWN0IHtcbiAgY29uc3RydWN0b3IocHVibGljIGxlZnQ6IG51bWJlciA9IDAsIHB1YmxpYyB0b3A6IG51bWJlciA9IDAsIHB1YmxpYyB3aWR0aDogbnVtYmVyID0gMCwgcHVibGljIGhlaWdodDogbnVtYmVyID0gMCkgeyB9XG4gIGdldCByaWdodCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmxlZnQgKyB0aGlzLndpZHRoO1xuICB9XG4gIGdldCBib3R0b20oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy50b3AgKyB0aGlzLmhlaWdodDtcbiAgfVxuICBnZXQgaXNFbXB0eSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKHRoaXMuaGVpZ2h0ICsgdGhpcy53aWR0aCkgPT09IDA7XG4gIH1cbiAgZ2V0IHRvcExlZnQoKTogUG9pbnQge1xuICAgIHJldHVybiBuZXcgUG9pbnQodGhpcy5sZWZ0LCB0aGlzLnRvcCk7XG4gIH1cbiAgZ2V0IHRvcFJpZ2h0KCk6IFBvaW50IHtcbiAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMucmlnaHQsIHRoaXMudG9wKTtcbiAgfVxuICBnZXQgYm90dG9tTGVmdCgpOiBQb2ludCB7XG4gICAgcmV0dXJuIG5ldyBQb2ludCh0aGlzLmxlZnQsIHRoaXMuYm90dG9tKTtcbiAgfVxuICBnZXQgYm90dG9tUmlnaHQoKTogUG9pbnQge1xuICAgIHJldHVybiBuZXcgUG9pbnQodGhpcy5yaWdodCwgdGhpcy5ib3R0b20pO1xuICB9XG5cbn1cbmV4cG9ydCBjbGFzcyBTaXplIHtcbiAgY29uc3RydWN0b3IocHVibGljIGhlaWdodDogbnVtYmVyID0gMCwgcHVibGljIHdpZHRoOiBudW1iZXIgPSAwKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIFBvaW50IHtcbiAgY29uc3RydWN0b3IocHVibGljIHg6IG51bWJlciA9IDAsIHB1YmxpYyB5OiBudW1iZXIgPSAwKSB7IH1cbiAgYWRkKHBvaW50OiBQb2ludCkge1xuICAgIHRoaXMueCA9IHRoaXMueCArIHBvaW50Lng7XG4gICAgdGhpcy55ID0gdGhpcy55ICsgcG9pbnQueTtcbiAgfVxuICBzdWJ0cmFjdChwb2ludDogUG9pbnQpIHtcbiAgICB0aGlzLnggPSB0aGlzLnggLSBwb2ludC54O1xuICAgIHRoaXMueSA9IHRoaXMueSAtIHBvaW50Lnk7XG4gIH1cbn1cbiIsImltcG9ydCB7UG9pbnQsIFJlY3QsIFNpemV9IGZyb20gJy4vbWF0aCc7XG5pbXBvcnQge1JlbmRlcmVyMn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBvZmZzZXQyKGVsOiBIVE1MRWxlbWVudCk6IFBvaW50IHtcbiAgIGNvbnN0IHJlc3VsdCA9IG5ldyBQb2ludChlbC5vZmZzZXRMZWZ0LCBlbC5vZmZzZXRUb3ApO1xuICAgaWYgKGVsLnBhcmVudEVsZW1lbnQpIHtcbiAgICAgcmVzdWx0LmFkZChvZmZzZXQoZWwucGFyZW50RWxlbWVudCkpO1xuICAgfVxuICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9mZnNldChlbDogSFRNTEVsZW1lbnQpOiBQb2ludCB7XG4gIGNvbnN0IGJveCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBjb25zdCB0b3AgPSBib3gudG9wO1xuICBjb25zdCBsZWZ0ID0gYm94LmxlZnQ7XG4gIHJldHVybiBuZXcgUG9pbnQobGVmdCwgdG9wKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBpeFRvTnVtKHZhbHVlOiBzdHJpbmcpOiBudW1iZXIge1xuICBpZiAoIXZhbHVlIHx8IHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiAwO1xuICB9XG4gIGNvbnN0IG5ld1ZhbHVlID0gdmFsdWUucmVwbGFjZSgncHgnLCAnJykucmVwbGFjZSgnZW0nLCAnJyk7XG4gIHJldHVybiBwYXJzZUZsb2F0KG5ld1ZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG51bVRvUGl4KHZhbHVlOiBudW1iZXIsIGF1dG9XaGVuWmVybzogYm9vbGVhbiA9IGZhbHNlKTogc3RyaW5nIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICB2YWx1ZSA9IDA7XG4gIH1cbiAgaWYgKGF1dG9XaGVuWmVybyAmJiB2YWx1ZSA9PT0gMCkge1xuICAgIHJldHVybiAnYXV0byc7XG4gIH1cbiAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCkgKyAncHgnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hpbGRFbGVtZW50cyhlbGVtZW50OiBIVE1MRWxlbWVudCwgb3JkZXJCeVpPcmRlciA9IGZhbHNlKTogSFRNTEVsZW1lbnRbXSB7XG4gIGNvbnN0IHJlc3VsdCA9IG5ldyBBcnJheTxIVE1MRWxlbWVudD4oKTtcbiAgaWYgKCFlbGVtZW50KSB7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBjb25zdCBjaGlsZHJlbiA9IGVsZW1lbnQuY2hpbGRyZW47XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjaGlsZCA9IGNoaWxkcmVuW2ldIGFzIEhUTUxFbGVtZW50O1xuICAgIGlmIChjaGlsZCAmJiBjaGlsZC5wYXJlbnRFbGVtZW50ID09PSBlbGVtZW50ICYmXG4gICAgICBjaGlsZC5jbGFzc05hbWUuaW5kZXhPZignaHBjLWxhc3NvLXNlbGVjdG9yJykgPT09IC0xICYmXG4gICAgICBjaGlsZC5jbGFzc05hbWUuaW5kZXhPZignaHBjLWVsZW1lbnQtc2VsZWN0b3InKSA9PT0gLTEgJiZcbiAgICAgIGNoaWxkLmNsYXNzTmFtZS5pbmRleE9mKCdncmlwJykgPT09IC0xKSB7XG4gICAgICByZXN1bHQucHVzaChjaGlsZCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKG9yZGVyQnlaT3JkZXIpIHtcbiAgICAvLyByZXN1bHQgPSBFbnVtZXJhYmxlLmZyb20ocmVzdWx0KS5vcmRlckJ5KHggPT4gcGFyc2VJbnQoeC5zdHlsZS56SW5kZXgsIE5hTikpLnRvQXJyYXkoKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlSGVscGVyQ2hpbGRyZW4oY2hpbGRyZW46IEhUTUxFbGVtZW50W10pIHtcbiAgZm9yIChsZXQgaSA9IGNoaWxkcmVuLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgY29uc3QgY2hpbGQgPSBjaGlsZHJlbltpXSBhcyBIVE1MRWxlbWVudDtcbiAgICBpZiAoY2hpbGQuY2xhc3NOYW1lLmluZGV4T2YoJ2hwYy1sYXNzby1zZWxlY3RvcicpID4gLTEgfHxcbiAgICAgIGNoaWxkLmNsYXNzTmFtZS5pbmRleE9mKCdocGMtZWxlbWVudC1zZWxlY3RvcicpID4gLTEgfHxcbiAgICAgIGNoaWxkLmNsYXNzTmFtZS5pbmRleE9mKCdocGMtZHJhZy1vdmVybGF5JykgPiAtMSB8fFxuICAgICAgY2hpbGQuY2xhc3NOYW1lLmluZGV4T2YoJ2dyaXAtY29udGFpbmVyJykgPiAtMSB8fFxuICAgICAgY2hpbGQuY2xhc3NOYW1lLmluZGV4T2YoJ2dyaXAnKSA+IC0xKSB7XG4gICAgICByZW1vdmVBcnJheUl0ZW0oY2hpbGRyZW4sIGNoaWxkKTtcbiAgICB9XG4gIH1cbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQXJyYXlJdGVtKGFycmF5OiBhbnlbXSwgaXRlbTogYW55KSB7XG4gIGNvbnN0IGluZGV4ID0gdHlwZW9mKGl0ZW0pID09PSAnbnVtYmVyJyA/IGl0ZW0gOiBhcnJheS5pbmRleE9mKGl0ZW0pIDtcbiAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICBhcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnRlcnNlY3QoYTogUmVjdCwgYjogUmVjdCk6IGJvb2xlYW4ge1xuICByZXR1cm4gKGEubGVmdCA8PSBiLnJpZ2h0ICYmXG4gICAgYi5sZWZ0IDw9IGEucmlnaHQgJiZcbiAgICBhLnRvcCA8PSBiLmJvdHRvbSAmJlxuICAgIGIudG9wIDw9IGEuYm90dG9tKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uICBlbGVtZW50c0F0UmVjdChwYXJlbnQ6IEhUTUxFbGVtZW50LCByZWN0OiBSZWN0LCBleGNsdWRlOiBIVE1MRWxlbWVudFtdID0gW10pIHtcbiAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgY2hpbGRFbGVtZW50cyhwYXJlbnQpLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgaWYgKGludGVyc2VjdChlbGVtZW50Qm91bmRzKGVsZW1lbnQpLCByZWN0KSkge1xuICAgICAgaWYgKGV4Y2x1ZGUgPT0gbnVsbCB8fCBleGNsdWRlLmluZGV4T2YoZWxlbWVudCkgPT09IC0xKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGVsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbGVtZW50UG9zKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogUG9pbnQge1xuICBjb25zdCBjb21wdXRlZFN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCwgbnVsbCk7XG4gIHJldHVybiBuZXcgUG9pbnQocGl4VG9OdW0oY29tcHV0ZWRTdHlsZXMubGVmdCksIHBpeFRvTnVtKGNvbXB1dGVkU3R5bGVzLnRvcCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWxlbWVudFNpemUoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBTaXplIHtcbiAgY29uc3QgY29tcHV0ZWRTdHlsZXMgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQsIG51bGwpO1xuICByZXR1cm4gbmV3IFNpemUocGl4VG9OdW0oY29tcHV0ZWRTdHlsZXMuaGVpZ2h0KSwgcGl4VG9OdW0oY29tcHV0ZWRTdHlsZXMud2lkdGgpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVsZW1lbnRCb3VuZHMoZWxlbWVudDogSFRNTEVsZW1lbnQsIHJlbGF0aXZlVG9QYWdlOiBib29sZWFuID0gZmFsc2UsIHNjYWxlOiBQb2ludCA9IG51bGwpOiBSZWN0IHtcbiAgbGV0IHBvcyA9IGVsZW1lbnRQb3MoZWxlbWVudCk7XG4gIGlmIChyZWxhdGl2ZVRvUGFnZSkge1xuICAgIHBvcyA9IGVsZW1lbnRQYWdlUG9zKGVsZW1lbnQpO1xuICB9XG4gIGNvbnN0IHNpemUgPSBlbGVtZW50U2l6ZShlbGVtZW50KTtcbiAgaWYgKHNjYWxlKSB7XG4gICAgc2l6ZS53aWR0aCA9IHNpemUud2lkdGggKiBzY2FsZS54O1xuICAgIHNpemUuaGVpZ2h0ID0gc2l6ZS5oZWlnaHQgKiBzY2FsZS55O1xuICB9XG4gIHJldHVybiBuZXcgUmVjdChwb3MueCwgcG9zLnksIHNpemUud2lkdGgsIHNpemUuaGVpZ2h0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVsZW1lbnRQYWdlUG9zKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogUG9pbnQge1xuICBjb25zdCByZXN1bHQgPSBlbGVtZW50UG9zKGVsZW1lbnQpO1xuICBpZiAoZWxlbWVudC5wYXJlbnRFbGVtZW50ID09IG51bGwpIHtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGxldCBsZWZ0ID0gcmVzdWx0Lng7XG4gIGxldCB0b3AgPSByZXN1bHQueTtcbiAgY29uc3QgcGFyZW50cyA9IHBhcmVudFRyZWUoZWxlbWVudCk7XG4gIHBhcmVudHMuZm9yRWFjaChwYXJlbnQgPT4ge1xuICAgIGxlZnQgKz0gcGl4VG9OdW0ocGFyZW50LnN0eWxlLmxlZnQpICsgcGFyZW50LmNsaWVudExlZnQ7XG4gICAgdG9wICs9IHBpeFRvTnVtKHBhcmVudC5zdHlsZS50b3ApICsgcGFyZW50LmNsaWVudFRvcDtcbiAgfSk7XG4gIHJldHVybiBuZXcgUG9pbnQobGVmdCwgdG9wKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gcGFyZW50VHJlZShlbGVtZW50OiBIVE1MRWxlbWVudCwgbGFzdENsYXNzOiBzdHJpbmcgPSAnc3VyZmFjZScsIGluY2x1c2l2ZSA9IGZhbHNlKTogQXJyYXk8SFRNTEVsZW1lbnQ+IHtcbiAgY29uc3QgcmVzdWx0ID0gbmV3IEFycmF5PEhUTUxFbGVtZW50PigpO1xuICBpZiAoIWVsZW1lbnQpIHtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGxldCBwYXJlbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gIHdoaWxlIChwYXJlbnQgIT0gbnVsbCkge1xuICAgIGlmICghaW5jbHVzaXZlICYmIHBhcmVudC5jbGFzc0xpc3QuY29udGFpbnMobGFzdENsYXNzKSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJlc3VsdC5wdXNoKHBhcmVudCk7XG4gICAgaWYgKHBhcmVudC5jbGFzc0xpc3QuY29udGFpbnMobGFzdENsYXNzKSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb3ZlRWxlbWVudFRvKHJlbmRlcmVyOiBSZW5kZXJlcjIsIGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBwb3NpdGlvbjogUG9pbnQpOiB2b2lkIHtcbiAgaWYgKCFlbGVtZW50KSB7IHJldHVybjsgfVxuICByZW5kZXJlci5zZXRTdHlsZShlbGVtZW50LCAndG9wJywgcG9zaXRpb24ueSArICdweCcpO1xuICByZW5kZXJlci5zZXRTdHlsZShlbGVtZW50LCAnbGVmdCcsIHBvc2l0aW9uLnggKyAncHgnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVFbGVtZW50QnkocmVuZGVyZXI6IFJlbmRlcmVyMiwgZWxlbWVudCwgZGVsdGE6IFBvaW50KSB7XG4gIGlmICghZWxlbWVudCkgeyByZXR1cm47IH1cbiAgY29uc3QgcG9zID0gZWxlbWVudFBvcyhlbGVtZW50KTtcbiAgY29uc3QgdG9wID0gcG9zLnkgKyBkZWx0YS55O1xuICBjb25zdCBsZWZ0ID0gcG9zLnggKyBkZWx0YS54O1xuICByZW5kZXJlci5zZXRTdHlsZShlbGVtZW50LCAndG9wJywgdG9wICsgJ3B4Jyk7XG4gIHJlbmRlcmVyLnNldFN0eWxlKGVsZW1lbnQsICdsZWZ0JywgbGVmdCArICdweCcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2l6ZUVsZW1lbnRCeShyZW5kZXJlcjogUmVuZGVyZXIyLCBlbGVtZW50LCBkZWx0YTogUG9pbnQpIHtcbiAgaWYgKCFlbGVtZW50KSB7IHJldHVybjsgfVxuICBjb25zdCBzaXplID0gZWxlbWVudFNpemUoZWxlbWVudCk7XG4gIGNvbnN0IGhlaWdodCA9IHNpemUuaGVpZ2h0ICsgZGVsdGEueTtcbiAgY29uc3Qgd2lkdGggPSBzaXplLndpZHRoICsgZGVsdGEueDtcbiAgcmVuZGVyZXIuc2V0U3R5bGUoZWxlbWVudCwgJ2hlaWdodCcsIGhlaWdodCArICdweCcpO1xuICByZW5kZXJlci5zZXRTdHlsZShlbGVtZW50LCAnd2lkdGgnLCB3aWR0aCArICdweCcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzaWduQm91bmRpbmdSZWN0KHJlbmRlcmVyOiBSZW5kZXJlcjIsIHNvdXJjZTogSFRNTEVsZW1lbnQsIHRhcmdldDogSFRNTEVsZW1lbnQpIHtcbiAgY29uc3Qgc291cmNlUmVjdCA9IGVsZW1lbnRCb3VuZHMoc291cmNlKTtcbiAgLy8gY29uc3Qgc3R5bGVzID0gZ2V0Q29tcHV0ZWRTdHlsZShzb3VyY2UpO1xuICBjb25zdCB0b3AgPSBzb3VyY2VSZWN0LnRvcDsgLy8gKyBwaXhUb051bShzdHlsZXMubWFyZ2luVG9wKTtcbiAgY29uc3QgbGVmdCA9IHNvdXJjZVJlY3QubGVmdDsgLy8gKyBwaXhUb051bShzdHlsZXMubWFyZ2luTGVmdCk7XG4gIHJlbmRlcmVyLnNldFN0eWxlKHRhcmdldCwgJ3RvcCcsIHRvcCArICdweCcpO1xuICByZW5kZXJlci5zZXRTdHlsZSh0YXJnZXQsICdsZWZ0JywgbGVmdCArICdweCcpO1xuICByZW5kZXJlci5zZXRTdHlsZSh0YXJnZXQsICdoZWlnaHQnLCBzb3VyY2VSZWN0LmhlaWdodCArICdweCcpO1xuICByZW5kZXJlci5zZXRTdHlsZSh0YXJnZXQsICd3aWR0aCcsIHNvdXJjZVJlY3Qud2lkdGggKyAncHgnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2lnblBvc2l0aW9uKHJlbmRlcmVyOiBSZW5kZXJlcjIsIHNvdXJjZTogSFRNTEVsZW1lbnQsIHRhcmdldDogSFRNTEVsZW1lbnQpIHtcbiAgY29uc3Qgc291cmNlUmVjdCA9IGVsZW1lbnRCb3VuZHMoc291cmNlKTtcbiAgY29uc3QgcG9zID0gZWxlbWVudFBvcyhzb3VyY2UpO1xuICByZW5kZXJlci5zZXRTdHlsZSh0YXJnZXQsICd0b3AnLCBwb3MueSArICdweCcpO1xuICByZW5kZXJlci5zZXRTdHlsZSh0YXJnZXQsICdsZWZ0JywgcG9zLnggKyAncHgnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEVsZW1lbnRSZWN0KHJlbmRlcmVyOiBSZW5kZXJlcjIsIHJlY3Q6IFJlY3QsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gIHJlbmRlcmVyLnNldFN0eWxlKGVsZW1lbnQsICd0b3AnLCByZWN0LnRvcCArICdweCcpO1xuICByZW5kZXJlci5zZXRTdHlsZShlbGVtZW50LCAnbGVmdCcsIHJlY3QubGVmdCArICdweCcpO1xuICByZW5kZXJlci5zZXRTdHlsZShlbGVtZW50LCAnaGVpZ2h0JywgcmVjdC5oZWlnaHQgKyAncHgnKTtcbiAgcmVuZGVyZXIuc2V0U3R5bGUoZWxlbWVudCwgJ3dpZHRoJywgcmVjdC53aWR0aCArICdweCcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hpbGRyZW5PZihwYXJlbnQ6IEhUTUxFbGVtZW50LCBkZWVwID0gZmFsc2UsIGV4Y2x1ZGUgPSBbXSk6IEhUTUxFbGVtZW50W10ge1xuICBsZXQgcmVzdWx0ID0gW107XG4gIGlmIChwYXJlbnQpIHtcbiAgICBpZiAoZGVlcCkge1xuICAgICAgcmVzdWx0ID0gQXJyYXkuZnJvbShwYXJlbnQucXVlcnlTZWxlY3RvckFsbCgnKicpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0ID0gQXJyYXkuZnJvbShwYXJlbnQuY2hpbGRyZW4pO1xuICAgIH1cbiAgICByZW1vdmVIZWxwZXJDaGlsZHJlbihyZXN1bHQpO1xuICAgIHJlc3VsdCA9IHJlc3VsdC5maWx0ZXIoeCA9PiAhKHggaW4gZXhjbHVkZSkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwb2ludEluUmVjdChwb2ludDogUG9pbnQsIHJlY3Q6IFJlY3QpOiBib29sZWFuIHtcbiAgcmV0dXJuIHBvaW50LnggPj0gcmVjdC5sZWZ0ICYmIHBvaW50LnggPD0gcmVjdC5yaWdodCAmJiBwb2ludC55ID49IHJlY3QudG9wICYmIHBvaW50LnkgPD0gcmVjdC5ib3R0b207XG59XG5cbi8qKlxuKiBSZXR1cm5zIHRoZSBmaXJzdCBjaGlsZCBlbGVtZW50IG9mIHRoZSBwYXJlbnQgZWxlbWVudCBhdCBhIGdpdmVuIHBvaW50LlxuKiBJZiB0aGVyZSBhcmUgbm8gY2hpbGQgZWxlbWVudHMgYXQgdGhlIGdpdmVuIHBvaW50LCB0aGVuIHRoZSBwYXJlbnQgZWxlbWVudCBpcyByZXR1cm5lZC5cbiovXG5leHBvcnQgZnVuY3Rpb24gZWxlbWVudEF0UG9pbnQocG9zOiBQb2ludCwgcGFyZW50OiBIVE1MRWxlbWVudCwgZXhjbHVkZSA9IFtdKTogSFRNTEVsZW1lbnQge1xuICAgIGxldCByZXN1bHQgPSBwYXJlbnQ7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBjaGlsZHJlbk9mKHBhcmVudCwgZmFsc2UsIGV4Y2x1ZGUpO1xuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBjaGlsZHJlbi5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGNvbnN0IGNoaWxkID0gY2hpbGRyZW5baW5kZXhdO1xuICAgICAgY29uc3QgZWxSZWN0ID0gY2hpbGQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBjb25zdCByZWN0ID0gbmV3IFJlY3QoZWxSZWN0LmxlZnQsIGVsUmVjdC50b3AsIGVsUmVjdC53aWR0aCwgZWxSZWN0LmhlaWdodCk7XG4gICAgICBpZiAoZXhjbHVkZS5pbmRleE9mKGNoaWxkKSA9PT0gLTEgJiYgcG9pbnRJblJlY3QocG9zLCByZWN0KSkge1xuICAgICAgICByZXN1bHQgPSBlbGVtZW50QXRQb2ludChwb3MsIGNoaWxkLCBleGNsdWRlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24geGVsZW1lbnRBdFBvaW50KHBvczogUG9pbnQsIHBhcmVudDogSFRNTEVsZW1lbnQsIGV4Y2x1ZGUgPSBbXSk6IEhUTUxFbGVtZW50IHtcbiAgbGV0IHJlc3VsdCA9IHBhcmVudDtcbiAgY29uc3QgY2hpbGRyZW4gPSBjaGlsZEVsZW1lbnRzKHBhcmVudCk7XG4gIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBjaGlsZHJlbi5sZW5ndGg7IGluZGV4KyspIHtcbiAgICBjb25zdCBjaGlsZCA9IGNoaWxkcmVuW2luZGV4XTtcbiAgICBjb25zdCBlbFJlY3QgPSBjaGlsZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCByZWN0ID0gbmV3IFJlY3QoZWxSZWN0LmxlZnQsIGVsUmVjdC50b3AsIGVsUmVjdC53aWR0aCwgZWxSZWN0LmhlaWdodCk7XG4gICAgaWYgKGV4Y2x1ZGUuaW5kZXhPZihjaGlsZCkgPT09IC0xICYmIHBvaW50SW5SZWN0KHBvcywgcmVjdCkpIHtcbiAgICAgIHJlc3VsdCA9IGNoaWxkO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGFuZ2VQYXJlbnQoZWxlbWVudDogSFRNTEVsZW1lbnQsIG5ld1BhcmVudDogSFRNTEVsZW1lbnQsIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgaWYgKCFuZXdQYXJlbnQgfHwgZWxlbWVudC5wYXJlbnRFbGVtZW50ID09PSBuZXdQYXJlbnQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgcGFyZW50UG9zID0gZWxlbWVudFBhZ2VQb3MobmV3UGFyZW50KTtcbiAgY29uc3QgZWxQb3MgPSBlbGVtZW50UGFnZVBvcyhlbGVtZW50KTtcbiAgY29uc3QgbmV3UG9zID0gbmV3IFBvaW50KGVsUG9zLnggLSBwYXJlbnRQb3MueCwgZWxQb3MueSAtIHBhcmVudFBvcy55KTtcbiAgcmVuZGVyZXIuYXBwZW5kQ2hpbGQobmV3UGFyZW50LCBlbGVtZW50KTtcbiAgbW92ZUVsZW1lbnRUbyhyZW5kZXJlciwgZWxlbWVudCwgbmV3UG9zKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjYWxlZFBvcyhlbGVtZW50OiBIVE1MRWxlbWVudCwgc2NhbGU6IG51bWJlcik6IFBvaW50IHtcbiAgICBjb25zdCBwb3MgPSBvZmZzZXQoZWxlbWVudCk7XG4gICAgcmV0dXJuIG5ldyBQb2ludChcbiAgICAgIHBvcy54IC8gc2NhbGUsXG4gICAgICBwb3MueSAvIHNjYWxlXG4gICAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJlbGF0aXZlUG9pbnRlclBvcyhlOiBQb2ludGVyRXZlbnQsIGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBzY2FsZSA9IDEpIHtcbiAgY29uc3QgcmVsYXRpdmVQb3MgPSBvZmZzZXQoZWxlbWVudCk7XG4gIHJldHVybiBuZXcgUG9pbnQoXG4gICAgKGUucGFnZVggLSByZWxhdGl2ZVBvcy54KSAvIHNjYWxlLFxuICAgIChlLnBhZ2VZIC0gcmVsYXRpdmVQb3MueSkgLyBzY2FsZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWxlbWVudERyYWdnYWJsZShlbGVtZW50OiBFbGVtZW50KSB7XG4gIHJldHVybiAhZWxlbWVudExvY2tlZChlbGVtZW50KSAmJiBlbGVtZW50LmNsYXNzTmFtZS5pbmRleE9mKCdocGMtbm8tZHJhZycpID09PSAtMTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVsZW1lbnRTaXphYmxlKGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgcmV0dXJuICFlbGVtZW50TG9ja2VkKGVsZW1lbnQpICYmIGVsZW1lbnQuY2xhc3NOYW1lLmluZGV4T2YoJ2hwYy1uby1zaXplJykgPT09IC0xO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWxlbWVudExvY2tlZChlbGVtZW50OiBFbGVtZW50KTogYm9vbGVhbiB7XG4gIHJldHVybiBlbGVtZW50LmNsYXNzTmFtZS5pbmRleE9mKCdocGMtbG9ja2VkJykgPiAtMTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ29udGFpbmVyKGVsZW1lbnQ6IEVsZW1lbnQpOiBib29sZWFuIHtcbiAgcmV0dXJuIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdocGMtY29udGFpbmVyJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NlbGVjdGFibGUoZWxlbWVudDogRWxlbWVudCk6IGJvb2xlYW4ge1xuICByZXR1cm4gIWVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdocGMtbm8tc2VsZWN0Jyk7XG59XG5cblxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgUmVuZGVyZXIyLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnLi4vc2NyaXB0cy9tYXRoJztcbmltcG9ydCAqIGFzIGRvbSBmcm9tICcuLi9zY3JpcHRzL2RvbSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEcmFnU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSAge1xuICBkcmFnQ3Vyc29yID0gJ21vdmUnO1xuICByZW5kZXJlcjogUmVuZGVyZXIyO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBjcmVhdGVEcmFnT3ZlcmxheShlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcbiAgICBjb25zdCByZXN1bHQgPSBlbGVtZW50LmNsb25lTm9kZSh0cnVlKSBhcyBIVE1MRWxlbWVudDtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHJlc3VsdCwgJ2hwYy1kcmFnLW92ZXJsYXknKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHJlc3VsdCwgJ2N1cnNvcicsIHRoaXMuZHJhZ0N1cnNvcik7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShyZXN1bHQsICd6SW5kZXgnLCAxMDAwMCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGRyYWdFbGVtZW50c0J5KGRlbHRhOiBQb2ludCwgZWxlbWVudHM6IEhUTUxFbGVtZW50W10pIHtcbiAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgZG9tLm1vdmVFbGVtZW50QnkodGhpcy5yZW5kZXJlciwgZWxlbWVudCwgZGVsdGEpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgY2FuRHJhZyhlbGVtZW50OiBFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGRvbS5lbGVtZW50RHJhZ2dhYmxlKGVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBjaGlsZCBIVE1MRWxlbWVudCBsb2NhdGVkIGF0IHRoZSB0b3AtbGVmdCBjb29yZGluYXRlcyBvZiB0aGVcbiAgICogZHJhZ2dlZEVsZW1lbnQgd2l0aCBhbiBhdHRyaWJ1dGUgb2YgaXMtZHJvcHpvbmUgc2V0IHRvIHRydWUuXG4gICAqXG4gICAqIEBwYXJhbSBIVE1MRWxlbWVudCBkcmFnZ2VkRWxlbWVudFxuICAgKiBAcGFyYW0gSFRNTEVsZW1lbnQgcGFyZW50XG4gICAqIEByZXR1cm5zIEhUTUxFbGVtZW50XG4gICAqL1xuICBmaW5kRHJvcFpvbmUoZHJhZ2dlZEVsZW1lbnQ6IEhUTUxFbGVtZW50LCBwYXJlbnQ6IEhUTUxFbGVtZW50LCBleGNsdWRlID0gW10pOiBIVE1MRWxlbWVudCB7XG4gICAgaWYgKCFkcmFnZ2VkRWxlbWVudCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGV4Y2x1ZGUucHVzaChkcmFnZ2VkRWxlbWVudCk7XG4gICAgY29uc3QgcG9zID0gZG9tLm9mZnNldChkcmFnZ2VkRWxlbWVudCk7XG4gICAgY29uc3QgZWwgPSBkb20uZWxlbWVudEF0UG9pbnQocG9zLCBwYXJlbnQsIGV4Y2x1ZGUpO1xuICAgIGlmIChlbCAhPT0gcGFyZW50ICYmIGVsLmNsYXNzTGlzdC5jb250YWlucygnaHBjLWRyb3B6b25lJykpIHtcbiAgICAgIHJldHVybiBlbDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB1cGRhdGVEcm9wWm9uZShkcmFnZ2VkRWxlbWVudDogSFRNTEVsZW1lbnQsIHBhcmVudDogSFRNTEVsZW1lbnQsIGV4Y2x1ZGUgPSBbXSk6IEhUTUxFbGVtZW50IHtcbiAgICB0aGlzLmNsZWFyRHJvcFpvbmVzKHBhcmVudCk7XG4gICAgY29uc3QgZHJvcFpvbmUgPSB0aGlzLmZpbmREcm9wWm9uZShkcmFnZ2VkRWxlbWVudCwgcGFyZW50LCBleGNsdWRlKTtcbiAgICBpZiAoZHJvcFpvbmUpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZHJvcFpvbmUsICdhY3RpdmUnKTtcbiAgICB9XG4gICAgcmV0dXJuIGRyb3Bab25lO1xuICB9XG5cbiAgY2xlYXJEcm9wWm9uZXMocGFyZW50OiBIVE1MRWxlbWVudCkge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gZG9tLmNoaWxkcmVuT2YocGFyZW50LCB0cnVlKTtcbiAgICBjaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MoY2hpbGQsICdhY3RpdmUnKTtcbiAgICB9KTtcbiAgfVxuXG4gIGRyb3BFbGVtZW50KGRyb3Bab25lOiBIVE1MRWxlbWVudCwgZHJhZ2dlZEVsZW1lbnQ6IEhUTUxFbGVtZW50LCAgcGFyZW50OiBIVE1MRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZG9tLmNoYW5nZVBhcmVudChkcmFnZ2VkRWxlbWVudCwgZHJvcFpvbmUsIHRoaXMucmVuZGVyZXIpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAvLyAtLSB0b2RvIGxvZyBlcnJvcjtcbiAgICAgIH1cbiAgfVxuXG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJlciA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUsIFJlbmRlcmVyMiwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBkb20gZnJvbSAnLi4vc2NyaXB0cy9kb20nO1xuaW1wb3J0IHsgUG9pbnQsIFJlY3QgfSBmcm9tICcuLi9zY3JpcHRzL21hdGgnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2l6ZVNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICByZW5kZXJlcjogUmVuZGVyZXIyO1xuXG4gIGdldCBpc0hvcml6b250YWxTaXppbmcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZ3JpcEtleSA9PT0gJ2xtJyB8fCB0aGlzLmdyaXBLZXkgPT09ICdybSc7XG4gIH1cblxuICBnZXQgaXNWZXJ0aWNhbFNpemluZygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5ncmlwS2V5ID09PSAndG0nIHx8IHRoaXMuZ3JpcEtleSA9PT0gJ2JtJztcbiAgfVxuXG4gIGdldCBpc1NpemluZ0Zyb21Ub3AoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuZ3JpcEtleSA9PT0gJ3RsJyB8fCB0aGlzLmdyaXBLZXkgPT09ICd0bScgfHwgdGhpcy5ncmlwS2V5ID09PSAndHInXG4gICAgKTtcbiAgfVxuICBnZXQgaXNTaXppbmdGcm9tTGVmdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5ncmlwS2V5ID09PSAndGwnIHx8IHRoaXMuZ3JpcEtleSA9PT0gJ2xtJyB8fCB0aGlzLmdyaXBLZXkgPT09ICdibCdcbiAgICApO1xuICB9XG4gIGdldCBpc1JvdGF0aW5nKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmdyaXBLZXkgPT09ICdyb3RhdGUnO1xuICB9XG5cbiAgZ2V0IG9yaWVudGF0aW9uKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZ3JpcEtleS5zdWJzdHIoMCwgMSk7XG4gIH1cblxuICBnZXQgcmV2ZXJzZU9yaWVudGF0aW9uKCk6IHN0cmluZyB7XG4gICAgY29uc3QgbyA9IHRoaXMub3JpZW50YXRpb247XG4gICAgcmV0dXJuIHRoaXMub3JpZW50YXRpb25zLmZpbmQoeCA9PiB4LmluY2x1ZGVzKG8pKS5yZXBsYWNlKG8sICcnKTtcbiAgfVxuXG4gIG1pbkhlaWdodCA9IDQwO1xuICBtaW5XaWR0aCA9IDQwO1xuXG4gIGN1cnNvcjogc3RyaW5nO1xuICBncmlwS2V5OiBzdHJpbmc7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBvcmllbnRhdGlvbnMgPSBbJ3RiJywgJ3JsJ107XG5cbiAgcmVtb3ZlU2l6aW5nR3JpcHMocGFyZW50OiBIVE1MRWxlbWVudCwgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgIEFycmF5LmZyb20ocGFyZW50LmNoaWxkcmVuKS5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgIGlmIChjaGlsZC5jbGFzc05hbWUuaW5kZXhPZignZ3JpcC1jb250YWluZXInKSA+IC0xKSB7XG4gICAgICAgIHJlbmRlcmVyLnJlbW92ZUNoaWxkKHBhcmVudCwgY2hpbGQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgY3JlYXRlU2l6aW5nT3ZlcmxheShlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcbiAgICBjb25zdCByZXN1bHQgPSBlbGVtZW50LmNsb25lTm9kZShmYWxzZSkgYXMgSFRNTEVsZW1lbnQ7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhyZXN1bHQsICdocGMtc2l6ZXItb3ZlcmxheScpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUocmVzdWx0LCAnYm9yZGVyLXN0eWxlJywgJ3NvbGlkJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShyZXN1bHQsICdjdXJzb3InLCAnaW5oZXJpdCcpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBzaXplRWxlbWVudHNCeShkZWx0YTogUG9pbnQsIGVsZW1lbnRzOiBIVE1MRWxlbWVudFtdKSB7XG4gICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgIHRoaXMuc2l6ZUVsZW1lbnRCeShkZWx0YSwgZWxlbWVudCk7XG4gICAgfSk7XG4gIH1cblxuICBzaXplRWxlbWVudEJ5KGRlbHRhOiBQb2ludCwgZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICBjb25zdCBjdXJyZW50Qm91bmRzID0gZG9tLmVsZW1lbnRCb3VuZHMoZWxlbWVudCk7XG4gICAgbGV0IGhlaWdodCA9IGN1cnJlbnRCb3VuZHMuaGVpZ2h0ICsgZGVsdGEueTtcbiAgICBsZXQgd2lkdGggPSBjdXJyZW50Qm91bmRzLndpZHRoICsgZGVsdGEueDtcbiAgICBsZXQgbGVmdCA9IGN1cnJlbnRCb3VuZHMubGVmdDtcbiAgICBsZXQgdG9wID0gY3VycmVudEJvdW5kcy50b3A7XG5cbiAgICBpZiAodGhpcy5pc1NpemluZ0Zyb21Ub3ApIHtcbiAgICAgIHRvcCA9IGN1cnJlbnRCb3VuZHMudG9wICsgZGVsdGEueTtcbiAgICAgIGhlaWdodCA9IGN1cnJlbnRCb3VuZHMuaGVpZ2h0IC0gZGVsdGEueTtcbiAgICAgIGlmICh0aGlzLmdyaXBLZXkgPT09ICd0bScpIHtcbiAgICAgICAgd2lkdGggPSBjdXJyZW50Qm91bmRzLndpZHRoO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5pc1NpemluZ0Zyb21MZWZ0KSB7XG4gICAgICBsZWZ0ID0gY3VycmVudEJvdW5kcy5sZWZ0ICsgZGVsdGEueDtcbiAgICAgIHdpZHRoID0gY3VycmVudEJvdW5kcy53aWR0aCAtIGRlbHRhLng7XG4gICAgICBpZiAodGhpcy5ncmlwS2V5ID09PSAnbG0nKSB7XG4gICAgICAgIGhlaWdodCA9IGN1cnJlbnRCb3VuZHMuaGVpZ2h0O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmlzSG9yaXpvbnRhbFNpemluZykge1xuICAgICAgaGVpZ2h0ID0gY3VycmVudEJvdW5kcy5oZWlnaHQ7XG4gICAgfVxuICAgIGlmICh0aGlzLmlzVmVydGljYWxTaXppbmcpIHtcbiAgICAgIHdpZHRoID0gY3VycmVudEJvdW5kcy53aWR0aDtcbiAgICB9XG5cbiAgICBsZXQgYm91bmRzUmVjdCA9IG5ldyBSZWN0KGxlZnQsIHRvcCwgd2lkdGgsIGhlaWdodCk7XG4gICAgaWYgKHdpZHRoIDwgdGhpcy5taW5XaWR0aCB8fCBoZWlnaHQgPCB0aGlzLm1pbkhlaWdodCkge1xuICAgICAgYm91bmRzUmVjdCA9IGN1cnJlbnRCb3VuZHM7XG4gICAgfVxuICAgIGRvbS5zZXRFbGVtZW50UmVjdCh0aGlzLnJlbmRlcmVyLCBib3VuZHNSZWN0LCBlbGVtZW50KTtcbiAgfVxuXG4gIHByZXBhcmVUb1NpemUoKSB7fVxuXG4gIGNhblNpemUoZWxlbWVudDogRWxlbWVudCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBkb20uZWxlbWVudFNpemFibGUoZWxlbWVudCk7XG4gIH1cblxuICBhZGRTaXppbmdHcmlwcyhwYXJlbnRFbDogSFRNTEVsZW1lbnQsIHJlbmRlcmVyOiBSZW5kZXJlcjIpOiB2b2lkIHtcbiAgICBjb25zdCBodG1sID0gYFxuICAgICAgPGRpdiBjbGFzcz1cImdyaXAtY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJncmlwLWNvbnRhaW5lci1sXCI+XG4gICAgICAgICAgPGRpdiBncmlwS2V5PVwidGxcIiBjbGFzcz1cImdyaXAgZ3JpcC10bFwiPjwvZGl2PlxuICAgICAgICAgIDxkaXYgZ3JpcEtleT1cImxtXCIgY2xhc3M9XCJncmlwIGdyaXAtbG1cIj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGdyaXBLZXk9XCJibFwiIGNsYXNzPVwiZ3JpcCBncmlwLWJsXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JpcC1jb250YWluZXItbVwiPlxuICAgICAgICAgIDxkaXYgZ3JpcEtleT1cInRtXCIgY2xhc3M9XCJncmlwIGdyaXAtdG1cIj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGdyaXBLZXk9XCJibVwiIGNsYXNzPVwiZ3JpcCBncmlwLWJtXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JpcC1jb250YWluZXItclwiPlxuICAgICAgICAgIDxkaXYgZ3JpcEtleT1cInRyXCIgY2xhc3M9XCJncmlwIGdyaXAtdHJcIj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGdyaXBLZXk9XCJybVwiIGNsYXNzPVwiZ3JpcCBncmlwLXJtXCI+PC9kaXY+XG4gICAgICAgICAgPGRpdiBncmlwS2V5PVwiYnJcIiBjbGFzcz1cImdyaXAgZ3JpcC1iclwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICBgO1xuICAgIC8vIGNvbnN0IHNlbGVjdG9yID0gcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcmVuZGVyZXIuc2V0UHJvcGVydHkocGFyZW50RWwsICdpbm5lckhUTUwnLCBodG1sKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBSZW5kZXJlcjIsIE9uRGVzdHJveSwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBJbmplY3Rvcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWN0LCBQb2ludCB9IGZyb20gJy4uL3NjcmlwdHMvbWF0aCc7XG5pbXBvcnQgKiBhcyBkb20gZnJvbSAnLi4vc2NyaXB0cy9kb20nO1xuaW1wb3J0IHsgU2l6ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9zaXplLnNlcnZpY2UnO1xuaW1wb3J0IHsgRHJhZ1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9kcmFnLnNlcnZpY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTZWxlY3RvciB7XG4gIHNlbGVjdG9yRWw6IEhUTUxFbGVtZW50O1xuICBvdmVybGF5OiBIVE1MRWxlbWVudDtcbiAgY2xpZW50RWw6IEhUTUxFbGVtZW50O1xufVxuXG5leHBvcnQgZW51bSBTZWxlY3Rpb25TdGF0ZSB7XG4gIERyYWdnYWJsZSxcbiAgU2l6YWJsZSxcbiAgSWRsZVxufVxuXG5leHBvcnQgZW51bSBOdWRnZVR5cGUge1xuICBPdmVybGF5LFxuICBTZWxlY3RvclxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VsZWN0b3JTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfbGFzc29TZWxlY3RvcjogSFRNTEVsZW1lbnQgPSBudWxsO1xuICBwcml2YXRlIF9zZWxlY3RvcnMgPSBuZXcgQXJyYXk8SVNlbGVjdG9yPigpO1xuXG4gIHNjYWxlOiBudW1iZXI7XG4gIGxhc3NvQ3Vyc29yID0gJ2Nyb3NzaGFpcic7XG4gIHJlbmRlcmVyOiBSZW5kZXJlcjI7XG4gIGludGVyYWN0aW9uSG9zdDogSFRNTEVsZW1lbnQ7XG4gIHNob3VsZEFsbG93U2l6aW5nID0gdHJ1ZTtcbiAgaXNMYXNzb1NlbGVjdGFibGUgPSB0cnVlO1xuXG4gIHByaXZhdGUgX2FjdGl2ZVNlbGVjdG9yOiBJU2VsZWN0b3I7XG4gIGdldCBhY3RpdmVTZWxlY3RvcigpOiBJU2VsZWN0b3Ige1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmVTZWxlY3RvcjtcbiAgfVxuXG4gIHByaXZhdGUgX3N0YXRlOiBTZWxlY3Rpb25TdGF0ZTtcbiAgcHVibGljIGdldCBzdGF0ZSgpOiBTZWxlY3Rpb25TdGF0ZSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YXRlO1xuICB9XG4gIHB1YmxpYyBzZXQgc3RhdGUodmFsdWU6IFNlbGVjdGlvblN0YXRlKSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl9zdGF0ZSkge1xuICAgICAgdGhpcy5fc3RhdGUgPSB2YWx1ZTtcbiAgICAgIGlmICh0aGlzLnN0YXRlICE9PSBTZWxlY3Rpb25TdGF0ZS5JZGxlKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlU2VsZWN0aW9uT3ZlcmxheXMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXQgaGFzTGFzc28oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2xhc3NvU2VsZWN0b3IgIT09IG51bGw7XG4gIH1cblxuICBnZXQgaGFzRWxlbWVudFNlbGVjdG9ycygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLl9zZWxlY3RvcnMuZW50cmllcygpKS5sZW5ndGggPiAwO1xuICB9XG5cbiAgZ2V0IHNlbGVjdG9ycygpOiBJU2VsZWN0b3JbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdG9ycztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXByZXNlbnRzIGFsbCBzZWxlY3RvciBlbGVtZW50cyBob3ZlcmluZyBhYm92ZSB0aGUgY2FwdHVyZWQgZWxlbWVudHNcbiAgICovXG4gIGdldCBzZWxlY3RvckVsZW1lbnRzKCk6IEhUTUxFbGVtZW50W10ge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdG9ycy5tYXAoeCA9PiB4LnNlbGVjdG9yRWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudHMgYWxsIHRoZSBjYXB0dXJlZCBlbGVtZW50c1xuICAgKlxuICAgKi9cbiAgZ2V0IGNsaWVudHMoKTogSFRNTEVsZW1lbnRbXSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0b3JzLm1hcCh4ID0+IHguY2xpZW50RWwpO1xuICB9XG5cbiAgICBnZXQgc2VsZWN0YWJsZUVsZW1lbnRzKCk6IEhUTUxFbGVtZW50W10ge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gZG9tLmNoaWxkcmVuT2YodGhpcy5pbnRlcmFjdGlvbkhvc3QpLmZpbHRlcih4ID0+IGRvbS5pc1NlbGVjdGFibGUoeCkpO1xuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX3NpemVTZXJ2aWNlOiBTaXplU2VydmljZSxcbiAgICBwcml2YXRlIF9kcmFnU2VydmljZTogRHJhZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBfY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSBfaW5qZWN0b3I6IEluamVjdG9yXG4gICkge31cblxuICBjcmVhdGVsYXNzb1NlbGVjdG9yKGxlZnQ6IG51bWJlciwgdG9wOiBudW1iZXIpIHtcbiAgICB0aGlzLmNsZWFyU2VsZWN0b3JzKCk7XG4gICAgaWYgKHRoaXMuaXNMYXNzb1NlbGVjdGFibGUpIHtcbiAgICAgIGNvbnN0IHNlbGVjdG9yID0gdGhpcy5jcmVhdGVTZWxlY3RvcihsZWZ0LCB0b3AsIHRoaXMuaW50ZXJhY3Rpb25Ib3N0KTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5pbnRlcmFjdGlvbkhvc3QsICdjdXJzb3InLCB0aGlzLmxhc3NvQ3Vyc29yKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Moc2VsZWN0b3IsICdocGMtbGFzc28tc2VsZWN0b3InKTtcbiAgICAgIHRoaXMuX2xhc3NvU2VsZWN0b3IgPSBzZWxlY3RvcjtcbiAgICB9XG4gIH1cblxuICByZW1vdmVsYXNzb1NlbGVjdG9yKCkge1xuICAgIGlmICh0aGlzLl9sYXNzb1NlbGVjdG9yKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMuaW50ZXJhY3Rpb25Ib3N0LCB0aGlzLl9sYXNzb1NlbGVjdG9yKTtcbiAgICAgIHRoaXMuX2xhc3NvU2VsZWN0b3IgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHNlbGVjdG9yQXRQb2ludChwb2ludDogUG9pbnQpOiBJU2VsZWN0b3Ige1xuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLnNlbGVjdG9ycy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGNvbnN0IHNlbGVjdG9yID0gdGhpcy5zZWxlY3RvcnNbaW5kZXhdO1xuICAgICAgY29uc3QgZWxlbWVudCA9IHNlbGVjdG9yLnNlbGVjdG9yRWw7XG4gICAgICBjb25zdCBlbFJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgY29uc3QgcmVjdCA9IG5ldyBSZWN0KFxuICAgICAgICBlbFJlY3QubGVmdCxcbiAgICAgICAgZWxSZWN0LnRvcCxcbiAgICAgICAgZWxSZWN0LndpZHRoLFxuICAgICAgICBlbFJlY3QuaGVpZ2h0XG4gICAgICApO1xuICAgICAgaWYgKGRvbS5wb2ludEluUmVjdChwb2ludCwgcmVjdCkpIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdG9yO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNlbGVjdENhcHR1cmVkRWxlbWVudHMoKSB7XG4gICAgY29uc3QgcmVjdCA9IGRvbS5lbGVtZW50Qm91bmRzKHRoaXMuX2xhc3NvU2VsZWN0b3IpO1xuICAgIGNvbnN0IGNhcHR1cmVkRWxlbWVudHMgPSBkb20uZWxlbWVudHNBdFJlY3QodGhpcy5pbnRlcmFjdGlvbkhvc3QsIHJlY3QsIFtcbiAgICAgIHRoaXMuX2xhc3NvU2VsZWN0b3JcbiAgICBdKTtcbiAgICBjYXB0dXJlZEVsZW1lbnRzLmZvckVhY2goZWwgPT4ge1xuICAgICAgdGhpcy5zZWxlY3RFbGVtZW50KGVsLCBmYWxzZSwgdGhpcy5zaG91bGRBbGxvd1NpemluZyk7XG4gICAgfSk7XG4gICAgdGhpcy5yZW1vdmVsYXNzb1NlbGVjdG9yKCk7XG4gIH1cblxuICB1blNlbGVjdEFsbCgpIHtcbiAgICB0aGlzLmNsZWFyU2VsZWN0b3JzKCk7XG4gIH1cblxuICB1blNlbGVjdEVsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICBjb25zdCBzZWxlY3RvciA9IHRoaXMuc2VsZWN0b3JzLmZpbmQoeCA9PiB4LmNsaWVudEVsID09PSBlbGVtZW50KTtcbiAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgIHRoaXMuY2xlYXJTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0QWxsKCkge1xuICAgIHRoaXMuY2xlYXJTZWxlY3RvcnMoKTtcbiAgICBjb25zdCBjaGlsZHJlbiA9IHRoaXMuc2VsZWN0YWJsZUVsZW1lbnRzO1xuICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICB0aGlzLnNlbGVjdEVsZW1lbnQoY2hpbGQsIGZhbHNlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNlbGVjdEVsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQsIGNsZWFyRmlyc3QgPSB0cnVlLCBpc1NpemFibGUgPSB0cnVlKSB7XG4gICAgbGV0IHNlbGVjdG9yID0gdGhpcy5zZWxlY3RvcnMuZmluZChcbiAgICAgIHggPT5cbiAgICAgICAgeC5zZWxlY3RvckVsID09PSBlbGVtZW50IHx8XG4gICAgICAgIHguY2xpZW50RWwgPT09IGVsZW1lbnQgfHxcbiAgICAgICAgeC5vdmVybGF5ID09PSBlbGVtZW50XG4gICAgKTtcbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2dyaXBLZXknKSkge1xuICAgICAgc2VsZWN0b3IgPSB0aGlzLnNlbGVjdG9ycy5maW5kKFxuICAgICAgICB4ID0+IHguc2VsZWN0b3JFbCA9PT0gZWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudFxuICAgICAgKTtcbiAgICAgIGNvbnN0IGN1cnNvciA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkuY3Vyc29yO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmludGVyYWN0aW9uSG9zdCwgJ2N1cnNvcicsIGN1cnNvcik7XG4gICAgICB0aGlzLl9zaXplU2VydmljZS5ncmlwS2V5ID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2dyaXBLZXknKTtcbiAgICAgIHRoaXMuc3RhdGUgPSBTZWxlY3Rpb25TdGF0ZS5TaXphYmxlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgdGhpcy5zdGF0ZSA9IFNlbGVjdGlvblN0YXRlLklkbGU7XG4gICAgICB0aGlzLl9hY3RpdmVTZWxlY3RvciA9IHNlbGVjdG9yO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY2xlYXJGaXJzdCkge1xuICAgICAgdGhpcy5jbGVhclNlbGVjdG9ycygpO1xuICAgIH1cbiAgICBjb25zdCByZWN0ID0gZG9tLmVsZW1lbnRCb3VuZHMoZWxlbWVudCk7XG4gICAgY29uc3Qgc2VsZWN0b3JFbCA9IHRoaXMuY3JlYXRlU2VsZWN0b3IoXG4gICAgICByZWN0LmxlZnQsXG4gICAgICByZWN0LnRvcCxcbiAgICAgIGVsZW1lbnQucGFyZW50RWxlbWVudFxuICAgICk7XG4gICAgc2VsZWN0b3JFbFsnaXNTZWxlY3RvciddID0gdHJ1ZTtcbiAgICBkb20uYXNzaWduQm91bmRpbmdSZWN0KHRoaXMucmVuZGVyZXIsIGVsZW1lbnQsIHNlbGVjdG9yRWwpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Moc2VsZWN0b3JFbCwgJ2hwYy1lbGVtZW50LXNlbGVjdG9yJyk7XG4gICAgc2VsZWN0b3IgPSB7IGNsaWVudEVsOiBlbGVtZW50LCBzZWxlY3RvckVsOiBzZWxlY3RvckVsLCBvdmVybGF5OiBudWxsIH07XG4gICAgdGhpcy5fc2VsZWN0b3JzLnB1c2goc2VsZWN0b3IpO1xuICAgIHRoaXMuX2FjdGl2ZVNlbGVjdG9yID0gc2VsZWN0b3I7XG4gICAgaWYgKGlzU2l6YWJsZSAmJiB0aGlzLl9zaXplU2VydmljZS5jYW5TaXplKGVsZW1lbnQpKSB7XG4gICAgICB0aGlzLl9zaXplU2VydmljZS5hZGRTaXppbmdHcmlwcyhzZWxlY3RvckVsLCB0aGlzLnJlbmRlcmVyKTtcbiAgICB9XG4gICAgaWYgKGRvbS5lbGVtZW50RHJhZ2dhYmxlKGVsZW1lbnQpKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuaW50ZXJhY3Rpb25Ib3N0LCAnY3Vyc29yJywgJ21vdmUnKTtcbiAgICB9XG4gICAgdGhpcy5zdGF0ZSA9IFNlbGVjdGlvblN0YXRlLklkbGU7XG4gIH1cblxuICBjcmVhdGVTZWxlY3Rpb25PdmVybGF5cygpIHtcbiAgICB0aGlzLnNlbGVjdG9ycy5mb3JFYWNoKHNlbGVjdG9yID0+IHtcbiAgICAgIHRoaXMuX3NpemVTZXJ2aWNlLnJlbW92ZVNpemluZ0dyaXBzKHNlbGVjdG9yLnNlbGVjdG9yRWwsIHRoaXMucmVuZGVyZXIpO1xuICAgICAgaWYgKHNlbGVjdG9yLm92ZXJsYXkpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZChcbiAgICAgICAgICBzZWxlY3Rvci5zZWxlY3RvckVsLnBhcmVudEVsZW1lbnQsXG4gICAgICAgICAgc2VsZWN0b3Iub3ZlcmxheVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICB0aGlzLnN0YXRlID09PSBTZWxlY3Rpb25TdGF0ZS5TaXphYmxlICYmXG4gICAgICAgIHRoaXMuX3NpemVTZXJ2aWNlLmNhblNpemUoc2VsZWN0b3IuY2xpZW50RWwpXG4gICAgICApIHtcbiAgICAgICAgc2VsZWN0b3Iub3ZlcmxheSA9IHRoaXMuX3NpemVTZXJ2aWNlLmNyZWF0ZVNpemluZ092ZXJsYXkoXG4gICAgICAgICAgc2VsZWN0b3Iuc2VsZWN0b3JFbFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgdGhpcy5zdGF0ZSA9PT0gU2VsZWN0aW9uU3RhdGUuRHJhZ2dhYmxlICYmXG4gICAgICAgIHRoaXMuX2RyYWdTZXJ2aWNlLmNhbkRyYWcoc2VsZWN0b3IuY2xpZW50RWwpXG4gICAgICApIHtcbiAgICAgICAgc2VsZWN0b3Iub3ZlcmxheSA9IHRoaXMuX2RyYWdTZXJ2aWNlLmNyZWF0ZURyYWdPdmVybGF5KFxuICAgICAgICAgIHNlbGVjdG9yLmNsaWVudEVsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAoc2VsZWN0b3Iub3ZlcmxheSkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKFxuICAgICAgICAgIHNlbGVjdG9yLnNlbGVjdG9yRWwucGFyZW50RWxlbWVudCxcbiAgICAgICAgICBzZWxlY3Rvci5vdmVybGF5XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjcmVhdGVTZWxlY3RvcihsZWZ0OiBudW1iZXIsIHRvcDogbnVtYmVyLCBwYXJlbnQ6IEVsZW1lbnQpOiBIVE1MRWxlbWVudCB7XG4gICAgY29uc3Qgc2VsZWN0b3IgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQocGFyZW50LCBzZWxlY3Rvcik7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShzZWxlY3RvciwgJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShzZWxlY3RvciwgJ2xlZnQnLCBsZWZ0ICsgJ3B4Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShzZWxlY3RvciwgJ3RvcCcsIHRvcCArICdweCcpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoc2VsZWN0b3IsICdib3hTaXppbmcnLCAnYm9yZGVyLWJveCcpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoc2VsZWN0b3IsICd6SW5kZXgnLCAnMTAwMDAnKTtcbiAgICByZXR1cm4gc2VsZWN0b3I7XG4gIH1cblxuICBjbGVhclNlbGVjdG9ycygpIHtcbiAgICB0aGlzLnJlbW92ZWxhc3NvU2VsZWN0b3IoKTtcbiAgICBjb25zdCBzZWxlY3RvcnMgPSBBcnJheS5mcm9tKHRoaXMuX3NlbGVjdG9ycy52YWx1ZXMoKSk7XG4gICAgc2VsZWN0b3JzLmZvckVhY2goc2VsZWN0b3IgPT4ge1xuICAgICAgdGhpcy5jbGVhclNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICB9KTtcbiAgICB0aGlzLl9zZWxlY3RvcnMgPSBbXTtcbiAgfVxuXG4gIGNsZWFyU2VsZWN0b3Ioc2VsZWN0b3I6IElTZWxlY3Rvcikge1xuICAgIGlmIChzZWxlY3RvciA9PT0gdGhpcy5fYWN0aXZlU2VsZWN0b3IpIHtcbiAgICAgIHRoaXMuX2FjdGl2ZVNlbGVjdG9yID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZChcbiAgICAgIHNlbGVjdG9yLnNlbGVjdG9yRWwucGFyZW50RWxlbWVudCxcbiAgICAgIHNlbGVjdG9yLnNlbGVjdG9yRWxcbiAgICApO1xuICAgIGlmIChzZWxlY3Rvci5vdmVybGF5KSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKFxuICAgICAgICBzZWxlY3Rvci5vdmVybGF5LnBhcmVudEVsZW1lbnQsXG4gICAgICAgIHNlbGVjdG9yLm92ZXJsYXlcbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMuc2VsZWN0b3JzLnNwbGljZSh0aGlzLnNlbGVjdG9ycy5pbmRleE9mKHNlbGVjdG9yKSwgMSk7XG4gIH1cblxuICByZXNpemVMYXNzbyh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgaW5pdGlhbFBvczogUG9pbnQpIHtcbiAgICBpZiAoaGVpZ2h0IDwgMCkge1xuICAgICAgaGVpZ2h0ID0gTWF0aC5hYnMoaGVpZ2h0KTtcbiAgICAgIGNvbnN0IHRvcCA9IGluaXRpYWxQb3MueSAtIGhlaWdodDtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbGFzc29TZWxlY3RvciwgJ3RvcCcsIHRvcCArICdweCcpO1xuICAgIH1cbiAgICBpZiAod2lkdGggPCAwKSB7XG4gICAgICB3aWR0aCA9IE1hdGguYWJzKHdpZHRoKTtcbiAgICAgIGNvbnN0IGxlZnQgPSBpbml0aWFsUG9zLnggLSB3aWR0aDtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbGFzc29TZWxlY3RvciwgJ2xlZnQnLCBsZWZ0ICsgJ3B4Jyk7XG4gICAgfVxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbGFzc29TZWxlY3RvciwgJ2hlaWdodCcsIGhlaWdodCArICdweCcpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbGFzc29TZWxlY3RvciwgJ3dpZHRoJywgd2lkdGggKyAncHgnKTtcbiAgfVxuXG4gIHJlc2l6ZVNlbGVjdG9yc0J5KGRlbHRhOiBQb2ludCkge1xuICAgIGNvbnN0IHNlbGVjdG9ycyA9IHRoaXMuc2VsZWN0b3JzLm1hcCh4ID0+IHguc2VsZWN0b3JFbCk7XG4gICAgdGhpcy5fc2l6ZVNlcnZpY2Uuc2l6ZUVsZW1lbnRzQnkoZGVsdGEsIHNlbGVjdG9ycyk7XG4gIH1cblxuICByZXNpemVPdmVybGF5c0J5KGRlbHRhOiBQb2ludCkge1xuICAgIGNvbnN0IG92ZXJsYXlzID0gdGhpcy5zZWxlY3RvcnMubWFwKHggPT4geC5vdmVybGF5KTtcbiAgICB0aGlzLl9zaXplU2VydmljZS5zaXplRWxlbWVudHNCeShkZWx0YSwgb3ZlcmxheXMpO1xuICB9XG5cbiAgbW92ZVNlbGVjdG9yc0J5KGRlbHRhOiBQb2ludCkge1xuICAgIGNvbnN0IHNlbGVjdG9ycyA9IHRoaXMuc2VsZWN0b3JzLm1hcCh4ID0+IHgub3ZlcmxheSk7XG4gICAgdGhpcy5fZHJhZ1NlcnZpY2UuZHJhZ0VsZW1lbnRzQnkoZGVsdGEsIHNlbGVjdG9ycyk7XG4gIH1cblxuICBtb3ZlT3ZlcmxheXNCeShkZWx0YTogUG9pbnQpIHtcbiAgICBjb25zdCBvdmVybGF5cyA9IHRoaXMuc2VsZWN0b3JzLm1hcCh4ID0+IHgub3ZlcmxheSk7XG4gICAgdGhpcy5fZHJhZ1NlcnZpY2UuZHJhZ0VsZW1lbnRzQnkoZGVsdGEsIG92ZXJsYXlzKTtcbiAgfVxuXG4gIHJlc2VsZWN0KCkge1xuICAgIGNvbnN0IGNsaWVudHMgPSB0aGlzLmNsaWVudHM7XG4gICAgdGhpcy5jbGVhclNlbGVjdG9ycygpO1xuICAgIGNsaWVudHMuZm9yRWFjaChjbGllbnQgPT4ge1xuICAgICAgdGhpcy5zZWxlY3RFbGVtZW50KGNsaWVudCwgZmFsc2UsIHRoaXMuc2hvdWxkQWxsb3dTaXppbmcpO1xuICAgIH0pO1xuICB9XG5cbiAgbnVkZ2VCeShkZWx0YTogUG9pbnQsIG5vZGdlVHlwZTogTnVkZ2VUeXBlKSB7XG4gICAgaWYgKGRlbHRhLnggPT09IDAgJiYgZGVsdGEueSA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5zdGF0ZSA9PT0gU2VsZWN0aW9uU3RhdGUuU2l6YWJsZSkge1xuICAgICAgaWYgKG5vZGdlVHlwZSA9PT0gTnVkZ2VUeXBlLlNlbGVjdG9yKSB7XG4gICAgICAgIHRoaXMucmVzaXplU2VsZWN0b3JzQnkoZGVsdGEpO1xuICAgICAgfVxuICAgICAgaWYgKG5vZGdlVHlwZSA9PT0gTnVkZ2VUeXBlLk92ZXJsYXkpIHtcbiAgICAgICAgdGhpcy5yZXNpemVPdmVybGF5c0J5KGRlbHRhKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUgPT09IFNlbGVjdGlvblN0YXRlLkRyYWdnYWJsZSkge1xuICAgICAgaWYgKG5vZGdlVHlwZSA9PT0gTnVkZ2VUeXBlLlNlbGVjdG9yKSB7XG4gICAgICAgIHRoaXMubW92ZVNlbGVjdG9yc0J5KGRlbHRhKTtcbiAgICAgIH1cbiAgICAgIGlmIChub2RnZVR5cGUgPT09IE51ZGdlVHlwZS5PdmVybGF5KSB7XG4gICAgICAgIHRoaXMubW92ZU92ZXJsYXlzQnkoZGVsdGEpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXRlID0gU2VsZWN0aW9uU3RhdGUuRHJhZ2dhYmxlO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuY2xlYXJTZWxlY3RvcnMoKTtcbiAgICB0aGlzLnJlbmRlcmVyID0gbnVsbDtcbiAgICB0aGlzLmludGVyYWN0aW9uSG9zdCA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCB7SW5qZWN0YWJsZSwgUmVuZGVyZXIyLCBPbkRlc3Ryb3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCwgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0fSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFNlbGVjdG9yU2VydmljZSB9IGZyb20gJy4uL3NlbGVjdG9yL3NlbGVjdG9yLnNlcnZpY2UnO1xuaW1wb3J0ICogYXMgZG9tIGZyb20gJy4uL3NjcmlwdHMvZG9tJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEludGVyYWN0aW9uU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgX2RlbGV0ZUVsZW1lbnRTdWJqZWN0ID0gbmV3IFN1YmplY3Q8RWxlbWVudD4oKTtcbiAgZGVsZXRlRWxlbWVudCQgPSB0aGlzLl9kZWxldGVFbGVtZW50U3ViamVjdC5hc09ic2VydmFibGUoKTtcblxuICBwcml2YXRlIF9kZWxldGVFbGVtZW50c1N1YmplY3QgPSBuZXcgU3ViamVjdDxFbGVtZW50W10+KCk7XG4gIGRlbGV0ZUVsZW1lbnRzJCA9IHRoaXMuX2RlbGV0ZUVsZW1lbnRTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuXG4gIHByaXZhdGUgX2RlbGV0ZVNlbGVjdGVkRWxlbWVudHNTdWJqZWN0ID0gbmV3IFN1YmplY3QoKTtcbiAgZGVsZXRlU2VsZWN0ZWRFbGVtZW50cyQgPSB0aGlzLl9kZWxldGVTZWxlY3RlZEVsZW1lbnRzU3ViamVjdC5hc09ic2VydmFibGUoKTtcblxuICBwcml2YXRlIF9hZGRFbGVtZW50U3ViamVjdCA9IG5ldyBTdWJqZWN0PEVsZW1lbnQ+KCk7XG4gIGFkZEVsZW1lbnQkID0gdGhpcy5fYWRkRWxlbWVudFN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG5cbiAgcHJpdmF0ZSBfc2VsZWN0ZWRFbGVtZW50c1N1YmplY3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEVsZW1lbnRbXT4obnVsbCk7XG4gIHNlbGVjdGVkRWxlbWVudHMkID0gdGhpcy5fc2VsZWN0ZWRFbGVtZW50c1N1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG5cbiAgcHJpdmF0ZSBfc2VsZWN0ZWRFbGVtZW50czogRWxlbWVudFtdID0gW107XG4gIGdldCBzZWxlY3RlZEVsZW1lbnRzKCk6IEVsZW1lbnRbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkRWxlbWVudHM7XG4gIH1cbiAgc2V0IHNlbGVjdGVkRWxlbWVudHMoZWxlbWVudHM6IEVsZW1lbnRbXSkge1xuICAgIHRoaXMuX3NlbGVjdGVkRWxlbWVudHMgPSBlbGVtZW50cztcbiAgICB0aGlzLl9zZWxlY3RlZEVsZW1lbnRzU3ViamVjdC5uZXh0KGVsZW1lbnRzKTtcbiAgfVxuICBnZXQgaGFzU2VsZWN0ZWRFbGVtZW50cygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRFbGVtZW50cyAmJiB0aGlzLl9zZWxlY3RlZEVsZW1lbnRzLmxlbmd0aCA+IDA7XG4gIH1cblxuICBnZXQgY2FuU2VsZWN0RWxlbWVudHMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc2VsZWN0YWJsZUVsZW1lbnRzLmxlbmd0aCA+IDA7XG4gIH1cblxuICByZW5kZXJlcjogUmVuZGVyZXIyO1xuICBpbnRlcmFjdGlvbkhvc3Q6IEhUTUxFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlbGVjdGlvblNlcnZpY2U6IFNlbGVjdG9yU2VydmljZSkgeyB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSBhbiBlbGVtZW50IGZyb20gdGhlIGludGVyYWN0aW9uIGhvc3RcbiAgICogQHBhcmFtIGVsZW1lbnQgLSB0aGUgZWxlbWVudCB0byByZW1vdmVcbiAgICogQHBhcmFtIHJlbmRlcmVyIC0gdGhlIHJlbmRlcmVyIHVzZWQgdG8gcmVtb3ZlIHRoZSBlbGVtZW50XG4gICAqL1xuICBkZWxldGVFbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZChlbGVtZW50LnBhcmVudEVsZW1lbnQsIGVsZW1lbnQpO1xuICAgICB0aGlzLl9kZWxldGVFbGVtZW50U3ViamVjdC5uZXh0KGVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSBhIGxpc3Qgb2YgZWxlbWVudHMgZnJvbSB0aGUgaW50ZXJhY3Rpb24gaG9zdFxuICAgKiBAcGFyYW0gZWxlbWVudCAtIHRoZSBlbGVtZW50cyB0byByZW1vdmVcbiAgICogQHBhcmFtIHJlbmRlcmVyIC0gdGhlIHJlbmRlcmVyIHVzZWQgdG8gcmVtb3ZlIHRoZSBlbGVtZW50c1xuICAgKi9cbiAgZGVsZXRlRWxlbWVudHMoZWxlbWVudHM6IEVsZW1lbnRbXSkge1xuICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKGVsZW1lbnQucGFyZW50RWxlbWVudCwgZWxlbWVudCk7XG4gICAgfSk7XG4gICAgdGhpcy5fZGVsZXRlRWxlbWVudHNTdWJqZWN0Lm5leHQoZWxlbWVudHMpO1xuICB9XG5cbiAgZGVsZXRlU2VsZWN0ZWRFbGVtZW50cygpIHtcbiAgICB0aGlzLl9kZWxldGVTZWxlY3RlZEVsZW1lbnRzU3ViamVjdC5uZXh0KCk7XG4gIH1cblxuICBkZWxldGVBbGwoKSB7XG4gICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS51blNlbGVjdEFsbCgpO1xuICAgIGNvbnN0IGNoaWxkcmVuID0gZG9tLmNoaWxkcmVuT2YodGhpcy5pbnRlcmFjdGlvbkhvc3QpO1xuICAgIGZvciAobGV0IGluZGV4ID0gY2hpbGRyZW4ubGVuZ3RoIC0gMTsgaW5kZXggPj0gMDsgaW5kZXgtLSkge1xuICAgICAgY29uc3QgZWxlbWVudCA9IGNoaWxkcmVuW2luZGV4XTtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy5pbnRlcmFjdGlvbkhvc3QsIGVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIGFkZEVsZW1lbnQoZWxlbWVudDogRWxlbWVudCA9IG51bGwpIHtcbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICBlbGVtZW50ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnQsICdocGMtbmV3LWVsZW1lbnQnKTtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShlbGVtZW50LCAnYm94LXNpemluZycsICdib3JkZXItYm94Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShlbGVtZW50LCAncG9zaXRpb24nLCAnYWJzb2x1dGUnKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuaW50ZXJhY3Rpb25Ib3N0LCBlbGVtZW50KTtcbiAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnNlbGVjdEVsZW1lbnQoZWxlbWVudCBhcyBIVE1MRWxlbWVudCk7XG4gICAgdGhpcy5pbnRlcmFjdGlvbkhvc3QuZm9jdXMoKTtcbiAgICB0aGlzLl9hZGRFbGVtZW50U3ViamVjdC5uZXh0KGVsZW1lbnQpO1xuICB9XG5cbiAgYWRkQ29udGFpbmVyKGVsZW1lbnQ6IEVsZW1lbnQgPSBudWxsKSB7XG4gICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICBlbGVtZW50ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZWxlbWVudCwgJ2hwYy1uZXctZWxlbWVudCcpO1xuICAgIH1cbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnQsICdocGMtZHJvcHpvbmUnKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnQsICdocGMtY29udGFpbmVyJyk7XG4gICAgdGhpcy5hZGRFbGVtZW50KGVsZW1lbnQpO1xuICB9XG5cbiAgc2VsZWN0QWxsKCkge1xuICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc2VsZWN0QWxsKCk7XG4gICAgdGhpcy5zZWxlY3RlZEVsZW1lbnRzID0gdGhpcy5fc2VsZWN0aW9uU2VydmljZS5jbGllbnRzO1xuICB9XG5cbiAgdW5TZWxlY3RBbGwoKSB7XG4gICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS51blNlbGVjdEFsbCgpO1xuICAgIHRoaXMuc2VsZWN0ZWRFbGVtZW50cyA9IHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuY2xpZW50cztcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsIE9uSW5pdCwgVmlld0VuY2Fwc3VsYXRpb24sIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBJbnB1dCwgUmVuZGVyZXIyLCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkRlc3Ryb3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGRpc3RpbmN0VW50aWxLZXlDaGFuZ2VkLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEcmFnU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2RyYWcuc2VydmljZSc7XG5pbXBvcnQgeyBTaXplU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3NpemUuc2VydmljZSc7XG5pbXBvcnQgeyBTZWxlY3RvclNlcnZpY2UsIFNlbGVjdGlvblN0YXRlLCBOdWRnZVR5cGUgfSBmcm9tICcuLi9zZWxlY3Rvci9zZWxlY3Rvci5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIGRvbSBmcm9tICcuLi9zY3JpcHRzL2RvbSc7XG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJy4uL3NjcmlwdHMvbWF0aCc7XG5pbXBvcnQgeyBJbnRlcmFjdGlvblNlcnZpY2UgfSBmcm9tICcuL2ludGVyYWN0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3ViamVjdCwgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cblxuZXhwb3J0IHR5cGUgSUNhbmNlbGxhYmxlID0gKCB2YWx1ZTogYW55ICkgID0+IGJvb2xlYW47XG5cbi8qKlxuICogSGFuZGxlcyBzZWxlY3Rpb24sIHNpemluZywgZGVsZXRpb25zLCBhbmQgZHJhZ2dpbmcgaW50ZXJhY3Rpb25zIHdpdGggYW55IGNoaWxkIEVsZW1lbnQuXG4gKi9cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaHBjLWludGVyYWN0aW9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ludGVyYWN0aW9uLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vaW50ZXJhY3Rpb24uY29tcG9uZW50LmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBJbnRlcmFjdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfaXNNb3VzZURvd24gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfbW91c2VEb3duUG9zID0gbmV3IFBvaW50KCk7XG4gIHByaXZhdGUgX2xhc3RNb3VzZVBvczogUG9pbnQ7XG4gIHByaXZhdGUgX2N1cnNvcjogc3RyaW5nO1xuICBwcml2YXRlIF9sYXN0RHJvcFpvbmU6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9kZWxldGVTZWxlY3RlZEVsZW1lbnRzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgX2FkZEVsZW1lbnRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBAVmlld0NoaWxkKCdpbnRlcmFjdGlvbkNvbnRhaW5lcicpXG4gIHByaXZhdGUgX2VsOiBFbGVtZW50UmVmO1xuICBwcml2YXRlIF9rZXlEb3duU3ViamVjdCA9IG5ldyBTdWJqZWN0PEtleWJvYXJkRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFNjYWxlIHZhbHVlIHRvIGFwcGx5IHRvIHRoZSBJbnRlcmFjdGlvbiBob3N0IGVsZW1lbnQuICBUaGUgdmFsdWUgaXMgYXBwbGllZFxuICAgKiB0byBib3RoIHNjYWxlWCBhbmQgc2NhbGVZIG9mIHRoZSBob3N0IGVsZW1lbnQuXG4gICAqL1xuICBASW5wdXQoKVxuICBzY2FsZSA9IDE7XG5cbiAgLyoqXG4gICAqIERldGVybWlucyBpZiBlbGVtZW50cyBzcGFuIHdoZW4gc2l6ZWQgb3IgZHJhZ2dlZFxuICAgKi9cbiAgQElucHV0KClcbiAgc25hcCA9IDA7XG5cbiAgLyoqXG4gICAqIEdldHMgb3Igc2V0cyB0aGUgbWluaW11bSB3aWR0aCBvZiB0aGUgZWxlbWVudCB3aGVuIGRyYWctc2l6ZWQuXG4gICAqL1xuICBASW5wdXQoKVxuICBtaW5TaXppbmdXaWR0aCA9IDMwO1xuXG4gIC8qKlxuICAgKiBHZXRzIG9yIHNldHMgdGhlIG1pbmltdW0gaGVpZ2h0IG9mIHRoZSBlbGVtZW50IHdoZW4gZHJhZy1zaXplZC5cbiAgICovXG4gIEBJbnB1dCgpXG4gIG1pblNpemluZ0hlaWdodCA9IDMwO1xuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIGlmIGVsZW1lbnRzIGNhbiBiZSBzZWxlY3RlZCBieSBkcmFnZ2luZyBhcm91bmQgKGxhc3NvKSB0aGVtIGFuZCByZWxlYXNpbmcgdGhlIHBvaW50ZXIuXG4gICAqL1xuICBASW5wdXQoKVxuICBpc0xhc3NvU2VsZWN0YWJsZSA9IHRydWU7XG5cbiAgLyoqXG4gICAqIE9wdGlvbmFsbHkgc2V0IFwiY2hlY2tlcnNcIiBiYWNrZ3JvdW5kIGZvciB0aGUgaW50ZXJhY3Rpb24gaG9zdC4gIFVzZWZ1bCB3aGVuIGJ1aWxkaW5nIElERS1saWtlIGludGVyYWN0aXZlIFVJLlxuICAgKi9cbiAgQElucHV0KClcbiAgaXNDaGVja2Vyc0JhY2tncm91bmQgPSBmYWxzZTtcblxuICBAT3V0cHV0KClcbiAgcmVzaXplZEVsZW1lbnQgPSBuZXcgRXZlbnRFbWl0dGVyPEhUTUxFbGVtZW50PigpO1xuICBAT3V0cHV0KClcbiAgcmVzaXplZEVsZW1lbnRzID0gbmV3IEV2ZW50RW1pdHRlcjxIVE1MRWxlbWVudFtdPigpO1xuICBAT3V0cHV0KClcbiAgbW92ZWRFbGVtZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxIVE1MRWxlbWVudD4oKTtcbiAgQE91dHB1dCgpXG4gIG1vdmVkRWxlbWVudHMgPSBuZXcgRXZlbnRFbWl0dGVyPEhUTUxFbGVtZW50W10+KCk7XG4gIEBPdXRwdXQoKVxuICBzZWxlY3RFbGVtZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxIVE1MRWxlbWVudD4oKTtcblxuICBASW5wdXQoKVxuICBjYW5EZWxldGU6IElDYW5jZWxsYWJsZSA9ICgpID0+IHRydWVcblxuICBASW5wdXQoKVxuICBjYW5Ecm9wOiBJQ2FuY2VsbGFibGUgPSAoKSA9PiB0cnVlXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIF9kcmFnU2VydmljZTogRHJhZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBfc2l6ZVNlcnZpY2U6IFNpemVTZXJ2aWNlLFxuICAgIHByaXZhdGUgX2ludGVyYWN0aW9uU2VydmljZTogSW50ZXJhY3Rpb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgX3NlbGVjdGlvblNlcnZpY2U6IFNlbGVjdG9yU2VydmljZVxuICApIHtcbiAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnJlbmRlcmVyID0gdGhpcy5fcmVuZGVyZXI7XG4gICAgdGhpcy5fc2l6ZVNlcnZpY2UucmVuZGVyZXIgPSB0aGlzLl9yZW5kZXJlcjtcbiAgICB0aGlzLl9kcmFnU2VydmljZS5yZW5kZXJlciA9IHRoaXMuX3JlbmRlcmVyO1xuICAgIHRoaXMuX2ludGVyYWN0aW9uU2VydmljZS5yZW5kZXJlciA9IHRoaXMuX3JlbmRlcmVyO1xuICAgIHRoaXMuX2tleURvd25TdWJqZWN0LnN1YnNjcmliZShlID0+IHRoaXMua2V5RG93bkhhbmRsZXIoZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSBrZXlib2FyZCBrZXkgaXMgcmVsZWFzZWQuXG4gICAqIEBwYXJhbSBlIEtleWJvYXJkRXZlbnRcbiAgICovXG4gIGtleVVwKGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAoZS5jb2RlID09PSAnRGVsZXRlJyAmJiB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnNlbGVjdG9ycy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmRlbGV0ZVNlbGVjdGVkRWxlbWVudHMoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIGtleWJvYXJkIGtleSBpcyBwcmVzc2VkLlxuICAgKiBAcGFyYW0gZSBLZXlib2FyZEV2ZW50XG4gICAqL1xuICBrZXlQcmVzcyhlKSB7XG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc2VsZWN0b3JzLmxlbmd0aCA+IDApIHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSBrZXlib2FyZCBrZXkgaXMgcHJlc3NlZC5cbiAgICogQHBhcmFtIGUgS2V5Ym9hcmRFdmVudFxuICAgKi9cbiAga2V5RG93bihlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgdGhpcy5fa2V5RG93blN1YmplY3QubmV4dChlKTtcbiAgfVxuXG4gIGtleURvd25IYW5kbGVyKGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAvLyBkZWJvdW5jZVRpbWUoNTAwMCk7XG4gICAgLyogICAgaWYgKFxuICAgICAgZS5jb2RlICE9PSAnRGVsZXRlJyAmJlxuICAgICAgZS5jb2RlICE9PSAnRXNjYXBlJyAmJlxuICAgICAgZS5jb2RlICE9PSAnQXJyb3dMZWZ0JyAmJlxuICAgICAgZS5jb2RlICE9PSAnQXJyb3dVcCcgJiZcbiAgICAgIGUuY29kZSAhPT0gJ0Fycm93UmlnaHQnICYmXG4gICAgICBlLmNvZGUgIT09ICdBcnJvd0Rvd24nXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfSovXG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc2VsZWN0b3JzLmxlbmd0aCA+IDApIHtcbiAgICAgIGxldCBkZWx0YTogUG9pbnQ7XG4gICAgICBjb25zdCBzbmFwID0gdGhpcy5zbmFwID8gdGhpcy5zbmFwIDogMTtcbiAgICAgIGlmIChlLmNvZGUgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgIHRoaXMuY2FuY2VsU2VsZWN0aW9uKCk7XG4gICAgICB9XG4gICAgICBpZiAoZS5zaGlmdEtleSkge1xuICAgICAgICBpZiAoZS5jdHJsS2V5KSB7XG4gICAgICAgICAgc3dpdGNoIChcbiAgICAgICAgICAgIGUuY29kZVxuICAgICAgICAgICAgLyogICAgICAgICBjYXNlIDM3OlxuICAgICAgICAgICAgICBzZWxmLmFsaWduU2VsZWN0ZWRFbGVtZW50cyhBbGlnblBvc2l0aW9uLkxlZnQpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgICAgIHNlbGYuYWxpZ25TZWxlY3RlZEVsZW1lbnRzKEFsaWduUG9zaXRpb24uVG9wKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM5OlxuICAgICAgICAgICAgICBzZWxmLmFsaWduU2VsZWN0ZWRFbGVtZW50cyhBbGlnblBvc2l0aW9uLlJpZ2h0KTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQwOlxuICAgICAgICAgICAgICBzZWxmLmFsaWduU2VsZWN0ZWRFbGVtZW50cyhBbGlnblBvc2l0aW9uLkJvdHRvbSk7XG4gICAgICAgICAgICAgIGJyZWFrOyAqL1xuICAgICAgICAgICkge1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWx0YSA9IG5ldyBQb2ludCgpO1xuICAgICAgICAgIHN3aXRjaCAoZS5jb2RlKSB7XG4gICAgICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgICAgICBkZWx0YSA9IG5ldyBQb2ludCgtc25hcCwgMCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICAgIGRlbHRhID0gbmV3IFBvaW50KDAsIC1zbmFwKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICAgICAgZGVsdGEgPSBuZXcgUG9pbnQoc25hcCwgMCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgICAgZGVsdGEgPSBuZXcgUG9pbnQoMCwgc25hcCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9zaXplU2VydmljZS5ncmlwS2V5ID0gJ2tleWJvYXJkJztcbiAgICAgICAgICB0aGlzLl9zaXplU2VydmljZS5zaXplRWxlbWVudHNCeShcbiAgICAgICAgICAgIGRlbHRhLFxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5zZWxlY3RvckVsZW1lbnRzXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLl9zaXplU2VydmljZS5zaXplRWxlbWVudHNCeShcbiAgICAgICAgICAgIGRlbHRhLFxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5jbGllbnRzXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVsdGEgPSBuZXcgUG9pbnQoKTtcbiAgICAgICAgc3dpdGNoIChlLmNvZGUpIHtcbiAgICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgICAgZGVsdGEgPSBuZXcgUG9pbnQoLXNuYXAsIDApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICBkZWx0YSA9IG5ldyBQb2ludCgwLCAtc25hcCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICAgIGRlbHRhID0gbmV3IFBvaW50KHNuYXAsIDApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgIGRlbHRhID0gbmV3IFBvaW50KDAsIHNuYXApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9kcmFnU2VydmljZS5kcmFnRWxlbWVudHNCeShcbiAgICAgICAgICBkZWx0YSxcbiAgICAgICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnNlbGVjdG9yRWxlbWVudHNcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5fZHJhZ1NlcnZpY2UuZHJhZ0VsZW1lbnRzQnkoZGVsdGEsIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuY2xpZW50cyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEVuc3VyZXMgdGhhdCB0aGUgZGVmYXVsdCBIVE1MNSBkcmFnZ2luZyBvcGVyYXRpb25zIGRvIG5vdCBleGVjdXRlLlxuICAgKi9cbiAgZHJhZ1N0YXJ0KCkge1xuICAgIC8vIC0tIHByZXZlbnQgZGVmYXVsdCBkcmFnXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSBwb2ludGVyIGlzIG1vdmVkLlxuICAgKiBAcGFyYW0gZSBQb2ludGVyRXZlbnRcbiAgICovXG4gIHBvaW50ZXJNb3ZlKGU6IFBvaW50ZXJFdmVudCkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAodGhpcy5faXNNb3VzZURvd24pIHtcbiAgICAgIGxldCBtb3VzZVBvcyA9IHRoaXMuZ2V0UmVsYXRpdmVQb2ludGVyUG9zKGUpO1xuICAgICAgaWYgKHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuaGFzTGFzc28pIHtcbiAgICAgICAgY29uc3QgbW91c2VEb3duUG9zID0gdGhpcy5fbW91c2VEb3duUG9zO1xuICAgICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnJlc2l6ZUxhc3NvKFxuICAgICAgICAgIG1vdXNlUG9zLnggLSBtb3VzZURvd25Qb3MueCxcbiAgICAgICAgICBtb3VzZVBvcy55IC0gbW91c2VEb3duUG9zLnksXG4gICAgICAgICAgbW91c2VEb3duUG9zXG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc2VsZWN0b3JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgbW91c2VDaGFuZ2UgPSB0aGlzLmdldFBvaW50ZXJDaGFuZ2UoZSk7XG4gICAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UubnVkZ2VCeShtb3VzZUNoYW5nZVswXSwgTnVkZ2VUeXBlLk92ZXJsYXkpO1xuICAgICAgICBtb3VzZVBvcyA9IG1vdXNlQ2hhbmdlWzFdO1xuICAgICAgICB0aGlzLl9sYXN0RHJvcFpvbmUgPSB0aGlzLl9kcmFnU2VydmljZS51cGRhdGVEcm9wWm9uZShcbiAgICAgICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmFjdGl2ZVNlbGVjdG9yLm92ZXJsYXksXG4gICAgICAgICAgdGhpcy5fZWwubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICBbdGhpcy5fc2VsZWN0aW9uU2VydmljZS5hY3RpdmVTZWxlY3Rvci5jbGllbnRFbF1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2xhc3RNb3VzZVBvcyA9IG1vdXNlUG9zO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVuc3VyZUN1cnNvcihlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIHBvaW50ZXIgaXMgcHJlc3NlZC5cbiAgICogQHBhcmFtIGUgUG9pbnRlckV2ZW50XG4gICAqL1xuICBwb2ludGVyRG93bihlOiBQb2ludGVyRXZlbnQpIHtcbiAgICB0aGlzLl9pc01vdXNlRG93biA9IHRydWU7XG4gICAgdGhpcy5fbW91c2VEb3duUG9zID0gdGhpcy5nZXRSZWxhdGl2ZVBvaW50ZXJQb3MoZSk7XG4gICAgdGhpcy5fbGFzdE1vdXNlUG9zID0gdGhpcy5fbW91c2VEb3duUG9zO1xuICAgIGlmIChlLnRhcmdldCA9PT0gdGhpcy5fZWwubmF0aXZlRWxlbWVudCkge1xuICAgICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5jcmVhdGVsYXNzb1NlbGVjdG9yKFxuICAgICAgICB0aGlzLl9tb3VzZURvd25Qb3MueCxcbiAgICAgICAgdGhpcy5fbW91c2VEb3duUG9zLnlcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBlLnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc2VsZWN0RWxlbWVudChlbGVtZW50LCAhZS5zaGlmdEtleSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSBwb2ludGVyIGlzIHJlbGVhc2VkLlxuICAgKiBAcGFyYW0gZSBQb2ludGVyRXZlbnRcbiAgICovXG4gIHBvaW50ZXJVcChlOiBQb2ludGVyRXZlbnQpIHtcbiAgICB0aGlzLl9pc01vdXNlRG93biA9IGZhbHNlO1xuICAgIGlmICh0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmhhc0xhc3NvKSB7XG4gICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnNlbGVjdENhcHR1cmVkRWxlbWVudHMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc3RhdGUgPT09IFNlbGVjdGlvblN0YXRlLkRyYWdnYWJsZSkge1xuICAgICAgICB0aGlzLm1vdmVTZWxlY3RlZEVsZW1lbnRzKE51ZGdlVHlwZS5PdmVybGF5LCBmYWxzZSk7XG4gICAgICAgIHRoaXMudHJ5RHJvcFNlbGVjdGVkRWxlbWVudHMoKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fc2VsZWN0aW9uU2VydmljZS5zdGF0ZSA9PT0gU2VsZWN0aW9uU3RhdGUuU2l6YWJsZSkge1xuICAgICAgICB0aGlzLnJlc2l6ZVNlbGVjdGVkRWxlbWVudHMoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2RyYWdTZXJ2aWNlLmNsZWFyRHJvcFpvbmVzKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCAnY3Vyc29yJywgdGhpcy5fY3Vyc29yKTtcbiAgICB0aGlzLl9sYXN0RHJvcFpvbmUgPSBudWxsO1xuICAgIHRoaXMuX2ludGVyYWN0aW9uU2VydmljZS5zZWxlY3RlZEVsZW1lbnRzID0gdGhpcy5fc2VsZWN0aW9uU2VydmljZS5jbGllbnRzO1xuICB9XG5cblxuICAvKipcbiAgICogQXR0ZW1wcyB0byBkcm9wIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgZWxlbWVudHMgaW50byBhIGRyb3Agem9uZVxuICAgKiBAcGFyYW0gZSBQb2ludGVyRXZlbnRcbiAgICovXG4gIHRyeURyb3BTZWxlY3RlZEVsZW1lbnRzKCkge1xuICAgIGNvbnN0IHNlbGVjdG9ycyA9IHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc2VsZWN0b3JzO1xuICAgIHNlbGVjdG9ycy5mb3JFYWNoKHNlbGVjdG9yID0+IHtcbiAgICAgIGlmICh0aGlzLmNhbkRyb3Aoc2VsZWN0b3IuY2xpZW50RWwpKSB7XG4gICAgICAgIHRoaXMuX2RyYWdTZXJ2aWNlLmRyb3BFbGVtZW50KFxuICAgICAgICAgIHRoaXMuX2xhc3REcm9wWm9uZSxcbiAgICAgICAgICBzZWxlY3Rvci5jbGllbnRFbCxcbiAgICAgICAgICB0aGlzLl9lbC5uYXRpdmVFbGVtZW50XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5yZXNlbGVjdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEVuc3VyZXMgdGhhdCB0aGUgYXBwcm9wcmlhdGUgY3Vyc29yIGlzIHNldCB3aGVuIGVsZW1lbnQgaXMgZHJhZ2dhYmxlLlxuICAgKiBAcGFyYW0gZSBQb2ludGVyRXZlbnRcbiAgICovXG4gIGVuc3VyZUN1cnNvcihlOiBQb2ludGVyRXZlbnQpIHtcbiAgICBjb25zdCBtb3VzZVBvcyA9IG5ldyBQb2ludChlLnBhZ2VYLCBlLnBhZ2VZKTtcbiAgICBjb25zdCBzZWxlY3RvciA9IHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc2VsZWN0b3JBdFBvaW50KG1vdXNlUG9zKTtcbiAgICBpZiAoc2VsZWN0b3IgJiYgZG9tLmVsZW1lbnREcmFnZ2FibGUoc2VsZWN0b3IuY2xpZW50RWwpKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCAnY3Vyc29yJywgJ21vdmUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ2N1cnNvcicsICdkZWZhdWx0Jyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlc2l6ZXMgdGhlIHNlbGVjdGVkIGVsZW1lbnRzIHRvIG1hdGNoIHRoZSBTZWxlY3RvciBvdmVybGF5XG4gICAqL1xuICByZXNpemVTZWxlY3RlZEVsZW1lbnRzKCkge1xuICAgIGNvbnN0IHNlbGVjdG9ycyA9IHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc2VsZWN0b3JzO1xuICAgIGNvbnN0IHNpemVkRWxlbWVudHMgPSBbXTtcbiAgICBzZWxlY3RvcnMuZm9yRWFjaChzZWxlY3RvciA9PiB7XG4gICAgICBpZiAoZG9tLmVsZW1lbnRTaXphYmxlKHNlbGVjdG9yLmNsaWVudEVsKSkge1xuICAgICAgICBzaXplZEVsZW1lbnRzLnB1c2goc2VsZWN0b3IuY2xpZW50RWwpO1xuICAgICAgICBkb20uYXNzaWduQm91bmRpbmdSZWN0KFxuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLFxuICAgICAgICAgIHNlbGVjdG9yLm92ZXJsYXksXG4gICAgICAgICAgc2VsZWN0b3IuY2xpZW50RWxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5yZXNpemVkRWxlbWVudC5lbWl0KHNlbGVjdG9yLmNsaWVudEVsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLnJlc2V0U2VsZWN0aW9uKCk7XG4gICAgaWYgKHNpemVkRWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5yZXNpemVkRWxlbWVudHMuZW1pdChzaXplZEVsZW1lbnRzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTW92ZXMgc2VsZWN0ZWQgZWxlbWVudHMgdG8gdGhlIGN1cnJlbnQgbG9jYXRpb24gb2YgdGhlIHNlbGVjdG9yIG9yIHNlbGVjdG9yIG92ZXJsYXkuXG4gICAqIEBwYXJhbSBudWRnZVR5cGUgZGV0ZXJtaW5lcyB3aGVyZSB0aGUgc2VsZWN0ZWQgZWxlbWVudHMgc2hvdWxkIGJlIG1vdmVkLiAgT3B0aW9ucyBhcmVcbiAgICogdG8gbW92ZSB0byB0aGUgYWN0dWFsIHNlbGVjdG9yIChOdWRnZVR5cGUuU2VsZWN0b3IpIG9yIHRoZSBzZWxlY3RvciBvdmVybGF5IChOb2RnZVR5cGUuT3ZlcmxheSkuXG4gICAqIFVzdWFsbHkgb25seSB0aGUgb3ZlcmxheSBpcyBkcmFnZ2VkL21vdmVkLCBoZW5jZSB0aGUgZGVmYXVsdCBvZiBOdWRnZVR5cGUuT3ZlcmxheS5cbiAgICogQHBhcmFtIHJlc2V0QWZ0ZXJNb3ZlIGRldGVybWluZXMgaWYgdGhlIHNlbGVjdG9yIHNob3VsZCByZXNldCBpdHNlbGYgYWZ0ZXIgZXZlcnkgbW92ZS5cbiAgICovXG4gIG1vdmVTZWxlY3RlZEVsZW1lbnRzKFxuICAgIG51ZGdlVHlwZTogTnVkZ2VUeXBlID0gTnVkZ2VUeXBlLk92ZXJsYXksXG4gICAgcmVzZXRBZnRlck1vdmUgPSB0cnVlXG4gICkge1xuICAgIGNvbnN0IHNlbGVjdG9ycyA9IHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc2VsZWN0b3JzO1xuICAgIGNvbnN0IG1vdmVkRWxlbWVudHMgPSBbXTtcbiAgICBzZWxlY3RvcnMuZm9yRWFjaChzZWxlY3RvciA9PiB7XG4gICAgICBpZiAoZG9tLmVsZW1lbnREcmFnZ2FibGUoc2VsZWN0b3IuY2xpZW50RWwpKSB7XG4gICAgICAgIG1vdmVkRWxlbWVudHMucHVzaChzZWxlY3Rvci5jbGllbnRFbCk7XG4gICAgICAgIGRvbS5hc3NpZ25Qb3NpdGlvbihcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlcixcbiAgICAgICAgICBudWRnZVR5cGUgPT09IE51ZGdlVHlwZS5PdmVybGF5XG4gICAgICAgICAgICA/IHNlbGVjdG9yLm92ZXJsYXlcbiAgICAgICAgICAgIDogc2VsZWN0b3Iuc2VsZWN0b3JFbCxcbiAgICAgICAgICBzZWxlY3Rvci5jbGllbnRFbFxuICAgICAgICApO1xuICAgICAgICB0aGlzLm1vdmVkRWxlbWVudC5lbWl0KHNlbGVjdG9yLmNsaWVudEVsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAocmVzZXRBZnRlck1vdmUpIHtcbiAgICAgIHRoaXMucmVzZXRTZWxlY3Rpb24oKTtcbiAgICB9XG4gICAgaWYgKG1vdmVkRWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5tb3ZlZEVsZW1lbnRzLmVtaXQobW92ZWRFbGVtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgc2VsZWN0ZWQgZWxlbWVudHMuXG4gICAqL1xuICBkZWxldGVTZWxlY3RlZEVsZW1lbnRzKCkge1xuICAgIGNvbnN0IHNlbGVjdG9ycyA9IHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc2VsZWN0b3JzO1xuICAgIGNvbnN0IGRlbGV0ZWRFbGVtZW50cyA9IFtdO1xuICAgIGZvciAobGV0IGluZGV4ID0gc2VsZWN0b3JzLmxlbmd0aCAtIDE7IGluZGV4ID49IDA7IGluZGV4LS0pIHtcbiAgICAgIGNvbnN0IHNlbGVjdG9yID0gc2VsZWN0b3JzW2luZGV4XTtcbiAgICAgIGlmICh0aGlzLmNhbkRlbGV0ZShzZWxlY3Rvci5jbGllbnRFbCkpIHtcbiAgICAgICAgY29uc3QgZWwgPSBzZWxlY3Rvci5jbGllbnRFbDtcbiAgICAgICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5jbGVhclNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgdGhpcy5faW50ZXJhY3Rpb25TZXJ2aWNlLmRlbGV0ZUVsZW1lbnQoZWwpO1xuICAgICAgICBkZWxldGVkRWxlbWVudHMucHVzaChlbCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2ludGVyYWN0aW9uU2VydmljZS5kZWxldGVFbGVtZW50cyhkZWxldGVkRWxlbWVudHMpO1xuICAgIHRoaXMuX2ludGVyYWN0aW9uU2VydmljZS5zZWxlY3RlZEVsZW1lbnRzID0gdGhpcy5fc2VsZWN0aW9uU2VydmljZS5jbGllbnRzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIG5ldyBjaGlsZCBlbGVtZW50IHRvIHRoZSBob3N0IGVsZW1lbnQuXG4gICAqL1xuICBhZGRFbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBjb25zdCBzZWxlY3RvciA9IHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuYWN0aXZlU2VsZWN0b3I7XG4gICAgY29uc3QgcGFyZW50ID0gc2VsZWN0b3IgJiYgZG9tLmlzQ29udGFpbmVyKHNlbGVjdG9yLmNsaWVudEVsKSA/IHNlbGVjdG9yLmNsaWVudEVsIDogdGhpcy5fZWwubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLl9yZW5kZXJlci5hcHBlbmRDaGlsZChwYXJlbnQsIGVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIG1vdXNlIHBvc2l0aW9uIHJlbGF0aXZlIHRvIHRoZSBvZmZzZXQgYW5kIHNjYWxlIG9mIHRoZSBob3N0IGVsZW1lbnQuXG4gICAqIEBwYXJhbSBlIFBvaW50ZXJFdmVudFxuICAgKi9cbiAgZ2V0UmVsYXRpdmVQb2ludGVyUG9zKGU6IFBvaW50ZXJFdmVudCkge1xuICAgIHJldHVybiBkb20uZ2V0UmVsYXRpdmVQb2ludGVyUG9zKGUsIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsIHRoaXMuc2NhbGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgcG9pbnRlciBjb29yZGluYXRlcyBjaGFuZ2VzIHJlbGF0aXZlIHRvIHRoZSBzZWxlY3RlZCBlbGVtZW50LlxuICAgKiBAcGFyYW0gZSBQb2ludGVyRXZlbnRcbiAgICovXG4gIGdldFBvaW50ZXJDaGFuZ2UoZTogUG9pbnRlckV2ZW50KTogYW55W10ge1xuICAgIGNvbnN0IHBvaW50ZXJQb3MgPSB0aGlzLmdldFJlbGF0aXZlUG9pbnRlclBvcyhlKTtcbiAgICBsZXQgbGVmdCA9IHBvaW50ZXJQb3MueCAtIHRoaXMuX2xhc3RNb3VzZVBvcy54O1xuICAgIGxldCB0b3AgPSBwb2ludGVyUG9zLnkgLSB0aGlzLl9sYXN0TW91c2VQb3MueTtcbiAgICBpZiAodGhpcy5zbmFwKSB7XG4gICAgICBpZiAobGVmdCAlIHRoaXMuc25hcCAhPT0gMCkge1xuICAgICAgICBsZWZ0ID0gMDtcbiAgICAgICAgcG9pbnRlclBvcy54ID0gdGhpcy5fbGFzdE1vdXNlUG9zLng7XG4gICAgICB9XG4gICAgICBpZiAodG9wICUgdGhpcy5zbmFwICE9PSAwKSB7XG4gICAgICAgIHRvcCA9IDA7XG4gICAgICAgIHBvaW50ZXJQb3MueSA9IHRoaXMuX2xhc3RNb3VzZVBvcy55O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW25ldyBQb2ludChsZWZ0LCB0b3ApLCBwb2ludGVyUG9zXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZS1zZWxlY3RzIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgZWxlbWVudHMuICBVc3VhbGx5IGhhcHBlbnMgYWZ0ZXJcbiAgICogYW4gZWxlbWVudCBpcyBtb3ZlZCBvciByZXNpemVkLlxuICAgKi9cbiAgcmVzZXRTZWxlY3Rpb24oKSB7XG4gICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5yZXNlbGVjdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbmNlbHMgdGhlIGN1cnJlbnQgc2VsZWN0aW9ucyBvciBkcmFnIG9wZXJhdGlvbi4gIElmIHRoZSBlbGVtZW50cyBhcmUgYmVpbmcgZHJhZ2dlZCxcbiAgICogdGhlIGRyYWcgb3BlcmF0aW9uIGlzIGNhbmNlbGxlZCBhbmQgdGhlIGVsZW1lbnRzIHJlc2VsZWN0ZWQuICBPdGhlcndpc2UsIHRoZSBlbGVtZW50c1xuICAgKiBhcmUgdW5zZWxlY3RlZC5cbiAgICovXG4gIGNhbmNlbFNlbGVjdGlvbigpIHtcbiAgICBpZiAodGhpcy5faXNNb3VzZURvd24pIHtcbiAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UucmVzZWxlY3QoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5jbGVhclNlbGVjdG9ycygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLl9lbC5uYXRpdmVFbGVtZW50ICYmIHRoaXMuX3JlbmRlcmVyKSB7XG4gICAgICB0aGlzLl9pbnRlcmFjdGlvblNlcnZpY2UuaW50ZXJhY3Rpb25Ib3N0ID0gdGhpcy5fZWwubmF0aXZlRWxlbWVudDtcbiAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuaW50ZXJhY3Rpb25Ib3N0ID0gdGhpcy5fZWwubmF0aXZlRWxlbWVudDtcbiAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuaXNMYXNzb1NlbGVjdGFibGUgPSB0aGlzLmlzTGFzc29TZWxlY3RhYmxlO1xuICAgICAgdGhpcy5fY3Vyc29yID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLl9lbC5uYXRpdmVFbGVtZW50KS5jdXJzb3I7XG4gICAgICB0aGlzLl9kZWxldGVTZWxlY3RlZEVsZW1lbnRzU3Vic2NyaXB0aW9uID0gdGhpcy5faW50ZXJhY3Rpb25TZXJ2aWNlLmRlbGV0ZVNlbGVjdGVkRWxlbWVudHMkLnN1YnNjcmliZShcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICB0aGlzLmRlbGV0ZVNlbGVjdGVkRWxlbWVudHMoKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICAgIHRoaXMuX2FkZEVsZW1lbnRTdWJzY3JpcHRpb24gPSB0aGlzLl9pbnRlcmFjdGlvblNlcnZpY2UuYWRkRWxlbWVudCQuc3Vic2NyaWJlKFxuICAgICAgICBlbGVtZW50ID0+IHtcbiAgICAgICAgICAvLyB0aGlzLmFkZEVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fbGFzdERyb3Bab25lID0gbnVsbDtcbiAgICB0aGlzLl9kZWxldGVTZWxlY3RlZEVsZW1lbnRzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fYWRkRWxlbWVudFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaHBjLWNvbXBvc2VyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbXBvc2VyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY29tcG9zZXIuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIENvbXBvc2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBoZWFkZXJWaXNpYmxlID0gdHJ1ZTtcbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdocGMtdHJlZXZpZXcnLFxuICB0ZW1wbGF0ZVVybDogJy4vdHJlZXZpZXcuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90cmVldmlldy5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgVHJlZXZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaHBjLXRyZWV2aWV3LWl0ZW0nLFxuICB0ZW1wbGF0ZVVybDogJy4vdHJlZXZpZXctaXRlbS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RyZWV2aWV3LWl0ZW0uY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFRyZWV2aWV3SXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdocGMtc2VsZWN0b3InLFxuICB0ZW1wbGF0ZVVybDogJy4vc2VsZWN0b3IuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zZWxlY3Rvci5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0b3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaHBjLWZpbGUtbWFuYWdlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9maWxlLW1hbmFnZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9maWxlLW1hbmFnZXIuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEZpbGVNYW5hZ2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2hwYy1wcm9wZXJ0eS1ncmlkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3Byb3BlcnR5LWdyaWQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9wcm9wZXJ0eS1ncmlkLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQcm9wZXJ0eUdyaWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEludGVyYWN0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9pbnRlcmFjdGlvbi9pbnRlcmFjdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29tcG9zZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvc2VyL2NvbXBvc2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmVldmlld0NvbXBvbmVudCB9IGZyb20gJy4vdHJlZXZpZXcvdHJlZXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IFRyZWV2aWV3SXRlbUNvbXBvbmVudCB9IGZyb20gJy4vdHJlZXZpZXcvdHJlZXZpZXctaXRlbS90cmVldmlldy1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZWxlY3RvckNvbXBvbmVudCB9IGZyb20gJy4vc2VsZWN0b3Ivc2VsZWN0b3IuY29tcG9uZW50JztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtEcmFnU2VydmljZX0gZnJvbSAnLi9zZXJ2aWNlcy9kcmFnLnNlcnZpY2UnO1xuaW1wb3J0IHtTaXplU2VydmljZX0gZnJvbSAnLi9zZXJ2aWNlcy9zaXplLnNlcnZpY2UnO1xuaW1wb3J0IHtJbnRlcmFjdGlvblNlcnZpY2V9IGZyb20gJy4vaW50ZXJhY3Rpb24vaW50ZXJhY3Rpb24uc2VydmljZSc7XG5pbXBvcnQge1NlbGVjdG9yU2VydmljZX0gZnJvbSAnLi9zZWxlY3Rvci9zZWxlY3Rvci5zZXJ2aWNlJztcbmltcG9ydCB7IEZpbGVNYW5hZ2VyQ29tcG9uZW50IH0gZnJvbSAnLi9maWxlLW1hbmFnZXIvZmlsZS1tYW5hZ2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQcm9wZXJ0eUdyaWRDb21wb25lbnQgfSBmcm9tICcuL3Byb3BlcnR5LWdyaWQvcHJvcGVydHktZ3JpZC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEludGVyYWN0aW9uQ29tcG9uZW50LFxuICAgIENvbXBvc2VyQ29tcG9uZW50LFxuICAgIFRyZWV2aWV3Q29tcG9uZW50LFxuICAgIFRyZWV2aWV3SXRlbUNvbXBvbmVudCxcbiAgICBTZWxlY3RvckNvbXBvbmVudCxcbiAgICBGaWxlTWFuYWdlckNvbXBvbmVudCxcbiAgICBQcm9wZXJ0eUdyaWRDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEludGVyYWN0aW9uQ29tcG9uZW50LFxuICAgIENvbXBvc2VyQ29tcG9uZW50LFxuICAgIFRyZWV2aWV3Q29tcG9uZW50XG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIERyYWdTZXJ2aWNlLFxuICAgIFNpemVTZXJ2aWNlLFxuICAgIEludGVyYWN0aW9uU2VydmljZSxcbiAgICBTZWxlY3RvclNlcnZpY2VcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBIcENvbXBvbmVudHNNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsiSW5qZWN0YWJsZSIsImRvbS5tb3ZlRWxlbWVudEJ5IiwiZG9tLmVsZW1lbnREcmFnZ2FibGUiLCJkb20ub2Zmc2V0IiwiZG9tLmVsZW1lbnRBdFBvaW50IiwiZG9tLmNoaWxkcmVuT2YiLCJkb20uY2hhbmdlUGFyZW50IiwiZG9tLmVsZW1lbnRCb3VuZHMiLCJkb20uc2V0RWxlbWVudFJlY3QiLCJkb20uZWxlbWVudFNpemFibGUiLCJkb20uaXNTZWxlY3RhYmxlIiwiZG9tLnBvaW50SW5SZWN0IiwiZG9tLmVsZW1lbnRzQXRSZWN0IiwiZG9tLmFzc2lnbkJvdW5kaW5nUmVjdCIsIkNvbXBvbmVudEZhY3RvcnlSZXNvbHZlciIsIkluamVjdG9yIiwiU3ViamVjdCIsIkJlaGF2aW9yU3ViamVjdCIsIkV2ZW50RW1pdHRlciIsImRvbS5hc3NpZ25Qb3NpdGlvbiIsImRvbS5pc0NvbnRhaW5lciIsImRvbS5nZXRSZWxhdGl2ZVBvaW50ZXJQb3MiLCJDb21wb25lbnQiLCJWaWV3RW5jYXBzdWxhdGlvbiIsIkNoYW5nZURldGVjdGlvblN0cmF0ZWd5IiwiUmVuZGVyZXIyIiwiVmlld0NoaWxkIiwiSW5wdXQiLCJPdXRwdXQiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO1FBT0U7U0FBaUI7O29CQUxsQkEsYUFBVSxTQUFDO3dCQUNWLFVBQVUsRUFBRSxNQUFNO3FCQUNuQjs7Ozs7a0NBSkQ7Ozs7Ozs7SUNBQSxJQUFBO1FBQ0UsY0FBbUIsSUFBZ0IsRUFBUyxHQUFlLEVBQVMsS0FB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