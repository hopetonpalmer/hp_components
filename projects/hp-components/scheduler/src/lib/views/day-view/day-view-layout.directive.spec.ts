import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DayViewLayoutService } from './day-view-layout.service';



describe('DayViewLayoutDirective', () => {
  let component: DayViewLayoutService;
  let fixture: ComponentFixture<DayViewLayoutService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DayViewLayoutService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayViewLayoutService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

