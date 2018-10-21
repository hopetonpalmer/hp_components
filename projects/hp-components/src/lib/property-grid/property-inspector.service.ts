import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InteractionService } from '../interaction/interaction.service';
import { camelToDash } from '../scripts/strings';
import { ColorVoid } from '../ui/color-picker/helpers';
import { IInspectConfig } from 'hp-components/public_api';



@Injectable()
export class PropertyInspectorService {
  styleInspectorMap = new Map<string, any>();
  propertyInspectorMap = new Map<string, any>();
  componentInspectorMap = new Map<any, any>();

  canAcceptChanges = true;


  /**
   * Gets the first active component from the selectedComponents array.
   * @returns * value
   */
  get activeComponent(): any {
    const components = this.interactionService.selectedComponents;
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
      if (!this.canAcceptChanges) {
        reject('Cannot accept changes!');
      }
      try {
        const components = this.interactionService.selectedComponents;
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
    if (!this.interactionService.hasSelectedElements) {
      if (this.activeComponent) {
        return this.interactionService.getComponentRoot(this.activeComponent);
      }
    }
    const elements = this.interactionService.selectedElements;
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
        const result =
          getComputedStyle(this.activeElement).getPropertyValue(
            camelToDash(styleName)
          ) || this.activeElement.style[styleName];
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
    if (!this.canAcceptChanges) {
      return;
    }
    let elements = this.interactionService.selectedElements;
    if (elements.length === 0) {
      elements = [this.activeElement];
    }
    elements.forEach((element: HTMLElement) => {
      if (element.style[styleName] !== value) {
        element.style[styleName] = value;
      }
    });
  }

  setElementPropValue(propName: string, value: string) {
    if (!this.canAcceptChanges) {
      return;
    }
    this.activeElement[propName] = value;
  }

  getElementPropValue(propName: string): string {
    return this.activeElement[propName];
  }

  constructor(public interactionService: InteractionService) {}

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


