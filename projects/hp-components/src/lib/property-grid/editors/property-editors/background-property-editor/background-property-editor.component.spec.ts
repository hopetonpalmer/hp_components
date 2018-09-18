import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundPropertyEditorComponent } from './background-property-editor.component';

describe('BackgroundPropertyEditorComponent', () => {
  let component: BackgroundPropertyEditorComponent;
  let fixture: ComponentFixture<BackgroundPropertyEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackgroundPropertyEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundPropertyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
