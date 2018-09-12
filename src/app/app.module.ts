import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HpComponentsModule} from 'hp-components-src';





@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HpComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
