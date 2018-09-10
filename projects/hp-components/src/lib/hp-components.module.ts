import { NgModule } from '@angular/core';
import { InteractionComponent } from './interaction/interaction.component';
import { ComposerComponent } from './composer/composer.component';
import { TreeviewComponent } from './treeview/treeview.component';
import { TreeviewItemComponent } from './treeview/treeview-item/treeview-item.component';
import { SelectorComponent } from './selector/selector.component';
import {CommonModule} from '@angular/common';
import {DragService} from './services/drag.service';
import {SizeService} from './services/size.service';
import {InteractionService} from './interaction/interaction.service';
import {SelectorService} from './selector/selector.service';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { PropertyGridComponent } from './property-grid/property-grid.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    InteractionComponent,
    ComposerComponent,
    TreeviewComponent,
    TreeviewItemComponent,
    SelectorComponent,
    FileManagerComponent,
    PropertyGridComponent
  ],
  exports: [
    InteractionComponent,
    ComposerComponent,
    TreeviewComponent
  ],
  providers: [
    DragService,
    SizeService,
    InteractionService,
    SelectorService
  ]
})
export class HpComponentsModule { }
