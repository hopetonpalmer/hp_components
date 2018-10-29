import { Component, OnInit, ElementRef, ViewChild,
   AfterViewInit, ChangeDetectionStrategy, Input, ChangeDetectorRef,
   Output, EventEmitter, OnDestroy } from '@angular/core';
import { ColorPickerService } from './color-picker.service';
import { Hsva, ColorFormats, Hsla, Rgba } from './formats';
import { SliderDimension, SliderPosition, AlphaChannel, OutputFormat, ColorSelectionType, ColorFillType, ColorVoid } from './helpers';
import { Orientation } from '../../scripts/types';
import { palettes, IPalette } from '../color-swatch/palette';



@Component({
  selector: 'hpc-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['../../hp-components.css', './color-picker.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ColorPickerService]
})
export class ColorPickerComponent implements OnInit, AfterViewInit, OnDestroy {

  private _isUpdating = false;
  private _hsva: Hsva;
  private _fallbackColor: string;
  private _sliderH: number;
  private _sliderDimMax: SliderDimension;

  sliderPos: SliderPosition;
  hexText: string;
  hexAlpha: number;
  hslaText: Hsla;
  rgbaText: Rgba;
  hueSliderColor: string;
  alphaSliderColor: string;
  visibleColorSelectionType: ColorSelectionType = 'solid';

  /**
   * Returns the color hex value without the pound symbol.
   */
  get rawHexColor(): string {
    if (this.hexText) {
      return this.hexText.replace('#', '');
    }
    return null;
  }

  /**
   * The array of palletes from which one (activePalette) is used to populate the Swatches view.
   */
  @Input()
  palettes: IPalette[] = palettes;

  /**
   * The palette that is used to populate the Swatches view.
   * The default is the first palette in the palettes collection.
   */
  @Input()
  activePalette: IPalette = this.palettes[0];

  /**
   * Determines if the selected color element is visible.
   * The default is true.
   */
  @Input()
  showSelectedColor = true;

  /**
   * Determines if the option to choose from no-color, solid, or swatches is available.
   * The default is true.
   */
  @Input()
  showColorSelectionTypeOptions = true;

  /**
   * Determines if the selected color code element is visible.
   * The default is true.
   */
  @Input()
  showSelectedColorCode = true;

  @Input()
  isCompact = false;

  private _colorSelectionType: ColorSelectionType = 'solid';
  /**
   * Gets or sets how the color should be selected.  The options are no-color, solid or swatch.
   * When set to "no-color", a transparent value is returned by selectedColor.  When set to "solid",
   * color can be selected from a color saturation box.  Setting to "swatch" allows selecting from
   * a list of pre-defined colors.
   */
  @Input()
  set colorSelectionType(value: ColorSelectionType) {
    if (value !== this._colorSelectionType && !this._isUpdating) {
      if (this._colorSelectionType === 'no-color') {
        this._colorSelectionType = value;
        this.hslaText.a = 1;
        this.rgbaText.a = 1;
        this.onAlphaChange({v: 1, rgX: 1});
      }
      this._colorSelectionType = value;
      if (value === 'no-color') {
        this.selectedColor = ColorVoid;
      } else {
        this.visibleColorSelectionType = value;
      }
    }
  }

  get colorSelectionType(): ColorSelectionType {
    return this._colorSelectionType;
  }

  @Input()
  format: ColorFormats = ColorFormats.RGBA;

  private _selectedColor = '#ffffff';
  @Input()
  set selectedColor(value: string) {
    if (!value) {
      return;
    }
    if (this._selectedColor !== value) {
      if (value !== ColorVoid) {
        this.colorSelectionType = this.visibleColorSelectionType;
      }
      this._selectedColor = value;
      if (!this._isUpdating) {
        this.setColorFromString(value);
      }
      this.selectedColorChange.emit(value);
    }
  }

  get selectedColor(): string {
    return this._selectedColor;
  }

  @Input()
  showHeader = true;

  @Input()
  alphaChannel: AlphaChannel = 'enabled';

  @Input()
  outputFormat: OutputFormat = 'auto';

  @Input()
  sliderOrientation: Orientation = 'vertical';

  @Output()
  selectedColorChange = new EventEmitter<string>();

  @Output()
  colorChange = new EventEmitter<string>();

  get showAlpha(): boolean {
    return this.alphaChannel !== 'disabled';
  }

  @ViewChild('hueSlider')
  hueSlider: ElementRef;
  @ViewChild('alphaSlider')
  alphaSlider: ElementRef;
  @ViewChild('saturationBox')
  saturationBox: ElementRef;

  constructor(
    private cdRef: ChangeDetectorRef,
    private service: ColorPickerService
  ) {}

  ngOnInit() {
    this.sliderPos = new SliderPosition(0, 0, 0, 0);
    this.setColorFromString(this.selectedColor);
  }

  ngAfterViewInit(): void {
   // this.setSliderDimMax();
   // this.updateColorPicker();
   // this.cdRef.detectChanges();

   // -- Not sure why, but the sliders are not fully sized at this point
   // -- SetTimout with with 0 wait time fixes the issue
    setTimeout(() => {
      this.updateColorPicker();
      this.cdRef.detectChanges();
    }, 0);
  }

  saturationStartDrag() {}

  private setSliderDimMax() {
    // todo -- need to make dynamic to accommodate resizing
    const hueWidth = this.hueSlider.nativeElement.offsetWidth;
    const alphaWidth = this.alphaSlider.nativeElement.offsetWidth;
    const saturationWidth = this.saturationBox.nativeElement.offsetWidth;
    const saturationHeight = this.saturationBox.nativeElement.offsetHeight;

    this._sliderDimMax = new SliderDimension(
      hueWidth,
      saturationWidth,
      saturationHeight,
      alphaWidth
    );
  }

  public onHueChange(value: { v: number; rgX: number }): void {
    this._hsva.h = value.v / value.rgX;
    this._sliderH = this._hsva.h;
    this.updateColorPicker();
  }

  public onAlphaChange(value: { v: number; rgX: number }): void {
    this._hsva.a = value.v / value.rgX;
    this.updateColorPicker();
  }

  public onSaturationColorChange(value: {
    s: number;
    v: number;
    rgX: number;
    rgY: number;
  }): void {
    this._hsva.s = value.s / value.rgX;
    this._hsva.v = value.v / value.rgY;
    this.updateColorPicker();
  }

  public onAcceptColor(event: Event): void {
    event.stopPropagation();
  }

  public onHexInput(value: string | null): void {
    if (value === null) {
      this.updateColorPicker();
    } else {
      if (value && value[0] !== '#') {
        value = '#' + value;
      }

      let validHex = /^#([a-f0-9]{3}|[a-f0-9]{6})$/gi;

      if (this.alphaChannel === 'always') {
        validHex = /^#([a-f0-9]{3}|[a-f0-9]{6}|[a-f0-9]{8})$/gi;
      }

      if (validHex.test(value)) {
        if (value.length < 5) {
          value =
            '#' +
            value
              .substring(1)
              .split('')
              .map(c => c + c)
              .join('');
        }

        if (this.alphaChannel === 'forced') {
          value += Math.round(this._hsva.a * 255).toString(16);
        }

        this.setColorFromString(value, false);
      }
    }
  }

  public onRedInput(value: { v: number; rg: number }): void {
    const rgba = this.service.hsvaToRgba(this._hsva);
    rgba.r = value.v / value.rg;
    this._hsva = this.service.rgbaToHsva(rgba);
    this._sliderH = this._hsva.h;
    this.updateColorPicker();
  }

  public onBlueInput(value: { v: number; rg: number }): void {
    const rgba = this.service.hsvaToRgba(this._hsva);
    rgba.b = value.v / value.rg;
    this._hsva = this.service.rgbaToHsva(rgba);
    this._sliderH = this._hsva.h;
    this.updateColorPicker();
  }

  public onGreenInput(value: { v: number; rg: number }): void {
    const rgba = this.service.hsvaToRgba(this._hsva);
    rgba.g = value.v / value.rg;
    this._hsva = this.service.rgbaToHsva(rgba);
    this._sliderH = this._hsva.h;
    this.updateColorPicker();
  }

  public onAlphaInput(value: { v: number; rg: number }): void {
    this._hsva.a = value.v / value.rg;
    this.updateColorPicker();
  }

  public onHueInput(value: { v: number; rg: number }) {
    this._hsva.h = value.v / value.rg;
    this._sliderH = this._hsva.h;
    this.updateColorPicker();
  }

  public onLightnessInput(value: { v: number; rg: number }): void {
    const hsla = this.service.hsva2hsla(this._hsva);
    hsla.l = value.v / value.rg;
    this._hsva = this.service.hsla2hsva(hsla);
    this._sliderH = this._hsva.h;
    this.updateColorPicker();
  }

  public onSaturationInput(value: { v: number; rg: number }): void {
    const hsla = this.service.hsva2hsla(this._hsva);
    hsla.s = value.v / value.rg;
    this._hsva = this.service.hsla2hsva(hsla);
    this._sliderH = this._hsva.h;
    this.updateColorPicker();
  }

  updateColorPicker(updateColorLabels: boolean = true): void {
    this._isUpdating = true;
    try {
      this.setSliderDimMax();
      if (this._sliderDimMax) {
        const hsla = this.service.hsva2hsla(this._hsva);
        const rgba = this.service.denormalizeRGBA(
          this.service.hsvaToRgba(this._hsva)
        );

        const hue = this.service.denormalizeRGBA(
          this.service.hsvaToRgba(
            new Hsva(this._sliderH || this._hsva.h, 1, 1, 1)
          )
        );

        if (updateColorLabels) {
          this.hslaText = new Hsla(
            Math.round(hsla.h * 360),
            Math.round(hsla.s * 100),
            Math.round(hsla.l * 100),
            Math.round(hsla.a * 100) / 100
          );

          this.rgbaText = new Rgba(
            rgba.r,
            rgba.g,
            rgba.b,
            Math.round(rgba.a * 100) / 100
          );

          const allowHex8 = this.alphaChannel === 'always';

          this.hexText = this.service.rgbaToHex(rgba, allowHex8);
          this.hexAlpha = this.rgbaText.a;
        }

        this.hueSliderColor = 'rgb(' + hue.r + ',' + hue.g + ',' + hue.b + ')';
        this.alphaSliderColor =
          'rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')';

        this.selectedColor = this.service.outputFormat(this._hsva, 'rgba', null);

        this.sliderPos = new SliderPosition(
          (this._sliderH || this._hsva.h) * this._sliderDimMax.h - 8,
          this._hsva.s * this._sliderDimMax.s - 8,
          (1 - this._hsva.v) * this._sliderDimMax.v - 8,
          this._hsva.a * this._sliderDimMax.a - 8
        );

        // ensure that sliders does not hang too far to the left or top
        this.sliderPos.h = Math.max(-3, this.sliderPos.h);
        this.sliderPos.s = Math.max(-3, this.sliderPos.s);
        this.sliderPos.v = Math.max(-4, this.sliderPos.v);
        this.sliderPos.a = Math.max(-3, this.sliderPos.a);
      }
    } finally {
      this._isUpdating = false;
    }
  }

  public setColorFromString(value: string, update: boolean = true): void {
    let hsva: Hsva | null;

    if (this.alphaChannel === 'always' || this.alphaChannel === 'forced') {
      hsva = this.service.stringToHsva(value, true);

      if (!hsva && !this._hsva) {
        hsva = this.service.stringToHsva(value, false);
      }
    } else {
      hsva = this.service.stringToHsva(value, false);
    }

    if (!hsva && !this._hsva) {
      hsva = this.service.stringToHsva(this._fallbackColor, false);
    }

    if (hsva) {
      this._hsva = hsva;

      this._sliderH = this._hsva.h;

      this.updateColorPicker(update);
    }
  }

  ngOnDestroy(): void {
    // console.log('Color picker destroyed!');
  }
}
