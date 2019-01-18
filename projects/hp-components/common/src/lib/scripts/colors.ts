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

export function adjustColor(color: string, delta: IColorChange | number): string {
  let changes: IColorChange;
  if (typeof delta === 'number') {
     changes = {dR: delta, dG: delta, dB: delta };
  } else {
    changes = delta;
  }
  const colorValues = getColorValues(color);
  const result = `rgba(${(colorValues.red * changes.dR).toFixed()},
  ${(colorValues.green * changes.dG).toFixed()},
  ${(colorValues.blue * changes.dB).toFixed()},
  ${(changes.dA !== undefined ? changes.dA : 1).toString()})`;
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
    if (color.indexOf('#') === -1) {
       color = colorNameToHex(color);
    }
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

export function colorNameToHex(color: string): string {
  const colors = {
    'aliceblue': '#f0f8ff', 'antiquewhite': '#faebd7', 'aqua': '#00ffff', 'aquamarine': '#7fffd4',
    'azure': '#f0ffff', 'beige': '#f5f5dc', 'bisque': '#ffe4c4', 'black': '#000000', 'blanchedalmond': '#ffebcd',
    'blue': '#0000ff', 'blueviolet': '#8a2be2', 'brown': '#a52a2a', 'burlywood': '#deb887', 'cadetblue': '#5f9ea0',
    'chartreuse': '#7fff00', 'chocolate': '#d2691e', 'coral': '#ff7f50', 'cornflowerblue': '#6495ed',
    'cornsilk': '#fff8dc', 'crimson': '#dc143c', 'cyan': '#00ffff', 'darkblue': '#00008b', 'darkcyan': '#008b8b',
    'darkgoldenrod': '#b8860b', 'darkgray': '#a9a9a9', 'darkgreen': '#006400', 'darkkhaki': '#bdb76b',
    'darkmagenta': '#8b008b', 'darkolivegreen': '#556b2f', 'darkorange': '#ff8c00', 'darkorchid': '#9932cc',
    'darkred': '#8b0000', 'darksalmon': '#e9967a', 'darkseagreen': '#8fbc8f', 'darkslateblue': '#483d8b',
    'darkslategray': '#2f4f4f', 'darkturquoise': '#00ced1', 'darkviolet': '#9400d3', 'deeppink': '#ff1493',
    'deepskyblue': '#00bfff', 'dimgray': '#696969', 'dodgerblue': '#1e90ff', 'firebrick': '#b22222',
    'floralwhite': '#fffaf0', 'forestgreen': '#228b22', 'fuchsia': '#ff00ff', 'gainsboro': '#dcdcdc',
    'ghostwhite': '#f8f8ff', 'gold': '#ffd700', 'goldenrod': '#daa520', 'gray': '#808080', 'green': '#008000',
    'greenyellow': '#adff2f', 'honeydew': '#f0fff0', 'hotpink': '#ff69b4', 'indianred ': '#cd5c5c', 'indigo': '#4b0082',
    'ivory': '#fffff0', 'khaki': '#f0e68c', 'lavender': '#e6e6fa', 'lavenderblush': '#fff0f5', 'lawngreen': '#7cfc00',
    'lemonchiffon': '#fffacd', 'lightblue': '#add8e6', 'lightcoral': '#f08080', 'lightcyan': '#e0ffff', 'lightgoldenrodyellow': '#fafad2',
    'lightgrey': '#d3d3d3', 'lightgreen': '#90ee90', 'lightpink': '#ffb6c1', 'lightsalmon': '#ffa07a', 'lightseagreen': '#20b2aa',
    'lightskyblue': '#87cefa', 'lightslategray': '#778899', 'lightsteelblue': '#b0c4de', 'lightyellow': '#ffffe0',
    'lime': '#00ff00', 'limegreen': '#32cd32', 'linen': '#faf0e6', 'magenta': '#ff00ff', 'maroon': '#800000',
    'mediumaquamarine': '#66cdaa', 'mediumblue': '#0000cd', 'mediumorchid': '#ba55d3', 'mediumpurple': '#9370d8',
    'mediumseagreen': '#3cb371', 'mediumslateblue': '#7b68ee', 'mediumspringgreen': '#00fa9a', 'mediumturquoise': '#48d1cc',
    'mediumvioletred': '#c71585', 'midnightblue': '#191970', 'mintcream': '#f5fffa', 'mistyrose': '#ffe4e1', 'moccasin': '#ffe4b5',
    'navajowhite': '#ffdead', 'navy': '#000080',
    'oldlace': '#fdf5e6', 'olive': '#808000', 'olivedrab': '#6b8e23', 'orange': '#ffa500', 'orangered': '#ff4500', 'orchid': '#da70d6',
    'palegoldenrod': '#eee8aa', 'palegreen': '#98fb98', 'paleturquoise': '#afeeee', 'palevioletred': '#d87093',
    'papayawhip': '#ffefd5', 'peachpuff': '#ffdab9', 'peru': '#cd853f', 'pink': '#ffc0cb', 'plum': '#dda0dd', 'powderblue': '#b0e0e6',
    'purple': '#800080', 'rebeccapurple': '#663399', 'red': '#ff0000', 'rosybrown': '#bc8f8f', 'royalblue': '#4169e1',
    'saddlebrown': '#8b4513', 'salmon': '#fa8072', 'sandybrown': '#f4a460', 'seagreen': '#2e8b57', 'seashell': '#fff5ee',
    'sienna': '#a0522d', 'silver': '#c0c0c0', 'skyblue': '#87ceeb', 'slateblue': '#6a5acd', 'slategray': '#708090', 'snow': '#fffafa',
    'springgreen': '#00ff7f', 'steelblue': '#4682b4', 'tan': '#d2b48c', 'teal': '#008080', 'thistle': '#d8bfd8', 'tomato': '#ff6347',
    'turquoise': '#40e0d0', 'violet': '#ee82ee', 'wheat': '#f5deb3', 'white': '#ffffff', 'whitesmoke': '#f5f5f5',
    'yellow': '#ffff00', 'yellowgreen': '#9acd32'
  };

  if (typeof colors[color.toLowerCase()] !== 'undefined') {
    return colors[color.toLowerCase()];
  }
  return '#000000';
}
