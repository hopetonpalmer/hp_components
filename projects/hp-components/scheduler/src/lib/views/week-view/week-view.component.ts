import { Component, OnInit } from '@angular/core';
import { SchedulerService } from '../../scheduler.service';
import { SchedulerView } from '../schedulerview';

@Component({
  selector: 'hp-week-view',
  templateUrl: './week-view.component.html',
  styleUrls: ['./week-view.component.css']
})
export class WeekViewComponent extends SchedulerView implements OnInit {
  constructor(public schedulerService: SchedulerService) {
    super(schedulerService);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
