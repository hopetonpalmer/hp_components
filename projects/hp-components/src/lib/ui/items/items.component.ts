import { Component, OnInit, Input, TemplateRef } from '@angular/core';

export type ITemplateSelector = (item: any) => TemplateRef<any>;

@Component({
  selector: 'hpc-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
/**
   Represents a component that can be used to represent a colleciton of items.
   The ItemsComponent has no default visual appearance. Use the Template property
   to specify a ComponentTemplate to define the appearance of an ItemsComponent.
   The ItemsPresenter uses the specified ItemsPanelTemplate to layout the items.
   If an ItemsPanelTemplate is not specified, the default is used.
 */
export class ItemsComponent implements OnInit {
  /**
   * Gets or sets an array used to generate the content of the ItemsComponent
   */
  @Input()
  itemsSource: any[];

  /**
   * Gets or sets a path to a value on the source object to serve as the visual representation of the object.
   */
  @Input()
  displayMemberPath: string;

  /**
   * Gets a boolean value that indicates whether the ItemsComponent contains items.
   */
  get hasItems(): boolean {
    return this.itemsSource && this.itemsSource.length > 0;
  }

  /**
   * Gets or sets the template that defines the panel that controls the layout of items.
   */
  @Input()
  itemsPanelTemplate: TemplateRef<any>;

  /**
   * Gets or sets the data template used to display each item.
   */
  @Input()
  itemTemplate: TemplateRef<any>;

  /**
   * Gets or sets the custom logic for choosing a template used to display an item.
   */
  @Input()
  itemTemplateSelector: ITemplateSelector;

  constructor() {}

  ngOnInit() {}
}
