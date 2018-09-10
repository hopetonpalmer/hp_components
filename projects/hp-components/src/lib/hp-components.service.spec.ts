import { TestBed } from '@angular/core/testing';

import { HpComponentsService } from './hp-components.service';

describe('HpComponentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HpComponentsService = TestBed.get(HpComponentsService);
    expect(service).toBeTruthy();
  });
});
