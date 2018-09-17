import { Component, OnInit, Input } from '@angular/core';
import { IInspectableConfig, getInspectableComponentInfo, IInspectConfig, getInspectPropertyInfos } from '../decorator';
import { InteractionService } from '../interaction/interaction.service';

@Component({
  selector: 'hpc-property-grid',
  templateUrl: './property-grid.component.html',
  styleUrls: ['./property-grid.component.css']
})
export class PropertyGridComponent implements OnInit {

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
  constructor(private _interactionService: InteractionService) {

  }

  ngOnInit() {

  }

}
