import { Component, OnInit, Inject } from '@angular/core';
import { PopupRef } from './popup-ref';
import { POPUP_DATA } from './popup.tokens';

@Component({
  selector: 'hp-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css', '../../hp-components.css']
})
export class PopupComponent implements OnInit {
  constructor(
    public popupRef: PopupRef,
    @Inject(POPUP_DATA) public data: any
  ) {}

  ngOnInit() {}
}
