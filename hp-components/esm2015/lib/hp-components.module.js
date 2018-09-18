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
export class HpComponentsModule {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHAtY29tcG9uZW50cy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9ocC1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsibGliL2hwLWNvbXBvbmVudHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDcEQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3BELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQ3JFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQTJCaEYsTUFBTTs7O1lBekJMLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtpQkFDYjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osb0JBQW9CO29CQUNwQixpQkFBaUI7b0JBQ2pCLGlCQUFpQjtvQkFDakIscUJBQXFCO29CQUNyQixpQkFBaUI7b0JBQ2pCLG9CQUFvQjtvQkFDcEIscUJBQXFCO2lCQUN0QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1Asb0JBQW9CO29CQUNwQixpQkFBaUI7b0JBQ2pCLGlCQUFpQjtpQkFDbEI7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULFdBQVc7b0JBQ1gsV0FBVztvQkFDWCxrQkFBa0I7b0JBQ2xCLGVBQWU7aUJBQ2hCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSW50ZXJhY3Rpb25Db21wb25lbnQgfSBmcm9tICcuL2ludGVyYWN0aW9uL2ludGVyYWN0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb21wb3NlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9zZXIvY29tcG9zZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFRyZWV2aWV3Q29tcG9uZW50IH0gZnJvbSAnLi90cmVldmlldy90cmVldmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJlZXZpZXdJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi90cmVldmlldy90cmVldmlldy1pdGVtL3RyZWV2aWV3LWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IFNlbGVjdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9zZWxlY3Rvci9zZWxlY3Rvci5jb21wb25lbnQnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0RyYWdTZXJ2aWNlfSBmcm9tICcuL3NlcnZpY2VzL2RyYWcuc2VydmljZSc7XG5pbXBvcnQge1NpemVTZXJ2aWNlfSBmcm9tICcuL3NlcnZpY2VzL3NpemUuc2VydmljZSc7XG5pbXBvcnQge0ludGVyYWN0aW9uU2VydmljZX0gZnJvbSAnLi9pbnRlcmFjdGlvbi9pbnRlcmFjdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7U2VsZWN0b3JTZXJ2aWNlfSBmcm9tICcuL3NlbGVjdG9yL3NlbGVjdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmlsZU1hbmFnZXJDb21wb25lbnQgfSBmcm9tICcuL2ZpbGUtbWFuYWdlci9maWxlLW1hbmFnZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFByb3BlcnR5R3JpZENvbXBvbmVudCB9IGZyb20gJy4vcHJvcGVydHktZ3JpZC9wcm9wZXJ0eS1ncmlkLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgSW50ZXJhY3Rpb25Db21wb25lbnQsXG4gICAgQ29tcG9zZXJDb21wb25lbnQsXG4gICAgVHJlZXZpZXdDb21wb25lbnQsXG4gICAgVHJlZXZpZXdJdGVtQ29tcG9uZW50LFxuICAgIFNlbGVjdG9yQ29tcG9uZW50LFxuICAgIEZpbGVNYW5hZ2VyQ29tcG9uZW50LFxuICAgIFByb3BlcnR5R3JpZENvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgSW50ZXJhY3Rpb25Db21wb25lbnQsXG4gICAgQ29tcG9zZXJDb21wb25lbnQsXG4gICAgVHJlZXZpZXdDb21wb25lbnRcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgRHJhZ1NlcnZpY2UsXG4gICAgU2l6ZVNlcnZpY2UsXG4gICAgSW50ZXJhY3Rpb25TZXJ2aWNlLFxuICAgIFNlbGVjdG9yU2VydmljZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEhwQ29tcG9uZW50c01vZHVsZSB7IH1cbiJdfQ==