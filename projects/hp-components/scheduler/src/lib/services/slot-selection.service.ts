import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DateRange } from '../types';
import { isWithinRange, isEqual, isBefore, isAfter } from 'date-fns';

@Injectable()
export class SlotSelectionService {
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

  clearSelection() {
    this._selectedDateRangeSubject.next(null);
  }

  setSelectedDateRange(start: Date, end: Date) {
    this._selectedDateRangeSubject.next({ start, end });
  }

  isSelected(date: Date) {
    const range = this._selectedDateRangeSubject.value;
    const result = range && isWithinRange(date, range.start, range.end);
    return result;
  }

  adjustSelectedSlotDateRange(date: Date) {
    if (!this.isSelecting) {
      return;
    }
    const range = this._selectedDateRangeSubject.value;
    if (!this._initialRange) {
      this._initialRange = Object.assign({}, range);
    }
    if (isEqual(date, this._initialRange.start)) {
      this.setSelectedDateRange(date, this._initialRange.end);
    } else if (isBefore(date, range.start)) {
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
}
