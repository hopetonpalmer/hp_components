import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DateRange } from '../types';
import { isWithinRange, isBefore, isAfter, subSeconds, addSeconds, isEqual } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class DateSelectionService {
  private _isSelecting = false;
  _initialRange: DateRange = null;
  get isSelecting() {
    return this._isSelecting;
  }

  private _selectedDateRangeSubject = new BehaviorSubject<DateRange>(null);
  selectedDateRange$ = this._selectedDateRangeSubject.asObservable();

  constructor() {}
  beginSelection() {
    this._isSelecting = true;
    this._initialRange = null;
  }
  endSelection() {
    this._isSelecting = false;
  }

  clear() {
    this._selectedDateRangeSubject.next(null);
  }

  setSelectedDateRange(start: Date, end: Date) {
    this._selectedDateRangeSubject.next({ start, end });
  }

  adjustDateRange(date: Date) {
    if (!this.isSelecting) {
      return;
    }
    const range = this._selectedDateRangeSubject.value;
    if (!this._initialRange) {
      this._initialRange = Object.assign({}, range);
    }
    if (isEqual(date, this._initialRange.start)) {
      this.setSelectedDateRange(date, this._initialRange.end);
    } else if (isBefore(date, range.start))  {
       this.setSelectedDateRange(date, range.end);
    } else if (isAfter(date, range.end)) {
       this.setSelectedDateRange(range.start, date);
    } else if (isBefore(date, range.end)) {
      if (isBefore(date, this._initialRange.start)) {
        this.setSelectedDateRange(date, range.end);
      } else {
        this.setSelectedDateRange(range.start, date);
      }
    }
  }

  isSelectedDate(date: Date) {
    const range = this._selectedDateRangeSubject.value;
    return range && isWithinRange(date, range.start, range.end);
  }
}
