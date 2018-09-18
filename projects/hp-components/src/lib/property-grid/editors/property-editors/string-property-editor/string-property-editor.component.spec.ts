import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StringPropertyEditorComponent } from './string-property-editor.component';

describe('StringPropertyEditorComponent', () => {
  let component: StringPropertyEditorComponent;
  let fixture: ComponentFixture<StringPropertyEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StringPropertyEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StringPropertyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
