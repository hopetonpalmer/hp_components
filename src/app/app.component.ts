import { Component, ChangeDetectionStrategy } from '@angular/core';
import { InteractionService, PanelComponent } from 'hp-components-src';
import { VideoPlayerComponent } from './widgets/video-player/video-player.component';
import { ImageViewerComponent } from './widgets/image-viewer/image-viewer.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'hp-components-app';
  constructor(public interactionService: InteractionService) {}

  addPanelComponent() {
    this.interactionService.addComponent(ImageViewerComponent);
  }


  addVideoPlayer() {
    this.interactionService.addComponent(VideoPlayerComponent);
  }
}

