import { TestBed } from '@angular/core/testing';

import { SchedulerViewService } from './scheduler-view.service';

describe('SchedulerviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SchedulerViewService = TestBed.get(SchedulerViewService);
    expect(service).toBeTruthy();
  });
});
