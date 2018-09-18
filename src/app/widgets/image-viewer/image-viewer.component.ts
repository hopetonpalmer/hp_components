import { Component, OnInit } from '@angular/core';
import { Inspectable, Inspect } from 'hp-components-src';

@Inspectable({ icon: 'assets/imageViewer.png' })
@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css']
})
export class ImageViewerComponent implements OnInit {
  @Inspect()
  source: string;

  @Inspect({ propType: 'objectfit' })
  imageFit = 'contain';

  aspectRatio = '16/9';

  constructor() {}

  ngOnInit() {}
}
