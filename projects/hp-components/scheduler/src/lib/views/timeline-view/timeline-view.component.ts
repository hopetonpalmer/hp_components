import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { SchedulerService } from '../../services/scheduler.service';
import { SchedulerView } from '../scheduler-view';
import { SchedulerViewService } from '../scheduler-view.service';
import { TimeSlot } from '../../time-slot/time-slot';
import { addDays } from 'date-fns';
import { SchedulerDateService } from '../../services/scheduler-date.service';


@Component({
  selector: 'hp-timeline-view',
  templateUrl: './timeline-view.component.html',
  styleUrls: ['../../styles.css', './timeline-view.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TimelineViewComponent extends SchedulerView {
  protected maxDays = 1;

  constructor(
    public schedulerService: SchedulerService,
    public schedulerViewService: SchedulerViewService,
    public schedulerDateService: SchedulerDateService,
  ) {super(schedulerService, schedulerViewService, schedulerDateService); }

  protected setViewDefaults() {
    this.dateFormats['day'] = 'EEEE, MMMM dd, yyyy';
    this.dateFormats['hour'] = 'ha';
    // this.dateFormats['minute'] = 'h:mma';
    this.intervalTypes = ['Day', 'Hour', 'Minute'];
    this.minuteInterval = 30;
  }
}
