import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanPropertyEditorComponent } from './boolean-property-editor.component';

describe('BooleanPropertyEditorComponent', () => {
  let component: BooleanPropertyEditorComponent;
  let fixture: ComponentFixture<BooleanPropertyEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooleanPropertyEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooleanPropertyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
