import { Component, OnInit, ElementRef, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IframeComponent } from '../iframe/iframe.component';
import { inspect } from 'util';
import { Inspect } from '../../decorator';

@Component({
  selector: 'hpc-web-app',
  template: `<iframe hpc-segment class="hpc-fill-parent" #iframe></iframe>`,
  styles: ['iframe {border: 0; }']
})
export class WebAppComponent extends IframeComponent
  implements OnInit, AfterViewChecked {
  get appSource(): string {
    return this.source;
  }

  constructor(
    elRef: ElementRef,
    private cdRef: ChangeDetectorRef,
    private http: HttpClient
  ) {
    super(elRef);
  }

  protected doSetSource(value) {
    if (this.externalProps) {
      this.updateQueryString();
    } else {
      this.updateAppSource(value);
    }
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewChecked(): void {}

  updateAppSource(value: string): Promise<void> {
    const promise = new Promise<void>((resolve, reject) => {
      const url = this.configureSourceUrl(value);
      this.http
        .get(url + '/config.json')
        .toPromise()
        .then(config => {
          this.isConfigurable = true;
          this.addExternalProps(config['props']);
          this.updateQueryString();
          resolve();
        })
        .catch(error => {
          this.isConfigurable = false;
          this.externalProps = null;
          this.source = value;
          reject(error);
        });
    });
    return promise;
  }

  protected addExternalProps(props: any[]) {
    this.externalProps = props;
    if (props) {
      props.forEach(prop => {
        // WebAppComponent.prototype[prop.name] = '';
        this[prop.name] = prop.value;
      });
    }
  }

  protected updateQueryString() {
    if (this.externalProps && this.externalProps.length > 0) {
      this.queryString = `props=${JSON.stringify(this.externalProps)}`;
    } else {
      this.queryString = '';
    }
  }

  protected configureSourceUrl(source: string): string {
    return encodeURI(decodeURI(source.replace('/index.html', '')));
  }

  invalidate() {
    this.updateQueryString();
  }
}
