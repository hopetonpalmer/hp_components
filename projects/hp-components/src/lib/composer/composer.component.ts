import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hpc-composer',
  templateUrl: './composer.component.html',
  styleUrls: ['./composer.component.css']
})
export class ComposerComponent implements OnInit {

  @Input() headerVisible = true;
  constructor() { }

  ngOnInit() {
  }

}
