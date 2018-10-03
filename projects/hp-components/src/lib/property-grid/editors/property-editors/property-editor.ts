import { IPropertyEditor } from '../editor-interface';
import { IInspectConfig } from '../../../decorator';
import { PropertyInspectorService } from '../../property-inspector.service';
import { OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';



export abstract class PropertyEditor implements IPropertyEditor, OnInit, OnDestroy, AfterViewInit {
  static inspectorService: PropertyInspectorService;

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
    return PropertyEditor.inspectorService.activeElement;
  }

  getPropertyValue(propertyName: string): any {
    return PropertyEditor.inspectorService.getPropertyValue(propertyName);
  }

  setStyleValue(styleName: string, value: string) {
     PropertyEditor.inspectorService.setStyleValue(styleName, value);
  }

  getStyleValue(styleName: string): string {
    return PropertyEditor.inspectorService.getStyleValue(styleName);
  }

  async setPropertyValue(propertyName: string, value: any) {
    await PropertyEditor.inspectorService.setPropertyValueAsync(propertyName, value);
  }

  constructor() {

  }

  elementChanged() {}

  ngOnInit(): void {
     this._elementChangeSubscription = PropertyEditor.inspectorService.interactionService.selectedElements$.subscribe(() => {
        this.elementChanged();
     });
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
