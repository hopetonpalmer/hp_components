import { Component, Input } from '@angular/core';
import { WeekViewComponent } from '../week-view/week-view.component';
import { TimeSlot } from '../../time-slot/time-slot';

@Component({
  selector: 'hp-work-week-view',
  templateUrl: '../day-view/day-view.component.html',
  styleUrls: ['../../styles.css', '../day-view/day-view.component.css']
})
export class WorkWeekViewComponent extends WeekViewComponent {

  @Input()
  workDays = [1, 2, 3, 4, 5];

  get viewTimeSlots(): TimeSlot[] {
    const result = this.timeSlots.get('Day').filter(slot => {
      return this.workDays.indexOf(slot.startDate.getDay()) > -1;
    }).slice(0, this.workDays.length);
    return result;
  }
}
