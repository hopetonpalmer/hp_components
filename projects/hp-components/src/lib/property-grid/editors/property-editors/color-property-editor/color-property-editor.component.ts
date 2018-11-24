import { Component, OnInit } from '@angular/core';
import { PropertyEditor } from '../property-editor';

@Component({
  selector: 'hp-color-property-editor',
  template: `
  <div class="hp-simple-editor">
    <span>{{propertyConfig.displayName}}</span>
    <hp-color-combo-box
      [selectedColor]="getPropertyValue()"
      (selectedColorChange)="setPropertyValue($event)">
    </hp-color-combo-box>
  </div>`,
  styleUrls: ['../../editor-styles.css']
})
export class ColorPropertyEditorComponent extends PropertyEditor implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
}
