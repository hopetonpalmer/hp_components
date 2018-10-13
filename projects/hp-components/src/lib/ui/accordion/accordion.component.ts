import { Component, OnInit, TemplateRef, Input, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { ItemsComponent } from '../items/items.component';
import { ExpanderComponent } from '../expander/expander.component';


@Component({
  selector: 'hpc-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent extends ItemsComponent implements OnInit {

  @Input()
  contentTemplate: TemplateRef<any>;

  @Input()
  multiExpand = true;

  @ViewChildren('expander')
  expanders: QueryList<ExpanderComponent>;

  constructor() {
      super();
   }

  ngOnInit() {
  }

}
