import { SchedulerResource } from './schedulerResource';
import { addHours } from 'date-fns';

export type BusyStatus = 'Busy' | 'Free' | 'OutOfOffice' | 'Tentative';
export type Importance = 'High' | 'Low' | 'Normal';
export type RecurrenceState = 'Exception' | 'Master' | 'NotRecurring' | 'Occurrence';

export class Appointment {
  id: string;
  description?: string;
  creationTime = new Date();
  isAllDay: boolean;
  importance: Importance = 'Low';
  busyStatus: BusyStatus = 'Free';
  reminderMinutesBeforeStart = 15;
  conflicts: Appointment[];
  resources: SchedulerResource[];
  recurrenceState: RecurrenceState = 'NotRecurring';
  isReminderSet: boolean;

  get isRecurring(): boolean {
     return this.recurrenceState !== 'NotRecurring';
  }
  get isConflict(): boolean {
    return this.conflicts && this.conflicts.indexOf(this) > -1;
  }
  constructor(public start = new Date(), public end = addHours(new Date(), 1), public subject = 'New Appointment') {}
}
