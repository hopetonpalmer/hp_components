import { Injectable, Injector, ComponentRef } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { PopupComponent } from './popup.component';
import { PopupRef } from './popup-ref';
import { POPUP_DATA } from './popup.tokens';

interface PopupConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
  data?: any;
}

const DEFAULT_CONFIG: PopupConfig = {
  hasBackdrop: true,
  backdropClass: 'cdk-overlay-dark-backdrop',
  panelClass: 'hpc-popup',
  data: {}
};

@Injectable()
export class PopupService {
  constructor(private _injector: Injector, private _overlay: Overlay) {}

  open(config: PopupConfig = {}): PopupRef {
    const popupConfig = { ...DEFAULT_CONFIG, ...config };

    // -- Returns a PortalHost
    const overlayRef = this.createOverlay(popupConfig);

    // -- Instantiate remote control
    const popupRef = new PopupRef(overlayRef);

    const overlayComponent = this.attachDialogContainer(overlayRef, popupConfig, popupRef);

    overlayRef.backdropClick().subscribe(() => popupRef.close());
    return popupRef;
  }

  private getOverlayConfig(config: PopupConfig): OverlayConfig {
    const positionStrategy = this._overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this._overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }

  private createOverlay(config: PopupConfig) {
    const overlayConfig = this.getOverlayConfig(config);
    return this._overlay.create(overlayConfig);
  }

  private createInjector(config: PopupConfig, popupRef: PopupRef): PortalInjector {
    // Instantiate new WeakMap for our custom injection tokens
    const injectionTokens = new WeakMap();

    // Set custom injection tokens
    injectionTokens.set(PopupRef, popupRef);
    injectionTokens.set(POPUP_DATA, config.data);

    // Instantiate new PortalInjector
    return new PortalInjector(this._injector, injectionTokens);
  }

  private attachDialogContainer(overlayRef: OverlayRef, config: PopupConfig, dialogRef: PopupRef) {
    const injector = this.createInjector(config, dialogRef);
    const containerPortal = new ComponentPortal(PopupComponent, null, injector);
    const containerRef: ComponentRef<PopupComponent> = overlayRef.attach(containerPortal);
    return containerRef.instance;
  }
}
