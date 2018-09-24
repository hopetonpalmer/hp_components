import { IInspectConfig } from '../../decorator';

export interface IComponentEditor {
  component: any;
  componentConfig: string;
  saveChanges(): Promise<boolean>;
}

export interface IPropertyEditor {
  components: any[];
  elements: HTMLElement[];
  propertyConfig: IInspectConfig;
  setStyleValue(styleName: string, value: string);
  getStyleValue(styleName: string): string;
  setPropertyValue(propertyName: string, value: any);
  getPropertyValue(propertyName: string): any;
}
