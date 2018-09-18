/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
export class ComposerComponent {
    constructor() {
        this.headerVisible = true;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
ComposerComponent.decorators = [
    { type: Component, args: [{
                selector: 'hpc-composer',
                template: "<div class=\"composer_container\">\n    <div *ngIf=\"headerVisible\" class=\"header-row\">\n       <ng-content select=\"[header]\"></ng-content>\n    </div>\n    <div class= \"body-row\">\n      <div class=\"composer_container-widgets\">\n          <ng-content select=\"[widgets]\"></ng-content>\n      </div>\n      <div class=\"composer-main-container\">\n        <div class=\"composer-menu-container\">\n           <ng-content select=\"[menu]\"></ng-content>\n        </div>\n        <hpc-interaction [isCheckersBackground]=true [isLassoSelectable]=true [scale]=0.65>\n          <!-- sample elements - will remove in production version  -->\n          <div class=\"hpc-dropzone\" style=\"position: absolute; top: 400px; left: 100px; height: 200px; width:400px; background: orangered\">\n            <div style=\"position: absolute; top: 10px; left: 10px; height: 180px; width:200px; background: yellow\">\n              <div class=\"hpc-dropzone\" style=\"position: absolute; top: 10px; left: 10px; height: 100px; width:100px; background: rgb(0, 255, 0)\"></div>\n            </div>\n          </div>\n          <div class=\"hpc-no-drag hpc-no-size\" style=\"position: absolute; left: 600px; top: 100px; height: 600px; width:500px; background: rgb(15, 94, 88)\"></div>\n          <!-- end sample elements -->\n        </hpc-interaction>\n      </div>\n      <div class=\"composer_container-properties\"></div>\n    </div>\n</div>\n\n",
                styles: [":host /deep/ .interaction-container{height:1080px;width:1920px;-webkit-transform-origin:left top;transform-origin:left top;margin-left:33px;margin-top:2%}.composer_container{display:flex;flex-direction:column;overflow:hidden}.composer_container>*{--container-background:rgb(35, 36, 35);--container-header:rgb(63, 63, 63);--container-header-color:rgb(29, 202, 38);--container-main:rgb(63, 63, 63)}.composer_container-widgets{display:flex;flex-direction:column;width:300px;background-color:var(--container-background)}.composer_container-properties{width:300px;background-color:var(--container-background)}.composer-main-container{overflow:auto;background-color:var(--container-main);height:100%;display:flex;flex-direction:column;flex:1}.composer-menu-container{color:#fff;padding:10px;min-height:75px;width:100%}.header-row{display:flex;flex-wrap:wrap;height:75px;background:gray}.body-row{display:flex;height:100%;width:100%}"]
            }] }
];
/** @nocollapse */
ComposerComponent.ctorParameters = () => [];
ComposerComponent.propDecorators = {
    headerVisible: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    ComposerComponent.prototype.headerVisible;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9zZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaHAtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb3Nlci9jb21wb3Nlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBT3pELE1BQU07SUFHSjs2QkFEeUIsSUFBSTtLQUNaOzs7O0lBRWpCLFFBQVE7S0FDUDs7O1lBWEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4Qix3NkNBQXdDOzthQUV6Qzs7Ozs7NEJBR0UsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdocGMtY29tcG9zZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vY29tcG9zZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jb21wb3Nlci5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ29tcG9zZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGhlYWRlclZpc2libGUgPSB0cnVlO1xuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiJdfQ==