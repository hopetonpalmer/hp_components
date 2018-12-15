import { OnInit, OnDestroy, ChangeDetectorRef, Input, Directive, HostListener, HostBinding } from '@angular/core';
import { DateSelectionService } from '../services/date-selection.service';
import { IntervalType } from '../types';
import { Subscription, Observable } from 'rxjs';
import { TimeSlot } from '../time-slot/time-slot';
import { SchedulerService } from '../services/scheduler.service';


@Directive({
  exportAs: 'hpApptCell',
  selector: '[hpApptCell]'
})
export class ApptCellDirective implements OnInit, OnDestroy {
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
  set dateSelectionService(value: DateSelectionService) {
    this._dateSelectionService = value;
  }

  get dateSelectionService(): DateSelectionService {
    return this._dateSelectionService;
  }

  get intervalType(): IntervalType {
    return this.timeSlot.intervalType;
  }

  constructor(
    private _dateSelectionService: DateSelectionService,
    private _schedulerService: SchedulerService,
    private _cdRef: ChangeDetectorRef
  ) {}
  private _selectedDatesSubscription: Subscription;

  private _timeSlot: TimeSlot;

  selectSlot() {
    this.dateSelectionService.setSelectedDateRange(
      this.timeSlot.startDate,
      this.timeSlot.endDate
    );
  }

  @HostListener('mousedown')
  beginSlotSelection() {
    this.selectSlot();
    this.dateSelectionService.beginSelection();
    this._schedulerService.setActiveDate(this.timeSlot.startDate);
  }

  @HostListener('mouseenter')
  adjustSlotSelection() {
    this.dateSelectionService.adjustDateRange(this.timeSlot.startDate);
  }

  @HostListener('mouseup')
  endSlotSelection() {
    this.dateSelectionService.endSelection();
  }

  isSlotSelected(): boolean {
    return (
      this.timeSlot &&
      this.dateSelectionService.isSelectedDate(this.timeSlot.startDate)
    );
  }

  ngOnInit() {
    this._selectedDatesSubscription = this.dateSelectionService.selectedDateRange$.subscribe(
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
