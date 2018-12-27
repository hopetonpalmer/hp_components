import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineMonthViewComponent } from './timeline-month-view.component';

describe('TimelineMonthViewComponent', () => {
  let component: TimelineMonthViewComponent;
  let fixture: ComponentFixture<TimelineMonthViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineMonthViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineMonthViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
