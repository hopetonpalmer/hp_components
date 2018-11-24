import { Component, OnInit } from '@angular/core';
import { PropertyEditor } from '../property-editor';
import { ColorFillType } from '../../../../ui/color-picker/helpers';

@Component({
  selector: 'hp-background-property-editor',
  templateUrl: './background-property-editor.component.html',
  styleUrls: ['./background-property-editor.component.css', '../../../../hp-components.css']
})
export class BackgroundPropertyEditorComponent extends PropertyEditor implements OnInit {

  colorFillType: ColorFillType = 'fill';
  get activeProperty(): string {
     if (this.colorFillType === 'fill') {
       return 'backgroundColor';
     }
     return 'borderColor';
  }

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
