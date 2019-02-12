import { Directive, HostBinding, OnDestroy, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { DragService } from './drag.service';
import { Subscription } from 'rxjs';
import { DropEventItemArgs } from '../event-args';

@Directive({
  selector: '[hpDropZone]'
})
export class DropZoneDirective implements OnInit, OnDestroy {
  private dragStartSubscription: Subscription;
  private dragEndSubscription: Subscription;
  private dragMoveSubscription: Subscription;
  private dragCancelSubscription: Subscription;

  @HostBinding('class.dropzone-activated')
  activated = false;

  @HostBinding('class.dropzone-entered')
  entered = false;

  @Output() drop = new EventEmitter<DropEventItemArgs>();
  @Output() remove = new EventEmitter<PointerEvent>();
  @Output() cancel = new EventEmitter();

  private clientRect: ClientRect;

  constructor(private elRef: ElementRef, private dragService: DragService) {}

  ngOnInit(): void {
    this.dragStartSubscription = this.dragService.dragStart$.subscribe(() =>
      this.onDragStart()
    );

    this.dragEndSubscription = this.dragService.dragEnd$.subscribe(event => {
      this.onDragEnd(event);
      this.reset();
    });

    this.dragMoveSubscription = this.dragService.dragMove$.subscribe(event => {
      if (this.isEventInside(event)) {
        this.onPointerEnter();
      } else {
        this.onPointerLeave();
      }
    });

    this.dragCancelSubscription = this.dragService.dragCancel$.subscribe(() => {
       this.onDragCancel();
       this.reset();
    });

  }
  ngOnDestroy(): void {
    this.dragStartSubscription.unsubscribe();
    this.dragEndSubscription.unsubscribe();
    this.dragMoveSubscription.unsubscribe();
    this.dragCancelSubscription.unsubscribe();
  }

  private onPointerEnter(): void {
    if (!this.activated) {
      return;
    }

    this.entered = true;
  }

  private onPointerLeave(): void {
    if (!this.activated) {
      return;
    }

    this.entered = false;
  }

  private onDragStart(): void {
    this.clientRect = this.elRef.nativeElement.getBoundingClientRect();
    this.activated = true;
    this.elRef.nativeElement.style.cursor = 'move';
  }

  private onDragEnd(event: DropEventItemArgs): void {
    if (!this.activated) {
      return;
    }

    if (this.entered) {
      this.drop.emit(event);
    }

    this.activated = false;
    this.entered = false;
  }

  private onDragCancel(): void {
    this.cancel.emit();
  }

  private onInnerDragStart() {
    this.activated = true;
    this.entered = true;
  }

  private onInnerDragEnd(event: PointerEvent) {
    if (!this.entered) {
      this.remove.emit(event);
    }

    this.activated = false;
    this.entered = false;
  }

  private isEventInside(event: PointerEvent) {
    return (
      event.clientX >= this.clientRect.left &&
      event.clientX <= this.clientRect.right &&
      event.clientY >= this.clientRect.top &&
      event.clientY <= this.clientRect.bottom
    );
  }

  private reset() {
    this.elRef.nativeElement.style.cursor = 'default';
  }
}
