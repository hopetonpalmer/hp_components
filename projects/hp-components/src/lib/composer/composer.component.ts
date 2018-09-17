import { Component, OnInit, Input, AfterViewChecked, ViewChildren, QueryList, ElementRef, ContentChildren } from '@angular/core';
import { ComposerService } from './composer.service';
import { PanelComponent } from '../ui/panel/panel.component';

@Component({
  selector: 'hpc-composer',
  templateUrl: './composer.component.html',
  styleUrls: ['./composer.component.css', '../hp-components.css']
})
export class ComposerComponent implements OnInit, AfterViewChecked {

  @Input() headerVisible = true;
  constructor(private _composerService: ComposerService) { }

  ngOnInit() {
    this.registerWidgetTypes();
  }

  registerWidgetTypes() {
     const panelType = {
       name: 'PanelComponent',
       componentClass: PanelComponent
     };
     this._composerService.registerWidgetType(panelType);
  }

  ngAfterViewChecked() {

  }
}
