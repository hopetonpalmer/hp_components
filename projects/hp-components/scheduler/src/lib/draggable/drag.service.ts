import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ISchedulerItem } from '../interfaces/i-scheduler-item';
import { DropEventItemArgs } from '../event-args';
import { Point } from '@hp-components/common';




@Injectable({
  providedIn: 'root'
})
export class DragService {
  private _startPos: Point;
  private _currentPos: Point;

  private dragData: ISchedulerItem;
  private dragStartSubject = new Subject<PointerEvent>();
  private dragMoveSubject = new Subject<PointerEvent>();
  private dragEndSubject = new Subject<DropEventItemArgs>();
  private dragCancelSubject = new Subject();

  dragStart$ = this.dragStartSubject.asObservable();
  dragMove$ = this.dragMoveSubject.asObservable();
  dragEnd$ = this.dragEndSubject.asObservable();
  dragCancel$ = this.dragCancelSubject.asObservable();

  constructor() {}

  private _isActive = false;
  get isActive(): boolean {
    return this._isActive;
  }

  get delta(): Point {
    const result = new Point(this._currentPos.x - this._startPos.x, this._currentPos.y - this._startPos.y) ;
    return result;
  }

  onDragStart(event: PointerEvent, dragData: ISchedulerItem): void {
    this.reset();
    this._isActive = true;
    this._startPos = new Point(event.pageX, event.pageY);
    this.dragData = dragData;
    this.dragStartSubject.next(event);
  }

  onDragMove(event: PointerEvent): void {
    this._currentPos = new Point(event.pageX, event.pageY);
    this.dragMoveSubject.next(event);
  }

  onDragEnd(event: PointerEvent): void {
    this.dragEndSubject.next({event: event, item: this.dragData });
    this.reset();
  }

  onDragCancel(): void {
    this.dragCancelSubject.next();
    this.reset();
  }

  private reset() {
     this.dragData = null;
     this._isActive = false;
     this._startPos = null;
     this._currentPos = null;
  }
}
