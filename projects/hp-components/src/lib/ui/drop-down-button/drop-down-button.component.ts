import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'hp-drop-down-button',
  templateUrl: './drop-down-button.component.html',
  styleUrls: ['../../hp-components.css', './drop-down-button.component.css']
})
export class DropDownButtonComponent implements OnInit {
  get isOpen(): boolean {
    return this._isOpen;
  }

  get popupWidth(): string {
    return this.parent.nativeElement.clientWidth + 'px';
  }

  constructor() { }

  @Output()
  openChange = new EventEmitter<boolean>();

  private _isOpen = false;

  @ViewChild('parent') parent: ElementRef;

  open() {
    this._isOpen = true;
    this.openChange.emit(true);
  }

  close() {
    this._isOpen = false;
    this.openChange.emit(false);
  }

  toggleOpen() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  ngOnInit() {
  }

}
