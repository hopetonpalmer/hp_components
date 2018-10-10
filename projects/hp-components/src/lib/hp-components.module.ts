import { NgModule, Injector } from '@angular/core';

import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';

import { InteractionComponent } from './interaction/interaction.component';
import { ComposerComponent } from './composer/composer.component';
import { TreeviewComponent } from './ui/treeview/treeview.component';
import { TreeviewItemComponent } from './ui/treeview/treeview-item/treeview-item.component';
import { SelectorComponent } from './selector/selector.component';
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
import { DropDownListComponent } from './ui/drop-down-list/drop-down-list.component';
import { PixelInputComponent } from './ui/pixel-input/pixel-input.component';
import { DropDownButtonComponent } from './ui/drop-down-button/drop-down-button.component';
import { ColorComboBoxComponent } from './ui/color-combo-box/color-combo-box.component';
import { ComboBoxComponent } from './ui/combo-box/combo-box.component';
// tslint:disable-next-line:max-line-length
import { ShadowPropertyEditorComponent } from './property-grid/editors/property-editors/shadow-property-editor/shadow-property-editor.component';
// tslint:disable-next-line:max-line-length
import { BorderPropertyEditorComponent } from './property-grid/editors/property-editors/border-property-editor/border-property-editor.component';
// tslint:disable-next-line:max-line-length
import { PosandsizePropertyEditorComponent } from './property-grid/editors/property-editors/posandsize-property-editor/posandsize-property-editor.component';
import { TabStripComponent, TabItemComponent, TabComponent } from './ui/tab';
import { PersistenceService } from './services/persistence.service';
import { setInjectorRef } from './scripts/lib-injector';


@NgModule({
  imports: [OverlayModule, A11yModule, CommonModule],
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
    ColorSwatchComponent,
    DropDownButtonComponent,
    DropDownListComponent,
    PixelInputComponent,
    ColorComboBoxComponent,
    ComboBoxComponent,
    ShadowPropertyEditorComponent,
    BorderPropertyEditorComponent,
    PosandsizePropertyEditorComponent,
    TabComponent,
    TabItemComponent,
    TabStripComponent
  ],
  exports: [
    InteractionComponent,
    ComposerComponent,
    TreeviewComponent,
    PanelComponent,
    HeaderComponent,
    ListViewComponent,
    HeaderComponent,
    TabStripComponent
  ],
  providers: [
    DragService,
    SizeService,
    InteractionService,
    SelectorService,
    ComposerService,
    PersistenceService,
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
  constructor(injector: Injector) {
    setInjectorRef(injector);
  }
}
