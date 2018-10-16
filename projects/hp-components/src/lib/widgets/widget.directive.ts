import { Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[hpcWidget]'
})
export class WidgetDirective {

  @HostBinding()
  rootElement = this.elRef.nativeElement as HTMLElement;

  constructor(private elRef: ElementRef) { }
}
