import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HpSchedulerComponent } from './hp-scheduler.component';
import { DayViewComponent } from './views/day-view/day-view.component';
import { MonthViewComponent } from './views/month-view/month-view.component';
import { TimelineViewComponent} from './views/timeline-view/timeline-view.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { EventItemComponent } from './event-item/event-item.component';
import { EventCellDirective } from './event-grid/event-cell/event-cell.directive';
import { WeekViewComponent } from './views/week-view/week-view.component';
import { WorkWeekViewComponent } from './views/work-week-view/work-week-view.component';
import { TimelineWeekViewComponent } from './views/timeline-week-view/timeline-week-view.component';
import { TimelineMonthViewComponent } from './views/timeline-month-view/timeline-month-view.component';
import { HpCommonModule } from '@hp-components/common';
import { EventGridComponent } from './event-grid/event-grid.component';
import { TimelineDayViewComponent } from './views/timeline-day-view/timeline-day-view.component';
import { ColorSchemeDirective } from './color-scheme/color-scheme.directive';
import { DragDropDirective } from './draggable/drag-drop.directive';
import { DragSizeDirective } from './draggable/drag-size.directive';
import { DropZoneDirective } from './draggable/drop-zone.directive';
import { EventSelectorComponent } from './event-selector/event-selector.component';
import { EventSelectorManagerComponent } from './event-selector/event-selector-manager/event-selector-manager.component';


@NgModule({
  imports: [
    CommonModule,
    HpCommonModule
  ],
  declarations: [
    HpSchedulerComponent,
    TimelineViewComponent,
    DayViewComponent,
    MonthViewComponent,
    EventCellDirective,
    ToolbarComponent,
    EventItemComponent,
    WeekViewComponent,
    WorkWeekViewComponent,
    TimelineWeekViewComponent,
    TimelineMonthViewComponent,
    EventGridComponent,
    TimelineDayViewComponent,
    ColorSchemeDirective,
    DragDropDirective,
    DragSizeDirective,
    DropZoneDirective,
    EventSelectorComponent,
    EventSelectorManagerComponent,
  ],
  exports: [
    HpSchedulerComponent,
    TimelineViewComponent,
    TimelineWeekViewComponent,
    TimelineMonthViewComponent,
    DayViewComponent,
    WeekViewComponent,
    WorkWeekViewComponent,
    MonthViewComponent,
  ],
  providers: [{ provide: LOCALE_ID, useValue: navigator.language }],
  entryComponents: [EventSelectorComponent, EventSelectorManagerComponent]
})
export class HpSchedulerModule { }
