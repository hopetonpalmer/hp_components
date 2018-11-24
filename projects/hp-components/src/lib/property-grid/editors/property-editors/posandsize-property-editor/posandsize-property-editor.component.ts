import { Component, OnInit } from '@angular/core';
import { PropertyEditor } from '../property-editor';

@Component({
  selector: 'hp-posandsize-property-editor',
  templateUrl: './posandsize-property-editor.component.html',
  styleUrls: ['./posandsize-property-editor.component.css', '../../editor-styles.css']
})
export class PosandsizePropertyEditorComponent extends PropertyEditor implements OnInit {

  title = 'Position and size';
  constructor() {
    super();
   }

  ngOnInit() {
  }

  getStyleValue(style: string): string {
    let result = super.getStyleValue(style);
    if (result === 'auto') {
      result = '0';
    }
    return result;
  }
}
