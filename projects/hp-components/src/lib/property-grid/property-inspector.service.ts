import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InteractionService } from '../interaction/interaction.service';
import { camelToDash } from '../scripts/strings';
import { ColorVoid } from '../ui/color-picker/helpers';



@Injectable()
export class PropertyInspectorService {

  styleInspectorMap = new Map<string, any>();
  propertyInspectorMap = new Map<string, any>();
  componentInspectorMap = new Map<any, any>();

  /**
   * Gets the first active component from the selectedComponents array.
   * @returns * value
   */
  get activeComponent(): any {
    const components = this._interactionService.selectedComponents;
    if (components && components.length > 0) {
      return components[0];
    }
    return null;
  }

  /**
   * Gets a property value of the active component.
   *
   * @param string propertyName
   * @returns * value
   */
  getPropertyValue(propertyName: string): any {
    if (this.activeComponent) {
      return this.activeComponent[propertyName];
    }
    return null;
  }

  /**
   * Sets a component property value asynchronously.
   *
   * @param string propertyName
   * @param * value
   * @returns Promise<boolean>
   */
  setPropertyValueAsync(propertyName: string, value: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      try {
        const components = this._interactionService.selectedComponents;
        if (components) {
          components.forEach(component => {
            component[propertyName] = value;
          });
          resolve(true);
        }
        reject('There are no selected components available to update!');
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Gets the first active HTML element from the selectedElements array.
   * @returns HTMLElement value
   */
  get activeElement(): HTMLElement {
    if (!this._interactionService.hasSelectedElements) {
       if (this.activeComponent) {
         return this._interactionService.getComponentRoot(this.activeComponent);
       }
    }
    const elements = this._interactionService.selectedElements;
    if (elements && elements.length > 0) {
      return elements[0] as HTMLElement;
    }
    return null;
  }

  /**
   * Returns a style value of the first active element.
   *
   * @param string styleName
   * @returns string value
   */
  getStyleValue(styleName: string): string {
    if (this.activeElement) {
      try {
        const result = getComputedStyle(this.activeElement).getPropertyValue(camelToDash(styleName)) || this.activeElement.style[styleName];
        return result;
      } catch (error) {
        console.error(error);
      }
    }
    return null;
  }

  /**
   * Sets a style value for all active elements.
   *
   * @param string styleName
   * @param string value
   */
  setStyleValue(styleName: string, value: string) {
    let elements = this._interactionService.selectedElements;
    if (elements.length === 0 ) {
      // -- Special case for interaction host element, it should not have a transparent designer
      if (styleName === 'backgroundColor' && value === ColorVoid) {
        value = 'white';
      }
      elements = [this.activeElement];
    }
    elements.forEach((element: HTMLElement) => {
      element.style[styleName] = value;
    });
  }

  constructor(private _interactionService: InteractionService) {}

  registerPropertyInspector(propertyTypeName: string, editorClass: any) {
    propertyTypeName = propertyTypeName.toLowerCase();
    if (this.propertyInspectorMap.has(propertyTypeName)) {
      this.propertyInspectorMap.delete(propertyTypeName);
    }
    this.propertyInspectorMap.set(propertyTypeName, editorClass);
  }

  registerStyleInspector(styleName: string, editorClass: any) {
    if (this.styleInspectorMap.has(styleName)) {
      this.styleInspectorMap.delete(styleName);
    }
    this.styleInspectorMap.set(styleName, editorClass);
  }

  registerComponentInspector(componentClass: any, editorClass: any) {
    if (this.componentInspectorMap.has(componentClass)) {
      this.componentInspectorMap.delete(componentClass);
    }
    this.componentInspectorMap.set(componentClass, editorClass);
  }

  getStyleEditor(styleName: string): any {
    return this.styleInspectorMap.get(styleName);
  }

  getPropertyEditor(propertyTypeName: string): any {
    return this.propertyInspectorMap.get(propertyTypeName.toLowerCase());
  }

  getComponentEditor(componentClass: any): any {
    return this.componentInspectorMap.get(componentClass);
  }
}


