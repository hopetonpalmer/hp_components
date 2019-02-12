import { NgModule, ComponentFactoryResolver, Injector, ApplicationRef, Inject } from '@angular/core';
import { ThemeComponent } from './theme/theme.component';
import { DomPortalHost, ComponentPortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';

@NgModule({
  imports: [],
  declarations: [ThemeComponent],
  exports: [ThemeComponent],
  entryComponents: [ThemeComponent]
})
export class HpCommonModule {
  constructor(
    @Inject(DOCUMENT) document: any,
     cfr: ComponentFactoryResolver,
     injector: Injector,
     appRef: ApplicationRef ) {
      if (!document.body.querySelector('hp-theme')) {
        const portalHost = new DomPortalHost(document.body, cfr, appRef, injector);
        const portal = new ComponentPortal(ThemeComponent);
        portalHost.attach(portal);
      }
  }
}
