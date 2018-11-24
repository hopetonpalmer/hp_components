import { Component, OnInit } from '@angular/core';
import { SchedulerView } from '../schedulerview';
import { SchedulerService } from '../../scheduler.service';

@Component({
  selector: 'hp-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.css']
})
export class DayViewComponent extends SchedulerView implements OnInit {

  constructor(public schedulerService: SchedulerService) {
    super(schedulerService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
