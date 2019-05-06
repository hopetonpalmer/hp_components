import { ISchedulerItem } from './i-scheduler-item';
import { Orientation, IRect } from '@hp-components/common';
import { IEventCell } from '../types';

export interface IDragData {
   schedulerItem: ISchedulerItem;
   startDate: Date;
   endDate: Date;
   orientation: Orientation;
   dropRect: IRect;
   startCell: IEventCell;
   endCell: IEventCell;
   isSizing: boolean;
}
