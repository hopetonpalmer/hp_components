import { Orientation } from '../scripts/types';

export interface IProject {
   name: string;
   description?: string;
   orientation: Orientation;
   height: string;
   width: string;
   smallIcon?: string;
   largeIcon?: string;
   backgroundColor: string;
   backgroundImage: string;
   backgroundVideo: string;
   data?: any;
   pages: IProjectPage [];
}

export interface IProjectPage {
   id: string;
   name?: string;
   description?: string;
   parentId: string;
   componentType: string;
   tagName: string;
   styles: string[];
   classes: string;
   props: any[];
}
