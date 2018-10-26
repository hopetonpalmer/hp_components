import { Component, OnInit } from '@angular/core';
import { PropertyEditor } from '../property-editor';

@Component({
  selector: 'hpc-color-property-editor',
  template: `
  <div class="hpc-simple-editor">
    <span>{{propertyConfig.displayName}}</span>
    <hpc-color-combo-box
      [selectedColor]="getPropertyValue()"
      (selectedColorChange)="setPropertyValue($event)">
    </hpc-color-combo-box>
  </div>`,
  styleUrls: ['../../editor-styles.css']
})
export class ColorPropertyEditorComponent extends PropertyEditor implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
}
