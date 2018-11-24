import { Component, OnInit } from '@angular/core';
import { ItemsComponent } from '../items/items.component';

@Component({
  selector: 'hp-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css', '../../hp-components.css']
})
export class ListViewComponent extends ItemsComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
}
