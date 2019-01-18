import { Component, OnInit, Input, ChangeDetectionStrategy,
   ContentChildren, TemplateRef, QueryList, AfterContentInit, ViewChildren, AfterViewInit, ElementRef, Optional } from '@angular/core';
import { SchedulerService } from '../../services/scheduler.service';
import { SchedulerView } from '../scheduler-view';
import { SchedulerViewService } from '../scheduler-view.service';
import { SchedulerDateService } from '../../services/scheduler-date.service';
import { TimeSlotService } from '../../time-slot/time-slot.service';
import { EventCellDirective } from '../../event-grid/event-cell/event-cell.directive';
import { Orientation, IRect } from '@hp-components/common';
import { EventItem } from '../../event-item/event-item';
import { addDays } from 'date-fns';
import { SchedulerEventService } from '../../services/scheduler-event.service';


@Component({
  selector: 'hp-timeline-view',
  templateUrl: './timeline-view.component.html',
  styleUrls: ['../../styles.css', './timeline-view.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TimelineViewComponent extends SchedulerView {
  protected maxDays = 1;

  eventHeight = 22;

  protected orientation: Orientation = 'horizontal';

  constructor(
    public schedulerService: SchedulerService,
    public schedulerViewService: SchedulerViewService,
    public schedulerDateService: SchedulerDateService,
    public schedulerEventService: SchedulerEventService,
    public timeSlotService: TimeSlotService,
    protected elRef: ElementRef
  ) {
    super(
      schedulerService,
      schedulerViewService,
      schedulerDateService,
      schedulerEventService,
      timeSlotService,
      elRef
    );
  }

  protected setViewDefaults() {
    this.dateFormats['day'] = 'EEEE, MMMM dd, yyyy';
    this.dateFormats['hour'] = 'ha';
    // this.dateFormats['minute'] = 'h:mma';
    this.intervalTypes = ['Day', 'Hour', 'Minute'];
    this.minuteInterval = 30;
  }

  protected layoutEvents(): void {
    if (!this.eventComps || !this.eventComps.length) {
      return;
    }
    const eventComps = this.eventComps.toArray();
    const rects = [];
    const eventItems = eventComps.map(ec => ec.eventItem);
    eventItems.forEach(item => rects.push(this.rectOfEvent(item)));
    const margin = 2;

    // -- position rects
    rects.forEach((rect, index) => {
      this.positionRect(rect, index, rects, margin);
      const eventComp = eventComps[index];
      eventComp.displayStart = this.dateRange.start > eventComp.eventItem.start ? this.dateRange.start : eventComp.eventItem.start;
      eventComp.displayEnd = this.dateRange.end < eventComp.eventItem.end ? this.dateRange.end : eventComp.eventItem.end;
      eventComp.eventRect = rect;
    });

    this.setViewHeight(rects, margin);
  }
}
