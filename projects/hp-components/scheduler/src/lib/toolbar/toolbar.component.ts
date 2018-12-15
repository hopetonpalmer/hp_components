import { Component, OnInit } from '@angular/core';
import { SchedulerViewType } from '../types';
import { SchedulerViewService } from '../views/scheduler-view.service';

@Component({
  selector: 'hp-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private _schedulerViewService: SchedulerViewService) { }

  ngOnInit() {
  }

  setViewType(viewType: SchedulerViewType) {
    this._schedulerViewService.setViewType(viewType);
  }
}
