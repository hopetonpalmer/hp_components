import { splitToProperCase } from '../scripts/strings';
import 'reflect-metadata';
import { Type } from '@angular/core';

const inspectableKey = Symbol('inspectable');
export interface IInspectableConfig {
   icon?: string;
   displayName?: string;
   description?: string;
   editorClass?: any;
   isWidget?: boolean;
}
export function Inspectable(config: IInspectableConfig = {}) {
  return (target: Function) => {
    const displayName = splitToProperCase(target.name.replace('Component', ''));
    const classConfig = Object.assign({displayName: displayName, classType: target.name, isWidget: true}, config);
    if (classConfig.isWidget) {
       // --future use -add widget-specific meta-data here
    }
    Reflect.defineMetadata(inspectableKey, classConfig, target);
  };
}

export function getInspectableComponentInfo(target: any): IInspectableConfig {
  if (target && target.constructor) {
    return Reflect.getMetadata(inspectableKey, target.constructor);
  }
  return null;
}


const inspectPropKey = Symbol('inspectProp');
const inspectPropsKey = Symbol('inspectProps');
export interface IInspectConfig {
  category?: string;
  description?: string;
  displayName?: string;
  editorClass?: Type<any>;
  propType?: any;
  isStyle?: boolean;
  valueOptions?: any[];
  readonly propertyName?: string;
}
export function Inspect(config: IInspectConfig = {}) {
  return (target: any, key: string) => {
    const propType = Reflect.getMetadata('design:type', target, key);
    const displayName = splitToProperCase(key);
    const propConfig = Object.assign({
      propertyName: key,
      displayName: displayName,
      propType: propType.name,
      isStyle: false
    }, config);
    Reflect.defineMetadata(inspectPropKey, propConfig, target, key);

    const configs = getInspectPropertyInfos(target);
    Reflect.defineMetadata(inspectPropsKey, [...configs, propConfig], target);
  };
}

export function getInspectPropertyInfo(target: any, propertyName: string): IInspectConfig {
  return Reflect.getMetadata(inspectPropKey, target, propertyName);
}

export function getInspectPropertyInfos(target: any): IInspectConfig[] {
  let result = [];
  if (target) {
    result = Reflect.getMetadata(inspectPropsKey, target);
  }
  return result ? result : [];
}
