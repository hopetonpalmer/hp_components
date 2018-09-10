export class Rect {
  constructor(public left: number = 0, public top: number = 0, public width: number = 0, public height: number = 0) { }
  get right(): number {
    return this.left + this.width;
  }
  get bottom(): number {
    return this.top + this.height;
  }
  get isEmpty(): boolean {
    return (this.height + this.width) === 0;
  }
  get topLeft(): Point {
    return new Point(this.left, this.top);
  }
  get topRight(): Point {
    return new Point(this.right, this.top);
  }
  get bottomLeft(): Point {
    return new Point(this.left, this.bottom);
  }
  get bottomRight(): Point {
    return new Point(this.right, this.bottom);
  }

}
export class Size {
  constructor(public height: number = 0, public width: number = 0) { }
}

export class Point {
  constructor(public x: number = 0, public y: number = 0) { }
  add(point: Point) {
    this.x = this.x + point.x;
    this.y = this.y + point.y;
  }
  subtract(point: Point) {
    this.x = this.x - point.x;
    this.y = this.y - point.y;
  }
}
