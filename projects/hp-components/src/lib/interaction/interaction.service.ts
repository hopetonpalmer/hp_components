import {Injectable, Renderer2, OnDestroy, Type} from '@angular/core';
import { Subject, Observable, BehaviorSubject} from 'rxjs';
import { SelectorService } from '../selector/selector.service';
import * as dom from '../scripts/dom';
import { PersistenceService, StorageType } from '../services/persistence.service';
import * as shortid from 'shortid';
import { getInspectPropertyInfos } from '../decorator/inspectable';
import { PageLoaderService } from '../services/page-loader.service';



@Injectable({
  providedIn: 'root'
})
export class InteractionService implements OnDestroy {
  hostComponent: any;

  private _componentTypes: Type<any>[];

  private _deleteElementSubject = new Subject<Element>();
  deleteElement$ = this._deleteElementSubject.asObservable();

  private _deleteElementsSubject = new Subject<Element[]>();
  deleteElements$ = this._deleteElementSubject.asObservable();

  private _deleteSelectedElementsSubject = new Subject();
  deleteSelectedElements$ = this._deleteSelectedElementsSubject.asObservable();

  private _addElementSubject = new Subject<Element>();
  addElement$ = this._addElementSubject.asObservable();

  private _addComponentSubject = new Subject<any>();
  addComponent$ = this._addComponentSubject.asObservable();

  private _selectedComponentsSubject = new BehaviorSubject<any[]>(null);
  selectedComponents$ = this._selectedComponentsSubject.asObservable();

  private _selectedComponents = [];
  get selectedComponents(): any[] {
    if (!this.hasSelectedElements) {
      return [this.hostComponent];
    }
    return this._selectedComponents;
  }
  set selectedComponents(components: any[]) {
    this._selectedComponents = components;
    this._selectedComponentsSubject.next(components);
  }

  private _selectedElementsSubject = new BehaviorSubject<Element[]>(null);
  selectedElements$ = this._selectedElementsSubject.asObservable();

  private _selectedElements: Element[] = [];
  get selectedElements(): Element[] {
    return this._selectedElements;
  }
  set selectedElements(elements: Element[]) {
    this._selectedElements = elements;
    this._selectedElementsSubject.next(elements);

    const selectedComponents = [];
    elements.forEach(el => {
      const compRef = this.findComponentRef(el);
      if (compRef) {
        selectedComponents.push(compRef.instance);
      }
    });
    this._selectedComponents = selectedComponents;
    this._selectedComponentsSubject.next(selectedComponents);
  }

  get hasSelectedElements(): boolean {
    return this._selectedElements && this._selectedElements.length > 0;
  }

  get canSelectElements(): boolean {
    return this._selectionService.selectableElements.length > 0;
  }

  private _components: { el: any; ref: any }[] = [];

  get components(): { el: any; ref: any }[] {
    return this._components;
  }

  renderer: Renderer2;
  interactionHost: HTMLElement;

  constructor(
    private _selectionService: SelectorService,
    private _pageLoaderService: PageLoaderService,
    private _persistenceService: PersistenceService
  ) {}

  findComponentRef(el: Element) {
    const comp = this.components.find(x => x.el === el);
    if (comp) {
      return comp.ref;
    }
    return null;
  }

  getComponentRoot(compRef: any): HTMLElement {
    if (compRef === this.hostComponent) {
      return compRef.interactionElement;
    }
    const comp = this.components.find(x => x.ref === compRef);
    if (comp) {
      return comp.el;
    }
    return null;
  }

  removeComponentByRef(compRef: any) {
    const comp = this.components.find(x => x.ref === compRef);
    this.removeComponent(comp);
  }

  removeComponentByEl(el: Element) {
    const comp = this.components.find(x => x.el === el);
    this.removeComponent(comp);
  }

  removeComponent(comp) {
    if (comp) {
      const index = this.components.indexOf(comp);
      if (index > -1) {
        this.components.splice(index, 1);
      }
    }
  }

  /**
   * remove an element from the interaction host
   * @param element - the element to remove
   * @param renderer - the renderer used to remove the element
   */
  deleteElement(element: Element) {
    this.renderer.removeChild(element.parentElement, element);
    this._deleteElementSubject.next(element);
  }

  /**
   * remove a list of elements from the interaction host
   * @param element - the elements to remove
   * @param renderer - the renderer used to remove the elements
   */
  deleteElements(elements: Element[]) {
    elements.forEach(element => {
      this.renderer.removeChild(element.parentElement, element);
    });
    this._deleteElementsSubject.next(elements);
  }

  deleteSelectedElements() {
    this._deleteSelectedElementsSubject.next();
  }

  deleteAll() {
    this._selectionService.unSelectAll();
    const children = dom.childrenOf(this.interactionHost);
    for (let index = children.length - 1; index >= 0; index--) {
      const element = children[index];
      this.renderer.removeChild(this.interactionHost, element);
    }
    this.hostComponent.viewContainer.clear();
  }

  addElement(
    element: HTMLElement = null,
    select = true,
    tagName: string = 'div',
    isReloading = false
  ): HTMLElement {
    if (!element) {
      element = this.renderer.createElement(tagName) as HTMLElement;
      this.renderer.addClass(element, 'hp-new-element');
    }

    element.id = shortid.generate();
    element['componentType'] = '';
    if (!isReloading) {
      this.renderer.setStyle(element, 'box-sizing', 'border-box');
      this.renderer.setStyle(element, 'position', 'absolute');
    }
    const selector = this._selectionService.activeSelector;
    const parent =
      selector && dom.isContainer(selector.clientEl)
        ? selector.clientEl
        : this.interactionHost;
    this.renderer.appendChild(parent, element);
    this._addElementSubject.next(element);
    if (select) {
      this._selectionService.selectElement(element as HTMLElement);
      this.interactionHost.focus();
      this.selectedElements = this._selectionService.clients;
    }
    return element;
  }

  addContainer(element: HTMLElement = null): HTMLElement {
    if (!element) {
      element = this.renderer.createElement('div');
      this.renderer.addClass(element, 'hp-new-element');
    }
    this.renderer.addClass(element, 'hp-dropzone');
    this.renderer.addClass(element, 'hp-container');
    return this.addElement(element);
  }

  addComponent(componentType: any): any {
    const result = this.hostComponent.loadComponent(componentType, null);
    this._addComponentSubject.next(componentType);
    return result;
  }

  addWidget(klass: Type<any>) {
    let element: HTMLElement;
    const children = dom.childrenOf(this.interactionHost, false);
    if (klass.name.startsWith('HTML')) {
      const tagName = klass.name
        .replace('HTML', '')
        .replace('Element', '')
        .toLowerCase();
      if (tagName === 'div') {
        element = this.addContainer();
      } else {
        element = this.addElement(null, true, tagName);
      }
    } else {
      element = this.addComponent(klass).element;
    }
    element.style.zIndex = children.length.toString();
  }

  selectAll() {
    this._selectionService.selectAll();
    this.selectedElements = this._selectionService.clients;
  }

  unSelectAll() {
    this._selectionService.unSelectAll();
    this.selectedElements = this._selectionService.clients;
  }

  save(key: string, storageType: StorageType = StorageType.local) {
    const dataItems = this.getDataItems();
    this._persistenceService.set(key, dataItems, storageType);
  }

  getDataItems(): any[] {
    const elements = dom.childrenOf(
      this.hostComponent.interactionElement,
      true
    ) as HTMLElement[];
    const dataItems = [];
    if (elements && elements.length) {
      elements.forEach(element => {
        const parent = element.parentElement;
        const componentRef = this.findComponentRef(element);
        if (
          !parent ||
          (!element.classList.contains('hp-segment') &&
            !parent['componentType'] &&
            !parent.classList.contains('hp-segment'))
        ) {
          const styles = dom.getAppliedStyles(element);
          const data = {
            id: element.id,
            parentId: element.parentElement ? element.parentElement.id : '',
            componentType: element['componentType'],
            tagName: element.tagName,
            styles: styles,
            classes: element.className,
            props: componentRef
              ? this.getPersistableProps(componentRef.instance)
              : null
          };
          dataItems.push(data);
        }
      });
    }
    return dataItems;
  }

  xload(key: string, storageType: StorageType = StorageType.local) {
    const loadedElements: HTMLElement[] = [];
    this.deleteAll();
    const dataItems = this._persistenceService.get(key, storageType);
    if (dataItems) {
      dataItems.forEach(item => {
        let el: HTMLElement = null;
        if (item.componentType) {
          const componentClass = this._componentTypes.find(
            x => x.name === item.componentType
          );
          if (componentClass) {
            el = this.hostComponent.loadComponent(
              componentClass,
              item['props'],
              false
            ).element;
          } else {
            console.error(item.componentType + ' is not registered!');
          }
        } else {
          el = this.addElement(null, false, item['tagName'], true);
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
      this.selectedElements = [];
    }
  }

  load(key: string, storageType: StorageType = StorageType.local) {
    if (!this.hostComponent) {
      return;
    }
    this.deleteAll();
    const dataItems = this._persistenceService.get(key, storageType);
    this._pageLoaderService.loadPage(
      this.interactionHost,
      this.hostComponent.renderer,
      dataItems,
      this.hostComponent.componentFactoryResolver,
      this.hostComponent.viewContainer,
      loadedComp =>
        this.components.push({
          el: loadedComp.element,
          ref: loadedComp.component
        })
    );
    this.selectedElements = [];
  }

  getPersistableProps(obj: any) {
    const props = getInspectPropertyInfos(obj);
    const result = props.map(k => ({
      propertyName: k.propertyName,
      value: obj[k.propertyName]
    }));
    return result;
  }

  registerComponentTypes(componentTypes: Type<any>[]) {
    this._componentTypes = componentTypes;
  }

  ngOnDestroy(): void {
    this.renderer = null;
    this._components = [];
    this.hostComponent = null;
  }
}
