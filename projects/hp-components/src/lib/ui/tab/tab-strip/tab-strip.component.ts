import { Component, OnInit, Input } from '@angular/core';
import { ItemsComponent } from '../../items/items.component';

@Component({
  selector: 'hpc-tab-strip',
  templateUrl: './tab-strip.component.html',
  styleUrls: ['./tab-strip.component.css']
})
export class TabStripComponent extends ItemsComponent implements OnInit {

  constructor() {
    super();
    this.orientation = 'horizontal';
   }

  ngOnInit() {
  }

  tabClicked(item: any, e: Event) {
    e.stopPropagation();
    this.itemClicked(item);
  }
}
