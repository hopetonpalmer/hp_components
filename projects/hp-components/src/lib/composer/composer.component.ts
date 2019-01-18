import { Component, OnInit, Input, AfterViewInit, EventEmitter } from '@angular/core';
import { IframeComponent, RemoteAppComponent, WebAppComponent } from '../widgets';
import { ComposerService } from './composer.service';
import { PopupService } from '../ui/popup/popup.service';
import { PreviewComponent } from './preview/preview.component';


@Component({
  selector: 'hp-composer',
  templateUrl: './composer.component.html',
  styleUrls: ['./composer.component.css']
})
export class ComposerComponent implements OnInit, AfterViewInit {
  zoomChange = new EventEmitter<number>();

  @Input()
  widgetGridVisible = true;

  @Input()
  propertyGridVisible = true;

  @Input()
  headerVisible = true;

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

  constructor(
    public composerService: ComposerService,
    private popupDialog: PopupService
  ) {}

  ngOnInit() {
    this.registerWidgetTypes();
  }

  preview() {
    const config = {
      height: 0,
      width: 0,
      hasBackdrop: false
    };
    const dialogRef = this.popupDialog.open(PreviewComponent, config);
  }

  registerWidgetTypes() {
    const widgets = [
      {
        group: 'General',
        icon: '',
        widgets: [{ name: 'IFrame', componentClass: IframeComponent }]
      },
      {
        group: 'Web Apps',
        icon: '',
        widgets: [
          { name: 'Player Hosted App', componentClass: IframeComponent },
          { name: 'Server Hosted App', componentClass: RemoteAppComponent },
          { name: 'Configurable Web App', componentClass: WebAppComponent }
        ]
      },
      {
        group: 'My Widgets',
        icon: '',
        widgets: []
      }
    ];
    this.composerService.registerWidgetGroups(widgets, true);
  }

  ngAfterViewInit() {}
}
