import { Component, OnInit, Input } from '@angular/core';
import { PropertyEditor } from '../property-editor';

@Component({
  selector: 'hpc-style-property-editor',
  templateUrl: './style-property-editor.component.html',
  styleUrls: ['./style-property-editor.component.css']
})
export class StylePropertyEditorComponent extends PropertyEditor implements OnInit {

  constructor() {
    super();
  }

  get borderColor(): string {
     const result = this.getStyleValue('borderColor');
     return result;
  }

  set borderColor(value: string) {
    // (selectedColorChange) = "setStyleValue('borderColor', $event)"
    this.setStyleValue('borderColor', value);
  }

  ngOnInit() {
  }

}
