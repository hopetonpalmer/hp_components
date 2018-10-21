import { Component, OnInit } from '@angular/core';
import { PropertyEditor } from '../property-editor';

@Component({
  selector: 'hpc-number-property-editor',
  template: `
  <div class="hpc-simple-editor">
    <span>{{propertyConfig.displayName}}</span>
    <textarea [value]="getPropertyValue()" (change)="setPropertyValue($event.target.value)"></textarea>
  </div>`,
  styleUrls: ['../../editor-styles.css']
})
export class MediaSourcePropertyEditorComponent extends PropertyEditor {
  constructor() {
    super();
  }
}
