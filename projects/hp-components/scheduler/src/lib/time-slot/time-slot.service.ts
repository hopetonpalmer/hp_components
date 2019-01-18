import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DateRange, IEventCell} from '../types';
import { isWithinRange, isEqual, isBefore, isAfter, isSameDay, addSeconds, endOfDay, subMilliseconds } from 'date-fns';
import { isBetween } from '../scripts/datetime';
import { ISchedulerItem } from '../interfaces/i-scheduler-item';



@Injectable()
export class TimeSlotService {
  private _isSelecting = false;
  _selectionStartDateRange: DateRange;
  get isSelecting() {
    return this._isSelecting;
  }

  private _selectedSlotsDateRangeSubject = new BehaviorSubject<DateRange>(null);
  selectedSlotsDateRange$ = this._selectedSlotsDateRangeSubject.asObservable();

  private _beginSlotSelectionSubject = new Subject<DateRange>();
  beginTimeSlotSelection$ = this._beginSlotSelectionSubject.asObservable();

  private _endSlotSelectionSubject = new Subject<DateRange>();
  endTimeSlotSelection$ = this._endSlotSelectionSubject.asObservable();

  constructor() {}

  beginSlotSelection(dateRange: DateRange) {
    this._isSelecting = true;
    this._selectionStartDateRange = dateRange;
    this._beginSlotSelectionSubject.next(dateRange);
  }

  endSlotSelection() {
    this._isSelecting = false;
    const selectedRange = this._selectedSlotsDateRangeSubject.value;
    let endDate = addSeconds(selectedRange.end, 1);
    if (!isSameDay(endDate, selectedRange.end)) {
      endDate = selectedRange.end;
    }
    selectedRange.end = endDate;
    this._endSlotSelectionSubject.next(selectedRange);
  }

  clearSlotSelection() {
    this._selectedSlotsDateRangeSubject.next(null);
  }

  setSelectedSlotsDateRange(start: Date, end: Date) {
    this._selectedSlotsDateRangeSubject.next({ start, end });
  }

  isSlotDateSelected(date: Date) {
    const range = this._selectedSlotsDateRangeSubject.value;
    const result = range && isWithinRange(date, range.start, range.end);
    return result;
  }

  adjustSelectedSlotsDateRange(dateRange: DateRange, dateFilter: Date = null) {
    if (!this.isSelecting || (dateFilter && !isSameDay(dateRange.start, dateFilter))) {
      return;
    }
    const startRange = this._selectionStartDateRange;
    if (isEqual(dateRange.start, startRange.start)) {
      this.setSelectedSlotsDateRange(startRange.start, startRange.end);
    } else if (isBefore(dateRange.start, startRange.start)) {
      this.setSelectedSlotsDateRange(dateRange.start, startRange.end);
    } else if (isAfter(dateRange.end, startRange.start)) {
      this.setSelectedSlotsDateRange(startRange.start, dateRange.end);
    }
  }

  /**
   * Returns a group of event items and count per time slots
   *
   * @param EventItem[] The visible event items
   * @returns ISizingGroup[]
   */
  protected getSlotGroups(
    eventCells: IEventCell[],
    eventItems: ISchedulerItem[]
  ) {
    let newGroup = true;
    const result = eventCells.reduce((groups, cell) => {
      const eventsInRange = eventItems.filter(item =>
        isBetween(item.start, item.end, cell.timeSlot.startDate)
      );
      if (eventsInRange.length === 0) {
        newGroup = true;
        return groups;
      }
      if (newGroup) {
        newGroup = false;
        groups.push({
          maxSpread: eventsInRange.length,
          eventItems: eventsInRange
        });
      } else {
        const group = groups[groups.length - 1];
        group.maxSpread = Math.max(eventsInRange.length, group.maxSpread);
        group.eventItems = Array.from(
          new Set([...group.eventItems, ...eventsInRange])
        );
      }

      return groups;
    }, []);
    return result;
  }
}
