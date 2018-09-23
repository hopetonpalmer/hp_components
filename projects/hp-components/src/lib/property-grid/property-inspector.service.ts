import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PropertyInspectorService {

  activeComponentSubject = new BehaviorSubject<any>(null);
  activeComponent$ = this.activeComponentSubject.asObservable;

  propertyInspectorMap = new Map<string, any>();
  componentInspectorMap = new Map<any, any>();
  activeComponent: any;

  constructor() {}

  setActiveComponent(component: any) {
    this.activeComponentSubject.next(component);
  }

  registerPropertyInspector(propertyTypeName: string, editorClass: any) {
    if (this.propertyInspectorMap.has(propertyTypeName)) {
      this.propertyInspectorMap.delete(propertyTypeName);
    }
    this.propertyInspectorMap.set(propertyTypeName, editorClass);
  }

  registerComponentInspector(componentClass: any, editorClass: any) {
    if (this.componentInspectorMap.has(componentClass)) {
      this.componentInspectorMap.delete(componentClass);
    }
    this.componentInspectorMap.set(componentClass, editorClass);
  }

  getPropertyEditor(propertyTypeName: string): any {
     return this.propertyInspectorMap.get(propertyTypeName.toLowerCase());
  }

  getComponentEditor(componentClass: any): any {
    return this.componentInspectorMap.get(componentClass);
  }

}


