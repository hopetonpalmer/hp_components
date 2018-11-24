import { Component, OnInit } from '@angular/core';
import { PopupService } from '../../ui/popup/popup.service';

@Component({
  selector: 'hp-remote-app',
  templateUrl: './remote-app.component.html',
  styleUrls: ['./remote-app.component.css']
})
export class RemoteAppComponent implements OnInit {

  constructor( private popupDialog: PopupService) { }

  ngOnInit() {
  }

  loadPopup() {
    const dialogRef = this.popupDialog.open();
  }
}
