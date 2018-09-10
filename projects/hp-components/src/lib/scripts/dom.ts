import {Point, Rect, Size} from './math';
import {Renderer2} from '@angular/core';

export function offset2(el: HTMLElement): Point {
   const result = new Point(el.offsetLeft, el.offsetTop);
   if (el.parentElement) {
     result.add(offset(el.parentElement));
   }
   return result;
}

export function offset(el: HTMLElement): Point {
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

export function childElements(element: HTMLElement, orderByZOrder = false): HTMLElement[] {
  const result = new Array<HTMLElement>();
  if (!element) {
    return result;
  }
  const children = element.children;
  for (let i = 0; i < children.length; i++) {
    const child = children[i] as HTMLElement;
    if (child && child.parentElement === element &&
      child.className.indexOf('lasso-selector') === -1 &&
      child.className.indexOf('element-selector') === -1 &&
      child.className.indexOf('grip') === -1) {
      result.push(child);
    }
  }

  if (orderByZOrder) {
    // result = Enumerable.from(result).orderBy(x => parseInt(x.style.zIndex, NaN)).toArray();
  }
  return result;
}

export function removeHelperChildren(children: HTMLElement[]) {
  for (let i = children.length - 1; i >= 0; i--) {
    const child = children[i] as HTMLElement;
    if (child.className.indexOf('lasso-selector') > -1 ||
      child.className.indexOf('element-selector') > -1 ||
      child.className.indexOf('drag-overlay') > -1 ||
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

export function elementPos(element: HTMLElement): Point {
  const computedStyles = getComputedStyle(element, null);
  return new Point(pixToNum(computedStyles.left), pixToNum(computedStyles.top));
}

export function elementSize(element: HTMLElement): Size {
  const computedStyles = getComputedStyle(element, null);
  return new Size(pixToNum(computedStyles.height), pixToNum(computedStyles.width));
}

export function elementBounds(element: HTMLElement, relativeToPage: boolean = false, scale: Point = null): Rect {
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

export function elementPagePos(element: HTMLElement): Point {
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


export function parentTree(element: HTMLElement, lastClass: string = 'surface', inclusive = false): Array<HTMLElement> {
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

export function moveElementTo(renderer: Renderer2, element: HTMLElement, position: Point): void {
  if (!element) {
    return;
  }
  renderer.setStyle(element, 'top', position.y + 'px');
  renderer.setStyle(element, 'left', position.x + 'px');
}

export function moveElementBy(renderer: Renderer2, element, delta: Point) {
  const pos = elementPos(element);
  const top = pos.y + delta.y;
  const left = pos.x + delta.x;
  renderer.setStyle(element, 'top', top + 'px');
  renderer.setStyle(element, 'left', left + 'px');
}

export function sizeElementBy(renderer: Renderer2, element, delta: Point) {
  const size = elementSize(element);
  const height = size.height + delta.y;
  const width = size.width + delta.x;
  renderer.setStyle(element, 'height', height + 'px');
  renderer.setStyle(element, 'width', width + 'px');
}

export function assignBoundingRect(renderer: Renderer2, source: HTMLElement, target: HTMLElement) {
  const sourceRect = elementBounds(source);
  // const styles = getComputedStyle(source);
  const top = sourceRect.top; // + pixToNum(styles.marginTop);
  const left = sourceRect.left; // + pixToNum(styles.marginLeft);
  renderer.setStyle(target, 'top', top + 'px');
  renderer.setStyle(target, 'left', left + 'px');
  renderer.setStyle(target, 'height', sourceRect.height + 'px');
  renderer.setStyle(target, 'width', sourceRect.width + 'px');
}

export function assignPosition(renderer: Renderer2, source: HTMLElement, target: HTMLElement) {
  const sourceRect = elementBounds(source);
  const pos = elementPos(source);
  renderer.setStyle(target, 'top', pos.y + 'px');
  renderer.setStyle(target, 'left', pos.x + 'px');
}

export function setElementRect(renderer: Renderer2, rect: Rect, element: HTMLElement) {
  renderer.setStyle(element, 'top', rect.top + 'px');
  renderer.setStyle(element, 'left', rect.left + 'px');
  renderer.setStyle(element, 'height', rect.height + 'px');
  renderer.setStyle(element, 'width', rect.width + 'px');
}

export function childrenOf(parent: HTMLElement, deep = false, exclude = []): HTMLElement[] {
  let result = [];
  if (deep) {
    result = Array.from(parent.querySelectorAll('*'));
  } else {
    result = Array.from(parent.children);
  }
  removeHelperChildren(result);
  result = result.filter(x => !(x in exclude));
  return result;
}

export function pointInRect(point: Point, rect: Rect): boolean {
  return point.x >= rect.left && point.x <= rect.right && point.y >= rect.top && point.y <= rect.bottom;
}

/**
* Returns the first child element of the parent element at a given point.
* If there are no child elements at the given point, then the parent element is returned.
*/
export function elementAtPoint(pos: Point, parent: HTMLElement, exclude = []): HTMLElement {
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

export function xelementAtPoint(pos: Point, parent: HTMLElement, exclude = []): HTMLElement {
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

export function elementDraggable(element: Element) {
  return !elementLocked(element) && element.className.indexOf('no-drag') === -1;
}

export function elementSizable(element: Element) {
  return !elementLocked(element) && element.className.indexOf('no-size') === -1;
}

export function elementLocked(element: Element): boolean {
  return element.className.indexOf('is-locked') > -1;
}

