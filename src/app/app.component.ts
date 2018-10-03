import { Component, ChangeDetectionStrategy, OnInit, AfterContentInit, AfterViewInit, Type } from '@angular/core';
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
  constructor(public interactionService: InteractionService,
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
    this.composerService.registerWidgetType({'componentClassName': 'ImageViewerComponent', 'componentClass': ImageViewerComponent});
    this.composerService.registerWidgetType({'componentClassName': 'VideoPlayerComponent', 'componentClass': VideoPlayerComponent});

    const componentTypes = new Map<string, Type<any>>();
    componentTypes.set('ImageViewerComponent', ImageViewerComponent);
    componentTypes.set('VideoPlayerComponent', VideoPlayerComponent);
    this.interactionService.registerComponentTypes(componentTypes);
  }

  ngAfterViewInit(): void {
    this.interactionService.load('interaction-data');
  }
}

