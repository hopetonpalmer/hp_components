import { Renderer2, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectorService } from '../selector/selector.service';
export declare class InteractionService implements OnDestroy {
    private _selectionService;
    private _deleteElementSubject;
    deleteElement$: Observable<Element>;
    private _deleteElementsSubject;
    deleteElements$: Observable<Element>;
    private _deleteSelectedElementsSubject;
    deleteSelectedElements$: Observable<{}>;
    private _addElementSubject;
    addElement$: Observable<Element>;
    private _selectedElementsSubject;
    selectedElements$: Observable<Element[]>;
    private _selectedElements;
    selectedElements: Element[];
    readonly hasSelectedElements: boolean;
    readonly canSelectElements: boolean;
    renderer: Renderer2;
    interactionHost: HTMLElement;
    constructor(_selectionService: SelectorService);
    /**
     * remove an element from the interaction host
     * @param element - the element to remove
     * @param renderer - the renderer used to remove the element
     */
    deleteElement(element: Element): void;
    /**
     * remove a list of elements from the interaction host
     * @param element - the elements to remove
     * @param renderer - the renderer used to remove the elements
     */
    deleteElements(elements: Element[]): void;
    deleteSelectedElements(): void;
    deleteAll(): void;
    addElement(element?: Element): void;
    addContainer(element?: Element): void;
    selectAll(): void;
    unSelectAll(): void;
    ngOnDestroy(): void;
}
