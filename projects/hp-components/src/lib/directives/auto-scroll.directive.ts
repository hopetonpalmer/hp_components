import { Directive, ElementRef, Renderer2, AfterViewChecked, Input } from '@angular/core';
import { ResizeObserver } from 'resize-observer';
import * as dom from '../scripts/dom';

@Directive({
  selector: '[hpcAutoScroll]'
})
export class AutoScrollDirective implements AfterViewChecked {
  private _active = false;

  @Input()
  target: string;

  @Input()
  offsetX = 0;

  @Input()
  offsetY = 0;

  constructor(private _hostEl: ElementRef, private _renderer: Renderer2) {}
  ngAfterViewChecked(): void {
    if (!this._active) {
      this.updateScrollable();
    }
  }

  updateScrollable() {
    let isUpdating = false;
    const hostEl = this._hostEl.nativeElement as HTMLElement;
    const parentEl = hostEl && hostEl.parentElement;
    if (!parentEl) {
      this._active = false;
      return;
    }
    this._active = true;
    const targetEl = (this.target ? hostEl.querySelector(this.target) : hostEl) as HTMLElement;

    this._renderer.setStyle(targetEl, 'overflow', 'auto');
    const setAbosluteSize = () => {
      if (!isUpdating) {
        isUpdating = true;
        this._renderer.setStyle(targetEl, 'max-height', parentEl.offsetHeight - this.offsetY + 'px');
        this._renderer.setStyle(targetEl, 'max-width', parentEl.offsetWidth - this.offsetX + 'px');
        isUpdating = false;
      }
    };
    setAbosluteSize();
    this._active = false;

/*     if (targetEl) {
      setAbosluteSize();
      const ro = new ResizeObserver(() => {
        setAbosluteSize();
      });
      ro.observe(parentEl);
    } */

  }
}
