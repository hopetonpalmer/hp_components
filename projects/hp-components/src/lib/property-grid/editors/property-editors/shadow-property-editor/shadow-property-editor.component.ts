import { Component, Input } from '@angular/core';
import { PropertyEditor } from '../property-editor';
import * as dom from '../../../../scripts/dom';

export type ShadowType = 'box' | 'text';

@Component({
  selector: 'hp-shadow-property-editor',
  templateUrl: './shadow-property-editor.component.html',
  styleUrls: ['./shadow-property-editor.component.css', '../../editor-styles.css']
})
export class ShadowPropertyEditorComponent extends PropertyEditor {

  title = 'Shadow';

  // -- future feature - support of a collection of shadows separated by comma
  shadows = [''];

  @Input() hOffset = '';
  @Input() vOffset = '';
  @Input() blur = '';
  @Input() spread = '';
  @Input() color = 'black';
  @Input() shadowType: ShadowType = 'box';

  get propName(): string {
    if (this.shadowType === 'box') {
      return 'boxShadow';
    }
    return 'textShadow';
  }

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
      if (this.shadowType === 'box') {
         this.spread = parts[3] ? parts[3] : '0';
      }
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
    let shadow = this.getStyleValue(this.propName);
    if (shadow === 'none') {
      shadow = '';
    }
    this.shadow = shadow;
  }

  updateShadow(part: string = null, value: string = '') {
    if (part) {
      this[part] = value;
    }
    if (this.activeElement) {
      this.setStyleValue(this.propName, this.shadow);
    }
  }
}
