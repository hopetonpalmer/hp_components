import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FontPropertyEditorComponent } from './font-property-editor.component';

describe('FontPropertyEditorComponent', () => {
  let component: FontPropertyEditorComponent;
  let fixture: ComponentFixture<FontPropertyEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FontPropertyEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FontPropertyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
