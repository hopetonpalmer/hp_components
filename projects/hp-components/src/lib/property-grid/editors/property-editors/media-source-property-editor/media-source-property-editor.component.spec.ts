import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaSourcePropertyEditorComponent } from './media-source-property-editor.component';

describe('MediaSourcePropertyEditorComponent', () => {
  let component: MediaSourcePropertyEditorComponent;
  let fixture: ComponentFixture<MediaSourcePropertyEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaSourcePropertyEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaSourcePropertyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
