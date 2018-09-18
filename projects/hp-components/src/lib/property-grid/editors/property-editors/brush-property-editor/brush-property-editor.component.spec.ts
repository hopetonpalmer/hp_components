import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrushPropertyEditorComponent } from './brush-property-editor.component';

describe('BrushPropertyEditorComponent', () => {
  let component: BrushPropertyEditorComponent;
  let fixture: ComponentFixture<BrushPropertyEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrushPropertyEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrushPropertyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
