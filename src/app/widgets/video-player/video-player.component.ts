import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import 'reflect-metadata';
import {Inspect, Inspectable, MediaSourcePropertyEditorComponent} from 'hp-components-src';


@Inspectable({ icon: 'assets/videoplayer.png' })
@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']

})
export class VideoPlayerComponent implements OnInit, AfterViewInit {

  @Inspect({ category: 'Other', propType: 'string', editorClass: MediaSourcePropertyEditorComponent})
  @Input()
  source = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';


  @Inspect({ category: 'Other' })
  @Input()
  height: number;

  @Inspect({ category: 'Other' })
  @Input()
  width: number;

  @Inspect({ propType: 'objectfit' })
  videoFit = 'contain';

  @ViewChild('video')
  video: ElementRef;
  constructor() {

  }

  ngOnInit() {
    console.log('init');
  }

  ngAfterViewInit() {
    this.video.nativeElement.muted = true;
    this.video.nativeElement.play().then(() => {
      // this.video.nativeElement.muted = false;
    });
  }

}


