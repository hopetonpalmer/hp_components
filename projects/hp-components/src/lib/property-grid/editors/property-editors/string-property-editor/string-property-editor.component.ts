import { Component, OnInit } from '@angular/core';
import { PropertyEditor } from '../property-editor';

@Component({
  selector: 'hpc-number-property-editor',
  template: `
  <div class="hpc-simple-editor">
    <span>{{propertyConfig.displayName}}</span>
    <input type='text' [value]="getPropertyValue()" (change)="setPropertyValue($event.target.value)">
  </div>`,
  styleUrls: ['../../editor-styles.css']
})
export class StringPropertyEditorComponent extends PropertyEditor
  implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() { }
}


