/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
var ComposerComponent = /** @class */ (function () {
    function ComposerComponent() {
        this.headerVisible = true;
    }
    /**
     * @return {?}
     */
    ComposerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    ComposerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'hpc-composer',
                    template: "<div class=\"composer_container\">\n    <div *ngIf=\"headerVisible\" class=\"header-row\">\n       <ng-content select=\"[header]\"></ng-content>\n    </div>\n    <div class= \"body-row\">\n      <div class=\"composer_container-widgets\">\n          <ng-content select=\"[widgets]\"></ng-content>\n      </div>\n      <div class=\"composer-main-container\">\n        <div class=\"composer-menu-container\">\n           <ng-content select=\"[menu]\"></ng-content>\n        </div>\n        <hpc-interaction [isCheckersBackground]=true [isLassoSelectable]=true [scale]=0.65>\n          <!-- sample elements - will remove in production version  -->\n          <div class=\"hpc-dropzone\" style=\"position: absolute; top: 400px; left: 100px; height: 200px; width:400px; background: orangered\">\n            <div style=\"position: absolute; top: 10px; left: 10px; height: 180px; width:200px; background: yellow\">\n              <div class=\"hpc-dropzone\" style=\"position: absolute; top: 10px; left: 10px; height: 100px; width:100px; background: rgb(0, 255, 0)\"></div>\n            </div>\n          </div>\n          <div class=\"hpc-no-drag hpc-no-size\" style=\"position: absolute; left: 600px; top: 100px; height: 600px; width:500px; background: rgb(15, 94, 88)\"></div>\n          <!-- end sample elements -->\n        </hpc-interaction>\n      </div>\n      <div class=\"composer_container-properties\"></div>\n    </div>\n</div>\n\n",
                    styles: [":host /deep/ .interaction-container{height:1080px;width:1920px;-webkit-transform-origin:left top;transform-origin:left top;margin-left:33px;margin-top:2%}.composer_container{display:flex;flex-direction:column;overflow:hidden}.composer_container>*{--container-background:rgb(35, 36, 35);--container-header:rgb(63, 63, 63);--container-header-color:rgb(29, 202, 38);--container-main:rgb(63, 63, 63)}.composer_container-widgets{display:flex;flex-direction:column;width:300px;background-color:var(--container-background)}.composer_container-properties{width:300px;background-color:var(--container-background)}.composer-main-container{overflow:auto;background-color:var(--container-main);height:100%;display:flex;flex-direction:column;flex:1}.composer-menu-container{color:#fff;padding:10px;min-height:75px;width:100%}.header-row{display:flex;flex-wrap:wrap;height:75px;background:gray}.body-row{display:flex;height:100%;width:100%}"]
                }] }
    ];
    /** @nocollapse */
    ComposerComponent.ctorParameters = function () { return []; };
    ComposerComponent.propDecorators = {
        headerVisible: [{ type: Input }]
    };
    return ComposerComponent;
}());
export { ComposerComponent };
if (false) {
    /** @type {?} */
    ComposerComponent.prototype.headerVisible;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9zZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaHAtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb3Nlci9jb21wb3Nlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOztJQVV2RDs2QkFEeUIsSUFBSTtLQUNaOzs7O0lBRWpCLG9DQUFROzs7SUFBUjtLQUNDOztnQkFYRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLHc2Q0FBd0M7O2lCQUV6Qzs7Ozs7Z0NBR0UsS0FBSzs7NEJBVFI7O1NBT2EsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2hwYy1jb21wb3NlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9jb21wb3Nlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NvbXBvc2VyLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDb21wb3NlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgaGVhZGVyVmlzaWJsZSA9IHRydWU7XG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIl19