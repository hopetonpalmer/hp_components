import { Component, OnInit, ElementRef, OnDestroy, Input, ChangeDetectionStrategy } from '@angular/core';
import { SchedulerView } from '../scheduler-view';
import { SchedulerService } from '../../services/scheduler.service';
import { formatDateTime } from '../../scripts/datetime';
import { SlotSelectionService } from '../../services/slot-selection.service';
import { Subscription } from 'rxjs';
import { TimeSlot } from '../../time-slot/time-slot';
import { addDays } from 'date-fns';
import { SchedulerViewService } from '../scheduler-view.service';
import { SchedulerDateService } from '../../services/scheduler-date.service';

@Component({
  selector: 'hp-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['../../styles.css', './day-view.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class DayViewComponent extends SchedulerView
  implements OnInit, OnDestroy {
  allDaySelectionService = new SlotSelectionService();
  private _daySelectionChangeSubscription: Subscription;
  private _dateSelectionChangeSubscription: Subscription;
  private _colSizing: string;

  get dayTimeSlots(): TimeSlot[] {
    return this.timeSlots.get('Day');
  }

  constructor(
    public schedulerViewService: SchedulerViewService,
    public schedulerService: SchedulerService,
    public schedulerDateService: SchedulerDateService,
    private _dateSelectionService: SlotSelectionService,
    private _elRef: ElementRef
  ) {
    super(schedulerService, schedulerViewService, schedulerDateService);
    this.dateFormats['day'] = 'd';
  }


  ngOnInit() {
    // -- set defaults
    this.intervalTypes = ['Day', 'Hour', 'Minute'];

    // -- setup subscriptions
    this._dateSelectionChangeSubscription = this._dateSelectionService.selectedDateRange$.subscribe(
      dateRange => {
        if (dateRange) {
          this.allDaySelectionService.clearSelection();
        }
      }
    );
    this._daySelectionChangeSubscription = this.allDaySelectionService.selectedDateRange$.subscribe(
      dateRange => {
        if (dateRange) {
          this._dateSelectionService.clearSelection();
        }
      }
    );
    super.ngOnInit();
    this.setColumSizeStyle();
  }


  ngDestroy(): void {
    this._dateSelectionChangeSubscription.unsubscribe();
    this._daySelectionChangeSubscription.unsubscribe();
  }

  formatDayName(date: Date, format: string): string {
    return formatDateTime(date, format);
  }

  setColumSizeStyle() {
    const style = this._elRef.nativeElement.style;
    const dayCount = this.viewTimeSlots.length;
    const rulerWidth = 60;
    const colSizing = `${rulerWidth}px repeat(${dayCount}, 1fr)`;
    if (this._colSizing !== colSizing) {
      style.setProperty('--column-sizing', colSizing);
      this._colSizing = colSizing;
    }
  }

  protected slotsGenerated() {
    this.setColumSizeStyle();
  }
}
