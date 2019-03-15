import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { EventItem } from '../event-item/event-item';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { addHours, addMinutes } from 'date-fns';
import { DateRange, NotifyEvent } from '../types';
import { ISchedulerItem } from '../interfaces/i-scheduler-item';
import { deepEqual } from 'assert';
import { isEqual } from 'lodash';
import { DropEventItemArgs as MoveEventItemArgs, CancellableArgs } from '../event-args';

@Injectable()
export class SchedulerEventService {
  private _preEditedItem: EventItem;
  private _eventItemsSubject = new BehaviorSubject<EventItem[]>([]);
  eventItems$ = this._eventItemsSubject.asObservable();

  private _selectedEventsSubject = new BehaviorSubject<EventItem[]>([]);
  selectedEvents$ = this._selectedEventsSubject.asObservable();

  private _editEventItemSubject = new Subject<EventItem>();
  editEventItem$ = this._editEventItemSubject.asObservable();

  private _deleteEventItemSubject = new Subject<EventItem>();
  deleteEventItem$ = this._deleteEventItemSubject.asObservable();

  private _confirmDeleteEventItemSubject = new Subject<CancellableArgs>();
  confirmDeleteEventItem$ = this._confirmDeleteEventItemSubject.asObservable();

  private _saveEventItemSubject = new Subject<EventItem>();
  saveEventItem$ = this._saveEventItemSubject.asObservable();

  private _eventMovedSubject = new Subject<MoveEventItemArgs>();
  eventMoved$ = this._eventMovedSubject.asObservable();

  private _notifySubject = new Subject<NotifyEvent>();
  notify$ = this._notifySubject.asObservable();

  private _rescheduleEventItemSubject = new Subject<{
    oldEvent: EventItem;
    newEvent: EventItem;
    currentEvents: EventItem[];
  }>();
  rescheduleEventItem$ = this._rescheduleEventItemSubject.asObservable();

  constructor() {}

  getEventItems(): EventItem[] {
    return this._eventItemsSubject.value;
  }

  addEventItem(eventItem: EventItem) {
    this._eventItemsSubject.next([
      ...this._eventItemsSubject.value,
      ...[eventItem]
    ]);
    this._notifySubject.next('Add');
  }

  addEventItems(eventItems: EventItem[]) {
    this._eventItemsSubject.next(eventItems);
    this._notifySubject.next('Add');
  }

  deleteEventItem(eventItem: EventItem = null) {
    if (!eventItem) {
      const items = this.getSelectedEventItems();
      if (items.length) {
        eventItem = items[0];
      }
    }
    if (!eventItem) {
      return;
    }

/*     const confirmArgs = { cancel: false, data: eventItem };
    this._confirmDeleteEventItemSubject.next(confirmArgs);
    if (confirmArgs.cancel) {
       return;
    } */
    this._deleteEventItemSubject.next(eventItem);
    this.unSelectEventItem(eventItem);
    const eventItems = this._eventItemsSubject.value;
    eventItems.splice(eventItems.indexOf(eventItem), 1);
    this._eventItemsSubject.next(eventItems);
    this._notifySubject.next('Delete');
  }

  editEventItem(eventItem: EventItem) {
    this._preEditedItem = Object.assign({}, eventItem);
    this._editEventItemSubject.next(eventItem);
    this._notifySubject.next('Edit');
  }

  saveEventItem(eventItem: EventItem) {
    const pei = this._preEditedItem;
    if (pei && (pei.start !== eventItem.start || pei.end !== eventItem.end)) {
/*       this._rescheduleEventItemSubject.next({
        eventItem: eventItem,
        oldDates: pei.dateRange,
        newDates: eventItem.dateRange
      }); */
    }
    this._saveEventItemSubject.next(eventItem);
    this._notifySubject.next('Save');
  }
  getSelectedEventItems(): EventItem[] {
    return this._selectedEventsSubject.value;
  }

  selectEventItem(eventItem: EventItem) {
    this._selectedEventsSubject.next([eventItem]);
    this._notifySubject.next('Selected');
    console.log('event selected!');
  }

  selectEventItems(eventItems: EventItem[]) {
    this._selectedEventsSubject.next(eventItems);
    this._notifySubject.next('Selected');
  }

  unSelectEventItem(eventItem: EventItem) {
    const eventItems = this._selectedEventsSubject.value;
    eventItems.splice(eventItems.indexOf(eventItem), 1);
    this._selectedEventsSubject.next(eventItems);
    this._notifySubject.next('Selected');
    console.log('event unselected!');
  }

  unSelectAll() {
    this._selectedEventsSubject.next([]);
    this._notifySubject.next('Selected');
  }

  selectAll() {
    this._selectedEventsSubject.next(this.getEventItems());
    this._notifySubject.next('Selected');
  }

  isEventSelected(eventItem: EventItem): boolean {
    const result = this.getSelectedEventItems().indexOf(eventItem) > -1;
    return result;
  }

  rescheduleEvent(eventItem: EventItem, startDate: Date, endDate: Date = null, isAllDay = false) {
    if (!endDate) {
      endDate = addMinutes(startDate, eventItem.durationMinutes);
    }
    const newEvent = Object.assign(new EventItem(), eventItem);
    newEvent.start = startDate;
    newEvent.end = endDate;
    newEvent.isAllDay = isAllDay;
    if (!isEqual(newEvent, eventItem)) {
      this.replaceEvent(eventItem, newEvent, false);
      this._rescheduleEventItemSubject.next({oldEvent: eventItem, newEvent: newEvent, currentEvents: this.getEventItems()});
    }
  }

  moveEventItem(moveEventArgs: MoveEventItemArgs) {
    this._eventMovedSubject.next(moveEventArgs);
    console.log('moved!');
  }

  private replaceEvent(oldEvent: EventItem, newEvent: EventItem, notify = true) {
      const events = this.getEventItems();
      events.splice(events.indexOf(oldEvent), 1, newEvent);
      if (notify) {
        this._eventItemsSubject.next(events);
      }
  }
}


