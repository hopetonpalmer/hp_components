import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { SchedulerService } from './services/scheduler.service';
import { SchedulerViewType, MinuteInterval } from './types';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { SchedulerViewService } from './views/scheduler-view.service';
import { SchedulerDateService, ISchedulerDateSettings } from './services/scheduler-date.service';
import { SlotSelectionService } from './services/slot-selection.service';

@Component({
  selector: 'hp-scheduler',
  template: `
    <hp-toolbar style="height: 50px"></hp-toolbar>
    <hp-day-view
      *ngIf="viewType === 'Day'"
      [minuteInterval]="minuteInterval"
    ></hp-day-view>
    <hp-week-view
      *ngIf="viewType === 'Week'"
      [minuteInterval]="minuteInterval"
    ></hp-week-view>
    <hp-work-week-view
      *ngIf="viewType === 'WorkWeek'"
      [minuteInterval]="minuteInterval"
    ></hp-work-week-view>
    <hp-month-view *ngIf="viewType === 'Month'"></hp-month-view>
    <hp-timeline-view
      *ngIf="viewType === 'Timeline'"
      [minuteInterval]="15"
    ></hp-timeline-view>
    <hp-timeline-week-view
      *ngIf="viewType === 'TimelineWeek'"
    ></hp-timeline-week-view>
    <hp-timeline-month-view
      *ngIf="viewType === 'TimelineMonth'"
    ></hp-timeline-month-view>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        user-select: none;
      }
    `
  ],
  providers: [SchedulerDateService, SchedulerViewService, SlotSelectionService]
})
export class HpSchedulerComponent implements OnInit, OnDestroy {
  private _viewTypeSubscription: Subscription;

  /**
   * Emits a SchedulerViewType change event
   */
  @Output()
  viewTypeChange = new EventEmitter<SchedulerViewType>();

  @Input()
  set viewType(value: SchedulerViewType) {
    this.viewService.setViewType(value);
  }

  get viewType(): SchedulerViewType {
    return this.viewService.getActiveViewType();
  }

  @Input()
  set dateSettings(value: ISchedulerDateSettings) {
    this.dateService.setDateSettings(value);
  }

  get dateSettings(): ISchedulerDateSettings {
    return this.dateService.datesSettings;
  }

  @Input()
  set selectedDate(date: Date) {
    this.dateService.startDate = date;
  }

  get selectedDate(): Date {
    return this.dateService.startDate;
  }

  @Input()
  customDays = [0, 1, 2, 3, 4, 5, 6];

  @Input()
  minuteInterval: MinuteInterval = 15;

  constructor(
    public viewService: SchedulerViewService,
    public dateService: SchedulerDateService
  ) {}

  ngOnInit() {
    this._viewTypeSubscription = this.viewService.viewType$.subscribe(
      viewType => {
        this.viewTypeChange.next(viewType);
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
