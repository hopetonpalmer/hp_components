import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShadowPropertyEditorComponent } from './shadow-property-editor.component';

describe('ShadowPropertyEditorComponent', () => {
  let component: ShadowPropertyEditorComponent;
  let fixture: ComponentFixture<ShadowPropertyEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShadowPropertyEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShadowPropertyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
