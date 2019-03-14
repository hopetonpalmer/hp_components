import { Component, OnInit, Input, TemplateRef, HostBinding,
  ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, HostListener,
   OnDestroy, ComponentFactoryResolver, Injector, ApplicationRef, ComponentRef } from '@angular/core';
import { EventItem } from './event-item';
import { IRect, Orientation, getStyleValue, Point, pointInRect, Rect } from '@hp-components/common';
import { TimeSlotService } from '../time-slot/time-slot.service';
import { shortTime, formatDateTime } from '../scripts/datetime';
import { TinyColor } from '@ctrl/tinycolor';
import { SchedulerEventService } from '../services/scheduler-event.service';
import { ColorScheme } from '../color-scheme/color-scheme';
import { Subscription } from 'rxjs';
import { DomPortalHost, ComponentPortal, PortalHost } from '@angular/cdk/portal';
import { EventSelectorComponent } from '../event-selector/event-selector.component';
import { DragService } from '../draggable/drag.service';
import { Overlay } from '@angular/cdk/overlay';
import { EventSelectorManagerComponent } from '../event-selector/event-selector-manager/event-selector-manager.component';





@Component({
  selector: 'hp-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventItemComponent implements OnInit, OnDestroy {
  private _eventSelectionSubscription: Subscription;
  private _dragCancelSubscription: Subscription;
  private _isSelected = false;
  private _selectorPortalHost: PortalHost;

  mediaBreak = 150;

  @HostBinding('style.top.px')
  top: number;

  @HostBinding('style.left.px')
  left: number;

  @HostBinding('style.height.px')
  height: number;

  @HostBinding('style.width.px')
  width: number;

  @HostBinding('style.pointer-events')
  get pointerEvents() {
      return this.timeSlotService.isSelecting && !this.isSelected ? 'none' : 'all';
  }

  @HostBinding('style.visibility')
  // visibility = 'hidden';
  get visibility() {
    return this.eventRect.width && this.eventRect.height
      ? 'visible'
      : 'hidden';
  }

  @HostBinding('class.more-before')
  get moreBefore() {
    const result =
      this.displayStart && this.displayStart > this.eventItem.start;
    return result;
  }

  @HostBinding('class.more-after')
  get moreAfter() {
    const result = this.displayEnd && this.displayEnd < this.eventItem.end;
    return result;
  }

  @HostBinding('class.selected')
  get isSelected(): boolean {
    return this._isSelected;
  }

  @HostBinding('attr.title')
  get hint() {
    return (
      this.getShortTime(this.eventItem.start) +
      ' - ' +
      this.getShortTime(this.eventItem.end)
    );
  }

  @HostBinding('style.backgroundColor')
  get color() {
    if (this.eventItem.color) {
      return this.eventItem.color;
    }
    return this.colorScheme.eventColors.backColor;
  }

  @HostBinding('style.color')
  get fontColor() {
    const color = new TinyColor(this.color);
    if (color.isDark()) {
      return color.lighten(50);
    } else {
      return color.darken(60);
    }
  }

  @HostBinding('style.border-color')
  get borderColor() {
    if (this.isHovered || this.isSelected) {
      return '';
    }
    return new TinyColor(this.color).darken(30);
  }

  @Input()
  eventItem: EventItem;

  @Input()
  template: TemplateRef<any>;

  private _eventRect = { top: 0, left: 0, height: 0, width: 0 };
  set eventRect(value: IRect) {
    this._eventRect = value;
    this.left = value.left;
    this.top = value.top;
    this.height = value.height;
    this.width = value.width;
    this.cdRef.markForCheck();
    this.detachEventSelector();
  }

  get eventRect(): IRect {
    return this._eventRect;
  }

  get clientRect() {
    return (this.elRef.nativeElement as HTMLElement).getBoundingClientRect();
  }

  parentRect: IRect;

  @Input()
  icon: string;

  @Input()
  orientation: Orientation = 'horizontal';

  colorSchemeColor = '';

  get fromCaption() {
    if (this.width < this.mediaBreak) {
      return '';
    }
    if (this.moreBefore) {
      return 'From ' + formatDateTime(this.eventItem.start, 'MMM d');
    }
    if (!this.eventItem.isAllDay) {
      return shortTime(this.eventItem.start);
    }
  }

  get toCaption() {
    if (this.width < this.mediaBreak) {
      return '';
    }
    if (this.moreAfter) {
      return 'To ' + formatDateTime(this.eventItem.end, 'MMM d');
    }
    if (!this.eventItem.isAllDay) {
      return shortTime(this.eventItem.end);
    }
  }

  pointerId: number;
  displayStart: Date;
  displayEnd: Date;
  isHovered = false;

  constructor(
    private elRef: ElementRef,
    private cdRef: ChangeDetectorRef,
    private cfr: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
    private overlay: Overlay,
    private schedulerEventService: SchedulerEventService,
    private timeSlotService: TimeSlotService,
    private colorScheme: ColorScheme,
    private dragService: DragService
  ) {}


  @HostListener('dblclick')
  onDblClick() {
    this.schedulerEventService.editEventItem(this.eventItem);
  }

  @HostListener('pointerdown', ['$event'])
  onPointerDown(event: PointerEvent) {
    event.preventDefault();
    if (!this.isSelected) {
      this.isHovered = true;
      this.pointerId = event.pointerId;
      this.timeSlotService.clearSlotSelection();
      this.schedulerEventService.selectEventItem(this.eventItem);
    }
  }

  @HostListener('pointerleave')
  onPointerLeave() {
    this.isHovered = false;
  }

  getShortTime(date: Date): string {
    return formatDateTime(date, 'EE MMM d, ') + shortTime(date);
  }

  detachEventSelector() {
    if (this._selectorPortalHost) {
      this._selectorPortalHost.detach();
      // this._selectorPortalHost.dispose();
      // this._selectorPortalHost = null;
    }
  }

  setEventSelector(selected: boolean) {
    if (selected === this.isSelected) {
      return;
    }
    this.detachEventSelector();
    if (selected) {
      this.createSelector();
    }
  }

  private xcreateSelector() {
    const el = this.elRef.nativeElement as HTMLElement;
    const parent = el.parentElement;
    this._selectorPortalHost = new DomPortalHost(parent, this.cfr, this.appRef, this.injector);
    const portal = new ComponentPortal(EventSelectorComponent);
    const componentRef = this._selectorPortalHost.attach(portal);
    componentRef.instance.eventItem = this.eventItem;
    componentRef.instance.eventRect = this.eventRect;
    componentRef.instance.orientation = this.orientation;
    componentRef.instance.borderRadius = getStyleValue('border-radius', this.elRef.nativeElement);

  }

  private createSelector() {
    this._selectorPortalHost = new DomPortalHost(document.body, this.cfr, this.appRef, this.injector);
    const portal = new ComponentPortal(EventSelectorManagerComponent);
    const componentRef = this._selectorPortalHost.attach(portal);

    const borderRadius = getStyleValue('border-top-left-radius', this.elRef.nativeElement) + ' ' +
      getStyleValue('border-top-right-radius', this.elRef.nativeElement) + ' ' +
      getStyleValue('border-bottom-right-radius', this.elRef.nativeElement) + ' ' +
      getStyleValue('border-bottom-left-radius', this.elRef.nativeElement);

    componentRef.instance.pointerId = this.pointerId;
    componentRef.instance.orientation = this.orientation;
    componentRef.instance.setEventSelector(
      this.eventItem,
      this.elRef.nativeElement as HTMLElement,
      borderRadius,
      this.parentRect,
      this.moreBefore,
      this.moreAfter
      );
  }

  ngOnInit() {
    this._eventSelectionSubscription = this.schedulerEventService.selectedEvents$.subscribe(() => {
        const isSelected = this.schedulerEventService.isEventSelected(this.eventItem);
        this.setEventSelector(isSelected);
        this._isSelected = isSelected;
      }
    );
    this._dragCancelSubscription = this.dragService.dragCancel$.subscribe(() => {
       this.detachEventSelector();
    });
  }

  isMouseOver(event: PointerEvent): boolean {
    const mousePoint = new Point(event.pageX, event.pageY);
    const r = this.clientRect;
    const isInRect = pointInRect(mousePoint, new Rect(r.left, r.top, r.width, r.height));
    return isInRect;
  }

  ngOnDestroy(): void {
    this._eventSelectionSubscription.unsubscribe();
    this._dragCancelSubscription.unsubscribe();
    // this.detachEventSelector();
    // this._selectorPortalHost.dispose();
  }
}
