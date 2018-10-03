import { Component, OnInit } from '@angular/core';
import { PropertyEditor } from '../property-editor';


@Component({
  selector: 'hpc-font-property-editor',
  templateUrl: './font-property-editor.component.html',
  styleUrls: ['./font-property-editor.component.css']
})
export class FontPropertyEditorComponent extends PropertyEditor implements OnInit {
  safeFonts = ['Arial', 'Helvetica', 'Georgia', 'Times New Roman', 'Trebuchet MS', 'Verdana'];

  get fonts () {
    return this.safeFonts;
  }

  styles = ['Regular', 'Bold', 'Italics', 'Bold Italics'];

  constructor() {
    super();
   }

  ngOnInit() {
  }

}
