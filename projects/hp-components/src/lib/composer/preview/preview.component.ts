import { Component, OnInit, Input, AfterViewInit, Renderer2, ElementRef,
   ViewContainerRef, ComponentFactoryResolver, Inject, ViewChild, HostListener, OnDestroy } from '@angular/core';
import { InteractionService } from '../../interaction/interaction.service';
import { PageLoaderService } from '../../services/page-loader.service';
import { PopupRef } from '../../ui/popup/popup-ref';
import { POPUP_DATA } from '../../ui/popup/popup.tokens';
import { requestFullScreen, enableKeyboardInteraction, exitFullScreen, pauseVideos, playVideos } from '../../scripts/dom';
import { DOCUMENT } from '@angular/common';
import { FullscreenService } from '../../services/fullscreen.service';
import { reduce } from 'rxjs/operators';


@Component({
  selector: 'hpc-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
  providers: [ FullscreenService]
})
export class PreviewComponent implements OnInit, AfterViewInit, OnDestroy {

  private _pausedVideos = [];
  private _timeoutToken: any;

  inFullScreen: boolean;
  isCloseVisible = false;

  constructor(
    public popupRef: PopupRef,
    @Inject(POPUP_DATA) public data: any,
    private fullscreenService: FullscreenService,
    private pageLoaderService: PageLoaderService,
    public interactionService: InteractionService,
    private renderer: Renderer2,
    private elRef: ElementRef,
    private cfr: ComponentFactoryResolver,
    private vcRef: ViewContainerRef
  ) {}


  ngOnInit() {}

  ngAfterViewInit() {
    this.goFullScreen();
    this.loadPage();
  }

  loadPage() {
    const dataItems = this.interactionService.getDataItems();
    this.pageLoaderService.loadPage(
      this.elRef.nativeElement,
      this.renderer,
      dataItems,
      this.cfr,
      this.vcRef
    );
  }

  private goFullScreen(): void {
    const element = this.elRef.nativeElement.parentElement;
    this._pausedVideos = pauseVideos(document.body);
    this.inFullScreen = false;
    this.fullscreenService.goFullscreen(element, () => {
      if (this.inFullScreen) {
        this.close();
      }
      this.inFullScreen = true;
     });
  }


  close() {
    playVideos(this._pausedVideos);
    this.popupRef.close();
  }

  @HostListener('document:mousemove')
  mouseMove() {
    if (!this.isCloseVisible) {
      this.isCloseVisible = true;
      this.scheduleCloseRemoval();
    }
  }

  scheduleCloseRemoval() {
    this._timeoutToken = setTimeout(() => {
      this.isCloseVisible = false;
    }, 5000);
  }

  ngOnDestroy(): void {
    clearTimeout(this._timeoutToken);
  }
}
