import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'hpc-color-combo-box',
  templateUrl: './color-combo-box.component.html',
  styleUrls: ['./color-combo-box.component.css', '../../hp-components.css']
})
export class ColorComboBoxComponent implements OnInit {

  _selectedColor: string;
  @Input()
  set selectedColor(value: string) {
    if (this._selectedColor !== value) {
      this._selectedColor = value;
      this.selectedColorChange.emit(value);
    }
  }

  get selectedColor(): string {
    return this._selectedColor;
  }

  @Output()
  selectedColorChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

}
