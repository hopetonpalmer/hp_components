import {Injectable, Renderer2, OnDestroy} from '@angular/core';
import { Subject, Observable, BehaviorSubject} from 'rxjs';
import { SelectorService } from '../selector/selector.service';
import * as dom from '../scripts/dom';

@Injectable()
export class InteractionService implements OnDestroy {
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

  constructor(private _selectionService: SelectorService) {}

  findComponentRef(el: Element) {
    const comp = this.components.find(x => x.el === el);
    if (comp) {
      return comp.ref;
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
  }

  addElement(element: Element = null) {
    if (!element) {
      element = this.renderer.createElement('div');
      this.renderer.addClass(element, 'hpc-new-element');
    }
    this.renderer.setStyle(element, 'box-sizing', 'border-box');
    this.renderer.setStyle(element, 'position', 'absolute');
    const selector = this._selectionService.activeSelector;
    const parent =
      selector && dom.isContainer(selector.clientEl)
        ? selector.clientEl
        : this.interactionHost;
    this.renderer.appendChild(parent, element);
    this._selectionService.selectElement(element as HTMLElement);
    this.interactionHost.focus();
    this._addElementSubject.next(element);
  }

  addContainer(element: Element = null) {
    if (!element) {
      element = this.renderer.createElement('div');
      this.renderer.addClass(element, 'hpc-new-element');
    }
    this.renderer.addClass(element, 'hpc-dropzone');
    this.renderer.addClass(element, 'hpc-container');
    this.addElement(element);
  }

  addComponent(componentType: any) {
    this._addComponentSubject.next(componentType);
  }

  selectAll() {
    this._selectionService.selectAll();
    this.selectedElements = this._selectionService.clients;
  }

  unSelectAll() {
    this._selectionService.unSelectAll();
    this.selectedElements = this._selectionService.clients;
  }

  ngOnDestroy(): void {
    this.renderer = null;
    this._components = [];
  }
}
