import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IWidgetData } from './models/widget';

@Injectable()
export class ComposerService {
  private _widgetsBehaviorSubject = new BehaviorSubject<IWidgetData>(null);
  widgets$ = this._widgetsBehaviorSubject.asObservable();

  constructor() {}

  getWidgets(): Observable<IWidgetData> {
    this._widgetsBehaviorSubject.next(null);
    return this._widgetsBehaviorSubject.asObservable();
  }
}
