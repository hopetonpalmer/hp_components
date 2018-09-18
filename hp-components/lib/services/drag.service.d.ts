import { Renderer2, OnDestroy } from '@angular/core';
import { Point } from '../scripts/math';
export declare class DragService implements OnDestroy {
    dragCursor: string;
    renderer: Renderer2;
    constructor();
    createDragOverlay(element: HTMLElement): HTMLElement;
    dragElementsBy(delta: Point, elements: HTMLElement[]): void;
    canDrag(element: Element): boolean;
    /**
     * Returns a child HTMLElement located at the top-left coordinates of the
     * draggedElement with an attribute of is-dropzone set to true.
     *
     * @param HTMLElement draggedElement
     * @param HTMLElement parent
     * @returns HTMLElement
     */
    findDropZone(draggedElement: HTMLElement, parent: HTMLElement, exclude?: any[]): HTMLElement;
    updateDropZone(draggedElement: HTMLElement, parent: HTMLElement, exclude?: any[]): HTMLElement;
    clearDropZones(parent: HTMLElement): void;
    dropElement(dropZone: HTMLElement, draggedElement: HTMLElement, parent: HTMLElement): void;
    ngOnDestroy(): void;
}
