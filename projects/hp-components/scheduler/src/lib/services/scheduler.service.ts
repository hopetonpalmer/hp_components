import { Injectable } from '@angular/core';
import { Appointment, SchedulerResource } from '../models';
import { BehaviorSubject, Observable } from 'rxjs';
import { DateRange, DayTimeRange, IntervalType, MinuteInterval, SchedulerViewType } from '../types';
import {
  addYears,
  startOfYear,
  startOfQuarter,
  addQuarters,
  startOfMonth,
  addMonths,
  startOfWeek,
  addWeeks,
  addDays,
  startOfDay,
  addHours,
  addMinutes,
  endOfMonth,
  isAfter,
  endOfToday,
  startOfToday} from 'date-fns';
import { setTime } from '../scripts/datetime';


@Injectable({
  providedIn: 'root'
})
export class SchedulerService {
  private _appointmentsSubject = new BehaviorSubject<Appointment[]>([]);
  private _resourcesSubject = new BehaviorSubject<SchedulerResource[]>([]);
  private _dateRangeSubject = new BehaviorSubject<DateRange>({
    start: startOfToday(),
    end: endOfToday()
  });
  private _dayTimeRangeSubject = new BehaviorSubject<DayTimeRange>({
    dayStarts: '00:00',
    dayEnds: '23:59'
  });
  private _activeDateSubject = new BehaviorSubject<Date>(null);

  appointments$ = this._appointmentsSubject.asObservable();
  resources$ = this._resourcesSubject.asObservable();
  dateRange$ = this._dateRangeSubject.asObservable();
  dayTimeRange$ = this._dayTimeRangeSubject.asObservable();
  activeDate$ = this._activeDateSubject.asObservable();

  get dateRange(): DateRange {
    const dateRange = this._dateRangeSubject.value;
    const timeRange = this._dayTimeRangeSubject.value;
    setTime(dateRange.start, timeRange.dayStarts);
    setTime(dateRange.end, timeRange.dayEnds);
    return dateRange;
  }
  constructor() {}

  addAppointment(appointment: Appointment) {
    this._appointmentsSubject.next([
      ...this._appointmentsSubject.value,
      ...[appointment]
    ]);
  }

  deleteAppointment(appointment: Appointment) {
    const appointments = this._appointmentsSubject.value;
    appointments.splice(appointments.indexOf(appointment));
    this._appointmentsSubject.next(appointments);
  }

  addResource(resource: SchedulerResource) {
    this._resourcesSubject.next([
      ...this._resourcesSubject.value,
      ...[resource]
    ]);
  }

  deleteResource(resource: SchedulerResource) {
    const resources = this._resourcesSubject.value;
    resources.splice(resources.indexOf(resource));
    this._resourcesSubject.next(resources);
  }

  /**
   * Sets the current date range of the scheduler
   * @param startDate Starting date of date range
   * @param endDate Ending date of date range
   */
  setDateRange(startDate: Date, endDate: Date) {
    const dateRange = { start: startDate, end: endDate };
    this._dateRangeSubject.next(dateRange);
  }

  /**
   * Sets the date range of the Month Scheduler based on any given date of a month
   * @param date Any date in the month. It is used to derive the month
   * @param weeks The number of weeks in the date range
   */
  setRangeFromMonth(date = new Date(), weeks = 5) {
    if (this._activeDateSubject.value) {
      date = this._activeDateSubject.value;
    }
    const daysPerWeek = 7;
    const days = weeks * daysPerWeek;
    const startDate = startOfWeek(startOfMonth(date));
    let endDate = addDays(startDate, days - 1);
    if (isAfter(endOfMonth(date), endDate)) {
      endDate = addWeeks(endDate, 1);
    }
    this.setDateRange(startDate, endDate);
  }

  /**
   * Sets the starting and ending times for each day of the scheduler
   * @param dayStarts Sets the start time of date range
   * @param dayEnds Sets the end time of the date range
   */
  setDayTimeRange(dayStarts: string, dayEnds: string) {
    const dayTimeRange = { dayStarts: dayStarts, dayEnds: dayEnds };
    this._dayTimeRangeSubject.next(dayTimeRange);
  }

  setActiveDate(date: Date) {
     this._activeDateSubject.next(date);
  }

  incInterval(
    intervalType: IntervalType,
    date: Date,
    minuteInterval: MinuteInterval,
    increment = 1
  ): Date {
    if (increment === 0) {
      return date;
    }
    switch (intervalType) {
      case 'Year':
        return startOfYear(addYears(date, increment));
      case 'Quarter':
        return startOfQuarter(addQuarters(date, increment));
      case 'Month':
        return startOfMonth(addMonths(date, increment));
      case 'Week':
        return startOfWeek(addWeeks(date, increment));
      case 'Day':
        return addDays(startOfDay(date), increment);
      case 'Hour':
        return addHours(date, increment);
      case 'Minute':
        return addMinutes(date, increment * minuteInterval);
      default:
        return date;
    }
  }
}
