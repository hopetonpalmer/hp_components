import { Component, OnInit, Input, EventEmitter, Output, OnDestroy, ElementRef, AfterViewInit, Optional, Injector } from '@angular/core';
import { SchedulerService } from './services/scheduler.service';
import { SchedulerViewType, MinuteInterval } from './types';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { SchedulerViewService } from './views/scheduler-view.service';
import { SchedulerDateService, ISchedulerDateSettings } from './services/scheduler-date.service';
import { TimeSlotService } from './time-slot/time-slot.service';
import { EventItem } from './event-item/event-item';
import { ResizeObserver } from 'resize-observer';
import { SchedulerEventService } from './services/scheduler-event.service';




@Component({
  selector: 'hp-scheduler',
  template: `
    <hp-toolbar></hp-toolbar>
    <hp-day-view
      hpDropZone
      *ngIf="viewType === 'Day'"
      [minuteInterval]="minuteInterval"
    ></hp-day-view>
    <hp-week-view
      hpDropZone
      *ngIf="viewType === 'Week'"
      [minuteInterval]="minuteInterval"
    ></hp-week-view>
    <hp-work-week-view
      hpDropZone
      *ngIf="viewType === 'WorkWeek'"
      [minuteInterval]="minuteInterval"
    ></hp-work-week-view>
    <hp-month-view *ngIf="viewType === 'Month'"></hp-month-view>
    <hp-timeline-view
      hpDropZone
      *ngIf="viewType === 'Timeline'"
      [minuteInterval]="15"
    ></hp-timeline-view>
    <hp-timeline-day-view
      hpDropZone
      *ngIf="viewType === 'TimelineWeek'"
    ></hp-timeline-day-view>
    <hp-timeline-month-view
      hpDropZone
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
  providers: [SchedulerDateService, SchedulerViewService, TimeSlotService]
})
export class HpSchedulerComponent implements OnInit, OnDestroy, AfterViewInit {
  private _viewTypeSubscription: Subscription;
  private _eventItemsSubscription: Subscription;

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
  minuteInterval: MinuteInterval = 30;

  private _eventItems = [];
  @Input()
  set eventItems(value: EventItem[]) {
    this.eventService.addEventItems(value);
  }

  get eventItems(): EventItem[] {
    return this._eventItems;
  }

  constructor(
    public viewService: SchedulerViewService,
    public dateService: SchedulerDateService,
    public schedulerViewService: SchedulerViewService,
    public schedulerService: SchedulerService,
    public eventService: SchedulerEventService,
    private _elRef: ElementRef
  ) {}

  ngOnInit() {
    this._viewTypeSubscription = this.viewService.viewType$.subscribe(
      viewType => {
        this.viewTypeChange.next(viewType);
      }
    );

    this._eventItemsSubscription = this.eventService.eventItems$.subscribe(
      eventItems => {
        this._eventItems = eventItems;
      }
    );
  }

  ngAfterViewInit(): void {
    const ro = new ResizeObserver(event => {
      // this.schedulerViewService.invalidateView(event);
    });
    ro.observe(this._elRef.nativeElement);
  }

  ngOnDestroy(): void {
    this._viewTypeSubscription.unsubscribe();
    this._eventItemsSubscription.unsubscribe();
  }
}




