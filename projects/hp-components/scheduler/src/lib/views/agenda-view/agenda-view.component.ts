import { Component, OnInit } from '@angular/core';
import { SchedulerView } from '../schedulerview';
import { SchedulerService } from '../../scheduler.service';

@Component({
  selector: 'hp-agenda-view',
  templateUrl: './agenda-view.component.html',
  styleUrls: ['./agenda-view.component.css']
})
export class AgendaViewComponent extends SchedulerView implements OnInit {

  constructor(public schedulerService: SchedulerService) {
    super(schedulerService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
