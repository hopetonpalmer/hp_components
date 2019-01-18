import { SchedulerResource } from '../models/schedulerResource';
import { addHours, isSameDay, differenceInCalendarDays } from 'date-fns';
import { ISchedulerItem } from '../interfaces/i-scheduler-item';
import { DateRange } from '../types';

export type BusyStatus = 'Busy' | 'Free' | 'OutOfOffice' | 'Tentative';
export type Importance = 'High' | 'Low' | 'Normal';
export type RecurrenceState = 'Exception' | 'Master' | 'NotRecurring' | 'Occurrence';

export class EventItem implements ISchedulerItem {
  id: string;
  description?: string;
  creationDate = new Date();
  isAllDay: boolean;
  importance: Importance = 'Low';
  busyStatus: BusyStatus = 'Free';
  reminderMinutesBeforeStart = 15;
  conflicts: EventItem[];
  resources: SchedulerResource[];
  recurrenceState: RecurrenceState = 'NotRecurring';
  isReminderSet: boolean;
  isFixedDate: boolean;
  get isMultiDay(): boolean {
    return differenceInCalendarDays(this.end, this.start) > 0;
  }
  get isRecurring(): boolean {
     return this.recurrenceState !== 'NotRecurring';
  }
  get isConflict(): boolean {
    return this.conflicts && this.conflicts.indexOf(this) > -1;
  }
  get dateRange(): DateRange {
    return {start: this.start, end: this.end};
  }
  constructor(public start = new Date(), public end = addHours(new Date(), 1), public subject = 'New Appointment', public color = 'gray') {

  }
}
