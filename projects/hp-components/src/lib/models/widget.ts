import { Property } from '../property-grid/models/property';
import { Type } from '@angular/core';


export interface IWidget {
  id: string;
  name: string;
  widgetType: IWidgetType;
  properties: Property[];
}

export interface IWidgetType {
  description?: string;
  icon?: string;
  componentClassName: string;
  componentClass: Type<any>;
}

