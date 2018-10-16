import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostedAppComponent } from './hosted-app.component';

describe('HostedAppComponent', () => {
  let component: HostedAppComponent;
  let fixture: ComponentFixture<HostedAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostedAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostedAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
