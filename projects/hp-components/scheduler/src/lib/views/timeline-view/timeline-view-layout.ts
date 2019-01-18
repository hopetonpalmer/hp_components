import { ElementRef, Injectable, Self } from '@angular/core';
import { SchedulerViewLayoutService } from '../scheduler-view-layout.service';
import { SchedulerDateService } from '../../services/scheduler-date.service';
import { EventCellDirective } from '../../event-grid/event-cell/event-cell.directive';

@Injectable()
export class TimelineViewLayout extends SchedulerViewLayoutService {

  constructor(@Self() protected host: ElementRef, protected schedulerDateService: SchedulerDateService) {
    super(host, schedulerDateService);
  }

  protected layoutEvents(): void {
    if (!this.eventComps || !this.eventComps.length) {
      return;
    }
    const eventComps = this.eventComps.toArray();
    const rects = [];
    const eventItems = eventComps.map(ec => ec.eventItem);
    eventItems.forEach(item => rects.push(this.rectOfEvent(item)));
    const margin = 5;

    // -- position rects
    rects.forEach((rect, index) => {
      this.positionRect(rect, index, rects, margin);
      eventComps[index].eventRect = rect;
    });
  }
}
