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
   differenceInMilliseconds} from 'date-fns';
import { SchedulerViewType, MinuteInterval, IntervalType, DateRange } from '../types';
import { OnDestroy, OnInit, Input } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { TimeSlot } from '../time-slot/time-slot';
import { setTime, isMidnight } from '../scripts/datetime';
import { SchedulerViewService } from './scheduler-view.service';
import { EventItem } from '../event-item/event-item';
import { SchedulerDateService } from '../services/scheduler-date.service';
import { logExecution } from '../scripts/debug';


export interface ISchedulerView {
  viewType: SchedulerViewType;
  dateRange: DateRange;
  resources: SchedulerResource[];
  eventItems: EventItem[];
  connectDataSource();
  disconnectDataSource();
}

export class SchedulerView implements ISchedulerView, OnInit, OnDestroy {
  private _resourcesSubscription: Subscription;
  private _eventsSubscription: Subscription;
  private _schedularDatesSubscription: Subscription;


  viewType: SchedulerViewType = 'Day';
  intervalTypes: IntervalType[];

  timeSlots = new Map<string, TimeSlot[]>();
  eventSlots: Array<TimeSlot[]> = new Array<TimeSlot[]>();

  private _resources: SchedulerResource[];
  set resources(value: SchedulerResource[]) {}
  get resources(): SchedulerResource[] {
    return this._resources;
  }

  private _eventItems: EventItem[];
  set eventItems(value: EventItem[]) {
    this._eventItems = value;
  }
  get eventItems(): EventItem[] {
    return this._eventItems;
  }

  get dateRange(): DateRange {
    return this.schedulerDateService.dateRange;
  }

  get viewTimeSlots(): TimeSlot[] {
    const result = this.timeSlots.get(this.intervalTypes[0]);
    return result;
  }

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

  @Input()
  minuteInterval: MinuteInterval = 30;

  @Input()
  set dateFormats(value: {}) {
    this._dateFormats = Object.assign(this._dateFormats, value);
  }

  get dateFormats() {
    return this._dateFormats;
  }

  constructor(public schedulerService: SchedulerService,
     public schedulerViewService: SchedulerViewService,
     public schedulerDateService: SchedulerDateService) {
       this.setViewDefaults();
     }

  protected setViewDefaults() {}

  get dayCount() {
    return differenceInDays(this.dateRange.end, this.dateRange.start) + 1;
  }
  get hourSlotCount(): number {
    return 60 / this.minuteInterval;
  }
  hasInterval(intervalType: IntervalType): boolean {
    return this.intervalTypes.indexOf(intervalType) > -1;
  }

  isMasterSlot(slot: TimeSlot): boolean {
     const result = slot.intervalType === this.masterIntervalType;
     return result;
  }

  connectDataSource() {
    this._resourcesSubscription = this.schedulerService.resources$.subscribe(
      resources => (this.resources = resources)
    );
    this._eventsSubscription = this.schedulerService.eventItems$.subscribe(
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

        // -- account for midnight
        if (isMidnight(endDate)) {
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
      const slot = this.createTimeSlot(intervalType, date, subSeconds(endDate, 1));
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
    const result = new Date(date);
    setTime(result, this.dateRange.start);
    return result;
  }

   /**
   * Gets the end date of the scheduler based on the passed in date and current time range
   *
   * @param date is the date to combine with the current time range
   * @returns passed in date plus the current time range end time
   */
  getEndDate(date: Date) {
    const result = new Date(date);
    setTime(result, this.dateRange.end);
    return result;
  }

  /**
   * Changes the current view to Day and selects the passed in date
   *
   * @param date is the date to select
   */
  jumpToDayView(date: Date) {
    this.schedulerViewService.jumpToDayView(date);
  }

  protected setViewDateRange() {}

  protected setSubscriptions() {
    this._schedularDatesSubscription = this.schedulerDateService.schedulerDates$.subscribe(() => {
      this.createTimeSlots();
    });
  }

  protected slotsGenerated() {}

  removeSubscriptions() {
    this._schedularDatesSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.setSubscriptions();
    this.connectDataSource();
  }

  ngOnDestroy(): void {
    this.disconnectDataSource();
    this.removeSubscriptions();
  }
}
