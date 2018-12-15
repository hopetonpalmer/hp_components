export type SchedulerViewType = 'Day' | 'Week' | 'WorkWeek' | 'Month' | 'Agenda' | 'Timeline';
export type DayViewType = 'Day' | 'Week' | 'WorkWeek' | 'Custom';
export type IntervalType = 'Year' | 'Quarter' | 'Month' | 'Week' | 'Day' | 'Hour' | 'Minute';
export type MinuteInterval = 1 | 2 | 3 | 4 | 5 | 6 | 10 | 15 | 20 | 30 | 60 ;
export interface DateRange {start: Date; end: Date; }
export interface DayTimeRange { dayStarts: number | string; dayEnds: number | string; }
