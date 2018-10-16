import { Inspectable, Inspect } from '../decorator';
import { ElementRef, Component } from '@angular/core';
import { InjectorRef } from '../scripts/lib-injector';

export interface IWidget {
  widgetName: string;
  isDesignMode: boolean;
  rootElement: HTMLElement;
  externalProps: any[];
}

@Inspectable()
@Component({
  selector: 'hpc-widget',
  styleUrls: ['./widget.css']
})
export abstract class WidgetBaseComponent implements IWidget {

  @Inspect()
  widgetName: string;

  isDesignMode: boolean;

  externalProps: any[];

  get rootElement(): HTMLElement {
     return this.elRef.nativeElement as HTMLElement;
  }

  setOverlay(): void {
    const overlay = document.createElement('div');
    overlay.classList.add('hpc-no-selct');
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.opacity = '0';
    overlay.style.height = '100%';
    overlay.style.width = '100%';
    this.rootElement.appendChild(overlay);
  }

  constructor(protected elRef: ElementRef) {
    this.isDesignMode = true;
  }

}
