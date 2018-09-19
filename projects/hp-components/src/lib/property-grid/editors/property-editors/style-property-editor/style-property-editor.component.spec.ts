import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StylePropertyEditorComponent } from './style-property-editor.component';

describe('StylePropertyEditorComponent', () => {
  let component: StylePropertyEditorComponent;
  let fixture: ComponentFixture<StylePropertyEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StylePropertyEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StylePropertyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
