import { TestBed } from '@angular/core/testing';

import { SchedulerService } from './scheduler.service';

describe('HpSchedulerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SchedulerService = TestBed.get(SchedulerService);
    expect(service).toBeTruthy();
  });
});
