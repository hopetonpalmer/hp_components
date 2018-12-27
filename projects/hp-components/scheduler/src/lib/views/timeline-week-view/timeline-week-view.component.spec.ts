import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineWeekViewComponent } from './timeline-week-view.component';

describe('TimelineWeekViewComponent', () => {
  let component: TimelineWeekViewComponent;
  let fixture: ComponentFixture<TimelineWeekViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineWeekViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineWeekViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
