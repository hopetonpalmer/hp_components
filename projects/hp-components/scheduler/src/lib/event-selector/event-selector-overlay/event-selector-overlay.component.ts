import { Component, OnInit, ElementRef, ComponentFactoryResolver,
   Injector, ApplicationRef, OnDestroy, HostBinding } from '@angular/core';
import { PortalHost, DomPortalHost, ComponentPortal } from '@angular/cdk/portal';
import { EventItem } from '../../event-item/event-item';
import { Orientation, Point, IRect } from '@hp-components/common';
import { EventSelectorComponent } from '../event-selector.component';
import { EventSelectorService } from '../event-selector-service';




@Component({
  selector: 'hp-event-selector-overlay',
  template: '',
  styles: [`
      :host {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        pointerEvents: all;
      }
  `],
  providers: []
})
export class EventSelectorOverlayComponent implements OnInit, OnDestroy {

  private _selectorPortalHost: PortalHost;
  private _startPos = new Point();
  private _currentPos = new Point();

  orientation: Orientation;
  isActive = true;

  get hostElement(): HTMLElement {
    return this.elRef.nativeElement as HTMLElement;
  }

  private _pointerId: number;
  get pointerId(): number {
    return this._pointerId;
  }

  set pointerId(value: number) {
      this._pointerId = value;
      //this.hostElement.setPointerCapture(value);
  }

  @HostBinding('style.pointer-events')
  get PointerEvents(): string {
   if (this.isActive) {
      return 'auto';
    }
    return 'none';
  }

  constructor(
    private eventSelectorService: EventSelectorService,
    private elRef: ElementRef,
    private cfr: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
    ) { console.log('manager!'); }

  ngOnInit() {
     this.eventSelectorService.notify$.subscribe(event => {
       switch (event.type) {
         case 'active':
           this.isActive = event.data;
           break;
         default:
           break;
       }
    });
  }


  setEventSelector(eventItem: EventItem,
      eventElement: HTMLElement,
      borderRadius: string,
      parentRect: IRect,
      moreBefore: boolean,
      moreAfter: boolean) {
    const el = eventElement;
    const eventRect = el.getBoundingClientRect();
    this._selectorPortalHost = new DomPortalHost(this.elRef.nativeElement, this.cfr, this.appRef, this.injector);
    const portal = new ComponentPortal(EventSelectorComponent);
    const componentRef = this._selectorPortalHost.attach(portal);
    componentRef.instance.eventItem = eventItem;
    componentRef.instance.eventRect = eventRect;
    componentRef.instance.orientation = this.orientation;
    componentRef.instance.parentWidth = parentRect ? parentRect.width - 5 : eventRect.width;
    componentRef.instance.parentLeft = parentRect ?  parentRect.left : eventRect.left;
    componentRef.instance.borderRadius = borderRadius;
    componentRef.instance.moreBefore = moreBefore;
    componentRef.instance.moreAfter = moreAfter;
  }


  ngOnDestroy(): void {
    // this.hostElement.releasePointerCapture(this.pointerId);
    this.eventSelectorService.setActive(false);
    this._selectorPortalHost.detach();
    console.log('manager destroyed!');
  }

}
