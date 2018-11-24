import { Injectable, Renderer2, ComponentFactoryResolver, ViewContainerRef, Type } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as shortid from 'shortid';
import * as dom from '../scripts/dom';

@Injectable({
  providedIn: 'root'
})
export class PageLoaderService {

  private _addElementSubject = new Subject<Element>();
  addElement$ = this._addElementSubject.asObservable();
  private _componentTypes: Type<any>[];

  constructor() { }

  loadPage(hostElement: HTMLElement,
     renderer: Renderer2,
     dataItems: any,
     cfr: ComponentFactoryResolver,
     vcRef: ViewContainerRef, componentLoaded: Function = null) {
    if (dataItems) {
      const loadedElements: HTMLElement[] = [];
      dataItems.forEach(item => {
        let el: HTMLElement = null;
        if (item.componentType) {
          const componentClass = this._componentTypes.find(x => x.name === item.componentType);
          if (componentClass) {
            const loadedComp = this.loadComponent(componentClass, item['props'], renderer, cfr, vcRef);
            el = loadedComp.element;
            if (componentLoaded) {
              componentLoaded(loadedComp);
            }
          } else {
            console.error(item.componentType + ' is not registered!');
          }
        } else {
          el = this.addElement(renderer, item['tagName'], hostElement);
        }
        if (el) {
          el.id = item.id;
          el.className = item.classes;
          dom.setStyles(el, item.styles);
          loadedElements.push(el);
        }
      });

      dataItems.forEach(item => {
        if (item.parentId) {
          const parent = loadedElements.find(x => x.id === item.parentId);
          const child = loadedElements.find(x => x.id === item.id);
          if (parent) {
            parent.appendChild(child);
          }
        }
      });
    }
  }


  private addElement(
       renderer: Renderer2,
       tagName: string = 'div',
       parent: HTMLElement,
       element: HTMLElement = null,
       isReloading = false): HTMLElement {

    if (!element) {
      element = renderer.createElement(tagName) as HTMLElement;
      renderer.addClass(element, 'hp-new-element');
    }

    element.id = shortid.generate();
    element['componentType'] = '';

    if (!isReloading) {
      renderer.setStyle(element, 'box-sizing', 'border-box');
      renderer.setStyle(element, 'position', 'absolute');
    }

    renderer.appendChild(parent, element);
    this._addElementSubject.next(element);
    return element;
  }

  private loadComponent(component: any, data: any, renderer: Renderer2, cfr: ComponentFactoryResolver, vcRef: ViewContainerRef) {
    const componentFactory = cfr.resolveComponentFactory(component);
    const componentRef = vcRef.createComponent(componentFactory);
    const el = componentRef.location.nativeElement;
    el.id = shortid.generate();
    el['componentType'] = component.name;
    el.className = 'hp-widget hp-composite ' + el.className;
    renderer.setStyle(el, 'box-sizing', 'border-box');
    renderer.setStyle(el, 'position', 'absolute');
    renderer.setStyle(el, 'zIndex', '0');
    if (data) {
      data.forEach(item => {
        componentRef.instance[item.propertyName] = item.value;
      });
    }
    return { component: componentRef, element: el };
  }

  registerComponentTypes(componentTypes: Type<any>[]) {
    this._componentTypes = componentTypes;
  }
}
