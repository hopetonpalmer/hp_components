import { Component, OnInit, ViewChildren, TemplateRef, QueryList, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { IInspectableConfig, getInspectableComponentInfo, IInspectConfig, getInspectPropertyInfos } from '../decorator';
import { InteractionService } from '../interaction/interaction.service';

const typeTemplateIds = ['string', 'number', 'boolean', 'objectfit'];

@Component({
  selector: 'hpc-property-grid',
  templateUrl: './property-grid.component.html',
  styleUrls: ['./property-grid.component.css', '../hp-components.css']
})
export class PropertyGridComponent implements OnInit, AfterViewInit {
  @ViewChildren('string, number, boolean, objectfit')
  private _templates: QueryList<TemplateRef<any>>;

  get component(): any {
    const components = this._interactionService.selectedComponents;
    if (components && components.length > 0) {
      return components[0];
    }
    return null;
  }

  get inspectableComponentInfo(): IInspectableConfig {
    return getInspectableComponentInfo(this.component);
  }

  get inspectableProperties(): IInspectConfig[] {
    return getInspectPropertyInfos(this.component);
  }

  getPropType(prop: IInspectConfig) {
    return prop.propType;
  }

  getTemplate(prop: IInspectConfig): TemplateRef<any> {
    if (!this._templates) {
      return null;
    }
    const index = typeTemplateIds.indexOf(prop.propType.toLowerCase());
    return this._templates.toArray()[index];
  }

  constructor(
    private _interactionService: InteractionService,
    private _changeDectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this._changeDectorRef.detectChanges();
  }
}
