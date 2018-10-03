import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
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

  ngOnInit() {

  }

}
