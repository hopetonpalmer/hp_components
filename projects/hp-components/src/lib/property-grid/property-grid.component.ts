import { Component, OnInit, ViewChildren, TemplateRef, QueryList, AfterViewInit, ChangeDetectorRef } from '@angular/core';
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

  get component(): any {
    const components = this._interactionService.selectedComponents;
    if (components && components.length > 0) {
      return components[0];
    }
    return null;
  }

  get inspectableComponentInfo(): IInspectableConfig {
    return getInspectableComponentInfo(this.component);
  }

  get inspectableProperties(): IInspectConfig[] {
    return getInspectPropertyInfos(this.component);
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
    private _changeDectorRef: ChangeDetectorRef) {
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
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this._changeDectorRef.detectChanges();
  }
}
