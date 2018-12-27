import { TestBed } from '@angular/core/testing';

import { SchedulerDateService } from './scheduler-date.service';

describe('SchedulerDateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SchedulerDateService = TestBed.get(SchedulerDateService);
    expect(service).toBeTruthy();
  });
});
