import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IWidget, IWidgetType } from './models/widget';
import { map } from 'rxjs/operators';

@Injectable()
export class ComposerService {
  private _widgetsBehaviorSubject = new BehaviorSubject<IWidget>(null);
  widgets$ = this._widgetsBehaviorSubject.asObservable();

  private _widgetTypesBehaviorSubject = new BehaviorSubject<IWidgetType[]>([]);
  widgetTypes$ = this._widgetTypesBehaviorSubject.asObservable();

  get widgetTypes(): IWidgetType[] {
    const result = [];
    this.widgetTypes$.forEach(t => result.push(t));  // .pipe(map(widgetTypes => widgetTypes))
    return result;
  }

  constructor() {}

  getWidgets(): Observable<IWidget> {
    this._widgetsBehaviorSubject.next(null);
    return this._widgetsBehaviorSubject.asObservable();
  }

  registerWidgetTypes(widgetTypes: IWidgetType[]) {
     this._widgetTypesBehaviorSubject.next(widgetTypes);
  }

  registerWidgetType(widgetType: IWidgetType) {
    this._widgetTypesBehaviorSubject.next(Object.assign([widgetType], this.widgetTypes));
  }

}
