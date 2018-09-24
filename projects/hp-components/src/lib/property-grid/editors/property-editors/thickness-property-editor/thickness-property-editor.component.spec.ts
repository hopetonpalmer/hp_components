import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThicknessPropertyEditorComponent } from './thickness-property-editor.component';

describe('ThicknessPropertyEditorComponent', () => {
  let component: ThicknessPropertyEditorComponent;
  let fixture: ComponentFixture<ThicknessPropertyEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThicknessPropertyEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThicknessPropertyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
