import { IDragData } from './interfaces/i-drag-data';

export interface DropEventItemArgs { event: PointerEvent; item: IDragData; }
export interface CancellableArgs { cancel: boolean;  data: any; }
