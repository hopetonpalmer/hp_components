import { Property } from '../../property-grid/models/property';

export interface IWidgetData {
  id: string;
  name: string;
  top: number;
  left: number;
  height: number;
  width: number;
  widgetClass: string;
  properties: Property[];
}
