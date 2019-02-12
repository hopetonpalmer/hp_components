import { ITimedItem } from './i-timed-item';
import { ISchedulerResource } from './i-scheduler-resource';
import { Importance, BusyStatus, RecurrenceState } from '../event-item/event-item';
import { DateRange } from 'hp-components/scheduler/lib/types';

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
  isMultiDay: boolean;
  isFixedDate: boolean;
  durationMinutes: number;
  dateRange: DateRange;
}

