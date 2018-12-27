import { Injectable } from '@angular/core';
import { SchedulerViewType } from '../types';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SlotSelectionService } from '../services/slot-selection.service';


@Injectable()
export class SchedulerViewService {
  private _viewTypeSubject = new BehaviorSubject<SchedulerViewType>('Day');
  viewType$ = this._viewTypeSubject.asObservable();

  private _startDateRequestSubject = new Subject<Date>();
  startDateUpdateRequest$ = this._startDateRequestSubject.asObservable();

  constructor(private _dateSelectionService: SlotSelectionService) {}

  getActiveViewType(): SchedulerViewType {
     return this._viewTypeSubject.value;
  }

  setViewType(viewType: SchedulerViewType) {
    if (viewType !== this._viewTypeSubject.value) {
      this._dateSelectionService.clearSelection();
      this._viewTypeSubject.next(viewType);
    }
  }

  isDayView(viewType = this._viewTypeSubject.value): boolean {
    return viewType === 'Day' || viewType === 'Week' || viewType === 'WorkWeek';
  }

  getDayViewType() {
    const viewType = this._viewTypeSubject.value;
    if (viewType === 'Day' || viewType === 'Week' || viewType === 'WorkWeek') {
      return viewType;
    }
    return 'Day';
  }

  jumpToDayView(date: Date) {
    this.setViewType('Day');
    this._startDateRequestSubject.next(date);
  }
}
