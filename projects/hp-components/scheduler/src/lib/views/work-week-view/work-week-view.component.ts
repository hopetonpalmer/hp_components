import { Component, Input } from '@angular/core';
import { WeekViewComponent } from '../week-view/week-view.component';


@Component({
  selector: 'hp-work-week-view',
  templateUrl: '../day-view/day-view.component.html',
  styleUrls: ['../../styles.css', '../day-view/day-view.component.css']
})
export class WorkWeekViewComponent extends WeekViewComponent {

  get workDays(): number[] {
    return this.schedulerDateService.datesSettings.workDays;
  }

  protected setViewTimeSlots(): void {
    const result = this.timeSlots.get('Day').filter(slot => {
      return this.workDays.indexOf(slot.startDate.getDay()) > -1;
    }).slice(0, this.workDays.length);
    this.viewTimeSlots = result;
  }
}
