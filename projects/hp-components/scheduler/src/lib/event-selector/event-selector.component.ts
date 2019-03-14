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
import { addMinutes } from 'date-fns';




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
  private _isSizing = false;
  private _minSize = 20;
  private _startPos: Point;
  private _currentPos = new Point();
  private _cellAtMouse: EventCellDirective;

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

  protected get isSizing(): boolean {
    return this._isSizing;
  }

  protected set isSizing(value: boolean) {
    this._isSizing = value;
  }

  constructor(private elRef: ElementRef, private selectorService: EventSelectorService,
    private cellService: EventCellService,
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

      if (!this.isSizing) {
        if (this.canDrag(event)) {
          this.fillParent();
          this.setCursor('move');
          this.dragMove(event, delta);
        }
      } else {
        this.fillParent();
        this.dragSize(event, delta);
      }
    }
  }

  @HostListener('document:pointerdown', ['$event'])
  onPointerDown(event: PointerEvent) {
    this.isSizing = this._sizePos !== SizePos.None;
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
      this.isSizing = false;
    }
    this.setCursor();
  }

  getDragData(e: PointerEvent): IDragData {
    const el = this.elRef.nativeElement as HTMLElement;
    const rect = new Rect(this.left + 1, this.top + 1, this.width - 1, this.height - 1);
    let endPoint: Point;
    let endDate: Date = null;
    // const startPoint = this.isSizing ? new Point(e.pageX - e.offsetX, e.pageY - e.offsetY) : new Point(rect.left, rect.top);
    const startPoint = rect.topLeft;

   if (this.orientation === 'vertical') {
      endPoint = new Point(rect.bottomRight.x, rect.bottomRight.y + 1); // new Point(startPoint.x, startPoint.y + el.offsetHeight);
     } else {
      endPoint = rect.topRight;
    }


    const startCell = this.cellService.cellAtPos(startPoint);
    if (!startCell) {
      return null;
    }

    const startDate = startCell.timeSlot.startDate;
    if (this.isSizing) {
      const endCell = this.cellService.cellAtPos(endPoint);
      if (!endCell) {
        return null;
      }
      endDate = endCell.timeSlot.startDate;
    } else {
      endDate = addMinutes(startDate, this.eventItem.durationMinutes);
    }
    const dragData = {
      schedulerItem: this.eventItem,
      startDate: startDate,
      endDate: endDate,
      orientation: this.orientation,
      isSizing: this._isSizing, dropRect: rect
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
      parentElement.style.cursor = cursor;
    }
  }

  trySetSizer(event: PointerEvent) {
    if (this.isSizing || event.buttons === 1) {
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
        this.setCursor();
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
        this.setCursor();
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
    {
      const top = this.eventRect.top + delta.y;
      const pos = new Point(event.pageX, top);
      this.top = pos.y;
     /*  const cell = this.cellService.cellAtPos(pos);
      if (cell) {
         this.top = cell.cellRect.top;
      } */
    }

    {
      const left = this.eventRect.left + delta.x;
      this.left = left;
     /*  const top = this.eventRect.top + delta.y;
      const pos = new Point(event.pageX, top);
      let cell = this.cellService.cellAtPos(pos);
      if (!cell) {
        cell = this.cellService.cellAtPos(new Point(pos.x + 1, pos.y + 1));
        if (!cell) {
          cell = this.cellService.cellAtPos(new Point(pos.x - 1, pos.y + 1));
        }
      }
      if (cell) {
        this.left = cell.cellRect.left;
      } else {
        console.log(this.left);
      } */
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
