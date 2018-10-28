import { Component, OnInit, Input } from '@angular/core';
import { PropertyEditor } from '../property-editor';

@Component({
  selector: 'hpc-number-property-editor',
  template: `
  <div class="hpc-simple-editor">
    <div>{{propertyConfig.displayName}}</div>
    <textarea [rows]="propertyConfig.lineCount" [placeholder]="propertyConfig.placeHolder"
     [value]="getPropertyValue()" (change)="setPropertyValue($event.target.value)"></textarea>

  </div>`,
  styleUrls: ['../../editor-styles.css']
})
export class StringPropertyEditorComponent extends PropertyEditor
  implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
}


