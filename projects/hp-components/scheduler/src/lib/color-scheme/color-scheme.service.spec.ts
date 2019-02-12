import { TestBed } from '@angular/core/testing';

import { ColorSchemeService } from './color-scheme.service';

describe('ColorSchemeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ColorSchemeService = TestBed.get(ColorSchemeService);
    expect(service).toBeTruthy();
  });
});
