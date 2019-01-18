import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ThemeService } from './theme.service';


@Component({
  selector: 'hp-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css', '../common.css'],
  encapsulation: ViewEncapsulation.None
})
export class ThemeComponent implements OnInit {
  @Input()
  set themeName(value: string) {
    this.themeService.activeTheme = this.themeService.theme(value);
  }

  get themeName(): string {
    return this.themeService.activeTheme.name;
  }

  constructor(private themeService: ThemeService) {
    this.themeName = 'Default';
  }

  ngOnInit() {}
}
