import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { ItemsComponent } from '../items/items.component';

@Component({
  selector: 'hp-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['../../hp-components.css', './accordion.component.css']
})
export class AccordionComponent extends ItemsComponent implements OnInit {

  @Input()
  contentTemplate: TemplateRef<any>;

  @Input()
  multiExpand = true;

  constructor() {
      super();
   }

  ngOnInit() {
  }

}
