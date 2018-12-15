import { Component, OnInit, ElementRef, OnDestroy, Input } from '@angular/core';
import { SchedulerView } from '../scheduler-view';
import { SchedulerService } from '../../services/scheduler.service';
import { formatDateTime } from '../../scripts/datetime';
import { DateSelectionService } from '../../services/date-selection.service';
import { Subscription } from 'rxjs';
import { TimeSlot } from '../../time-slot/time-slot';
import { addDays, isWithinRange, isAfter, subWeeks, addWeeks } from 'date-fns';
import { SchedulerViewService } from '../scheduler-view.service';

@Component({
  selector: 'hp-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['../../styles.css', './day-view.component.css']
})
export class DayViewComponent extends SchedulerView
  implements OnInit, OnDestroy {
  daySelectionService = new DateSelectionService();
  private _daySelectionChangeSubscription: Subscription;
  private _dateSelectionChangeSubscription: Subscription;

  @Input()
  firstDayOfWeek = 0;

  @Input()
  workDays = [1, 2, 3, 4, 5];

  @Input()
  customDays = [0, 1, 2, 3, 4, 5, 6];

  @Input()
  dayViewType = 'Week';

  get viewTimeSlots(): TimeSlot[] {
     let result = this.timeSlots.get('Day');
     switch (this.dayViewType) {
       case 'Day':
         result = result.slice(0, 1);
         break;
       case 'Week':
         result = this.getWeekSlots(result);
         break;
       case 'WorkWeek':
         result = result.filter(slot => {
           return this.workDays.indexOf(slot.startDate.getDay()) > -1;
         }).slice(0, this.workDays.length);
         break;
       case 'Custom':
         result = result.filter(slot => {
           return this.customDays.indexOf(slot.startDate.getDay()) > -1;
         }).slice(0, this.customDays.length);
         break;
     }
     return result;
  }

  private getWeekSlots(timeSlots: TimeSlot[]): TimeSlot[] {
    if (this.dateRange.start.getDay() !== this.firstDayOfWeek) {
      const startSlot = timeSlots.find(slot => slot.startDate.getDay() === this.firstDayOfWeek);
      let startDate = startSlot.startDate;
      let endDate = addWeeks(startSlot.endDate, 1);
      const today = new Date();
      if (isAfter(startDate, today) && isWithinRange(today, timeSlots[0].startDate, timeSlots[timeSlots.length - 1].endDate)) {
        startDate = subWeeks(startDate, 1);
        endDate = subWeeks(endDate, 1);
      }
      this.schedulerService.setDateRange(startDate, endDate);
      timeSlots = this.timeSlots.get('Day');
    }
    return timeSlots.slice(0, 7);
  }

  constructor(
    public schedulerViewService: SchedulerViewService,
    public schedulerService: SchedulerService,
    private _dateSelectionService: DateSelectionService,
    private _elRef: ElementRef
  ) {
    super(schedulerService, schedulerViewService);
  }

  ngOnInit() {
    // -- set defaults
    this.dateFormats['day'] = 'd';
    this.intervalTypes = ['Day', 'Hour', 'Minute'];

    // -- setup subscriptions
    this._dateSelectionChangeSubscription = this._dateSelectionService.selectedDateRange$.subscribe(
      dateRange => {
        if (dateRange) {
          this.daySelectionService.clear();
        }
      }
    );
    this._daySelectionChangeSubscription = this.daySelectionService.selectedDateRange$.subscribe(
      dateRange => {
        if (dateRange) {
          this._dateSelectionService.clear();
        }
      }
    );
    super.ngOnInit();

    // -- set column style for css grid
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
    style.setProperty('--column-sizing', colSizing);
  }

  protected viewChanged(_viewType) {
     if (this.schedulerViewService.isDayView()) {
        this.dayViewType = this.schedulerViewService.getDayViewType();
        this.setColumSizeStyle();
     }
  }
}
