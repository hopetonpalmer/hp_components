import { Injectable, Renderer2 } from '@angular/core';
import { Point } from '../scripts/math';
import * as dom from '../scripts/dom';

@Injectable()
export class DragService  {
  dragCursor = 'move';
  constructor() {}

  createDragOverlay(element: HTMLElement, renderer: Renderer2): HTMLElement {
    const result = element.cloneNode(true) as HTMLElement;
    renderer.addClass(result, 'drag-overlay');
    renderer.setStyle(result, 'cursor', this.dragCursor);
    renderer.setStyle(result, 'zIndex', 10000);
    return result;
  }

  dragElementsBy(delta: Point, elements: HTMLElement[], renderer: Renderer2) {
    elements.forEach(element => {
      dom.moveElementBy(renderer, element, delta);
    });
  }

  canDrag(element: Element): boolean {
    return dom.elementDraggable(element);
  }

  /**
   * Returns a child HTMLElement located at the top-left coordinates of the
   * draggedElement with an attribute of is-dropzone set to true.
   *
   * @param HTMLElement draggedElement
   * @param HTMLElement parent
   * @returns HTMLElement
   */
  findDropZone(draggedElement: HTMLElement, parent: HTMLElement, exclude = []): HTMLElement {
    if (!draggedElement) {
      return null;
    }
    exclude.push(draggedElement);
    const pos = dom.offset(draggedElement);
    const el = dom.elementAtPoint(pos, parent, exclude);
    if (el !== parent && el.getAttribute('is-dropzone')) {
      return el;
    }
    return null;
  }

  updateDropZone(draggedElement: HTMLElement, parent: HTMLElement, renderer: Renderer2, exclude = []) {
    this.clearDropZones(parent, renderer);
    const dropZone = this.findDropZone(draggedElement, parent, exclude);
    if (dropZone) {
      renderer.addClass(dropZone, 'dropzone');
    }
  }

  clearDropZones(parent: HTMLElement, renderer: Renderer2) {
    const children = dom.childrenOf(parent, true);
    children.forEach(child => {
      renderer.removeClass(child, 'dropzone');
    });
  }
}
