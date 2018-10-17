import { Component, ChangeDetectionStrategy, OnInit, AfterContentInit, AfterViewInit, Type, ChangeDetectorRef } from '@angular/core';
import { InteractionService, ComposerService } from 'hp-components-src';
import { VideoPlayerComponent } from './widgets/video-player/video-player.component';
import { ImageViewerComponent } from './widgets/image-viewer/image-viewer.component';
import { PropertyInspectorService } from 'projects/hp-components/src/lib/property-grid/property-inspector.service';
import { MystringPropertyEditorComponent } from './widgets/editors/mystring-property-editor/mystring-property-editor.component';
import { GeneratedFile } from '@angular/compiler';




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


  ngOnInit(): void {
    this.inspectorService.registerPropertyInspector('string', MystringPropertyEditorComponent);
    const widgets = [
      {
        group: 'General', icon: '',
        widgets: [
          { name: 'Text', componentClass: ImageViewerComponent },
          { name: 'Date', componentClass: VideoPlayerComponent },
          { name: 'Clock', componentClass: VideoPlayerComponent },
          { name: 'RSS Feed', componentClass: ImageViewerComponent },
          { name: 'QR Code', componentClass: VideoPlayerComponent },
        ]
      },
      {
        group: 'Media', icon: '',
        widgets: [
          { name: 'Image', componentClass: ImageViewerComponent },
          { name: 'Video', componentClass: VideoPlayerComponent },
          { name: 'Media RSS', componentClass: ImageViewerComponent },
        ]
      },
      {
        group: 'Social', icon: '',
        widgets: [
          { name: 'Facebook', componentClass: ImageViewerComponent },
          { name: 'Twitter', componentClass: VideoPlayerComponent },
          { name: 'Periscope', componentClass: ImageViewerComponent },
          { name: 'Youtube', componentClass: VideoPlayerComponent },
          { name: 'Slack', componentClass: VideoPlayerComponent },
        ]
      },
      {
        group: 'Corporate Comms', icon: '',
        widgets: [
          { name: 'Welcome', componentClass: ImageViewerComponent },
          { name: 'Career Opportunities', componentClass: VideoPlayerComponent },
          { name: 'Employee Recognition', componentClass: ImageViewerComponent },
          { name: 'Employee Birthday', componentClass: ImageViewerComponent },
        ]
      },
      {
        group: 'HTML Element', icon: '',
        widgets: [
          { name: 'Div', group: 'HTML Element', componentClass: HTMLDivElement },
          { name: 'Span', group: 'HTML Element', componentClass: HTMLSpanElement },
          { name: 'Label', group: 'HTML Element', componentClass: HTMLLabelElement },
          { name: 'Image', group: 'HTML Element', componentClass: HTMLImageElement },
          { name: 'Video', group: 'HTML Element', componentClass: HTMLVideoElement },
          { name: 'Text Area', group: 'HTML Element', componentClass: HTMLTextAreaElement }
        ]
      },
    ];
    this.composerService.registerWidgetGroups(widgets, true);
  }

  ngAfterViewInit(): void {
    this.interactionService.load('interaction-data');
    this.cdRef.detectChanges();
  }
}

