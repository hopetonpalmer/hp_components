import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SchedulerViewType } from 'hp-components/scheduler/lib/types';

@Injectable()
export class EventSelectorService {
  adjustForMouseOffsetOnDrag = false;

  private _eventSelectorNotifySubject = new Subject<EventSelectorNotifyEvent>();
  notify$ = this._eventSelectorNotifySubject.asObservable();

  private _isActive = false;
  get isActive(): boolean {
    return this._isActive;
  }

  setActive(value: boolean) {
    this._isActive = value;
    this._eventSelectorNotifySubject.next({ type: 'active', data: value });
  }

  dropEvent(e: PointerEvent) {
    this._eventSelectorNotifySubject.next({ type: 'drop', data: e });
  }

  setSelectionSettings(viewType: SchedulerViewType) {
    switch (viewType) {
      case 'Timeline':
        this.adjustForMouseOffsetOnDrag = true;
        break;
      default:
        this.adjustForMouseOffsetOnDrag = false;
    }
  }
}

export interface EventSelectorNotifyEvent {
   type: EventSelectorNotifyType;
   data: any;
}

export type EventSelectorNotifyType = 'active' | 'drop';

