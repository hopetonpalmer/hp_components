import { IInspectConfig } from '../../decorator';

export interface IComponentEditor {
  component: any;
  componentConfig: string;
  saveChanges(): boolean;
}

export interface IPropertyEditor {
  value: any;
  component: any;
  propertyConfig: IInspectConfig;
  saveChanges(): boolean;
}
