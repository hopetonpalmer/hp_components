import { Injectable, Renderer2, OnDestroy } from '@angular/core';
import { Point } from '../scripts/math';
import * as dom from '../scripts/dom';

@Injectable({
  providedIn: 'root'
})
export class DragService implements OnDestroy {
  dragCursor = 'move';
  renderer: Renderer2;

  constructor() {}

  createDragOverlay(element: HTMLElement): HTMLElement {
    const result = element.cloneNode(!dom.hasVideo(element)) as HTMLElement;
    this.renderer.addClass(result, 'hpc-drag-overlay');
    // this.renderer.setStyle(result, 'top', result.offsetTop + 'px');
    // this.renderer.setStyle(result, 'left', result.offsetLeft + 'px');

    this.renderer.setStyle(result, 'position', 'absolute');
    this.renderer.setStyle(result, 'cursor', this.dragCursor);
    this.renderer.setStyle(result, 'zIndex', 10000);
    dom.pauseVideos(result);
    return result;
  }

  dragElementsBy(delta: Point, elements: Element[]) {
    elements.forEach(element => {
      if (element) {
        dom.moveElementBy(this.renderer, element, delta);
      }
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
  findDropZone(
    draggedElement: Element,
    parent: Element,
    exclude = []
  ): Element {
    if (!draggedElement) {
      return null;
    }
    exclude.push(draggedElement);
    const pos = dom.offset(draggedElement);
    const el = dom.elementAtPoint(pos, parent, exclude);
    if (el !== parent && el.classList.contains('hpc-dropzone')) {
      return el;
    }
    return null;
  }

  updateDropZone(
    draggedElement: Element,
    interactionHost: Element,
    exclude = [],
    lastDropZone: Element = null
  ): Element {
    const dropZone = this.findDropZone(
      draggedElement,
      interactionHost,
      exclude
    );
    if (
      lastDropZone === dropZone ||
      dropZone === draggedElement.parentElement
    ) {
      return dropZone;
    }
    this.clearDropZones(interactionHost);
    if (dropZone) {
      this.renderer.addClass(dropZone, 'active');
    }
    return dropZone;
  }

  clearDropZones(parent: Element) {
    const children = dom.childrenOf(parent, true);
    children.forEach(child => {
      this.renderer.removeClass(child, 'active');
    });
  }

  dropElement(
    dropZone: Element,
    draggedElement: Element,
    defaultDropZone: Element
  ) {
    try {
      dropZone = dropZone ? dropZone : defaultDropZone;
      if (dropZone !== draggedElement.parentElement) {
        dom.changeParent(draggedElement, dropZone, this.renderer);
      }
    } catch (error) {
      console.log(error);
      // -- todo log error;
    }
  }

  ngOnDestroy(): void {
    this.renderer = null;
  }
}
