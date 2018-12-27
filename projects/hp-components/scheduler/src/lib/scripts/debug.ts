import { differenceInMilliseconds } from 'date-fns';

export function logExecution (func: Function) {
   const start = new Date();
   func();
   const end = new Date();
   console.log('Executed in: ' + differenceInMilliseconds(end, start) + ' ms');
}
