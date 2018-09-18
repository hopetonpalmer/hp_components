import { Point, Rect, Size } from './math';
import { Renderer2 } from '@angular/core';
export declare function offset2(el: HTMLElement): Point;
export declare function offset(el: HTMLElement): Point;
export declare function pixToNum(value: string): number;
export declare function numToPix(value: number, autoWhenZero?: boolean): string;
export declare function childElements(element: HTMLElement, orderByZOrder?: boolean): HTMLElement[];
export declare function removeHelperChildren(children: HTMLElement[]): void;
export declare function removeArrayItem(array: any[], item: any): void;
export declare function intersect(a: Rect, b: Rect): boolean;
export declare function elementsAtRect(parent: HTMLElement, rect: Rect, exclude?: HTMLElement[]): any[];
export declare function elementPos(element: HTMLElement): Point;
export declare function elementSize(element: HTMLElement): Size;
export declare function elementBounds(element: HTMLElement, relativeToPage?: boolean, scale?: Point): Rect;
export declare function elementPagePos(element: HTMLElement): Point;
export declare function parentTree(element: HTMLElement, lastClass?: string, inclusive?: boolean): Array<HTMLElement>;
export declare function moveElementTo(renderer: Renderer2, element: HTMLElement, position: Point): void;
export declare function moveElementBy(renderer: Renderer2, element: any, delta: Point): void;
export declare function sizeElementBy(renderer: Renderer2, element: any, delta: Point): void;
export declare function assignBoundingRect(renderer: Renderer2, source: HTMLElement, target: HTMLElement): void;
export declare function assignPosition(renderer: Renderer2, source: HTMLElement, target: HTMLElement): void;
export declare function setElementRect(renderer: Renderer2, rect: Rect, element: HTMLElement): void;
export declare function childrenOf(parent: HTMLElement, deep?: boolean, exclude?: any[]): HTMLElement[];
export declare function pointInRect(point: Point, rect: Rect): boolean;
/**
* Returns the first child element of the parent element at a given point.
* If there are no child elements at the given point, then the parent element is returned.
*/
export declare function elementAtPoint(pos: Point, parent: HTMLElement, exclude?: any[]): HTMLElement;
export declare function xelementAtPoint(pos: Point, parent: HTMLElement, exclude?: any[]): HTMLElement;
export declare function changeParent(element: HTMLElement, newParent: HTMLElement, renderer: Renderer2): void;
export declare function getScaledPos(element: HTMLElement, scale: number): Point;
export declare function getRelativePointerPos(e: PointerEvent, element: HTMLElement, scale?: number): Point;
export declare function elementDraggable(element: Element): boolean;
export declare function elementSizable(element: Element): boolean;
export declare function elementLocked(element: Element): boolean;
export declare function isContainer(element: Element): boolean;
export declare function isSelectable(element: Element): boolean;
