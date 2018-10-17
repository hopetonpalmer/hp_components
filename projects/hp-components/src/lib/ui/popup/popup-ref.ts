import { OverlayRef } from '@angular/cdk/overlay';

export class PopupRef {
  constructor(private overlayRef: OverlayRef) {}

  close(): void {
    this.overlayRef.dispose();
  }
}
