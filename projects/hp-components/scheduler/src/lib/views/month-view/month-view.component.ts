import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { SchedulerView } from '../scheduler-view';
import { SchedulerService } from '../../services/scheduler.service';
import { TimeSlot } from '../../time-slot/time-slot';
import { formatDateTime } from '../../scripts/datetime';
import { SchedulerViewService } from '../scheduler-view.service';

@Component({
  selector: 'hp-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['../../styles.css', './month-view.component.css']
})
export class MonthViewComponent extends SchedulerView implements OnInit {
  get firstWeekSlots(): TimeSlot[] {
     const timeSlots = this.timeSlots.get('Day');
     if (timeSlots) {
       return timeSlots.slice(0, 7);
     }
     return [];
  }

  constructor(public schedulerService: SchedulerService,
    schedulerViewService: SchedulerViewService, private _elRef: ElementRef) {
    super(schedulerService, schedulerViewService);
  }

  formatDate(date: Date, format: string): string {
    return formatDateTime(date, format);
  }

  get viewTimeSlots(): TimeSlot[] {
    const result = this.timeSlots.get('Day');
    return result;
  }

  ngOnInit() {
    // -- set defaults
    this.dateFormats['day'] = 'd';
    this.minuteInterval = 15;
    this.intervalTypes = ['Day'];
    this.schedulerService.setRangeFromMonth(this.dateRange.start);
    super.ngOnInit();
    this.setRowCountStyle();
  }

  setRowCountStyle() {
    const style = this._elRef.nativeElement.style;
    const rowCount = this.viewTimeSlots.length / 7;
    const rowSizing = `repeat(${rowCount}, minmax(auto, 1fr))`;
    style.setProperty('--row-sizing', rowSizing);
  }
}
