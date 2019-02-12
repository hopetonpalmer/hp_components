import { Component, OnInit, Input, ChangeDetectionStrategy,
    ElementRef, Optional, ChangeDetectorRef } from '@angular/core';
import { SchedulerService } from '../../services/scheduler.service';
import { SchedulerView } from '../scheduler-view';
import { SchedulerViewService } from '../scheduler-view.service';
import { SchedulerDateService } from '../../services/scheduler-date.service';
import { TimeSlotService } from '../../time-slot/time-slot.service';
import { Orientation, IRect } from '@hp-components/common';
import { SchedulerEventService } from '../../services/scheduler-event.service';
import { ColorSchemeService } from '../../color-scheme/color-scheme.service';


@Component({
  selector: 'hp-timeline-view',
  templateUrl: './timeline-view.component.html',
  styleUrls: ['../../styles.css', './timeline-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineViewComponent extends SchedulerView {
  protected maxDays = 1;

  eventHeight = 40;

  protected orientation: Orientation = 'horizontal';

  @Input()
  isAllDay = false;

  constructor(
    public schedulerService: SchedulerService,
    public schedulerViewService: SchedulerViewService,
    public schedulerDateService: SchedulerDateService,
    public schedulerEventService: SchedulerEventService,
    public timeSlotService: TimeSlotService,
    public colorSchemeService: ColorSchemeService,
    protected elRef: ElementRef,
    protected cdRef: ChangeDetectorRef
  ) {
    super(
      schedulerService,
      schedulerViewService,
      schedulerDateService,
      schedulerEventService,
      timeSlotService,
      colorSchemeService,
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
      this.setViewHeight([], 0);
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

  protected dateRangeChanged() {
    this.cdRef.markForCheck();
  }
}
