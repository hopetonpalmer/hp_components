import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { SchedulerService } from './services/scheduler.service';
import { Appointment } from './models';
import { SchedulerViewType, DayViewType, MinuteInterval } from './types';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { SchedulerViewService } from './views/scheduler-view.service';

@Component({
  selector: 'hp-scheduler',
  template: `
    <hp-toolbar style="height: 50px"></hp-toolbar>
    <hp-day-view *ngIf="isDayView"
      [customDays]="customDays"
      [minuteInterval]="minuteInterval"
      [dayViewType]="dayViewType"
      [firstDayOfWeek]="firstDayOfMonth">
    </hp-day-view>
    <hp-month-view *ngIf="viewType === 'Month'"></hp-month-view>
    <hp-timeline-view *ngIf="viewType === 'Timeline'"></hp-timeline-view>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
    `
  ]
})
export class HpSchedulerComponent implements OnInit, OnDestroy {
  private _viewTypeSubscription: Subscription;

  /**
   * Emits a SchedulerViewType change event
   */
  @Output()
  viewTypeChange = new EventEmitter<SchedulerViewType>();
  private _viewType: SchedulerViewType = 'Day';
  @Input()
  set viewType(value: SchedulerViewType) {
    if (this._viewType !== value) {
      this._viewType = value;
      this.viewTypeChange.next(value);
    }
  }

  get viewType(): SchedulerViewType {
    return this._viewType;
  }

  get dayViewType(): DayViewType {
    return this._schedulerViewService.getDayViewType();
  }

  @Input()
  firstDayOfMonth = 0;

  @Input()
  customDays = [0, 1, 2, 3, 4, 5, 6];

  @Input()
  minuteInterval: MinuteInterval = 15;

  get isDayView(): boolean {
    return this._schedulerViewService.isDayView();
  }

  constructor(private _schedulerViewService: SchedulerViewService) {}

  ngOnInit() {
    this._viewTypeSubscription = this._schedulerViewService.viewType$.subscribe(
      viewType => {
        this.viewType = viewType;
      }
    );
    /*     this._schedulerService.addAppointment(new Appointment());
    this._schedulerService.addAppointment(new Appointment());
    this._schedulerService.addAppointment(new Appointment());
    this._schedulerService.addAppointment(new Appointment()); */
  }

  ngOnDestroy(): void {
    this._viewTypeSubscription.unsubscribe();
  }
}
