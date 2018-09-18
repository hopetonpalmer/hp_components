import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlignmentPropertyEditorComponent } from './alignment-property-editor.component';

describe('AlignmentPropertyEditorComponent', () => {
  let component: AlignmentPropertyEditorComponent;
  let fixture: ComponentFixture<AlignmentPropertyEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlignmentPropertyEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlignmentPropertyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
