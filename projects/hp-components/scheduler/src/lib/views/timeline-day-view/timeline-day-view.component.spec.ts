import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineDayViewComponent } from './timeline-day-view.component';

describe('TimelineDayViewComponent', () => {
  let component: TimelineDayViewComponent;
  let fixture: ComponentFixture<TimelineDayViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineDayViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineDayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
