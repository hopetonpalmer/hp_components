import { Renderer2, OnDestroy } from '@angular/core';
import { Point } from '../scripts/math';
export declare class SizeService implements OnDestroy {
    renderer: Renderer2;
    readonly isHorizontalSizing: boolean;
    readonly isVerticalSizing: boolean;
    readonly isSizingFromTop: boolean;
    readonly isSizingFromLeft: boolean;
    readonly isRotating: boolean;
    readonly orientation: string;
    readonly reverseOrientation: string;
    minHeight: number;
    minWidth: number;
    cursor: string;
    gripKey: string;
    constructor();
    orientations: string[];
    removeSizingGrips(parent: HTMLElement, renderer: Renderer2): void;
    createSizingOverlay(element: HTMLElement): HTMLElement;
    sizeElementsBy(delta: Point, elements: HTMLElement[]): void;
    sizeElementBy(delta: Point, element: HTMLElement): void;
    prepareToSize(): void;
    canSize(element: Element): boolean;
    addSizingGrips(parentEl: HTMLElement, renderer: Renderer2): void;
    ngOnDestroy(): void;
}
