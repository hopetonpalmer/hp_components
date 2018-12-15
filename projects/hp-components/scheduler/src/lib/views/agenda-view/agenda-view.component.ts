import { Component, OnInit } from '@angular/core';
import { SchedulerView } from '../scheduler-view';
import { SchedulerService } from '../../services/scheduler.service';
import { SchedulerViewService } from '../scheduler-view.service';

@Component({
  selector: 'hp-agenda-view',
  templateUrl: './agenda-view.component.html',
  styleUrls: ['./agenda-view.component.css']
})
export class AgendaViewComponent extends SchedulerView implements OnInit {

  constructor(public schedulerViewService: SchedulerViewService,
     public schedulerService: SchedulerService) {
    super(schedulerService, schedulerViewService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
