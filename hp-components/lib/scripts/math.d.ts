export declare class Rect {
    left: number;
    top: number;
    width: number;
    height: number;
    constructor(left?: number, top?: number, width?: number, height?: number);
    readonly right: number;
    readonly bottom: number;
    readonly isEmpty: boolean;
    readonly topLeft: Point;
    readonly topRight: Point;
    readonly bottomLeft: Point;
    readonly bottomRight: Point;
}
export declare class Size {
    height: number;
    width: number;
    constructor(height?: number, width?: number);
}
export declare class Point {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    add(point: Point): void;
    subtract(point: Point): void;
}
