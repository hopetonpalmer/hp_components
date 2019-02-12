import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { SchedulerViewType } from '../types';
import { SchedulerViewService } from '../views/scheduler-view.service';
import { SchedulerDateService } from '../services/scheduler-date.service';
import { SchedulerEventService } from '../services/scheduler-event.service';

@Component({
  selector: 'hp-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Input()
  dateNavigationTemplate: TemplateRef<any>;

  @Input()
  viewTypeNavigationTemplate: TemplateRef<any>;

  constructor(private schedulerViewService: SchedulerViewService,
    private schedulerEventService: SchedulerEventService,
    private dateService: SchedulerDateService) { }

  ngOnInit() {
  }

  setViewType(viewType: SchedulerViewType) {
    this.schedulerViewService.setViewType(viewType);
  }

  gotoToday() {
    this.dateService.gotoToday();
  }

  gotoNextDate() {
    this.dateService.gotoNextDate();
  }
  gotoPreviousDate() {
    this.dateService.gotoPreviousDate();
  }

  createEvent() {}
  editEvent() {}
  deleteEvent() {}
  deleteAllEvents() {}
}
