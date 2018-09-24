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
import { StringPropertyEditorComponent,
  NumberPropertyEditorComponent,
  BooleanPropertyEditorComponent,
  AlignmentPropertyEditorComponent,
  BrushPropertyEditorComponent,
  BackgroundPropertyEditorComponent,
  FontPropertyEditorComponent,
  ColorPropertyEditorComponent,
  MediaSourcePropertyEditorComponent,
  StylePropertyEditorComponent,
  ThicknessPropertyEditorComponent} from './property-grid/editors';
import { ColorPickerComponent } from './ui/color-picker/color-picker.component';
import { InteractionDirective } from './interaction/interaction.directive';
import { SliderDirective, TextDirective } from './ui/color-picker/helpers';
import { ColorSwatchComponent } from './ui/color-swatch/color-swatch.component';
import { PropertyInspectorService } from './property-grid/property-inspector.service';
import { AccordionComponent, ExpanderComponent } from './ui';
import { PropertyEditor } from './property-grid/editors/property-editors/property-editor';




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
    AccordionComponent,
    ExpanderComponent,

    StringPropertyEditorComponent,
    NumberPropertyEditorComponent,
    BooleanPropertyEditorComponent,
    AlignmentPropertyEditorComponent,
    BrushPropertyEditorComponent,
    BackgroundPropertyEditorComponent,
    FontPropertyEditorComponent,
    ColorPropertyEditorComponent,
    MediaSourcePropertyEditorComponent,
    StylePropertyEditorComponent,
    ThicknessPropertyEditorComponent,

    ColorPickerComponent,
    InteractionDirective,
    SliderDirective,
    TextDirective,
    ColorSwatchComponent
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
    ComposerService,
    PropertyInspectorService
  ],
  entryComponents: [
    PanelComponent,
    StringPropertyEditorComponent,
    NumberPropertyEditorComponent,
    BooleanPropertyEditorComponent,
    AlignmentPropertyEditorComponent,
    BrushPropertyEditorComponent,
    BackgroundPropertyEditorComponent,
    FontPropertyEditorComponent,
    ColorPropertyEditorComponent,
    MediaSourcePropertyEditorComponent,
    StylePropertyEditorComponent,
    ThicknessPropertyEditorComponent,
    ColorPickerComponent
  ]
})
export class HpComponentsModule {
   constructor(private propertyInspectorService: PropertyInspectorService) {
     PropertyEditor.inspectorService = propertyInspectorService;
   }
}
