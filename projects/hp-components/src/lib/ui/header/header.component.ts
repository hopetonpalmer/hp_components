import { Component, OnInit, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'hpc-header',
  templateUrl: './header.component.html',
  styleUrls: ['../../hp-components.css', './header.component.css']
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
