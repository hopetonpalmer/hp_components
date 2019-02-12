import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, Subject } from 'rxjs';
import { setTime, getDateTime, isBetween } from '../scripts/datetime';
import { SchedulerViewService } from '../views/scheduler-view.service';
import { DateRange } from '../types';
import { startOfWeek, addDays, startOfMonth, endOfMonth, subDays,
  isAfter, addWeeks, addMonths, isSameDay, startOfDay, endOfDay,
   addSeconds, isSameMonth } from 'date-fns';

@Injectable()
export class SchedulerDateService implements OnDestroy {
  private startDateUpdateRequestSubscription: Subscription;

  private schedulerDatesSubject = new BehaviorSubject<ISchedulerDateSettings>(new DateSettings());
  schedulerDates$ = this.schedulerDatesSubject.asObservable();

  get datesSettings(): ISchedulerDateSettings {
    return this.schedulerDatesSubject.value;
  }

  set startDate(date: Date) {
    this.setDateSettings({ startDate: date });
  }

  get startDate(): Date {
    return this.datesSettings.startDate;
  }

  get dateRange(): DateRange {
    let start = this.startDate;
    let result = {start: start, end: start};
    const activeType = this.schedulerViewService.getActiveViewType();
    switch (activeType) {
      case 'Day':
      case 'Timeline':
      case 'Agenda':
        result = { start: start, end: start };
        break;
      case 'Week':
      case 'TimelineWeek':
        start = startOfWeek(start, {weekStartsOn: this.datesSettings.firstDayOfWeek});
        result = { start: start, end: addDays(start, 6) };
        break;
      case 'WorkWeek':
        const workDays = this.datesSettings.workDays;
        start = startOfWeek(start);
        start = addDays(start, workDays[0] - start.getDay());
        result = { start: start, end: addDays(start, workDays.length - 1) };
        break;
      case 'Month':
        result = this.getMonthRange(start);
        break;
      case 'TimelineMonth':
        start = startOfMonth(start);
        result = { start: start, end: endOfMonth(start) };
        break;
    }
    const ignoreTime = activeType === 'TimelineWeek' || activeType === 'Month' || activeType === 'TimelineMonth';
    result = {start: this.getStartDateTime(result.start, ignoreTime), end: this.getEndDateTime(result.end, ignoreTime)};
    return result;
  }

  isWorkHour(date: Date): boolean {
     const hour = date.getHours();
     return hour >= this.datesSettings.startWorkHour && hour < this.datesSettings.endWorkHour;
  }

  isDateInCurrentMonth(date: Date): boolean {
    const dateRange = this.dateRange;
    const midMonth = 15;
    return isSameMonth(addDays(dateRange.start, midMonth), date);
  }

  getMonthRange(date: Date, weeks = 5): DateRange {
    const daysPerWeek = 7;
    const days = weeks * daysPerWeek;
    const startDate = startOfWeek(startOfMonth(date));
    let endDate = addDays(startDate, days - 1);
    if (isAfter(endOfMonth(date), endDate)) {
      endDate = addWeeks(endDate, 1);
    }
    return {start: startDate, end: endDate};
  }

  constructor(private schedulerViewService: SchedulerViewService) {
    this.startDateUpdateRequestSubscription = this.schedulerViewService.startDateUpdateRequest$.subscribe(
      date => {
        this.startDate = date;
      });
  }

  setDateSettings(dates: ISchedulerDateSettings) {
    if (this.datesSettings !== dates) {
      const newDates = { ...this.datesSettings, ...dates };
      this.schedulerViewService.clearSelection();
      this.schedulerDatesSubject.next(newDates);
    }
  }

  getStartDateTime(date: Date, ignoreTime: boolean): Date {
    if (ignoreTime) {
      return addSeconds(startOfDay(date), 1);
    }
    const result = startOfDay(date);
    result.setHours(this.datesSettings.startHour);
    return result;
  }

  getEndDateTime(date: Date, ignoreTime: boolean): Date {
    if (ignoreTime) {
      return endOfDay(date);
    }
    let result = startOfDay(date);
    result.setHours(this.datesSettings.endHour);
    if (!isSameDay(result, date)) {
      result = endOfDay(subDays(result, 1));
    }
    return result;
  }

  incStartDate(delta: number) {
    let start = this.startDate;
    switch (this.schedulerViewService.getActiveViewType()) {
      case 'Day':
      case 'Timeline':
      case 'Agenda':
        start = addDays(start, delta);
        break;
      case 'Week':
      case 'WorkWeek':
      case 'TimelineWeek':
        start = addWeeks(start, delta);
        break;
      case 'Month':
      case 'TimelineMonth':
        start = addMonths(start, delta);
        break;
    }
    this.startDate = start;
  }

  gotoToday() {
    this.gotoDate(new Date());
  }

  gotoDate(date: Date) {
    if (!isSameDay(date, this.startDate)) {
      this.startDate = date;
    }
  }

  gotoNextDate() {
    this.incStartDate(1);
  }

  gotoPreviousDate() {
    this.incStartDate(-1);
  }

  ngOnDestroy(): void {
    this.startDateUpdateRequestSubscription.unsubscribe();
  }

}

export interface ISchedulerDateSettings {
  startDate?: Date;
  startHour?: number;
  endHour?: number;
  startWorkHour?: number;
  endWorkHour?: number;
  workDays?: number[];
  firstDayOfWeek?: number;
}


class DateSettings implements ISchedulerDateSettings {
  startDate =  new Date();
  startHour = 0;
  endHour = 24;
  startWorkHour = 9;
  endWorkHour = 18;
  workDays = [1, 2, 3, 4, 5];
  firstDayOfWeek = 0;
}

