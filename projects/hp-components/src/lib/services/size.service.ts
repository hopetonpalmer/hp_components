import { Injectable, Renderer2 } from '@angular/core';
import * as dom from '../scripts/dom';
import { Point, Rect } from '../scripts/math';

@Injectable()
export class SizeService {

  get isHorizontalSizing(): boolean { return this.gripKey === 'lm' || this.gripKey === 'rm'; }

  get isVerticalSizing(): boolean { return this.gripKey === 'tm' || this.gripKey === 'bm'; }

  get isSizingFromTop(): boolean {
    return this.gripKey === 'tl' || this.gripKey === 'tm' || this.gripKey === 'tr';
  }
  get isSizingFromLeft(): boolean {
    return this.gripKey === 'tl' || this.gripKey === 'lm' || this.gripKey === 'bl';
  }
  get isRotating(): boolean {
    return this.gripKey === 'rotate';
  }

  get orientation(): string {
    return this.gripKey.substr(0, 1);
  }

  get reverseOrientation(): string {
    const o = this.orientation;
    return this.orientations.find(x => x.includes(o)).replace(o, '');
  }

  minHeight = 40;
  minWidth = 40;

  cursor: string;
  gripKey: string;
  constructor() { }

  orientations = ['tb', 'rl'];

  removeSizingGrips(parent: HTMLElement, renderer: Renderer2) {
    Array.from(parent.children).forEach(child => {
      if (child.className.indexOf('grip-container') > -1) {
        renderer.removeChild(parent, child);
      }
    });
  }

  createSizingOverlay(element: HTMLElement, renderer: Renderer2): HTMLElement {
    const result = element.cloneNode(false) as HTMLElement;
    renderer.addClass(result, 'size-overlay');
    renderer.setStyle(result, 'border-style', 'solid');
    renderer.setStyle(result, 'cursor', 'inherit');
    return result;
  }

  sizeElementsBy(delta: Point, elements: HTMLElement[], renderer: Renderer2) {
    elements.forEach(element => {
      this.sizeElementBy(delta, renderer, element);
    });
  }

  sizeElementBy(delta: Point, renderer: Renderer2, element: HTMLElement) {
    const currentBounds = dom.elementBounds(element);
    let height = currentBounds.height + delta.y;
    let width = currentBounds.width + delta.x;
    let left = currentBounds.left;
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


    let boundsRect = new Rect(left, top, width, height);
    if (width < this.minWidth || height < this.minHeight) {
      boundsRect = currentBounds;
    }
    dom.setElementRect(renderer, boundsRect, element);
  }

  prepareToSize() {

  }

  canSize(element: Element): boolean {
    return dom.elementSizable(element);
  }

  addSizingGrips(parentEl: HTMLElement, renderer: Renderer2): void {
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

}
