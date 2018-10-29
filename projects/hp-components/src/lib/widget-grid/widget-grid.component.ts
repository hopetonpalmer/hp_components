import { Component, OnInit, ChangeDetectionStrategy, TemplateRef, Input } from '@angular/core';
import { IWidgetType } from '../models/widget-type';
import { ComposerService } from '../composer/composer.service';
import { InteractionService } from '../interaction/interaction.service';


@Component({
  selector: 'hpc-widget-grid',
  templateUrl: './widget-grid.component.html',
  styleUrls: ['../hp-components.css', './widget-grid.component.css']
})
export class WidgetGridComponent implements OnInit {

  @Input()
  headerCaption = 'Widgets';

  @Input()
  itemTemplate: TemplateRef<any>;

  constructor(public composerService: ComposerService, public iteractionService: InteractionService) { }

  ngOnInit() {

  }

  createWidget(item: IWidgetType) {
     this.iteractionService.addWidget(item.componentClass);
  }
}
