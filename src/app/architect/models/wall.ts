import { Corner } from './corner';
import { DoorSpace } from './doorSpace';
import { WindowSpace } from './windowSpace';

export class Wall {
  constructor(public corner: Corner) //private doorSpaces: DoorSpace[],
  //private windowSpaces: WindowSpace[]
  {}
}
