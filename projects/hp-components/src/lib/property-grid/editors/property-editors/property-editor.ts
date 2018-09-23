import { IPropertyEditor } from '../editor-interface';
import { IInspectConfig } from '../../../decorator';
import { PropertyInspectorService } from '../../property-inspector.service';



export abstract class PropertyEditor implements IPropertyEditor {
  get value(): any {
    return this.component[this.propertyConfig.propertyName];
  }
  component: any;
  propertyConfig: IInspectConfig;

  saveChanges(): Promise<boolean> {
     return null;
  }
  constructor(protected insepctorService: PropertyInspectorService) {

  }
}
