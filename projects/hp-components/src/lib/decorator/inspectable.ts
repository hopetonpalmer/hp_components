import { splitToProperCase } from '../scripts/strings';

const annotationKey = Symbol('inspectable:annotation');
export interface IInspectableConfig {
   icon?: string;
   displayName?: string;
   description?: string;
   editorClass?: any;
}
export function Inspectable(config: IInspectableConfig = {}) {
  return (target: Function) => {
    const displayName = splitToProperCase(target.name.replace('Component', ''));
    const classConfig = Object.assign({displayName: displayName, classType: target.name}, config);
    Reflect.defineMetadata(annotationKey, classConfig, target);
  };
}

export function getInspectableComponentInfo(target: any): IInspectableConfig {
  if (target && target.constructor) {
    return Reflect.getMetadata(annotationKey, target.constructor);
  }
  return null;
}


const inspectPropKey = Symbol('inspectProp');
const inspectPropKeys = Symbol('inspectProps');
export interface IInspectConfig {
  category?: string;
  description?: string;
  displayName?: string;
  editorClass?: any;
}
export function Inspect(config: IInspectConfig = {}) {
  return (target: any, key: string) => {
    const propType = Reflect.getMetadata('design:type', target, key);
    const displayName = splitToProperCase(key);
    const propConfig = Object.assign({propertyName: key, displayName: displayName, propType: propType.name}, config);
    Reflect.defineMetadata(inspectPropKey, propConfig, target, key);

    const configs = getInspectPropertyInfos(target);
    Reflect.defineMetadata(inspectPropKeys, [...configs, propConfig], target);
  };
}

export function getInspectPropertyInfo(target: any, propertyName: string): IInspectConfig {
  return Reflect.getMetadata(inspectPropKey, target, propertyName);
}

export function getInspectPropertyInfos(target: any): IInspectConfig[] {
  let result = [];
  if (target) {
    result = Reflect.getMetadata(inspectPropKeys, target);
  }
  return result ? result : [];
}
