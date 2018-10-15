import { Type } from '@angular/core';


export interface IWidgetType {
  name: string;
  description?: string;
  icon?: string;
  componentClass: Type<any>;
}

export interface IWidgetTypeGroup {
  group: string;
  icon: string;
  widgets: IWidgetType[];
}

