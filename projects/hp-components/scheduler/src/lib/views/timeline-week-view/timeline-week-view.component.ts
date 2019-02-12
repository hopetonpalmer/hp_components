import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineWeekViewComponent extends TimelineViewComponent {
  @Input()
  showWeekEnd = true;

  protected setViewTimeSlots(): void {
    let result = this.timeSlots.get('Day');
    if (!this.showWeekEnd) {
      result = result.filter(x => !isWeekend(x.startDate));
    }
    this.viewTimeSlots = result;
  }

  protected setViewDefaults() {
    this.dateFormats['hour'] = 'ha';
    this.intervalTypes = ['Day', 'Hour', 'Minute'];
  }
}
