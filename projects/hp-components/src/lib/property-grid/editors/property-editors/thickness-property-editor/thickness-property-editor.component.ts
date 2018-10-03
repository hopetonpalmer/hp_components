import { Component, OnInit, Input } from '@angular/core';
import { properCase } from '../../../../scripts/strings';
import { PropertyEditor } from '../property-editor';

type location = 'left' | 'top' | 'right' | 'bottom';

@Component({
  selector: 'hpc-thickness-property-editor',
  templateUrl: './thickness-property-editor.component.html',
  styleUrls: ['./thickness-property-editor.component.css']
})
export class ThicknessPropertyEditorComponent extends PropertyEditor implements OnInit {
  @Input()
  title: string;

  @Input()
  description: string;

  @Input()
  basePropName: string;

  @Input()
  propSuffix = 'Width';

  left = 0;
  top = 0;
  right = 0;
  bottom = 0;


  valueUnits = ['px', 'pt', '%'];

  getPropName(prop: location) {
    const result = this.basePropName + properCase(prop) + properCase(this.propSuffix);
    return result;
  }

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
