import { Injectable } from '@angular/core';
import { SchedulerViewType } from '../types';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchedulerViewService {
  private _viewTypeSubject = new BehaviorSubject<SchedulerViewType>('Day');
  viewType$ = this._viewTypeSubject.asObservable();

  constructor() {}

  setViewType(viewType: SchedulerViewType) {
    if (viewType !== this._viewTypeSubject.value) {
      this._viewTypeSubject.next(viewType);
    }
  }

  isDayView(): boolean {
    const viewType = this._viewTypeSubject.value;
    return viewType === 'Day' || viewType === 'Week' || viewType === 'WorkWeek';
  }

  getDayViewType() {
    const viewType = this._viewTypeSubject.value;
    if (viewType === 'Day' || viewType === 'Week' || viewType === 'WorkWeek') {
      return viewType;
    }
    return 'Day';
  }
}
