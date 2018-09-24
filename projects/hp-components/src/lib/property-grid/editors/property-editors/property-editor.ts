import { IPropertyEditor } from '../editor-interface';
import { IInspectConfig } from '../../../decorator';
import { PropertyInspectorService } from '../../property-inspector.service';



export abstract class PropertyEditor implements IPropertyEditor {
  static inspectorService: PropertyInspectorService;

  components: any[];
  propertyConfig: IInspectConfig;

  styleName: string;
  elements: HTMLElement[];

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
}
