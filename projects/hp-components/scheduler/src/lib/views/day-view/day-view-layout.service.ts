import { Directive, ElementRef } from '@angular/core';
import { SchedulerViewLayoutService } from '../scheduler-view-layout.service';
import { Subscription } from 'rxjs';
import { isBetween, datesOfRange } from '../../scripts/datetime';
import { isSameDay, differenceInMinutes } from 'date-fns';
import { EventItem } from '../../event-item/event-item';
import {
  IRect,
  intersectRect,
  intersectedRects,
  Rect
} from '@hp-components/common';

import { ISizingGroup } from '../scheduler-view';
import { SchedulerDateService } from '../../services/scheduler-date.service';


export class DayViewLayoutService extends SchedulerViewLayoutService {

  protected layoutEvents(): void {
    const dateRange = this.schedulerDateService.dateRange;
    const dates = datesOfRange(dateRange.start, dateRange.end);
    dates.forEach(date => this.layoutEventsByDate(date));
  }

  protected layoutEventsByDate(date: Date) {
    if (!this.eventComps || !this.eventComps.length) {
      return;
    }
    const eventComps = this.eventComps.filter(ec => isSameDay(ec.eventItem.start, date));
    if (!eventComps.length) {
      return;
    }
    const rects = [];
    const eventItems = eventComps.map(ec => ec.eventItem);
    eventItems.forEach(item => rects.push(this.rectOfEvent(item)));
    const margin = 5;
    const firstRect = rects[0];
    const containerWidth = firstRect.width - margin;
    const containerRect = new Rect(firstRect.left, firstRect.top, firstRect.width, firstRect.height);
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
    rects.forEach((rect, index) => {
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
  protected finalizeRectSize(rect: IRect, rects: IRect[], containerRect: IRect, margin: number) {
    rect.width = containerRect.width - rect.left + containerRect.left - margin;
    const ir = intersectedRects(rect, rects.filter(x => x !== rect)).sort((a, b) => a.left - b.left);
    if (ir.length > 0) {
      rect.width = ir[0].left - rect.left - margin;
    }
  }

  /**
   * Returns a group of event items and count per time slots
   *
   * @param EventItem[] The visible event items
   * @returns ISizingGroup[]
   */
  protected getSizingGroups(eventItems: EventItem[]): ISizingGroup[] {
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
        groups.push({ maxSpread: eventsInRange.length, eventItems: eventsInRange });
      } else {
        const group = groups[groups.length - 1];
        group.maxSpread = Math.max(eventsInRange.length, group.maxSpread);
        group.eventItems = Array.from(new Set([...group.eventItems, ...eventsInRange]));
      }

      return groups;
    }, []);
    return result;
  }

}
