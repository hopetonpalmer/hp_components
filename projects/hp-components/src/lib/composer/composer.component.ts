import { Component, OnInit, Input, AfterViewInit, EventEmitter } from '@angular/core';
import { IframeComponent, RemoteAppComponent } from '../widgets';
import { ComposerService } from './composer.service';

@Component({
  selector: 'hpc-composer',
  templateUrl: './composer.component.html',
  styleUrls: ['./composer.component.css', '../hp-components.css']
})
export class ComposerComponent implements OnInit, AfterViewInit {

  zoomChange = new EventEmitter<number>();

  private _zoom = 0.65;
  @Input()
  set zoom(value: number) {
    if (this._zoom !== value) {
      this._zoom = value;
      this.zoomChange.emit(value);
    }
  }

  get zoom(): number {
    return this._zoom;
  }

  @Input()
  headerVisible = true;


  constructor(public composerService: ComposerService) {}

  ngOnInit() {
    this.registerWidgetTypes();
  }

  registerWidgetTypes() {
    const widgets = [
      {
        group: 'General', icon: '',
        widgets: [
          { name: 'IFrame', componentClass: IframeComponent }
        ]
      },
      {
        group: 'Web Apps', icon: '',
        widgets: [
          { name: 'Player Hosted App', componentClass: IframeComponent },
          { name: 'Server Hosted App', componentClass: RemoteAppComponent }
        ]
      },
      {
        group: 'My Widgets', icon: '',
        widgets: [

        ]
      }
    ];
    this.composerService.registerWidgetGroups(widgets, true);
  }

  ngAfterViewInit() {

  }
}
