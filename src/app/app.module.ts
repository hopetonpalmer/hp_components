import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HpComponentsModule} from 'hp-components-src';
import { VideoPlayerComponent } from './widgets/video-player/video-player.component';
import { ImageViewerComponent } from './widgets/image-viewer/image-viewer.component';
import { MystringPropertyEditorComponent } from './widgets/editors/mystring-property-editor/mystring-property-editor.component';
import { HpSchedulerModule } from '@hp-components/scheduler-src';
import { HpCommonModule } from '@hp-components/common-src';
import { SchedulerEventService } from 'projects/hp-components/scheduler/src/lib/services/scheduler-event.service';







@NgModule({
  declarations: [
    AppComponent,
    VideoPlayerComponent,
    ImageViewerComponent,
    MystringPropertyEditorComponent
  ],
  imports: [
    BrowserModule,
    HpSchedulerModule,
    HpComponentsModule,
    HpCommonModule
  ],
  exports: [],
  providers: [SchedulerEventService],
  entryComponents: [
    VideoPlayerComponent,
    ImageViewerComponent,
    MystringPropertyEditorComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
