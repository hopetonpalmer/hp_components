import { Component, OnInit, Input, HostBinding, HostListener, ElementRef, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { EventItem } from '../event-item/event-item';
import { IRect, Point, Rect } from '@hp-components/common';
import { Subscription } from 'rxjs';
import { DragService } from '../draggable/drag.service';
import { Orientation, pointInRect } from '@hp-components/common';
import { SchedulerEventService } from '../services/scheduler-event.service';
import { IDragData } from '../interfaces/i-drag-data';
import { EventSelectorService } from './event-selector-service';
import { EventCellService } from '../event-grid/event-cell/event-cell-service';
import { EventCellDirective } from '../event-grid/event-cell/event-cell.directive';
import { addMinutes, subHours, differenceInCalendarDays, isSameDay } from 'date-fns';
import { SchedulerViewService } from '../views/scheduler-view.service';


export enum DragState {
  Idle,
  Sizing,
  Dragging,
  PrepareToDrag
}

export enum SizePos {
  None,
  Top,
  Left,
  Bottom,
  Right
}

@Component({
  selector: 'hp-event-selector',
  templateUrl: './event-selector.component.html',
  styleUrls: ['./event-selector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventSelectorComponent implements OnInit, OnDestroy {
  private _dragCancelSubscription: Subscription;
  private _sizePos = SizePos.None;
  private _minSize = 20;
  private _startPos: Point;
  private _currentPos = new Point();
  private _cellAtMouse: EventCellDirective;
  private _pointerId: number;

  dragData: IDragData;

  @Input()
  eventItem: EventItem;

  @HostBinding('style.top.px')
  top: number;

  @HostBinding('style.left.px')
  left: number;

  @HostBinding('style.height.px')
  height: number;

  @HostBinding('style.width.px')
  width: number;

  @HostBinding('style.border-radius')
  borderRadius: string;

  @HostBinding('style.transform')
  transform = '';

  moreBefore: boolean;
  moreAfter: boolean;
  parentWidth: number;
  parentLeft: number;
  startCell: EventCellDirective;
  endCell: EventCellDirective;

  private _eventRect: IRect;
  @Input()
  set eventRect(value: IRect) {
    this.left = value.left;
    this.top = value.top;
    this.height = value.height;
    this.width = value.width;
    this._eventRect = value;
  }

  @Input()
  orientation: Orientation;

  get eventRect(): IRect {
    return this._eventRect;
  }

  get clientRect() {
    return (this.elRef.nativeElement as HTMLElement).getBoundingClientRect();
  }

  get dragDelta(): Point {
    const result = new Point(this._currentPos.x - this._startPos.x, this._currentPos.y - this._startPos.y);
    return result;
  }

  get changed(): boolean {
    const rect = this.eventRect;
    return rect.left !== this.left ||
      rect.top !== this.top ||
      rect.height !== this.height ||
      rect.width !== this.width;
  }

  private _dragState: DragState;
  get dragState(): DragState {
    return this._dragState;
  }

  set dragState(value: DragState) {
    this._dragState = value;
  }

  constructor(private elRef: ElementRef,
    private selectorService: EventSelectorService,
    private cellService: EventCellService,
    private schedulerViewService: SchedulerViewService,
    private schedulerEventService: SchedulerEventService) { }


  @HostListener('document:keydown.escape')
  onEscapeKeyPressed() { this.cancelDrag(); }

  @HostListener('document:keyup.delete')
  onDeleteKeyPressed() {
    this.schedulerEventService.deleteEventItem(this.eventItem);
  }

  @HostListener('document:pointermove', ['$event'])
  onPointerMove(event: PointerEvent) {
    const hasMouse = this.isMouseOver(event);
    this.selectorService.setActive(hasMouse);
    this._currentPos = new Point(event.pageX, event.pageY);
    this.trySetSizer(event);
    if (!this._startPos && event.buttons === 1) {
      this._startPos = new Point(event.pageX, event.pageY);
    }
    if (event.buttons === 1) {
      const delta = this.dragDelta;

     /*  const cellAtMouse = this.cellService.cellAtPos(this._currentPos);
      if (this._cellAtMouse && cellAtMouse && this._cellAtMouse === cellAtMouse) {
        return;
      }
      this._cellAtMouse = cellAtMouse; */

      if ((this.dragState === DragState.Dragging || this.dragState === DragState.PrepareToDrag) && this.canDrag(event)) {
          this.fillParent();
          if (this.dragState === DragState.PrepareToDrag) {
            this.dragState = DragState.Dragging;
            this.setCursor('move');
          }
          this.dragMove(event, delta);
      }

      if (this.dragState === DragState.Sizing) {
        this.fillParent();
        this.dragSize(event, delta);
      }
    }
  }

  @HostListener('document:pointerdown', ['$event'])
  onPointerDown(event: PointerEvent) {
    this._pointerId = event.pointerId;
    this.elRef.nativeElement.setPointerCapture(event.pointerId);
    if (this._sizePos === SizePos.None) {
      this.dragState = DragState.PrepareToDrag;
    } else {
      this.dragState = DragState.Sizing;
    }
    this._startPos = new Point(event.pageX, event.pageY);
  }

  @HostListener('document:pointerup', ['$event'])
  onPointerUp(e: PointerEvent) {
    this.dropEvent(e);
  }

  dropEvent(e: PointerEvent) {
    if (this.changed) {
      const dragData = this.getDragData(e);
      this.schedulerEventService.unSelectAll();
      if (dragData) {
        this.schedulerEventService.moveEventItem({ event: e, item: dragData });
      }
      this.dragState = DragState.Idle;
    }
    this.setCursor();
  }

  getDragData(e: PointerEvent): IDragData {
    const offset = 1; // this.dragState === DragState.Sizing ? 0 : 1;
    const rect = new Rect(this.left + offset, this.top + offset, this.width - (offset * 1), this.height - (offset * 1));
    let endPoint: Point;
    let endDate: Date = null;
    // const startPoint = this.isSizing ? new Point(e.pageX - e.offsetX, e.pageY - e.offsetY) : new Point(rect.left, rect.top);
    const startPoint = rect.topLeft;
    let startCell = this.cellService.cellAtPos(startPoint);
    if (!startCell) {
      startCell = this.cellService.cellOfDate(this.eventItem.start);
    }
    const startDate = startCell.timeSlot.startDate;

    if (this.orientation === 'vertical') {
      endPoint = new Point(rect.bottomRight.x, rect.bottomRight.y + 1); // new Point(startPoint.x, startPoint.y + el.offsetHeight);
    } else {
      if (startCell.timeSlot.viewType === 'Timeline') {
        endPoint = new Point(startPoint.x + this.elRef.nativeElement.offsetWidth, startPoint.y);
        //endPoint = new Point(rect.topRight.x + 2, rect.topRight.y) ;
      } else {
        endPoint = rect.topRight;
      }
    }

    if (this.dragState === DragState.Sizing) {
      //const endCell = this.cellService.cellAtPos(endPoint);
       const endCell = this.cellService.cellInPos([endPoint, new Point(endPoint.x - 1, endPoint.y)]);
      if (!endCell) {
        return null;
      }
      endDate = endCell.timeSlot.startDate;
    } else {
      endDate = addMinutes(startDate, this.eventItem.durationMinutes);
      if (startDate.isDst() && this.eventItem.durationMinutes < 1440 && !isSameDay(startDate, endDate)) {
        endDate = subHours(endDate, 1);
      }
    }
    console.log(endDate);
    const dragData = {
      schedulerItem: this.eventItem,
      startDate: startDate,
      endDate: endDate,
      orientation: this.orientation,
      startCell: startCell,
      endCell: this.endCell,
      isSizing: this.dragState === DragState.Sizing, dropRect: rect
    };

    return dragData;
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {

  }

  isMouseOver(event: PointerEvent): boolean {
    const offset = 2;
    const mousePoint = new Point(event.pageX, event.pageY);
    const r = this.clientRect;
    const isInRect = pointInRect(mousePoint, new Rect(r.left - offset, r.top - offset, r.width + offset, r.height + offset));
    return isInRect;
  }

  setCursor(cursor: string = 'default') {
    this.elRef.nativeElement.style.cursor = cursor;
    const parentElement = this.elRef.nativeElement.parentElement;
    if (parentElement) {
     // parentElement.style.cursor = cursor;
    }
    console.log(cursor);
  }

  trySetSizer(event: PointerEvent) {
    if (event.buttons === 1) {
      return;
    }
    const target = event.target as HTMLElement;
    this._sizePos = SizePos.None;
    if (this.orientation === 'vertical') {
      const sizeOffset = 8;
      if (!this.moreBefore && this.height > this._minSize && event.offsetY <= sizeOffset) {
        this._sizePos = SizePos.Top;
        this.setCursor('ns-resize');
      } else if (!this.moreAfter && (target.offsetHeight - event.offsetY <= sizeOffset)) {
        this._sizePos = SizePos.Bottom;
        this.setCursor('ns-resize');
      } else {
        this.setCursor('move');
      }
    }
    if (this.orientation === 'horizontal') {
      const sizeOffset = 8;
      if (!this.moreBefore && this.width > this._minSize && event.offsetX <= sizeOffset) {
        this._sizePos = SizePos.Left;
        this.setCursor('ew-resize');
      } else if (!this.moreAfter && target.offsetWidth - event.offsetX <= sizeOffset) {
        this._sizePos = SizePos.Right;
        this.setCursor('ew-resize');
      } else {
        this.setCursor('move');
      }
    }
  }

  canDrag(event: PointerEvent): boolean {
    const startDragOffset = 2;
    const result = this._startPos && (Math.abs(this._startPos.x - event.pageX) >= startDragOffset ||
      Math.abs(this._startPos.y - event.pageY) >= startDragOffset);
    return result;
  }

  dragMove(event: PointerEvent, delta: Point) {
    const viewType = this.schedulerViewService.getActiveViewType();

      const top = this.eventRect.top + delta.y;
      const  topPos = new Point(event.pageX, top);
      if (viewType === 'Timeline' || viewType === 'TimelineMonth' || viewType === 'TimelineWeek') {
        this.top = topPos.y;
      } else {
        const topCell = this.cellService.cellAtPos(topPos);
        if (topCell) {
          this.top = topCell.cellRect.top;
        }
      }


      let left = event.pageX;
      // const top = this.eventRect.top + delta.y;
    if (viewType === 'Timeline' || viewType === 'TimelineMonth' || viewType === 'TimelineWeek' || viewType === 'Month') {
        left = this.eventRect.left + delta.x;
      }
      // this.left = left;
      const leftPos = new Point(left, top);
      let cell = this.cellService.cellAtPos(leftPos);
      if (!cell) {
        cell = this.cellService.cellAtPos(new Point(leftPos.x + 1, leftPos.y + 1));
        if (!cell) {
          cell = this.cellService.cellAtPos(new Point(leftPos.x - 1, leftPos.y + 1));
        }
      }
      if (cell) {
        this.left = cell.cellRect.left;
      } else {
        console.log(this.left);
      }

  }

  dragSize(event: PointerEvent, delta: Point) {
    const pos = new Point(event.pageX, event.pageY);
    const cell = this.cellService.cellAtPos(pos);
    if (!cell) {
      return;
    }
    const r = cell.cellRect;
    const cellRect = new Rect(r.left, r.top, r.width, r.height);
    let height = this.height;
    let width = this.width;
    let top = this.top;
    let left = this.left;
    switch (this._sizePos) {
      case SizePos.Top:
        top = cellRect.top;  // this.eventRect.top + delta.y;
        height = this.eventRect.top + this.eventRect.height - top; // this.eventRect.height - delta.y;
        break;
      case SizePos.Bottom:
        height = cellRect.bottom - top;  // this.eventRect.height + delta.y;
        break;
      case SizePos.Left:
        left = cellRect.left; // this.eventRect.left + delta.x;
        width = this.eventRect.left + this.eventRect.width - left; // width - delta.x;
        break;
      case SizePos.Right:
        width = cellRect.right - left; // this.eventRect.width + delta.x;
        break;
    }
    if (height > this._minSize) {
      this.top = top;
      this.height = height;
    }
    if (width > this._minSize) {
      this.left = left;
      this.width = width;
    }
  }

  cancelDrag() {
    this.schedulerEventService.unSelectEventItem(this.eventItem);
    this.setCursor();
  }

  fillParent() {
    if (this.orientation === 'vertical') {
      this.left = this.parentLeft;
      this.width = this.parentWidth;
    }
  }
}
