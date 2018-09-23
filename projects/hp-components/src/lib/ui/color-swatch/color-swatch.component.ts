import { Component, OnInit, Input, Output, EventEmitter, ElementRef, Renderer2 } from '@angular/core';
import { IPalette, palettes } from './palette';

@Component({
  selector: 'hpc-color-swatch',
  templateUrl: './color-swatch.component.html',
  styleUrls: ['./color-swatch.component.css', '../../hp-components.css']
})
export class ColorSwatchComponent implements OnInit {
  private _columns = 10;
  @Input()
  set columns(value: number) {
    this._columns = value;
    if (this._elRef.nativeElement) {
      this._renderer.setStyle(this._elRef.nativeElement, 'grid-template-columns', `repeat(${value}, 1fr)`);
    }
  }

  get columns(): number {
    return this._columns;
  }

  @Input()
  colorPalettes: IPalette[] = palettes;

  @Input()
  activePalette: IPalette = this.colorPalettes[0];
  constructor(private _elRef: ElementRef, private _renderer: Renderer2) {}

  private _selectedColor: string;
  @Input()
  set selectedColor(value: string) {
    if (this._selectedColor !== value) {
      this._selectedColor = value;
      this.selectedColorChange.emit(value);
    }
  }
  get selectedColor(): string {
    return this._selectedColor;
  }

  @Output()
  selectedColorChange = new EventEmitter<string>();

  selectColor(color: string) {
    this.selectedColor = color;
  }

  isSelected(color: string): boolean {
    return this.selectedColor === color;
  }

  ngOnInit() {}
}
