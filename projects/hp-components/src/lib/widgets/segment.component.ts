import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hp-segment',
  template: `
  <div  [ngClass]="{'hp-fill-parent': isRoot}" class="hp-segment">
    <ng-content></ng-content>
  </div>
  `,
  styles: []
})
export class SegmentComponent {
  @Input()
  isRoot: boolean;
}
