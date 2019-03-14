import { Directive, ElementRef, EventEmitter, Output, HostBinding, HostListener, Input } from '@angular/core';
import { DragService } from './drag.service';
import { Point } from '@hp-components/common';
import { IDragData } from '../interfaces/i-drag-data';


@Directive({
  selector: '[hpDragDrop]'
})
export class DragDropDirective {
  private pointerId?: number;
  private pointerDownPos: Point;


  get startDragOffset() {
    if (this.dragData.isSizing) {
      return 0;
    }
    return 2;
  }

  @Input()
  dragData: IDragData;

  @Output() dragStart = new EventEmitter<PointerEvent>();
  @Output() dragMove = new EventEmitter<PointerEvent>();
  @Output() dragEnd = new EventEmitter<PointerEvent>();

  @HostBinding('class.draggable') draggable = true;
  @HostBinding('class.dragging') dragging = false;

  constructor(private elRef: ElementRef, private dragService: DragService) {}

  @HostListener('pointerdown', ['$event'])
  onPointerDown(event: PointerEvent): void {
    if (event.button !== 0) {
      return;
    }

    this.pointerDownPos = new Point(event.pageX, event.pageY);
    this.prepareToDrag(event);
    this.pointerId = event.pointerId;

    // this.dragging = true;
    // this.dragStart.emit(event);
  }

  @HostListener('document:pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    if (event.pointerId !== this.pointerId) {
      return;
    }

    if (!this.dragging && this.canDrag(event)) {
      this.startDrag(event);
    }

    if (!this.dragging) {
      return;
    }

    this.dragMove.emit(event);
  }

  @HostListener('document:keydown.escape')
  onEscapteKeyPressed() {this.cancelDrag(); }

  @HostListener('document:pointercancel', ['$event'])
  @HostListener('document:pointerup', ['$event'])
  onPointerUp(event: PointerEvent): void {
    this.pointerDownPos = null;
    if (!this.dragging || event.pointerId !== this.pointerId) {
      return;
    }

    this.dragging = false;
    this.dragEnd.emit(event);
  }

  @HostListener('dragStart', ['$event'])
  onDragStart(event: PointerEvent): void {
    this.dragService.onDragStart(event, this.dragData);
    if (!this.dragData.isSizing) {
      (this.elRef.nativeElement as HTMLElement).style.cursor = 'move';
    }
  }

  @HostListener('dragMove', ['$event'])
  onDragMove(event: PointerEvent): void {
    this.dragService.onDragMove(event);
  }

  @HostListener('dragEnd', ['$event'])
  onDragEnd(event: PointerEvent): void {
    this.dragService.onDragEnd(event);
    (this.elRef.nativeElement as HTMLElement).style.cursor = 'default';
  }

  prepareToDrag(event: PointerEvent) {

  }

  private startDrag(event: PointerEvent) {
    this.pointerId = event.pointerId;
    this.dragging = true;
    this.dragStart.emit(event);
  }

  canDrag(event: PointerEvent): boolean {
     return this.pointerDownPos && (Math.abs(this.pointerDownPos.x - event.pageX) >= this.startDragOffset ||
       Math.abs(this.pointerDownPos.y - event.pageY) >= this.startDragOffset);
  }

  cancelDrag() {
    this.dragging = false;
    this.pointerDownPos = null;
    (this.elRef.nativeElement as HTMLElement).style.cursor = 'default';
    this.dragService.onDragCancel();
  }
}
