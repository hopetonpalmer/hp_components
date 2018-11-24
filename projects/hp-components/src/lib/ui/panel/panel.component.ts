import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'hp-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css', '../../hp-components.css']
})
export class PanelComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    console.log('destroying...');
  }

  constructor() { }

  ngOnInit() {
  }

}
