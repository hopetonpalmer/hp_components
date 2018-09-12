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

  private _selectedElementsSubject = new BehaviorSubject<Element[]>(null);
  selectedElements$ = this._selectedElementsSubject.asObservable();

  private _selectedElements: Element[] = [];
  get selectedElements(): Element[] {
    return this._selectedElements;
  }
  set selectedElements(elements: Element[]) {
    this._selectedElements = elements;
    this._selectedElementsSubject.next(elements);
  }
  get hasSelectedElements(): boolean {
    return this._selectedElements && this._selectedElements.length > 0;
  }

  get canSelectElements(): boolean {
    return this._selectionService.selectableElements.length > 0;
  }

  renderer: Renderer2;
  interactionHost: HTMLElement;

  constructor(private _selectionService: SelectorService) { }

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
    this.renderer.appendChild(this.interactionHost, element);
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
  }
}
