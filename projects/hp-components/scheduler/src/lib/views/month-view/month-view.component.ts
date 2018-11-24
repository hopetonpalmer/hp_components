import { Component, OnInit } from '@angular/core';
import { SchedulerView } from '../schedulerview';
import { SchedulerService } from '../../scheduler.service';

@Component({
  selector: 'hp-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.css']
})
export class MonthViewComponent extends SchedulerView implements OnInit {

  constructor(public schedulerService: SchedulerService) {
    super(schedulerService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
