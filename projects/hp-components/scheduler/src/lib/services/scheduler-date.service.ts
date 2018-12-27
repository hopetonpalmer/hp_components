import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, Subject } from 'rxjs';
import { setTime, getDateTime } from '../scripts/datetime';
import { SchedulerViewService } from '../views/scheduler-view.service';
import { DateRange } from '../types';
import { startOfWeek, addDays, startOfMonth, endOfMonth, subDays, isAfter, addWeeks, addMonths } from 'date-fns';

@Injectable()
export class SchedulerDateService implements OnDestroy {
  private _startDateUpdateRequestSubscription: Subscription;

  private _schedulerDatesSubject = new BehaviorSubject<ISchedulerDateSettings>(new DateSettings());
  schedulerDates$ = this._schedulerDatesSubject.asObservable();

  get datesSettings(): ISchedulerDateSettings {
    return this._schedulerDatesSubject.value;
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
    switch (this._schedulerViewService.getActiveViewType()) {
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
        result = { start: start, end: addDays(start, 6) };
        break;
      case 'Month':
        result = this.getMonthRange(start);
        break;
      case 'TimelineMonth':
        start = startOfMonth(start);
        result = { start: start, end: endOfMonth(start) };
        break;
    }
    result = {start: this.getStartDateTime(result.start), end: this.getEndDateTime(result.end)};
    return result;
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

  constructor(private _schedulerViewService: SchedulerViewService) {
    this._startDateUpdateRequestSubscription = this._schedulerViewService.startDateUpdateRequest$.subscribe(
      date => {
        this.startDate = date;
      });
  }

  setDateSettings(dates: ISchedulerDateSettings) {
    const newDates = { ...this.datesSettings, ...dates };
    this._schedulerDatesSubject.next(newDates);
  }

  getStartDateTime(date: Date): Date {
    return getDateTime(date, this.datesSettings.startTime);
  }

  getEndDateTime(date: Date): Date {
    return getDateTime(date, this.datesSettings.endTime);
  }

  incStartDate(delta: number) {
    let start = this.startDate;
    switch (this._schedulerViewService.getActiveViewType()) {
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
    this.startDate = date;
  }

  gotoNextDate() {
    this.incStartDate(1);
  }

  gotoPreviousDate() {
    this.incStartDate(-1);
  }

  ngOnDestroy(): void {
    this._startDateUpdateRequestSubscription.unsubscribe();
  }

}

export interface ISchedulerDateSettings {
  startDate?: Date;
  startTime?: string;
  endTime?: string;
  startWorkTime?: string;
  endWorkTime?: string;
  firstDayOfWeek?: number;
}


class DateSettings implements ISchedulerDateSettings {
  startDate =  new Date();
  startTime = '7:00 AM';
  endTime = '9:00 PM';
  startWorkTime = '9:00 AM';
  endWorkTime = '5:00 PM';
  firstDayOfWeek = 0;
}

