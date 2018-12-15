import { SchedulerResource } from '../models/schedulerResource';
import { Appointment } from '../models/appointment';
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
   differenceInHours } from 'date-fns';
import { SchedulerViewType, MinuteInterval, IntervalType, DateRange } from '../types';
import { OnDestroy, OnInit, Input } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { TimeSlot } from '../time-slot/time-slot';
import { setTime, isMidnight } from '../scripts/datetime';
import { SchedulerViewService } from './scheduler-view.service';


export interface ISchedulerView {
  viewType: SchedulerViewType;
  dateRange: DateRange;
  resources: SchedulerResource[];
  appointments: Appointment[];
  connectDataSource();
  disconnectDataSource();
}

export class SchedulerView implements ISchedulerView, OnInit, OnDestroy {
  private _resourcesSubscription: Subscription;
  private _appointmentsSubscription: Subscription;
  private _dateRangeSubscription: Subscription;
  private _timeRangeSubscription: Subscription;
  private _viewTypeSubscription: Subscription;

  viewType: SchedulerViewType = 'Day';
  intervalTypes: IntervalType[];

  timeSlots = new Map<string, TimeSlot[]>();
  appointmentSlots: Array<TimeSlot[]> = new Array<TimeSlot[]>();

  private _resources: SchedulerResource[];
  set resources(value: SchedulerResource[]) {}
  get resources(): SchedulerResource[] {
    return this._resources;
  }

  private _appointments: Appointment[];
  set appointments(value: Appointment[]) {
    this._appointments = value;
  }
  get appointments(): Appointment[] {
    return this._appointments;
  }

  get dateRange(): DateRange {
    return this.schedulerService.dateRange;
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
     public schedulerViewService: SchedulerViewService) {}

  get dayCount() {
    return differenceInDays(this.dateRange.end, this.dateRange.start) + 1;
  }
  get hourSlotCount(): number {
    return 60 / this.minuteInterval;
  }
  hasInterval(intervalType: IntervalType): boolean {
    return this.intervalTypes.indexOf(intervalType) > -1;
  }

  connectDataSource() {
    this._resourcesSubscription = this.schedulerService.resources$.subscribe(
      resources => (this.resources = resources)
    );
    this._appointmentsSubscription = this.schedulerService.appointments$.subscribe(
      appointments => (this.appointments = appointments)
    );
  }

  disconnectDataSource() {
    if (this._resourcesSubscription) {
      this._resourcesSubscription.unsubscribe();
    }
    if (this._appointmentsSubscription) {
      this._appointmentsSubscription.unsubscribe();
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

  createTimeSlots(
    timeSlots: TimeSlot[] = [],
    intervalType = null,
    startDate: Date = null
  ) {
    if (!this.dateRange || !this.intervalTypes) {
      return;
    }
    if (this.timeSlots.entries.length > 0) {
      this.appointmentSlots = new Array<TimeSlot[]>();
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
        this.appointmentSlots.push([]);
      }
      const endDate = this.schedulerService.incInterval(
        intervalType,
        date,
        this.minuteInterval
      );
      const slot = this.createTimeSlot(intervalType, date, subSeconds(endDate, 1));
      timeSlots.push(slot);
      if (intervalType === this.intervalTypes[this.intervalTypes.length - 1]) {
        this.appointmentSlots[this.appointmentSlots.length - 1].push(slot);
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
    }
  }


  createTimeSlot(intervalType: IntervalType, start: Date, end: Date): TimeSlot {
    const slot = new TimeSlot();
    slot.startDate = start;
    slot.endDate = end;
    slot.intervalType = intervalType;
    slot.dateFormat = this.dateFormats[intervalType.toLowerCase()];
    slot.minuteInterval = this.minuteInterval;
    return slot;
  }

  getStartDate(date: Date) {
    const result = new Date(date);
    setTime(result, this.dateRange.start);
    return result;
  }

  getEndDate(date: Date) {
    const result = new Date(date);
    setTime(result, this.dateRange.end);
    return result;
  }

  setSubscriptions() {
    this._dateRangeSubscription = this.schedulerService.dateRange$.subscribe(() => {
      this.createTimeSlots();
    });
    this._timeRangeSubscription = this.schedulerService.dayTimeRange$.subscribe(() => this.createTimeSlots());
    this._viewTypeSubscription = this.schedulerViewService.viewType$.subscribe(viewType => {
        this.viewChanged(viewType);
    });
  }

  protected viewChanged(viewType) {}

  removeSubscriptions() {
    this._dateRangeSubscription.unsubscribe();
    this._timeRangeSubscription.unsubscribe();
    this._viewTypeSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.createTimeSlots();
    this.setSubscriptions();
    this.connectDataSource();
  }

  ngOnDestroy(): void {
    this.disconnectDataSource();
    this.removeSubscriptions();
  }
}
