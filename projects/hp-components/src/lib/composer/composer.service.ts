import { Injectable, Type } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IWidgetType, IWidgetTypeGroup } from '../models/widget-type';
import { InteractionService } from '../interaction/interaction.service';
import { PageLoaderService } from '../services/page-loader.service';


@Injectable()
export class ComposerService {
  private _bulkRegistering = false;
  private _widgetsBehaviorSubject = new BehaviorSubject<IWidgetType[]>([]);
  widgets$ = this._widgetsBehaviorSubject.asObservable();

  private _widgetGroupsBehaviorSubject = new BehaviorSubject<IWidgetTypeGroup[]>([]);
  widgetGroups$ = this._widgetGroupsBehaviorSubject.asObservable();

  get registeredWidgets(): IWidgetType[] {
    const result =  this.widgetGroups.reduce((array, group) => [...array, ...group.widgets], [] );
    return result;
  }

  private _widgetGroups: IWidgetTypeGroup[] = [];
  get widgetGroups(): IWidgetTypeGroup[] {
    return this._widgetGroups;
  }

 /*  get widgetsByGroupMap(): Map<string, IWidget[]> {
    const result = this.registeredWidgets.reduce((m, widget) => m.set(widget.group,
       [...(m.get(widget.group) || []), widget]), new Map<string, IWidget[]>());
    return result;
  } */

/*   getWidgetGroups(): IWidgetGroup[] {
    const groupMap = Array.from(this.widgetsByGroupMap);
    const result = groupMap.reduce((a, item) => [...a, { group: item[0], widgets: item[1] }], []);
    return result;
  } */

  constructor(public interactionService: InteractionService, public pageLoaderService: PageLoaderService) {}

  getRegisteredComponentClass(className: string): Type<any> {
    const widgetType = this.registeredWidgets.find(
      x => x.componentClass.name === className
    );
    if (widgetType) {
      return widgetType.componentClass;
    }
    return null;
  }

/*   registerWidgets(widgets: IWidget[]) {
    this._registeredWidgets = widgets;
    this._widgetsBehaviorSubject.next(widgets);
    this._widgetGroupsBehaviorSubject.next(this.getWidgetGroups());
    this.registerComponentTypes();
  } */

  registerWidetGroup(widgetGroup: IWidgetTypeGroup, merge = false) {
     const group = this._widgetGroups.find(x => x.group === widgetGroup.group);
     if (group) {
       if (merge) {
         group.widgets = [...widgetGroup.widgets, ...group.widgets];
       } else  {
         const groupIndex = this._widgetGroups.indexOf(group);
         this._widgetGroups.splice(groupIndex, 1, widgetGroup);
       }
     } else {
       this._widgetGroups.push(widgetGroup);
     }
     if (!this._bulkRegistering) {
       this.registerComponentTypes();
     }
  }

  registerWidgetGroups(widgetGroups: IWidgetTypeGroup[], merge = false) {
    this._bulkRegistering = true;
    if (merge) {
       widgetGroups.forEach(group => {
         this.registerWidetGroup(group, merge);
       });
    } else {
       this._widgetGroups = widgetGroups;
    }
    this._widgetGroupsBehaviorSubject.next(this._widgetGroups);
    this.registerComponentTypes();
    this._bulkRegistering = false;
  }

  private registerComponentTypes() {
    const regWidgets = this.registeredWidgets.map(w => w.componentClass);
    this.interactionService.registerComponentTypes(regWidgets);
    this.pageLoaderService.registerComponentTypes(regWidgets);
  }
}
