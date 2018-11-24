import { Injectable } from '@angular/core';
import { adjustColor } from '../scripts/colors';
import { Observable, BehaviorSubject } from 'rxjs';

export interface ITheme {
  name: string;
  primaryBg: string;
  primaryText: string;
}


@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  _activeThemeSubject = new BehaviorSubject<ITheme>(null);
  activeTheme$ = this._activeThemeSubject.asObservable();

  private _activeTheme: ITheme;
  get activeTheme(): ITheme {
    return this._activeTheme;
  }
  set activeTheme(value: ITheme) {
    if (this._activeTheme !== value) {
      this._activeTheme = value;
      this.applyActiveTheme();
      this._activeThemeSubject.next(value);
    }
  }

  get customTheme(): ITheme {
    return this.theme('Custom');
  }

  themes: ITheme[] = [
    { name: 'Dark', primaryBg: '#494949', primaryText: '#e6e4e4' },
    { name: 'Deep Dark', primaryBg: '#1a1a1a', primaryText: '#e6e4e4' },
    { name: 'Purple', primaryBg: '#2b2633', primaryText: '#e6e4e4' },
    { name: 'Mauve', primaryBg: '#282a39', primaryText: '#e6e4e4' },
    { name: 'Blue', primaryBg: '#303e4d', primaryText: '#e6e4e4' },
    { name: 'Teal', primaryBg: '#008080', primaryText: '#e6e4e4' },
    { name: 'Green', primaryBg: '#273224', primaryText: '#cbf2e6' },
    { name: 'Deep Green', primaryBg: '#26332f', primaryText: '#cbf2e6' },
    { name: 'Deeper Green', primaryBg: '#141f1f', primaryText: '#e6e4e4' },
    { name: 'Maroon', primaryBg: '#4c020a', primaryText: '#e6e4e4' },
    { name: 'Firebrick', primaryBg: '#B22222', primaryText: '#e6e4e4' },
    { name: 'Aubergine', primaryBg: '#4D394B', primaryText: '#e6e4e4' },
    { name: 'Deep Blue', primaryBg: '#132639', primaryText: '#e6e4e4' },
    { name: 'Light Brown', primaryBg: '#433e37', primaryText: '#f9d6b3' },
    { name: 'UPS Brown', primaryBg: '#49321c', primaryText: '#f9d6b3' },
    { name: 'T Mobile Pink', primaryBg: '#660033', primaryText: '#e6e4e4' },
    { name: 'Custom', primaryBg: '#0d3239', primaryText: '#e6e4e4' }
  ];

  constructor() {}

  theme(themeName: string) {
    return this.themes.find(
      t => t.name.toLowerCase() === themeName.toLowerCase()
    );
  }

  updateTheme(themeName: string, changes: {}) {
    const theme = this.theme(themeName);
    if (theme) {
      Object.assign(theme, changes);
      this.applyActiveTheme();
    }
  }

  updateCustomTheme(changes: {}) {
    this.updateTheme('Custom', changes);
  }

  applyActiveTheme() {
    const rootStyle = document.documentElement.style;
    this.updateStyle(
      rootStyle,
      '--hp-panel-background',
      this.activeTheme.primaryBg
    );
    this.updateStyle(
      rootStyle,
      '--hp-panel-color',
      this.activeTheme.primaryText
    );
    this.updateStyle(
      rootStyle,
      '--hp-header-background',
      this.activeTheme.primaryBg
    );
    this.updateStyle(
      rootStyle,
      '--hp-header-color',
      this.activeTheme.primaryText
    );
    this.updateStyle(
      rootStyle,
      '--hp-panel-main',
      adjustColor(this.activeTheme.primaryBg, { dR: 0.86, dG: 0.86, dB: 0.86 })
    );
    this.updateStyle(
      rootStyle,
      '--hp-panel-header-background',
      adjustColor(this.activeTheme.primaryBg, { dR: 1.33, dG: 1.32, dB: 1.32 })
    );
    this.updateStyle(
      rootStyle,
      '--hp-panel-header-color',
      this.activeTheme.primaryText
    );

    this.updateStyle(
      rootStyle,
      '--hp-toolbar-color',
      adjustColor(this.activeTheme.primaryText, { dR: 1.9, dG: 1.9, dB: 1.9 })
    );
    this.updateStyle(
      rootStyle,
      '--hp-toolbar-background',
      adjustColor(this.activeTheme.primaryBg, { dR: 1.9, dG: 1.9, dB: 1.9 })
    );

    this.updateStyle(rootStyle, '--hp-menu-color', adjustColor(
        this.activeTheme.primaryText,
        { dR: 1.9, dG: 1.9, dB: 1.9 }
      ));
    this.updateStyle(rootStyle, '--hp-menu-background', adjustColor(
        this.activeTheme.primaryBg,
        { dR: 1.9, dG: 1.9, dB: 1.9 }
      ));

    this.updateStyle(
      rootStyle,
      '--hp-hover-background',
      adjustColor(this.activeTheme.primaryBg, { dR: 3.26, dG: 3.34, dB: 3.14 })
    );
    this.updateStyle(
      rootStyle,
      '--hp-hover-color',
      adjustColor(this.activeTheme.primaryBg, { dR: 0.9, dG: 0.9, dB: 0.9 })
    );
    this.updateStyle(
      rootStyle,
      '--hp-panel-border-color',
      adjustColor(this.activeTheme.primaryBg, { dR: 1.47, dG: 1.45, dB: 1.45 })
    );
    this.updateStyle(
      rootStyle,
      '--hp-inactive-color',
      adjustColor(this.activeTheme.primaryText, { dR: 0.7, dG: 0.7, dB: 0.7 })
    );

    this.updateStyle(
      rootStyle,
      '--hp-selected-background',
      adjustColor(this.activeTheme.primaryBg, { dR: 1.7, dG: 1.7, dB: 1.7 })
    );

    this.updateStyle(
      rootStyle,
      '--hp-selected-color',
      adjustColor(this.activeTheme.primaryText, { dR: 1.7, dG: 1.7, dB: 1.7 })
    );

    this.updateStyle(
      rootStyle,
      '--hp-popup-background',
      adjustColor(this.activeTheme.primaryBg, { dR: 0.75, dG: 0.75, dB: 0.75 })
    );
    this.updateStyle(rootStyle, '--hp-popup-color', 'rgb(255,255,255)');

    this.updateStyle(
      rootStyle,
      '--hp-input-background',
      adjustColor(this.activeTheme.primaryBg, { dR: 0.9, dG: 0.9, dB: 0.9 })
    );
    this.updateStyle(rootStyle, '--hp-input-color', 'rgb(255,255,255)');
  }

  updateStyle(style: CSSStyleDeclaration, propertyName: string, color: string) {
    style.removeProperty(propertyName);
    style.setProperty(propertyName, color);
  }
}
