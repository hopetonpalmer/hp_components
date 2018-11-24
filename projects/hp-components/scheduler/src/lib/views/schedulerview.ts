import { SchedulerResource } from '../models/schedulerResource';
import { Appointment } from '../models/appointment';
import { SchedulerService } from '../scheduler.service';
import { addHours } from 'date-fns';
import { ViewType } from '../types';
import { OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';



export interface ISchedulerView {
  viewType: ViewType;
  startDate: Date;
  endDate: Date;
  resources: SchedulerResource[];
  appointments: Appointment[];
}

export class SchedulerView implements ISchedulerView, OnInit, OnDestroy  {
  private _resourcesSubscription: Subscription;
  private _appointmentsSubscription: Subscription;
  startDate = new Date();
  endDate = addHours(new Date(), 24);
  viewType: ViewType = 'Day';

  private _resources: SchedulerResource[];
  set resources(value: SchedulerResource[]) {

  }
  get resources(): SchedulerResource[] {
    return this._resources;
  }

  private _appointments: Appointment[];
  set appointments(value: Appointment[]) {
    this._appointments = value;
  }
  get appointments(): Appointment[] {
    return this._appointments;
  }

  constructor(public schedulerService: SchedulerService) {}

  protected setDataSources() {
     this._resourcesSubscription = this.schedulerService.resources$.
     subscribe(resources => this.resources = resources);
     this._appointmentsSubscription = this.schedulerService.appointments$.
     subscribe(appointments => this.appointments = appointments);
  }

  ngOnInit(): void {
    this.setDataSources();
  }

  ngOnDestroy(): void {
    if (this._resourcesSubscription) {
      this._resourcesSubscription.unsubscribe();
    }
    if (this._appointmentsSubscription) {
      this._appointmentsSubscription.unsubscribe();
    }
  }
}
