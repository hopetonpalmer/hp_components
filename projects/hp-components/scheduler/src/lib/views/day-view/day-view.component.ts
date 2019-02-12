import { Component, OnInit, ElementRef, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef, Optional } from '@angular/core';
import { SchedulerView, ISizingGroup } from '../scheduler-view';
import { SchedulerService } from '../../services/scheduler.service';
import { formatDateTime, isBetween, datesOfRange, isMidnight } from '../../scripts/datetime';
import { TimeSlotService } from '../../time-slot/time-slot.service';
import { Subscription } from 'rxjs';
import { TimeSlot } from '../../time-slot/time-slot';
import { addDays, isSameDay, addSeconds, endOfDay, startOfDay } from 'date-fns';
import { SchedulerViewService } from '../scheduler-view.service';
import { SchedulerDateService } from '../../services/scheduler-date.service';
import { IRect, intersectRect, intersectedRects, Rect, Orientation } from '@hp-components/common';
import { EventItem } from '../../event-item/event-item';
import { DayViewLayoutService } from './day-view-layout.service';
import { SchedulerEventService } from '../../services/scheduler-event.service';
import { DateRange } from '../../types';
import { ColorSchemeService } from '../../color-scheme/color-scheme.service';

@Component({
  selector: 'hp-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['../../styles.css', './day-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayViewComponent extends SchedulerView
  implements OnInit, OnDestroy {
  allDayTimeSlotService = new TimeSlotService();
  private _alldaySelectionChangeSubscription: Subscription;
  private _dateSelectionChangeSubscription: Subscription;
  private _colSizing: string;

  @Input()
  rightGutter = 5;

  get dayTimeSlots(): TimeSlot[] {
    return this.timeSlots.get('Day');
  }

  protected isTimeInterval = true;
  orientation: Orientation = 'vertical';
  allDayDateRange: DateRange;

  constructor(
    public schedulerService: SchedulerService,
    public schedulerViewService: SchedulerViewService,
    public schedulerDateService: SchedulerDateService,
    public schedulerEventService: SchedulerEventService,
    public timeSlotService: TimeSlotService,
    public colorSchemeService: ColorSchemeService,
    protected elRef: ElementRef,
    private cdRef: ChangeDetectorRef
  ) {
    super(
      schedulerService,
      schedulerViewService,
      schedulerDateService,
      schedulerEventService,
      timeSlotService,
      colorSchemeService,
      elRef
    );
    this.dateFormats['day'] = 'd';
  }

  ngOnInit() {
    // -- set defaults
    this.intervalTypes = ['Day', 'Hour', 'Minute'];

    // -- setup subscriptions
    this._dateSelectionChangeSubscription = this.timeSlotService.selectedSlotsDateRange$.subscribe(
      dateRange => {
        if (dateRange) {
          this.allDayTimeSlotService.clearSlotSelection();
        }
      }
    );
    this._alldaySelectionChangeSubscription = this.allDayTimeSlotService.selectedSlotsDateRange$.subscribe(
      dateRange => {
        if (dateRange) {
          this.timeSlotService.clearSlotSelection();
        }
      }
    );

    super.ngOnInit();
    this.setColumSizeStyle();
  }

  ngDestroy(): void {
    this._dateSelectionChangeSubscription.unsubscribe();
    this._alldaySelectionChangeSubscription.unsubscribe();
  }

  setColumSizeStyle() {
    const style = this.elRef.nativeElement.style;
    const dayCount = this.viewTimeSlots.length;
    const rulerWidth = 60;
    const colSizing = `${rulerWidth}px repeat(${dayCount}, 1fr)`;
    if (this._colSizing !== colSizing) {
      style.setProperty('--column-sizing', colSizing);
      this._colSizing = colSizing;
    }
  }

  protected slotsGenerated() {
    this.setColumSizeStyle();
    super.slotsGenerated();
  }

  protected layoutEvents(): void {
    const dateRange = this.schedulerDateService.dateRange;
    const dates = datesOfRange(dateRange.start, dateRange.end);
    dates.forEach(date => this.layoutEventsByDate(date));
  }

  protected layoutEventsByDate(date: Date) {
    if (!this.eventComps || !this.eventComps.length) {
      return;
    }
    const eventComps = this.eventComps.filter(
      ec =>
        !ec.eventItem.isAllDay &&
        !ec.eventItem.isMultiDay &&
        isSameDay(ec.eventItem.start, date)
    );
    if (!eventComps.length) {
      return;
    }
    const rects = [];
    const eventItems = eventComps.map(ec => ec.eventItem);
    eventItems.forEach(item => rects.push(this.rectOfEvent(item)));
    const margin = this.eventSpacing;
    const rightGutter = this.rightGutter;
    const firstRect = rects[0];
    const containerWidth = firstRect.width - margin - rightGutter;
    const containerRect = new Rect(
      firstRect.left,
      firstRect.top,
      firstRect.width - rightGutter,
      firstRect.height
    );

    const doLayout = () => {
      const sizingGroups = this.getSizingGroups(eventItems, date);

      // -- set rects initial size
      if (sizingGroups) {
        rects.forEach((rect, index) => {
          const eventItem = eventItems[index];
          const sizingGroup = sizingGroups.find(
            sg => sg.eventItems.indexOf(eventItem) > -1
          );
          if (sizingGroup) {
            rect.width = (containerWidth / sizingGroup.maxSpread) - margin;
          } else {
            rect.width = 0;
          }
        });
      }

      // -- position rects
      rects.forEach((rect, index) => {
        this.positionRect(rect, index, rects, margin);
      });

      // -- set rects final size
      rects.forEach((rect, index) => {
        this.finalizeRectSize(rect, rects, containerRect, margin);
        eventComps[index].eventRect = rect;
      });
    };
    doLayout();
  }

  /**
   * Final pass to fill gaps and and stretch rects if necessary
   *
   * @param IRect rect
   * @param IRect[] rects
   * @param IRect containerRect
   * @param number margin
   */
  protected finalizeRectSize(
    rect: IRect,
    rects: IRect[],
    containerRect: IRect,
    margin: number
  ) {
    rect.width = containerRect.width - rect.left + containerRect.left - (margin * 2);
    const overlappingRects = intersectedRects(rect, rects.filter(x => x !== rect)).sort((a, b) => a.left - b.left);
    if (overlappingRects.length > 0) {
       rect.width = overlappingRects[0].left - rect.left - margin;
    }
  }

  /**
   * Returns a group of event items and count per time slots
   *
   * @param EventItem[] The visible event items
   * @returns ISizingGroup[]
   */
  protected getSizingGroups(eventItems: EventItem[], date: Date): ISizingGroup[] {
    let newGroup = true;
    const result = this.eventCells.filter(x => isSameDay(x.timeSlot.startDate, date)).reduce((groups, cell) => {
      const eventsInRange = eventItems.filter(item =>
        // -- adjust by 1 second to force sharing of borders
        isBetween(
          addSeconds(item.start, isMidnight(item.end) ? 0 : 1),
          addSeconds(item.end, isMidnight(item.end) ? 0 : -1),
          [cell.timeSlot.startDate, cell.timeSlot.endDate]
        )
      );
      if (eventsInRange.length === 0 ) {
        newGroup = true;
        return groups;
      }

      if (groups.length) {
        newGroup = !this.arrayContainsAny(groups[groups.length - 1].eventItems, eventsInRange);
      }
      if (newGroup) {
        newGroup = false;
        groups.push({
          maxSpread: eventsInRange.length,
          eventItems: eventsInRange
        });
      } else {
        const group = groups[groups.length - 1];
        group.maxSpread = Math.max(eventsInRange.length, group.maxSpread);
        group.eventItems = Array.from(
          new Set([...group.eventItems, ...eventsInRange])
        );
      }

      return groups;
    }, []);
    return result;
  }

  protected dateRangeChanged() {
    super.dateRangeChanged();
    this.allDayDateRange = {start: startOfDay(this.dateRange.start), end: endOfDay(this.dateRange.end)};
    this.cdRef.markForCheck();
  }

  arrayContainsAny(array1: Array<any>, array2: Array<any>): boolean {
    let result = false;
    for (let index = 0; index < array2.length; index++) {
      const element = array2[index];
      if (array1.indexOf(element) > -1) {
        result = true;
        break;
      }
    }
    return result;
  }

  protected excludeEvent(event: EventItem): boolean {
    return event.isMultiDay || event.isAllDay;
  }
}
