import { Component, ChangeDetectionStrategy, OnInit, AfterContentInit, AfterViewInit, Type, ChangeDetectorRef } from '@angular/core';
import { InteractionService, ComposerService, ThemeService, ITheme } from 'hp-components';
import { VideoPlayerComponent } from './widgets/video-player/video-player.component';
import { ImageViewerComponent } from './widgets/image-viewer/image-viewer.component';
import { MystringPropertyEditorComponent } from './widgets/editors/mystring-property-editor/mystring-property-editor.component';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  themes: ITheme[] = [];
  get activeTheme(): ITheme {
    return this.themeService.activeTheme;
  }

  set activeTheme(value: ITheme) {
    this.themeService.activeTheme = value;
  }

  get customTheme(): ITheme {
    return this.themeService.customTheme;
  }

  title = 'hp-components-app';
  constructor(private cdRef: ChangeDetectorRef, public interactionService: InteractionService,
    public themeService: ThemeService,
    public composerService: ComposerService) {}

  updateCustomTheme(changes: {}) {
    this.themeService.updateCustomTheme(changes);
  }

  ngOnInit(): void {
    this.themes = this.themeService.themes;
    this.activeTheme = this.themeService.theme('mauve');
    // this.inspectorService.registerPropertyInspector('string', MystringPropertyEditorComponent);
    const widgets = [
      {
        group: 'General', icon: '',
        widgets: [
          { name: 'Text', componentClass: ImageViewerComponent },
          { name: 'Date', componentClass: VideoPlayerComponent },
          { name: 'Clock', componentClass: VideoPlayerComponent },
          { name: 'RSS Feed', componentClass: ImageViewerComponent },
          { name: 'QR Code', componentClass: VideoPlayerComponent },
        ]
      },
      {
        group: 'Media', icon: '',
        widgets: [
          { name: 'Image', componentClass: ImageViewerComponent },
          { name: 'Video', componentClass: VideoPlayerComponent },
          { name: 'Media RSS', componentClass: ImageViewerComponent },
        ]
      },
      {
        group: 'Social', icon: '',
        widgets: [
          { name: 'Facebook', componentClass: ImageViewerComponent },
          { name: 'Twitter', componentClass: VideoPlayerComponent },
          { name: 'Periscope', componentClass: ImageViewerComponent },
          { name: 'Youtube', componentClass: VideoPlayerComponent },
          { name: 'Slack', componentClass: VideoPlayerComponent },
        ]
      },
      {
        group: 'Corporate Communications', icon: '',
        widgets: [
          { name: 'Career Opportunities', componentClass: ImageViewerComponent },
          { name: 'Company Announce- ments', componentClass: VideoPlayerComponent },
          { name: 'Company Awareness', componentClass: ImageViewerComponent },
          { name: 'Company Benefits', componentClass: ImageViewerComponent },
          { name: 'Company Events', componentClass: ImageViewerComponent },
          { name: 'Company Holidays', componentClass: ImageViewerComponent },
          { name: 'Company News', componentClass: VideoPlayerComponent },
          { name: 'Customer Wins', componentClass: ImageViewerComponent },
          { name: 'Employee Anniversary', componentClass: ImageViewerComponent },
          { name: 'Employee Recognition', componentClass: ImageViewerComponent },
          { name: 'New Hire', componentClass: ImageViewerComponent },
          { name: 'New Product Launch', componentClass: VideoPlayerComponent },
          { name: 'Safety Message', componentClass: ImageViewerComponent },
          { name: 'Value Statement', componentClass: ImageViewerComponent },
          { name: 'Welcome Message', componentClass: ImageViewerComponent },
        ]
      },
      {
        group: 'HTML Element', icon: '',
        widgets: [
          { name: 'Div', group: 'HTML Element', componentClass: HTMLDivElement },
          { name: 'Span', group: 'HTML Element', componentClass: HTMLSpanElement },
          { name: 'Label', group: 'HTML Element', componentClass: HTMLLabelElement },
          { name: 'Image', group: 'HTML Element', componentClass: HTMLImageElement },
          { name: 'Video', group: 'HTML Element', componentClass: HTMLVideoElement },
          { name: 'Text Area', group: 'HTML Element', componentClass: HTMLTextAreaElement }
        ]
      },
    ];
    this.composerService.registerWidgetGroups(widgets, true);
  }

  ngAfterViewInit(): void {
    this.interactionService.load('interaction-data');
    this.cdRef.detectChanges();
  }
}

