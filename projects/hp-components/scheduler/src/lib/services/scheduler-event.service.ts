import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { EventItem } from '../event-item/event-item';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { addHours } from 'date-fns';
import { DateRange } from '../types';

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

  private _saveEventItemSubject = new Subject<EventItem>();
  saveEventItem$ = this._saveEventItemSubject.asObservable();

  private _rescheduleEventItemSubject = new Subject<{
    eventItem: EventItem;
    oldDates: DateRange;
    newDates: DateRange;
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
  }

  addEventItems(eventItems: EventItem[]) {
    this._eventItemsSubject.next(eventItems);
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
    this._deleteEventItemSubject.next(eventItem);
    const eventItems = this._eventItemsSubject.value;
    eventItems.splice(eventItems.indexOf(eventItem), 1);
    this.unSelectEventItem(eventItem);
    this._eventItemsSubject.next(eventItems);
  }

  editEventItem(eventItem: EventItem) {
    this._preEditedItem = Object.assign({}, eventItem);
    this._editEventItemSubject.next(eventItem);

    eventItem.subject = 'This one was edited!';
    eventItem.end = addHours(eventItem.end, 2);
    this.saveEventItem(eventItem);
  }

  saveEventItem(eventItem: EventItem) {
    const pei = this._preEditedItem;
    if (pei && (pei.start !== eventItem.start || pei.end !== eventItem.end)) {
      this._rescheduleEventItemSubject.next({
        eventItem: eventItem,
        oldDates: pei.dateRange,
        newDates: eventItem.dateRange
      });
    }
    this._saveEventItemSubject.next(eventItem);
  }
  getSelectedEventItems(): EventItem[] {
    return this._selectedEventsSubject.value;
  }

  selectEventItem(eventItem: EventItem) {
    this._selectedEventsSubject.next([eventItem]);
  }

  selectEventItems(eventItems: EventItem[]) {
    this._selectedEventsSubject.next(eventItems);
  }

  unSelectEventItem(eventItem: EventItem) {
    const eventItems = this._selectedEventsSubject.value;
    eventItems.splice(eventItems.indexOf(eventItem), 1);
    this._selectedEventsSubject.next(eventItems);
  }

  unSelectAll() {
    this._selectedEventsSubject.next([]);
  }

  selectAll() {
    this._selectedEventsSubject.next(this.getEventItems());
  }

  isEventSelected(eventItem: EventItem): boolean {
    const result = this.getSelectedEventItems().indexOf(eventItem) > -1;
    return result;
  }
}
