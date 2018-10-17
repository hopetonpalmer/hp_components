import { Component, OnInit, Inject } from '@angular/core';
import { PopupRef } from './popup-ref';
import { POPUP_DATA } from './popup.tokens';

@Component({
  selector: 'hpc-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  constructor(public popupRef: PopupRef, @Inject(POPUP_DATA) public data: any) { }

  ngOnInit() {
  }

}
