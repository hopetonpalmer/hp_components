import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DropDownListComponent } from '../drop-down-list/drop-down-list.component';

@Component({
  selector: 'hp-combo-box',
  templateUrl: './combo-box.component.html',
  styleUrls: ['../../hp-components.css', './combo-box.component.css']
})
export class ComboBoxComponent extends DropDownListComponent implements OnInit {

  constructor() {
     super();
   }

  ngOnInit() {
  }

}
