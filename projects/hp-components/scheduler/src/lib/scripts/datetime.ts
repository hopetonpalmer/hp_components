import { startOfHour, addMinutes } from 'date-fns';
import { IntervalType, MinuteInterval } from '../types';

export interface Time {
  hours: number;
  minutes: number;
  seconds?: number;
  milliseconds?: number;
}

export function setTime(date: Date, time: string | number) {
   if (typeof time === 'number') {
     date.setTime(time);
   } else {
    const t = strToTime(time);
    date.setHours(t.hours);
    date.setMinutes(t.minutes);
    date.setSeconds(t.seconds);
    date.setMilliseconds(t.milliseconds);
   }
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



