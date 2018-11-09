import { Component, OnInit } from '@angular/core';
import { Inspectable } from '../../decorator/inspectable';

@Inspectable()
@Component({
  selector: 'hpc-hosted-app',
  templateUrl: './hosted-app.component.html',
  styleUrls: ['./hosted-app.component.css']
})
export class HostedAppComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
