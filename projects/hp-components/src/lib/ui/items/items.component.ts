import { Component, OnInit, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { Orientation } from '../../scripts/types';

export type ITemplateSelector = (item: any) => TemplateRef<any>;

@Component({
  selector: 'hp-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css', '../../hp-components.css']
})
/**
   Represents a component that can be used to represent a colleciton of items.
   The ItemsComponent has no default visual appearance. Use the Template property
   to specify a ComponentTemplate to define the appearance of an ItemsComponent.
   The ItemsPresenter uses the specified ItemsPanelTemplate to layout the items.
   If an ItemsPanelTemplate is not specified, the default is used.
 */
export class ItemsComponent implements OnInit {
  private _selectedItem: any;

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

  /**
   * Gets or sets the flow orientation of items.
   */
  @Input()
  orientation: Orientation = 'vertical';

  /**
 * Gets or sets whether content is wrapped to fit its parrent.
 */
  @Input()
  wrapContent = false;

  /**
   * Sets the current selected item
   */
  @Input()
  set selectedItem(value: any) {
    if (value !== this._selectedItem) {
      this._selectedItem = value;
      this.doSelectItem(value);
    }
  }

  /**
   * Gets the current selected item
  */
  get selectedItem(): any {
    if (!this._selectedItem && this.itemsSource.length) {
      this._selectedItem = this.itemsSource[0];
    }
    return this._selectedItem;
  }

  /**
   * Raised when the selectedItem changes.
   */
  @Output()
  selectedItemChange = new EventEmitter<any>();

  @Output()
  itemClick = new EventEmitter<any>();

  /**
   * Determines if an item is selected by comparing it against the selectedItem.
   * @param item - An item from the itemsSource
   * @returns boolean
   */
  isSelected(item: any): boolean {
    return item === this.selectedItem;
  }

  itemClicked(item: any) {
    // event.stopPropagation();
    this.selectedItem = item;
    this.itemClick.emit(item);
  }


  constructor() {}

  protected doSelectItem(item: any) {
    this.selectedItemChange.emit(item);
  }

  ngOnInit() {}
}
