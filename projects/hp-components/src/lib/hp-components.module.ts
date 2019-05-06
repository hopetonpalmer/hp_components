import { NgModule, Injector, InjectionToken, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';

import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import { TreeviewItemComponent } from './ui/treeview/treeview-item/treeview-item.component';
import { SelectorComponent } from './selector/selector.component';
import { InteractionDirective } from './interaction/interaction.directive';
import { ColorComboBoxComponent } from './ui/color-combo-box/color-combo-box.component';
import { AutoScrollDirective } from './directives/auto-scroll.directive';
import { WidgetDirective } from './widgets/widget.directive';
import { SegmentComponent } from './widgets/segment.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { setInjectorRef } from './scripts/lib-injector';
import { InteractionComponent } from './interaction/interaction.component';
import { ComposerComponent } from './composer/composer.component';
import { PropertyGridComponent } from './property-grid/property-grid.component';
import { WidgetGridComponent } from './widget-grid/widget-grid.component';
import { IframeComponent } from './widgets/iframe/iframe.component';
import { HostedAppComponent } from './widgets/hosted-app/hosted-app.component';
import { RemoteAppComponent } from './widgets/remote-app/remote-app.component';
import { WebAppComponent } from './widgets/web-app/web-app.component';
import { PreviewComponent } from './composer/preview/preview.component';
import { PreviewService } from './composer/preview/preview.service';
import { TreeviewComponent } from './ui/treeview/treeview.component';
import { PanelComponent } from './ui/panel/panel.component';
import { HeaderComponent } from './ui/header/header.component';
import { ListViewComponent } from './ui/list-view/list-view.component';
import { ItemsComponent } from './ui/items/items.component';
import { AccordionComponent } from './ui/accordion/accordion.component';
import { ExpanderComponent } from './ui/expander/expander.component';
import { ColorPickerComponent } from './ui/color-picker/color-picker.component';
import { ColorSwatchComponent } from './ui/color-swatch/color-swatch.component';
import { DropDownButtonComponent } from './ui/drop-down-button/drop-down-button.component';
import { DropDownListComponent } from './ui/drop-down-list/drop-down-list.component';
import { PixelInputComponent } from './ui/pixel-input/pixel-input.component';
import { ComboBoxComponent } from './ui/combo-box/combo-box.component';
import { PopupComponent } from './ui/popup/popup.component';
import { TabComponent } from './ui/tab/tab.component';
import { TabItemComponent } from './ui/tab/tab-item/tab-item.component';
import { TabStripComponent } from './ui/tab/tab-strip/tab-strip.component';
// tslint:disable-next-line:max-line-length
import { StringPropertyEditorComponent } from './property-grid/editors/property-editors/string-property-editor/string-property-editor.component';
// tslint:disable-next-line:max-line-length
import { NumberPropertyEditorComponent } from './property-grid/editors/property-editors/number-property-editor/number-property-editor.component';
// tslint:disable-next-line:max-line-length
import { BooleanPropertyEditorComponent } from './property-grid/editors/property-editors/boolean-property-editor/boolean-property-editor.component';
// tslint:disable-next-line:max-line-length
import { AlignmentPropertyEditorComponent } from './property-grid/editors/property-editors/alignment-property-editor/alignment-property-editor.component';
// tslint:disable-next-line:max-line-length
import { BackgroundPropertyEditorComponent } from './property-grid/editors/property-editors/background-property-editor/background-property-editor.component';
import { FontPropertyEditorComponent } from './property-grid/editors/property-editors/font-property-editor/font-property-editor.component';
// tslint:disable-next-line:max-line-length
import { ColorPropertyEditorComponent } from './property-grid/editors/property-editors/color-property-editor/color-property-editor.component';
// tslint:disable-next-line:max-line-length
import { MediaSourcePropertyEditorComponent } from './property-grid/editors/property-editors/media-source-property-editor/media-source-property-editor.component';
// tslint:disable-next-line:max-line-length
import { StylePropertyEditorComponent } from './property-grid/editors/property-editors/style-property-editor/style-property-editor.component';
// tslint:disable-next-line:max-line-length
import { ThicknessPropertyEditorComponent } from './property-grid/editors/property-editors/thickness-property-editor/thickness-property-editor.component';
// tslint:disable-next-line:max-line-length
import { ShadowPropertyEditorComponent } from './property-grid/editors/property-editors/shadow-property-editor/shadow-property-editor.component';
// tslint:disable-next-line:max-line-length
import { BorderPropertyEditorComponent } from './property-grid/editors/property-editors/border-property-editor/border-property-editor.component';
// tslint:disable-next-line:max-line-length
import { PosandsizePropertyEditorComponent } from './property-grid/editors/property-editors/posandsize-property-editor/posandsize-property-editor.component';
import { SliderDirective, TextDirective } from './ui/color-picker/helpers';
import { ThemeEditorComponent } from './property-grid/editors/property-editors/theme-editor';





@NgModule({
  imports: [
    OverlayModule,
    A11yModule,
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    InteractionComponent,
    ComposerComponent,
    TreeviewComponent,
    TreeviewItemComponent,
    SelectorComponent,
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
    BackgroundPropertyEditorComponent,
    FontPropertyEditorComponent,
    ColorPropertyEditorComponent,
    MediaSourcePropertyEditorComponent,
    StylePropertyEditorComponent,
    ThicknessPropertyEditorComponent,
    ThemeEditorComponent,

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
    TreeviewItemComponent,
    SelectorComponent,
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
    BackgroundPropertyEditorComponent,
    FontPropertyEditorComponent,
    ColorPropertyEditorComponent,
    MediaSourcePropertyEditorComponent,
    StylePropertyEditorComponent,
    ThicknessPropertyEditorComponent,
    ShadowPropertyEditorComponent,
    BorderPropertyEditorComponent,
    PosandsizePropertyEditorComponent,
    ThemeEditorComponent,

    ColorPickerComponent,
    InteractionDirective,
    ColorSwatchComponent,
    DropDownButtonComponent,
    DropDownListComponent,
    PixelInputComponent,
    ColorComboBoxComponent,
    ComboBoxComponent,
    TabComponent,
    TabItemComponent,
    TabStripComponent,
    WidgetGridComponent,
    IframeComponent,
    HostedAppComponent,
    RemoteAppComponent,
    PopupComponent,
    SegmentComponent,
    WebAppComponent,
    PreviewComponent,

    WidgetDirective,
    AutoScrollDirective,
    SafeHtmlPipe
  ],
  providers: [PreviewService],
  entryComponents: [
    PanelComponent,
    StringPropertyEditorComponent,
    NumberPropertyEditorComponent,
    BooleanPropertyEditorComponent,
    AlignmentPropertyEditorComponent,
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
