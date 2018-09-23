import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { InteractionService } from 'hp-components-src';
import { VideoPlayerComponent } from './widgets/video-player/video-player.component';
import { ImageViewerComponent } from './widgets/image-viewer/image-viewer.component';
import { PropertyInspectorService } from 'projects/hp-components/src/lib/property-grid/property-inspector.service';
import { MystringPropertyEditorComponent } from './widgets/editors/mystring-property-editor/mystring-property-editor.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'hp-components-app';
  constructor(public interactionService: InteractionService, public inspectorService: PropertyInspectorService) {}

  addImageComponent() {
    this.interactionService.addComponent(ImageViewerComponent);
  }

  addVideoPlayer() {
    this.interactionService.addComponent(VideoPlayerComponent);
  }

  ngOnInit(): void {
    this.inspectorService.registerPropertyInspector('string', MystringPropertyEditorComponent);
  }
}

