import {Injectable, Renderer2} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class InteractionService {

  private _deleteElementSubject = new Subject<HTMLElement>();
  deleteElement$ = this._deleteElementSubject.asObservable();

  private _deleteElementsSubject = new Subject<HTMLElement[]>();
  deleteElements$ = this._deleteElementSubject.asObservable();


  constructor() { }

  /**
   * remove an element from the interaction host
   * @param element - the element to remove
   * @param renderer - the renderer used to remove the element
   */
  deleteElement(element: HTMLElement, renderer: Renderer2) {
     renderer.removeChild(element.parentElement, element);
     this._deleteElementSubject.next(element);
  }

  /**
   * remove a list of elements from the interaction host
   * @param element - the elements to remove
   * @param renderer - the renderer used to remove the elements
   */
  deleteElements(elements: HTMLElement[], renderer: Renderer2) {
    elements.forEach(element => {
      renderer.removeChild(element.parentElement, element);
    })
    this._deleteElementsSubject.next(elements);
  }
}
