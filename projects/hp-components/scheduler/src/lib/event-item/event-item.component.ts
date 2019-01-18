import { Component, OnInit, Input, TemplateRef, HostBinding,
  ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, HostListener } from '@angular/core';
import { EventItem } from './event-item';
import { IRect, Orientation, adjustColor } from '@hp-components/common-src';
import { TimeSlotService } from '../time-slot/time-slot.service';
import { shortTime, formatDateTime } from '../scripts/datetime';
import { DateRange } from '../types';
import { TinyColor } from '@ctrl/tinycolor';
import { SchedulerEventService } from '../services/scheduler-event.service';



@Component({
  selector: 'hp-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventItemComponent implements OnInit {
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
    return this._tss.isSelecting ? 'none' : 'all';
  }

  @HostBinding('style.visibility')
  get visibility() {
    return this.eventRect.width > 0 && this.eventRect.height > 0
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
    return this._ses.isEventSelected(this.eventItem);
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
    return this.eventItem.color;
  }

  @HostBinding('style.color')
  get fontColor() {
    const color = new TinyColor(this.eventItem.color);
    if (color.isDark()) {
      return new TinyColor(this.eventItem.color).lighten(50);
    } else {
      return new TinyColor(this.eventItem.color).darken(60);
    }
  }

  @HostBinding('style.border-color')
  get borderColor() {
    if (this.isHovered || this.isSelected) {
      return '';
    }
    return new TinyColor(this.eventItem.color).darken(30);
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
    this._cdRef.markForCheck();
  }

  get eventRect(): IRect {
    return this._eventRect;
  }

  @Input()
  icon: string;

  @Input()
  orientation: Orientation = 'horizontal';

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

  displayStart: Date;
  displayEnd: Date;
  isHovered = false;

  constructor(
    private _elRef: ElementRef,
    private _cdRef: ChangeDetectorRef,
    private _ses: SchedulerEventService,
    private _tss: TimeSlotService
  ) {}

  @HostListener('mousedown')
  onMouseDown() {
    this._ses.selectEventItem(this.eventItem);
  }

  @HostListener('dblclick')
  onDblClick() {
    this._ses.editEventItem(this.eventItem);
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.isHovered = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isHovered = false;
  }

  ngOnInit() {}

  getShortTime(date: Date): string {
    return formatDateTime(date, 'EE MMM d, ') + shortTime(date);
  }
}
