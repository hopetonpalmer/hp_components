import { Component, OnInit, Input, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { SchedulerView } from '../scheduler-view';
import { SchedulerService } from '../../services/scheduler.service';
import { TimeSlot } from '../../time-slot/time-slot';
import { formatDateTime } from '../../scripts/datetime';
import { SchedulerViewService } from '../scheduler-view.service';
import { SchedulerDateService } from '../../services/scheduler-date.service';

@Component({
  selector: 'hp-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['../../styles.css', './month-view.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class MonthViewComponent extends SchedulerView implements OnInit {
  private _rowSizing: string;

  get firstWeekSlots(): TimeSlot[] {
    const timeSlots = this.timeSlots.get('Day');
    if (timeSlots) {
      return timeSlots.slice(0, 7);
    }
    return [];
  }

  constructor(
    public schedulerService: SchedulerService,
    schedulerViewService: SchedulerViewService,
    public schedulerDateService: SchedulerDateService,
    private _elRef: ElementRef
  ) {
    super(schedulerService, schedulerViewService, schedulerDateService);
  }

  formatDate(date: Date, format: string): string {
    return formatDateTime(date, format);
  }

  ngOnInit() {
    this.dateFormats['day'] = 'd';
    this.intervalTypes = ['Day'];
    super.ngOnInit();
    this.setRowSizeStyle();
  }

  setRowSizeStyle() {
    const style = this._elRef.nativeElement.style;
    const rowCount = this.viewTimeSlots.length / 7;
    const rowSizing = `repeat(${rowCount}, minmax(auto, 1fr))`;
    if (this._rowSizing !== rowSizing) {
      style.setProperty('--row-sizing', rowSizing);
      this._rowSizing = rowSizing;
    }
  }

  protected slotsGenerated() {
    this.setRowSizeStyle();
  }
}
