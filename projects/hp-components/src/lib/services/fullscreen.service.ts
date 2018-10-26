import { Injectable, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { requestFullScreen } from '../scripts/dom';

@Injectable()
export class FullscreenService implements OnDestroy {
  private _fullScreenEventName: string | undefined;
  private _fullScreenListener: () => void;

  constructor(@Inject(DOCUMENT) private _document: any) {}

  goFullscreen(fullscreenElement: HTMLElement, fullScreenChange: () => void) {
    requestFullScreen(fullscreenElement);
    this._addFullscreenChangeListener(fullScreenChange);
  }

  private _addFullscreenChangeListener(fn: () => void) {
    const eventName = this._getEventName();

    if (eventName) {
      if (this._fullScreenListener) {
        this._document.removeEventListener(eventName, this._fullScreenListener);
      }

      this._document.addEventListener(eventName, fn);
      this._fullScreenListener = fn;
    }
  }

  private _getEventName(): string | undefined {
    if (!this._fullScreenEventName) {
      if (this._document.fullscreenEnabled) {
        this._fullScreenEventName = 'fullscreenchange';
      } else if (this._document.webkitFullscreenEnabled) {
        this._fullScreenEventName = 'webkitfullscreenchange';
      } else if ((this._document as any).mozFullScreenEnabled) {
        this._fullScreenEventName = 'mozfullscreenchange';
      } else if ((this._document as any).msFullscreenEnabled) {
        this._fullScreenEventName = 'MSFullscreenChange';
      }
    }

    return this._fullScreenEventName;
  }

  getFullscreenElement(): Element {
    return this._document.fullscreenElement ||
      this._document.webkitFullscreenElement ||
      (this._document as any).mozFullScreenElement ||
      (this._document as any).msFullscreenElement ||
      null;
  }

  ngOnDestroy() {
    if (this._fullScreenEventName && this._fullScreenListener) {
      this._document.removeEventListener(
        this._fullScreenEventName,
        this._fullScreenListener
      );
    }
  }
}
