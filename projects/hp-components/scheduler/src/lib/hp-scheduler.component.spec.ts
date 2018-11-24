import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HpSchedulerComponent } from './hp-scheduler.component';

describe('HpSchedulerComponent', () => {
  let component: HpSchedulerComponent;
  let fixture: ComponentFixture<HpSchedulerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HpSchedulerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HpSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
