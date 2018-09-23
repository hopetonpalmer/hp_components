import { Component, OnInit, Injector } from '@angular/core';
import { PropertyEditor } from '../property-editor';
import { PropertyInspectorService } from '../../../property-inspector.service';

@Component({
  selector: 'hpc-media-source-property-editor',
  templateUrl: './media-source-property-editor.component.html',
  styleUrls: ['./media-source-property-editor.component.css']
})
export class MediaSourcePropertyEditorComponent extends PropertyEditor implements OnInit {

  constructor(injector: Injector) {
     super(injector.get(PropertyInspectorService));
   }

  ngOnInit() {
  }

}
