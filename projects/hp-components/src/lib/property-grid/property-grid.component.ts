import { Component, OnInit, AfterViewInit, ChangeDetectorRef, HostListener, OnDestroy,
  ChangeDetectionStrategy, ElementRef, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { IInspectableConfig, getInspectableComponentInfo, IInspectConfig, getInspectPropertyInfos } from '../decorator';
import { InteractionService } from '../interaction/interaction.service';
import { PropertyInspectorService } from './property-inspector.service';
import {StringPropertyEditorComponent,
  BooleanPropertyEditorComponent,
  NumberPropertyEditorComponent,
  ColorPropertyEditorComponent,
  FontPropertyEditorComponent,
  MediaSourcePropertyEditorComponent,
  StylePropertyEditorComponent,
  IPropertyEditor} from './editors/';
import { properCase } from '../scripts/strings';
import { Observable, Subscription } from 'rxjs';



@Component({
  selector: 'hpc-property-grid',
  templateUrl: './property-grid.component.html',
  styleUrls: ['./property-grid.component.css', '../hp-components.css']
})
export class PropertyGridComponent implements OnInit, AfterViewInit, OnDestroy {
  _selectedElementsSubscriber: Subscription;
  _selectedComponentsSubscriber: Subscription;

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

  get headerCaption(): string {
    let result = '';
    if (this.inspectableComponentInfo) {
      result = this.inspectableComponentInfo.displayName;
    }
    if (!result && this.activeElement) {
      result = properCase(this.activeElement.nodeName);
    }
    return result;
  }

  @ViewChild('componentProps', { read: ViewContainerRef })
  componentPropsContainer: ViewContainerRef;

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
    private _cdRef: ChangeDetectorRef,
    private _inspectorService: PropertyInspectorService,
    private _interactionService: InteractionService,
    private _changeDectorRef: ChangeDetectorRef,
    private _componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.registerKnownInspectors();
  }

  private registerKnownInspectors() {
    this._inspectorService.registerPropertyInspector(
      'string',
      StringPropertyEditorComponent
    );
    this._inspectorService.registerPropertyInspector(
      'text',
      StringPropertyEditorComponent
    );
    this._inspectorService.registerPropertyInspector(
      'boolean',
      BooleanPropertyEditorComponent
    );
    this._inspectorService.registerPropertyInspector(
      'number',
      NumberPropertyEditorComponent
    );
    this._inspectorService.registerPropertyInspector(
      'color',
      ColorPropertyEditorComponent
    );
    this._inspectorService.registerPropertyInspector(
      'backgroundColor',
      ColorPropertyEditorComponent
    );
    this._inspectorService.registerPropertyInspector(
      'borderColor',
      ColorPropertyEditorComponent
    );
    this._inspectorService.registerPropertyInspector(
      'font',
      FontPropertyEditorComponent
    );
    this._inspectorService.registerPropertyInspector(
      'src',
      MediaSourcePropertyEditorComponent
    );
    this._inspectorService.registerPropertyInspector(
      'mediaSource',
      MediaSourcePropertyEditorComponent
    );
    this._inspectorService.registerPropertyInspector(
      'style',
      StylePropertyEditorComponent
    );
    this.registerKnownStyleInspectors();
  }

  private registerKnownStyleInspectors() {
    this._inspectorService.registerStyleInspector(
      'background-color',
      ColorPropertyEditorComponent
    );
  }

  @HostListener('mouseenter', ['$event'])
  mouseClick(event: MouseEvent) {
    this._inspectorService.canAcceptChanges = true;
  }

  ngOnInit() {
    // this.loadComponentPropertyEditors();
    this._selectedElementsSubscriber = this._interactionService.selectedElements$.subscribe(
      () => {
        this._inspectorService.canAcceptChanges = false;
      }
    );

    this._selectedComponentsSubscriber = this._interactionService.selectedComponents$.subscribe(
      () => {
        this._inspectorService.canAcceptChanges = false;
        this.loadComponentPropertyEditors();
      }
    );
  }

  ngOnDestroy(): void {
    this._selectedElementsSubscriber.unsubscribe();
    this._selectedComponentsSubscriber.unsubscribe();
  }

  ngAfterViewInit() {
    this._changeDectorRef.detectChanges();
  }

  loadComponentPropertyEditors() {
    if (!this.componentPropsContainer) {
      return;
    }
    this.componentPropsContainer.clear();
    this.inspectableProperties.forEach(prop => {
      const component = this.getPropertyEditor(prop);
      if (component) {
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(component);
        const componentRef = this.componentPropsContainer.createComponent(componentFactory);
        (<IPropertyEditor>(componentRef.instance)).propertyConfig = prop;
      }
    });
  }
}
