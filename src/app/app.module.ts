import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HpComponentsModule} from 'hp-components-src';
import { VideoPlayerComponent } from './widgets/video-player/video-player.component';
import { ImageViewerComponent } from './widgets/image-viewer/image-viewer.component';
import { MystringPropertyEditorComponent } from './widgets/editors/mystring-property-editor/mystring-property-editor.component';





@NgModule({
  declarations: [AppComponent, VideoPlayerComponent, ImageViewerComponent, MystringPropertyEditorComponent],
  imports: [BrowserModule, HpComponentsModule],
  providers: [],
  entryComponents: [VideoPlayerComponent, ImageViewerComponent, MystringPropertyEditorComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
