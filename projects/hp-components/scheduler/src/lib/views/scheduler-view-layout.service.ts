import { OnInit, QueryList, OnDestroy, ElementRef, Input, Injectable
} from '@angular/core';
import { Subscription } from 'rxjs';
import { EventItemComponent } from '../event-item/event-item.component';
import { EventCellDirective } from '../event-grid/event-cell/event-cell.directive';
import { isBetween } from '../scripts/datetime';
import { addSeconds, differenceInMinutes } from 'date-fns';
import { EventItem } from '../event-item/event-item';
import { IRect, intersectRect, Orientation } from '@hp-components/common';
import { SchedulerDateService } from '../services/scheduler-date.service';
import { MinuteInterval } from '../types';

@Injectable()
export abstract class SchedulerViewLayoutService implements OnInit, OnDestroy {

  private _changSubscription: Subscription;
  eventComps: QueryList<EventItemComponent>;
  eventCells: QueryList<EventCellDirective>;

  get containerRect(): ClientRect {
    return (this.host.nativeElement as HTMLElement).getBoundingClientRect();
  }

  @Input()
  minuteInterval: MinuteInterval;

  @Input()
  fixedHeight = 30;

  @Input()
  orientation: Orientation;

  constructor(protected host: ElementRef, protected schedulerDateService: SchedulerDateService) { }

  ngOnInit() {
  }


  ngOnDestroy(): void {
    this._changSubscription.unsubscribe();
  }


  protected cellOfDate(date: Date): EventCellDirective {
    if (!this.eventCells || !this.eventCells.length) {
      return null;
    }
    if (date < this.eventCells.first.timeSlot.startDate) {
      return this.eventCells.first;
    }
    if (date > this.eventCells.last.timeSlot.endDate) {
      return this.eventCells.last;
    }
    const cell = this.eventCells.find(x => isBetween(x.timeSlot.startDate, addSeconds(x.timeSlot.endDate, 0), date));
    if (cell) {
      return cell;
    }
  }

  protected rectOfEvent(item: EventItem): IRect {
    const indent = 1;
    let top = 0;
    let left = 0;
    let height = 0;
    let width = 0;
    let rect = { top: top, left: left, height: height, width: width };
    const startCell = this.cellOfDate(item.start);
    let endCell = this.cellOfDate(item.end);
    if (!startCell && !endCell) {
      return rect;
    }

    if (endCell !== this.eventCells.last &&
       startCell &&
       startCell.intervalType !== 'Minute' && startCell.intervalType !== 'Hour') {
      const cells = this.eventCells.toArray();
      endCell = cells[cells.indexOf(endCell) + 1];
    }

    const startRect = startCell.cellRect;
    const endRect = endCell.cellRect;
    if (startRect && endRect) {
      const pixPerMinute = (this.orientation === 'vertical' ? startRect.height : startRect.width) / this.minuteInterval;
      let startMinutePixels = 0;
      let endMinutePixels = 0;
      const intervalType = startCell.intervalType;
      if (intervalType === 'Minute' && startCell !== this.eventCells.first && endCell !== this.eventCells.last  ) {
        startMinutePixels = differenceInMinutes(item.start, startCell.timeSlot.startDate) * pixPerMinute;
        endMinutePixels = differenceInMinutes(item.end, endCell.timeSlot.startDate) * pixPerMinute;
      }
      const parentEl = this.host.nativeElement;
      const parentRect = this.containerRect;
      if (this.orientation === 'vertical') {
        top = startRect.top - parentRect.top + parentEl.scrollTop + startMinutePixels;
        left = startRect.left - parentRect.left + parentEl.scrollLeft + indent;
        height = (item.end > this.eventCells.last.timeSlot.endDate ? endRect.top + endRect.height : endRect.top)
         - startRect.top + endMinutePixels - startMinutePixels;
        width = startRect.width;
      } else {
        top = startRect.top + parentEl.scrollTop + indent ;
        left = startRect.left - parentRect.left + parentEl.scrollLeft + startMinutePixels;
        height = this.fixedHeight;
        width = (item.end > this.eventCells.last.timeSlot.endDate ? endRect.left + endRect.width + 2 : endRect.left) - startRect.left;
        if (intervalType !== 'Minute' && width === 0 ) {
          width = startRect.width;
        }
        width = width + endMinutePixels - startMinutePixels;
      }
      rect = { top: top, left: left, width: width, height: height };
    }
    return rect;
  }
  protected abstract layoutEvents(): void;

  protected positionRect(rect: IRect, rectIndex: number, rects: IRect[], margin: number) {
    for (let i = 0; i < rectIndex; i++) {
      const nextRect = rects[i];
      if (nextRect.width === 0) {
        continue;
      }
      if (intersectRect(rect, nextRect)) {
        if (this.orientation === 'vertical') {
          rect.left = nextRect.left + nextRect.width + margin;
        } else {
          rect.top = nextRect.top + nextRect.height + margin;
        }
        this.positionRect(rect, rectIndex, rects, margin);
      }
    }
  }
}


