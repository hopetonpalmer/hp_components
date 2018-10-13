import { Injectable, Type } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IWidget } from '../models/widget';
import { InteractionService } from '../interaction/interaction.service';

export interface IWidgetGroup {
  group: string;
  widgets: IWidget[];
}

@Injectable()
export class ComposerService {
  private _widgetsBehaviorSubject = new BehaviorSubject<IWidget[]>([]);
  widgets$ = this._widgetsBehaviorSubject.asObservable();

  private _widgetGroupsBehaviorSubject = new BehaviorSubject<IWidgetGroup[]>([]);
  widgetGroups$ = this._widgetGroupsBehaviorSubject.asObservable();

  private _registeredWidgets: IWidget[] = [];
  get registeredWidgets(): IWidget[] {
    return this._registeredWidgets;
  }

  get widgetsByGroupMap(): Map<string, IWidget[]> {
    const result = this.registeredWidgets.reduce((m, widget) => m.set(widget.group,
       [...(m.get(widget.group) || []), widget]), new Map<string, IWidget[]>());
    return result;
  }

  getWidgetGroups(): IWidgetGroup[] {
    const groupMap = Array.from(this.widgetsByGroupMap);
    const result = groupMap.reduce((a, item) => [...a, { group: item[0], widgets: item[1] }], []);
    return result;
  }

  constructor(public interactionService: InteractionService) {}

  getRegisteredComponentClass(className: string): Type<any> {
    const widgetType = this.registeredWidgets.find(
      x => x.componentClass.name === className
    );
    if (widgetType) {
      return widgetType.componentClass;
    }
    return null;
  }

  registerWidgets(widgets: IWidget[]) {
    this._registeredWidgets = widgets;
    this._widgetsBehaviorSubject.next(widgets);
    this._widgetGroupsBehaviorSubject.next(this.getWidgetGroups());
    this.registerComponentTypes();
  }

  private registerComponentTypes() {
    this.interactionService.registerComponentTypes(this.registeredWidgets.map(w => w.componentClass));
  }
}
