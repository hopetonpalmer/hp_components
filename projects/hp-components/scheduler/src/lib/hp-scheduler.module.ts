import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HpSchedulerComponent } from './hp-scheduler.component';
import { DayViewComponent } from './views/day-view/day-view.component';
import { MonthViewComponent } from './views/month-view/month-view.component';
import { TimelineViewComponent} from './views/timeline-view/timeline-view.component';
import { AgendaViewComponent } from './views/agenda-view/agenda-view.component';
import { AppointmentGridComponent } from './appointment-grid/appointment-grid.component';
import { AppointmentGridDirective } from './appointment-grid/appointment-grid.directive';
import { TimeSlotGridComponent } from './time-slot/time-slot-grid.component';
import { ApptCellDirective } from './appt-cell/appt-cell.directive';
import { ToolbarComponent } from './toolbar/toolbar.component';



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
    ApptCellDirective,
    TimeSlotGridComponent,
    AppointmentGridComponent,
    AppointmentGridDirective,
    ToolbarComponent
  ],
  exports: [
    HpSchedulerComponent,
    AgendaViewComponent,
    TimelineViewComponent,
    DayViewComponent,
    MonthViewComponent
  ],
  providers: [{ provide: LOCALE_ID, useValue: navigator.language }],
})
export class HpSchedulerModule { }
