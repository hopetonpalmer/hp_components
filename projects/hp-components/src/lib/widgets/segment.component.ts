import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hpc-segment',
  template: `
  <div  [ngClass]="{'hpc-fill-parent': isRoot}" class="hpc-segment">
    <ng-content></ng-content>
  </div>
  `,
  styles: []
})
export class SegmentComponent {
  @Input()
  isRoot: boolean;
}
