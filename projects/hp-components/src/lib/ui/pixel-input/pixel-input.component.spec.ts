import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PixelInputComponent } from './pixel-input.component';

describe('PixelInputComponent', () => {
  let component: PixelInputComponent;
  let fixture: ComponentFixture<PixelInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PixelInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PixelInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
