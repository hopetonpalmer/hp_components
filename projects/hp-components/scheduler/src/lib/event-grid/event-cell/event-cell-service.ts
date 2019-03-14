import { Injectable, QueryList, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { EventCellDirective } from './event-cell.directive';
import { Point, pointInRect, IRect, Rect } from '@hp-components/common';
import { SchedulerDateService } from '../../services/scheduler-date.service';

@Injectable()
export class EventCellService implements OnDestroy {
  private schedulerDateSubscription: Subscription;
  eventCells: EventCellDirective[] = [];

  /**
   *
   */
  constructor(private schedulerDateService: SchedulerDateService) {
    this.schedulerDateSubscription = this.schedulerDateService.schedulerDates$.subscribe(() => {
      this.clearEventCells();
    });
  }

  setEventCells(value: QueryList<EventCellDirective>) {
    const list = [...this.eventCells, ...value.toArray()];
    this.eventCells = list;
  }

  cellAtPos(point: Point, eventCells = this.eventCells): EventCellDirective {
    const cell = eventCells.find(x => pointInRect(point, this.getRect(x.cellRect)));
    return cell;
  }

  getRect(r: IRect): Rect {
    return new Rect(r.left, r.top, r.width, r.height);
  }

  clearEventCells() {
    this.eventCells = [];
  }

  ngOnDestroy(): void {
    this.schedulerDateSubscription.unsubscribe();
  }
}


