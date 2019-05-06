import { Injectable, QueryList, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { EventCellDirective } from './event-cell.directive';
import { Point, pointInRect, IRect, Rect } from '@hp-components/common';
import { SchedulerDateService } from '../../services/scheduler-date.service';
import { Orientation } from '@hp-components/common-src';
import { subDays, closestTo, closestIndexTo } from 'date-fns';

@Injectable()
export class EventCellService implements OnDestroy {
  private schedulerDateSubscription: Subscription;
  eventCells: EventCellDirective[] = [];

  /**
   *
   */
  constructor(private schedulerDateService: SchedulerDateService) {
    this.schedulerDateSubscription = this.schedulerDateService.schedulerDates$.subscribe(
      () => {
        this.clearEventCells();
      }
    );
  }

  setEventCells(value: QueryList<EventCellDirective>) {
    const list = [...this.eventCells, ...value.toArray()];
    this.eventCells = list;
  }

  cellAtPos(point: Point,  eventCells = this.eventCells): EventCellDirective {
    const cell = eventCells.find(x => {
        const rect = this.getRect(x.cellRect);
        return pointInRect(point, rect);
      }
    );
    return cell;
  }

  cellInPos(points: Point[], eventCells = this.eventCells): EventCellDirective {
     let cell = null;
     for (let index = 0; index < points.length; index++) {
       const point = points[index];
       cell = this.cellAtPos(point, eventCells);
       if (cell) {
         break;
       }
     }
     return cell;
  }

  cellInNudgedPos(point: Point, orientation: Orientation, eventCells = this.eventCells): EventCellDirective {
    if (orientation === 'vertical') {
       return this.cellInPos([point, new Point(point.x, point.y + 1), new Point(point.x, point.y - 1)]);
    }
    return this.cellInPos([
      point,
      new Point(point.x + 1, point.y),
      new Point(point.x - 1, point.y)
    ]);
  }

  cellOfDate(date: Date, eventCells = this.eventCells): EventCellDirective {
      const dates = this.eventCells.map(c => c.timeSlot.startDate);
      const closestIndex = closestIndexTo(date, dates);
      const cell = eventCells[closestIndex];
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


