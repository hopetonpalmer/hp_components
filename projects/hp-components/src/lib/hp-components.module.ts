import { NgModule, Injector } from '@angular/core';

import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

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
  ShadowPropertyEditorComponent,
  BorderPropertyEditorComponent,
  PosandsizePropertyEditorComponent,
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
import { TabStripComponent, TabItemComponent, TabComponent } from './ui/tab';
import { PersistenceService } from './services/persistence.service';
import { setInjectorRef } from './scripts/lib-injector';
import { WidgetGridComponent } from './widget-grid/widget-grid.component';
import { AutoScrollDirective } from './directives/auto-scroll.directive';
import { PreviewService } from './composer/preview/preview.service';
import { IframeComponent } from './widgets/iframe/iframe.component';
import { HostedAppComponent } from './widgets/hosted-app/hosted-app.component';
import { RemoteAppComponent } from './widgets/remote-app/remote-app.component';
import { WidgetDirective } from './widgets/widget.directive';
import { PopupComponent } from './ui/popup/popup.component';
import { PopupService } from './ui/popup/popup.service';
import { SegmentComponent } from './widgets/segment.component';
import { WebAppComponent } from './widgets/web-app/web-app.component';
import { PreviewComponent } from './composer/preview/preview.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';



@NgModule({
  imports: [OverlayModule, A11yModule, CommonModule, HttpClientModule],
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
    TabStripComponent,
    WidgetGridComponent,
    AutoScrollDirective,
    IframeComponent,
    HostedAppComponent,
    RemoteAppComponent,
    WidgetDirective,
    PopupComponent,
    SegmentComponent,
    WebAppComponent,
    PreviewComponent,
    SafeHtmlPipe
  ],
  exports: [
    InteractionComponent,
    ComposerComponent,
    TreeviewComponent,
    PanelComponent,
    HeaderComponent,
    ListViewComponent,
    HeaderComponent,
    TabStripComponent,
    ComboBoxComponent,
    ColorComboBoxComponent,
    SafeHtmlPipe
  ],
  providers: [
    DragService,
    SizeService,
    InteractionService,
    SelectorService,
    ComposerService,
    PersistenceService,
    PropertyInspectorService,
    PreviewService,
    PopupService
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
    ColorPickerComponent,
    WebAppComponent,
    IframeComponent,
    HostedAppComponent,
    RemoteAppComponent,
    PopupComponent,
    PreviewComponent
  ]
})
export class HpComponentsModule {
  constructor(injector: Injector) {
    setInjectorRef(injector);
  }
}
