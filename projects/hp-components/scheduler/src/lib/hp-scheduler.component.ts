import { Component, OnInit } from '@angular/core';
import { SchedulerService } from './scheduler.service';
import { Appointment } from './models';
import { addHours, addDays, startOfWeek, endOfWeek } from 'date-fns';

@Component({
  selector: 'hp-scheduler',
  template: `
      <hp-timeline-view></hp-timeline-view>
  `,
  styles: []
})
export class HpSchedulerComponent implements OnInit {

  constructor(private _schedulerService: SchedulerService) { }

  ngOnInit() {
/*     this._schedulerService.addAppointment(new Appointment());
    this._schedulerService.addAppointment(new Appointment());
    this._schedulerService.addAppointment(new Appointment());
    this._schedulerService.addAppointment(new Appointment()); */
  }

}
