import { Component, OnInit, Input } from '@angular/core';
import 'reflect-metadata';
import {Inspect, Inspectable, MediaSourcePropertyEditorComponent} from 'hp-components-src';


@Inspectable({ icon: 'assets/videoplayer.png' })
@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {

  @Inspect({ category: 'Other', propType: 'string', editorClass: MediaSourcePropertyEditorComponent})
  @Input()
  source = 'https://webstorage.cloud.convergent.com/Content/Cox/Video/2d58f20b-61de-4468-9124-7825f92686b9.mp4';


  @Inspect({ category: 'Other' })
  @Input()
  height: number;

  @Inspect({ category: 'Other' })
  @Input()
  width: number;

  @Inspect({ propType: 'objectfit' })
  videoFit = 'contain';

  constructor() {

  }

  ngOnInit() {}
}


