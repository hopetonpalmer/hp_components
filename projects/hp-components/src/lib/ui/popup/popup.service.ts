import { Injectable, Injector, ComponentRef, Type } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { PopupComponent } from './popup.component';
import { PopupRef } from './popup-ref';
import { POPUP_DATA } from './popup.tokens';

interface PopupConfig {
  hasBackdrop?: boolean;
  backdropClass?: string;
  data?: any;
}

const DEFAULT_CONFIG: PopupConfig = {
  hasBackdrop: true,
  backdropClass: 'cdk-overlay-dark-backdrop',
  data: {},
};

@Injectable()
export class PopupService {
  constructor(private _injector: Injector, private _overlay: Overlay) {}

  open(componentClass: Type<any> = PopupComponent, config: PopupConfig = {}): PopupRef {
    const popupConfig = { ...DEFAULT_CONFIG, ...config };

    // -- Returns a PortalHost
    const overlayRef = this.createOverlay(componentClass, popupConfig);

    // -- Instantiate remote control
    const popupRef = new PopupRef(overlayRef);

    this.attachDialogContainer(componentClass, overlayRef, popupConfig, popupRef);

    overlayRef.backdropClick().subscribe(() => popupRef.close());
    return popupRef;
  }

  private getOverlayConfig(componentClass: Type<any>, config: PopupConfig): OverlayConfig {
    const positionStrategy = this._overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: componentClass.name,
      scrollStrategy: this._overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }

  private createOverlay(componentClass: Type<any>, config: PopupConfig) {
    const overlayConfig = this.getOverlayConfig(componentClass, config);
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

  private attachDialogContainer(componentClass: Type<any>, overlayRef: OverlayRef, config: PopupConfig, dialogRef: PopupRef) {
    const injector = this.createInjector(config, dialogRef);
    const containerPortal = new ComponentPortal(componentClass, null, injector);
    const containerRef = overlayRef.attach(containerPortal);
    return containerRef.instance;
  }
}
