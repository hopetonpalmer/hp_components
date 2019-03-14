import { startOfHour, addMinutes, isEqual, addDays, startOfDay, endOfDay } from 'date-fns';
import { IntervalType, MinuteInterval, DateRange } from '../types';
import { formatDate } from '@angular/common';

declare global {
  interface Date {
    stdTimezoneOffset(): number;
    isDst(): boolean;
  }
}

Date.prototype.stdTimezoneOffset = function () {
  const jan = new Date(this.getFullYear(), 0, 1);
  const jul = new Date(this.getFullYear(), 6, 1);
  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
};

Date.prototype.isDst = function () {
  return startOfDay(this).getTimezoneOffset() !== endOfDay(this).getTimezoneOffset();
};

export interface Time {
  hours: number;
  minutes: number;
  seconds?: number;
  milliseconds?: number;
}

export function setTime(date: Date, time: string | number | Date) {
   if (time instanceof Date) {
     date.setHours(time.getHours());
     date.setMinutes(time.getMinutes());
     date.setSeconds(time.getSeconds());
     date.setMilliseconds(time.getMilliseconds());
   } else if (typeof time === 'number') {
     date.setHours(time);
   } else {
    const t = strToTime(time);
    date.setHours(t.hours);
    date.setMinutes(t.minutes);
    date.setSeconds(t.seconds);
    date.setMilliseconds(t.milliseconds);
   }
}

/**
 * Updates the time portion of the date and returns a new Date object
 * @param date the date to adjust
 * @param time the time portion of the new date
 */
export function getDateTime(date: Date, time: string | number | Date): Date {
  const result = new Date(date);
  setTime(result, time);
  return result;
}

export function strToTime(time: string): Time {
   const tokenDate = new Date('1/1/1900 ' + time);
   return {
     hours: tokenDate.getHours(),
     minutes: tokenDate.getMinutes(),
     seconds: tokenDate.getSeconds(),
     milliseconds: tokenDate.getMilliseconds()
   };
}

export function isMidnight(date: Date): boolean {
  return date.getHours() === 23 && date.getMinutes() === 59;
}

export function isBetween(start: Date, end: Date, date: Date | Date[]): boolean {
  if (date.constructor === Array) {
    const dates = (date as Array<Date>);
    for (let index = 0; index < dates.length; index++) {
      const dateItem = dates[index];
      if (isBetween(start, end, dateItem)) {
        return true;
      }
    }
  }
  return date >= start && date <= end;
}

export function datesOfRange(start: Date, end: Date): Date[] {
  const result = [];
  let date = new Date(start);
  while (date <= end) {
     result.push(date);
     date = addDays(date, 1);
  }
  result[result.length - 1] = end;
  return result;
}

export function dateRangesOfRange(start: Date, end: Date, daysPerRange: number): DateRange[] {
   const dates = datesOfRange(start, end);
   let startIndex = 0;
   const result = [];
   while (startIndex < dates.length) {
      let endIndex = startIndex + daysPerRange - 1;
      if (endIndex >= dates.length) {
        endIndex = dates.length - 1;
      }
      const startDate = startOfDay(dates[startIndex]);
      const endDate = endOfDay(dates[endIndex]);
      const dateRange = {start: startDate, end: endDate};
      result.push(dateRange);
      startIndex = endIndex + 1;
   }
   return result;
}

export function xstrToTime(time: string): Time {
  time = time.toLowerCase();
  const isAm = time.indexOf('am') > -1;
  const isPm = time.indexOf('pm') > -1;
  const is24hr = !isAm && !isPm;
  const tokens = time.replace('am', '').replace('pm', '').split(':');
  const numToken24 = (index: number) => tokens.length > index ? Number(tokens[index]) : 0;
  const numToken12 = (index: number) => {
    if (tokens.length <= index) {
      return 0;
    }
    let token = Number(tokens[index]);
    if (index === 0 && token !== 12 && isPm) {
       token = token + 12;
    }
    return token;
  };
  return {
    hours: is24hr ? numToken24(0) : numToken12(0),
    minutes: is24hr ? numToken24(1) : numToken12(1),
    seconds: is24hr ? numToken24(2) : numToken12(2),
    milliseconds: is24hr ? numToken24(3) : numToken12(3),
  };
}

export function isSameTime(date1: Date, date2: Date): boolean {
   return date1.getHours() === date2.getHours() &&
     date1.getMinutes() === date2.getMinutes() &&
     date1.getSeconds() === date2.getSeconds();
}

export function minuteTicks(date: Date, interval: MinuteInterval): Date[] {
  const minutesInHour = 60;
  date = startOfHour(date);
  const steps = minutesInHour / interval;
  const result = [];
  for (let i = 0; i < steps; i++) {
     result.push(date);
     date = addMinutes(date, interval);
  }
  return result;
}

export function formatDateTime(date: Date, format: string, language = 'en-US'): string {
  return formatDate(date, format, language);
}

export function shortTime(date: Date, format: string = 'h:mma'): string {
  return formatDateTime(date, format).toLowerCase();
}

export function dateDiff(dateNow: Date, dateFuture: Date) {
  const seconds = (dateFuture.getTime() - dateNow.getTime()) / 1000;
  const minutes = Math.ceil(seconds / 60);
  let hours = Math.ceil(minutes / 60);
  if (dateNow.isDst()) {
    hours++;
  }
  const days = Math.ceil(hours / 24);
  return {days: days, hours: hours, minutes: minutes, seconds: seconds};
}

export function addUtcMinutes(date: Date, minutes: number): Date {
    const result = addMinutes(utcDate(date), minutes);
    return result;
}

export function addUtcHours(date: Date, hours: number): Date {
  const result = addUtcMinutes(date, hours * 60);
  return result;
}

export function utcDate(date: Date): Date {
  const result = new Date(date.toUTCString());
  return result;
}




