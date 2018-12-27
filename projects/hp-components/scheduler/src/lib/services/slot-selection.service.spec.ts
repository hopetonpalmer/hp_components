import { TestBed } from '@angular/core/testing';

import { SlotSelectionService } from './slot-selection.service';

describe('DateSelectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SlotSelectionService = TestBed.get(SlotSelectionService);
    expect(service).toBeTruthy();
  });
});
