import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { PanelComponent } from '../panel/panel.component';

@Component({
  selector: 'hpc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../../hp-components.css']
})
export class HeaderComponent implements OnInit {
  /**
   * Gets or sets an object used to generate the content of the HeaderComponent
   */
  @Input()
  dataContext: any;

  /**
   * Gets or sets a path to a value on the dataContext object to serve as the visual representation of the object.
   */
  @Input()
  displayMemberPath = 'text';

  /**
   * Gets or sets a custom data template used to display the HeaderComponent.
   */
  @Input()
  headerTemplate: TemplateRef<any>;

  constructor() {

  }

  ngOnInit() {}
}
