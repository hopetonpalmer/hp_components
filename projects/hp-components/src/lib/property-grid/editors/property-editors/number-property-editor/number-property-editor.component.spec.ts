import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberPropertyEditorComponent } from './number-property-editor.component';

describe('NumberPropertyEditorComponent', () => {
  let component: NumberPropertyEditorComponent;
  let fixture: ComponentFixture<NumberPropertyEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberPropertyEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberPropertyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
