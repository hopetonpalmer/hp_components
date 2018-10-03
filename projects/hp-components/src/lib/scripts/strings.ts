export function splitCamelCase(value: string): string {
  return value.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
}

export function splitCamelCaseProper(value: string): string {
  const result = value.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
  return properCase(result);
}

export function properCase(value: string): string {
  if (value) {
    return value.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }
  return '';
}

export function camelCase(value: string): string {
  return value.charAt(0).toLowerCase() + value.substr(1);
}

export function splitToProperCase(value: string): string {
  return splitCamelCaseProper(camelCase(value));
}

export function camelToDash(value: string): string {
  return value.replace(/([A-Z])/g, ($1) => '-' + $1.toLowerCase());
}

export function dashToCamel(value: string): string {
  return value.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

export function camelToUnderscore(value: string): string {
  return value.replace(/([A-Z])/g, ($1) => '_' + $1.toLowerCase());
}
