import { Injectable } from '@angular/core';
import { SchedulerViewType } from '../types';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TimeSlotService } from '../time-slot/time-slot.service';
import { SchedulerEventService } from '../services/scheduler-event.service';


@Injectable()
export class SchedulerViewService {
  private _viewTypeSubject = new BehaviorSubject<SchedulerViewType>('Day');
  viewType$ = this._viewTypeSubject.asObservable();

  private _startDateRequestSubject = new Subject<Date>();
  startDateUpdateRequest$ = this._startDateRequestSubject.asObservable();

  private _invalidateViewSubject = new Subject<Event>();
  invalidateView$ = this._invalidateViewSubject.asObservable();
  constructor(private _timeSlotService: TimeSlotService,
     private _schedulerEventService: SchedulerEventService) {}

  getActiveViewType(): SchedulerViewType {
     return this._viewTypeSubject.value;
  }

  setViewType(viewType: SchedulerViewType) {
    if (viewType !== this._viewTypeSubject.value) {
      this.clearSelection();
      this._viewTypeSubject.next(viewType);
    }
  }

  clearSelection() {
    this._timeSlotService.clearSlotSelection();
    this._schedulerEventService.unSelectAll();
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

  invalidateView(data: any = null) {
    this._invalidateViewSubject.next(data);
  }

}
