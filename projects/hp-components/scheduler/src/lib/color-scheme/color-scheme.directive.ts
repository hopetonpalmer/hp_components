import { Directive, Input, ElementRef, HostBinding } from '@angular/core';
import { ColorScheme } from './color-scheme';
import { IColorSet, IColorScheme } from '../interfaces/i-color-scheme';

@Directive({
  selector: '[hpColorScheme]'
})
export class ColorSchemeDirective {

  private _colorScheme: IColorScheme = new ColorScheme();
  @Input()
  get colorScheme(): IColorScheme {
    return this._colorScheme;
  }

  set colorScheme(value: IColorScheme) {
    this._colorScheme = value;
  }

  @Input()
  colorSetName: string;

  get colorSet(): IColorSet {
     return this.colorScheme[this.colorSetName];
  }

  @HostBinding('style.color')
  get fontColor() {
    return this.colorSet ? this.colorSet.fontColor : '';
  }

  @HostBinding('style.background-color')
  get backgroundColor() {
     return this.colorSet ? this.colorSet.backColor : '';
  }

  @HostBinding('style.border-color')
  get borderColor() {
    return this.colorSet ? this.colorSet.borderColor : '';
  }

  constructor() {}
}
