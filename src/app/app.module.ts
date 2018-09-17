import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HpComponentsModule} from 'hp-components-src';
import { VideoPlayerComponent } from './widgets/video-player/video-player.component';
import { ImageViewerComponent } from './widgets/image-viewer/image-viewer.component';





@NgModule({
  declarations: [AppComponent, VideoPlayerComponent, ImageViewerComponent],
  imports: [BrowserModule, HpComponentsModule],
  providers: [],
  entryComponents: [VideoPlayerComponent, ImageViewerComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
