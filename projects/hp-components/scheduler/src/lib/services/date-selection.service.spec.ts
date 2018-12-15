import { TestBed } from '@angular/core/testing';

import { DateSelectionService } from './date-selection.service';

describe('DateSelectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DateSelectionService = TestBed.get(DateSelectionService);
    expect(service).toBeTruthy();
  });
});
