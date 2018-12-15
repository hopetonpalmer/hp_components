import { ITimedItem } from './i-timed-item';
import { Importance, BusyStatus, SchedulerResource, RecurrenceState } from '../models';
import { ISchedulerResource } from './i-scheduler-resource';

export interface ISchedulerItem extends ITimedItem {
  subject: string;
  description?: string;
  creationDate: Date;
  isAllDay: boolean;
  importance: Importance;
  busyStatus: BusyStatus;
  reminderMinutesBeforeStart: number;
  conflicts: ISchedulerItem[];
  resources: ISchedulerResource[];
  recurrenceState: RecurrenceState;
  isReminderSet: boolean;
  isRecurring: boolean;
  isConflict: boolean;
}

