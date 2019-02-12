import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DayViewComponent } from '../day-view/day-view.component';


@Component({
  selector: 'hp-week-view',
  templateUrl: '../day-view/day-view.component.html',
  styleUrls: ['../../styles.css', '../day-view/day-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeekViewComponent extends DayViewComponent {}
