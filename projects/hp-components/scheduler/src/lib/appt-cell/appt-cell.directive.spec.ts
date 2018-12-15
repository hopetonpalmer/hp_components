import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApptCellDirective } from './appt-cell.directive';

describe('ApptCellComponent', () => {
  let component: ApptCellDirective;
  let fixture: ComponentFixture<ApptCellDirective>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApptCellDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApptCellDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
