import { Component, OnInit } from '@angular/core';
import { PropertyEditor } from '../property-editor';

@Component({
  selector: 'hp-number-property-editor',
  template: `
  <div class="hp-simple-editor">
    <span>{{propertyConfig.displayName}}</span>
    <textarea [rows]="propertyConfig.lineCount" [value]="getPropertyValue()" (change)="setPropertyValue($event.target.value)"></textarea>
  </div>`,
  styleUrls: ['../../editor-styles.css']
})
export class MediaSourcePropertyEditorComponent extends PropertyEditor {
  constructor() {
    super();
  }
}
