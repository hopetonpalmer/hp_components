import { Component, OnInit } from '@angular/core';
import { SchedulerService } from '../../scheduler.service';
import { SchedulerView } from '../schedulerview';

@Component({
  selector: 'hp-timeline-view',
  templateUrl: './timeline-view.component.html',
  styleUrls: ['./timeline-view.component.css']
})
export class TimelineViewComponent extends SchedulerView implements OnInit {

  intervalTypes = ['Day', 'Hour', 'Minute'];
  constructor(public schedulerService: SchedulerService) {
    super(schedulerService);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
