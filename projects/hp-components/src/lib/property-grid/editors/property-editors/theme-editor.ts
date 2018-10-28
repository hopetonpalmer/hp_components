import { Component, OnInit, Input } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'hpc-number-property-editor',
  template: `
  <div class="hpc-stack-h">
    <span style="margin-right: 5px" *ngIf="caption">{{caption}}</span>
    <hpc-combo-box style="margin-left: 5px" [displayMemberPath]="'name'"
     [itemsSource]="themeService.themes" [(selectedItem)]="themeService.activeTheme"></hpc-combo-box>
  </div>`,
  styleUrls: ['../editor-styles.css']
})
export class ThemeEditorComponent {
  @Input()
  caption = '';

  constructor(public themeService: ThemeService) {}
}
