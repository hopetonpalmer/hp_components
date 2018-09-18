import { NgModule } from '@angular/core';
import { InteractionComponent } from './interaction/interaction.component';
import { ComposerComponent } from './composer/composer.component';
import { TreeviewComponent } from './ui/treeview/treeview.component';
import { TreeviewItemComponent } from './ui/treeview/treeview-item/treeview-item.component';
import { SelectorComponent } from './selector/selector.component';
import { CommonModule } from '@angular/common';
import { DragService } from './services/drag.service';
import { SizeService } from './services/size.service';
import { InteractionService } from './interaction/interaction.service';
import { SelectorService } from './selector/selector.service';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { PropertyGridComponent } from './property-grid/property-grid.component';
import { PanelComponent } from './ui/panel/panel.component';
import { HeaderComponent } from './ui/header/header.component';
import { ComposerService } from './composer/composer.service';
import { ItemsComponent } from './ui/items/items.component';
import { ListViewComponent } from './ui/list-view/list-view.component';
import { MediaSourceComponent } from './property-grid/editors/property-editors/media-source/media-source.component';
import { FontComponent } from './property-grid/editors/property-editors/font/font.component';
import { ColorComponent } from './property-grid/editors/property-editors/color/color.component';
import { BackgroundComponent } from './property-grid/editors/property-editors/background/background.component';
import { BrushComponent } from './property-grid/editors/property-editors/brush/brush.component';
import { AlignmentComponent } from './property-grid/editors/property-editors/alignment/alignment.component';
import { StringComponent } from './property-grid/editors/property-editors/string/string.component';
import { NumberComponent } from './property-grid/editors/property-editors/number/number.component';
import { BooleanComponent } from './property-grid/editors/property-editors/boolean/boolean.component';
import { BooleanEditorComponent } from './property-grid/editors/property-editors/boolean-editor/boolean-editor.component';
import { NumberEditorComponent } from './property-grid/editors/property-editors/number-editor/number-editor.component';
import { StringPropertyEditorComponent } from './property-grid/editors/property-editors/string-property-editor/string-property-editor.component';
import { NumberPropertyEditorComponent } from './property-grid/editors/property-editors/number-property-editor/number-property-editor.component';
import { BooleanPropertyEditorComponent } from './property-grid/editors/property-editors/boolean-property-editor/boolean-property-editor.component';
import { AlignmentPropertyEditorComponent } from './property-grid/editors/property-editors/alignment-property-editor/alignment-property-editor.component';
import { BrushPropertyEditorComponent } from './property-grid/editors/property-editors/brush-property-editor/brush-property-editor.component';
import { BackgroundPropertyEditorComponent } from './property-grid/editors/property-editors/background-property-editor/background-property-editor.component';
import { FontPropertyEditorComponent } from './property-grid/editors/property-editors/font-property-editor/font-property-editor.component';
import { ColorPropertyEditorComponent } from './property-grid/editors/property-editors/color-property-editor/color-property-editor.component';
import { MediaSourcePropertyEditorComponent } from './property-grid/editors/property-editors/media-source-property-editor/media-source-property-editor.component';


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
    PropertyGridComponent,
    PanelComponent,
    HeaderComponent,
    ListViewComponent,
    ItemsComponent,
    MediaSourceComponent,
    FontComponent,
    ColorComponent,
    BackgroundComponent,
    BrushComponent,
    AlignmentComponent,
    StringComponent,
    NumberComponent,
    BooleanComponent,
    BooleanEditorComponent,
    NumberEditorComponent,
    StringPropertyEditorComponent,
    NumberPropertyEditorComponent,
    BooleanPropertyEditorComponent,
    AlignmentPropertyEditorComponent,
    BrushPropertyEditorComponent,
    BackgroundPropertyEditorComponent,
    FontPropertyEditorComponent,
    ColorPropertyEditorComponent,
    MediaSourcePropertyEditorComponent
  ],
  exports: [
    InteractionComponent,
    ComposerComponent,
    TreeviewComponent,
    PanelComponent,
    HeaderComponent,
    ListViewComponent,
    HeaderComponent
  ],
  providers: [
    DragService,
    SizeService,
    InteractionService,
    SelectorService,
    ComposerService
  ],
  entryComponents: [
    PanelComponent
  ]
})
export class HpComponentsModule { }
