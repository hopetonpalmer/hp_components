import { Component, OnInit, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { IntervalType, DateRange, MinuteInterval, DayTimeRange, SchedulerViewType } from '../types';
import { TimeSlot } from './time-slot';
import { differenceInCalendarYears,
   differenceInCalendarQuarters,
   differenceInCalendarMonths,
   differenceInCalendarWeeks,
   differenceInCalendarDays,
   differenceInHours,
   startOfHour,
   differenceInDays,
   addSeconds,
   endOfHour,
   endOfMonth,
   closestTo,
   endOfYear,
   startOfMonth,
   subSeconds} from 'date-fns';
import { setTime, isMidnight } from '../scripts/datetime';
import { SchedulerService } from '../services/scheduler.service';



@Component({
  selector: 'hp-time-slot-grid',
  templateUrl: './time-slot-grid.component.html',
  styleUrls: ['./time-slot-grid.component.css', '../styles.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeSlotGridComponent implements OnInit {
  timeSlots = new Map<string, TimeSlot[]>();
  appointmentSlots: Array<TimeSlot[]> = new Array<TimeSlot[]>();

  private _isReady = false;
  private _intervalTypes: IntervalType[];

  @Input()
  set intervalTypes(value: IntervalType[]) {
    this._intervalTypes = value;
    this.createSlots();
  }
  get intervalTypes(): IntervalType[] {
    return this._intervalTypes;
  }

  get masterIntervalType(): IntervalType {
    return this.intervalTypes[0];
  }
  private _dateRange: DateRange;
  @Input()
  set dateRange(value: DateRange) {
    this._dateRange = value;
    this.createSlots();
  }
  get dateRange(): DateRange {
    if (this._dateRange) {
      if (this.masterIntervalType === 'Month') {
        this._dateRange.start = startOfMonth(this._dateRange.start);
      }
      setTime(this._dateRange.start, this.dayTimeRange.dayStarts);
      setTime(this._dateRange.end, this.dayTimeRange.dayEnds);
    }
    return this._dateRange;
  }

  private _dayTimeRange: DayTimeRange;
  @Input()
  set dayTimeRange(value: DayTimeRange) {
    this._dayTimeRange = value;
    this.createSlots();
  }
  get dayTimeRange(): DayTimeRange {
    return this._dayTimeRange;
  }

  private _minuteInterval: MinuteInterval = 30;
  @Input()
  set minuteInterval(value: MinuteInterval) {
    this._minuteInterval = value;
    this.createSlots();
  }
  get minuteInterval(): MinuteInterval {
    return this._minuteInterval;
  }

  @Input()
  viewType: SchedulerViewType;

  get dayCount() {
    return differenceInDays(this.dateRange.end, this.dateRange.start) + 1;
  }

  get hourSlotCount(): number {
    return 60 / this.minuteInterval;
  }

  private _maxSlots = 0;
  get maxSlots(): number {
    return this._maxSlots;
  }

  intervalSlots: Map<IntervalType, TimeSlot[]> = new Map<
    IntervalType,
    TimeSlot[]
  >();

  private _dateFormats = {
    year: 'y',
    quater: '',
    month: 'MMMM y',
    week: 'EEEE, MMMM d, y',
    day: 'EEEE, MMMM d, y',
    hour: 'h a',
    minute: 'mm'
  };
  @Input()
  set dateFormats(value: {}) {
    this._dateFormats = Object.assign(this._dateFormats, value);
  }

  get dateFormats() {
    return this._dateFormats;
  }

  getAllSubSlots(slots: TimeSlot[]) {
    const subSlots = slots.reduce((result, slot) => {
      return [...result, ...slot.timeSlots];
    }, new Array<TimeSlot>());
    return subSlots;
  }

  hasInterval(intervalType: IntervalType): boolean {
    return this.intervalTypes.indexOf(intervalType) > -1;
  }
  constructor(private _schedulerService: SchedulerService) {}

  getSlotCount(intervalType: IntervalType, startDate: Date): number {
    // startDate = this.dateRange.start;
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

  createSlots(
    timeSlots: TimeSlot[] = [],
    intervalType = null,
    startDate: Date = null
  ) {
    if (!this._isReady || !this.dateRange || !this.intervalTypes) {
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
      const endDate = this._schedulerService.incInterval(
        intervalType,
        date,
        this.minuteInterval
      );
      const slot = this.createSlot(intervalType, date, subSeconds(endDate, 1));
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
        this.createSlots(slot.timeSlots, nextIntervalType, nextDate);
      }
      date = endDate;
    }
    if (intervalIndex === 0) {
      const slots = new Map<string, TimeSlot[]>();
      slots.set(intervalType, timeSlots);
      this.timeSlots = slots;
    }
  }

  createSlot(intervalType: IntervalType, start: Date, end: Date): TimeSlot {
    const slot = new TimeSlot();
    slot.startDate = start;
    slot.endDate = end;
    slot.intervalType = intervalType;
    slot.dateFormat = this.dateFormats[intervalType.toLowerCase()];
    slot.minuteInterval = this.minuteInterval;
    return slot;
  }

  slotPercent(slotCount: number): number {
    return (1 / slotCount * 100);
  }

  getStartDate(date: Date) {
    const result = new Date(date);
    setTime(result, this.dayTimeRange.dayStarts);
    return result;
  }

  getEndDate(date: Date) {
    const result = new Date(date);
    setTime(result, this.dayTimeRange.dayEnds);
    return result;
  }

  ngOnInit() {
    this._isReady = true;
    this.createSlots();
  }

}
