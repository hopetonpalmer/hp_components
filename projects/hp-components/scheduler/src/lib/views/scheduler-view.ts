import { SchedulerResource } from '../models/schedulerResource';
import { SchedulerService } from '../services/scheduler.service';
import { addHours,
   differenceInDays,
   subSeconds,
   startOfHour,
   differenceInCalendarYears,
   differenceInCalendarQuarters,
   closestTo, endOfYear,
   differenceInCalendarMonths,
   differenceInCalendarWeeks,
   endOfMonth,
   differenceInCalendarDays,
   addSeconds,
   endOfHour,
   differenceInHours,
   addMinutes,
   addDays,
   differenceInMinutes,
   isSameDay} from 'date-fns';
import { SchedulerViewType, MinuteInterval, IntervalType, DateRange } from '../types';
import { OnDestroy, OnInit, Input, Injectable, QueryList, ViewChildren,
  AfterViewInit, OnChanges, ContentChildren, AfterContentInit, ElementRef, ViewChild, TemplateRef, HostListener } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { TimeSlot } from '../time-slot/time-slot';
import { setTime, isMidnight, isBetween, formatDateTime, shortTime } from '../scripts/datetime';
import { SchedulerViewService } from './scheduler-view.service';
import { EventItem } from '../event-item/event-item';
import { SchedulerDateService } from '../services/scheduler-date.service';
import { logExecution } from '../scripts/debug';
import { TimeSlotService } from '../time-slot/time-slot.service';
import { EventItemComponent } from '../event-item/event-item.component';
import { EventCellDirective } from '../event-grid/event-cell/event-cell.directive';
import { SchedulerViewLayoutService } from './scheduler-view-layout.service';
import { IRect, Orientation, intersectRect, Point } from '@hp-components/common';
import { SchedulerEventService } from '../services/scheduler-event.service';
import { ResizeObserver } from 'resize-observer';
import { ColorSchemeService } from '../color-scheme/color-scheme.service';
import { DropEventItemArgs } from '../event-args';
import { pointInRect, Rect } from '@hp-components/common';



export interface ISchedulerView {
  viewType: SchedulerViewType;
  dateRange: DateRange;
  resources: SchedulerResource[];
  eventItems: EventItem[];
  connectDataSource();
  disconnectDataSource();
}

export interface ISizingGroup {
  maxSpread: number;
  eventItems: EventItem[];
}

export abstract class SchedulerView
  implements ISchedulerView, OnInit, OnChanges, AfterViewInit, OnDestroy {
  private _eventCompChangeSubscription: Subscription;
  private _resourcesSubscription: Subscription;
  private _eventsSubscription: Subscription;
  private _schedularDatesSubscription: Subscription;
  private _invalidateViewSubscription: Subscription;
  private _eventRescheduledSubscription: Subscription;
  private _beginSlotSelectionSubscription: Subscription;
  private _endSlotSelectionSubscription: Subscription;
  private _eventSelectionSubscription: Subscription;

  @ViewChildren(EventItemComponent) eventComps: QueryList<EventItemComponent>;
  @ViewChildren(EventCellDirective) eventCells: QueryList<EventCellDirective>;
  @ViewChild('event_grid') eventGrid: ElementRef;

  viewType: SchedulerViewType = 'Day';
  intervalTypes: IntervalType[];

  timeSlots = new Map<string, TimeSlot[]>();
  eventSlots: Array<TimeSlot[]> = new Array<TimeSlot[]>();

  private _isLayoutScheduled = false;
  private _resources: SchedulerResource[];
  set resources(value: SchedulerResource[]) {}
  get resources(): SchedulerResource[] {
    return this._resources;
  }

  private _eventItems = [];
  set eventItems(value: EventItem[]) {
    this._eventItems = value;
  }
  get eventItems(): EventItem[] {
    return this.getEventItemsByRange(this.dateRange).filter(x => !this.excludeEvent(x));
  }

  get dateRange(): DateRange {
    if (this.subDateRange) {
      return this.subDateRange;
    }
    return this.schedulerDateService.dateRange;
  }

  viewTimeSlots: TimeSlot[];

  private _dateFormats = {
    year: 'y',
    quater: '',
    month: 'MMMM y',
    week: 'EEEE, MMMM d, y',
    day: 'EEEE, MMMM d, y',
    hour: 'h a',
    minute: 'mm'
  };

  get masterIntervalType(): IntervalType {
    return this.intervalTypes[0];
  }


  // viewRect: ClientRect;
  get viewRect(): ClientRect {
    return (this.eventGrid.nativeElement as HTMLElement).getBoundingClientRect();
  }

  protected orientation: Orientation;
  protected isTimeInterval = false;

  @Input()
  isEmbedded = false;

  @Input()
  isFullDayEventsOnly = false;

  private _hasTimeSlotServiceProvider = false;
  @Input()
  set timeSlotServiceProvider (value: TimeSlotService) {
    this._hasTimeSlotServiceProvider = true;
    this.timeSlotService = value;
  }

  get timeSlotServiceProvider(): TimeSlotService {
    return this.timeSlotService;
  }

  @Input()
  eventSpacing = 3;

  @Input()
  headerVisible = true;

  @Input()
  headerTemplate: TemplateRef<any>;

  @Input()
  subDateRange: DateRange;

  @Input()
  minuteInterval: MinuteInterval = 30;

  @Input()
  eventHeight = 25;

  @Input()
  set dateFormats(value: {}) {
    this._dateFormats = Object.assign(this._dateFormats, value);
  }

  get dateFormats() {
    return this._dateFormats;
  }

  get dayCount() {
    return differenceInDays(this.dateRange.end, this.dateRange.start) + 1;
  }
  get hourSlotCount(): number {
    return 60 / this.minuteInterval;
  }

  protected lastCellInclusive = false;

  constructor(
    public schedulerService: SchedulerService,
    public schedulerViewService: SchedulerViewService,
    public schedulerDateService: SchedulerDateService,
    public schedulerEventService: SchedulerEventService,
    public timeSlotService: TimeSlotService,
    public colorSchemeService: ColorSchemeService,
    protected elRef: ElementRef
  ) {
    this.setViewDefaults();
  }

  formatDayName(date: Date, format: string): string {
    return this.formatDate(date, format);
  }
  protected setViewDefaults() {}
  protected setViewHeight(_rects: IRect[], margin: number) {}
  protected excludeEvent(_event: EventItem): boolean {
    return false;
  }
  protected setViewTimeSlots() {
    const result = this.timeSlots.get(this.intervalTypes[0]);
    this.viewTimeSlots = result;
  }

  hasInterval(intervalType: IntervalType): boolean {
    return this.intervalTypes.indexOf(intervalType) > -1;
  }

  formatDate(date: Date, format: string): string {
    return formatDateTime(date, format);
  }

  isMasterSlot(slot: TimeSlot): boolean {
    const result = slot.intervalType === this.masterIntervalType;
    return result;
  }

  connectDataSource() {
    this._resourcesSubscription = this.schedulerService.resources$.subscribe(
      resources => (this.resources = resources)
    );
    this._eventsSubscription = this.schedulerEventService.eventItems$.subscribe(
      events => (this.eventItems = events)
    );
  }

  disconnectDataSource() {
    if (this._resourcesSubscription) {
      this._resourcesSubscription.unsubscribe();
    }
    if (this._eventsSubscription) {
      this._eventsSubscription.unsubscribe();
    }
  }

  protected cellAtPos(point: Point): EventCellDirective {
    const cell = this.eventCells.find(x => pointInRect(point, this.getRect(x.cellRect)));
    return cell;
  }

  getRect(r: IRect): Rect {
      return new Rect(r.left, r.top, r.width, r.height);
  }

  protected cellOfDate(date: Date): EventCellDirective {
    if (!this.eventCells || !this.eventCells.length) {
      return null;
    }
    if (date < this.eventCells.first.timeSlot.startDate) {
      return this.eventCells.first;
    }
    if (date > this.eventCells.last.timeSlot.endDate) {
      return this.eventCells.last;
    }
    const cell = this.eventCells.find(x =>
      isBetween(x.timeSlot.startDate, addSeconds(x.timeSlot.endDate, 0), date)
    );
    if (cell) {
      return cell;
    }
  }

  protected rectOfEvent(item: EventItem): IRect {
    const indent = 1;
    let top = 0;
    let left = 0;
    let height = 0;
    let width = 0;
    let rect = { top: top, left: left, height: height, width: width };
    const startCell = this.cellOfDate(item.start);
    const endCell = this.cellOfDate(item.end);
    if (!startCell || !endCell) {
      return rect;
    }
    const startRect = startCell.cellRect;
    const endRect = endCell.cellRect;
    if (startRect && endRect) {
      const pixPerMinute =
        (this.orientation === 'vertical' ? startRect.height : startRect.width) /
        this.minuteInterval;
      let startMinutePixels = 0;
      let endMinutePixels = 0;
      const intervalType = startCell.intervalType;
      if (intervalType === 'Minute') {
        if (startCell !== this.eventCells.first) {
          startMinutePixels =
            differenceInMinutes(item.start, startCell.timeSlot.startDate) *
            pixPerMinute;
        }
        if (endCell !== this.eventCells.last) {
          endMinutePixels =
            differenceInMinutes(item.end, endCell.timeSlot.startDate) *
            pixPerMinute;
        }
      }
      const parentEl = this.eventGrid.nativeElement;
      const parentRect = this.viewRect;
      if (this.orientation === 'vertical') {
        top =
          startRect.top -
          parentRect.top +
          parentEl.scrollTop +
          startMinutePixels - 0.5;
        left = startRect.left - parentRect.left + parentEl.scrollLeft + indent;
        height =
          (item.end >= this.eventCells.last.timeSlot.endDate
            ? endRect.top + endRect.height
            : endRect.top) -
          startRect.top +
          endMinutePixels -
          startMinutePixels - 0.0;
        width = startRect.width;
      } else {
        top = startRect.top - parentRect.top + parentEl.scrollTop + indent;
        left =
          startRect.left -
          parentRect.left +
          parentEl.scrollLeft +
          startMinutePixels;
        height = this.eventHeight;
        width =
          (item.end >= this.eventCells.last.timeSlot.endDate
            ? endRect.left + endRect.width
            : endRect.left) - startRect.left;
        if (intervalType !== 'Minute' && width === 0) {
          width = startRect.width;
        }
        width = width + endMinutePixels - startMinutePixels;
      }
      rect = { top: top, left: left, width: width, height: height };
    }
    return rect;
  }

  protected positionRect(
    rect: IRect,
    rectIndex: number,
    rects: IRect[],
    margin: number
  ) {

    // -- nudge slightly so that events that start immediately
    // -- after a previous event do not visually overlap
    rect.height = rect.height - 0.01;
    rect.width = rect.width - 0.01;

    for (let i = 0; i < rectIndex; i++) {
      const nextRect = rects[i];
      if (nextRect.width === 0) {
        continue;
      }
      if (intersectRect(rect, nextRect)) {
        if (this.orientation === 'vertical') {
          rect.left = nextRect.left + nextRect.width + margin;
        } else {
          rect.top = nextRect.top + nextRect.height + margin;
        }
        this.positionRect(rect, rectIndex, rects, margin);
      }
    }
  }

  getEventItemsByRange(dateRange: DateRange): EventItem[] {
    if (!this._eventItems) {
      return [];
    }
    const result = this._eventItems
      .filter(
        x =>
          isBetween(dateRange.start, dateRange.end, x.start) ||
          isBetween(dateRange.start, dateRange.end, x.end) ||
          isBetween(x.start, x.end, dateRange.start) ||
          isBetween(x.start, x.end, dateRange.end)
      )
      .sort((a, b) => a.start.getTime() - b.start.getTime());
    return result;
  }

  getSlotCount(intervalType: IntervalType, startDate: Date): number {
    let endDate = this.dateRange.end;
    switch (intervalType) {
      case 'Year':
        return differenceInCalendarYears(endDate, startDate) + 1;
      case 'Quarter':
        return differenceInCalendarQuarters(endDate, startDate) + 1;
      case 'Month':
        if (this.masterIntervalType !== 'Month') {
          endDate = closestTo(endOfYear(startDate), [
            endDate,
            endOfYear(startDate)
          ]);
        }
        return differenceInCalendarMonths(endDate, startDate) + 1;
      case 'Week':
        return differenceInCalendarWeeks(endDate, startDate) + 1;
      case 'Day':
        if (this.masterIntervalType !== 'Day') {
          endDate = closestTo(endOfMonth(startDate), [
            endDate,
            endOfMonth(startDate)
          ]);
        }
        return differenceInCalendarDays(addSeconds(endDate, -1), startDate) + 1;
      case 'Hour':
        endDate = this.getEndDate(startDate);
        startDate = this.getStartDate(startDate);
        if (this.hasInterval('Minute')) {
          endDate = endOfHour(endDate);
        }

        let result = differenceInHours(endDate, startDate);

        // -- account for midnight (23:59)
        if (this.schedulerDateService.datesSettings.endHour === 24) {
           result = result + 1;
        }
        return result;
      case 'Minute':
        return this.hourSlotCount; // differenceInMinutes(endDate, startDate) / this.minuteInterval;
      default:
        return 1;
    }
  }

  /**
   * Creates TimeSlot objects and updates the timeSlots property of current view
   *
   * @param timeSlots array to populate
   * @param intervalType of the timeSlots to create
   * @param startDate of the timeSlots to create
   * @returns void
   */
  createTimeSlots(
    timeSlots: TimeSlot[] = [],
    intervalType = null,
    startDate: Date = null
  ) {
    if (!this.dateRange || !this.intervalTypes) {
      return;
    }
    if (this.timeSlots.entries.length > 0) {
      this.eventSlots = new Array<TimeSlot[]>();
    }
    if (!intervalType) {
      intervalType = this.intervalTypes[0];
    }
    if (!startDate) {
      startDate = this.dateRange.start;
    }
    const intervalIndex = this.intervalTypes.indexOf(intervalType);
    let date = this.hasInterval('Minute') ? startOfHour(startDate) : startDate;
    const maxSlotCount = this.getSlotCount(intervalType, date);
    for (let index = 0; index < maxSlotCount; index++) {
      if (intervalType === this.masterIntervalType) {
        this.eventSlots.push([]);
      }
      const endDate = this.schedulerService.incInterval(
        intervalType,
        date,
        this.minuteInterval
      );
      const slot = this.createTimeSlot(
        intervalType,
        date,
        subSeconds(endDate, 1)
      );
      timeSlots.push(slot);
      if (intervalType === this.intervalTypes[this.intervalTypes.length - 1]) {
        this.eventSlots[this.eventSlots.length - 1].push(slot);
      }
      if (intervalIndex + 1 < this.intervalTypes.length) {
        const nextIntervalType = this.intervalTypes[intervalIndex + 1];
        slot.timeSlots = [];
        const nextDate = this.getStartDate(date);
        if (intervalType === 'Hour') {
          nextDate.setHours(date.getHours());
        }
        this.createTimeSlots(slot.timeSlots, nextIntervalType, nextDate);
      }
      date = endDate;
    }
    if (intervalIndex === 0) {
      const slots = new Map<string, TimeSlot[]>();
      slots.set(intervalType, timeSlots);
      this.timeSlots = slots;
      this.setViewTimeSlots();
      this.slotsGenerated();
    }
  }

  /**
   * Creates and returns a new TimeSlot object
   *
   * @param intervalType of the new TimeSlot
   * @param start date of the new TimeSlot
   * @param end date of the new TimeSlot
   * @returns a new TimeSlot object
   */
  createTimeSlot(intervalType: IntervalType, start: Date, end: Date): TimeSlot {
    const slot = new TimeSlot();
    slot.startDate = start;
    slot.endDate = end;
    slot.intervalType = intervalType;
    slot.dateFormat = this.dateFormats[intervalType.toLowerCase()];
    slot.minuteInterval = this.minuteInterval;
    slot.viewType = this.viewType;
    return slot;
  }

  /**
   * Calculates the actual start date for a view based on a proposed date
   *
   * @param date is the proposed date
   * @returns the actual start date for the view
   */
  getViewStartDate(date: Date): Date {
    return date;
  }

  /**
   * Gets the start date of the scheduler based on the passed in date and current time range
   *
   * @param date is the date to combine with the current time range
   * @returns passed in date plus the current time range start time
   */
  getStartDate(date: Date) {
    return this.schedulerDateService.getStartDateTime(date, !this.isTimeInterval);
  }

  /**
   * Gets the end date of the scheduler based on the passed in date and current time range
   *
   * @param date is the date to combine with the current time range
   * @returns passed in date plus the current time range end time
   */
  getEndDate(date: Date) {
    // const result = new Date(date);
    // setTime(result, this.dateRange.end);
    return this.schedulerDateService.getEndDateTime(date, !this.isTimeInterval);
  }

  /**
   * Changes the current view to Day and selects the passed in date
   *
   * @param date is the date to select
   */
  jumpToDayView(date: Date) {
    this.schedulerViewService.jumpToDayView(date);
  }

  protected setSubscriptions(): void {
    this._schedularDatesSubscription = this.schedulerDateService.schedulerDates$.subscribe(() => {
      this.dateRangeChanged();
      this.createTimeSlots();
    }
    );
    this._invalidateViewSubscription = this.schedulerViewService.invalidateView$.subscribe(() => {
      this.invalidate();
    });
    this._eventRescheduledSubscription = this.schedulerEventService.rescheduleEventItem$.subscribe((rescheduleInfo) => {
        this.eventItems = rescheduleInfo.currentEvents;
        this.eventRescheduled(rescheduleInfo);
    });

    this._beginSlotSelectionSubscription = this.timeSlotService.beginTimeSlotSelection$.subscribe(
      () => {
        this.schedulerEventService.unSelectAll();
      }
    );

    this._endSlotSelectionSubscription = this.timeSlotService.endTimeSlotSelection$.subscribe(
      (selectedRange: DateRange) => {
        if (!this.isEmbedded || this._hasTimeSlotServiceProvider) {
          const newEvent = new EventItem(selectedRange.start, selectedRange.end, '(No Title)');
          newEvent.isAllDay = !this.isTimeInterval;
          this.schedulerEventService.addEventItem(newEvent);
        }
      }
    );

    this._eventSelectionSubscription = this.schedulerEventService.selectedEvents$.subscribe(
      (events) => {

      }
    );
  }

  cellHint(date: Date): string {
    const result = formatDateTime(date, 'EEEE MMMM d, ') + shortTime(date);
    return result;
  }

  protected removeSubscriptions(): void {
    this._schedularDatesSubscription.unsubscribe();
    this._eventCompChangeSubscription.unsubscribe();
    this._invalidateViewSubscription.unsubscribe();
    this._eventRescheduledSubscription.unsubscribe();
    this._beginSlotSelectionSubscription.unsubscribe();
    this._endSlotSelectionSubscription.unsubscribe();
    this._eventSelectionSubscription.unsubscribe();
  }

  protected dateRangeChanged() {
    // this.invalidate();
  }
  protected slotsGenerated(): void {}

  protected eventRescheduled(_info: { oldEvent: EventItem; newEvent: EventItem; currentEvents: EventItem[]; }): void {}

  ngOnInit(): void {
    this.setSubscriptions();
    this.connectDataSource();
  }

  ngOnChanges(changes): void {
    // this.layoutEventsAsync();
  }

  ngAfterViewInit(): void {
    if (this.eventComps) {
      this._eventCompChangeSubscription = this.eventComps.changes.subscribe(
        (changes) => {
           setTimeout(() => {
            this.layoutEventsAsync();
           }, 0);
        }
      );
    }
     setTimeout(() => {
      this.layoutEventsAsync();
     }, 0);
    this.setViewSize();
    const ro = new ResizeObserver((size) => {
        this.invalidate();
    });
    ro.observe(this.elRef.nativeElement);
  }

  protected setViewSize() {
    // this.viewRect = (this.eventGrid.nativeElement as HTMLElement).getBoundingClientRect();
  }

  protected abstract layoutEvents(): void;

  protected invalidate() {
    this.setViewSize();
    this.layoutEventsAsync();
  }

  layoutEventsAsync() {
    // requestAnimationFrame( () => {
    //  this.eventComps.forEach(comp => comp.visibility = 'hidden');
      this.layoutEvents();
    //  this.eventComps.forEach(comp => comp.visibility = 'visible');
    // });
  }

  ngOnDestroy(): void {
    this.disconnectDataSource();
    this.removeSubscriptions();
  }

  @HostListener('animationend', ['$event'] )
  animationEnd(event: { animationName: string; }) {
     if (event.animationName === 'view-enter') {
       // this.invalidate();
     }
  }

  @HostListener('drop', ['$event'])
  onDrop(e: DropEventItemArgs) {
      const dropCell = this.cellAtPos(new Point(e.event.pageX - e.event.offsetX, e.event.pageY - e.event.offsetY));
      this.schedulerEventService.unSelectAll();
      if (dropCell) {
        const eventItem = e.item as EventItem;
        this.schedulerEventService.rescheduleEvent(eventItem, dropCell.timeSlot.startDate, null, this.isFullDayEventsOnly);
      }
  }
}
