import { IInspectConfig } from '../../decorator';

export interface IComponentEditor {
  component: any;
  componentConfig: string;
  saveChanges(): Promise<boolean>;
}

export interface IPropertyEditor {
  value: any;
  component: any;
  propertyConfig: IInspectConfig;
  saveChanges(): Promise<boolean>;
}
