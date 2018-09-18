/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { InteractionComponent } from './interaction/interaction.component';
import { ComposerComponent } from './composer/composer.component';
import { TreeviewComponent } from './treeview/treeview.component';
import { TreeviewItemComponent } from './treeview/treeview-item/treeview-item.component';
import { SelectorComponent } from './selector/selector.component';
import { CommonModule } from '@angular/common';
import { DragService } from './services/drag.service';
import { SizeService } from './services/size.service';
import { InteractionService } from './interaction/interaction.service';
import { SelectorService } from './selector/selector.service';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { PropertyGridComponent } from './property-grid/property-grid.component';
var HpComponentsModule = /** @class */ (function () {
    function HpComponentsModule() {
    }
    HpComponentsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [
                        InteractionComponent,
                        ComposerComponent,
                        TreeviewComponent,
                        TreeviewItemComponent,
                        SelectorComponent,
                        FileManagerComponent,
                        PropertyGridComponent
                    ],
                    exports: [
                        InteractionComponent,
                        ComposerComponent,
                        TreeviewComponent
                    ],
                    providers: [
                        DragService,
                        SizeService,
                        InteractionService,
                        SelectorService
                    ]
                },] }
    ];
    return HpComponentsModule;
}());
export { HpComponentsModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHAtY29tcG9uZW50cy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9ocC1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsibGliL2hwLWNvbXBvbmVudHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDcEQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3BELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQ3JFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQzs7Ozs7Z0JBRS9FLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTtxQkFDYjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osb0JBQW9CO3dCQUNwQixpQkFBaUI7d0JBQ2pCLGlCQUFpQjt3QkFDakIscUJBQXFCO3dCQUNyQixpQkFBaUI7d0JBQ2pCLG9CQUFvQjt3QkFDcEIscUJBQXFCO3FCQUN0QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1Asb0JBQW9CO3dCQUNwQixpQkFBaUI7d0JBQ2pCLGlCQUFpQjtxQkFDbEI7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULFdBQVc7d0JBQ1gsV0FBVzt3QkFDWCxrQkFBa0I7d0JBQ2xCLGVBQWU7cUJBQ2hCO2lCQUNGOzs2QkF0Q0Q7O1NBdUNhLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJbnRlcmFjdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vaW50ZXJhY3Rpb24vaW50ZXJhY3Rpb24uY29tcG9uZW50JztcbmltcG9ydCB7IENvbXBvc2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb3Nlci9jb21wb3Nlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJlZXZpZXdDb21wb25lbnQgfSBmcm9tICcuL3RyZWV2aWV3L3RyZWV2aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmVldmlld0l0ZW1Db21wb25lbnQgfSBmcm9tICcuL3RyZWV2aWV3L3RyZWV2aWV3LWl0ZW0vdHJlZXZpZXctaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VsZWN0b3JDb21wb25lbnQgfSBmcm9tICcuL3NlbGVjdG9yL3NlbGVjdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7RHJhZ1NlcnZpY2V9IGZyb20gJy4vc2VydmljZXMvZHJhZy5zZXJ2aWNlJztcbmltcG9ydCB7U2l6ZVNlcnZpY2V9IGZyb20gJy4vc2VydmljZXMvc2l6ZS5zZXJ2aWNlJztcbmltcG9ydCB7SW50ZXJhY3Rpb25TZXJ2aWNlfSBmcm9tICcuL2ludGVyYWN0aW9uL2ludGVyYWN0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHtTZWxlY3RvclNlcnZpY2V9IGZyb20gJy4vc2VsZWN0b3Ivc2VsZWN0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBGaWxlTWFuYWdlckNvbXBvbmVudCB9IGZyb20gJy4vZmlsZS1tYW5hZ2VyL2ZpbGUtbWFuYWdlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUHJvcGVydHlHcmlkQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9wZXJ0eS1ncmlkL3Byb3BlcnR5LWdyaWQuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBJbnRlcmFjdGlvbkNvbXBvbmVudCxcbiAgICBDb21wb3NlckNvbXBvbmVudCxcbiAgICBUcmVldmlld0NvbXBvbmVudCxcbiAgICBUcmVldmlld0l0ZW1Db21wb25lbnQsXG4gICAgU2VsZWN0b3JDb21wb25lbnQsXG4gICAgRmlsZU1hbmFnZXJDb21wb25lbnQsXG4gICAgUHJvcGVydHlHcmlkQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBJbnRlcmFjdGlvbkNvbXBvbmVudCxcbiAgICBDb21wb3NlckNvbXBvbmVudCxcbiAgICBUcmVldmlld0NvbXBvbmVudFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBEcmFnU2VydmljZSxcbiAgICBTaXplU2VydmljZSxcbiAgICBJbnRlcmFjdGlvblNlcnZpY2UsXG4gICAgU2VsZWN0b3JTZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgSHBDb21wb25lbnRzTW9kdWxlIHsgfVxuIl19