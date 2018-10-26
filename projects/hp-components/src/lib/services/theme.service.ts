import { Injectable } from '@angular/core';
import { getColorValues, adjustColor } from '../scripts/colors';

export interface ITheme {
  name: string;
  primaryBg: string;
  primaryText: string;
}


@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _activeTheme: ITheme;
  get activeTheme(): ITheme {
    return this._activeTheme;
  }
  set activeTheme(value: ITheme) {
    if (this._activeTheme !== value) {
      this._activeTheme = value;
      this.updateStyleValues();
    }
  }

  themes: ITheme[] = [
    { name: 'Dark', primaryBg: '#494949', primaryText: '#e6e4e4' },
    { name: 'Purple', primaryBg: '#2b2633', primaryText: '#e6e4e4' },
    { name: 'Blue', primaryBg: '#303e4d', primaryText: '#e6e4e4' },
    { name: 'Teal', primaryBg: '#008080', primaryText: '#e6e4e4' },
    { name: 'Brown', primaryBg: '#49321c', primaryText: '#f9d6b3' },
    { name: 'Green', primaryBg: '#26332f', primaryText: '#cbf2e6' },
    { name: 'Maroon', primaryBg: '#4c020a', primaryText: '#e6e4e4' },
    { name: 'Firebrick', primaryBg: '#B22222', primaryText: '#e6e4e4' },
    { name: 'Aubergine', primaryBg: '#4D394B', primaryText: '#e6e4e4' }
  ];

  constructor() {}

  updateStyleValues() {
    const primaryBgValues = getColorValues(this.activeTheme.primaryBg);
    const primaryTextValues = getColorValues(this.activeTheme.primaryText);
    const rootStyle = document.documentElement.style;
    this.updateStyle(
      rootStyle,
      '--hpc-panel-background',
      this.activeTheme.primaryBg
    );
    this.updateStyle(
      rootStyle,
      '--hpc-panel-color',
      this.activeTheme.primaryText
    );
    this.updateStyle(
      rootStyle,
      '--hpc-header-background',
      this.activeTheme.primaryBg
    );
    this.updateStyle(
      rootStyle,
      '--hpc-header-color',
      this.activeTheme.primaryText
    );
    this.updateStyle(
      rootStyle,
      '--hpc-panel-main',
      adjustColor(this.activeTheme.primaryBg, { dR: 0.86, dG: 0.86, dB: 0.86 })
    );
    this.updateStyle(
      rootStyle,
      '--hpc-panel-header-background',
      adjustColor(this.activeTheme.primaryBg, { dR: 1.33, dG: 1.32, dB: 1.32 })
    );
    this.updateStyle(
      rootStyle,
      '--hpc-panel-header-color',
      this.activeTheme.primaryText
    );
    this.updateStyle(
      rootStyle,
      '--hpc-toolbar-background',
      adjustColor(this.activeTheme.primaryBg, { dR: 1.9, dG: 1.9, dB: 1.9 })
    );
    this.updateStyle(
      rootStyle,
      '--hpc-hover-background',
      adjustColor(this.activeTheme.primaryBg, { dR: 3.26, dG: 3.34, dB: 3.14 })
    );
    this.updateStyle(
      rootStyle,
      '--hpc-hover-color',
      adjustColor(this.activeTheme.primaryBg, { dR: 0.9, dG: 0.9, dB: 0.9 })
    );
    this.updateStyle(
      rootStyle,
      '--hpc-panel-border-color',
      adjustColor(this.activeTheme.primaryBg, { dR: 1.47, dG: 1.45, dB: 1.45 })
    );
    this.updateStyle(
      rootStyle,
      '--hpc-inactive-color',
      adjustColor(this.activeTheme.primaryText, { dR: .7, dG: .7, dB: .7 })
    );

    this.updateStyle(
      rootStyle,
      '--hpc-selected-background',
      adjustColor(this.activeTheme.primaryBg, { dR: 1.7, dG: 1.7, dB: 1.7 })
    );

    this.updateStyle(
      rootStyle,
      '--hpc-popup-background',
      adjustColor(this.activeTheme.primaryBg, { dR: .75, dG: .75, dB: .75 })
    );
    this.updateStyle(
      rootStyle,
      '--hpc-popup-color',
      'rgb(255,255,255)'
    );

    this.updateStyle(
      rootStyle,
      '--hpc-input-background',
      adjustColor(this.activeTheme.primaryBg, { dR: .9, dG: .9, dB: .9 })
    );
    this.updateStyle(
      rootStyle,
      '--hpc-input-color',
      'rgb(255,255,255)'
    );
  }

  updateStyle(style: CSSStyleDeclaration, propertyName: string, color: string) {
    style.removeProperty(propertyName);
    style.setProperty(propertyName, color);
  }
}
