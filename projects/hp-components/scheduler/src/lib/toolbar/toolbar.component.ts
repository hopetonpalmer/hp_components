import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { SchedulerViewType } from '../types';
import { SchedulerViewService } from '../views/scheduler-view.service';
import { SchedulerDateService } from '../services/scheduler-date.service';

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

  constructor(private _schedulerViewService: SchedulerViewService, private _dateService: SchedulerDateService) { }

  ngOnInit() {
  }

  setViewType(viewType: SchedulerViewType) {
    this._schedulerViewService.setViewType(viewType);
  }

  gotoToday() {
    this._dateService.gotoToday();
  }

  gotoNextDate() {
    this._dateService.gotoNextDate();
  }
  gotoPreviousDate() {
    this._dateService.gotoPreviousDate();
  }
}
