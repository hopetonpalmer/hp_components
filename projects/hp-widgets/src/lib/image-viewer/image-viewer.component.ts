import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hpcImageViewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css']
})
export class ImageViewerComponent implements OnInit {
  private _source: string;
  get source(): string {
    return this._source;
  }

  set source(value: string) {
     if (value !== undefined) {
       this._source = value;
     }
  }

  constructor() { }

  ngOnInit() {
  }

}
