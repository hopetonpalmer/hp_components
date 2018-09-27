import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'hpc-drop-down-button',
  templateUrl: './drop-down-button.component.html',
  styleUrls: ['./drop-down-button.component.css']
})
export class DropDownButtonComponent implements OnInit {

  @Output()
  openChange = new EventEmitter<boolean>();

  @Input()
  title: string;

  private _isOpen = false;
  get isOpen(): boolean {
    return this._isOpen;
  }

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
  constructor() { }

  ngOnInit() {
  }

}
