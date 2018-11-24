import { Component, OnInit } from '@angular/core';
import { PropertyEditor } from '../property-editor';

@Component({
  selector: 'hp-border-property-editor',
  templateUrl: './border-property-editor.component.html',
  styleUrls: [
    './border-property-editor.component.css',
    '../../editor-styles.css'
  ]
})
export class BorderPropertyEditorComponent extends PropertyEditor
  implements OnInit {
  title = 'Border';
  borderStyles = [
    'dotted',
    'dashed',
    'solid',
    'double',
    'groove',
    'ridge',
    'inset',
    'outset',
    'none'
  ];

  constructor() {
    super();
  }

  ngOnInit() {}
}
