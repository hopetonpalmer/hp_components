import { Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[hpWidget]'
})
export class WidgetDirective {

  @HostBinding()
  rootElement = this.elRef.nativeElement as HTMLElement;

  constructor(private elRef: ElementRef) { }
}
