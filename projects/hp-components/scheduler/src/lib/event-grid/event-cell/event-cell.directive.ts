import { OnInit, OnDestroy, ChangeDetectorRef,
   Input, Directive, HostListener, HostBinding, Optional, Host, ElementRef } from '@angular/core';
import { TimeSlotService } from '../../time-slot/time-slot.service';
import { IntervalType } from '../../types';
import { Subscription, Observable } from 'rxjs';
import { TimeSlot } from '../../time-slot/time-slot';
import { SchedulerService } from '../../services/scheduler.service';
import { IRect, Orientation } from '@hp-components/common';
import { ColorScheme } from '../../color-scheme/color-scheme';
import { SchedulerDateService } from '../../services/scheduler-date.service';
import { isWeekend, isSameMonth, addDays, startOfDay } from 'date-fns';
import { formatDateTime, shortTime } from '../../scripts/datetime';
import { DragService } from '../../draggable/drag.service';
import { exitFullScreen } from 'hp-components/lib/scripts/dom';




@Directive({
  exportAs: 'hpEventCell',
  selector: '[hpEventCell], hpEventCell'
})
export class EventCellDirective implements OnInit, OnDestroy {
  private _isSelected = false;
  @HostBinding('class.hp-selected')
  get isSelected(): boolean {
    return this._isSelected;
  }


  @Input()
  set timeSlot(value: TimeSlot) {
    this._timeSlot = value;
  }

  get timeSlot(): TimeSlot {
    return this._timeSlot;
  }

  @Input()
  isMultiDaySelection = true;

  @Input()
  set timeSlotServiceProvider(value: TimeSlotService) {
    this._timeSlotService = value;
  }

  get timeSlotServiceProvider(): TimeSlotService {
    return this._timeSlotService;
  }

  get intervalType(): IntervalType {
    return this.timeSlot.intervalType;
  }

  @Input()
  isAllDay = false;

  @Input()
  orientation: Orientation;

  get cellRect(): IRect {
    const el = this._host.nativeElement as HTMLElement;
    // -- todo - Need to optimize possible performance issue with
    // -- ui thrashing when calling getBoundingClientRect
    const clientRect = el.getBoundingClientRect();
    const top = clientRect.top;
    const left = clientRect.left;
    const result = {
      top: top,
      left: left,
      width: clientRect.width,
      height: clientRect.height
    };
    return result;
  }

  constructor(
    private _timeSlotService: TimeSlotService,
    private _schedulerService: SchedulerService,
    private _schedulerDateService: SchedulerDateService,
    private _colorScheme: ColorScheme,
    private _host: ElementRef,
    private _cdRef: ChangeDetectorRef,
    private _eleRef: ElementRef
  ) {}
  private _selectedDatesSubscription: Subscription;

  private _timeSlot: TimeSlot;

  selectSlot() {
    this.timeSlotServiceProvider.setSelectedSlotsDateRange(
      this.timeSlot.startDate,
      this.timeSlot.endDate
    );
  }

  @HostListener('pointerdown', ['$event'])
  beginSlotSelection(event: PointerEvent) {
      this.selectSlot();
      this.timeSlotServiceProvider.beginSlotSelection(this.timeSlot.dateRange);
      this._schedulerService.setActiveDate(this.timeSlot.startDate);
  }

  @HostListener('pointerenter', ['$event'])
  adjustSlotSelection(event: PointerEvent) {
    if (event.buttons === 0 && this.timeSlotServiceProvider.isSelecting) {
      this.timeSlotServiceProvider.clearSlotSelection();
      return;
    }
    const dateFilter = this.isMultiDaySelection
      ? null
      : this._schedulerService.activeDate;
    this.timeSlotServiceProvider.adjustSelectedSlotsDateRange(
      this.timeSlot.dateRange,
      dateFilter
    );
  }

  @HostListener('pointerup')
  endSlotSelection() {
    if (this.timeSlotServiceProvider.isSelecting) {
      this.timeSlotServiceProvider.endSlotSelection();
    }
  }

  @HostBinding('style.background-color')
  get backgroundColor() {
    return this.getCellColor('backColor');
  }

  @HostBinding('style.border-color')
  get borderColor() {
    return this.getCellColor('borderColor');
  }

  isSlotSelected(): boolean {
    return (
      this.timeSlot &&
      this.timeSlotServiceProvider.isSlotDateSelected(this.timeSlot.startDate)
    );
  }

  ngOnInit() {
    this._selectedDatesSubscription = this.timeSlotServiceProvider.selectedSlotsDateRange$.subscribe(
      () => {
        this._isSelected = this.isSlotSelected();
        this._cdRef.markForCheck();
      }
    );
    const parent = this._host.nativeElement.parentElement as HTMLElement;
    parent.style.borderColor = this._colorScheme.cellContainerColors.borderColor;
  }

  getCellColor(prop: string) {
    if (this.isSelected) {
      return this._colorScheme.selectedCellColors[prop];
    }
    if (this.isAllDay) {
      return this._colorScheme.allDayAreaColors[prop];
    }
    if (this.timeSlot.viewType === 'Month') {
      if (
        isSameMonth(
          this.timeSlot.startDate,
          addDays(this._schedulerDateService.dateRange.start, 15)
        )
      ) {
        return this._colorScheme.workHoursColors[prop];
      }
      return this._colorScheme.eventCellColors[prop];
    }
    if (isWeekend(this.timeSlot.startDate)) {
      return this._colorScheme.weekEndColors[prop];
    }
    if (this._schedulerDateService.isWorkHour(this.timeSlot.startDate)) {
      return this._colorScheme.workHoursColors[prop];
    }
    return this._colorScheme.eventCellColors[prop];
  }

  ngOnDestroy() {
    this._selectedDatesSubscription.unsubscribe();
  }
}


