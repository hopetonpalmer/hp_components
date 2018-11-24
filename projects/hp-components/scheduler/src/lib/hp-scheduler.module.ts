import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HpSchedulerComponent } from './hp-scheduler.component';
import { DayViewComponent } from './views/day-view/day-view.component';
import { MonthViewComponent } from './views/month-view/month-view.component';
import { WeekViewComponent } from './views/week-view/week-view.component';
import { TimelineViewComponent} from './views/timeline-view/timeline-view.component';
import { AgendaViewComponent } from './views/agenda-view/agenda-view.component';
import { TimeIntervalComponent } from './time-interval/time-interval.component';
import { AppointmentGridComponent } from './appointment-grid/appointment-grid.component';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HpSchedulerComponent,
    AgendaViewComponent,
    TimelineViewComponent,
    DayViewComponent,
    MonthViewComponent,
    WeekViewComponent,
    TimeIntervalComponent,
    AppointmentGridComponent
  ],
  exports: [
    HpSchedulerComponent,
    AgendaViewComponent,
    TimelineViewComponent,
    DayViewComponent,
    MonthViewComponent,
    WeekViewComponent
  ],
  providers: [{ provide: LOCALE_ID, useValue: navigator.language }],
})
export class HpSchedulerModule { }
