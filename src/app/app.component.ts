import { Component, ChangeDetectionStrategy, OnInit, AfterContentInit, AfterViewInit, Type, ChangeDetectorRef, Host } from '@angular/core';
import { VideoPlayerComponent } from './widgets/video-player/video-player.component';
import { ImageViewerComponent } from './widgets/image-viewer/image-viewer.component';
import { MystringPropertyEditorComponent } from './widgets/editors/mystring-property-editor/mystring-property-editor.component';
import { ComposerService, InteractionService } from 'hp-components-src';
import { startOfWeek, addDays, addMonths, addWeeks, startOfDay, addHours, addMinutes } from 'date-fns';
import { SchedulerService} from '@hp-components/scheduler-src';
import { ITheme, ThemeService } from '@hp-components/common-src';
import { Observable } from 'rxjs';
import { EventItem } from 'projects/hp-components/scheduler/src/lib/event-item/event-item';
import { random as randomColor } from '@ctrl/tinycolor';
import { SchedulerEventService } from 'projects/hp-components/scheduler/src/lib/services/scheduler-event.service';





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

  dateSettings = {
    firstDayOfWeek: 1
  };

  eventItems: EventItem[];

  title = 'hp-components-app';
  constructor(private cdRef: ChangeDetectorRef, public interactionService: InteractionService,
    public themeService: ThemeService,
    public schedulerService: SchedulerService,
    public eventService: SchedulerEventService,
    public composerService: ComposerService) {}

  updateCustomTheme(changes: {}) {
    this.themeService.updateCustomTheme(changes);
  }

  ngOnInit(): void {
    this.loadEvents();
    this.themes = this.themeService.themes;
    this.activeTheme = this.themeService.theme('Dark');
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

  loadEvents() {
    const start = new Date();
    start.setHours(7);
    const eventItems = [
      new EventItem(
        addDays(addHours(start, -5), -3),
        addDays(addMinutes(start, 125), 25),
        'Test Two',
        this.randomColor()
      ),
      new EventItem(
        addHours(start, 2.5),
        addHours(start, 4.5),
        'Test Two',
        this.randomColor()
      ),
      new EventItem(
        addHours(start, 3.5),
        addHours(start, 5.5),
        'Test Two',
        this.randomColor()
      ),
      new EventItem(
        addMinutes(start, 45),
        addDays(addMinutes(start, 60), 4),
        'Test One with long subject',
        this.randomColor()
      ),
      /*  new EventItem(
         addHours(start, 4.0),
         addHours(start, 10.5),
         'Test One',
         'brown'
       ),
       new EventItem(
         addDays(addMinutes(start, 30), 0),
         addDays(addHours(start, 2), 3),
         'Multi Days',
         'limegreen'
       ),
       new EventItem(
         addDays(addMinutes(start, 45), -4),
         addDays(addHours(start, 3), -3),
         'Test One',
         'orange'
       ),
       new EventItem(
         addHours(start, 3.5),
         addHours(start, 5.5),
         'Test One',
         'gray'
       ),
       new EventItem(
         addHours(start, 4.5),
         addHours(start, 6.5),
         'Test One',
         'purple'
       ),
       new EventItem(
         addHours(start, 3.5),
         addHours(start, 5.5),
         'Test One',
         'teal'
       ),
       new EventItem(
         addHours(start, 3.5),
         addHours(start, 7.5),
         'Test One',
         'orange'
       ),
       new EventItem(
         addHours(start, 3.5),
         addHours(start, 5.5),
         'Test One',
         'gray'
       ) */
    ];
    // this.eventItems = eventItems;
     this.eventService.addEventItems(eventItems);
     this.eventService.addEventItem(
      new EventItem(
        addHours(start, 3.5),
        addHours(start, 5.5),
        'Test One',
        this.randomColor()
      )
    );
  }

  addEvent() {
    const start = new Date().setHours(7);
    const event = new EventItem(
      addHours(start, 3.5),
      addHours(start, 5.5),
      'Test One',
      this.randomColor()
    );
    event.isAllDay = true;
    this.eventService.addEventItem(
      event
    );
  }

  deleteEvent() {
    const items = this.eventService.getEventItems();
    this.eventService.deleteEventItem();
  }

  randomColor(): string {
    const result = '#' + randomColor().toHex();
    return result;
  }
}

