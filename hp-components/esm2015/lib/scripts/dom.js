/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Point, Rect, Size } from './math';
/**
 * @param {?} el
 * @return {?}
 */
export function offset2(el) {
    /** @type {?} */
    const result = new Point(el.offsetLeft, el.offsetTop);
    if (el.parentElement) {
        result.add(offset(el.parentElement));
    }
    return result;
}
/**
 * @param {?} el
 * @return {?}
 */
export function offset(el) {
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
export function pixToNum(value) {
    if (!value || value.length === 0) {
        return 0;
    }
    /** @type {?} */
    const newValue = value.replace('px', '').replace('em', '');
    return parseFloat(newValue);
}
/**
 * @param {?} value
 * @param {?=} autoWhenZero
 * @return {?}
 */
export function numToPix(value, autoWhenZero = false) {
    if (value == null) {
        value = 0;
    }
    if (autoWhenZero && value === 0) {
        return 'auto';
    }
    return value.toString() + 'px';
}
/**
 * @param {?} element
 * @param {?=} orderByZOrder
 * @return {?}
 */
export function childElements(element, orderByZOrder = false) {
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
    if (orderByZOrder) {
        // result = Enumerable.from(result).orderBy(x => parseInt(x.style.zIndex, NaN)).toArray();
    }
    return result;
}
/**
 * @param {?} children
 * @return {?}
 */
export function removeHelperChildren(children) {
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
export function removeArrayItem(array, item) {
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
export function intersect(a, b) {
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
export function elementsAtRect(parent, rect, exclude = []) {
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
export function elementPos(element) {
    /** @type {?} */
    const computedStyles = getComputedStyle(element, null);
    return new Point(pixToNum(computedStyles.left), pixToNum(computedStyles.top));
}
/**
 * @param {?} element
 * @return {?}
 */
export function elementSize(element) {
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
export function elementBounds(element, relativeToPage = false, scale = null) {
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
export function elementPagePos(element) {
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
export function parentTree(element, lastClass = 'surface', inclusive = false) {
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
export function moveElementTo(renderer, element, position) {
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
export function moveElementBy(renderer, element, delta) {
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
 * @param {?} element
 * @param {?} delta
 * @return {?}
 */
export function sizeElementBy(renderer, element, delta) {
    if (!element) {
        return;
    }
    /** @type {?} */
    const size = elementSize(element);
    /** @type {?} */
    const height = size.height + delta.y;
    /** @type {?} */
    const width = size.width + delta.x;
    renderer.setStyle(element, 'height', height + 'px');
    renderer.setStyle(element, 'width', width + 'px');
}
/**
 * @param {?} renderer
 * @param {?} source
 * @param {?} target
 * @return {?}
 */
export function assignBoundingRect(renderer, source, target) {
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
export function assignPosition(renderer, source, target) {
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
export function setElementRect(renderer, rect, element) {
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
export function childrenOf(parent, deep = false, exclude = []) {
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
export function pointInRect(point, rect) {
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
export function elementAtPoint(pos, parent, exclude = []) {
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
 * @param {?} pos
 * @param {?} parent
 * @param {?=} exclude
 * @return {?}
 */
export function xelementAtPoint(pos, parent, exclude = []) {
    /** @type {?} */
    let result = parent;
    /** @type {?} */
    const children = childElements(parent);
    for (let index = 0; index < children.length; index++) {
        /** @type {?} */
        const child = children[index];
        /** @type {?} */
        const elRect = child.getBoundingClientRect();
        /** @type {?} */
        const rect = new Rect(elRect.left, elRect.top, elRect.width, elRect.height);
        if (exclude.indexOf(child) === -1 && pointInRect(pos, rect)) {
            result = child;
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
export function changeParent(element, newParent, renderer) {
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
 * @param {?} element
 * @param {?} scale
 * @return {?}
 */
export function getScaledPos(element, scale) {
    /** @type {?} */
    const pos = offset(element);
    return new Point(pos.x / scale, pos.y / scale);
}
/**
 * @param {?} e
 * @param {?} element
 * @param {?=} scale
 * @return {?}
 */
export function getRelativePointerPos(e, element, scale = 1) {
    /** @type {?} */
    const relativePos = offset(element);
    return new Point((e.pageX - relativePos.x) / scale, (e.pageY - relativePos.y) / scale);
}
/**
 * @param {?} element
 * @return {?}
 */
export function elementDraggable(element) {
    return !elementLocked(element) && element.className.indexOf('hpc-no-drag') === -1;
}
/**
 * @param {?} element
 * @return {?}
 */
export function elementSizable(element) {
    return !elementLocked(element) && element.className.indexOf('hpc-no-size') === -1;
}
/**
 * @param {?} element
 * @return {?}
 */
export function elementLocked(element) {
    return element.className.indexOf('hpc-locked') > -1;
}
/**
 * @param {?} element
 * @return {?}
 */
export function isContainer(element) {
    return element.classList.contains('hpc-container');
}
/**
 * @param {?} element
 * @return {?}
 */
export function isSelectable(element) {
    return !element.classList.contains('hpc-no-select');
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaHAtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbImxpYi9zY3JpcHRzL2RvbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLE1BQU0sUUFBUSxDQUFDOzs7OztBQUd6QyxNQUFNLGtCQUFrQixFQUFlOztJQUNwQyxNQUFNLE1BQU0sR0FBRyxJQUFJLEtBQUssQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN0RCxJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUU7UUFDcEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7S0FDdEM7SUFDRCxPQUFPLE1BQU0sQ0FBQztDQUNoQjs7Ozs7QUFFRCxNQUFNLGlCQUFpQixFQUFlOztJQUNwQyxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMscUJBQXFCLEVBQUUsQ0FBQzs7SUFDdkMsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQzs7SUFDcEIsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztJQUN0QixPQUFPLElBQUksS0FBSyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztDQUM3Qjs7Ozs7QUFFRCxNQUFNLG1CQUFtQixLQUFhO0lBQ3BDLElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDaEMsT0FBTyxDQUFDLENBQUM7S0FDVjs7SUFDRCxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzNELE9BQU8sVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0NBQzdCOzs7Ozs7QUFFRCxN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O1xuaW1wb3J0IHtSZW5kZXJlcjJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gb2Zmc2V0MihlbDogSFRNTEVsZW1lbnQpOiBQb2ludCB7XG4gICBjb25zdCByZXN1bHQgPSBuZXcgUG9pbnQoZWwub2Zmc2V0TGVmdCwgZWwub2Zmc2V0VG9wKTtcbiAgIGlmIChlbC5wYXJlbnRFbGVtZW50KSB7XG4gICAgIHJlc3VsdC5hZGQob2Zmc2V0KGVsLnBhcmVudEVsZW1lbnQpKTtcbiAgIH1cbiAgIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvZmZzZXQoZWw6IEhUTUxFbGVtZW50KTogUG9pbnQge1xuICBjb25zdCBib3ggPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgY29uc3QgdG9wID0gYm94LnRvcDtcbiAgY29uc3QgbGVmdCA9IGJveC5sZWZ0O1xuICByZXR1cm4gbmV3IFBvaW50KGxlZnQsIHRvcCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwaXhUb051bSh2YWx1ZTogc3RyaW5nKTogbnVtYmVyIHtcbiAgaWYgKCF2YWx1ZSB8fCB2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBjb25zdCBuZXdWYWx1ZSA9IHZhbHVlLnJlcGxhY2UoJ3B4JywgJycpLnJlcGxhY2UoJ2VtJywgJycpO1xuICByZXR1cm4gcGFyc2VGbG9hdChuZXdWYWx1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBudW1Ub1BpeCh2YWx1ZTogbnVtYmVyLCBhdXRvV2hlblplcm86IGJvb2xlYW4gPSBmYWxzZSk6IHN0cmluZyB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgdmFsdWUgPSAwO1xuICB9XG4gIGlmIChhdXRvV2hlblplcm8gJiYgdmFsdWUgPT09IDApIHtcbiAgICByZXR1cm4gJ2F1dG8nO1xuICB9XG4gIHJldHVybiB2YWx1ZS50b1N0cmluZygpICsgJ3B4Jztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoaWxkRWxlbWVudHMoZWxlbWVudDogSFRNTEVsZW1lbnQsIG9yZGVyQnlaT3JkZXIgPSBmYWxzZSk6IEhUTUxFbGVtZW50W10ge1xuICBjb25zdCByZXN1bHQgPSBuZXcgQXJyYXk8SFRNTEVsZW1lbnQ+KCk7XG4gIGlmICghZWxlbWVudCkge1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgY29uc3QgY2hpbGRyZW4gPSBlbGVtZW50LmNoaWxkcmVuO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY2hpbGQgPSBjaGlsZHJlbltpXSBhcyBIVE1MRWxlbWVudDtcbiAgICBpZiAoY2hpbGQgJiYgY2hpbGQucGFyZW50RWxlbWVudCA9PT0gZWxlbWVudCAmJlxuICAgICAgY2hpbGQuY2xhc3NOYW1lLmluZGV4T2YoJ2hwYy1sYXNzby1zZWxlY3RvcicpID09PSAtMSAmJlxuICAgICAgY2hpbGQuY2xhc3NOYW1lLmluZGV4T2YoJ2hwYy1lbGVtZW50LXNlbGVjdG9yJykgPT09IC0xICYmXG4gICAgICBjaGlsZC5jbGFzc05hbWUuaW5kZXhPZignZ3JpcCcpID09PSAtMSkge1xuICAgICAgcmVzdWx0LnB1c2goY2hpbGQpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChvcmRlckJ5Wk9yZGVyKSB7XG4gICAgLy8gcmVzdWx0ID0gRW51bWVyYWJsZS5mcm9tKHJlc3VsdCkub3JkZXJCeSh4ID0+IHBhcnNlSW50KHguc3R5bGUuekluZGV4LCBOYU4pKS50b0FycmF5KCk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUhlbHBlckNoaWxkcmVuKGNoaWxkcmVuOiBIVE1MRWxlbWVudFtdKSB7XG4gIGZvciAobGV0IGkgPSBjaGlsZHJlbi5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGNvbnN0IGNoaWxkID0gY2hpbGRyZW5baV0gYXMgSFRNTEVsZW1lbnQ7XG4gICAgaWYgKGNoaWxkLmNsYXNzTmFtZS5pbmRleE9mKCdocGMtbGFzc28tc2VsZWN0b3InKSA+IC0xIHx8XG4gICAgICBjaGlsZC5jbGFzc05hbWUuaW5kZXhPZignaHBjLWVsZW1lbnQtc2VsZWN0b3InKSA+IC0xIHx8XG4gICAgICBjaGlsZC5jbGFzc05hbWUuaW5kZXhPZignaHBjLWRyYWctb3ZlcmxheScpID4gLTEgfHxcbiAgICAgIGNoaWxkLmNsYXNzTmFtZS5pbmRleE9mKCdncmlwLWNvbnRhaW5lcicpID4gLTEgfHxcbiAgICAgIGNoaWxkLmNsYXNzTmFtZS5pbmRleE9mKCdncmlwJykgPiAtMSkge1xuICAgICAgcmVtb3ZlQXJyYXlJdGVtKGNoaWxkcmVuLCBjaGlsZCk7XG4gICAgfVxuICB9XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUFycmF5SXRlbShhcnJheTogYW55W10sIGl0ZW06IGFueSkge1xuICBjb25zdCBpbmRleCA9IHR5cGVvZihpdGVtKSA9PT0gJ251bWJlcicgPyBpdGVtIDogYXJyYXkuaW5kZXhPZihpdGVtKSA7XG4gIGlmIChpbmRleCA+IC0xKSB7XG4gICAgYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW50ZXJzZWN0KGE6IFJlY3QsIGI6IFJlY3QpOiBib29sZWFuIHtcbiAgcmV0dXJuIChhLmxlZnQgPD0gYi5yaWdodCAmJlxuICAgIGIubGVmdCA8PSBhLnJpZ2h0ICYmXG4gICAgYS50b3AgPD0gYi5ib3R0b20gJiZcbiAgICBiLnRvcCA8PSBhLmJvdHRvbSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiAgZWxlbWVudHNBdFJlY3QocGFyZW50OiBIVE1MRWxlbWVudCwgcmVjdDogUmVjdCwgZXhjbHVkZTogSFRNTEVsZW1lbnRbXSA9IFtdKSB7XG4gIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIGNoaWxkRWxlbWVudHMocGFyZW50KS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgIGlmIChpbnRlcnNlY3QoZWxlbWVudEJvdW5kcyhlbGVtZW50KSwgcmVjdCkpIHtcbiAgICAgIGlmIChleGNsdWRlID09IG51bGwgfHwgZXhjbHVkZS5pbmRleE9mKGVsZW1lbnQpID09PSAtMSkge1xuICAgICAgICByZXN1bHQucHVzaChlbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWxlbWVudFBvcyhlbGVtZW50OiBIVE1MRWxlbWVudCk6IFBvaW50IHtcbiAgY29uc3QgY29tcHV0ZWRTdHlsZXMgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQsIG51bGwpO1xuICByZXR1cm4gbmV3IFBvaW50KHBpeFRvTnVtKGNvbXB1dGVkU3R5bGVzLmxlZnQpLCBwaXhUb051bShjb21wdXRlZFN0eWxlcy50b3ApKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVsZW1lbnRTaXplKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogU2l6ZSB7XG4gIGNvbnN0IGNvbXB1dGVkU3R5bGVzID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50LCBudWxsKTtcbiAgcmV0dXJuIG5ldyBTaXplKHBpeFRvTnVtKGNvbXB1dGVkU3R5bGVzLmhlaWdodCksIHBpeFRvTnVtKGNvbXB1dGVkU3R5bGVzLndpZHRoKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbGVtZW50Qm91bmRzKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCByZWxhdGl2ZVRvUGFnZTogYm9vbGVhbiA9IGZhbHNlLCBzY2FsZTogUG9pbnQgPSBudWxsKTogUmVjdCB7XG4gIGxldCBwb3MgPSBlbGVtZW50UG9zKGVsZW1lbnQpO1xuICBpZiAocmVsYXRpdmVUb1BhZ2UpIHtcbiAgICBwb3MgPSBlbGVtZW50UGFnZVBvcyhlbGVtZW50KTtcbiAgfVxuICBjb25zdCBzaXplID0gZWxlbWVudFNpemUoZWxlbWVudCk7XG4gIGlmIChzY2FsZSkge1xuICAgIHNpemUud2lkdGggPSBzaXplLndpZHRoICogc2NhbGUueDtcbiAgICBzaXplLmhlaWdodCA9IHNpemUuaGVpZ2h0ICogc2NhbGUueTtcbiAgfVxuICByZXR1cm4gbmV3IFJlY3QocG9zLngsIHBvcy55LCBzaXplLndpZHRoLCBzaXplLmhlaWdodCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbGVtZW50UGFnZVBvcyhlbGVtZW50OiBIVE1MRWxlbWVudCk6IFBvaW50IHtcbiAgY29uc3QgcmVzdWx0ID0gZWxlbWVudFBvcyhlbGVtZW50KTtcbiAgaWYgKGVsZW1lbnQucGFyZW50RWxlbWVudCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBsZXQgbGVmdCA9IHJlc3VsdC54O1xuICBsZXQgdG9wID0gcmVzdWx0Lnk7XG4gIGNvbnN0IHBhcmVudHMgPSBwYXJlbnRUcmVlKGVsZW1lbnQpO1xuICBwYXJlbnRzLmZvckVhY2gocGFyZW50ID0+IHtcbiAgICBsZWZ0ICs9IHBpeFRvTnVtKHBhcmVudC5zdHlsZS5sZWZ0KSArIHBhcmVudC5jbGllbnRMZWZ0O1xuICAgIHRvcCArPSBwaXhUb051bShwYXJlbnQuc3R5bGUudG9wKSArIHBhcmVudC5jbGllbnRUb3A7XG4gIH0pO1xuICByZXR1cm4gbmV3IFBvaW50KGxlZnQsIHRvcCk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcmVudFRyZWUoZWxlbWVudDogSFRNTEVsZW1lbnQsIGxhc3RDbGFzczogc3RyaW5nID0gJ3N1cmZhY2UnLCBpbmNsdXNpdmUgPSBmYWxzZSk6IEFycmF5PEhUTUxFbGVtZW50PiB7XG4gIGNvbnN0IHJlc3VsdCA9IG5ldyBBcnJheTxIVE1MRWxlbWVudD4oKTtcbiAgaWYgKCFlbGVtZW50KSB7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBsZXQgcGFyZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICB3aGlsZSAocGFyZW50ICE9IG51bGwpIHtcbiAgICBpZiAoIWluY2x1c2l2ZSAmJiBwYXJlbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGxhc3RDbGFzcykpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXN1bHQucHVzaChwYXJlbnQpO1xuICAgIGlmIChwYXJlbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGxhc3RDbGFzcykpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50RWxlbWVudDtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbW92ZUVsZW1lbnRUbyhyZW5kZXJlcjogUmVuZGVyZXIyLCBlbGVtZW50OiBIVE1MRWxlbWVudCwgcG9zaXRpb246IFBvaW50KTogdm9pZCB7XG4gIGlmICghZWxlbWVudCkgeyByZXR1cm47IH1cbiAgcmVuZGVyZXIuc2V0U3R5bGUoZWxlbWVudCwgJ3RvcCcsIHBvc2l0aW9uLnkgKyAncHgnKTtcbiAgcmVuZGVyZXIuc2V0U3R5bGUoZWxlbWVudCwgJ2xlZnQnLCBwb3NpdGlvbi54ICsgJ3B4Jyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb3ZlRWxlbWVudEJ5KHJlbmRlcmVyOiBSZW5kZXJlcjIsIGVsZW1lbnQsIGRlbHRhOiBQb2ludCkge1xuICBpZiAoIWVsZW1lbnQpIHsgcmV0dXJuOyB9XG4gIGNvbnN0IHBvcyA9IGVsZW1lbnRQb3MoZWxlbWVudCk7XG4gIGNvbnN0IHRvcCA9IHBvcy55ICsgZGVsdGEueTtcbiAgY29uc3QgbGVmdCA9IHBvcy54ICsgZGVsdGEueDtcbiAgcmVuZGVyZXIuc2V0U3R5bGUoZWxlbWVudCwgJ3RvcCcsIHRvcCArICdweCcpO1xuICByZW5kZXJlci5zZXRTdHlsZShlbGVtZW50LCAnbGVmdCcsIGxlZnQgKyAncHgnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNpemVFbGVtZW50QnkocmVuZGVyZXI6IFJlbmRlcmVyMiwgZWxlbWVudCwgZGVsdGE6IFBvaW50KSB7XG4gIGlmICghZWxlbWVudCkgeyByZXR1cm47IH1cbiAgY29uc3Qgc2l6ZSA9IGVsZW1lbnRTaXplKGVsZW1lbnQpO1xuICBjb25zdCBoZWlnaHQgPSBzaXplLmhlaWdodCArIGRlbHRhLnk7XG4gIGNvbnN0IHdpZHRoID0gc2l6ZS53aWR0aCArIGRlbHRhLng7XG4gIHJlbmRlcmVyLnNldFN0eWxlKGVsZW1lbnQsICdoZWlnaHQnLCBoZWlnaHQgKyAncHgnKTtcbiAgcmVuZGVyZXIuc2V0U3R5bGUoZWxlbWVudCwgJ3dpZHRoJywgd2lkdGggKyAncHgnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2lnbkJvdW5kaW5nUmVjdChyZW5kZXJlcjogUmVuZGVyZXIyLCBzb3VyY2U6IEhUTUxFbGVtZW50LCB0YXJnZXQ6IEhUTUxFbGVtZW50KSB7XG4gIGNvbnN0IHNvdXJjZVJlY3QgPSBlbGVtZW50Qm91bmRzKHNvdXJjZSk7XG4gIC8vIGNvbnN0IHN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUoc291cmNlKTtcbiAgY29uc3QgdG9wID0gc291cmNlUmVjdC50b3A7IC8vICsgcGl4VG9OdW0oc3R5bGVzLm1hcmdpblRvcCk7XG4gIGNvbnN0IGxlZnQgPSBzb3VyY2VSZWN0LmxlZnQ7IC8vICsgcGl4VG9OdW0oc3R5bGVzLm1hcmdpbkxlZnQpO1xuICByZW5kZXJlci5zZXRTdHlsZSh0YXJnZXQsICd0b3AnLCB0b3AgKyAncHgnKTtcbiAgcmVuZGVyZXIuc2V0U3R5bGUodGFyZ2V0LCAnbGVmdCcsIGxlZnQgKyAncHgnKTtcbiAgcmVuZGVyZXIuc2V0U3R5bGUodGFyZ2V0LCAnaGVpZ2h0Jywgc291cmNlUmVjdC5oZWlnaHQgKyAncHgnKTtcbiAgcmVuZGVyZXIuc2V0U3R5bGUodGFyZ2V0LCAnd2lkdGgnLCBzb3VyY2VSZWN0LndpZHRoICsgJ3B4Jyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NpZ25Qb3NpdGlvbihyZW5kZXJlcjogUmVuZGVyZXIyLCBzb3VyY2U6IEhUTUxFbGVtZW50LCB0YXJnZXQ6IEhUTUxFbGVtZW50KSB7XG4gIGNvbnN0IHNvdXJjZVJlY3QgPSBlbGVtZW50Qm91bmRzKHNvdXJjZSk7XG4gIGNvbnN0IHBvcyA9IGVsZW1lbnRQb3Moc291cmNlKTtcbiAgcmVuZGVyZXIuc2V0U3R5bGUodGFyZ2V0LCAndG9wJywgcG9zLnkgKyAncHgnKTtcbiAgcmVuZGVyZXIuc2V0U3R5bGUodGFyZ2V0LCAnbGVmdCcsIHBvcy54ICsgJ3B4Jyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRFbGVtZW50UmVjdChyZW5kZXJlcjogUmVuZGVyZXIyLCByZWN0OiBSZWN0LCBlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICByZW5kZXJlci5zZXRTdHlsZShlbGVtZW50LCAndG9wJywgcmVjdC50b3AgKyAncHgnKTtcbiAgcmVuZGVyZXIuc2V0U3R5bGUoZWxlbWVudCwgJ2xlZnQnLCByZWN0LmxlZnQgKyAncHgnKTtcbiAgcmVuZGVyZXIuc2V0U3R5bGUoZWxlbWVudCwgJ2hlaWdodCcsIHJlY3QuaGVpZ2h0ICsgJ3B4Jyk7XG4gIHJlbmRlcmVyLnNldFN0eWxlKGVsZW1lbnQsICd3aWR0aCcsIHJlY3Qud2lkdGggKyAncHgnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoaWxkcmVuT2YocGFyZW50OiBIVE1MRWxlbWVudCwgZGVlcCA9IGZhbHNlLCBleGNsdWRlID0gW10pOiBIVE1MRWxlbWVudFtdIHtcbiAgbGV0IHJlc3VsdCA9IFtdO1xuICBpZiAocGFyZW50KSB7XG4gICAgaWYgKGRlZXApIHtcbiAgICAgIHJlc3VsdCA9IEFycmF5LmZyb20ocGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyonKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IEFycmF5LmZyb20ocGFyZW50LmNoaWxkcmVuKTtcbiAgICB9XG4gICAgcmVtb3ZlSGVscGVyQ2hpbGRyZW4ocmVzdWx0KTtcbiAgICByZXN1bHQgPSByZXN1bHQuZmlsdGVyKHggPT4gISh4IGluIGV4Y2x1ZGUpKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcG9pbnRJblJlY3QocG9pbnQ6IFBvaW50LCByZWN0OiBSZWN0KTogYm9vbGVhbiB7XG4gIHJldHVybiBwb2ludC54ID49IHJlY3QubGVmdCAmJiBwb2ludC54IDw9IHJlY3QucmlnaHQgJiYgcG9pbnQueSA+PSByZWN0LnRvcCAmJiBwb2ludC55IDw9IHJlY3QuYm90dG9tO1xufVxuXG4vKipcbiogUmV0dXJucyB0aGUgZmlyc3QgY2hpbGQgZWxlbWVudCBvZiB0aGUgcGFyZW50IGVsZW1lbnQgYXQgYSBnaXZlbiBwb2ludC5cbiogSWYgdGhlcmUgYXJlIG5vIGNoaWxkIGVsZW1lbnRzIGF0IHRoZSBnaXZlbiBwb2ludCwgdGhlbiB0aGUgcGFyZW50IGVsZW1lbnQgaXMgcmV0dXJuZWQuXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIGVsZW1lbnRBdFBvaW50KHBvczogUG9pbnQsIHBhcmVudDogSFRNTEVsZW1lbnQsIGV4Y2x1ZGUgPSBbXSk6IEhUTUxFbGVtZW50IHtcbiAgICBsZXQgcmVzdWx0ID0gcGFyZW50O1xuICAgIGNvbnN0IGNoaWxkcmVuID0gY2hpbGRyZW5PZihwYXJlbnQsIGZhbHNlLCBleGNsdWRlKTtcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgY2hpbGRyZW4ubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBjb25zdCBjaGlsZCA9IGNoaWxkcmVuW2luZGV4XTtcbiAgICAgIGNvbnN0IGVsUmVjdCA9IGNoaWxkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgY29uc3QgcmVjdCA9IG5ldyBSZWN0KGVsUmVjdC5sZWZ0LCBlbFJlY3QudG9wLCBlbFJlY3Qud2lkdGgsIGVsUmVjdC5oZWlnaHQpO1xuICAgICAgaWYgKGV4Y2x1ZGUuaW5kZXhPZihjaGlsZCkgPT09IC0xICYmIHBvaW50SW5SZWN0KHBvcywgcmVjdCkpIHtcbiAgICAgICAgcmVzdWx0ID0gZWxlbWVudEF0UG9pbnQocG9zLCBjaGlsZCwgZXhjbHVkZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHhlbGVtZW50QXRQb2ludChwb3M6IFBvaW50LCBwYXJlbnQ6IEhUTUxFbGVtZW50LCBleGNsdWRlID0gW10pOiBIVE1MRWxlbWVudCB7XG4gIGxldCByZXN1bHQgPSBwYXJlbnQ7XG4gIGNvbnN0IGNoaWxkcmVuID0gY2hpbGRFbGVtZW50cyhwYXJlbnQpO1xuICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgY2hpbGRyZW4ubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgY29uc3QgY2hpbGQgPSBjaGlsZHJlbltpbmRleF07XG4gICAgY29uc3QgZWxSZWN0ID0gY2hpbGQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgcmVjdCA9IG5ldyBSZWN0KGVsUmVjdC5sZWZ0LCBlbFJlY3QudG9wLCBlbFJlY3Qud2lkdGgsIGVsUmVjdC5oZWlnaHQpO1xuICAgIGlmIChleGNsdWRlLmluZGV4T2YoY2hpbGQpID09PSAtMSAmJiBwb2ludEluUmVjdChwb3MsIHJlY3QpKSB7XG4gICAgICByZXN1bHQgPSBjaGlsZDtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hhbmdlUGFyZW50KGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBuZXdQYXJlbnQ6IEhUTUxFbGVtZW50LCByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gIGlmICghbmV3UGFyZW50IHx8IGVsZW1lbnQucGFyZW50RWxlbWVudCA9PT0gbmV3UGFyZW50KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHBhcmVudFBvcyA9IGVsZW1lbnRQYWdlUG9zKG5ld1BhcmVudCk7XG4gIGNvbnN0IGVsUG9zID0gZWxlbWVudFBhZ2VQb3MoZWxlbWVudCk7XG4gIGNvbnN0IG5ld1BvcyA9IG5ldyBQb2ludChlbFBvcy54IC0gcGFyZW50UG9zLngsIGVsUG9zLnkgLSBwYXJlbnRQb3MueSk7XG4gIHJlbmRlcmVyLmFwcGVuZENoaWxkKG5ld1BhcmVudCwgZWxlbWVudCk7XG4gIG1vdmVFbGVtZW50VG8ocmVuZGVyZXIsIGVsZW1lbnQsIG5ld1Bvcyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTY2FsZWRQb3MoZWxlbWVudDogSFRNTEVsZW1lbnQsIHNjYWxlOiBudW1iZXIpOiBQb2ludCB7XG4gICAgY29uc3QgcG9zID0gb2Zmc2V0KGVsZW1lbnQpO1xuICAgIHJldHVybiBuZXcgUG9pbnQoXG4gICAgICBwb3MueCAvIHNjYWxlLFxuICAgICAgcG9zLnkgLyBzY2FsZVxuICAgICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSZWxhdGl2ZVBvaW50ZXJQb3MoZTogUG9pbnRlckV2ZW50LCBlbGVtZW50OiBIVE1MRWxlbWVudCwgc2NhbGUgPSAxKSB7XG4gIGNvbnN0IHJlbGF0aXZlUG9zID0gb2Zmc2V0KGVsZW1lbnQpO1xuICByZXR1cm4gbmV3IFBvaW50KFxuICAgIChlLnBhZ2VYIC0gcmVsYXRpdmVQb3MueCkgLyBzY2FsZSxcbiAgICAoZS5wYWdlWSAtIHJlbGF0aXZlUG9zLnkpIC8gc2NhbGVcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVsZW1lbnREcmFnZ2FibGUoZWxlbWVudDogRWxlbWVudCkge1xuICByZXR1cm4gIWVsZW1lbnRMb2NrZWQoZWxlbWVudCkgJiYgZWxlbWVudC5jbGFzc05hbWUuaW5kZXhPZignaHBjLW5vLWRyYWcnKSA9PT0gLTE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbGVtZW50U2l6YWJsZShlbGVtZW50OiBFbGVtZW50KSB7XG4gIHJldHVybiAhZWxlbWVudExvY2tlZChlbGVtZW50KSAmJiBlbGVtZW50LmNsYXNzTmFtZS5pbmRleE9mKCdocGMtbm8tc2l6ZScpID09PSAtMTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVsZW1lbnRMb2NrZWQoZWxlbWVudDogRWxlbWVudCk6IGJvb2xlYW4ge1xuICByZXR1cm4gZWxlbWVudC5jbGFzc05hbWUuaW5kZXhPZignaHBjLWxvY2tlZCcpID4gLTE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0NvbnRhaW5lcihlbGVtZW50OiBFbGVtZW50KTogYm9vbGVhbiB7XG4gIHJldHVybiBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnaHBjLWNvbnRhaW5lcicpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTZWxlY3RhYmxlKGVsZW1lbnQ6IEVsZW1lbnQpOiBib29sZWFuIHtcbiAgcmV0dXJuICFlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnaHBjLW5vLXNlbGVjdCcpO1xufVxuXG5cbiJdfQ==