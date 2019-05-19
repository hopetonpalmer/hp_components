import { Component, OnInit, ChangeDetectionStrategy, HostBinding, Input, OnDestroy, ElementRef, DoCheck, ViewChild } from '@angular/core';
import { TimelineViewComponent } from '../timeline-view/timeline-view.component';
import { EventItem } from '../../event-item/event-item';
import { IRect, intersectedRects } from '@hp-components/common';
import { Rect } from '@hp-components/common';
import { SchedulerViewType } from '../../types';

@Component({
  selector: 'hp-timeline-day-view',
  templateUrl: './timeline-day-view.component.html',
  styleUrls: [
    '../../styles.css',
    '../timeline-view/timeline-view.component.css',
    './timeline-day-view.component.css'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineDayViewComponent extends TimelineViewComponent {

  /*  @HostBinding('style.height.px')
  viewHeight: number; */

  protected lastCellInclusive = true;


  @Input()
  growToFitEvents = false;

  @Input()
  minHeight: number;

  @Input()
  maxHeight: number;

  @Input()
  headerOffset = 56;

  @Input()
  footerOffset = 0;

  @Input()
  strictMinHeight = true;

  @Input()
  viewType: SchedulerViewType;

  @ViewChild('header') header: ElementRef;
  @ViewChild('event_grid') eventGrid: ElementRef;


/*   @HostBinding('style.min-height')
  getMinHeight(): string {
    if (this.isAllDay) {
      return 'auto';
    }
    return this.minHeight + 'px';
  }
 */
  protected setViewDefaults() {
    this.dateFormats['day'] = 'd';
    this.intervalTypes = ['Day'];
    this.minuteInterval = 30;
  }

  detectChanges() {
     this.cdRef.detectChanges();
  }

  protected excludeEvent(event: EventItem): boolean {
    if (this.isFullDayEventsOnly) {
      return !(event.isAllDay || event.isMultiDay);
    }
    return super.excludeEvent(event);
  }
  protected setViewHeight(rects: IRect[], margin: number) {
     if (!this.growToFitEvents) {
       return;
     }
     const el = this.elRef.nativeElement as HTMLElement;
     if (!rects.length) {
       el.style.minHeight = this.minHeight + 'px';
       return;
     }
     const rectangles = rects.reduce((r, rect) => {
       r.push(new Rect(rect.left, rect.top, rect.width, rect.height));
       return r;
     }, new Array<Rect>());

    const sortedRects = this.sortRects(rectangles);
    let height = sortedRects[sortedRects.length - 1].bottom - sortedRects[0].top +
      margin + this.headerOffset + this.footerOffset;

     if (this.maxHeight) {
       height = Math.min(this.maxHeight, height);
       // (this.eventGrid.nativeElement as HTMLElement).style.height = height + 'px';
     }
    el.style.minHeight = Math.max(this.minHeight, height) + 'px';



    /*  if (this.strictMinHeight) {
        el.style.height = Math.max(this.minHeight, height) + 'px';
     } else {
       if (height > this.minHeight) {
         el.style.height = height + 'px';
       }
     } */
  }

  private sortRects(rectangles: Rect[]) {
    return rectangles.sort((a, b) => a.bottom - b.bottom);
  }

  protected rectOfEvent(item: EventItem): IRect {
    const indent = 2;
    let top = 0;
    let left = 0;
    let height = 0;
    let width = 0;
    let rect = { top: top, left: left, height: height, width: width };

    const startCell = this.cellOfDate(item.start);
    const endCell = this.cellOfDate(item.end);
    if (!startCell && !endCell) {
      return rect;
    }

    const startRect = startCell.cellRect;
    const endRect = endCell.cellRect;
    if (startRect && endRect) {
      const parentEl = this.eventGrid.nativeElement;
      const parentRect = this.viewRect;
      top = startRect.top - parentRect.top + parentEl.scrollTop;
      left = startRect.left - parentRect.left + parentEl.scrollLeft + indent / 2;
      height = this.eventHeight;
      width = endRect.left + endRect.width - startRect.left - indent * 1.5;
      rect = { top: top, left: left, width: width, height: height };
    }
    return rect;
  }
}
