import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPropertyEditorComponent } from './color-property-editor.component';

describe('ColorPropertyEditorComponent', () => {
  let component: ColorPropertyEditorComponent;
  let fixture: ComponentFixture<ColorPropertyEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorPropertyEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPropertyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
