import { Component, OnInit, AfterViewInit, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { IInspectableConfig, getInspectableComponentInfo, IInspectConfig, getInspectPropertyInfos } from '../decorator';
import { InteractionService } from '../interaction/interaction.service';
import { PropertyInspectorService } from './property-inspector.service';
import {StringPropertyEditorComponent,
  BooleanPropertyEditorComponent,
  NumberPropertyEditorComponent,
  ColorPropertyEditorComponent,
  FontPropertyEditorComponent,
  MediaSourcePropertyEditorComponent,
  StylePropertyEditorComponent} from './editors/';


@Component({
  selector: 'hpc-property-grid',
  templateUrl: './property-grid.component.html',
  styleUrls: ['./property-grid.component.css', '../hp-components.css']
})
export class PropertyGridComponent implements OnInit, AfterViewInit {
  /**
   * Returns the first active component.
   */
  get activeComponent(): any {
    const components = this._interactionService.selectedComponents;
    if (components && components.length > 0) {
      return components[0];
    }
    return null;
  }

  /**
   * Returns the first active HTML element.
   */
  get activeElement(): HTMLElement {
    const elements = this._interactionService.selectedElements;
    if (elements && elements.length > 0) {
      return elements[0] as HTMLElement;
    }
    return null;
  }

  /**
   * Returns a style value of the first active component.
   */
  getActiveElementValue(styleName: string): any {
     return this._inspectorService.getStyleValue(styleName);
  }

  /**
   * Sets a style value for all active elements.
  */
  setActiveElementsValue(prop: string, value: string) {
      this._inspectorService.setStyleValue(prop, value);
  }

  get inspectableComponentInfo(): IInspectableConfig {
    return getInspectableComponentInfo(this.activeComponent);
  }

  get inspectableProperties(): IInspectConfig[] {
    return getInspectPropertyInfos(this.activeComponent);
  }

  getPropType(prop: IInspectConfig) {
    return prop.propType;
  }

  getPropertyEditor(prop: IInspectConfig): any {
    return prop.editorClass
      ? prop.editorClass
      : this._inspectorService.getPropertyEditor(prop.propType);
  }

  constructor(
    private _inspectorService: PropertyInspectorService,
    private _interactionService: InteractionService,
    private _changeDectorRef: ChangeDetectorRef
  ) {
    this.registerKnownInspectors();
  }

  private registerKnownInspectors() {
    this._inspectorService.registerPropertyInspector('string', StringPropertyEditorComponent);
    this._inspectorService.registerPropertyInspector('text', StringPropertyEditorComponent);
    this._inspectorService.registerPropertyInspector('boolean', BooleanPropertyEditorComponent);
    this._inspectorService.registerPropertyInspector('number', NumberPropertyEditorComponent);
    this._inspectorService.registerPropertyInspector('color', ColorPropertyEditorComponent);
    this._inspectorService.registerPropertyInspector('backgroundColor', ColorPropertyEditorComponent);
    this._inspectorService.registerPropertyInspector('borderColor', ColorPropertyEditorComponent);
    this._inspectorService.registerPropertyInspector('font', FontPropertyEditorComponent);
    this._inspectorService.registerPropertyInspector('src', MediaSourcePropertyEditorComponent);
    this._inspectorService.registerPropertyInspector('mediaSource', MediaSourcePropertyEditorComponent);
    this._inspectorService.registerPropertyInspector('style', StylePropertyEditorComponent);
    this.registerKnownStyleInspectors();
  }

  private registerKnownStyleInspectors() {
    this._inspectorService.registerStyleInspector('background-color', ColorPropertyEditorComponent);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this._changeDectorRef.detectChanges();
  }
}
