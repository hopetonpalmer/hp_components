import { OnInit, OnDestroy, ChangeDetectorRef,
   Input, Directive, HostListener, HostBinding, Optional, Host, ElementRef } from '@angular/core';
import { TimeSlotService } from '../../time-slot/time-slot.service';
import { IntervalType } from '../../types';
import { Subscription, Observable } from 'rxjs';
import { TimeSlot } from '../../time-slot/time-slot';
import { SchedulerService } from '../../services/scheduler.service';
import { IRect, Orientation } from '@hp-components/common';



@Directive({
  exportAs: 'hpEventCell',
  selector: '[hpEventCell]'
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
  orientation: Orientation;

  get cellRect(): IRect {
    const el = this._host.nativeElement as HTMLElement;
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


  get parentRect(): DOMRect | ClientRect {
    const el = this._host.nativeElement as HTMLElement;
    return el.parentElement.getBoundingClientRect();
  }

  constructor(
    private _timeSlotService: TimeSlotService,
    private _schedulerService: SchedulerService,
    private _host: ElementRef,
    private _cdRef: ChangeDetectorRef,
  ) {

  }
  private _selectedDatesSubscription: Subscription;

  private _timeSlot: TimeSlot;

  selectSlot() {
    this.timeSlotServiceProvider.setSelectedSlotsDateRange(
      this.timeSlot.startDate,
      this.timeSlot.endDate
    );
  }

  @HostListener('mousedown')
  beginSlotSelection() {
    this.selectSlot();
    this.timeSlotServiceProvider.beginSlotSelection(this.timeSlot.dateRange);
    this._schedulerService.setActiveDate(this.timeSlot.startDate);
  }

  @HostListener('mouseenter')
  adjustSlotSelection() {
    const dateFilter = this.isMultiDaySelection
      ? null
      : this._schedulerService.activeDate;
    this.timeSlotServiceProvider.adjustSelectedSlotsDateRange(
      this.timeSlot.dateRange,
      dateFilter
    );
  }

  @HostListener('mouseup')
  endSlotSelection() {
    this.timeSlotServiceProvider.endSlotSelection();
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
        // this._cdRef.detectChanges();
      }
    );
  }

  ngOnDestroy() {
    this._selectedDatesSubscription.unsubscribe();
  }
}


