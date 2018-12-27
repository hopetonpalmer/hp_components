import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkWeekViewComponent } from './work-week-view.component';

describe('WorkWeekViewComponent', () => {
  let component: WorkWeekViewComponent;
  let fixture: ComponentFixture<WorkWeekViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkWeekViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkWeekViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
