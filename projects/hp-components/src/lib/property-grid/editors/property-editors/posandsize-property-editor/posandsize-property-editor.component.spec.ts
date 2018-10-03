import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosandsizePropertyEditorComponent } from './posandsize-property-editor.component';

describe('PosandsizePropertyEditorComponent', () => {
  let component: PosandsizePropertyEditorComponent;
  let fixture: ComponentFixture<PosandsizePropertyEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosandsizePropertyEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosandsizePropertyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
