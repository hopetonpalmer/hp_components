import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './tab.component';
import { TabItemComponent } from './tab-item/tab-item.component';
import { TabStripComponent } from './tab-strip/tab-strip.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    // TabItemComponent
  ]
  // declarations: [TabComponent, TabItemComponent, TabStripComponent]
})
export class TabModule { }
