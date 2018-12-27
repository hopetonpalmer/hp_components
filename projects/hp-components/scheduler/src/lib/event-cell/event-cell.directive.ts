import { OnInit, OnDestroy, ChangeDetectorRef, Input, Directive, HostListener, HostBinding } from '@angular/core';
import { SlotSelectionService } from '../services/slot-selection.service';
import { IntervalType } from '../types';
import { Subscription, Observable } from 'rxjs';
import { TimeSlot } from '../time-slot/time-slot';
import { SchedulerService } from '../services/scheduler.service';


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
  set dateSelectionService(value: SlotSelectionService) {
    this._dateSelectionService = value;
  }

  get dateSelectionService(): SlotSelectionService {
    return this._dateSelectionService;
  }

  get intervalType(): IntervalType {
    return this.timeSlot.intervalType;
  }

  constructor(
    private _dateSelectionService: SlotSelectionService,
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
    this.dateSelectionService.adjustSelectedSlotDateRange(this.timeSlot.startDate);
  }

  @HostListener('mouseup')
  endSlotSelection() {
    this.dateSelectionService.endSelection();
  }

  isSlotSelected(): boolean {
    return (
      this.timeSlot &&
      this.dateSelectionService.isSelected(this.timeSlot.startDate)
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
