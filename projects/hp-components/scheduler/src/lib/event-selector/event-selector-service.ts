import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class EventSelectorService {
  private _eventSelectorNotifySubject = new Subject<EventSelectorNotifyEvent>();
  notify$ = this._eventSelectorNotifySubject.asObservable();

  private _isActive = false;
  get isActive(): boolean {
    return this._isActive;
  }

  setActive(value: boolean) {
    this._isActive = value;
    this._eventSelectorNotifySubject.next({type: 'active', data: value});
  }

  dropEvent(e: PointerEvent) {
    this._eventSelectorNotifySubject.next({type: 'drop', data: e});
  }


}

export interface EventSelectorNotifyEvent {
   type: EventSelectorNotifyType;
   data: any;
}

export type EventSelectorNotifyType = 'active' | 'drop';

