import { Injectable } from '@angular/core';
import { Appointment, SchedulerResource } from './models';
import { BehaviorSubject, Observable } from 'rxjs';
import { DateRange, DayTimeRange, IntervalType, MinuteInterval } from './types';
import {
  differenceInCalendarYears,
  differenceInCalendarQuarters,
  differenceInCalendarMonths,
  differenceInCalendarWeeks,
  differenceInCalendarDays,
  differenceInHours,
  differenceInMinutes,
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
  startOfHour,
  endOfDay,
  differenceInDays,
  addSeconds,
  getDaysInMonth,
  endOfMonth,
  differenceInMonths,
  getHours,
  isBefore,
  isAfter,
  parse,
  isSameHour,
  subDays,
  endOfHour,
  endOfToday,
  startOfToday
} from 'date-fns';

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

  appointments$ = this._appointmentsSubject.asObservable();
  resources$ = this._resourcesSubject.asObservable();
  dateRange$ = this._dateRangeSubject.asObservable();
  dayTimeRange$ = this._dayTimeRangeSubject.asObservable();

  constructor() {}

  addAppointment(appointment: Appointment) {
    this._appointmentsSubject.next([...this._appointmentsSubject.value, ...[appointment]]);
  }

  deleteAppointment(appointment: Appointment) {
    const appointments = this._appointmentsSubject.value;
    appointments.splice(appointments.indexOf(appointment));
    this._appointmentsSubject.next(appointments);
  }

  addResource(resource: SchedulerResource) {
    this._resourcesSubject.next([...this._resourcesSubject.value, ...[resource]]);
  }

  deleteResource(resource: SchedulerResource) {
    const resources = this._resourcesSubject.value;
    resources.splice(resources.indexOf(resource));
    this._resourcesSubject.next(resources);
  }

  setDateRange(startDate: Date, endDate: Date) {
    const dateRange = { start: startDate, end: endDate };
    this._dateRangeSubject.next(dateRange);
  }

  setDayTimeRange(dayStarts: string, dayEnds: string) {
    const dayTimeRange = { dayStarts: dayStarts, dayEnds: dayEnds };
    this._dayTimeRangeSubject.next(dayTimeRange);
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
