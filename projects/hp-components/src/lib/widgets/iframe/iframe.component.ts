import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { WidgetBaseComponent } from '../widget';
import { InjectorRef } from '../../scripts/lib-injector';


@Component({
  selector: 'hpc-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.css']
})
export class IframeComponent extends WidgetBaseComponent
  implements OnInit, AfterViewInit {
  get contentHeight() {
    return this._contentHeight;
  }
  set contentHeight(value: string) {
    this._contentHeight = value;
    this.setIframeHeight(value);
  }
  get contentWidth() {
    return this._contentWidth;
  }
  set contentWidth(value: string) {
    this._contentWidth = value;
    this.setIframeWidth(value);
  }
  get scrollable(): boolean {
    return this._scrollable;
  }

  set scrollable(value: boolean) {
    this._scrollable = value;
    if (!this.iframe) {
      this.setIframeScrolling();
    }
  }
  get wmode(): string {
    return this._wmode;
  }

  get contentWindow(): Window {
    const iframe = this.iframe;
    if (iframe) {
      return iframe.contentWindow;
    }
    return null;
  }
  get queryString(): string {
    return this._queryString;
  }

  set queryString(value: string) {
    if (!this.externalProps || (!value && this.externalProps.length > 0)) {
      return;
    }
    if (value !== this._queryString) {
      this._queryString = value;
      this.setIframeSource();
    }
  }
  get source(): string {
    return this._source;
  }
  set source(value: string) {
    if (value && value !== this._source) {
      this._source = value;
      this.setIframeSource();
    }
  }

  constructor(elRef: ElementRef) {
    super(elRef);
  }
  isConfigurable: boolean;

  private _contentHeight: string;

  private _contentWidth: string;

  private _scrollable: boolean;
  private _wmode = 'transparent';

  private _queryString: string;

  private _source = 'http://cmsfdxdev.s3.amazonaws.com/fdx/assets/apps/corp-comm/Company%20News/index.html';

  @ViewChild('iframe')
  private _iframe: ElementRef;

  get iframe(): HTMLIFrameElement {
    return this._iframe.nativeElement as HTMLIFrameElement;
  }

  protected setIframeSource() {
    if (this.iframe != null && this.source) {
      let source = this.source + '?' + new Date().getMilliseconds();
      if (this.queryString) {
        source = source + `&${this.queryString}`;
      }
      this.iframe.src = source;
    }
  }

  protected setIframeHeight(value: string) {
    if (this.iframe) {
      this.iframe.style.height = value;
    }
  }

  protected setIframeWidth(value: string) {
    if (this.iframe) {
      this.iframe.style.width = value;
    }
  }

  protected setIframeScrolling() {
    if (this.iframe) {
      this.iframe.scrolling = this.scrollable ? 'yes' : 'no';
    }
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.setIframeSource();
    this.setIframeHeight(this.contentHeight);
    this.setIframeWidth(this.contentWidth);
    if (this.isDesignMode) {
      this.setOverlay();
    }
  }
}
