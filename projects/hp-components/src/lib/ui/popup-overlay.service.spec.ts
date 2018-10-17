import { TestBed } from '@angular/core/testing';

import { PopupOverlayService } from './popup-overlay.service';

describe('PopupOverlayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PopupOverlayService = TestBed.get(PopupOverlayService);
    expect(service).toBeTruthy();
  });
});
