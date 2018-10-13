import { Property } from '../property-grid/models/property';
import { Type } from '@angular/core';


export interface IWidget {
  name: string;
  description?: string;
  icon?: string;
  group: string;
  componentClass: Type<any>;
}


