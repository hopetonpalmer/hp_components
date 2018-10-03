import { Component, Input } from '@angular/core';
import { PropertyEditor } from '../property-editor';
import * as dom from '../../../../scripts/dom';


@Component({
  selector: 'hpc-shadow-property-editor',
  templateUrl: './shadow-property-editor.component.html',
  styleUrls: ['./shadow-property-editor.component.css']
})
export class ShadowPropertyEditorComponent extends PropertyEditor {

  title = 'Shadow';

  @Input() hOffset = '';
  @Input() vOffset = '';
  @Input() blur = '';
  @Input() spread = '';
  @Input() color = 'black';

  get shadow(): string {
    let result = 'none';
    if (this.hOffset || this.vOffset || this.blur || this.spread) {
      result = `${this.color} ${this.hOffset} ${this.vOffset} ${this.blur} ${this.spread}`;
    }
    return result;
  }

  set shadow(value: string) {
    const color = dom.getShadowColor(value);
    if (color) {
      value = value.replace(color, '').trim();
    }
    const parts = value.split(' ');
    if (parts.length > 0) {
      this.hOffset = parts[0] ? parts[0] : '0';
      this.vOffset = parts[1] ? parts[1] : '0';
      this.blur = parts[2] ? parts[2] : '0';
      this.spread = parts[3] ? parts[3] : '0';
      this.color = color;
    } else {
      this.hOffset = '';
      this.vOffset = '';
      this.blur = '';
      this.spread = '';
      this.color = '';
    }
  }

  constructor() {
     super();
   }


  elementChanged() {
    let shadow = this.activeElement.style.boxShadow;
    if (shadow === 'none') {
      shadow = '';
    }
    this.shadow = shadow;
  }

  updateElement(part: string = null, value: string = '') {
    if (part) {
      this[part] = value;
    }
    if (this.activeElement) {
      this.activeElement.style.boxShadow = this.shadow;
    }
  }
}
