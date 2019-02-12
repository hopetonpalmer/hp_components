import { Component, OnInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef, Optional } from '@angular/core';
import { SchedulerView } from '../scheduler-view';
import { SchedulerService } from '../../services/scheduler.service';
import { TimeSlot } from '../../time-slot/time-slot';
import { dateRangesOfRange, isBetween } from '../../scripts/datetime';
import { SchedulerViewService } from '../scheduler-view.service';
import { SchedulerDateService } from '../../services/scheduler-date.service';
import { TimeSlotService } from '../../time-slot/time-slot.service';
import { DateRange } from '../../types';
import { SchedulerEventService } from '../../services/scheduler-event.service';
import { ColorSchemeService } from '../../color-scheme/color-scheme.service';


@Component({
  selector: 'hp-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['../../styles.css', './month-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonthViewComponent extends SchedulerView implements OnInit {
  private _rowSizing: string;
  rowHeight: number;
  get firstWeekSlots(): TimeSlot[] {
    const timeSlots = this.timeSlots.get('Day');
    if (timeSlots) {
      return timeSlots.slice(0, 7);
    }
    return [];
  }

  get monthSlots(): Array<TimeSlot[]> {
    const timeSlots = this.viewTimeSlots;
    const result = [];
    const dateRanges = dateRangesOfRange(this.dateRange.start, this.dateRange.end, 7);
    if (timeSlots) {
       dateRanges.forEach(dateRange => {
         result.push(timeSlots.filter(ts => isBetween(dateRange.start, dateRange.end, [ts.startDate, ts.endDate])));
       });
    }
    return result;
  }

  dateRanges: DateRange[];

  protected lastCellInclusive = true;

  constructor(
    public schedulerService: SchedulerService,
    public schedulerViewService: SchedulerViewService,
    public schedulerDateService: SchedulerDateService,
    public schedulerEventService: SchedulerEventService,
    public timeSlotService: TimeSlotService,
    public colorSchemeService: ColorSchemeService,
    protected elRef: ElementRef,
    protected cdRef: ChangeDetectorRef
  ) {
    super(
      schedulerService,
      schedulerViewService,
      schedulerDateService,
      schedulerEventService,
      timeSlotService,
      colorSchemeService,
      elRef
    );
  }

  ngOnInit() {
    this.dateFormats['day'] = 'd';
    this.intervalTypes = ['Day'];
    super.ngOnInit();
    this.setRowSizeStyle();
  }

  setRowSizeStyle() {
    const headerHeight = 32;
    const el = this.elRef.nativeElement as HTMLElement;
    const style = el.style;
    const rowCount = this.viewTimeSlots.length / 7;
    this.rowHeight = (el.offsetHeight - headerHeight) / rowCount;
    const rowSizing = `repeat(${rowCount}, minmax(auto, 1fr))`;
    if (this._rowSizing !== rowSizing) {
      style.setProperty('--row-sizing', rowSizing);
      this._rowSizing = rowSizing;
    }
    this.cdRef.markForCheck();
  }

  protected slotsGenerated() {
    this.setRowSizeStyle();
  }

  protected layoutEvents(): void {}

  protected dateRangeChanged() {
    super.dateRangeChanged();
    this.dateRanges = dateRangesOfRange(this.dateRange.start, this.dateRange.end, 7);
  }

  getColorSet(date: Date): string {
     if (this.schedulerDateService.isDateInCurrentMonth(date)) {
       return 'workHoursColors';
     }
    return 'eventCellColors';
  }
}
