import { Injectable, Type } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IWidgetType, IWidgetTypeGroup } from '../models/widget-type';
import { InteractionService } from '../interaction/interaction.service';
import { PageLoaderService } from '../services/page-loader.service';


@Injectable({
  providedIn: 'root'
})
export class ComposerService {
  private _bulkRegistering = false;
  private _widgetsBehaviorSubject = new BehaviorSubject<IWidgetType[]>([]);
  widgets$ = this._widgetsBehaviorSubject.asObservable();

  private _widgetGroupsBehaviorSubject = new BehaviorSubject<IWidgetTypeGroup[]>([]);
  widgetGroups$ = this._widgetGroupsBehaviorSubject.asObservable();

  get registeredWidgets(): IWidgetType[] {
    const result = this.widgetGroups.reduce(
      (array, group) => [...array, ...group.widgets], []);
    return result;
  }

  private _widgetGroups: IWidgetTypeGroup[] = [];
  get widgetGroups(): IWidgetTypeGroup[] {
    return this._widgetGroups;
  }

  constructor(
    public interactionService: InteractionService,
    public pageLoaderService: PageLoaderService
  ) {}

  getRegisteredComponentClass(className: string): Type<any> {
    const widgetType = this.registeredWidgets.find(
      x => x.componentClass.name === className
    );
    if (widgetType) {
      return widgetType.componentClass;
    }
    return null;
  }

  registerWidetGroup(widgetGroup: IWidgetTypeGroup, merge = false) {
    const group = this._widgetGroups.find(x => x.group === widgetGroup.group);
    if (group) {
      if (merge) {
        group.widgets = [...widgetGroup.widgets, ...group.widgets.filter(w => !group.widgets.includes(w))];
      } else {
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
    try {
      if (merge) {
        widgetGroups.forEach(group => {
          this.registerWidetGroup(group, merge);
        });
      } else {
        this._widgetGroups = widgetGroups;
      }
      this._widgetGroupsBehaviorSubject.next(this._widgetGroups);
      this.registerComponentTypes();
    } finally {
      this._bulkRegistering = false;
    }
  }

  private registerComponentTypes() {
    const regWidgets = this.registeredWidgets.map(w => w.componentClass);
    this.interactionService.registerComponentTypes(regWidgets);
    this.pageLoaderService.registerComponentTypes(regWidgets);
  }
}
