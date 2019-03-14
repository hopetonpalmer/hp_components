import { Injectable } from '@angular/core';
import { SchedulerResource } from '../models';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
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
import { setTime, addUtcMinutes, addUtcHours } from '../scripts/datetime';
import { EventItem } from '../event-item/event-item';



@Injectable({
  providedIn: 'root'
})
export class SchedulerService {
  private _resourcesSubject = new BehaviorSubject<SchedulerResource[]>([]);
  private _activeDateSubject = new BehaviorSubject<Date>(null);

  resources$ = this._resourcesSubject.asObservable();
  activeDate$ = this._activeDateSubject.asObservable();

  get activeDate(): Date {
    return this._activeDateSubject.value;
  }

  constructor() {}

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
