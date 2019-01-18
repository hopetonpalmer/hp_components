import { Component, OnInit, QueryList, OnDestroy, ElementRef, AfterContentInit, ContentChildren,
    ChangeDetectorRef, OnChanges, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventItemComponent } from '../event-item/event-item.component';
import { EventCellDirective } from './event-cell/event-cell.directive';
import { isBetween, datesOfRange } from '../scripts/datetime';
import { addSeconds, isSameDay, differenceInMinutes } from 'date-fns';
import { EventItem } from '../event-item/event-item';
import { IRect, intersectRect, intersectedRects, Rect } from '@hp-components/common';
import { SchedulerDateService } from '../services/scheduler-date.service';
import { MinuteInterval } from '../types';



interface ISizingGroup {
  maxSpread: number;
  eventItems: EventItem[];
}

@Component({
  selector: 'hp-event-grid',
  templateUrl: './event-grid.component.html',
  styleUrls: ['./event-grid.component.css']
})
export class EventGridComponent implements OnInit, OnChanges, AfterContentInit, OnDestroy {

  private _changSubscription: Subscription;
  @ContentChildren(EventItemComponent) eventComps: QueryList<EventItemComponent>;
  @ContentChildren(EventCellDirective) eventCells: QueryList<EventCellDirective>;

  get containerRect(): ClientRect {
    return (this._host.nativeElement as HTMLElement).getBoundingClientRect();
  }

  @Input()
  minuteInterval: MinuteInterval;

  constructor(private _host: ElementRef, private _cdRef: ChangeDetectorRef, private _sds: SchedulerDateService) { }

  ngOnInit() {
  }

  getCellOfDate(date: Date): EventCellDirective {
    if (!this.eventCells) {
      return null;
    }
    const cell = this.eventCells.find(x => isBetween(x.timeSlot.startDate, addSeconds(x.timeSlot.endDate, 0), date));
    if (cell) {
      return cell;
    }
  }

  getEventRect(item: EventItem): IRect {
    const leftMargin = 1;
    let rect = { top: 0, left: 0, height: 0, width: 0 };
    const startCell = this.getCellOfDate(item.start);
    const endCell = this.getCellOfDate(item.end);
    if (!startCell && !endCell) {
      return rect;
    }
    const startRect = startCell.cellRect;
    const endRect = endCell.cellRect;
    const pixPerMinute = startRect.height / this.minuteInterval;
    const startMinutePixels = differenceInMinutes(item.start, startCell.timeSlot.startDate) * pixPerMinute;
    const endMinutePixels = differenceInMinutes(item.end, endCell.timeSlot.startDate) * pixPerMinute;
    if (startRect && endRect) {
      const parentEl = document.querySelector('.event-grid');
      const parentRect = parentEl.getBoundingClientRect();
      const top = startRect.top - parentRect.top + parentEl.scrollTop + startMinutePixels;
      const left = startRect.left - parentRect.left + parentEl.scrollLeft + leftMargin;
      const height = endRect.top - startRect.top + endMinutePixels - startMinutePixels;
      const width = startRect.width;
      rect = { top: top, left: left, width: width, height: height };
    }
    return rect;
  }

  ngAfterContentInit(): void {
    if (this.eventComps) {
      this._changSubscription = this.eventComps.changes.subscribe(r => {
        console.log(r);
          setTimeout(() => { this.layoutEvents(); }, 0);
      });
    }
    setTimeout(() => { this.layoutEvents(); }, 0);
  }

  ngOnDestroy(): void {
    this._changSubscription.unsubscribe();
  }

  ngOnChanges(): void {
    this.layoutEvents();
  }

  layoutEvents() {
    const dateRange =  this._sds.dateRange;
    const dates = datesOfRange(dateRange.start, dateRange.end);
    dates.forEach(date => this.layoutEventsByDate(date));
  }

  layoutEventsByDate(date: Date) {
    if (!this.eventComps || !this.eventComps.length) {
      return;
    }
    const eventComps = this.eventComps.filter(ec => isSameDay(ec.eventItem.start, date));
    if (!eventComps.length) {
      return;
    }
    const rects = [];
    const eventItems = eventComps.map(ec => ec.eventItem);
    eventItems.forEach(item => rects.push(this.getEventRect(item)));
    const margin = 5;
    const firstRect = rects[0];
    const containerWidth = firstRect.width - margin;
    const containerRect = new Rect(firstRect.left, firstRect.top, firstRect.width, this.containerRect.height);
    const sizingGroups = this.getSizingGroups(eventItems);

    // -- set rects initial size
    rects.forEach((rect, index) => {
      const eventItem = eventItems[index];
      const sizingGroup = sizingGroups.find(sg => sg.eventItems.indexOf(eventItem) > -1);
      if (sizingGroup) {
        rect.width = containerWidth / sizingGroup.maxSpread - margin;
      } else {
        rect.width = 0;
      }
    });

    // -- position rects
    rects.forEach((rect, index) => {
      this.positionRect(rect, index, rects, margin);
    });

    // -- set rects final size
    rects.forEach( (rect, index) => {
      this.finalizeRectSize(rect, rects, containerRect, margin);
      eventComps[index].eventRect = rect;
    });

  }

  /**
   * Final pass to fill gaps and and stretch rects if necessary
   *
   * @param IRect rect
   * @param IRect[] rects
   * @param IRect containerRect
   * @param number margin
   */
  private finalizeRectSize(rect: IRect, rects: IRect[], containerRect: IRect, margin: number) {
    rect.width = containerRect.width - rect.left + containerRect.left - margin;
    const ir = intersectedRects(rect, rects.filter(x => x !== rect));
     if (ir.length > 0) {
       rect.width = ir.sort((a, b) => a.left - b.left)[0].left - rect.left - margin;
     }
  }

  /**
   * Returns a group of event items and count per time slots
   *
   * @param EventItem[] The visible event items
   * @returns ISizingGroup[]
   */
  private getSizingGroups(eventItems: EventItem[]): ISizingGroup[] {
    let newGroup = true;
    const result = this.eventCells.reduce((groups, cell) => {
      const eventsInRange = eventItems.filter(item =>
        isBetween(
          item.start,
          item.end,
          cell.timeSlot.startDate
        )
      );
      if (eventsInRange.length === 0) {
        newGroup = true;
        return groups;
      }
      if (newGroup) {
        newGroup = false;
        groups.push({maxSpread: eventsInRange.length, eventItems: eventsInRange});
      } else {
        const group = groups[groups.length - 1];
        group.maxSpread = Math.max(eventsInRange.length, group.maxSpread);
        group.eventItems = Array.from(new Set([...group.eventItems, ...eventsInRange]));
      }

      return groups;
    }, []);
    return result;
  }

  private positionRect(rect: IRect, rectIndex: number, rects: IRect[], margin: number) {
    for (let i = 0; i < rectIndex; i++) {
      const nextRect = rects[i];
      if (nextRect.width === 0) {
        continue;
      }
      if (intersectRect(rect, nextRect)) {
        rect.left = nextRect.left + nextRect.width + margin;
        this.positionRect(rect, rectIndex, rects, margin);
      }
    }
  }




  // private getOverlaps(rect: )
}
