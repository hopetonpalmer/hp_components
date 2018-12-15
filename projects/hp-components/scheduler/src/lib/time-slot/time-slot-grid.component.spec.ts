import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSlotGridComponent } from './time-slot-grid.component';

describe('TimeSlotComponent', () => {
  let component: TimeSlotGridComponent;
  let fixture: ComponentFixture<TimeSlotGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSlotGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSlotGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
