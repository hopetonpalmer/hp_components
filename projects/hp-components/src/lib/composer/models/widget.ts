import { Property } from '../../property-grid/models/property';
import { ComponentDef } from '@angular/core/src/render3';


export interface IWidget {
  id: string;
  name: string;
  widgetType: IWidgetType;
  properties: Property[];
}

export interface IWidgetType {
  name: string;
  description?: string;
  icon?: string;
  componentClass: any;
}

