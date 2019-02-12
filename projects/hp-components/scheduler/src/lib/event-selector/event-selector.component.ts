import { Component, OnInit, Input, HostBinding, HostListener, ElementRef, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { EventItem } from '../event-item/event-item';
import { IRect } from '@hp-components/common';
import { Subscription } from 'rxjs';
import { DragService } from '../draggable/drag.service';
import { Orientation } from '@hp-components/common';




@Component({
  selector: 'hp-event-selector',
  templateUrl: './event-selector.component.html',
  styleUrls: ['./event-selector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventSelectorComponent implements OnInit, OnDestroy {
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

  private _dragMoveSubscription: Subscription;
  private _dragCancelSubscription: Subscription;

  constructor(private elRef: ElementRef, private dragService: DragService) {}

  @HostListener('pointermove', ['$event'])
  onPointerMove(event: PointerEvent) {
    this.elRef.nativeElement.setPointerCapture(event.pointerId);
  }

  @HostListener('pointerDown', ['$event'])
  onPointerDown(event: PointerEvent) {}

  @HostListener('pointerup', ['$event'])
  onPointerUp(event: PointerEvent) {}

  ngOnInit() {
    this._dragMoveSubscription = this.dragService.dragMove$.subscribe(() => {
      const delta = this.dragService.delta;
      // this.transform = `translate3d(${delta.x}px, ${delta.y}px, 0)`;

      this.top = this.eventRect.top + delta.y;
      this.left = this.eventRect.left + delta.x;
    });
  }

  ngOnDestroy(): void {
    this._dragMoveSubscription.unsubscribe();
  }
}
