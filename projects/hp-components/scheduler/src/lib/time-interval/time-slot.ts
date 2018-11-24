import { formatDate} from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { IntervalType, MinuteInterval } from '../types';
import { isSameYear, isSameQuarter,
  isSameMonth, isSameWeek, isSameDay,
  isSameHour, differenceInMinutes,
  getMinutes,
  closestTo} from 'date-fns';
import { minuteTicks, isSameTime } from '../scripts/datetime';

export class TimeSlot {
   startDate: Date;
   endDate: Date;
   dateFormat: string;
   intervalType: IntervalType;
   minuteInterval: MinuteInterval;
   timeSlots: TimeSlot[];
   get formattedDate(): string {
     const result = formatDate(this.startDate, this.dateFormat, 'en' );
     return result;
   }
   get isNow(): boolean {
     const now = new Date();
     switch (this.intervalType) {
       case 'Year':
         return isSameYear(now, this.startDate);
       case 'Quarter':
         return isSameQuarter(now, this.startDate);
       case 'Month':
         return isSameMonth(now, this.startDate);
       case 'Week':
         return isSameWeek(now, this.startDate);
       case 'Day':
         return isSameDay(now, this.startDate);
       case 'Hour':
         return isSameHour(now, this.startDate);
       case 'Minute':
         if (isSameHour(now, this.startDate)) {
           const tickDates = minuteTicks(this.startDate, this.minuteInterval);
           const closestDate = closestTo(now, tickDates);
           return isSameTime(closestDate, this.startDate);
         }
         return false;
       default:
         return false;
     }
   }
}
