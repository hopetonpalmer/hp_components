import { Component, OnInit, Input, AfterViewInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'hpc-composer',
  templateUrl: './composer.component.html',
  styleUrls: ['./composer.component.css', '../hp-components.css']
})
export class ComposerComponent implements OnInit, AfterViewInit {

  zoomChange = new EventEmitter<number>();

  private _zoom = 0.65;
  @Input()
  set zoom(value: number) {
    if (this._zoom !== value) {
      this._zoom = value;
      this.zoomChange.emit(value);
    }
  }

  get zoom(): number {
    return this._zoom;
  }

  @Input()
  headerVisible = true;


  constructor() {}

  ngOnInit() {
    this.registerWidgetTypes();
  }

  registerWidgetTypes() {}

  ngAfterViewInit() {

  }
}
