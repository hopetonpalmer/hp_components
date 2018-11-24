import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'hp-pixel-input',
  templateUrl: './pixel-input.component.html',
  styleUrls: ['./pixel-input.component.css', '../../hp-components.css']
})
export class PixelInputComponent implements OnInit {

  constructor() {}
  private _unitPart = '';
  private _numberPart = 0;

  @Input()
  percentOption = false;

  private _units = ['px', 'pt', 'rem', '%'];
  set units(value: string[]) {
     this._units = value;
  }

  get units() {
     if (!this.percentOption) {
       return this._units.filter(x => x !== '%');
     }
     return this._units;
  }

  get numberPart(): number {
    return this._numberPart;
  }
  set numberPart(value: number) {
    if (value !== this._numberPart) {
      this._numberPart = value;
      this.valueChange.emit(this.value);
    }
  }

  get unitPart(): string {
    if (this._numberPart && !this._unitPart) {
      return 'px';
    }
    return this._unitPart;
  }
  set unitPart(value: string) {
    if (value !== this._unitPart) {
      this._unitPart = value;
      this.valueChange.emit(this.value);
    }
  }

  @Input()
  set value(value: string) {
    if (!value) {
      value = '0';
    }
    if (value && value.indexOf(' ') > -1) {
      return;
    }
    if (value && value !== this.value) {
      const num = value
        .replace('px', '')
        .replace('pt', '')
        .replace('rem', '')
        .replace('%', '');
      this._numberPart = parseInt(num, 10);
      this._unitPart = value.replace(num, '');
      this.valueChange.emit(this.value);
    }
  }

  get value(): string {
    return this.numberPart.toString() + this.unitPart.trim();
  }

  @Output()
  valueChange = new EventEmitter<string>();

  ngOnInit() {}
}
