import { ISchedulerItem } from './i-scheduler-item';
import { Orientation, IRect } from '@hp-components/common';

export interface IDragData {
   schedulerItem: ISchedulerItem;
   startDate: Date;
   endDate: Date;
   orientation: Orientation;
   dropRect: IRect;
   isSizing: boolean;
}
