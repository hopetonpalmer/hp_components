import { Component, ChangeDetectionStrategy } from '@angular/core';
import { InteractionService } from 'hp-components-src';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'hp-components-app';
  constructor(public interactionService: InteractionService) {}
}
