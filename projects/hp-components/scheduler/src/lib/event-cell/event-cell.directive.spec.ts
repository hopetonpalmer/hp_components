import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCellDirective } from './event-cell.directive';

describe('ApptCellComponent', () => {
  let component: EventCellDirective;
  let fixture: ComponentFixture<EventCellDirective>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCellDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCellDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
