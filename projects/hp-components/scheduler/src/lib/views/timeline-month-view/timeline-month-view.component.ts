import { Component} from '@angular/core';
import { TimelineViewComponent } from '../timeline-view/timeline-view.component';

@Component({
  selector: 'hp-timeline-month-view',
  templateUrl: './timeline-month-view.component.html',
  styleUrls: [
    '../../styles.css',
    '../timeline-view/timeline-view.component.css',
    './timeline-month-view.component.css'
  ]
})
export class TimelineMonthViewComponent extends TimelineViewComponent {

  protected setViewDefaults() {
    this.dateFormats['month'] = 'MMMM yyyy';
    this.dateFormats['day'] = 'EEE dd';
    this.intervalTypes = ['Month', 'Day'];
    this.minuteInterval = 30;
  }


}
