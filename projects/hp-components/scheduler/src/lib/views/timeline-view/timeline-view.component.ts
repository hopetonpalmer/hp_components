import { Component, OnInit } from '@angular/core';
import { SchedulerService } from '../../services/scheduler.service';
import { SchedulerView } from '../scheduler-view';
import { SchedulerViewService } from '../scheduler-view.service';

@Component({
  selector: 'hp-timeline-view',
  templateUrl: './timeline-view.component.html',
  styleUrls: ['./timeline-view.component.css', '../../styles.css']
})
export class TimelineViewComponent extends SchedulerView implements OnInit {

  constructor(public schedulerViewService: SchedulerViewService,
     public schedulerService: SchedulerService) {
    super(schedulerService, schedulerViewService);
  }

  ngOnInit() {
    this.dateFormats['day'] = 'EEE dd';
    this.intervalTypes = ['Month', 'Day'];
    super.ngOnInit();
  }
}
