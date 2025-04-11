import { Track } from './Track';
import { GPClassement } from './GPClassement';
import { Pilote } from './Pilote';

export interface GP {
    id: number;
    round: number;
    track: Track;
    dateTime: string;
    pilotes: Pilote[];
    classement?: GPClassement[];
  }