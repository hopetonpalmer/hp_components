import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'hpc-color-combo-box',
  templateUrl: './color-combo-box.component.html',
  styleUrls: ['./color-combo-box.component.css', '../../hp-components.css']
})
export class ColorComboBoxComponent implements OnInit {

  _selectedColor: any;
  @Input()
  set selectedColor(value: any) {
    if (this._selectedColor !== value) {
      this._selectedColor = value;
      this.selectedColorChange.emit(value);
    }
  }

  get selectedColor(): any {
    return this._selectedColor;
  }

  @Output()
  selectedColorChange = new EventEmitter<string>();


  constructor() { }

  ngOnInit() {
  }

}
