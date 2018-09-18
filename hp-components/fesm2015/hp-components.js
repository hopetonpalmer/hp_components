import { Injectable, Component, Input, ComponentFactoryResolver, Injector, NgModule, ViewEncapsulation, ChangeDetectionStrategy, Renderer2, ViewChild, Output, EventEmitter, defineInjectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class HpComponentsService {
    constructor() { }
}
HpComponentsService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
HpComponentsService.ctorParameters = () => [];
/** @nocollapse */ HpComponentsService.ngInjectableDef = defineInjectable({ factory: function HpComponentsService_Factory() { return new HpComponentsService(); }, token: HpComponentsService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Rect {
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
class Size {
    /**
     * @param {?=} height
     * @param {?=} width
     */
    constructor(height = 0, width = 0) {
        this.height = height;
        this.width = width;
    }
}
class Point {
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
    const box = el.getBoundingClientRect();
    /** @type {?} */
    const top = box.top;
    /** @type {?} */
    const left = box.left;
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
    const newValue = value.replace('px', '').replace('em', '');
    return parseFloat(newValue);
}
/**
 * @param {?} element
 * @param {?=} orderByZOrder
 * @return {?}
 */
function childElements(element, orderByZOrder = false) {
    /** @type {?} */
    const result = new Array();
    if (!element) {
        return result;
    }
    /** @type {?} */
    const children = element.children;
    for (let i = 0; i < children.length; i++) {
        /** @type {?} */
        const child = /** @type {?} */ (children[i]);
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
    for (let i = children.length - 1; i >= 0; i--) {
        /** @type {?} */
        const child = /** @type {?} */ (children[i]);
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
    const index = typeof (item) === 'number' ? item : array.indexOf(item);
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
function elementsAtRect(parent, rect, exclude = []) {
    /** @type {?} */
    const result = [];
    childElements(parent).forEach(element => {
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
    const computedStyles = getComputedStyle(element, null);
    return new Point(pixToNum(computedStyles.left), pixToNum(computedStyles.top));
}
/**
 * @param {?} element
 * @return {?}
 */
function elementSize(element) {
    /** @type {?} */
    const computedStyles = getComputedStyle(element, null);
    return new Size(pixToNum(computedStyles.height), pixToNum(computedStyles.width));
}
/**
 * @param {?} element
 * @param {?=} relativeToPage
 * @param {?=} scale
 * @return {?}
 */
function elementBounds(element, relativeToPage = false, scale = null) {
    /** @type {?} */
    let pos = elementPos(element);
    if (relativeToPage) {
        pos = elementPagePos(element);
    }
    /** @type {?} */
    const size = elementSize(element);
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
    const result = elementPos(element);
    if (element.parentElement == null) {
        return result;
    }
    /** @type {?} */
    let left = result.x;
    /** @type {?} */
    let top = result.y;
    /** @type {?} */
    const parents = parentTree(element);
    parents.forEach(parent => {
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
function parentTree(element, lastClass = 'surface', inclusive = false) {
    /** @type {?} */
    const result = new Array();
    if (!element) {
        return result;
    }
    /** @type {?} */
    let parent = element.parentElement;
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
    const pos = elementPos(element);
    /** @type {?} */
    const top = pos.y + delta.y;
    /** @type {?} */
    const left = pos.x + delta.x;
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
    const sourceRect = elementBounds(source);
    /** @type {?} */
    const top = sourceRect.top;
    /** @type {?} */
    const left = sourceRect.left; // + pixToNum(styles.marginLeft);
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
    const sourceRect = elementBounds(source);
    /** @type {?} */
    const pos = elementPos(source);
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
function childrenOf(parent, deep = false, exclude = []) {
    /** @type {?} */
    let result = [];
    if (parent) {
        if (deep) {
            result = Array.from(parent.querySelectorAll('*'));
        }
        else {
            result = Array.from(parent.children);
        }
        removeHelperChildren(result);
        result = result.filter(x => !(x in exclude));
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
function elementAtPoint(pos, parent, exclude = []) {
    /** @type {?} */
    let result = parent;
    /** @type {?} */
    const children = childrenOf(parent, false, exclude);
    for (let index = 0; index < children.length; index++) {
        /** @type {?} */
        const child = children[index];
        /** @type {?} */
        const elRect = child.getBoundingClientRect();
        /** @type {?} */
        const rect = new Rect(elRect.left, elRect.top, elRect.width, elRect.height);
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
    const parentPos = elementPagePos(newParent);
    /** @type {?} */
    const elPos = elementPagePos(element);
    /** @type {?} */
    const newPos = new Point(elPos.x - parentPos.x, elPos.y - parentPos.y);
    renderer.appendChild(newParent, element);
    moveElementTo(renderer, element, newPos);
}
/**
 * @param {?} e
 * @param {?} element
 * @param {?=} scale
 * @return {?}
 */
function getRelativePointerPos(e, element, scale = 1) {
    /** @type {?} */
    const relativePos = offset(element);
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
class DragService {
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
                moveElementBy(this.renderer, element, delta);
            }
        });
    }
    /**
     * @param {?} element
     * @return {?}
     */
    canDrag(element) {
        return elementDraggable(element);
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
        const pos = offset(draggedElement);
        /** @type {?} */
        const el = elementAtPoint(pos, parent, exclude);
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
        const children = childrenOf(parent, true);
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
            changeParent(draggedElement, dropZone, this.renderer);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class SizeService {
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
        const currentBounds = elementBounds(element);
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
        setElementRect(this.renderer, boundsRect, element);
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
        return elementSizable(element);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @enum {number} */
const SelectionState = {
    Draggable: 0,
    Sizable: 1,
    Idle: 2,
};
SelectionState[SelectionState.Draggable] = 'Draggable';
SelectionState[SelectionState.Sizable] = 'Sizable';
SelectionState[SelectionState.Idle] = 'Idle';
/** @enum {number} */
const NudgeType = {
    Overlay: 0,
    Selector: 1,
};
NudgeType[NudgeType.Overlay] = 'Overlay';
NudgeType[NudgeType.Selector] = 'Selector';
class SelectorService {
    /**
     * @param {?} _sizeService
     * @param {?} _dragService
     * @param {?} _componentFactoryResolver
     * @param {?} _injector
     */
    constructor(_sizeService, _dragService, _componentFactoryResolver, _injector) {
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
    /**
     * @return {?}
     */
    get activeSelector() {
        return this._activeSelector;
    }
    /**
     * @return {?}
     */
    get state() {
        return this._state;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set state(value) {
        if (value !== this._state) {
            this._state = value;
            if (this.state !== SelectionState.Idle) {
                this.createSelectionOverlays();
            }
        }
    }
    /**
     * @return {?}
     */
    get hasLasso() {
        return this._lassoSelector !== null;
    }
    /**
     * @return {?}
     */
    get hasElementSelectors() {
        return Array.from(this._selectors.entries()).length > 0;
    }
    /**
     * @return {?}
     */
    get selectors() {
        return this._selectors;
    }
    /**
     * Represents all selector elements hovering above the captured elements
     * @return {?}
     */
    get selectorElements() {
        return this.selectors.map(x => x.selectorEl);
    }
    /**
     * Represents all the captured elements
     *
     * @return {?}
     */
    get clients() {
        return this.selectors.map(x => x.clientEl);
    }
    /**
     * @return {?}
     */
    get selectableElements() {
        /** @type {?} */
        const children = childrenOf(this.interactionHost).filter(x => isSelectable(x));
        return children;
    }
    /**
     * @param {?} left
     * @param {?} top
     * @return {?}
     */
    createlassoSelector(left, top) {
        this.clearSelectors();
        if (this.isLassoSelectable) {
            /** @type {?} */
            const selector = this.createSelector(left, top, this.interactionHost);
            this.renderer.setStyle(this.interactionHost, 'cursor', this.lassoCursor);
            this.renderer.addClass(selector, 'hpc-lasso-selector');
            this._lassoSelector = selector;
        }
    }
    /**
     * @return {?}
     */
    removelassoSelector() {
        if (this._lassoSelector) {
            this.renderer.removeChild(this.interactionHost, this._lassoSelector);
            this._lassoSelector = null;
        }
    }
    /**
     * @param {?} point
     * @return {?}
     */
    selectorAtPoint(point) {
        for (let index = 0; index < this.selectors.length; index++) {
            /** @type {?} */
            const selector = this.selectors[index];
            /** @type {?} */
            const element = selector.selectorEl;
            /** @type {?} */
            const elRect = element.getBoundingClientRect();
            /** @type {?} */
            const rect = new Rect(elRect.left, elRect.top, elRect.width, elRect.height);
            if (pointInRect(point, rect)) {
                return selector;
            }
        }
    }
    /**
     * @return {?}
     */
    selectCapturedElements() {
        /** @type {?} */
        const rect = elementBounds(this._lassoSelector);
        /** @type {?} */
        const capturedElements = elementsAtRect(this.interactionHost, rect, [
            this._lassoSelector
        ]);
        capturedElements.forEach(el => {
            this.selectElement(el, false, this.shouldAllowSizing);
        });
        this.removelassoSelector();
    }
    /**
     * @return {?}
     */
    unSelectAll() {
        this.clearSelectors();
    }
    /**
     * @param {?} element
     * @return {?}
     */
    unSelectElement(element) {
        /** @type {?} */
        const selector = this.selectors.find(x => x.clientEl === element);
        if (selector) {
            this.clearSelector(selector);
        }
    }
    /**
     * @return {?}
     */
    selectAll() {
        this.clearSelectors();
        /** @type {?} */
        const children = this.selectableElements;
        children.forEach(child => {
            this.selectElement(child, false);
        });
    }
    /**
     * @param {?} element
     * @param {?=} clearFirst
     * @param {?=} isSizable
     * @return {?}
     */
    selectElement(element, clearFirst = true, isSizable = true) {
        /** @type {?} */
        let selector = this.selectors.find(x => x.selectorEl === element ||
            x.clientEl === element ||
            x.overlay === element);
        if (element.hasAttribute('gripKey')) {
            selector = this.selectors.find(x => x.selectorEl === element.parentElement.parentElement.parentElement);
            /** @type {?} */
            const cursor = getComputedStyle(element).cursor;
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
        const rect = elementBounds(element);
        /** @type {?} */
        const selectorEl = this.createSelector(rect.left, rect.top, element.parentElement);
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
    }
    /**
     * @return {?}
     */
    createSelectionOverlays() {
        this.selectors.forEach(selector => {
            this._sizeService.removeSizingGrips(selector.selectorEl, this.renderer);
            if (selector.overlay) {
                this.renderer.removeChild(selector.selectorEl.parentElement, selector.overlay);
            }
            if (this.state === SelectionState.Sizable &&
                this._sizeService.canSize(selector.clientEl)) {
                selector.overlay = this._sizeService.createSizingOverlay(selector.selectorEl);
            }
            else if (this.state === SelectionState.Draggable &&
                this._dragService.canDrag(selector.clientEl)) {
                selector.overlay = this._dragService.createDragOverlay(selector.clientEl);
            }
            if (selector.overlay) {
                this.renderer.appendChild(selector.selectorEl.parentElement, selector.overlay);
            }
        });
    }
    /**
     * @param {?} left
     * @param {?} top
     * @param {?} parent
     * @return {?}
     */
    createSelector(left, top, parent) {
        /** @type {?} */
        const selector = this.renderer.createElement('div');
        this.renderer.appendChild(parent, selector);
        this.renderer.setStyle(selector, 'position', 'absolute');
        this.renderer.setStyle(selector, 'left', left + 'px');
        this.renderer.setStyle(selector, 'top', top + 'px');
        this.renderer.setStyle(selector, 'boxSizing', 'border-box');
        this.renderer.setStyle(selector, 'zIndex', '10000');
        return selector;
    }
    /**
     * @return {?}
     */
    clearSelectors() {
        this.removelassoSelector();
        /** @type {?} */
        const selectors = Array.from(this._selectors.values());
        selectors.forEach(selector => {
            this.clearSelector(selector);
        });
        this._selectors = [];
    }
    /**
     * @param {?} selector
     * @return {?}
     */
    clearSelector(selector) {
        if (selector === this._activeSelector) {
            this._activeSelector = null;
        }
        this.renderer.removeChild(selector.selectorEl.parentElement, selector.selectorEl);
        if (selector.overlay) {
            this.renderer.removeChild(selector.overlay.parentElement, selector.overlay);
        }
        this.selectors.splice(this.selectors.indexOf(selector), 1);
    }
    /**
     * @param {?} width
     * @param {?} height
     * @param {?} initialPos
     * @return {?}
     */
    resizeLasso(width, height, initialPos) {
        if (height < 0) {
            height = Math.abs(height);
            /** @type {?} */
            const top = initialPos.y - height;
            this.renderer.setStyle(this._lassoSelector, 'top', top + 'px');
        }
        if (width < 0) {
            width = Math.abs(width);
            /** @type {?} */
            const left = initialPos.x - width;
            this.renderer.setStyle(this._lassoSelector, 'left', left + 'px');
        }
        this.renderer.setStyle(this._lassoSelector, 'height', height + 'px');
        this.renderer.setStyle(this._lassoSelector, 'width', width + 'px');
    }
    /**
     * @param {?} delta
     * @return {?}
     */
    resizeSelectorsBy(delta) {
        /** @type {?} */
        const selectors = this.selectors.map(x => x.selectorEl);
        this._sizeService.sizeElementsBy(delta, selectors);
    }
    /**
     * @param {?} delta
     * @return {?}
     */
    resizeOverlaysBy(delta) {
        /** @type {?} */
        const overlays = this.selectors.map(x => x.overlay);
        this._sizeService.sizeElementsBy(delta, overlays);
    }
    /**
     * @param {?} delta
     * @return {?}
     */
    moveSelectorsBy(delta) {
        /** @type {?} */
        const selectors = this.selectors.map(x => x.overlay);
        this._dragService.dragElementsBy(delta, selectors);
    }
    /**
     * @param {?} delta
     * @return {?}
     */
    moveOverlaysBy(delta) {
        /** @type {?} */
        const overlays = this.selectors.map(x => x.overlay);
        this._dragService.dragElementsBy(delta, overlays);
    }
    /**
     * @return {?}
     */
    reselect() {
        /** @type {?} */
        const clients = this.clients;
        this.clearSelectors();
        clients.forEach(client => {
            this.selectElement(client, false, this.shouldAllowSizing);
        });
    }
    /**
     * @param {?} delta
     * @param {?} nodgeType
     * @return {?}
     */
    nudgeBy(delta, nodgeType) {
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
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.clearSelectors();
        this.renderer = null;
        this.interactionHost = null;
    }
}
SelectorService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
SelectorService.ctorParameters = () => [
    { type: SizeService },
    { type: DragService },
    { type: ComponentFactoryResolver },
    { type: Injector }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class InteractionService {
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
        const children = childrenOf(this.interactionHost);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Handles selection, sizing, deletions, and dragging interactions with any child Element.
 */
class InteractionComponent {
    /**
     * @param {?} _renderer
     * @param {?} _dragService
     * @param {?} _sizeService
     * @param {?} _interactionService
     * @param {?} _selectionService
     */
    constructor(_renderer, _dragService, _sizeService, _interactionService, _selectionService) {
        this._renderer = _renderer;
        this._dragService = _dragService;
        this._sizeService = _sizeService;
        this._interactionService = _interactionService;
        this._selectionService = _selectionService;
        this._isMouseDown = false;
        this._mouseDownPos = new Point();
        this._keyDownSubject = new Subject();
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
        this.resizedElement = new EventEmitter();
        this.resizedElements = new EventEmitter();
        this.movedElement = new EventEmitter();
        this.movedElements = new EventEmitter();
        this.selectElement = new EventEmitter();
        this.canDelete = () => true;
        this.canDrop = () => true;
        this._selectionService.renderer = this._renderer;
        this._sizeService.renderer = this._renderer;
        this._dragService.renderer = this._renderer;
        this._interactionService.renderer = this._renderer;
        this._keyDownSubject.subscribe(e => this.keyDownHandler(e));
    }
    /**
     * Called when the keyboard key is released.
     * @param {?} e KeyboardEvent
     * @return {?}
     */
    keyUp(e) {
        if (e.code === 'Delete' && this._selectionService.selectors.length > 0) {
            this.deleteSelectedElements();
        }
    }
    /**
     * Called when the keyboard key is pressed.
     * @param {?} e KeyboardEvent
     * @return {?}
     */
    keyPress(e) {
        if (this._selectionService.selectors.length > 0) {
            e.stopPropagation();
        }
    }
    /**
     * Called when the keyboard key is pressed.
     * @param {?} e KeyboardEvent
     * @return {?}
     */
    keyDown(e) {
        this._keyDownSubject.next(e);
    }
    /**
     * @param {?} e
     * @return {?}
     */
    keyDownHandler(e) {
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
            let delta;
            /** @type {?} */
            const snap = this.snap ? this.snap : 1;
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
    }
    /**
     * Ensures that the default HTML5 dragging operations do not execute.
     * @return {?}
     */
    dragStart() {
        // -- prevent default drag
        return false;
    }
    /**
     * Called when the pointer is moved.
     * @param {?} e PointerEvent
     * @return {?}
     */
    pointerMove(e) {
        e.preventDefault();
        if (this._isMouseDown) {
            /** @type {?} */
            let mousePos = this.getRelativePointerPos(e);
            if (this._selectionService.hasLasso) {
                /** @type {?} */
                const mouseDownPos = this._mouseDownPos;
                this._selectionService.resizeLasso(mousePos.x - mouseDownPos.x, mousePos.y - mouseDownPos.y, mouseDownPos);
            }
            else if (this._selectionService.selectors.length > 0) {
                /** @type {?} */
                const mouseChange = this.getPointerChange(e);
                this._selectionService.nudgeBy(mouseChange[0], NudgeType.Overlay);
                mousePos = mouseChange[1];
                this._lastDropZone = this._dragService.updateDropZone(this._selectionService.activeSelector.overlay, this._el.nativeElement, [this._selectionService.activeSelector.clientEl]);
            }
            this._lastMousePos = mousePos;
        }
        else {
            this.ensureCursor(e);
        }
    }
    /**
     * Called when the pointer is pressed.
     * @param {?} e PointerEvent
     * @return {?}
     */
    pointerDown(e) {
        this._isMouseDown = true;
        this._mouseDownPos = this.getRelativePointerPos(e);
        this._lastMousePos = this._mouseDownPos;
        if (e.target === this._el.nativeElement) {
            this._selectionService.createlassoSelector(this._mouseDownPos.x, this._mouseDownPos.y);
        }
        else {
            /** @type {?} */
            const element = /** @type {?} */ (e.target);
            this._selectionService.selectElement(element, !e.shiftKey);
        }
    }
    /**
     * Called when the pointer is released.
     * @param {?} e PointerEvent
     * @return {?}
     */
    pointerUp(e) {
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
    }
    /**
     * Attemps to drop the currently selected elements into a drop zone
     * @return {?}
     */
    tryDropSelectedElements() {
        /** @type {?} */
        const selectors = this._selectionService.selectors;
        selectors.forEach(selector => {
            if (this.canDrop(selector.clientEl)) {
                this._dragService.dropElement(this._lastDropZone, selector.clientEl, this._el.nativeElement);
            }
        });
        this._selectionService.reselect();
    }
    /**
     * Ensures that the appropriate cursor is set when element is draggable.
     * @param {?} e PointerEvent
     * @return {?}
     */
    ensureCursor(e) {
        /** @type {?} */
        const mousePos = new Point(e.pageX, e.pageY);
        /** @type {?} */
        const selector = this._selectionService.selectorAtPoint(mousePos);
        if (selector && elementDraggable(selector.clientEl)) {
            this._renderer.setStyle(this._el.nativeElement, 'cursor', 'move');
        }
        else {
            this._renderer.setStyle(this._el.nativeElement, 'cursor', 'default');
        }
    }
    /**
     * Resizes the selected elements to match the Selector overlay
     * @return {?}
     */
    resizeSelectedElements() {
        /** @type {?} */
        const selectors = this._selectionService.selectors;
        /** @type {?} */
        const sizedElements = [];
        selectors.forEach(selector => {
            if (elementSizable(selector.clientEl)) {
                sizedElements.push(selector.clientEl);
                assignBoundingRect(this._renderer, selector.overlay, selector.clientEl);
                this.resizedElement.emit(selector.clientEl);
            }
        });
        this.resetSelection();
        if (sizedElements.length > 0) {
            this.resizedElements.emit(sizedElements);
        }
    }
    /**
     * Moves selected elements to the current location of the selector or selector overlay.
     * @param {?=} nudgeType determines where the selected elements should be moved.  Options are
     * to move to the actual selector (NudgeType.Selector) or the selector overlay (NodgeType.Overlay).
     * Usually only the overlay is dragged/moved, hence the default of NudgeType.Overlay.
     * @param {?=} resetAfterMove determines if the selector should reset itself after every move.
     * @return {?}
     */
    moveSelectedElements(nudgeType = NudgeType.Overlay, resetAfterMove = true) {
        /** @type {?} */
        const selectors = this._selectionService.selectors;
        /** @type {?} */
        const movedElements = [];
        selectors.forEach(selector => {
            if (elementDraggable(selector.clientEl)) {
                movedElements.push(selector.clientEl);
                assignPosition(this._renderer, nudgeType === NudgeType.Overlay
                    ? selector.overlay
                    : selector.selectorEl, selector.clientEl);
                this.movedElement.emit(selector.clientEl);
            }
        });
        if (resetAfterMove) {
            this.resetSelection();
        }
        if (movedElements.length > 0) {
            this.movedElements.emit(movedElements);
        }
    }
    /**
     * Deletes selected elements.
     * @return {?}
     */
    deleteSelectedElements() {
        /** @type {?} */
        const selectors = this._selectionService.selectors;
        /** @type {?} */
        const deletedElements = [];
        for (let index = selectors.length - 1; index >= 0; index--) {
            /** @type {?} */
            const selector = selectors[index];
            if (this.canDelete(selector.clientEl)) {
                /** @type {?} */
                const el = selector.clientEl;
                this._selectionService.clearSelector(selector);
                this._interactionService.deleteElement(el);
                deletedElements.push(el);
            }
        }
        this._interactionService.deleteElements(deletedElements);
        this._interactionService.selectedElements = this._selectionService.clients;
    }
    /**
     * Add a new child element to the host element.
     * @param {?} element
     * @return {?}
     */
    addElement(element) {
        /** @type {?} */
        const selector = this._selectionService.activeSelector;
        /** @type {?} */
        const parent = selector && isContainer(selector.clientEl) ? selector.clientEl : this._el.nativeElement;
        this._renderer.appendChild(parent, element);
    }
    /**
     * Gets the mouse position relative to the offset and scale of the host element.
     * @param {?} e PointerEvent
     * @return {?}
     */
    getRelativePointerPos(e) {
        return getRelativePointerPos(e, this._el.nativeElement, this.scale);
    }
    /**
     * Gets pointer coordinates changes relative to the selected element.
     * @param {?} e PointerEvent
     * @return {?}
     */
    getPointerChange(e) {
        /** @type {?} */
        const pointerPos = this.getRelativePointerPos(e);
        /** @type {?} */
        let left = pointerPos.x - this._lastMousePos.x;
        /** @type {?} */
        let top = pointerPos.y - this._lastMousePos.y;
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
    }
    /**
     * Re-selects the currently selected elements.  Usually happens after
     * an element is moved or resized.
     * @return {?}
     */
    resetSelection() {
        this._selectionService.reselect();
    }
    /**
     * Cancels the current selections or drag operation.  If the elements are being dragged,
     * the drag operation is cancelled and the elements reselected.  Otherwise, the elements
     * are unselected.
     * @return {?}
     */
    cancelSelection() {
        if (this._isMouseDown) {
            this._selectionService.reselect();
        }
        else {
            this._selectionService.clearSelectors();
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this._el.nativeElement && this._renderer) {
            this._interactionService.interactionHost = this._el.nativeElement;
            this._selectionService.interactionHost = this._el.nativeElement;
            this._selectionService.isLassoSelectable = this.isLassoSelectable;
            this._cursor = getComputedStyle(this._el.nativeElement).cursor;
            this._deleteSelectedElementsSubscription = this._interactionService.deleteSelectedElements$.subscribe(() => {
                this.deleteSelectedElements();
            });
            this._addElementSubscription = this._interactionService.addElement$.subscribe(element => {
                // this.addElement(element);
            });
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._lastDropZone = null;
        this._deleteSelectedElementsSubscription.unsubscribe();
        this._addElementSubscription.unsubscribe();
    }
}
InteractionComponent.decorators = [
    { type: Component, args: [{
                selector: 'hpc-interaction',
                template: "<div #interactionContainer tabindex=\"0\" (dragstart)=\"dragStart()\" (pointerdown)=\"pointerDown($event)\" (pointerup)=\"pointerUp($event)\"\r\n  (pointermove)=\"pointerMove($event)\" (keydown)=\"keyDown($event)\" (keyup)=\"keyUp($event)\" (keypress)=\"keyPress($event)\"\r\n  [style.transform]=\"'scale('+scale+')'\" [ngClass]=\"{'hpc-checkers-background': isCheckersBackground}\" class=\"interaction-container\">\r\n  <ng-content></ng-content>\r\n</div>\r\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{box-sizing:border-box;position:absolute;height:100%;width:100%}.hpc-new-element{background-color:gray;top:10px;left:10px;height:200px;width:400px;border:1px solid #000}.interaction-container{height:100%;box-sizing:border-box;background:0 0}.hpc-checkers-background{background:url('data:image/svg+xml,\\<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"400\" height=\"400\" fill-opacity=\".25\" >            <rect x=\"200\" width=\"200\" height=\"200\" />            <rect y=\"200\" width=\"200\" height=\"200\" />            </svg>') 0 0/20px 20px gray}.hpc-element-selector,.hpc-lasso-selector{border:2px dashed #000;pointer-events:None}.grip-container{pointer-events:None;height:100%;width:100%;display:flex}.grip-container-l,.grip-container-m,.grip-container-r{display:flex;flex-direction:column;justify-content:space-between;flex:1}.grip-container-l{align-items:flex-start}.grip-container-m{align-items:center}.grip-container-r{align-items:flex-end}.grip{--grip-offset:-9px;background-color:#f2f2f2;border:2px solid #000;height:13px;width:13px;opacity:.85}.grip-bl,.grip-bm,.grip-br,.grip-lm,.grip-rm,.grip-tl,.grip-tm,.grip-tr{pointer-events:auto}.grip-tl{margin-left:var(--grip-offset);margin-top:var(--grip-offset);cursor:nw-resize}.grip-tm{margin-top:var(--grip-offset);cursor:n-resize}.grip-bm{margin-bottom:var(--grip-offset);cursor:n-resize}.grip-tr{margin-top:var(--grip-offset);margin-right:var(--grip-offset);cursor:ne-resize}.grip-br{cursor:nw-resize;margin-right:var(--grip-offset);margin-bottom:var(--grip-offset)}.grip-rm{cursor:e-resize;margin-right:var(--grip-offset)}.grip-bl{cursor:ne-resize;margin-left:var(--grip-offset);margin-bottom:var(--grip-offset)}.grip-lm{cursor:e-resize;margin-left:var(--grip-offset)}.grip-bl,.grip-br,.grip-tl,.grip-tr{border-radius:50%}.hpc-sizer-overlay{z-index:10000}.hpc-drag-overlay{opacity:.5;z-index:10000}.hpc-dropzone.active{border:2px dashed #fff}"]
            }] }
];
/** @nocollapse */
InteractionComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: DragService },
    { type: SizeService },
    { type: InteractionService },
    { type: SelectorService }
];
InteractionComponent.propDecorators = {
    _el: [{ type: ViewChild, args: ['interactionContainer',] }],
    scale: [{ type: Input }],
    snap: [{ type: Input }],
    minSizingWidth: [{ type: Input }],
    minSizingHeight: [{ type: Input }],
    isLassoSelectable: [{ type: Input }],
    isCheckersBackground: [{ type: Input }],
    resizedElement: [{ type: Output }],
    resizedElements: [{ type: Output }],
    movedElement: [{ type: Output }],
    movedElements: [{ type: Output }],
    selectElement: [{ type: Output }],
    canDelete: [{ type: Input }],
    canDrop: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ComposerComponent {
    constructor() {
        this.headerVisible = true;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
ComposerComponent.decorators = [
    { type: Component, args: [{
                selector: 'hpc-composer',
                template: "<div class=\"composer_container\">\n    <div *ngIf=\"headerVisible\" class=\"header-row\">\n       <ng-content select=\"[header]\"></ng-content>\n    </div>\n    <div class= \"body-row\">\n      <div class=\"composer_container-widgets\">\n          <ng-content select=\"[widgets]\"></ng-content>\n      </div>\n      <div class=\"composer-main-container\">\n        <div class=\"composer-menu-container\">\n           <ng-content select=\"[menu]\"></ng-content>\n        </div>\n        <hpc-interaction [isCheckersBackground]=true [isLassoSelectable]=true [scale]=0.65>\n          <!-- sample elements - will remove in production version  -->\n          <div class=\"hpc-dropzone\" style=\"position: absolute; top: 400px; left: 100px; height: 200px; width:400px; background: orangered\">\n            <div style=\"position: absolute; top: 10px; left: 10px; height: 180px; width:200px; background: yellow\">\n              <div class=\"hpc-dropzone\" style=\"position: absolute; top: 10px; left: 10px; height: 100px; width:100px; background: rgb(0, 255, 0)\"></div>\n            </div>\n          </div>\n          <div class=\"hpc-no-drag hpc-no-size\" style=\"position: absolute; left: 600px; top: 100px; height: 600px; width:500px; background: rgb(15, 94, 88)\"></div>\n          <!-- end sample elements -->\n        </hpc-interaction>\n      </div>\n      <div class=\"composer_container-properties\"></div>\n    </div>\n</div>\n\n",
                styles: [":host /deep/ .interaction-container{height:1080px;width:1920px;-webkit-transform-origin:left top;transform-origin:left top;margin-left:33px;margin-top:2%}.composer_container{display:flex;flex-direction:column;overflow:hidden}.composer_container>*{--container-background:rgb(35, 36, 35);--container-header:rgb(63, 63, 63);--container-header-color:rgb(29, 202, 38);--container-main:rgb(63, 63, 63)}.composer_container-widgets{display:flex;flex-direction:column;width:300px;background-color:var(--container-background)}.composer_container-properties{width:300px;background-color:var(--container-background)}.composer-main-container{overflow:auto;background-color:var(--container-main);height:100%;display:flex;flex-direction:column;flex:1}.composer-menu-container{color:#fff;padding:10px;min-height:75px;width:100%}.header-row{display:flex;flex-wrap:wrap;height:75px;background:gray}.body-row{display:flex;height:100%;width:100%}"]
            }] }
];
/** @nocollapse */
ComposerComponent.ctorParameters = () => [];
ComposerComponent.propDecorators = {
    headerVisible: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class TreeviewComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
TreeviewComponent.decorators = [
    { type: Component, args: [{
                selector: 'hpc-treeview',
                template: "<p>\n  treeview works!\n</p>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
TreeviewComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class TreeviewItemComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
TreeviewItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'hpc-treeview-item',
                template: "<p>\n  treeview-item works!\n</p>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
TreeviewItemComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class SelectorComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
SelectorComponent.decorators = [
    { type: Component, args: [{
                selector: 'hpc-selector',
                template: "<p>\n  selector works!\n</p>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
SelectorComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class FileManagerComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
FileManagerComponent.decorators = [
    { type: Component, args: [{
                selector: 'hpc-file-manager',
                template: "<p>\n  file-manager works!\n</p>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
FileManagerComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PropertyGridComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
PropertyGridComponent.decorators = [
    { type: Component, args: [{
                selector: 'hpc-property-grid',
                template: "<p>\n  property-grid works!\n</p>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
PropertyGridComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class HpComponentsModule {
}
HpComponentsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { HpComponentsService, HpComponentsModule, InteractionService, InteractionComponent, ComposerComponent as ɵd, FileManagerComponent as ɵh, PropertyGridComponent as ɵi, SelectorComponent as ɵg, SelectorService as ɵc, DragService as ɵa, SizeService as ɵb, TreeviewItemComponent as ɵf, TreeviewComponent as ɵe };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHAtY29tcG9uZW50cy5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vaHAtY29tcG9uZW50cy9saWIvaHAtY29tcG9uZW50cy5zZXJ2aWNlLnRzIiwibmc6Ly9ocC1jb21wb25lbnRzL2xpYi9zY3JpcHRzL21hdGgudHMiLCJuZzovL2hwLWNvbXBvbmVudHMvbGliL3NjcmlwdHMvZG9tLnRzIiwibmc6Ly9ocC1jb21wb25lbnRzL2xpYi9zZXJ2aWNlcy9kcmFnLnNlcnZpY2UudHMiLCJuZzovL2hwLWNvbXBvbmVudHMvbGliL3NlcnZpY2VzL3NpemUuc2VydmljZS50cyIsIm5nOi8vaHAtY29tcG9uZW50cy9saWIvc2VsZWN0b3Ivc2VsZWN0b3Iuc2VydmljZS50cyIsIm5nOi8vaHAtY29tcG9uZW50cy9saWIvaW50ZXJhY3Rpb24vaW50ZXJhY3Rpb24uc2VydmljZS50cyIsIm5nOi8vaHAtY29tcG9uZW50cy9saWIvaW50ZXJhY3Rpb24vaW50ZXJhY3Rpb24uY29tcG9uZW50LnRzIiwibmc6Ly9ocC1jb21wb25lbnRzL2xpYi9jb21wb3Nlci9jb21wb3Nlci5jb21wb25lbnQudHMiLCJuZzovL2hwLWNvbXBvbmVudHMvbGliL3RyZWV2aWV3L3RyZWV2aWV3LmNvbXBvbmVudC50cyIsIm5nOi8vaHAtY29tcG9uZW50cy9saWIvdHJlZXZpZXcvdHJlZXZpZXctaXRlbS90cmVldmlldy1pdGVtLmNvbXBvbmVudC50cyIsIm5nOi8vaHAtY29tcG9uZW50cy9saWIvc2VsZWN0b3Ivc2VsZWN0b3IuY29tcG9uZW50LnRzIiwibmc6Ly9ocC1jb21wb25lbnRzL2xpYi9maWxlLW1hbmFnZXIvZmlsZS1tYW5hZ2VyLmNvbXBvbmVudC50cyIsIm5nOi8vaHAtY29tcG9uZW50cy9saWIvcHJvcGVydHktZ3JpZC9wcm9wZXJ0eS1ncmlkLmNvbXBvbmVudC50cyIsIm5nOi8vaHAtY29tcG9uZW50cy9saWIvaHAtY29tcG9uZW50cy5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBIcENvbXBvbmVudHNTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFJlY3Qge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbGVmdDogbnVtYmVyID0gMCwgcHVibGljIHRvcDogbnVtYmVyID0gMCwgcHVibGljIHdpZHRoOiBudW1iZXIgPSAwLCBwdWJsaWMgaGVpZ2h0OiBudW1iZXIgPSAwKSB7IH1cbiAgZ2V0IHJpZ2h0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMubGVmdCArIHRoaXMud2lkdGg7XG4gIH1cbiAgZ2V0IGJvdHRvbSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnRvcCArIHRoaXMuaGVpZ2h0O1xuICB9XG4gIGdldCBpc0VtcHR5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAodGhpcy5oZWlnaHQgKyB0aGlzLndpZHRoKSA9PT0gMDtcbiAgfVxuICBnZXQgdG9wTGVmdCgpOiBQb2ludCB7XG4gICAgcmV0dXJuIG5ldyBQb2ludCh0aGlzLmxlZnQsIHRoaXMudG9wKTtcbiAgfVxuICBnZXQgdG9wUmlnaHQoKTogUG9pbnQge1xuICAgIHJldHVybiBuZXcgUG9pbnQodGhpcy5yaWdodCwgdGhpcy50b3ApO1xuICB9XG4gIGdldCBib3R0b21MZWZ0KCk6IFBvaW50IHtcbiAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMubGVmdCwgdGhpcy5ib3R0b20pO1xuICB9XG4gIGdldCBib3R0b21SaWdodCgpOiBQb2ludCB7XG4gICAgcmV0dXJuIG5ldyBQb2ludCh0aGlzLnJpZ2h0LCB0aGlzLmJvdHRvbSk7XG4gIH1cblxufVxuZXhwb3J0IGNsYXNzIFNpemUge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgaGVpZ2h0OiBudW1iZXIgPSAwLCBwdWJsaWMgd2lkdGg6IG51bWJlciA9IDApIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgUG9pbnQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgeDogbnVtYmVyID0gMCwgcHVibGljIHk6IG51bWJlciA9IDApIHsgfVxuICBhZGQocG9pbnQ6IFBvaW50KSB7XG4gICAgdGhpcy54ID0gdGhpcy54ICsgcG9pbnQueDtcbiAgICB0aGlzLnkgPSB0aGlzLnkgKyBwb2ludC55O1xuICB9XG4gIHN1YnRyYWN0KHBvaW50OiBQb2ludCkge1xuICAgIHRoaXMueCA9IHRoaXMueCAtIHBvaW50Lng7XG4gICAgdGhpcy55ID0gdGhpcy55IC0gcG9pbnQueTtcbiAgfVxufVxuIiwiaW1wb3J0IHtQb2ludCwgUmVjdCwgU2l6ZX0gZnJvbSAnLi9tYXRoJztcbmltcG9ydCB7UmVuZGVyZXIyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIG9mZnNldDIoZWw6IEhUTUxFbGVtZW50KTogUG9pbnQge1xuICAgY29uc3QgcmVzdWx0ID0gbmV3IFBvaW50KGVsLm9mZnNldExlZnQsIGVsLm9mZnNldFRvcCk7XG4gICBpZiAoZWwucGFyZW50RWxlbWVudCkge1xuICAgICByZXN1bHQuYWRkKG9mZnNldChlbC5wYXJlbnRFbGVtZW50KSk7XG4gICB9XG4gICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb2Zmc2V0KGVsOiBIVE1MRWxlbWVudCk6IFBvaW50IHtcbiAgY29uc3QgYm94ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIGNvbnN0IHRvcCA9IGJveC50b3A7XG4gIGNvbnN0IGxlZnQgPSBib3gubGVmdDtcbiAgcmV0dXJuIG5ldyBQb2ludChsZWZ0LCB0b3ApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGl4VG9OdW0odmFsdWU6IHN0cmluZyk6IG51bWJlciB7XG4gIGlmICghdmFsdWUgfHwgdmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgY29uc3QgbmV3VmFsdWUgPSB2YWx1ZS5yZXBsYWNlKCdweCcsICcnKS5yZXBsYWNlKCdlbScsICcnKTtcbiAgcmV0dXJuIHBhcnNlRmxvYXQobmV3VmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbnVtVG9QaXgodmFsdWU6IG51bWJlciwgYXV0b1doZW5aZXJvOiBib29sZWFuID0gZmFsc2UpOiBzdHJpbmcge1xuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHZhbHVlID0gMDtcbiAgfVxuICBpZiAoYXV0b1doZW5aZXJvICYmIHZhbHVlID09PSAwKSB7XG4gICAgcmV0dXJuICdhdXRvJztcbiAgfVxuICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKSArICdweCc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGlsZEVsZW1lbnRzKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBvcmRlckJ5Wk9yZGVyID0gZmFsc2UpOiBIVE1MRWxlbWVudFtdIHtcbiAgY29uc3QgcmVzdWx0ID0gbmV3IEFycmF5PEhUTUxFbGVtZW50PigpO1xuICBpZiAoIWVsZW1lbnQpIHtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGNvbnN0IGNoaWxkcmVuID0gZWxlbWVudC5jaGlsZHJlbjtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGNoaWxkID0gY2hpbGRyZW5baV0gYXMgSFRNTEVsZW1lbnQ7XG4gICAgaWYgKGNoaWxkICYmIGNoaWxkLnBhcmVudEVsZW1lbnQgPT09IGVsZW1lbnQgJiZcbiAgICAgIGNoaWxkLmNsYXNzTmFtZS5pbmRleE9mKCdocGMtbGFzc28tc2VsZWN0b3InKSA9PT0gLTEgJiZcbiAgICAgIGNoaWxkLmNsYXNzTmFtZS5pbmRleE9mKCdocGMtZWxlbWVudC1zZWxlY3RvcicpID09PSAtMSAmJlxuICAgICAgY2hpbGQuY2xhc3NOYW1lLmluZGV4T2YoJ2dyaXAnKSA9PT0gLTEpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGNoaWxkKTtcbiAgICB9XG4gIH1cblxuICBpZiAob3JkZXJCeVpPcmRlcikge1xuICAgIC8vIHJlc3VsdCA9IEVudW1lcmFibGUuZnJvbShyZXN1bHQpLm9yZGVyQnkoeCA9PiBwYXJzZUludCh4LnN0eWxlLnpJbmRleCwgTmFOKSkudG9BcnJheSgpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVIZWxwZXJDaGlsZHJlbihjaGlsZHJlbjogSFRNTEVsZW1lbnRbXSkge1xuICBmb3IgKGxldCBpID0gY2hpbGRyZW4ubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBjb25zdCBjaGlsZCA9IGNoaWxkcmVuW2ldIGFzIEhUTUxFbGVtZW50O1xuICAgIGlmIChjaGlsZC5jbGFzc05hbWUuaW5kZXhPZignaHBjLWxhc3NvLXNlbGVjdG9yJykgPiAtMSB8fFxuICAgICAgY2hpbGQuY2xhc3NOYW1lLmluZGV4T2YoJ2hwYy1lbGVtZW50LXNlbGVjdG9yJykgPiAtMSB8fFxuICAgICAgY2hpbGQuY2xhc3NOYW1lLmluZGV4T2YoJ2hwYy1kcmFnLW92ZXJsYXknKSA+IC0xIHx8XG4gICAgICBjaGlsZC5jbGFzc05hbWUuaW5kZXhPZignZ3JpcC1jb250YWluZXInKSA+IC0xIHx8XG4gICAgICBjaGlsZC5jbGFzc05hbWUuaW5kZXhPZignZ3JpcCcpID4gLTEpIHtcbiAgICAgIHJlbW92ZUFycmF5SXRlbShjaGlsZHJlbiwgY2hpbGQpO1xuICAgIH1cbiAgfVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVBcnJheUl0ZW0oYXJyYXk6IGFueVtdLCBpdGVtOiBhbnkpIHtcbiAgY29uc3QgaW5kZXggPSB0eXBlb2YoaXRlbSkgPT09ICdudW1iZXInID8gaXRlbSA6IGFycmF5LmluZGV4T2YoaXRlbSkgO1xuICBpZiAoaW5kZXggPiAtMSkge1xuICAgIGFycmF5LnNwbGljZShpbmRleCwgMSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGludGVyc2VjdChhOiBSZWN0LCBiOiBSZWN0KTogYm9vbGVhbiB7XG4gIHJldHVybiAoYS5sZWZ0IDw9IGIucmlnaHQgJiZcbiAgICBiLmxlZnQgPD0gYS5yaWdodCAmJlxuICAgIGEudG9wIDw9IGIuYm90dG9tICYmXG4gICAgYi50b3AgPD0gYS5ib3R0b20pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gIGVsZW1lbnRzQXRSZWN0KHBhcmVudDogSFRNTEVsZW1lbnQsIHJlY3Q6IFJlY3QsIGV4Y2x1ZGU6IEhUTUxFbGVtZW50W10gPSBbXSkge1xuICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBjaGlsZEVsZW1lbnRzKHBhcmVudCkuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICBpZiAoaW50ZXJzZWN0KGVsZW1lbnRCb3VuZHMoZWxlbWVudCksIHJlY3QpKSB7XG4gICAgICBpZiAoZXhjbHVkZSA9PSBudWxsIHx8IGV4Y2x1ZGUuaW5kZXhPZihlbGVtZW50KSA9PT0gLTEpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goZWxlbWVudCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVsZW1lbnRQb3MoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBQb2ludCB7XG4gIGNvbnN0IGNvbXB1dGVkU3R5bGVzID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50LCBudWxsKTtcbiAgcmV0dXJuIG5ldyBQb2ludChwaXhUb051bShjb21wdXRlZFN0eWxlcy5sZWZ0KSwgcGl4VG9OdW0oY29tcHV0ZWRTdHlsZXMudG9wKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbGVtZW50U2l6ZShlbGVtZW50OiBIVE1MRWxlbWVudCk6IFNpemUge1xuICBjb25zdCBjb21wdXRlZFN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCwgbnVsbCk7XG4gIHJldHVybiBuZXcgU2l6ZShwaXhUb051bShjb21wdXRlZFN0eWxlcy5oZWlnaHQpLCBwaXhUb051bShjb21wdXRlZFN0eWxlcy53aWR0aCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWxlbWVudEJvdW5kcyhlbGVtZW50OiBIVE1MRWxlbWVudCwgcmVsYXRpdmVUb1BhZ2U6IGJvb2xlYW4gPSBmYWxzZSwgc2NhbGU6IFBvaW50ID0gbnVsbCk6IFJlY3Qge1xuICBsZXQgcG9zID0gZWxlbWVudFBvcyhlbGVtZW50KTtcbiAgaWYgKHJlbGF0aXZlVG9QYWdlKSB7XG4gICAgcG9zID0gZWxlbWVudFBhZ2VQb3MoZWxlbWVudCk7XG4gIH1cbiAgY29uc3Qgc2l6ZSA9IGVsZW1lbnRTaXplKGVsZW1lbnQpO1xuICBpZiAoc2NhbGUpIHtcbiAgICBzaXplLndpZHRoID0gc2l6ZS53aWR0aCAqIHNjYWxlLng7XG4gICAgc2l6ZS5oZWlnaHQgPSBzaXplLmhlaWdodCAqIHNjYWxlLnk7XG4gIH1cbiAgcmV0dXJuIG5ldyBSZWN0KHBvcy54LCBwb3MueSwgc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWxlbWVudFBhZ2VQb3MoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBQb2ludCB7XG4gIGNvbnN0IHJlc3VsdCA9IGVsZW1lbnRQb3MoZWxlbWVudCk7XG4gIGlmIChlbGVtZW50LnBhcmVudEVsZW1lbnQgPT0gbnVsbCkge1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgbGV0IGxlZnQgPSByZXN1bHQueDtcbiAgbGV0IHRvcCA9IHJlc3VsdC55O1xuICBjb25zdCBwYXJlbnRzID0gcGFyZW50VHJlZShlbGVtZW50KTtcbiAgcGFyZW50cy5mb3JFYWNoKHBhcmVudCA9PiB7XG4gICAgbGVmdCArPSBwaXhUb051bShwYXJlbnQuc3R5bGUubGVmdCkgKyBwYXJlbnQuY2xpZW50TGVmdDtcbiAgICB0b3AgKz0gcGl4VG9OdW0ocGFyZW50LnN0eWxlLnRvcCkgKyBwYXJlbnQuY2xpZW50VG9wO1xuICB9KTtcbiAgcmV0dXJuIG5ldyBQb2ludChsZWZ0LCB0b3ApO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJlbnRUcmVlKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBsYXN0Q2xhc3M6IHN0cmluZyA9ICdzdXJmYWNlJywgaW5jbHVzaXZlID0gZmFsc2UpOiBBcnJheTxIVE1MRWxlbWVudD4ge1xuICBjb25zdCByZXN1bHQgPSBuZXcgQXJyYXk8SFRNTEVsZW1lbnQ+KCk7XG4gIGlmICghZWxlbWVudCkge1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgbGV0IHBhcmVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgd2hpbGUgKHBhcmVudCAhPSBudWxsKSB7XG4gICAgaWYgKCFpbmNsdXNpdmUgJiYgcGFyZW50LmNsYXNzTGlzdC5jb250YWlucyhsYXN0Q2xhc3MpKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgcmVzdWx0LnB1c2gocGFyZW50KTtcbiAgICBpZiAocGFyZW50LmNsYXNzTGlzdC5jb250YWlucyhsYXN0Q2xhc3MpKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgcGFyZW50ID0gcGFyZW50LnBhcmVudEVsZW1lbnQ7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVFbGVtZW50VG8ocmVuZGVyZXI6IFJlbmRlcmVyMiwgZWxlbWVudDogSFRNTEVsZW1lbnQsIHBvc2l0aW9uOiBQb2ludCk6IHZvaWQge1xuICBpZiAoIWVsZW1lbnQpIHsgcmV0dXJuOyB9XG4gIHJlbmRlcmVyLnNldFN0eWxlKGVsZW1lbnQsICd0b3AnLCBwb3NpdGlvbi55ICsgJ3B4Jyk7XG4gIHJlbmRlcmVyLnNldFN0eWxlKGVsZW1lbnQsICdsZWZ0JywgcG9zaXRpb24ueCArICdweCcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbW92ZUVsZW1lbnRCeShyZW5kZXJlcjogUmVuZGVyZXIyLCBlbGVtZW50LCBkZWx0YTogUG9pbnQpIHtcbiAgaWYgKCFlbGVtZW50KSB7IHJldHVybjsgfVxuICBjb25zdCBwb3MgPSBlbGVtZW50UG9zKGVsZW1lbnQpO1xuICBjb25zdCB0b3AgPSBwb3MueSArIGRlbHRhLnk7XG4gIGNvbnN0IGxlZnQgPSBwb3MueCArIGRlbHRhLng7XG4gIHJlbmRlcmVyLnNldFN0eWxlKGVsZW1lbnQsICd0b3AnLCB0b3AgKyAncHgnKTtcbiAgcmVuZGVyZXIuc2V0U3R5bGUoZWxlbWVudCwgJ2xlZnQnLCBsZWZ0ICsgJ3B4Jyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaXplRWxlbWVudEJ5KHJlbmRlcmVyOiBSZW5kZXJlcjIsIGVsZW1lbnQsIGRlbHRhOiBQb2ludCkge1xuICBpZiAoIWVsZW1lbnQpIHsgcmV0dXJuOyB9XG4gIGNvbnN0IHNpemUgPSBlbGVtZW50U2l6ZShlbGVtZW50KTtcbiAgY29uc3QgaGVpZ2h0ID0gc2l6ZS5oZWlnaHQgKyBkZWx0YS55O1xuICBjb25zdCB3aWR0aCA9IHNpemUud2lkdGggKyBkZWx0YS54O1xuICByZW5kZXJlci5zZXRTdHlsZShlbGVtZW50LCAnaGVpZ2h0JywgaGVpZ2h0ICsgJ3B4Jyk7XG4gIHJlbmRlcmVyLnNldFN0eWxlKGVsZW1lbnQsICd3aWR0aCcsIHdpZHRoICsgJ3B4Jyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NpZ25Cb3VuZGluZ1JlY3QocmVuZGVyZXI6IFJlbmRlcmVyMiwgc291cmNlOiBIVE1MRWxlbWVudCwgdGFyZ2V0OiBIVE1MRWxlbWVudCkge1xuICBjb25zdCBzb3VyY2VSZWN0ID0gZWxlbWVudEJvdW5kcyhzb3VyY2UpO1xuICAvLyBjb25zdCBzdHlsZXMgPSBnZXRDb21wdXRlZFN0eWxlKHNvdXJjZSk7XG4gIGNvbnN0IHRvcCA9IHNvdXJjZVJlY3QudG9wOyAvLyArIHBpeFRvTnVtKHN0eWxlcy5tYXJnaW5Ub3ApO1xuICBjb25zdCBsZWZ0ID0gc291cmNlUmVjdC5sZWZ0OyAvLyArIHBpeFRvTnVtKHN0eWxlcy5tYXJnaW5MZWZ0KTtcbiAgcmVuZGVyZXIuc2V0U3R5bGUodGFyZ2V0LCAndG9wJywgdG9wICsgJ3B4Jyk7XG4gIHJlbmRlcmVyLnNldFN0eWxlKHRhcmdldCwgJ2xlZnQnLCBsZWZ0ICsgJ3B4Jyk7XG4gIHJlbmRlcmVyLnNldFN0eWxlKHRhcmdldCwgJ2hlaWdodCcsIHNvdXJjZVJlY3QuaGVpZ2h0ICsgJ3B4Jyk7XG4gIHJlbmRlcmVyLnNldFN0eWxlKHRhcmdldCwgJ3dpZHRoJywgc291cmNlUmVjdC53aWR0aCArICdweCcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzaWduUG9zaXRpb24ocmVuZGVyZXI6IFJlbmRlcmVyMiwgc291cmNlOiBIVE1MRWxlbWVudCwgdGFyZ2V0OiBIVE1MRWxlbWVudCkge1xuICBjb25zdCBzb3VyY2VSZWN0ID0gZWxlbWVudEJvdW5kcyhzb3VyY2UpO1xuICBjb25zdCBwb3MgPSBlbGVtZW50UG9zKHNvdXJjZSk7XG4gIHJlbmRlcmVyLnNldFN0eWxlKHRhcmdldCwgJ3RvcCcsIHBvcy55ICsgJ3B4Jyk7XG4gIHJlbmRlcmVyLnNldFN0eWxlKHRhcmdldCwgJ2xlZnQnLCBwb3MueCArICdweCcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0RWxlbWVudFJlY3QocmVuZGVyZXI6IFJlbmRlcmVyMiwgcmVjdDogUmVjdCwgZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgcmVuZGVyZXIuc2V0U3R5bGUoZWxlbWVudCwgJ3RvcCcsIHJlY3QudG9wICsgJ3B4Jyk7XG4gIHJlbmRlcmVyLnNldFN0eWxlKGVsZW1lbnQsICdsZWZ0JywgcmVjdC5sZWZ0ICsgJ3B4Jyk7XG4gIHJlbmRlcmVyLnNldFN0eWxlKGVsZW1lbnQsICdoZWlnaHQnLCByZWN0LmhlaWdodCArICdweCcpO1xuICByZW5kZXJlci5zZXRTdHlsZShlbGVtZW50LCAnd2lkdGgnLCByZWN0LndpZHRoICsgJ3B4Jyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGlsZHJlbk9mKHBhcmVudDogSFRNTEVsZW1lbnQsIGRlZXAgPSBmYWxzZSwgZXhjbHVkZSA9IFtdKTogSFRNTEVsZW1lbnRbXSB7XG4gIGxldCByZXN1bHQgPSBbXTtcbiAgaWYgKHBhcmVudCkge1xuICAgIGlmIChkZWVwKSB7XG4gICAgICByZXN1bHQgPSBBcnJheS5mcm9tKHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKCcqJykpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQgPSBBcnJheS5mcm9tKHBhcmVudC5jaGlsZHJlbik7XG4gICAgfVxuICAgIHJlbW92ZUhlbHBlckNoaWxkcmVuKHJlc3VsdCk7XG4gICAgcmVzdWx0ID0gcmVzdWx0LmZpbHRlcih4ID0+ICEoeCBpbiBleGNsdWRlKSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBvaW50SW5SZWN0KHBvaW50OiBQb2ludCwgcmVjdDogUmVjdCk6IGJvb2xlYW4ge1xuICByZXR1cm4gcG9pbnQueCA+PSByZWN0LmxlZnQgJiYgcG9pbnQueCA8PSByZWN0LnJpZ2h0ICYmIHBvaW50LnkgPj0gcmVjdC50b3AgJiYgcG9pbnQueSA8PSByZWN0LmJvdHRvbTtcbn1cblxuLyoqXG4qIFJldHVybnMgdGhlIGZpcnN0IGNoaWxkIGVsZW1lbnQgb2YgdGhlIHBhcmVudCBlbGVtZW50IGF0IGEgZ2l2ZW4gcG9pbnQuXG4qIElmIHRoZXJlIGFyZSBubyBjaGlsZCBlbGVtZW50cyBhdCB0aGUgZ2l2ZW4gcG9pbnQsIHRoZW4gdGhlIHBhcmVudCBlbGVtZW50IGlzIHJldHVybmVkLlxuKi9cbmV4cG9ydCBmdW5jdGlvbiBlbGVtZW50QXRQb2ludChwb3M6IFBvaW50LCBwYXJlbnQ6IEhUTUxFbGVtZW50LCBleGNsdWRlID0gW10pOiBIVE1MRWxlbWVudCB7XG4gICAgbGV0IHJlc3VsdCA9IHBhcmVudDtcbiAgICBjb25zdCBjaGlsZHJlbiA9IGNoaWxkcmVuT2YocGFyZW50LCBmYWxzZSwgZXhjbHVkZSk7XG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGNoaWxkcmVuLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY29uc3QgY2hpbGQgPSBjaGlsZHJlbltpbmRleF07XG4gICAgICBjb25zdCBlbFJlY3QgPSBjaGlsZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGNvbnN0IHJlY3QgPSBuZXcgUmVjdChlbFJlY3QubGVmdCwgZWxSZWN0LnRvcCwgZWxSZWN0LndpZHRoLCBlbFJlY3QuaGVpZ2h0KTtcbiAgICAgIGlmIChleGNsdWRlLmluZGV4T2YoY2hpbGQpID09PSAtMSAmJiBwb2ludEluUmVjdChwb3MsIHJlY3QpKSB7XG4gICAgICAgIHJlc3VsdCA9IGVsZW1lbnRBdFBvaW50KHBvcywgY2hpbGQsIGV4Y2x1ZGUpO1xuICAgICAgICBicmVhaztcbiAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB4ZWxlbWVudEF0UG9pbnQocG9zOiBQb2ludCwgcGFyZW50OiBIVE1MRWxlbWVudCwgZXhjbHVkZSA9IFtdKTogSFRNTEVsZW1lbnQge1xuICBsZXQgcmVzdWx0ID0gcGFyZW50O1xuICBjb25zdCBjaGlsZHJlbiA9IGNoaWxkRWxlbWVudHMocGFyZW50KTtcbiAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGNoaWxkcmVuLmxlbmd0aDsgaW5kZXgrKykge1xuICAgIGNvbnN0IGNoaWxkID0gY2hpbGRyZW5baW5kZXhdO1xuICAgIGNvbnN0IGVsUmVjdCA9IGNoaWxkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHJlY3QgPSBuZXcgUmVjdChlbFJlY3QubGVmdCwgZWxSZWN0LnRvcCwgZWxSZWN0LndpZHRoLCBlbFJlY3QuaGVpZ2h0KTtcbiAgICBpZiAoZXhjbHVkZS5pbmRleE9mKGNoaWxkKSA9PT0gLTEgJiYgcG9pbnRJblJlY3QocG9zLCByZWN0KSkge1xuICAgICAgcmVzdWx0ID0gY2hpbGQ7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoYW5nZVBhcmVudChlbGVtZW50OiBIVE1MRWxlbWVudCwgbmV3UGFyZW50OiBIVE1MRWxlbWVudCwgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICBpZiAoIW5ld1BhcmVudCB8fCBlbGVtZW50LnBhcmVudEVsZW1lbnQgPT09IG5ld1BhcmVudCkge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBwYXJlbnRQb3MgPSBlbGVtZW50UGFnZVBvcyhuZXdQYXJlbnQpO1xuICBjb25zdCBlbFBvcyA9IGVsZW1lbnRQYWdlUG9zKGVsZW1lbnQpO1xuICBjb25zdCBuZXdQb3MgPSBuZXcgUG9pbnQoZWxQb3MueCAtIHBhcmVudFBvcy54LCBlbFBvcy55IC0gcGFyZW50UG9zLnkpO1xuICByZW5kZXJlci5hcHBlbmRDaGlsZChuZXdQYXJlbnQsIGVsZW1lbnQpO1xuICBtb3ZlRWxlbWVudFRvKHJlbmRlcmVyLCBlbGVtZW50LCBuZXdQb3MpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2NhbGVkUG9zKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBzY2FsZTogbnVtYmVyKTogUG9pbnQge1xuICAgIGNvbnN0IHBvcyA9IG9mZnNldChlbGVtZW50KTtcbiAgICByZXR1cm4gbmV3IFBvaW50KFxuICAgICAgcG9zLnggLyBzY2FsZSxcbiAgICAgIHBvcy55IC8gc2NhbGVcbiAgICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmVsYXRpdmVQb2ludGVyUG9zKGU6IFBvaW50ZXJFdmVudCwgZWxlbWVudDogSFRNTEVsZW1lbnQsIHNjYWxlID0gMSkge1xuICBjb25zdCByZWxhdGl2ZVBvcyA9IG9mZnNldChlbGVtZW50KTtcbiAgcmV0dXJuIG5ldyBQb2ludChcbiAgICAoZS5wYWdlWCAtIHJlbGF0aXZlUG9zLngpIC8gc2NhbGUsXG4gICAgKGUucGFnZVkgLSByZWxhdGl2ZVBvcy55KSAvIHNjYWxlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbGVtZW50RHJhZ2dhYmxlKGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgcmV0dXJuICFlbGVtZW50TG9ja2VkKGVsZW1lbnQpICYmIGVsZW1lbnQuY2xhc3NOYW1lLmluZGV4T2YoJ2hwYy1uby1kcmFnJykgPT09IC0xO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWxlbWVudFNpemFibGUoZWxlbWVudDogRWxlbWVudCkge1xuICByZXR1cm4gIWVsZW1lbnRMb2NrZWQoZWxlbWVudCkgJiYgZWxlbWVudC5jbGFzc05hbWUuaW5kZXhPZignaHBjLW5vLXNpemUnKSA9PT0gLTE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbGVtZW50TG9ja2VkKGVsZW1lbnQ6IEVsZW1lbnQpOiBib29sZWFuIHtcbiAgcmV0dXJuIGVsZW1lbnQuY2xhc3NOYW1lLmluZGV4T2YoJ2hwYy1sb2NrZWQnKSA+IC0xO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNDb250YWluZXIoZWxlbWVudDogRWxlbWVudCk6IGJvb2xlYW4ge1xuICByZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2hwYy1jb250YWluZXInKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU2VsZWN0YWJsZShlbGVtZW50OiBFbGVtZW50KTogYm9vbGVhbiB7XG4gIHJldHVybiAhZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2hwYy1uby1zZWxlY3QnKTtcbn1cblxuXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBSZW5kZXJlcjIsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICcuLi9zY3JpcHRzL21hdGgnO1xuaW1wb3J0ICogYXMgZG9tIGZyb20gJy4uL3NjcmlwdHMvZG9tJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERyYWdTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95ICB7XG4gIGRyYWdDdXJzb3IgPSAnbW92ZSc7XG4gIHJlbmRlcmVyOiBSZW5kZXJlcjI7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIGNyZWF0ZURyYWdPdmVybGF5KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnQge1xuICAgIGNvbnN0IHJlc3VsdCA9IGVsZW1lbnQuY2xvbmVOb2RlKHRydWUpIGFzIEhUTUxFbGVtZW50O1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MocmVzdWx0LCAnaHBjLWRyYWctb3ZlcmxheScpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUocmVzdWx0LCAnY3Vyc29yJywgdGhpcy5kcmFnQ3Vyc29yKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHJlc3VsdCwgJ3pJbmRleCcsIDEwMDAwKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZHJhZ0VsZW1lbnRzQnkoZGVsdGE6IFBvaW50LCBlbGVtZW50czogSFRNTEVsZW1lbnRbXSkge1xuICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICBkb20ubW92ZUVsZW1lbnRCeSh0aGlzLnJlbmRlcmVyLCBlbGVtZW50LCBkZWx0YSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjYW5EcmFnKGVsZW1lbnQ6IEVsZW1lbnQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZG9tLmVsZW1lbnREcmFnZ2FibGUoZWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGNoaWxkIEhUTUxFbGVtZW50IGxvY2F0ZWQgYXQgdGhlIHRvcC1sZWZ0IGNvb3JkaW5hdGVzIG9mIHRoZVxuICAgKiBkcmFnZ2VkRWxlbWVudCB3aXRoIGFuIGF0dHJpYnV0ZSBvZiBpcy1kcm9wem9uZSBzZXQgdG8gdHJ1ZS5cbiAgICpcbiAgICogQHBhcmFtIEhUTUxFbGVtZW50IGRyYWdnZWRFbGVtZW50XG4gICAqIEBwYXJhbSBIVE1MRWxlbWVudCBwYXJlbnRcbiAgICogQHJldHVybnMgSFRNTEVsZW1lbnRcbiAgICovXG4gIGZpbmREcm9wWm9uZShkcmFnZ2VkRWxlbWVudDogSFRNTEVsZW1lbnQsIHBhcmVudDogSFRNTEVsZW1lbnQsIGV4Y2x1ZGUgPSBbXSk6IEhUTUxFbGVtZW50IHtcbiAgICBpZiAoIWRyYWdnZWRFbGVtZW50KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZXhjbHVkZS5wdXNoKGRyYWdnZWRFbGVtZW50KTtcbiAgICBjb25zdCBwb3MgPSBkb20ub2Zmc2V0KGRyYWdnZWRFbGVtZW50KTtcbiAgICBjb25zdCBlbCA9IGRvbS5lbGVtZW50QXRQb2ludChwb3MsIHBhcmVudCwgZXhjbHVkZSk7XG4gICAgaWYgKGVsICE9PSBwYXJlbnQgJiYgZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdocGMtZHJvcHpvbmUnKSkge1xuICAgICAgcmV0dXJuIGVsO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHVwZGF0ZURyb3Bab25lKGRyYWdnZWRFbGVtZW50OiBIVE1MRWxlbWVudCwgcGFyZW50OiBIVE1MRWxlbWVudCwgZXhjbHVkZSA9IFtdKTogSFRNTEVsZW1lbnQge1xuICAgIHRoaXMuY2xlYXJEcm9wWm9uZXMocGFyZW50KTtcbiAgICBjb25zdCBkcm9wWm9uZSA9IHRoaXMuZmluZERyb3Bab25lKGRyYWdnZWRFbGVtZW50LCBwYXJlbnQsIGV4Y2x1ZGUpO1xuICAgIGlmIChkcm9wWm9uZSkge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhkcm9wWm9uZSwgJ2FjdGl2ZScpO1xuICAgIH1cbiAgICByZXR1cm4gZHJvcFpvbmU7XG4gIH1cblxuICBjbGVhckRyb3Bab25lcyhwYXJlbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBkb20uY2hpbGRyZW5PZihwYXJlbnQsIHRydWUpO1xuICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhjaGlsZCwgJ2FjdGl2ZScpO1xuICAgIH0pO1xuICB9XG5cbiAgZHJvcEVsZW1lbnQoZHJvcFpvbmU6IEhUTUxFbGVtZW50LCBkcmFnZ2VkRWxlbWVudDogSFRNTEVsZW1lbnQsICBwYXJlbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICBkb20uY2hhbmdlUGFyZW50KGRyYWdnZWRFbGVtZW50LCBkcm9wWm9uZSwgdGhpcy5yZW5kZXJlcik7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgIC8vIC0tIHRvZG8gbG9nIGVycm9yO1xuICAgICAgfVxuICB9XG5cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlcmVyID0gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgUmVuZGVyZXIyLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIGRvbSBmcm9tICcuLi9zY3JpcHRzL2RvbSc7XG5pbXBvcnQgeyBQb2ludCwgUmVjdCB9IGZyb20gJy4uL3NjcmlwdHMvbWF0aCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTaXplU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHJlbmRlcmVyOiBSZW5kZXJlcjI7XG5cbiAgZ2V0IGlzSG9yaXpvbnRhbFNpemluZygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5ncmlwS2V5ID09PSAnbG0nIHx8IHRoaXMuZ3JpcEtleSA9PT0gJ3JtJztcbiAgfVxuXG4gIGdldCBpc1ZlcnRpY2FsU2l6aW5nKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmdyaXBLZXkgPT09ICd0bScgfHwgdGhpcy5ncmlwS2V5ID09PSAnYm0nO1xuICB9XG5cbiAgZ2V0IGlzU2l6aW5nRnJvbVRvcCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5ncmlwS2V5ID09PSAndGwnIHx8IHRoaXMuZ3JpcEtleSA9PT0gJ3RtJyB8fCB0aGlzLmdyaXBLZXkgPT09ICd0cidcbiAgICApO1xuICB9XG4gIGdldCBpc1NpemluZ0Zyb21MZWZ0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmdyaXBLZXkgPT09ICd0bCcgfHwgdGhpcy5ncmlwS2V5ID09PSAnbG0nIHx8IHRoaXMuZ3JpcEtleSA9PT0gJ2JsJ1xuICAgICk7XG4gIH1cbiAgZ2V0IGlzUm90YXRpbmcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZ3JpcEtleSA9PT0gJ3JvdGF0ZSc7XG4gIH1cblxuICBnZXQgb3JpZW50YXRpb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5ncmlwS2V5LnN1YnN0cigwLCAxKTtcbiAgfVxuXG4gIGdldCByZXZlcnNlT3JpZW50YXRpb24oKTogc3RyaW5nIHtcbiAgICBjb25zdCBvID0gdGhpcy5vcmllbnRhdGlvbjtcbiAgICByZXR1cm4gdGhpcy5vcmllbnRhdGlvbnMuZmluZCh4ID0+IHguaW5jbHVkZXMobykpLnJlcGxhY2UobywgJycpO1xuICB9XG5cbiAgbWluSGVpZ2h0ID0gNDA7XG4gIG1pbldpZHRoID0gNDA7XG5cbiAgY3Vyc29yOiBzdHJpbmc7XG4gIGdyaXBLZXk6IHN0cmluZztcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG9yaWVudGF0aW9ucyA9IFsndGInLCAncmwnXTtcblxuICByZW1vdmVTaXppbmdHcmlwcyhwYXJlbnQ6IEhUTUxFbGVtZW50LCByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgQXJyYXkuZnJvbShwYXJlbnQuY2hpbGRyZW4pLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgaWYgKGNoaWxkLmNsYXNzTmFtZS5pbmRleE9mKCdncmlwLWNvbnRhaW5lcicpID4gLTEpIHtcbiAgICAgICAgcmVuZGVyZXIucmVtb3ZlQ2hpbGQocGFyZW50LCBjaGlsZCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjcmVhdGVTaXppbmdPdmVybGF5KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnQge1xuICAgIGNvbnN0IHJlc3VsdCA9IGVsZW1lbnQuY2xvbmVOb2RlKGZhbHNlKSBhcyBIVE1MRWxlbWVudDtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHJlc3VsdCwgJ2hwYy1zaXplci1vdmVybGF5Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShyZXN1bHQsICdib3JkZXItc3R5bGUnLCAnc29saWQnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHJlc3VsdCwgJ2N1cnNvcicsICdpbmhlcml0Jyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHNpemVFbGVtZW50c0J5KGRlbHRhOiBQb2ludCwgZWxlbWVudHM6IEhUTUxFbGVtZW50W10pIHtcbiAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgdGhpcy5zaXplRWxlbWVudEJ5KGRlbHRhLCBlbGVtZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNpemVFbGVtZW50QnkoZGVsdGE6IFBvaW50LCBlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIGNvbnN0IGN1cnJlbnRCb3VuZHMgPSBkb20uZWxlbWVudEJvdW5kcyhlbGVtZW50KTtcbiAgICBsZXQgaGVpZ2h0ID0gY3VycmVudEJvdW5kcy5oZWlnaHQgKyBkZWx0YS55O1xuICAgIGxldCB3aWR0aCA9IGN1cnJlbnRCb3VuZHMud2lkdGggKyBkZWx0YS54O1xuICAgIGxldCBsZWZ0ID0gY3VycmVudEJvdW5kcy5sZWZ0O1xuICAgIGxldCB0b3AgPSBjdXJyZW50Qm91bmRzLnRvcDtcblxuICAgIGlmICh0aGlzLmlzU2l6aW5nRnJvbVRvcCkge1xuICAgICAgdG9wID0gY3VycmVudEJvdW5kcy50b3AgKyBkZWx0YS55O1xuICAgICAgaGVpZ2h0ID0gY3VycmVudEJvdW5kcy5oZWlnaHQgLSBkZWx0YS55O1xuICAgICAgaWYgKHRoaXMuZ3JpcEtleSA9PT0gJ3RtJykge1xuICAgICAgICB3aWR0aCA9IGN1cnJlbnRCb3VuZHMud2lkdGg7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLmlzU2l6aW5nRnJvbUxlZnQpIHtcbiAgICAgIGxlZnQgPSBjdXJyZW50Qm91bmRzLmxlZnQgKyBkZWx0YS54O1xuICAgICAgd2lkdGggPSBjdXJyZW50Qm91bmRzLndpZHRoIC0gZGVsdGEueDtcbiAgICAgIGlmICh0aGlzLmdyaXBLZXkgPT09ICdsbScpIHtcbiAgICAgICAgaGVpZ2h0ID0gY3VycmVudEJvdW5kcy5oZWlnaHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNIb3Jpem9udGFsU2l6aW5nKSB7XG4gICAgICBoZWlnaHQgPSBjdXJyZW50Qm91bmRzLmhlaWdodDtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNWZXJ0aWNhbFNpemluZykge1xuICAgICAgd2lkdGggPSBjdXJyZW50Qm91bmRzLndpZHRoO1xuICAgIH1cblxuICAgIGxldCBib3VuZHNSZWN0ID0gbmV3IFJlY3QobGVmdCwgdG9wLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICBpZiAod2lkdGggPCB0aGlzLm1pbldpZHRoIHx8IGhlaWdodCA8IHRoaXMubWluSGVpZ2h0KSB7XG4gICAgICBib3VuZHNSZWN0ID0gY3VycmVudEJvdW5kcztcbiAgICB9XG4gICAgZG9tLnNldEVsZW1lbnRSZWN0KHRoaXMucmVuZGVyZXIsIGJvdW5kc1JlY3QsIGVsZW1lbnQpO1xuICB9XG5cbiAgcHJlcGFyZVRvU2l6ZSgpIHt9XG5cbiAgY2FuU2l6ZShlbGVtZW50OiBFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGRvbS5lbGVtZW50U2l6YWJsZShlbGVtZW50KTtcbiAgfVxuXG4gIGFkZFNpemluZ0dyaXBzKHBhcmVudEVsOiBIVE1MRWxlbWVudCwgcmVuZGVyZXI6IFJlbmRlcmVyMik6IHZvaWQge1xuICAgIGNvbnN0IGh0bWwgPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwiZ3JpcC1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImdyaXAtY29udGFpbmVyLWxcIj5cbiAgICAgICAgICA8ZGl2IGdyaXBLZXk9XCJ0bFwiIGNsYXNzPVwiZ3JpcCBncmlwLXRsXCI+PC9kaXY+XG4gICAgICAgICAgPGRpdiBncmlwS2V5PVwibG1cIiBjbGFzcz1cImdyaXAgZ3JpcC1sbVwiPjwvZGl2PlxuICAgICAgICAgIDxkaXYgZ3JpcEtleT1cImJsXCIgY2xhc3M9XCJncmlwIGdyaXAtYmxcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJncmlwLWNvbnRhaW5lci1tXCI+XG4gICAgICAgICAgPGRpdiBncmlwS2V5PVwidG1cIiBjbGFzcz1cImdyaXAgZ3JpcC10bVwiPjwvZGl2PlxuICAgICAgICAgIDxkaXYgZ3JpcEtleT1cImJtXCIgY2xhc3M9XCJncmlwIGdyaXAtYm1cIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJncmlwLWNvbnRhaW5lci1yXCI+XG4gICAgICAgICAgPGRpdiBncmlwS2V5PVwidHJcIiBjbGFzcz1cImdyaXAgZ3JpcC10clwiPjwvZGl2PlxuICAgICAgICAgIDxkaXYgZ3JpcEtleT1cInJtXCIgY2xhc3M9XCJncmlwIGdyaXAtcm1cIj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGdyaXBLZXk9XCJiclwiIGNsYXNzPVwiZ3JpcCBncmlwLWJyXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgIGA7XG4gICAgLy8gY29uc3Qgc2VsZWN0b3IgPSByZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICByZW5kZXJlci5zZXRQcm9wZXJ0eShwYXJlbnRFbCwgJ2lubmVySFRNTCcsIGh0bWwpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJlciA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUsIFJlbmRlcmVyMiwgT25EZXN0cm95LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIEluamVjdG9yfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlY3QsIFBvaW50IH0gZnJvbSAnLi4vc2NyaXB0cy9tYXRoJztcbmltcG9ydCAqIGFzIGRvbSBmcm9tICcuLi9zY3JpcHRzL2RvbSc7XG5pbXBvcnQgeyBTaXplU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3NpemUuc2VydmljZSc7XG5pbXBvcnQgeyBEcmFnU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2RyYWcuc2VydmljZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNlbGVjdG9yIHtcbiAgc2VsZWN0b3JFbDogSFRNTEVsZW1lbnQ7XG4gIG92ZXJsYXk6IEhUTUxFbGVtZW50O1xuICBjbGllbnRFbDogSFRNTEVsZW1lbnQ7XG59XG5cbmV4cG9ydCBlbnVtIFNlbGVjdGlvblN0YXRlIHtcbiAgRHJhZ2dhYmxlLFxuICBTaXphYmxlLFxuICBJZGxlXG59XG5cbmV4cG9ydCBlbnVtIE51ZGdlVHlwZSB7XG4gIE92ZXJsYXksXG4gIFNlbGVjdG9yXG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZWxlY3RvclNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9sYXNzb1NlbGVjdG9yOiBIVE1MRWxlbWVudCA9IG51bGw7XG4gIHByaXZhdGUgX3NlbGVjdG9ycyA9IG5ldyBBcnJheTxJU2VsZWN0b3I+KCk7XG5cbiAgc2NhbGU6IG51bWJlcjtcbiAgbGFzc29DdXJzb3IgPSAnY3Jvc3NoYWlyJztcbiAgcmVuZGVyZXI6IFJlbmRlcmVyMjtcbiAgaW50ZXJhY3Rpb25Ib3N0OiBIVE1MRWxlbWVudDtcbiAgc2hvdWxkQWxsb3dTaXppbmcgPSB0cnVlO1xuICBpc0xhc3NvU2VsZWN0YWJsZSA9IHRydWU7XG5cbiAgcHJpdmF0ZSBfYWN0aXZlU2VsZWN0b3I6IElTZWxlY3RvcjtcbiAgZ2V0IGFjdGl2ZVNlbGVjdG9yKCk6IElTZWxlY3RvciB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZVNlbGVjdG9yO1xuICB9XG5cbiAgcHJpdmF0ZSBfc3RhdGU6IFNlbGVjdGlvblN0YXRlO1xuICBwdWJsaWMgZ2V0IHN0YXRlKCk6IFNlbGVjdGlvblN0YXRlIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhdGU7XG4gIH1cbiAgcHVibGljIHNldCBzdGF0ZSh2YWx1ZTogU2VsZWN0aW9uU3RhdGUpIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX3N0YXRlKSB7XG4gICAgICB0aGlzLl9zdGF0ZSA9IHZhbHVlO1xuICAgICAgaWYgKHRoaXMuc3RhdGUgIT09IFNlbGVjdGlvblN0YXRlLklkbGUpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVTZWxlY3Rpb25PdmVybGF5cygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldCBoYXNMYXNzbygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbGFzc29TZWxlY3RvciAhPT0gbnVsbDtcbiAgfVxuXG4gIGdldCBoYXNFbGVtZW50U2VsZWN0b3JzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuX3NlbGVjdG9ycy5lbnRyaWVzKCkpLmxlbmd0aCA+IDA7XG4gIH1cblxuICBnZXQgc2VsZWN0b3JzKCk6IElTZWxlY3RvcltdIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0b3JzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudHMgYWxsIHNlbGVjdG9yIGVsZW1lbnRzIGhvdmVyaW5nIGFib3ZlIHRoZSBjYXB0dXJlZCBlbGVtZW50c1xuICAgKi9cbiAgZ2V0IHNlbGVjdG9yRWxlbWVudHMoKTogSFRNTEVsZW1lbnRbXSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0b3JzLm1hcCh4ID0+IHguc2VsZWN0b3JFbCk7XG4gIH1cblxuICAvKipcbiAgICogUmVwcmVzZW50cyBhbGwgdGhlIGNhcHR1cmVkIGVsZW1lbnRzXG4gICAqXG4gICAqL1xuICBnZXQgY2xpZW50cygpOiBIVE1MRWxlbWVudFtdIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RvcnMubWFwKHggPT4geC5jbGllbnRFbCk7XG4gIH1cblxuICAgIGdldCBzZWxlY3RhYmxlRWxlbWVudHMoKTogSFRNTEVsZW1lbnRbXSB7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBkb20uY2hpbGRyZW5PZih0aGlzLmludGVyYWN0aW9uSG9zdCkuZmlsdGVyKHggPT4gZG9tLmlzU2VsZWN0YWJsZSh4KSk7XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfc2l6ZVNlcnZpY2U6IFNpemVTZXJ2aWNlLFxuICAgIHByaXZhdGUgX2RyYWdTZXJ2aWNlOiBEcmFnU2VydmljZSxcbiAgICBwcml2YXRlIF9jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIF9pbmplY3RvcjogSW5qZWN0b3JcbiAgKSB7fVxuXG4gIGNyZWF0ZWxhc3NvU2VsZWN0b3IobGVmdDogbnVtYmVyLCB0b3A6IG51bWJlcikge1xuICAgIHRoaXMuY2xlYXJTZWxlY3RvcnMoKTtcbiAgICBpZiAodGhpcy5pc0xhc3NvU2VsZWN0YWJsZSkge1xuICAgICAgY29uc3Qgc2VsZWN0b3IgPSB0aGlzLmNyZWF0ZVNlbGVjdG9yKGxlZnQsIHRvcCwgdGhpcy5pbnRlcmFjdGlvbkhvc3QpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmludGVyYWN0aW9uSG9zdCwgJ2N1cnNvcicsIHRoaXMubGFzc29DdXJzb3IpO1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhzZWxlY3RvciwgJ2hwYy1sYXNzby1zZWxlY3RvcicpO1xuICAgICAgdGhpcy5fbGFzc29TZWxlY3RvciA9IHNlbGVjdG9yO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZWxhc3NvU2VsZWN0b3IoKSB7XG4gICAgaWYgKHRoaXMuX2xhc3NvU2VsZWN0b3IpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy5pbnRlcmFjdGlvbkhvc3QsIHRoaXMuX2xhc3NvU2VsZWN0b3IpO1xuICAgICAgdGhpcy5fbGFzc29TZWxlY3RvciA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0b3JBdFBvaW50KHBvaW50OiBQb2ludCk6IElTZWxlY3RvciB7XG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuc2VsZWN0b3JzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY29uc3Qgc2VsZWN0b3IgPSB0aGlzLnNlbGVjdG9yc1tpbmRleF07XG4gICAgICBjb25zdCBlbGVtZW50ID0gc2VsZWN0b3Iuc2VsZWN0b3JFbDtcbiAgICAgIGNvbnN0IGVsUmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBjb25zdCByZWN0ID0gbmV3IFJlY3QoXG4gICAgICAgIGVsUmVjdC5sZWZ0LFxuICAgICAgICBlbFJlY3QudG9wLFxuICAgICAgICBlbFJlY3Qud2lkdGgsXG4gICAgICAgIGVsUmVjdC5oZWlnaHRcbiAgICAgICk7XG4gICAgICBpZiAoZG9tLnBvaW50SW5SZWN0KHBvaW50LCByZWN0KSkge1xuICAgICAgICByZXR1cm4gc2VsZWN0b3I7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0Q2FwdHVyZWRFbGVtZW50cygpIHtcbiAgICBjb25zdCByZWN0ID0gZG9tLmVsZW1lbnRCb3VuZHModGhpcy5fbGFzc29TZWxlY3Rvcik7XG4gICAgY29uc3QgY2FwdHVyZWRFbGVtZW50cyA9IGRvbS5lbGVtZW50c0F0UmVjdCh0aGlzLmludGVyYWN0aW9uSG9zdCwgcmVjdCwgW1xuICAgICAgdGhpcy5fbGFzc29TZWxlY3RvclxuICAgIF0pO1xuICAgIGNhcHR1cmVkRWxlbWVudHMuZm9yRWFjaChlbCA9PiB7XG4gICAgICB0aGlzLnNlbGVjdEVsZW1lbnQoZWwsIGZhbHNlLCB0aGlzLnNob3VsZEFsbG93U2l6aW5nKTtcbiAgICB9KTtcbiAgICB0aGlzLnJlbW92ZWxhc3NvU2VsZWN0b3IoKTtcbiAgfVxuXG4gIHVuU2VsZWN0QWxsKCkge1xuICAgIHRoaXMuY2xlYXJTZWxlY3RvcnMoKTtcbiAgfVxuXG4gIHVuU2VsZWN0RWxlbWVudChlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIGNvbnN0IHNlbGVjdG9yID0gdGhpcy5zZWxlY3RvcnMuZmluZCh4ID0+IHguY2xpZW50RWwgPT09IGVsZW1lbnQpO1xuICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgdGhpcy5jbGVhclNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICB9XG4gIH1cblxuICBzZWxlY3RBbGwoKSB7XG4gICAgdGhpcy5jbGVhclNlbGVjdG9ycygpO1xuICAgIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5zZWxlY3RhYmxlRWxlbWVudHM7XG4gICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgIHRoaXMuc2VsZWN0RWxlbWVudChjaGlsZCwgZmFsc2UpO1xuICAgIH0pO1xuICB9XG5cbiAgc2VsZWN0RWxlbWVudChlbGVtZW50OiBIVE1MRWxlbWVudCwgY2xlYXJGaXJzdCA9IHRydWUsIGlzU2l6YWJsZSA9IHRydWUpIHtcbiAgICBsZXQgc2VsZWN0b3IgPSB0aGlzLnNlbGVjdG9ycy5maW5kKFxuICAgICAgeCA9PlxuICAgICAgICB4LnNlbGVjdG9yRWwgPT09IGVsZW1lbnQgfHxcbiAgICAgICAgeC5jbGllbnRFbCA9PT0gZWxlbWVudCB8fFxuICAgICAgICB4Lm92ZXJsYXkgPT09IGVsZW1lbnRcbiAgICApO1xuICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZ3JpcEtleScpKSB7XG4gICAgICBzZWxlY3RvciA9IHRoaXMuc2VsZWN0b3JzLmZpbmQoXG4gICAgICAgIHggPT4geC5zZWxlY3RvckVsID09PSBlbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50XG4gICAgICApO1xuICAgICAgY29uc3QgY3Vyc29yID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5jdXJzb3I7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuaW50ZXJhY3Rpb25Ib3N0LCAnY3Vyc29yJywgY3Vyc29yKTtcbiAgICAgIHRoaXMuX3NpemVTZXJ2aWNlLmdyaXBLZXkgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZ3JpcEtleScpO1xuICAgICAgdGhpcy5zdGF0ZSA9IFNlbGVjdGlvblN0YXRlLlNpemFibGU7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICB0aGlzLnN0YXRlID0gU2VsZWN0aW9uU3RhdGUuSWRsZTtcbiAgICAgIHRoaXMuX2FjdGl2ZVNlbGVjdG9yID0gc2VsZWN0b3I7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChjbGVhckZpcnN0KSB7XG4gICAgICB0aGlzLmNsZWFyU2VsZWN0b3JzKCk7XG4gICAgfVxuICAgIGNvbnN0IHJlY3QgPSBkb20uZWxlbWVudEJvdW5kcyhlbGVtZW50KTtcbiAgICBjb25zdCBzZWxlY3RvckVsID0gdGhpcy5jcmVhdGVTZWxlY3RvcihcbiAgICAgIHJlY3QubGVmdCxcbiAgICAgIHJlY3QudG9wLFxuICAgICAgZWxlbWVudC5wYXJlbnRFbGVtZW50XG4gICAgKTtcbiAgICBzZWxlY3RvckVsWydpc1NlbGVjdG9yJ10gPSB0cnVlO1xuICAgIGRvbS5hc3NpZ25Cb3VuZGluZ1JlY3QodGhpcy5yZW5kZXJlciwgZWxlbWVudCwgc2VsZWN0b3JFbCk7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhzZWxlY3RvckVsLCAnaHBjLWVsZW1lbnQtc2VsZWN0b3InKTtcbiAgICBzZWxlY3RvciA9IHsgY2xpZW50RWw6IGVsZW1lbnQsIHNlbGVjdG9yRWw6IHNlbGVjdG9yRWwsIG92ZXJsYXk6IG51bGwgfTtcbiAgICB0aGlzLl9zZWxlY3RvcnMucHVzaChzZWxlY3Rvcik7XG4gICAgdGhpcy5fYWN0aXZlU2VsZWN0b3IgPSBzZWxlY3RvcjtcbiAgICBpZiAoaXNTaXphYmxlICYmIHRoaXMuX3NpemVTZXJ2aWNlLmNhblNpemUoZWxlbWVudCkpIHtcbiAgICAgIHRoaXMuX3NpemVTZXJ2aWNlLmFkZFNpemluZ0dyaXBzKHNlbGVjdG9yRWwsIHRoaXMucmVuZGVyZXIpO1xuICAgIH1cbiAgICBpZiAoZG9tLmVsZW1lbnREcmFnZ2FibGUoZWxlbWVudCkpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5pbnRlcmFjdGlvbkhvc3QsICdjdXJzb3InLCAnbW92ZScpO1xuICAgIH1cbiAgICB0aGlzLnN0YXRlID0gU2VsZWN0aW9uU3RhdGUuSWRsZTtcbiAgfVxuXG4gIGNyZWF0ZVNlbGVjdGlvbk92ZXJsYXlzKCkge1xuICAgIHRoaXMuc2VsZWN0b3JzLmZvckVhY2goc2VsZWN0b3IgPT4ge1xuICAgICAgdGhpcy5fc2l6ZVNlcnZpY2UucmVtb3ZlU2l6aW5nR3JpcHMoc2VsZWN0b3Iuc2VsZWN0b3JFbCwgdGhpcy5yZW5kZXJlcik7XG4gICAgICBpZiAoc2VsZWN0b3Iub3ZlcmxheSkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKFxuICAgICAgICAgIHNlbGVjdG9yLnNlbGVjdG9yRWwucGFyZW50RWxlbWVudCxcbiAgICAgICAgICBzZWxlY3Rvci5vdmVybGF5XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuc3RhdGUgPT09IFNlbGVjdGlvblN0YXRlLlNpemFibGUgJiZcbiAgICAgICAgdGhpcy5fc2l6ZVNlcnZpY2UuY2FuU2l6ZShzZWxlY3Rvci5jbGllbnRFbClcbiAgICAgICkge1xuICAgICAgICBzZWxlY3Rvci5vdmVybGF5ID0gdGhpcy5fc2l6ZVNlcnZpY2UuY3JlYXRlU2l6aW5nT3ZlcmxheShcbiAgICAgICAgICBzZWxlY3Rvci5zZWxlY3RvckVsXG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICB0aGlzLnN0YXRlID09PSBTZWxlY3Rpb25TdGF0ZS5EcmFnZ2FibGUgJiZcbiAgICAgICAgdGhpcy5fZHJhZ1NlcnZpY2UuY2FuRHJhZyhzZWxlY3Rvci5jbGllbnRFbClcbiAgICAgICkge1xuICAgICAgICBzZWxlY3Rvci5vdmVybGF5ID0gdGhpcy5fZHJhZ1NlcnZpY2UuY3JlYXRlRHJhZ092ZXJsYXkoXG4gICAgICAgICAgc2VsZWN0b3IuY2xpZW50RWxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmIChzZWxlY3Rvci5vdmVybGF5KSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgc2VsZWN0b3Iuc2VsZWN0b3JFbC5wYXJlbnRFbGVtZW50LFxuICAgICAgICAgIHNlbGVjdG9yLm92ZXJsYXlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZVNlbGVjdG9yKGxlZnQ6IG51bWJlciwgdG9wOiBudW1iZXIsIHBhcmVudDogRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcbiAgICBjb25zdCBzZWxlY3RvciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChwYXJlbnQsIHNlbGVjdG9yKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHNlbGVjdG9yLCAncG9zaXRpb24nLCAnYWJzb2x1dGUnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHNlbGVjdG9yLCAnbGVmdCcsIGxlZnQgKyAncHgnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHNlbGVjdG9yLCAndG9wJywgdG9wICsgJ3B4Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShzZWxlY3RvciwgJ2JveFNpemluZycsICdib3JkZXItYm94Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShzZWxlY3RvciwgJ3pJbmRleCcsICcxMDAwMCcpO1xuICAgIHJldHVybiBzZWxlY3RvcjtcbiAgfVxuXG4gIGNsZWFyU2VsZWN0b3JzKCkge1xuICAgIHRoaXMucmVtb3ZlbGFzc29TZWxlY3RvcigpO1xuICAgIGNvbnN0IHNlbGVjdG9ycyA9IEFycmF5LmZyb20odGhpcy5fc2VsZWN0b3JzLnZhbHVlcygpKTtcbiAgICBzZWxlY3RvcnMuZm9yRWFjaChzZWxlY3RvciA9PiB7XG4gICAgICB0aGlzLmNsZWFyU2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgIH0pO1xuICAgIHRoaXMuX3NlbGVjdG9ycyA9IFtdO1xuICB9XG5cbiAgY2xlYXJTZWxlY3RvcihzZWxlY3RvcjogSVNlbGVjdG9yKSB7XG4gICAgaWYgKHNlbGVjdG9yID09PSB0aGlzLl9hY3RpdmVTZWxlY3Rvcikge1xuICAgICAgdGhpcy5fYWN0aXZlU2VsZWN0b3IgPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKFxuICAgICAgc2VsZWN0b3Iuc2VsZWN0b3JFbC5wYXJlbnRFbGVtZW50LFxuICAgICAgc2VsZWN0b3Iuc2VsZWN0b3JFbFxuICAgICk7XG4gICAgaWYgKHNlbGVjdG9yLm92ZXJsYXkpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQoXG4gICAgICAgIHNlbGVjdG9yLm92ZXJsYXkucGFyZW50RWxlbWVudCxcbiAgICAgICAgc2VsZWN0b3Iub3ZlcmxheVxuICAgICAgKTtcbiAgICB9XG4gICAgdGhpcy5zZWxlY3RvcnMuc3BsaWNlKHRoaXMuc2VsZWN0b3JzLmluZGV4T2Yoc2VsZWN0b3IpLCAxKTtcbiAgfVxuXG4gIHJlc2l6ZUxhc3NvKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBpbml0aWFsUG9zOiBQb2ludCkge1xuICAgIGlmIChoZWlnaHQgPCAwKSB7XG4gICAgICBoZWlnaHQgPSBNYXRoLmFicyhoZWlnaHQpO1xuICAgICAgY29uc3QgdG9wID0gaW5pdGlhbFBvcy55IC0gaGVpZ2h0O1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9sYXNzb1NlbGVjdG9yLCAndG9wJywgdG9wICsgJ3B4Jyk7XG4gICAgfVxuICAgIGlmICh3aWR0aCA8IDApIHtcbiAgICAgIHdpZHRoID0gTWF0aC5hYnMod2lkdGgpO1xuICAgICAgY29uc3QgbGVmdCA9IGluaXRpYWxQb3MueCAtIHdpZHRoO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9sYXNzb1NlbGVjdG9yLCAnbGVmdCcsIGxlZnQgKyAncHgnKTtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9sYXNzb1NlbGVjdG9yLCAnaGVpZ2h0JywgaGVpZ2h0ICsgJ3B4Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9sYXNzb1NlbGVjdG9yLCAnd2lkdGgnLCB3aWR0aCArICdweCcpO1xuICB9XG5cbiAgcmVzaXplU2VsZWN0b3JzQnkoZGVsdGE6IFBvaW50KSB7XG4gICAgY29uc3Qgc2VsZWN0b3JzID0gdGhpcy5zZWxlY3RvcnMubWFwKHggPT4geC5zZWxlY3RvckVsKTtcbiAgICB0aGlzLl9zaXplU2VydmljZS5zaXplRWxlbWVudHNCeShkZWx0YSwgc2VsZWN0b3JzKTtcbiAgfVxuXG4gIHJlc2l6ZU92ZXJsYXlzQnkoZGVsdGE6IFBvaW50KSB7XG4gICAgY29uc3Qgb3ZlcmxheXMgPSB0aGlzLnNlbGVjdG9ycy5tYXAoeCA9PiB4Lm92ZXJsYXkpO1xuICAgIHRoaXMuX3NpemVTZXJ2aWNlLnNpemVFbGVtZW50c0J5KGRlbHRhLCBvdmVybGF5cyk7XG4gIH1cblxuICBtb3ZlU2VsZWN0b3JzQnkoZGVsdGE6IFBvaW50KSB7XG4gICAgY29uc3Qgc2VsZWN0b3JzID0gdGhpcy5zZWxlY3RvcnMubWFwKHggPT4geC5vdmVybGF5KTtcbiAgICB0aGlzLl9kcmFnU2VydmljZS5kcmFnRWxlbWVudHNCeShkZWx0YSwgc2VsZWN0b3JzKTtcbiAgfVxuXG4gIG1vdmVPdmVybGF5c0J5KGRlbHRhOiBQb2ludCkge1xuICAgIGNvbnN0IG92ZXJsYXlzID0gdGhpcy5zZWxlY3RvcnMubWFwKHggPT4geC5vdmVybGF5KTtcbiAgICB0aGlzLl9kcmFnU2VydmljZS5kcmFnRWxlbWVudHNCeShkZWx0YSwgb3ZlcmxheXMpO1xuICB9XG5cbiAgcmVzZWxlY3QoKSB7XG4gICAgY29uc3QgY2xpZW50cyA9IHRoaXMuY2xpZW50cztcbiAgICB0aGlzLmNsZWFyU2VsZWN0b3JzKCk7XG4gICAgY2xpZW50cy5mb3JFYWNoKGNsaWVudCA9PiB7XG4gICAgICB0aGlzLnNlbGVjdEVsZW1lbnQoY2xpZW50LCBmYWxzZSwgdGhpcy5zaG91bGRBbGxvd1NpemluZyk7XG4gICAgfSk7XG4gIH1cblxuICBudWRnZUJ5KGRlbHRhOiBQb2ludCwgbm9kZ2VUeXBlOiBOdWRnZVR5cGUpIHtcbiAgICBpZiAoZGVsdGEueCA9PT0gMCAmJiBkZWx0YS55ID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLnN0YXRlID09PSBTZWxlY3Rpb25TdGF0ZS5TaXphYmxlKSB7XG4gICAgICBpZiAobm9kZ2VUeXBlID09PSBOdWRnZVR5cGUuU2VsZWN0b3IpIHtcbiAgICAgICAgdGhpcy5yZXNpemVTZWxlY3RvcnNCeShkZWx0YSk7XG4gICAgICB9XG4gICAgICBpZiAobm9kZ2VUeXBlID09PSBOdWRnZVR5cGUuT3ZlcmxheSkge1xuICAgICAgICB0aGlzLnJlc2l6ZU92ZXJsYXlzQnkoZGVsdGEpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZSA9PT0gU2VsZWN0aW9uU3RhdGUuRHJhZ2dhYmxlKSB7XG4gICAgICBpZiAobm9kZ2VUeXBlID09PSBOdWRnZVR5cGUuU2VsZWN0b3IpIHtcbiAgICAgICAgdGhpcy5tb3ZlU2VsZWN0b3JzQnkoZGVsdGEpO1xuICAgICAgfVxuICAgICAgaWYgKG5vZGdlVHlwZSA9PT0gTnVkZ2VUeXBlLk92ZXJsYXkpIHtcbiAgICAgICAgdGhpcy5tb3ZlT3ZlcmxheXNCeShkZWx0YSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhdGUgPSBTZWxlY3Rpb25TdGF0ZS5EcmFnZ2FibGU7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5jbGVhclNlbGVjdG9ycygpO1xuICAgIHRoaXMucmVuZGVyZXIgPSBudWxsO1xuICAgIHRoaXMuaW50ZXJhY3Rpb25Ib3N0ID0gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IHtJbmplY3RhYmxlLCBSZW5kZXJlcjIsIE9uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0LCBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU2VsZWN0b3JTZXJ2aWNlIH0gZnJvbSAnLi4vc2VsZWN0b3Ivc2VsZWN0b3Iuc2VydmljZSc7XG5pbXBvcnQgKiBhcyBkb20gZnJvbSAnLi4vc2NyaXB0cy9kb20nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSW50ZXJhY3Rpb25TZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfZGVsZXRlRWxlbWVudFN1YmplY3QgPSBuZXcgU3ViamVjdDxFbGVtZW50PigpO1xuICBkZWxldGVFbGVtZW50JCA9IHRoaXMuX2RlbGV0ZUVsZW1lbnRTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuXG4gIHByaXZhdGUgX2RlbGV0ZUVsZW1lbnRzU3ViamVjdCA9IG5ldyBTdWJqZWN0PEVsZW1lbnRbXT4oKTtcbiAgZGVsZXRlRWxlbWVudHMkID0gdGhpcy5fZGVsZXRlRWxlbWVudFN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG5cbiAgcHJpdmF0ZSBfZGVsZXRlU2VsZWN0ZWRFbGVtZW50c1N1YmplY3QgPSBuZXcgU3ViamVjdCgpO1xuICBkZWxldGVTZWxlY3RlZEVsZW1lbnRzJCA9IHRoaXMuX2RlbGV0ZVNlbGVjdGVkRWxlbWVudHNTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuXG4gIHByaXZhdGUgX2FkZEVsZW1lbnRTdWJqZWN0ID0gbmV3IFN1YmplY3Q8RWxlbWVudD4oKTtcbiAgYWRkRWxlbWVudCQgPSB0aGlzLl9hZGRFbGVtZW50U3ViamVjdC5hc09ic2VydmFibGUoKTtcblxuICBwcml2YXRlIF9zZWxlY3RlZEVsZW1lbnRzU3ViamVjdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RWxlbWVudFtdPihudWxsKTtcbiAgc2VsZWN0ZWRFbGVtZW50cyQgPSB0aGlzLl9zZWxlY3RlZEVsZW1lbnRzU3ViamVjdC5hc09ic2VydmFibGUoKTtcblxuICBwcml2YXRlIF9zZWxlY3RlZEVsZW1lbnRzOiBFbGVtZW50W10gPSBbXTtcbiAgZ2V0IHNlbGVjdGVkRWxlbWVudHMoKTogRWxlbWVudFtdIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRFbGVtZW50cztcbiAgfVxuICBzZXQgc2VsZWN0ZWRFbGVtZW50cyhlbGVtZW50czogRWxlbWVudFtdKSB7XG4gICAgdGhpcy5fc2VsZWN0ZWRFbGVtZW50cyA9IGVsZW1lbnRzO1xuICAgIHRoaXMuX3NlbGVjdGVkRWxlbWVudHNTdWJqZWN0Lm5leHQoZWxlbWVudHMpO1xuICB9XG4gIGdldCBoYXNTZWxlY3RlZEVsZW1lbnRzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZEVsZW1lbnRzICYmIHRoaXMuX3NlbGVjdGVkRWxlbWVudHMubGVuZ3RoID4gMDtcbiAgfVxuXG4gIGdldCBjYW5TZWxlY3RFbGVtZW50cygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0aW9uU2VydmljZS5zZWxlY3RhYmxlRWxlbWVudHMubGVuZ3RoID4gMDtcbiAgfVxuXG4gIHJlbmRlcmVyOiBSZW5kZXJlcjI7XG4gIGludGVyYWN0aW9uSG9zdDogSFRNTEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VsZWN0aW9uU2VydmljZTogU2VsZWN0b3JTZXJ2aWNlKSB7IH1cblxuICAvKipcbiAgICogcmVtb3ZlIGFuIGVsZW1lbnQgZnJvbSB0aGUgaW50ZXJhY3Rpb24gaG9zdFxuICAgKiBAcGFyYW0gZWxlbWVudCAtIHRoZSBlbGVtZW50IHRvIHJlbW92ZVxuICAgKiBAcGFyYW0gcmVuZGVyZXIgLSB0aGUgcmVuZGVyZXIgdXNlZCB0byByZW1vdmUgdGhlIGVsZW1lbnRcbiAgICovXG4gIGRlbGV0ZUVsZW1lbnQoZWxlbWVudDogRWxlbWVudCkge1xuICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKGVsZW1lbnQucGFyZW50RWxlbWVudCwgZWxlbWVudCk7XG4gICAgIHRoaXMuX2RlbGV0ZUVsZW1lbnRTdWJqZWN0Lm5leHQoZWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogcmVtb3ZlIGEgbGlzdCBvZiBlbGVtZW50cyBmcm9tIHRoZSBpbnRlcmFjdGlvbiBob3N0XG4gICAqIEBwYXJhbSBlbGVtZW50IC0gdGhlIGVsZW1lbnRzIHRvIHJlbW92ZVxuICAgKiBAcGFyYW0gcmVuZGVyZXIgLSB0aGUgcmVuZGVyZXIgdXNlZCB0byByZW1vdmUgdGhlIGVsZW1lbnRzXG4gICAqL1xuICBkZWxldGVFbGVtZW50cyhlbGVtZW50czogRWxlbWVudFtdKSB7XG4gICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQoZWxlbWVudC5wYXJlbnRFbGVtZW50LCBlbGVtZW50KTtcbiAgICB9KTtcbiAgICB0aGlzLl9kZWxldGVFbGVtZW50c1N1YmplY3QubmV4dChlbGVtZW50cyk7XG4gIH1cblxuICBkZWxldGVTZWxlY3RlZEVsZW1lbnRzKCkge1xuICAgIHRoaXMuX2RlbGV0ZVNlbGVjdGVkRWxlbWVudHNTdWJqZWN0Lm5leHQoKTtcbiAgfVxuXG4gIGRlbGV0ZUFsbCgpIHtcbiAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnVuU2VsZWN0QWxsKCk7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBkb20uY2hpbGRyZW5PZih0aGlzLmludGVyYWN0aW9uSG9zdCk7XG4gICAgZm9yIChsZXQgaW5kZXggPSBjaGlsZHJlbi5sZW5ndGggLSAxOyBpbmRleCA+PSAwOyBpbmRleC0tKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gY2hpbGRyZW5baW5kZXhdO1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLmludGVyYWN0aW9uSG9zdCwgZWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgYWRkRWxlbWVudChlbGVtZW50OiBFbGVtZW50ID0gbnVsbCkge1xuICAgIGlmICghZWxlbWVudCkge1xuICAgICAgIGVsZW1lbnQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZWxlbWVudCwgJ2hwYy1uZXctZWxlbWVudCcpO1xuICAgIH1cbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGVsZW1lbnQsICdib3gtc2l6aW5nJywgJ2JvcmRlci1ib3gnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGVsZW1lbnQsICdwb3NpdGlvbicsICdhYnNvbHV0ZScpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5pbnRlcmFjdGlvbkhvc3QsIGVsZW1lbnQpO1xuICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc2VsZWN0RWxlbWVudChlbGVtZW50IGFzIEhUTUxFbGVtZW50KTtcbiAgICB0aGlzLmludGVyYWN0aW9uSG9zdC5mb2N1cygpO1xuICAgIHRoaXMuX2FkZEVsZW1lbnRTdWJqZWN0Lm5leHQoZWxlbWVudCk7XG4gIH1cblxuICBhZGRDb250YWluZXIoZWxlbWVudDogRWxlbWVudCA9IG51bGwpIHtcbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgIGVsZW1lbnQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhlbGVtZW50LCAnaHBjLW5ldy1lbGVtZW50Jyk7XG4gICAgfVxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZWxlbWVudCwgJ2hwYy1kcm9wem9uZScpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZWxlbWVudCwgJ2hwYy1jb250YWluZXInKTtcbiAgICB0aGlzLmFkZEVsZW1lbnQoZWxlbWVudCk7XG4gIH1cblxuICBzZWxlY3RBbGwoKSB7XG4gICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5zZWxlY3RBbGwoKTtcbiAgICB0aGlzLnNlbGVjdGVkRWxlbWVudHMgPSB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmNsaWVudHM7XG4gIH1cblxuICB1blNlbGVjdEFsbCgpIHtcbiAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnVuU2VsZWN0QWxsKCk7XG4gICAgdGhpcy5zZWxlY3RlZEVsZW1lbnRzID0gdGhpcy5fc2VsZWN0aW9uU2VydmljZS5jbGllbnRzO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJlciA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCwgT25Jbml0LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIElucHV0LCBSZW5kZXJlcjIsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uRGVzdHJveVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbEtleUNoYW5nZWQsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERyYWdTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZHJhZy5zZXJ2aWNlJztcbmltcG9ydCB7IFNpemVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc2l6ZS5zZXJ2aWNlJztcbmltcG9ydCB7IFNlbGVjdG9yU2VydmljZSwgU2VsZWN0aW9uU3RhdGUsIE51ZGdlVHlwZSB9IGZyb20gJy4uL3NlbGVjdG9yL3NlbGVjdG9yLnNlcnZpY2UnO1xuaW1wb3J0ICogYXMgZG9tIGZyb20gJy4uL3NjcmlwdHMvZG9tJztcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnLi4vc2NyaXB0cy9tYXRoJztcbmltcG9ydCB7IEludGVyYWN0aW9uU2VydmljZSB9IGZyb20gJy4vaW50ZXJhY3Rpb24uc2VydmljZSc7XG5pbXBvcnQgeyBTdWJqZWN0LCBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuXG5leHBvcnQgdHlwZSBJQ2FuY2VsbGFibGUgPSAoIHZhbHVlOiBhbnkgKSAgPT4gYm9vbGVhbjtcblxuLyoqXG4gKiBIYW5kbGVzIHNlbGVjdGlvbiwgc2l6aW5nLCBkZWxldGlvbnMsIGFuZCBkcmFnZ2luZyBpbnRlcmFjdGlvbnMgd2l0aCBhbnkgY2hpbGQgRWxlbWVudC5cbiAqL1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdocGMtaW50ZXJhY3Rpb24nLFxuICB0ZW1wbGF0ZVVybDogJy4vaW50ZXJhY3Rpb24uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9pbnRlcmFjdGlvbi5jb21wb25lbnQuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEludGVyYWN0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9pc01vdXNlRG93biA9IGZhbHNlO1xuICBwcml2YXRlIF9tb3VzZURvd25Qb3MgPSBuZXcgUG9pbnQoKTtcbiAgcHJpdmF0ZSBfbGFzdE1vdXNlUG9zOiBQb2ludDtcbiAgcHJpdmF0ZSBfY3Vyc29yOiBzdHJpbmc7XG4gIHByaXZhdGUgX2xhc3REcm9wWm9uZTogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgX2RlbGV0ZVNlbGVjdGVkRWxlbWVudHNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBfYWRkRWxlbWVudFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIEBWaWV3Q2hpbGQoJ2ludGVyYWN0aW9uQ29udGFpbmVyJylcbiAgcHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWY7XG4gIHByaXZhdGUgX2tleURvd25TdWJqZWN0ID0gbmV3IFN1YmplY3Q8S2V5Ym9hcmRFdmVudD4oKTtcblxuICAvKipcbiAgICogU2NhbGUgdmFsdWUgdG8gYXBwbHkgdG8gdGhlIEludGVyYWN0aW9uIGhvc3QgZWxlbWVudC4gIFRoZSB2YWx1ZSBpcyBhcHBsaWVkXG4gICAqIHRvIGJvdGggc2NhbGVYIGFuZCBzY2FsZVkgb2YgdGhlIGhvc3QgZWxlbWVudC5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHNjYWxlID0gMTtcblxuICAvKipcbiAgICogRGV0ZXJtaW5zIGlmIGVsZW1lbnRzIHNwYW4gd2hlbiBzaXplZCBvciBkcmFnZ2VkXG4gICAqL1xuICBASW5wdXQoKVxuICBzbmFwID0gMDtcblxuICAvKipcbiAgICogR2V0cyBvciBzZXRzIHRoZSBtaW5pbXVtIHdpZHRoIG9mIHRoZSBlbGVtZW50IHdoZW4gZHJhZy1zaXplZC5cbiAgICovXG4gIEBJbnB1dCgpXG4gIG1pblNpemluZ1dpZHRoID0gMzA7XG5cbiAgLyoqXG4gICAqIEdldHMgb3Igc2V0cyB0aGUgbWluaW11bSBoZWlnaHQgb2YgdGhlIGVsZW1lbnQgd2hlbiBkcmFnLXNpemVkLlxuICAgKi9cbiAgQElucHV0KClcbiAgbWluU2l6aW5nSGVpZ2h0ID0gMzA7XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgaWYgZWxlbWVudHMgY2FuIGJlIHNlbGVjdGVkIGJ5IGRyYWdnaW5nIGFyb3VuZCAobGFzc28pIHRoZW0gYW5kIHJlbGVhc2luZyB0aGUgcG9pbnRlci5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGlzTGFzc29TZWxlY3RhYmxlID0gdHJ1ZTtcblxuICAvKipcbiAgICogT3B0aW9uYWxseSBzZXQgXCJjaGVja2Vyc1wiIGJhY2tncm91bmQgZm9yIHRoZSBpbnRlcmFjdGlvbiBob3N0LiAgVXNlZnVsIHdoZW4gYnVpbGRpbmcgSURFLWxpa2UgaW50ZXJhY3RpdmUgVUkuXG4gICAqL1xuICBASW5wdXQoKVxuICBpc0NoZWNrZXJzQmFja2dyb3VuZCA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKVxuICByZXNpemVkRWxlbWVudCA9IG5ldyBFdmVudEVtaXR0ZXI8SFRNTEVsZW1lbnQ+KCk7XG4gIEBPdXRwdXQoKVxuICByZXNpemVkRWxlbWVudHMgPSBuZXcgRXZlbnRFbWl0dGVyPEhUTUxFbGVtZW50W10+KCk7XG4gIEBPdXRwdXQoKVxuICBtb3ZlZEVsZW1lbnQgPSBuZXcgRXZlbnRFbWl0dGVyPEhUTUxFbGVtZW50PigpO1xuICBAT3V0cHV0KClcbiAgbW92ZWRFbGVtZW50cyA9IG5ldyBFdmVudEVtaXR0ZXI8SFRNTEVsZW1lbnRbXT4oKTtcbiAgQE91dHB1dCgpXG4gIHNlbGVjdEVsZW1lbnQgPSBuZXcgRXZlbnRFbWl0dGVyPEhUTUxFbGVtZW50PigpO1xuXG4gIEBJbnB1dCgpXG4gIGNhbkRlbGV0ZTogSUNhbmNlbGxhYmxlID0gKCkgPT4gdHJ1ZVxuXG4gIEBJbnB1dCgpXG4gIGNhbkRyb3A6IElDYW5jZWxsYWJsZSA9ICgpID0+IHRydWVcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgX2RyYWdTZXJ2aWNlOiBEcmFnU2VydmljZSxcbiAgICBwcml2YXRlIF9zaXplU2VydmljZTogU2l6ZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBfaW50ZXJhY3Rpb25TZXJ2aWNlOiBJbnRlcmFjdGlvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBfc2VsZWN0aW9uU2VydmljZTogU2VsZWN0b3JTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UucmVuZGVyZXIgPSB0aGlzLl9yZW5kZXJlcjtcbiAgICB0aGlzLl9zaXplU2VydmljZS5yZW5kZXJlciA9IHRoaXMuX3JlbmRlcmVyO1xuICAgIHRoaXMuX2RyYWdTZXJ2aWNlLnJlbmRlcmVyID0gdGhpcy5fcmVuZGVyZXI7XG4gICAgdGhpcy5faW50ZXJhY3Rpb25TZXJ2aWNlLnJlbmRlcmVyID0gdGhpcy5fcmVuZGVyZXI7XG4gICAgdGhpcy5fa2V5RG93blN1YmplY3Quc3Vic2NyaWJlKGUgPT4gdGhpcy5rZXlEb3duSGFuZGxlcihlKSk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIGtleWJvYXJkIGtleSBpcyByZWxlYXNlZC5cbiAgICogQHBhcmFtIGUgS2V5Ym9hcmRFdmVudFxuICAgKi9cbiAga2V5VXAoZTogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmIChlLmNvZGUgPT09ICdEZWxldGUnICYmIHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc2VsZWN0b3JzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuZGVsZXRlU2VsZWN0ZWRFbGVtZW50cygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUga2V5Ym9hcmQga2V5IGlzIHByZXNzZWQuXG4gICAqIEBwYXJhbSBlIEtleWJvYXJkRXZlbnRcbiAgICovXG4gIGtleVByZXNzKGUpIHtcbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uU2VydmljZS5zZWxlY3RvcnMubGVuZ3RoID4gMCkge1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIGtleWJvYXJkIGtleSBpcyBwcmVzc2VkLlxuICAgKiBAcGFyYW0gZSBLZXlib2FyZEV2ZW50XG4gICAqL1xuICBrZXlEb3duKGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICB0aGlzLl9rZXlEb3duU3ViamVjdC5uZXh0KGUpO1xuICB9XG5cbiAga2V5RG93bkhhbmRsZXIoZTogS2V5Ym9hcmRFdmVudCkge1xuICAgIC8vIGRlYm91bmNlVGltZSg1MDAwKTtcbiAgICAvKiAgICBpZiAoXG4gICAgICBlLmNvZGUgIT09ICdEZWxldGUnICYmXG4gICAgICBlLmNvZGUgIT09ICdFc2NhcGUnICYmXG4gICAgICBlLmNvZGUgIT09ICdBcnJvd0xlZnQnICYmXG4gICAgICBlLmNvZGUgIT09ICdBcnJvd1VwJyAmJlxuICAgICAgZS5jb2RlICE9PSAnQXJyb3dSaWdodCcgJiZcbiAgICAgIGUuY29kZSAhPT0gJ0Fycm93RG93bidcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9Ki9cbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uU2VydmljZS5zZWxlY3RvcnMubGVuZ3RoID4gMCkge1xuICAgICAgbGV0IGRlbHRhOiBQb2ludDtcbiAgICAgIGNvbnN0IHNuYXAgPSB0aGlzLnNuYXAgPyB0aGlzLnNuYXAgOiAxO1xuICAgICAgaWYgKGUuY29kZSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgICAgdGhpcy5jYW5jZWxTZWxlY3Rpb24oKTtcbiAgICAgIH1cbiAgICAgIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgICAgIGlmIChlLmN0cmxLZXkpIHtcbiAgICAgICAgICBzd2l0Y2ggKFxuICAgICAgICAgICAgZS5jb2RlXG4gICAgICAgICAgICAvKiAgICAgICAgIGNhc2UgMzc6XG4gICAgICAgICAgICAgIHNlbGYuYWxpZ25TZWxlY3RlZEVsZW1lbnRzKEFsaWduUG9zaXRpb24uTGVmdCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzODpcbiAgICAgICAgICAgICAgc2VsZi5hbGlnblNlbGVjdGVkRWxlbWVudHMoQWxpZ25Qb3NpdGlvbi5Ub3ApO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzk6XG4gICAgICAgICAgICAgIHNlbGYuYWxpZ25TZWxlY3RlZEVsZW1lbnRzKEFsaWduUG9zaXRpb24uUmlnaHQpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDA6XG4gICAgICAgICAgICAgIHNlbGYuYWxpZ25TZWxlY3RlZEVsZW1lbnRzKEFsaWduUG9zaXRpb24uQm90dG9tKTtcbiAgICAgICAgICAgICAgYnJlYWs7ICovXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlbHRhID0gbmV3IFBvaW50KCk7XG4gICAgICAgICAgc3dpdGNoIChlLmNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICAgIGRlbHRhID0gbmV3IFBvaW50KC1zbmFwLCAwKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgZGVsdGEgPSBuZXcgUG9pbnQoMCwgLXNuYXApO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgICBkZWx0YSA9IG5ldyBQb2ludChzbmFwLCAwKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgICBkZWx0YSA9IG5ldyBQb2ludCgwLCBzbmFwKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuX3NpemVTZXJ2aWNlLmdyaXBLZXkgPSAna2V5Ym9hcmQnO1xuICAgICAgICAgIHRoaXMuX3NpemVTZXJ2aWNlLnNpemVFbGVtZW50c0J5KFxuICAgICAgICAgICAgZGVsdGEsXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnNlbGVjdG9yRWxlbWVudHNcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMuX3NpemVTZXJ2aWNlLnNpemVFbGVtZW50c0J5KFxuICAgICAgICAgICAgZGVsdGEsXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmNsaWVudHNcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWx0YSA9IG5ldyBQb2ludCgpO1xuICAgICAgICBzd2l0Y2ggKGUuY29kZSkge1xuICAgICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICBkZWx0YSA9IG5ldyBQb2ludCgtc25hcCwgMCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgIGRlbHRhID0gbmV3IFBvaW50KDAsIC1zbmFwKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgZGVsdGEgPSBuZXcgUG9pbnQoc25hcCwgMCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgZGVsdGEgPSBuZXcgUG9pbnQoMCwgc25hcCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2RyYWdTZXJ2aWNlLmRyYWdFbGVtZW50c0J5KFxuICAgICAgICAgIGRlbHRhLFxuICAgICAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc2VsZWN0b3JFbGVtZW50c1xuICAgICAgICApO1xuICAgICAgICB0aGlzLl9kcmFnU2VydmljZS5kcmFnRWxlbWVudHNCeShkZWx0YSwgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5jbGllbnRzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRW5zdXJlcyB0aGF0IHRoZSBkZWZhdWx0IEhUTUw1IGRyYWdnaW5nIG9wZXJhdGlvbnMgZG8gbm90IGV4ZWN1dGUuXG4gICAqL1xuICBkcmFnU3RhcnQoKSB7XG4gICAgLy8gLS0gcHJldmVudCBkZWZhdWx0IGRyYWdcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIHBvaW50ZXIgaXMgbW92ZWQuXG4gICAqIEBwYXJhbSBlIFBvaW50ZXJFdmVudFxuICAgKi9cbiAgcG9pbnRlck1vdmUoZTogUG9pbnRlckV2ZW50KSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICh0aGlzLl9pc01vdXNlRG93bikge1xuICAgICAgbGV0IG1vdXNlUG9zID0gdGhpcy5nZXRSZWxhdGl2ZVBvaW50ZXJQb3MoZSk7XG4gICAgICBpZiAodGhpcy5fc2VsZWN0aW9uU2VydmljZS5oYXNMYXNzbykge1xuICAgICAgICBjb25zdCBtb3VzZURvd25Qb3MgPSB0aGlzLl9tb3VzZURvd25Qb3M7XG4gICAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UucmVzaXplTGFzc28oXG4gICAgICAgICAgbW91c2VQb3MueCAtIG1vdXNlRG93blBvcy54LFxuICAgICAgICAgIG1vdXNlUG9zLnkgLSBtb3VzZURvd25Qb3MueSxcbiAgICAgICAgICBtb3VzZURvd25Qb3NcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fc2VsZWN0aW9uU2VydmljZS5zZWxlY3RvcnMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBtb3VzZUNoYW5nZSA9IHRoaXMuZ2V0UG9pbnRlckNoYW5nZShlKTtcbiAgICAgICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5udWRnZUJ5KG1vdXNlQ2hhbmdlWzBdLCBOdWRnZVR5cGUuT3ZlcmxheSk7XG4gICAgICAgIG1vdXNlUG9zID0gbW91c2VDaGFuZ2VbMV07XG4gICAgICAgIHRoaXMuX2xhc3REcm9wWm9uZSA9IHRoaXMuX2RyYWdTZXJ2aWNlLnVwZGF0ZURyb3Bab25lKFxuICAgICAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuYWN0aXZlU2VsZWN0b3Iub3ZlcmxheSxcbiAgICAgICAgICB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgIFt0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmFjdGl2ZVNlbGVjdG9yLmNsaWVudEVsXVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgdGhpcy5fbGFzdE1vdXNlUG9zID0gbW91c2VQb3M7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZW5zdXJlQ3Vyc29yKGUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgcG9pbnRlciBpcyBwcmVzc2VkLlxuICAgKiBAcGFyYW0gZSBQb2ludGVyRXZlbnRcbiAgICovXG4gIHBvaW50ZXJEb3duKGU6IFBvaW50ZXJFdmVudCkge1xuICAgIHRoaXMuX2lzTW91c2VEb3duID0gdHJ1ZTtcbiAgICB0aGlzLl9tb3VzZURvd25Qb3MgPSB0aGlzLmdldFJlbGF0aXZlUG9pbnRlclBvcyhlKTtcbiAgICB0aGlzLl9sYXN0TW91c2VQb3MgPSB0aGlzLl9tb3VzZURvd25Qb3M7XG4gICAgaWYgKGUudGFyZ2V0ID09PSB0aGlzLl9lbC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmNyZWF0ZWxhc3NvU2VsZWN0b3IoXG4gICAgICAgIHRoaXMuX21vdXNlRG93blBvcy54LFxuICAgICAgICB0aGlzLl9tb3VzZURvd25Qb3MueVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZWxlbWVudCA9IGUudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5zZWxlY3RFbGVtZW50KGVsZW1lbnQsICFlLnNoaWZ0S2V5KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIHBvaW50ZXIgaXMgcmVsZWFzZWQuXG4gICAqIEBwYXJhbSBlIFBvaW50ZXJFdmVudFxuICAgKi9cbiAgcG9pbnRlclVwKGU6IFBvaW50ZXJFdmVudCkge1xuICAgIHRoaXMuX2lzTW91c2VEb3duID0gZmFsc2U7XG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuaGFzTGFzc28pIHtcbiAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc2VsZWN0Q2FwdHVyZWRFbGVtZW50cygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5fc2VsZWN0aW9uU2VydmljZS5zdGF0ZSA9PT0gU2VsZWN0aW9uU3RhdGUuRHJhZ2dhYmxlKSB7XG4gICAgICAgIHRoaXMubW92ZVNlbGVjdGVkRWxlbWVudHMoTnVkZ2VUeXBlLk92ZXJsYXksIGZhbHNlKTtcbiAgICAgICAgdGhpcy50cnlEcm9wU2VsZWN0ZWRFbGVtZW50cygpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnN0YXRlID09PSBTZWxlY3Rpb25TdGF0ZS5TaXphYmxlKSB7XG4gICAgICAgIHRoaXMucmVzaXplU2VsZWN0ZWRFbGVtZW50cygpO1xuICAgICAgfVxuICAgICAgdGhpcy5fZHJhZ1NlcnZpY2UuY2xlYXJEcm9wWm9uZXModGhpcy5fZWwubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsICdjdXJzb3InLCB0aGlzLl9jdXJzb3IpO1xuICAgIHRoaXMuX2xhc3REcm9wWm9uZSA9IG51bGw7XG4gICAgdGhpcy5faW50ZXJhY3Rpb25TZXJ2aWNlLnNlbGVjdGVkRWxlbWVudHMgPSB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmNsaWVudHM7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBBdHRlbXBzIHRvIGRyb3AgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBlbGVtZW50cyBpbnRvIGEgZHJvcCB6b25lXG4gICAqIEBwYXJhbSBlIFBvaW50ZXJFdmVudFxuICAgKi9cbiAgdHJ5RHJvcFNlbGVjdGVkRWxlbWVudHMoKSB7XG4gICAgY29uc3Qgc2VsZWN0b3JzID0gdGhpcy5fc2VsZWN0aW9uU2VydmljZS5zZWxlY3RvcnM7XG4gICAgc2VsZWN0b3JzLmZvckVhY2goc2VsZWN0b3IgPT4ge1xuICAgICAgaWYgKHRoaXMuY2FuRHJvcChzZWxlY3Rvci5jbGllbnRFbCkpIHtcbiAgICAgICAgdGhpcy5fZHJhZ1NlcnZpY2UuZHJvcEVsZW1lbnQoXG4gICAgICAgICAgdGhpcy5fbGFzdERyb3Bab25lLFxuICAgICAgICAgIHNlbGVjdG9yLmNsaWVudEVsLFxuICAgICAgICAgIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnRcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnJlc2VsZWN0KCk7XG4gIH1cblxuICAvKipcbiAgICogRW5zdXJlcyB0aGF0IHRoZSBhcHByb3ByaWF0ZSBjdXJzb3IgaXMgc2V0IHdoZW4gZWxlbWVudCBpcyBkcmFnZ2FibGUuXG4gICAqIEBwYXJhbSBlIFBvaW50ZXJFdmVudFxuICAgKi9cbiAgZW5zdXJlQ3Vyc29yKGU6IFBvaW50ZXJFdmVudCkge1xuICAgIGNvbnN0IG1vdXNlUG9zID0gbmV3IFBvaW50KGUucGFnZVgsIGUucGFnZVkpO1xuICAgIGNvbnN0IHNlbGVjdG9yID0gdGhpcy5fc2VsZWN0aW9uU2VydmljZS5zZWxlY3RvckF0UG9pbnQobW91c2VQb3MpO1xuICAgIGlmIChzZWxlY3RvciAmJiBkb20uZWxlbWVudERyYWdnYWJsZShzZWxlY3Rvci5jbGllbnRFbCkpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsICdjdXJzb3InLCAnbW92ZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCAnY3Vyc29yJywgJ2RlZmF1bHQnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVzaXplcyB0aGUgc2VsZWN0ZWQgZWxlbWVudHMgdG8gbWF0Y2ggdGhlIFNlbGVjdG9yIG92ZXJsYXlcbiAgICovXG4gIHJlc2l6ZVNlbGVjdGVkRWxlbWVudHMoKSB7XG4gICAgY29uc3Qgc2VsZWN0b3JzID0gdGhpcy5fc2VsZWN0aW9uU2VydmljZS5zZWxlY3RvcnM7XG4gICAgY29uc3Qgc2l6ZWRFbGVtZW50cyA9IFtdO1xuICAgIHNlbGVjdG9ycy5mb3JFYWNoKHNlbGVjdG9yID0+IHtcbiAgICAgIGlmIChkb20uZWxlbWVudFNpemFibGUoc2VsZWN0b3IuY2xpZW50RWwpKSB7XG4gICAgICAgIHNpemVkRWxlbWVudHMucHVzaChzZWxlY3Rvci5jbGllbnRFbCk7XG4gICAgICAgIGRvbS5hc3NpZ25Cb3VuZGluZ1JlY3QoXG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIsXG4gICAgICAgICAgc2VsZWN0b3Iub3ZlcmxheSxcbiAgICAgICAgICBzZWxlY3Rvci5jbGllbnRFbFxuICAgICAgICApO1xuICAgICAgICB0aGlzLnJlc2l6ZWRFbGVtZW50LmVtaXQoc2VsZWN0b3IuY2xpZW50RWwpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMucmVzZXRTZWxlY3Rpb24oKTtcbiAgICBpZiAoc2l6ZWRFbGVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnJlc2l6ZWRFbGVtZW50cy5lbWl0KHNpemVkRWxlbWVudHMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNb3ZlcyBzZWxlY3RlZCBlbGVtZW50cyB0byB0aGUgY3VycmVudCBsb2NhdGlvbiBvZiB0aGUgc2VsZWN0b3Igb3Igc2VsZWN0b3Igb3ZlcmxheS5cbiAgICogQHBhcmFtIG51ZGdlVHlwZSBkZXRlcm1pbmVzIHdoZXJlIHRoZSBzZWxlY3RlZCBlbGVtZW50cyBzaG91bGQgYmUgbW92ZWQuICBPcHRpb25zIGFyZVxuICAgKiB0byBtb3ZlIHRvIHRoZSBhY3R1YWwgc2VsZWN0b3IgKE51ZGdlVHlwZS5TZWxlY3Rvcikgb3IgdGhlIHNlbGVjdG9yIG92ZXJsYXkgKE5vZGdlVHlwZS5PdmVybGF5KS5cbiAgICogVXN1YWxseSBvbmx5IHRoZSBvdmVybGF5IGlzIGRyYWdnZWQvbW92ZWQsIGhlbmNlIHRoZSBkZWZhdWx0IG9mIE51ZGdlVHlwZS5PdmVybGF5LlxuICAgKiBAcGFyYW0gcmVzZXRBZnRlck1vdmUgZGV0ZXJtaW5lcyBpZiB0aGUgc2VsZWN0b3Igc2hvdWxkIHJlc2V0IGl0c2VsZiBhZnRlciBldmVyeSBtb3ZlLlxuICAgKi9cbiAgbW92ZVNlbGVjdGVkRWxlbWVudHMoXG4gICAgbnVkZ2VUeXBlOiBOdWRnZVR5cGUgPSBOdWRnZVR5cGUuT3ZlcmxheSxcbiAgICByZXNldEFmdGVyTW92ZSA9IHRydWVcbiAgKSB7XG4gICAgY29uc3Qgc2VsZWN0b3JzID0gdGhpcy5fc2VsZWN0aW9uU2VydmljZS5zZWxlY3RvcnM7XG4gICAgY29uc3QgbW92ZWRFbGVtZW50cyA9IFtdO1xuICAgIHNlbGVjdG9ycy5mb3JFYWNoKHNlbGVjdG9yID0+IHtcbiAgICAgIGlmIChkb20uZWxlbWVudERyYWdnYWJsZShzZWxlY3Rvci5jbGllbnRFbCkpIHtcbiAgICAgICAgbW92ZWRFbGVtZW50cy5wdXNoKHNlbGVjdG9yLmNsaWVudEVsKTtcbiAgICAgICAgZG9tLmFzc2lnblBvc2l0aW9uKFxuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLFxuICAgICAgICAgIG51ZGdlVHlwZSA9PT0gTnVkZ2VUeXBlLk92ZXJsYXlcbiAgICAgICAgICAgID8gc2VsZWN0b3Iub3ZlcmxheVxuICAgICAgICAgICAgOiBzZWxlY3Rvci5zZWxlY3RvckVsLFxuICAgICAgICAgIHNlbGVjdG9yLmNsaWVudEVsXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMubW92ZWRFbGVtZW50LmVtaXQoc2VsZWN0b3IuY2xpZW50RWwpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChyZXNldEFmdGVyTW92ZSkge1xuICAgICAgdGhpcy5yZXNldFNlbGVjdGlvbigpO1xuICAgIH1cbiAgICBpZiAobW92ZWRFbGVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLm1vdmVkRWxlbWVudHMuZW1pdChtb3ZlZEVsZW1lbnRzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlcyBzZWxlY3RlZCBlbGVtZW50cy5cbiAgICovXG4gIGRlbGV0ZVNlbGVjdGVkRWxlbWVudHMoKSB7XG4gICAgY29uc3Qgc2VsZWN0b3JzID0gdGhpcy5fc2VsZWN0aW9uU2VydmljZS5zZWxlY3RvcnM7XG4gICAgY29uc3QgZGVsZXRlZEVsZW1lbnRzID0gW107XG4gICAgZm9yIChsZXQgaW5kZXggPSBzZWxlY3RvcnMubGVuZ3RoIC0gMTsgaW5kZXggPj0gMDsgaW5kZXgtLSkge1xuICAgICAgY29uc3Qgc2VsZWN0b3IgPSBzZWxlY3RvcnNbaW5kZXhdO1xuICAgICAgaWYgKHRoaXMuY2FuRGVsZXRlKHNlbGVjdG9yLmNsaWVudEVsKSkge1xuICAgICAgICBjb25zdCBlbCA9IHNlbGVjdG9yLmNsaWVudEVsO1xuICAgICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmNsZWFyU2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICB0aGlzLl9pbnRlcmFjdGlvblNlcnZpY2UuZGVsZXRlRWxlbWVudChlbCk7XG4gICAgICAgIGRlbGV0ZWRFbGVtZW50cy5wdXNoKGVsKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5faW50ZXJhY3Rpb25TZXJ2aWNlLmRlbGV0ZUVsZW1lbnRzKGRlbGV0ZWRFbGVtZW50cyk7XG4gICAgdGhpcy5faW50ZXJhY3Rpb25TZXJ2aWNlLnNlbGVjdGVkRWxlbWVudHMgPSB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmNsaWVudHM7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgbmV3IGNoaWxkIGVsZW1lbnQgdG8gdGhlIGhvc3QgZWxlbWVudC5cbiAgICovXG4gIGFkZEVsZW1lbnQoZWxlbWVudDogRWxlbWVudCkge1xuICAgIGNvbnN0IHNlbGVjdG9yID0gdGhpcy5fc2VsZWN0aW9uU2VydmljZS5hY3RpdmVTZWxlY3RvcjtcbiAgICBjb25zdCBwYXJlbnQgPSBzZWxlY3RvciAmJiBkb20uaXNDb250YWluZXIoc2VsZWN0b3IuY2xpZW50RWwpID8gc2VsZWN0b3IuY2xpZW50RWwgOiB0aGlzLl9lbC5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuX3JlbmRlcmVyLmFwcGVuZENoaWxkKHBhcmVudCwgZWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgbW91c2UgcG9zaXRpb24gcmVsYXRpdmUgdG8gdGhlIG9mZnNldCBhbmQgc2NhbGUgb2YgdGhlIGhvc3QgZWxlbWVudC5cbiAgICogQHBhcmFtIGUgUG9pbnRlckV2ZW50XG4gICAqL1xuICBnZXRSZWxhdGl2ZVBvaW50ZXJQb3MoZTogUG9pbnRlckV2ZW50KSB7XG4gICAgcmV0dXJuIGRvbS5nZXRSZWxhdGl2ZVBvaW50ZXJQb3MoZSwgdGhpcy5fZWwubmF0aXZlRWxlbWVudCwgdGhpcy5zY2FsZSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBwb2ludGVyIGNvb3JkaW5hdGVzIGNoYW5nZXMgcmVsYXRpdmUgdG8gdGhlIHNlbGVjdGVkIGVsZW1lbnQuXG4gICAqIEBwYXJhbSBlIFBvaW50ZXJFdmVudFxuICAgKi9cbiAgZ2V0UG9pbnRlckNoYW5nZShlOiBQb2ludGVyRXZlbnQpOiBhbnlbXSB7XG4gICAgY29uc3QgcG9pbnRlclBvcyA9IHRoaXMuZ2V0UmVsYXRpdmVQb2ludGVyUG9zKGUpO1xuICAgIGxldCBsZWZ0ID0gcG9pbnRlclBvcy54IC0gdGhpcy5fbGFzdE1vdXNlUG9zLng7XG4gICAgbGV0IHRvcCA9IHBvaW50ZXJQb3MueSAtIHRoaXMuX2xhc3RNb3VzZVBvcy55O1xuICAgIGlmICh0aGlzLnNuYXApIHtcbiAgICAgIGlmIChsZWZ0ICUgdGhpcy5zbmFwICE9PSAwKSB7XG4gICAgICAgIGxlZnQgPSAwO1xuICAgICAgICBwb2ludGVyUG9zLnggPSB0aGlzLl9sYXN0TW91c2VQb3MueDtcbiAgICAgIH1cbiAgICAgIGlmICh0b3AgJSB0aGlzLnNuYXAgIT09IDApIHtcbiAgICAgICAgdG9wID0gMDtcbiAgICAgICAgcG9pbnRlclBvcy55ID0gdGhpcy5fbGFzdE1vdXNlUG9zLnk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBbbmV3IFBvaW50KGxlZnQsIHRvcCksIHBvaW50ZXJQb3NdO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlLXNlbGVjdHMgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBlbGVtZW50cy4gIFVzdWFsbHkgaGFwcGVucyBhZnRlclxuICAgKiBhbiBlbGVtZW50IGlzIG1vdmVkIG9yIHJlc2l6ZWQuXG4gICAqL1xuICByZXNldFNlbGVjdGlvbigpIHtcbiAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnJlc2VsZWN0KCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FuY2VscyB0aGUgY3VycmVudCBzZWxlY3Rpb25zIG9yIGRyYWcgb3BlcmF0aW9uLiAgSWYgdGhlIGVsZW1lbnRzIGFyZSBiZWluZyBkcmFnZ2VkLFxuICAgKiB0aGUgZHJhZyBvcGVyYXRpb24gaXMgY2FuY2VsbGVkIGFuZCB0aGUgZWxlbWVudHMgcmVzZWxlY3RlZC4gIE90aGVyd2lzZSwgdGhlIGVsZW1lbnRzXG4gICAqIGFyZSB1bnNlbGVjdGVkLlxuICAgKi9cbiAgY2FuY2VsU2VsZWN0aW9uKCkge1xuICAgIGlmICh0aGlzLl9pc01vdXNlRG93bikge1xuICAgICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5yZXNlbGVjdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmNsZWFyU2VsZWN0b3JzKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQgJiYgdGhpcy5fcmVuZGVyZXIpIHtcbiAgICAgIHRoaXMuX2ludGVyYWN0aW9uU2VydmljZS5pbnRlcmFjdGlvbkhvc3QgPSB0aGlzLl9lbC5uYXRpdmVFbGVtZW50O1xuICAgICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5pbnRlcmFjdGlvbkhvc3QgPSB0aGlzLl9lbC5uYXRpdmVFbGVtZW50O1xuICAgICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5pc0xhc3NvU2VsZWN0YWJsZSA9IHRoaXMuaXNMYXNzb1NlbGVjdGFibGU7XG4gICAgICB0aGlzLl9jdXJzb3IgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQpLmN1cnNvcjtcbiAgICAgIHRoaXMuX2RlbGV0ZVNlbGVjdGVkRWxlbWVudHNTdWJzY3JpcHRpb24gPSB0aGlzLl9pbnRlcmFjdGlvblNlcnZpY2UuZGVsZXRlU2VsZWN0ZWRFbGVtZW50cyQuc3Vic2NyaWJlKFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgIHRoaXMuZGVsZXRlU2VsZWN0ZWRFbGVtZW50cygpO1xuICAgICAgICB9XG4gICAgICApO1xuICAgICAgdGhpcy5fYWRkRWxlbWVudFN1YnNjcmlwdGlvbiA9IHRoaXMuX2ludGVyYWN0aW9uU2VydmljZS5hZGRFbGVtZW50JC5zdWJzY3JpYmUoXG4gICAgICAgIGVsZW1lbnQgPT4ge1xuICAgICAgICAgIC8vIHRoaXMuYWRkRWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9sYXN0RHJvcFpvbmUgPSBudWxsO1xuICAgIHRoaXMuX2RlbGV0ZVNlbGVjdGVkRWxlbWVudHNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9hZGRFbGVtZW50U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdocGMtY29tcG9zZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vY29tcG9zZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jb21wb3Nlci5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ29tcG9zZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGhlYWRlclZpc2libGUgPSB0cnVlO1xuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2hwYy10cmVldmlldycsXG4gIHRlbXBsYXRlVXJsOiAnLi90cmVldmlldy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RyZWV2aWV3LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBUcmVldmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdocGMtdHJlZXZpZXctaXRlbScsXG4gIHRlbXBsYXRlVXJsOiAnLi90cmVldmlldy1pdGVtLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdHJlZXZpZXctaXRlbS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgVHJlZXZpZXdJdGVtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2hwYy1zZWxlY3RvcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWxlY3Rvci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3NlbGVjdG9yLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3RvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdocGMtZmlsZS1tYW5hZ2VyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZpbGUtbWFuYWdlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2ZpbGUtbWFuYWdlci5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRmlsZU1hbmFnZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaHBjLXByb3BlcnR5LWdyaWQnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHJvcGVydHktZ3JpZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3Byb3BlcnR5LWdyaWQuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFByb3BlcnR5R3JpZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSW50ZXJhY3Rpb25Db21wb25lbnQgfSBmcm9tICcuL2ludGVyYWN0aW9uL2ludGVyYWN0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb21wb3NlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9zZXIvY29tcG9zZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFRyZWV2aWV3Q29tcG9uZW50IH0gZnJvbSAnLi90cmVldmlldy90cmVldmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJlZXZpZXdJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi90cmVldmlldy90cmVldmlldy1pdGVtL3RyZWV2aWV3LWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IFNlbGVjdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9zZWxlY3Rvci9zZWxlY3Rvci5jb21wb25lbnQnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0RyYWdTZXJ2aWNlfSBmcm9tICcuL3NlcnZpY2VzL2RyYWcuc2VydmljZSc7XG5pbXBvcnQge1NpemVTZXJ2aWNlfSBmcm9tICcuL3NlcnZpY2VzL3NpemUuc2VydmljZSc7XG5pbXBvcnQge0ludGVyYWN0aW9uU2VydmljZX0gZnJvbSAnLi9pbnRlcmFjdGlvbi9pbnRlcmFjdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7U2VsZWN0b3JTZXJ2aWNlfSBmcm9tICcuL3NlbGVjdG9yL3NlbGVjdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmlsZU1hbmFnZXJDb21wb25lbnQgfSBmcm9tICcuL2ZpbGUtbWFuYWdlci9maWxlLW1hbmFnZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFByb3BlcnR5R3JpZENvbXBvbmVudCB9IGZyb20gJy4vcHJvcGVydHktZ3JpZC9wcm9wZXJ0eS1ncmlkLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgSW50ZXJhY3Rpb25Db21wb25lbnQsXG4gICAgQ29tcG9zZXJDb21wb25lbnQsXG4gICAgVHJlZXZpZXdDb21wb25lbnQsXG4gICAgVHJlZXZpZXdJdGVtQ29tcG9uZW50LFxuICAgIFNlbGVjdG9yQ29tcG9uZW50LFxuICAgIEZpbGVNYW5hZ2VyQ29tcG9uZW50LFxuICAgIFByb3BlcnR5R3JpZENvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgSW50ZXJhY3Rpb25Db21wb25lbnQsXG4gICAgQ29tcG9zZXJDb21wb25lbnQsXG4gICAgVHJlZXZpZXdDb21wb25lbnRcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgRHJhZ1NlcnZpY2UsXG4gICAgU2l6ZVNlcnZpY2UsXG4gICAgSW50ZXJhY3Rpb25TZXJ2aWNlLFxuICAgIFNlbGVjdG9yU2VydmljZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEhwQ29tcG9uZW50c01vZHVsZSB7IH1cbiJdLCJuYW1lcyI6WyJkb20ubW92ZUVsZW1lbnRCeSIsImRvbS5lbGVtZW50RHJhZ2dhYmxlIiwiZG9tLm9mZnNldCIsImRvbS5lbGVtZW50QXRQb2ludCIsImRvbS5jaGlsZHJlbk9mIiwiZG9tLmNoYW5nZVBhcmVudCIsImRvbS5lbGVtZW50Qm91bmRzIiwiZG9tLnNldEVsZW1lbnRSZWN0IiwiZG9tLmVsZW1lbnRTaXphYmxlIiwiZG9tLmlzU2VsZWN0YWJsZSIsImRvbS5wb2ludEluUmVjdCIsImRvbS5lbGVtZW50c0F0UmVjdCIsImRvbS5hc3NpZ25Cb3VuZGluZ1JlY3QiLCJkb20uYXNzaWduUG9zaXRpb24iLCJkb20uaXNDb250YWluZXIiLCJkb20uZ2V0UmVsYXRpdmVQb2ludGVyUG9zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0lBT0UsaUJBQWlCOzs7WUFMbEIsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7Ozs7Ozs7O0FDSkQ7Ozs7Ozs7SUFDRSxZQUFtQixPQUFlLENBQUMsRUFBUyxNQUFjLENBQUMsRUFBUyxRQUFnQixDQUFDLEVBQVMsU0FBaUIsQ0FBQztRQUE3RixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQVMsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUFTLFVBQUssR0FBTCxLQUFLLENBQVk7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFZO0tBQUs7Ozs7SUFDckgsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7S0FDL0I7Ozs7SUFDRCxJQUFJLE1BQU07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