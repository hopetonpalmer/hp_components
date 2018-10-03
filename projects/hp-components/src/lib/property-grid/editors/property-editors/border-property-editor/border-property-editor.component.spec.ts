import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorderPropertyEditorComponent } from './border-property-editor.component';

describe('BorderPropertyEditorComponent', () => {
  let component: BorderPropertyEditorComponent;
  let fixture: ComponentFixture<BorderPropertyEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorderPropertyEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorderPropertyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
