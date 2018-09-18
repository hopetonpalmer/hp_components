import {Point, Rect, Size} from './math';
import {Renderer2} from '@angular/core';


export function offset(el: Element): Point {
  const box = el.getBoundingClientRect();
  const top = box.top;
  const left = box.left;
  return new Point(left, top);
}

export function pixToNum(value: string): number {
  if (!value || value.length === 0) {
    return 0;
  }
  const newValue = value.replace('px', '').replace('em', '');
  return parseFloat(newValue);
}

export function numToPix(value: number, autoWhenZero: boolean = false): string {
  if (value == null) {
    value = 0;
  }
  if (autoWhenZero && value === 0) {
    return 'auto';
  }
  return value.toString() + 'px';
}

export function childElements(element: Element, orderByZOrder = false): HTMLElement[] {
  const result = new Array<HTMLElement>();
  if (!element) {
    return result;
  }
  const children = element.children;
  for (let i = 0; i < children.length; i++) {
    const child = children[i] as HTMLElement;
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

export function defaultExcludeFromChildren(children: HTMLElement[]) {
  for (let i = children.length - 1; i >= 0; i--) {
    const child = children[i] as HTMLElement;
    if (child.className.indexOf('hpc-lasso-selector') > -1 ||
      child.getAttribute('skipChildLookup') === 'true' ||
      child.className.indexOf('hpc-element-selector') > -1 ||
      child.className.indexOf('hpc-drag-overlay') > -1 ||
      child.className.indexOf('grip-container') > -1 ||
      child.className.indexOf('grip') > -1) {
      removeArrayItem(children, child);
    }
  }
}


export function removeArrayItem(array: any[], item: any) {
  const index = typeof(item) === 'number' ? item : array.indexOf(item) ;
  if (index > -1) {
    array.splice(index, 1);
  }
}

export function intersect(a: Rect, b: Rect): boolean {
  return (a.left <= b.right &&
    b.left <= a.right &&
    a.top <= b.bottom &&
    b.top <= a.bottom);
}

export function  elementsAtRect(parent: HTMLElement, rect: Rect, exclude: HTMLElement[] = []) {
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

export function elementPos(element: Element): Point {
  const computedStyles = getComputedStyle(element, null);
  return new Point(pixToNum(computedStyles.left), pixToNum(computedStyles.top));
}

export function elementSize(element: Element): Size {
  const computedStyles = getComputedStyle(element, null);
  return new Size(pixToNum(computedStyles.height), pixToNum(computedStyles.width));
}

export function elementBounds(element: Element, relativeToPage: boolean = false, scale: Point = null): Rect {
  let pos = elementPos(element);
  if (relativeToPage) {
    pos = elementPagePos(element);
  }
  const size = elementSize(element);
  if (scale) {
    size.width = size.width * scale.x;
    size.height = size.height * scale.y;
  }
  return new Rect(pos.x, pos.y, size.width, size.height);
}

export function elementPagePos(element: Element): Point {
  const result = elementPos(element);
  if (element.parentElement == null) {
    return result;
  }
  let left = result.x;
  let top = result.y;
  const parents = parentTree(element);
  parents.forEach(parent => {
    left += pixToNum(parent.style.left) + parent.clientLeft;
    top += pixToNum(parent.style.top) + parent.clientTop;
  });
  return new Point(left, top);
}


export function parentTree(element: Element, lastClass: string = 'hpc-interaction-container', inclusive = false): Array<HTMLElement> {
  const result = new Array<HTMLElement>();
  if (!element) {
    return result;
  }
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

export function parentByClass(element: Element, className: string): Element {
  const parent = element.parentElement;
  if (parent == null) {
    return null;
  }
  if (parent.classList.contains(className)) {
    return parent;
  } else {
    return parentByClass(parent, className);
  }

}

export function moveElementTo(renderer: Renderer2, element: Element, position: Point): void {
  if (!element) { return; }
  renderer.setStyle(element, 'top', position.y + 'px');
  renderer.setStyle(element, 'left', position.x + 'px');
}

export function moveElementBy(renderer: Renderer2, element, delta: Point) {
  if (!element) { return; }
  const pos = elementPos(element);
  const top = pos.y + delta.y;
  const left = pos.x + delta.x;
  renderer.setStyle(element, 'top', top + 'px');
  renderer.setStyle(element, 'left', left + 'px');
}

export function sizeElementBy(renderer: Renderer2, element, delta: Point) {
  if (!element) { return; }
  const size = elementSize(element);
  const height = size.height + delta.y;
  const width = size.width + delta.x;
  renderer.setStyle(element, 'height', height + 'px');
  renderer.setStyle(element, 'width', width + 'px');
}

export function assignBoundingRect(renderer: Renderer2, source: Element, target: Element) {
  const sourceRect = elementBounds(source);
  // const styles = getComputedStyle(source);
  const top = sourceRect.top; // + pixToNum(styles.marginTop);
  const left = sourceRect.left; // + pixToNum(styles.marginLeft);
  renderer.setStyle(target, 'top', top + 'px');
  renderer.setStyle(target, 'left', left + 'px');
  renderer.setStyle(target, 'height', sourceRect.height + 'px');
  renderer.setStyle(target, 'width', sourceRect.width + 'px');
}

export function assignPosition(renderer: Renderer2, source: Element, target: Element) {
  const sourceRect = elementBounds(source);
  const pos = elementPos(source);
  renderer.setStyle(target, 'top', pos.y + 'px');
  renderer.setStyle(target, 'left', pos.x + 'px');
}

export function setElementRect(renderer: Renderer2, rect: Rect, element: Element) {
  renderer.setStyle(element, 'top', rect.top + 'px');
  renderer.setStyle(element, 'left', rect.left + 'px');
  renderer.setStyle(element, 'height', rect.height + 'px');
  renderer.setStyle(element, 'width', rect.width + 'px');
}

export function childrenOf(parent: Element, deep = false, exclude = []): Element[] {
  let result = [];
  if (parent) {
    if (deep) {
      result = Array.from(parent.querySelectorAll('*'));
    } else {
      result = Array.from(parent.children);
    }
    defaultExcludeFromChildren(result);
    result = result.filter(x => !(x in exclude));
  }
  return result;
}

export function pointInRect(point: Point, rect: Rect): boolean {
  return point.x >= rect.left && point.x <= rect.right && point.y >= rect.top && point.y <= rect.bottom;
}

/**
* Returns the first child element of the parent element at a given point.
* If there are no child elements at the given point, then the parent element is returned.
*/
export function elementAtPoint(pos: Point, parent: Element, exclude = []): Element {
    let result = parent;
    const children = childrenOf(parent, false, exclude);
    for (let index = 0; index < children.length; index++) {
      const child = children[index];
      const elRect = child.getBoundingClientRect();
      const rect = new Rect(elRect.left, elRect.top, elRect.width, elRect.height);
      if (exclude.indexOf(child) === -1 && pointInRect(pos, rect)) {
        result = elementAtPoint(pos, child, exclude);
        break;
       }
    }
    return result;
}

export function xelementAtPoint(pos: Point, parent: Element, exclude = []): Element {
  let result = parent;
  const children = childElements(parent);
  for (let index = 0; index < children.length; index++) {
    const child = children[index];
    const elRect = child.getBoundingClientRect();
    const rect = new Rect(elRect.left, elRect.top, elRect.width, elRect.height);
    if (exclude.indexOf(child) === -1 && pointInRect(pos, rect)) {
      result = child;
      break;
    }
  }
  return result;
}

export function changeParent(element: Element, newParent: Element, renderer: Renderer2) {
  if (!newParent || element.parentElement === newParent) {
    return;
  }
  const parentPos = elementPagePos(newParent);
  const elPos = elementPagePos(element);
  const newPos = new Point(elPos.x - parentPos.x, elPos.y - parentPos.y);
  renderer.appendChild(newParent, element);
  moveElementTo(renderer, element, newPos);
}

export function getScaledPos(element: Element, scale: number): Point {
    const pos = offset(element);
    return new Point(
      pos.x / scale,
      pos.y / scale
    );
}

export function getRelativePointerPos(e: PointerEvent, element: HTMLElement, scale = 1) {
  const relativePos = offset(element);
  return new Point(
    (e.pageX - relativePos.x) / scale,
    (e.pageY - relativePos.y) / scale
  );
}

export function elementDraggable(element: Element) {
  return !elementLocked(element) && element.className.indexOf('hpc-no-drag') === -1;
}

export function elementSizable(element: Element) {
  return !elementLocked(element) && element.className.indexOf('hpc-no-size') === -1;
}

export function elementLocked(element: Element): boolean {
  return element.className.indexOf('hpc-locked') > -1;
}

export function isContainer(element: Element): boolean {
  return element.classList.contains('hpc-container');
}

export function isComposite(element: Element): boolean {
  return element.classList.contains('hpc-composite');
}

export function compositeParent(element: Element): Element {
  return parentByClass(element, 'hpc-composite');
}

export function isSelectable(element: Element): boolean {
  return !element.classList.contains('hpc-no-select')
   && (element.parentElement && element.parentElement.classList.contains('hpc-interaction-host') ||
    element.parentElement && element.parentElement.classList.contains('hpc-container')) ;
}

