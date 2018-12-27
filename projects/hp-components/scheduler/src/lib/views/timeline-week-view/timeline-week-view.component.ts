import { Component, OnInit, Input } from '@angular/core';
import { TimelineViewComponent } from '../timeline-view/timeline-view.component';
import { TimeSlot } from '../../time-slot/time-slot';
import { startOfWeek, isWeekend } from 'date-fns';


@Component({
  selector: 'hp-timeline-week-view',
  templateUrl: '../timeline-view/timeline-view.component.html',
  styleUrls: [
    '../../styles.css',
    '../timeline-view/timeline-view.component.css',
    './timeline-week-view.component.css'
  ]
})
export class TimelineWeekViewComponent extends TimelineViewComponent {

  @Input()
  showWeekEnd = true;

  get viewTimeSlots(): TimeSlot[] {
    let result = this.timeSlots.get('Day');
    if (!this.showWeekEnd) {
      result = result.filter(x => !isWeekend(x.startDate));
    }
    return result;
  }

  protected setViewDefaults() {
    this.dateFormats['hour'] = 'ha';
    this.intervalTypes = ['Day', 'Hour'];
  }
}
