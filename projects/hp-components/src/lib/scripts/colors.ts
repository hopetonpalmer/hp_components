export interface IRgba {
  red: number;
  green: number;
  blue: number;
  a: number;
}

export interface IColorChange {
  dR: number;
  dG: number;
  dB: number;
  dA?: number;
}

export function adjustColor(color: string, changes: IColorChange): string {
  const colorValues = getColorValues(color);
  const result = `rgba(${(colorValues.red * changes.dR).toFixed()},
  ${(colorValues.green * changes.dR).toFixed()},
  ${(colorValues.blue * changes.dR).toFixed()},
  ${(colorValues.alpha * (changes.dA !== undefined ? changes.dA : 1)).toFixed()})`;
  return result;
}

export function colorToHex(value: string) {
  if (value.trim().indexOf('#') === 0) {
    return value;
  }
  return rgbToHex(convertToRgbA(value));
}

export function rgbToHex(rgb) {
  if (!rgb) {
    return '#000';
  }
  rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
  return (rgb && rgb.length === 4) ? '#' +
    ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
    ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) +
    ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
}

export function isRgbA(value) {
  return value.toLowerCase().indexOf('rgba') > -1;
}

export function isRgb(value) {
  return value.toLowerCase().indexOf('rgb') > -1;
}

export function convertToRgbA(color: string): string {
  if (color === 'transparent') {
    return 'rgba(0,0,0,0)';
  }
  const rgba = getColorValues(color);
  return `rgba(${rgba.red}, ${rgba.green}, ${rgba.blue}, ${rgba.alpha})`;
}

export function getColorValues(color: string): any {
  let values: any = {}; // { red: null, green: null, blue: null, alpha: null };
  let pars: number;
  if (typeof color === 'string') {
    /* hex */
    if (color.indexOf('#') === 0) {
      color = color.substr(1);
      if (color.length === 3) {
        values = {
          red: parseInt(color[0] + color[0], 16),
          green: parseInt(color[1] + color[1], 16),
          blue: parseInt(color[2] + color[2], 16),
          alpha: 1
        };
      } else {
        values = {
          red: parseInt(color.substr(0, 2), 16),
          green: parseInt(color.substr(2, 2), 16),
          blue: parseInt(color.substr(4, 2), 16),
          alpha: 1
        };
      }
      /* rgb */
    } else if (color.indexOf('rgb(') === 0) {
      pars = color.indexOf(',');
      values = {
        red: parseInt(color.substr(4, pars), 16),
        green: parseInt(color.substr(pars + 1, color.indexOf(',', pars)), 16),
        blue: parseInt(color.substr(color.indexOf(',', pars + 1) + 1, color.indexOf(')')), 16),
        alpha: 1
      };
      /* rgba */
    } else if (color.indexOf('rgba(') === 0) {
      pars = color.indexOf(',');
      const repars = color.indexOf(',', pars + 1);
      values = {
        red: parseInt(color.substr(5, pars), 16),
        green: parseInt(color.substr(pars + 1, repars), 16),
        blue: parseInt(color.substr(color.indexOf(',', pars + 1) + 1, color.indexOf(',', repars)), 16),
        alpha: parseFloat(color.substr(color.indexOf(',', repars + 1) + 1, color.indexOf(')'))).toFixed(2).toString()
      };
      /* verbous */
    } else {
      const stdCol = {
        acqua: '#0ff', teal: '#008080', blue: '#00f', navy: '#000080',
        yellow: '#ff0', olive: '#808000', lime: '#0f0', green: '#008000',
        fuchsia: '#f0f', purple: '#800080', red: '#f00', maroon: '#800000',
        white: '#fff', gray: '#808080', silver: '#c0c0c0', black: '#000'
      };
      if (stdCol[color] !== undefined) {
        values = getColorValues(stdCol[color]);
      }
    }
  }
  return values;
}
