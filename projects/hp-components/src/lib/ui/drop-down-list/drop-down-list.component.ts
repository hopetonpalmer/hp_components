import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';

@Component({
  selector: 'hp-drop-down-list',
  templateUrl: './drop-down-list.component.html',
  styleUrls: ['../../hp-components.css', './drop-down-list.component.css']
})
export class DropDownListComponent implements OnInit {
  @Input()
  displayMemberPath: string;

  @Input()
  itemsSource: any[];

  _selectedItem: any;
  @Input()
  set selectedItem(value: any) {
    if (this._selectedItem !== value) {
      this._selectedItem = value;
      this.selectedItemChange.emit(value);
    }
  }

  get selectedItem(): any {
    if (!this._selectedItem && this.itemsSource.length > 0) {
       return this.itemsSource[0];
    }
    return this._selectedItem;
  }

  @Input()
  itemTemplate: TemplateRef<any>;

  @Input()
  itemsPanelTemplate: TemplateRef<any>;

  @Output()
  selectedItemChange = new EventEmitter<any>();


  constructor() {}

  ngOnInit() {}
}
