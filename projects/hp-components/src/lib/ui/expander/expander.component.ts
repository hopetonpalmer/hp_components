import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'hpc-expander',
  templateUrl: './expander.component.html',
  styleUrls: ['../../hp-components.css', './expander.component.css']
})
export class ExpanderComponent implements OnInit {
  @Input()
  caption: string;

  @Input()
  animate = true;

  @Output()
  isExpandedChange = new EventEmitter<boolean>();
  animateClose = false;

  private _isExpanded = false;
  @Input()
  set isExpanded(value: boolean) {
    if (value !== this._isExpanded) {
      this.animateClose = value === false;
      if (this.animateClose && this.animate) {
        const animationTime = 0; // 150;
        setTimeout(() => {
          this._isExpanded = value;
          this.isExpandedChange.emit(value);
          this._cdRef.detectChanges();
        }, animationTime);
      } else {
        this._isExpanded = value;
        this.isExpandedChange.emit(value);
        this._cdRef.detectChanges();
      }
    }
  }

  get isExpanded(): boolean {
    return this._isExpanded;
  }

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }

  constructor(private _cdRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

}
