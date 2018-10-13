import { Component, ChangeDetectionStrategy, OnInit, AfterContentInit, AfterViewInit, Type, ChangeDetectorRef } from '@angular/core';
import { InteractionService, ComposerService } from 'hp-components-src';
import { VideoPlayerComponent } from './widgets/video-player/video-player.component';
import { ImageViewerComponent } from './widgets/image-viewer/image-viewer.component';
import { PropertyInspectorService } from 'projects/hp-components/src/lib/property-grid/property-inspector.service';
import { MystringPropertyEditorComponent } from './widgets/editors/mystring-property-editor/mystring-property-editor.component';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  title = 'hp-components-app';
  constructor(private cdRef: ChangeDetectorRef, public interactionService: InteractionService,
     public composerService: ComposerService,
     public inspectorService: PropertyInspectorService) {}

  addImageComponent() {
    this.interactionService.addComponent(ImageViewerComponent);
  }

  addVideoPlayer() {
    this.interactionService.addComponent(VideoPlayerComponent);
  }

  ngOnInit(): void {
    this.inspectorService.registerPropertyInspector('string', MystringPropertyEditorComponent);
    const widgets = [
      { name: 'Text', group: 'General', componentClass: ImageViewerComponent },
      { name: 'Date', group: 'General', componentClass: VideoPlayerComponent },
      { name: 'Clock', group: 'General', componentClass: VideoPlayerComponent },
      { name: 'RSS Feed', group: 'General', componentClass: ImageViewerComponent },
      { name: 'QR Code', group: 'General', componentClass: VideoPlayerComponent },

      { name: 'Image', group: 'Media', componentClass: ImageViewerComponent },
      { name: 'Video', group: 'Media', componentClass: VideoPlayerComponent },
      { name: 'Media RSS', group: 'Media', componentClass: ImageViewerComponent },

      { name: 'Facebook', group: 'Social', componentClass: ImageViewerComponent },
      { name: 'Twitter', group: 'Social', componentClass: VideoPlayerComponent },
      { name: 'Periscope', group: 'Social', componentClass: ImageViewerComponent },
      { name: 'Youtube', group: 'Social', componentClass: VideoPlayerComponent },

      { name: 'Welcome', group: 'Corporate Comms', componentClass: ImageViewerComponent },
      { name: 'Career Opportunities', group: 'Corporate Comms', componentClass: VideoPlayerComponent },
      { name: 'Employee Recognition', group: 'Corporate Comms', componentClass: ImageViewerComponent },
      { name: 'Employee Birthday', group: 'Corporate Comms', componentClass: ImageViewerComponent },

      { name: 'Div', group: 'HTML Element', componentClass: HTMLDivElement },
      { name: 'Span', group: 'HTML Element', componentClass: HTMLSpanElement },
      { name: 'Label', group: 'HTML Element', componentClass: HTMLLabelElement },
      { name: 'Image', group: 'HTML Element', componentClass: HTMLImageElement },
      { name: 'Video', group: 'HTML Element', componentClass: HTMLVideoElement },
      { name: 'Text Area', group: 'HTML Element', componentClass: HTMLTextAreaElement },
      { name: 'Script', group: 'HTML Element', componentClass: HTMLScriptElement }

    ];
    this.composerService.registerWidgets(widgets);
  }

  ngAfterViewInit(): void {
    this.interactionService.load('interaction-data');
    this.cdRef.detectChanges();
  }
}

