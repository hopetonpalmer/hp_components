import { IColorScheme, IColorSet } from '../interfaces/i-color-scheme';
import { TinyColor } from '@ctrl/tinycolor';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorScheme implements IColorScheme {
  schemeName: string;
  headingColors: IColorSet;
  rulerColors: IColorSet;
  eventColors: IColorSet;
  allDayAreaColors: IColorSet;
  workHoursColors: IColorSet;
  weekEndColors: IColorSet;
  selectedCellColors: IColorSet;
  eventCellColors: IColorSet;
  cellContainerColors: IColorSet;
  // backColor = '#b897cf';
  // backColor = '#7f9480';
  // backColor = '#53798a';
  // backColor = 'white';

  // backColor = '#F1E3B9';
  // backColor = '#A8C3C2';
  // backColor = '#7D6385';
  // backColor = '#A1BA89';
  // backColor = '#7D6385';
  // backColor = '#F1914D';
  // backColor = '#B8C2AE';
  // backColor = '#3C3B3D';
  // backColor = '#b3cdf5';
  // backColor = '#F1E3B9';
  // backColor = '#737A72';
  // backColor = '#625241';
  // backColor = '#B4681A';
  // backColor = '#416076';
  // backColor = '#E1CCE7';
  // backColor = '#41766F';
   backColor = '#636E65';



  fontColor = '#fffffe';
  borderColor = '#fffffe';
  constructor() {
    this.calcColors();
  }

  calcColors(): void {
    const line = 10;
    this.rulerColors = {
      backColor: '#fffffe',
      fontColor: '#494949',
      borderColor: '#494949'
    };
    this.headingColors = this.calcColorSet(false, 0, 50, line);
    this.allDayAreaColors = this.calcColorSet(false, 15);
    this.selectedCellColors = this.calcColorSet(false, 25, 0, line);
    this.workHoursColors = this.calcColorSet(false, -15, 50, line - 15);
    this.eventCellColors = this.calcColorSet(false, 0, 50, line);
    this.weekEndColors = this.calcColorSet(false, 0, 0, line);
    this.cellContainerColors = this.calcColorSet(false, 0, 10, 20);
    this.eventColors = this.calcColorSet(false, 5, 0, 0);
  }

  calcColorSet(flipDark: boolean, ...changes: number[]): IColorSet {
    const baseColor = this.backColor;
    const colorSet = {
      backColor: this.backColor,
      fontColor: this.fontColor,
      borderColor: this.borderColor
    };
    changes.forEach((change, index) => {
      colorSet[Object.keys(colorSet)[index]] = this.calcColor(
        flipDark && index === 1,
        baseColor,
        change
      );
    });
    return colorSet;
  }

  calcColor(flipDark: boolean, color: string, delta: number): string {
    const tc = new TinyColor(color);
    if ((delta < 1 && !flipDark) || (flipDark && tc.isDark())) {
      return tc.lighten(Math.abs(delta)).toHexString();
    }
    return tc.darken(Math.abs(delta)).toHexString();
  }
}
