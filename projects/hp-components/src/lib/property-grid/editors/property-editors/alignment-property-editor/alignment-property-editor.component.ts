import { Component, OnInit, Injector } from '@angular/core';
import { PropertyEditor } from '../property-editor';

@Component({
  selector: 'hp-alignment-property-editor',
  templateUrl: './alignment-property-editor.component.html',
  styleUrls: ['./alignment-property-editor.component.css']
})
export class AlignmentPropertyEditorComponent extends PropertyEditor implements OnInit {

  constructor() {
      super();
   }

  ngOnInit() {
  }

}
