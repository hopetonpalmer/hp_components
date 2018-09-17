import { Component, OnInit, Input } from '@angular/core';
import 'reflect-metadata';
import {
   Inspect,
   Inspectable,
   getInspectableComponentInfo,
   getInspectPropertyInfos
} from 'hp-components-src';
import { DomSanitizer } from '@angular/platform-browser';

@Inspectable({ icon: 'assets/videoplayer.png' })
@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {
  @Inspect({ category: 'Other' })
  @Input()
  source = 'https://webstorage.cloud.convergent.com/Content/Cox/Video/c3fca7fa-7be0-49ac-9e56-fdfa5decc3d4.mp4';

  @Inspect({ category: 'Other' })
  @Input()
  height: number;

  @Inspect({ category: 'Other' })
  @Input()
  width: number;

  constructor(private sanitizer: DomSanitizer) {
    console.log(getInspectPropertyInfos(this));
    console.log(getInspectableComponentInfo(this));
  }

  ngOnInit() {}
}


