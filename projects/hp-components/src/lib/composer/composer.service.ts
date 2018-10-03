import { Injectable, Type } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IWidget, IWidgetType } from './models/widget';
import { map } from 'rxjs/operators';
import { InteractionService } from '../interaction/interaction.service';


@Injectable()
export class ComposerService {
  private _widgetsBehaviorSubject = new BehaviorSubject<IWidget>(null);
  widgets$ = this._widgetsBehaviorSubject.asObservable();

  private _widgetTypesBehaviorSubject = new BehaviorSubject<IWidgetType[]>([]);
  widgetTypes$ = this._widgetTypesBehaviorSubject.asObservable();

  get registeredWidgetTypes(): IWidgetType[] {
    const result = [];
    this.widgetTypes$.forEach(t => result.push(t)); // .pipe(map(widgetTypes => widgetTypes))
    return result;
  }

  constructor(public interactionService: InteractionService) {}

  getRegisteredComponentClass(className: string): Type<any> {
    const widgetType = this.registeredWidgetTypes.find(
      x => x.componentClassName === className
    );
    if (widgetType) {
      return widgetType.componentClass;
    }
    return null;
  }

  getWidgets(): Observable<IWidget> {
    this._widgetsBehaviorSubject.next(null);
    return this._widgetsBehaviorSubject.asObservable();
  }

  registerWidgetTypes(widgetTypes: IWidgetType[]) {
    this._widgetTypesBehaviorSubject.next(widgetTypes);
  }

  registerWidgetType(widgetType: IWidgetType) {
    this._widgetTypesBehaviorSubject.next(
      Object.assign([widgetType], this.registeredWidgetTypes)
    );
  }
}
