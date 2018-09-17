import { Component, OnInit } from '@angular/core';
import { ItemsComponent } from '../items/items.component';

@Component({
  selector: 'hpc-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent extends ItemsComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
}
