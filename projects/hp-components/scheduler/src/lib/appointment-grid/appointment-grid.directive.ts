import { Directive, OnInit, OnDestroy, Input, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { DateSelectionService } from '../services/date-selection.service';
import { SchedulerService } from '../services/scheduler.service';
import { IntervalType } from '../types';
import { TimeSlot } from '../time-slot/time-slot';

@Directive({
  exportAs: 'hpAppointmentGrid',
  selector: '[hpAppointmentGrid]'
})
export class AppointmentGridDirective implements OnInit, OnDestroy {
  private _selectedDatesSubscription: Subscription;
  @Input()
  intervalTypes: IntervalType[];

  private _timeSlots: TimeSlot[];
  @Input()
  set timeSlots(value: TimeSlot[]) {
    this._timeSlots = value;
  }

  get timeSlots(): TimeSlot[] {
    return this._timeSlots;
  }

  get intervalType(): IntervalType {
    return this.intervalTypes[this.intervalTypes.length - 1];
  }

  selectSlot(slot: TimeSlot) {
    this._dateSelectionService.setSelectedDateRange(
      slot.startDate,
      slot.endDate
    );
  }

  beginSlotSelection(slot: TimeSlot) {
    this.selectSlot(slot);
    this._dateSelectionService.beginSelection();
  }

  adjustSlotSelection(slot: TimeSlot) {
    this._dateSelectionService.adjustDateRange(slot.startDate);
  }

  endSlotSelection() {
    this._dateSelectionService.endSelection();
  }

  isSlotSelected(slot: TimeSlot): boolean {
    return this._dateSelectionService.isSelectedDate(slot.startDate);
  }
  constructor(
    private _schedulerService: SchedulerService,
    private _dateSelectionService: DateSelectionService,
    private _cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this._selectedDatesSubscription = this._dateSelectionService.selectedDateRange$.subscribe(
      () => {
        this._cdRef.detectChanges();
      }
    );
  }

  ngOnDestroy() {
    this._selectedDatesSubscription.unsubscribe();
  }
}
