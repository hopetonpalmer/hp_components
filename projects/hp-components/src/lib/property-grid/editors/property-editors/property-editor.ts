import { IPropertyEditor } from '../editor-interface';
import { IInspectConfig } from '../../../decorator/inspectable';
import { PropertyInspectorService } from '../../property-inspector.service';
import { OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { InjectorRef } from '../../../scripts/lib-injector';



export abstract class PropertyEditor
  implements IPropertyEditor, OnInit, OnDestroy, AfterViewInit {
  inspectorService: PropertyInspectorService;

  _isLoaded = false;

  get isLoaded(): boolean {
    return this._isLoaded;
  }

  title: string;
  description: string;
  basePropName: string;

  components: any[];
  propertyConfig: IInspectConfig;

  styleName: string;
  elements: HTMLElement[];

  private _elementChangeSubscription: Subscription;

  get activeElement(): HTMLElement {
    return this.inspectorService.activeElement;
  }

  setStyleValue(styleName: string, value: string) {
    this.inspectorService.setStyleValue(styleName, value);
  }

  getStyleValue(styleName: string): string {
    return this.inspectorService.getStyleValue(styleName);
  }

  setElementPropValue(styleName: string, value: string) {
    this.inspectorService.setElementPropValue(styleName, value);
  }

  getElementPropValue(styleName: string): string {
    return this.inspectorService.getElementPropValue(styleName);
  }

  getPropertyValue(propertyName: string = null): any {
    if (!propertyName && this.propertyConfig) {
      propertyName = this.propertyConfig.propertyName;
    }
    if (propertyName) {
      return this.inspectorService.getPropertyValue(propertyName);
    }
    return null;
  }

  async setPropertyValue(value: any, propertyName: string = null) {
    if (!propertyName && this.propertyConfig) {
       propertyName = this.propertyConfig.propertyName;
    }
    if (propertyName) {
      await this.inspectorService.setPropertyValueAsync(propertyName, value, this.propertyConfig.isExternal);
    }
  }

  constructor() {
    this.inspectorService = InjectorRef.get(PropertyInspectorService);
  }

  elementChanged() {}

  ngOnInit(): void {
    this._elementChangeSubscription = this.inspectorService.interactionService.selectedElements$.subscribe (
      () => {
        this.elementChanged();
      }
    );
  }

  ngAfterViewInit(): void {
    this._isLoaded = true;
  }

  ngOnDestroy(): void {
    if (this._elementChangeSubscription) {
      this._elementChangeSubscription.unsubscribe();
    }
  }
}
