import { TestBed } from '@angular/core/testing';

import { PropertyInspectorService } from './property-inspector.service';

describe('PropertyInspectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PropertyInspectorService = TestBed.get(PropertyInspectorService);
    expect(service).toBeTruthy();
  });
});
