import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorComboBoxComponent } from './color-combo-box.component';

describe('ColorComboBoxComponent', () => {
  let component: ColorComboBoxComponent;
  let fixture: ComponentFixture<ColorComboBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorComboBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorComboBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
